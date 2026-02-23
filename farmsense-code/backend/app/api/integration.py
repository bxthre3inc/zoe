from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from datetime import datetime
import uuid

from app.api.main import get_db
from app.models.devices import Device, DeviceType, RoboticsMission

router = APIRouter(prefix="/api/v1/integration", tags=["Vendor Integration"])

# --- Schemas ---
class TelemetryPayload(BaseModel):
    external_id: str
    timestamp: datetime
    data: Dict[str, Any]
    battery_level: Optional[float] = None

class MissionUpdate(BaseModel):
    external_id: str
    status: str
    path_data: Optional[List[Dict[str, float]]] = None
    coverage_area_m2: Optional[float] = None
    report: Optional[Dict[str, Any]] = None

# --- Endpoints ---

@router.post("/telemetry")
async def ingest_vendor_telemetry(payload: TelemetryPayload, db: Session = Depends(get_db)):
    """Standardized endpoint for third-party sensors and machinery to push data"""
    device = db.query(Device).filter(Device.external_id == payload.external_id).first()
    if not device:
        # Auto-registration for known vendors (simplified)
        raise HTTPException(status_code=404, detail="Device not registered. Please register device via portal first.")
    
    device.latest_telemetry = payload.data
    device.last_communication = payload.timestamp
    if payload.battery_level is not None:
        device.battery_level = payload.battery_level
        
    db.commit()
    return {"status": "success", "received_at": datetime.utcnow()}

@router.post("/robotics/mission")
async def update_robotics_mission(payload: MissionUpdate, db: Session = Depends(get_db)):
    """Endpoint for autonomous robots to report mission progress/completion"""
    device = db.query(Device).filter(Device.external_id == payload.external_id).first()
    if not device or device.device_type != DeviceType.ROBOTICS:
        raise HTTPException(status_code=400, detail="Invalid robotics device ID")
    
    # Update latest mission or create a new one
    active_mission = db.query(RoboticsMission).filter(
        RoboticsMission.device_id == device.id,
        RoboticsMission.status == "in-progress"
    ).first()
    
    if not active_mission and payload.status == "in-progress":
        active_mission = RoboticsMission(
            device_id=device.id,
            status="in-progress",
            start_time=datetime.utcnow()
        )
        db.add(active_mission)
        db.commit()
        db.refresh(active_mission)
    
    if active_mission:
        active_mission.status = payload.status
        if payload.path_data:
            active_mission.path_data = payload.path_data
        if payload.coverage_area_m2:
            active_mission.coverage_area_m2 = payload.coverage_area_m2
        if payload.report:
            active_mission.mission_report = payload.report
            active_mission.end_time = datetime.utcnow()
            
        db.commit()
        
    return {"status": "mission_updated"}

@router.post("/csa/kinematics")
async def ingest_csa_kinematics(payload: TelemetryPayload, db: Session = Depends(get_db)):
    """Endpoint for dual-node Corner Swing Auditor logic ingestion."""
    # Logic to be implemented connecting to csa_alignment.py
    
    # 1. Decode PST + SAT nodes
    # 2. Extract Hydraulic Hammer pulses
    # 3. Create high-resolution surge mapping volume
    return {"status": "success", "csa_node_received": True}

@router.post("/kriging/trigger")
async def trigger_kriging_interpolation(field_id: str, db: Session = Depends(get_db)):
    """Triggers the 1m Kriging regression for a specified field, ingesting Satellite priors."""
    # Logic to load VirtualSensorGrid, trigger pipeline/kriging_1m.py logic, and update DB
    return {"status": "queued", "field": field_id}
    
@router.get("/devices", response_model=List[dict])
async def list_registered_devices(field_id: str, db: Session = Depends(get_db)):
    """Headless access to list all integrated hardware on a field"""
    devices = db.query(Device).filter(Device.field_id == field_id).all()
    return [{"id": d.id, "external_id": d.external_id, "type": d.device_type, "status": d.status} for d in devices]
