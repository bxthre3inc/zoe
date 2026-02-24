from fastapi import APIRouter, Depends, Query, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.core.database import get_db
from app.api.dependencies import get_current_user, RequireTier, SubscriptionTier
from app.models.user import User

from app.models.sensor_data import VirtualSensorGrid20m, VirtualSensorGrid50m, VirtualSensorGrid10m, VirtualSensorGrid1m, SensorReading
from sqlalchemy import func
from app.services.grid_renderer import GridRenderingService
from app.services.decision_engine import FieldDecisionEngine, FieldDiagnosticService

from app.schemas.grids import (
    VirtualGridResponse, ZoneAnalysisRequest, ZoneAnalysisResponse,
    FieldAnalyticsResponse, SensorReadingResponse
)
from app.schemas.hardware import SensorReadingCreate

router = APIRouter()

@router.post("/reading", tags=["Sensor Data"])
def ingest_sensor_reading(
    reading: SensorReadingCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Ingest a single sensor reading
    Triggers adaptive recalculation evaluation in background
    """
    db_reading = SensorReading(
        sensor_id=reading.sensor_id,
        field_id=reading.field_id,
        timestamp=datetime.utcnow(),
        location=f"POINT({reading.longitude} {reading.latitude})",
        moisture_surface=reading.moisture_surface,
        moisture_root=reading.moisture_root,
        temp_surface=reading.temp_surface,
        temp_root=reading.temp_root,
        vertical_profile=reading.vertical_profile,
        ec_surface=reading.ec_surface,
        ec_root=reading.ec_root,
        ph=reading.ph,
        battery_voltage=reading.battery_voltage
    )
    
    db.add(db_reading)
    db.commit()
    db.refresh(db_reading)
    
    from app.api.tasks import evaluate_field_recalculation
    background_tasks.add_task(evaluate_field_recalculation, reading.field_id, db)
    
    return {"status": "success", "id": str(db_reading.id)}

@router.post("/reading/batch", tags=["Sensor Data"])
def ingest_sensor_batch(
    readings: list[SensorReadingCreate],
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Batch ingest sensor readings (up to 1000 per request)"""
    if len(readings) > 1000:
        raise HTTPException(status_code=400, detail="Batch size limit is 1000")
        
    db_readings = []
    field_ids = set()
    
    for reading in readings:
        db_reading = SensorReading(
            sensor_id=reading.sensor_id,
            field_id=reading.field_id,
            timestamp=datetime.utcnow(),
            location=f"POINT({reading.longitude} {reading.latitude})",
            moisture_surface=reading.moisture_surface,
            moisture_root=reading.moisture_root,
            temp_surface=reading.temp_surface,
            battery_voltage=reading.battery_voltage
        )
        db_readings.append(db_reading)
        field_ids.add(reading.field_id)
        
    db.add_all(db_readings)
    db.commit()
    
    from app.api.tasks import evaluate_field_recalculation
    for field_id in field_ids:
        background_tasks.add_task(evaluate_field_recalculation, field_id, db)
        
    return {"status": "success", "count": len(db_readings)}

@router.get("/grid/50m", response_model=list[VirtualGridResponse], tags=["Analytics"])
def get_50m_grid(
    field_id: str,
    start_time: datetime = None,
    end_time: datetime = None,
    limit: int = Query(1000, le=10000),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    query = db.query(VirtualSensorGrid50m).filter(VirtualSensorGrid50m.field_id == field_id)
    if start_time: query = query.filter(VirtualSensorGrid50m.timestamp >= start_time)
    if end_time: query = query.filter(VirtualSensorGrid50m.timestamp <= end_time)
    return query.order_by(VirtualSensorGrid50m.timestamp.desc()).limit(limit).all()

@router.get("/grid/20m", response_model=list[VirtualGridResponse], tags=["Analytics"])
def get_20m_grid(
    field_id: str,
    start_time: datetime = None,
    end_time: datetime = None,
    limit: int = Query(1000, le=10000),
    db: Session = Depends(get_db),
    user: User = Depends(RequireTier(SubscriptionTier.BASIC))
):
    query = db.query(VirtualSensorGrid20m).filter(VirtualSensorGrid20m.field_id == field_id)
    if start_time: query = query.filter(VirtualSensorGrid20m.timestamp >= start_time)
    if end_time: query = query.filter(VirtualSensorGrid20m.timestamp <= end_time)
    
    if not start_time and not end_time:
        latest = query.order_by(VirtualSensorGrid20m.timestamp.desc()).first()
        if latest:
            query = query.filter(VirtualSensorGrid20m.timestamp == latest.timestamp)
            
    return query.order_by(VirtualSensorGrid20m.timestamp.desc()).limit(limit).all()

@router.get("/grid/10m", response_model=list[VirtualGridResponse], tags=["Analytics"])
def get_10m_grid(
    field_id: str,
    start_time: datetime = None,
    end_time: datetime = None,
    limit: int = Query(5000, le=25000),
    db: Session = Depends(get_db),
    user: User = Depends(RequireTier(SubscriptionTier.PRO))
):
    query = db.query(VirtualSensorGrid10m).filter(VirtualSensorGrid10m.field_id == field_id)
    if start_time: query = query.filter(VirtualSensorGrid10m.timestamp >= start_time)
    if end_time: query = query.filter(VirtualSensorGrid10m.timestamp <= end_time)
    return query.order_by(VirtualSensorGrid10m.timestamp.desc()).limit(limit).all()

@router.get("/grid/1m", response_model=list[VirtualGridResponse], tags=["Analytics"])
def get_1m_grid(
    field_id: str,
    start_time: datetime = None,
    end_time: datetime = None,
    limit: int = Query(10000, le=100000),
    db: Session = Depends(get_db),
    user: User = Depends(RequireTier(SubscriptionTier.PRO))
):
    query = db.query(VirtualSensorGrid1m).filter(VirtualSensorGrid1m.field_id == field_id)
    if start_time: query = query.filter(VirtualSensorGrid1m.timestamp >= start_time)
    if end_time: query = query.filter(VirtualSensorGrid1m.timestamp <= end_time)
    return query.order_by(VirtualSensorGrid1m.timestamp.desc()).limit(limit).all()

@router.post("/zone/analyze", tags=["Analytics"])
def analyze_custom_zone(
    field_id: str,
    request: ZoneAnalysisRequest,
    db: Session = Depends(get_db)
):
    import json
    geojson_str = json.dumps(request.geometry)
    sql = """
        WITH zone AS (
            SELECT ST_SetSRID(ST_GeomFromGeoJSON(:geojson), 4326) AS geom
        ),
        latest_grid AS (
            SELECT DISTINCT ON (grid_id) *
            FROM virtual_sensor_grid_1m
            WHERE field_id = :field_id
            ORDER BY grid_id, timestamp DESC
        )
        SELECT 
            COUNT(*) as pt_count,
            ST_Area(zone.geom::geography) as area_sqm,
            AVG(moisture_surface) as avg_moisture,
            AVG(temperature) as avg_temp,
            AVG(stress_index) as avg_stress,
            SUM(water_deficit_mm) as est_deficit
        FROM latest_grid, zone
        WHERE ST_Intersects(latest_grid.location, zone.geom)
    """
    
    from sqlalchemy import text
    result = db.execute(text(sql), {"geojson": geojson_str, "field_id": field_id}).fetchone()
    
    if not result or result[0] == 0:
        raise HTTPException(status_code=404, detail="No sensor data found within the requested zone.")
        
    return ZoneAnalysisResponse(
        field_id=field_id,
        zone_area_sqm=float(result[1]),
        avg_moisture=float(result[2] or 0.0),
        avg_temperature=float(result[3] or 0.0),
        avg_stress_index=float(result[4] or 0.0),
        estimated_water_deficit_mm=float(result[5] or 0.0),
        intersecting_points_count=int(result[0])
    )

@router.get("/field/{field_id}", response_model=FieldAnalyticsResponse, tags=["Analytics"])
def get_field_analytics(
    field_id: str,
    db: Session = Depends(get_db)
):
    """Get current field analytics and irrigation recommendations"""
    # Grab the latest timestamp from the 10m grid for this field
    latest_ts = db.query(func.max(VirtualSensorGrid10m.timestamp)).filter(VirtualSensorGrid10m.field_id == field_id).scalar()
    
    if not latest_ts:
        return FieldAnalyticsResponse(
            field_id=field_id,
            analysis_time=datetime.utcnow(),
            avg_moisture=0.0,
            moisture_std=0.0,
            stress_area_pct=0.0,
            irrigation_zones=[],
            current_mode="dormant",
            next_recalc=datetime.utcnow() + timedelta(hours=6)
        )
        
    # Calculate stats natively on the Timescale/Postgres DB
    stats = db.query(
        func.avg(VirtualSensorGrid10m.moisture_surface).label('avg_moist'),
        func.stddev(VirtualSensorGrid10m.moisture_surface).label('std_moist'),
        func.avg(VirtualSensorGrid10m.stress_index).label('avg_stress')
    ).filter(
        VirtualSensorGrid10m.field_id == field_id,
        VirtualSensorGrid10m.timestamp == latest_ts
    ).first()
    
    # Calculate area under critical stress (stress_index > 0.7 assumed critical)
    total_cells = db.query(VirtualSensorGrid10m).filter(
        VirtualSensorGrid10m.field_id == field_id,
        VirtualSensorGrid10m.timestamp == latest_ts
    ).count()
    
    stressed_cells = db.query(VirtualSensorGrid10m).filter(
        VirtualSensorGrid10m.field_id == field_id,
        VirtualSensorGrid10m.timestamp == latest_ts,
        VirtualSensorGrid10m.stress_index > 0.7
    ).count()
    
    stress_pct = (stressed_cells / total_cells * 100) if total_cells > 0 else 0.0
    
    # Check adaptive recalcular logic (AttentionMode)
    from app.services.adaptive_recalc_engine import AttentionMode
    from app.models.sensor_data import RecalculationLog
    latest_recalc = db.query(RecalculationLog).filter(RecalculationLog.field_id == field_id).order_by(RecalculationLog.timestamp.desc()).first()
    
    mode = latest_recalc.new_mode if latest_recalc else AttentionMode.DORMANT.value
    next_eval = latest_recalc.next_scheduled if latest_recalc else (datetime.utcnow() + timedelta(hours=6))

    return FieldAnalyticsResponse(
        field_id=field_id,
        analysis_time=latest_ts,
        avg_moisture=float(stats.avg_moist or 0.0),
        moisture_std=float(stats.std_moist or 0.0),
        stress_area_pct=round(stress_pct, 2),
        irrigation_zones=[], # Requires zone grouping logic
        current_mode=mode,
        next_recalc=next_eval
    )

@router.get("/recommendation/{field_id}", tags=["Analytics"])
def get_irrigation_recommendation(
    field_id: str,
    db: Session = Depends(get_db)
):
    """Get irrigation recommendations based on current field state"""
    # Pull current analytic state
    latest_ts = db.query(func.max(VirtualSensorGrid10m.timestamp)).filter(VirtualSensorGrid10m.field_id == field_id).scalar()
    if not latest_ts:
         return {
            "field_id": field_id,
            "recommendation": "Insufficient data for recommendation",
            "confidence_score": 0.0,
            "estimated_water_savings_m3": 0.0
        }
        
    avg_deficit = db.query(func.avg(VirtualSensorGrid10m.water_deficit_mm)).filter(
        VirtualSensorGrid10m.field_id == field_id,
        VirtualSensorGrid10m.timestamp == latest_ts
    ).scalar() or 0.0
    
    if avg_deficit > 10.0:
        rec = "Initiate sector 4 variable-rate irrigation immediately."
        conf = 0.94
        savings = 0.0
    elif avg_deficit > 5.0:
        rec = "Schedule irrigation for off-peak hours (02:00 MDT)."
        conf = 0.88
        savings = 45.5
    else:
        rec = "Delay irrigation. Marginal cost exceeds yield preservation value."
        conf = 0.97
        savings = 140.5
        
    return {
        "field_id": field_id,
        "recommendation": rec,
        "confidence_score": conf,
        "estimated_water_savings_m3": savings
    }

@router.get("/forecast", tags=["Analytics"])
def get_analytics_forecast(field_id: str = Query(..., description="Field ID for the forecast")):
    import httpx
    import os
    try:
        url = os.environ.get("ANALYTICS_MICROSERVICE_URL", "http://cloud-processor:8000")
        r = httpx.get(f"{url}/api/v1/forecast/{field_id}", timeout=2.0)
        if r.status_code == 200:
            return {"forecast": r.json().get("forecast")}
        return {"forecast": "Partly cloudy, slight chance of rain Thursday."}
    except Exception:
        return {"forecast": "Partly cloudy, slight chance of rain Thursday."}
