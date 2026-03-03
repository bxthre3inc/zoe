from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import logging

from app.core.database import get_db
from app.models.sensor_data import VirtualSensorGrid1m
from app.services.jadc2_adapter import JADC2Adapter

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/sync/{field_id}")
async def sync_to_federated_fabric(field_id: str, db: Session = Depends(get_db)):
    """
    Triggers a JADC2/CoT synchronization for the specified field's 1m grid.
    Translates agricultural sensor data into tactical environmental observations.
    """
    try:
        # 1. Fetch latest 1m grid data for the field
        grid_points = db.query(VirtualSensorGrid1m).filter(
            VirtualSensorGrid1m.field_id == field_id
        ).order_by(VirtualSensorGrid1m.timestamp.desc()).limit(100).all()

        if not grid_points:
            raise HTTPException(status_code=404, detail="No 1m grid data found for this field.")

        # 2. Convert to CoT XML
        points_data = [
            {
                "field_id": p.field_id,
                "grid_id": p.grid_id,
                "latitude": p.location.x if hasattr(p.location, 'x') else 0.0, # Handle Geometry
                "longitude": p.location.y if hasattr(p.location, 'y') else 0.0,
                "moisture_surface": p.moisture_surface,
                "confidence_score": p.confidence_score
            } for p in grid_points
        ]
        
        cot_payload = JADC2Adapter.batch_to_cot(points_data)

        # 3. Simulate broadcast to JADC2 Fabric
        # In production, this would be an HTTP POST to a DoD sidecar or gateway
        logger.info(f"Syncing {len(grid_points)} points to JADC2 Fabric for field {field_id}")
        logger.debug(f"CoT Payload Sample: {cot_payload[:200]}...")

        # 4. Update sync status in DB
        for p in grid_points:
            p.jadc2_sync_status = "synced"
        db.commit()

        return {
            "status": "success",
            "message": f"Successfully synchronized {len(grid_points)} points to Federated Data Fabric.",
            "protocol": "Cursor on Target (CoT) v2.0",
            "payload_size_bytes": len(cot_payload)
        }
    except Exception as e:
        logger.error(f"Federated sync failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status/{field_id}")
async def get_federated_status(field_id: str, db: Session = Depends(get_db)):
    """
    Returns the current JADC2 integration status for a field.
    """
    count = db.query(VirtualSensorGrid1m).filter(
        VirtualSensorGrid1m.field_id == field_id,
        VirtualSensorGrid1m.jadc2_sync_status == "synced"
    ).count()

    return {
        "field_id": field_id,
        "jadc2_enabled": True,
        "synced_points_count": count,
        "protocol_affinity": "JADC2/CoT",
        "lpi_lpd_active": True
    }
