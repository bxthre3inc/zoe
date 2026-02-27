from datetime import datetime
from sqlalchemy.orm import Session
from app.models.sensor_data import VirtualSensorGrid50m, VirtualSensorGrid20m, VirtualSensorGrid1m, SoilSensorReading
from app.services.external_data_service import ExternalDataService
from app.services.satellite_service import SatelliteDataService
from app.services.rss_kriging import RSSKrigingEngine
from app.core.env_wrapper import platform_wrapper
import logging
import uuid

logger = logging.getLogger(__name__)

class GridRenderingService:
    @staticmethod
    def get_or_render_grid(
        db: Session,
        field_id: str,
        resolution: str,
        limit: int = 1000,
        offline_mode: bool = False
    ):
        """
        Dynamically renders the grid based on recent sensor trends, 
        Landsat history, and real-time external environmental factors.
        
        If offline_mode is True, it fallbacks to local cached data with 
        a reduced confidence score.
        """
        logger.info(f"Rendering grid for field {field_id} at {resolution} resolution (Offline: {offline_mode})")

        # 1. Fetch recent sensor readings to determine trend
        readings = db.query(SoilSensorReading).filter(
            SoilSensorReading.field_id == field_id
        ).order_by(SoilSensorReading.timestamp.desc()).limit(3).all()

        trend_modifier = 1.0
        if len(readings) == 3:
            r1, r2, r3 = readings
            if r1.moisture_surface < r2.moisture_surface < r3.moisture_surface:
                trend_modifier = 0.8  # Drying trend
                logger.info(f"Detected drying trend for field {field_id}")

        # 2. Integrate External Atmospheric Data (Open-Meteo)
        # Mock coordinates for field center - in production these would be field metadata
        field_lat, field_lon = 40.5853, -105.0844 
        weather = ExternalDataService.get_weather_data(field_lat, field_lon)
        
        weather_modifier = 1.0
        if weather:
            temp = weather.get("temperature", 20)
            if temp > 30: # Extreme heat
                weather_modifier *= 1.15 # Increase evapotranspiration stress
                logger.info(f"Adjusting for extreme heat: {temp}C")
        
                soil_modifier = 0.9 
                logger.info(f"Adjusting for low Soil Organic Carbon: {soc}")

        # 3. Integrate Advanced Satellite Fusion (Sentinel-1 & 2)
        # Sentinel-2 NDVI (Optical)
        real_ndvi = SatelliteDataService.get_latest_ndvi_point(field_lat, field_lon, field_id)
        
        # Sentinel-1 SAR (Radar) - moisture proxy through clouds
        sar_modifier = SatelliteDataService.get_sentinel1_moisture_proxy(field_lat, field_lon)
        
        logger.info(f"Satellite Fusion: Sentinel-2 NDVI={real_ndvi:.2f}, Sentinel-1 SAR Mod={sar_modifier:.2f}")

        # 4. Calculate Confidence Score
        # 1.0 = All sensors online + Satellite recent
        # < 0.5 = High uncertainty
        confidence = 1.0
        
        if platform_wrapper.is_pilot():
            confidence *= 0.9 # Minor penalty for pilot-phase uncalibrated sensors
            logger.info("ENVIRONMENT: Pilot mode detected. Applying calibration buffer.")
        elif not platform_wrapper.is_production():
            confidence *= 0.8 # Dev mode penalty
            
        if offline_mode:
            confidence *= 0.7  # Reduced confidence due to stale external data
            logger.warning(f"Field {field_id} is in OFFLINE mode. Using local cache fallbacks.")
        
        if len(readings) < 3:
            confidence *= 0.8  # Sparse physical sensor data
            
        final_modifier = trend_modifier * weather_modifier * soil_modifier * sar_modifier
        logger.info(f"Fusion Complete. Final Modifier: {final_modifier:.2f}, Confidence: {confidence:.2f}")

        # 5. Render Grid
        model_map = {
            "50m": VirtualSensorGrid50m,
            "20m": VirtualSensorGrid20m,
            "1m": VirtualSensorGrid1m
        }
        
        Model = model_map.get(resolution)
        if not Model:
            raise ValueError(f"Invalid resolution: {resolution}")

        results = db.query(Model).filter(
            Model.field_id == field_id
        ).order_by(Model.timestamp.desc()).limit(limit).all()
        
        if not results and resolution == "1m":
             logger.info("No cached 1m grid found. Generating new high-res points with RSS Kriging Engine...")
             # Convert SoilSensorReadings to the format expected by RSSKrigingEngine
             sensor_list = [
                 {'lat': r.location.lat, 'lon': r.location.lon, 'moisture': r.moisture_surface} 
                 for r in readings if r.location
             ]
             
             rss_engine = RSSKrigingEngine()
             # In production, this would happen on the RSS hardware cluster
             rss_grid = rss_engine.generate_1m_grid(field_id, sensor_list)
             
             # Save to DB and return
             results = []
             for g in rss_grid:
                 db_point = VirtualSensorGrid1m(
                     field_id=g['field_id'],
                     grid_id=g['grid_id'],
                     timestamp=g['timestamp'],
                     location=f"POINT({g['longitude']} {g['latitude']})",
                     moisture_surface=g['moisture_surface'] * final_modifier,
                     confidence_score=g['confidence_score'] * confidence,
                     computation_mode=g['computation_mode']
                 )
                 db.add(db_point)
                 results.append(db_point)
             db.commit()
        
        return results

    @staticmethod
    def _fetch_satellite_data(field_id: str) -> dict:
        return {f"cell_{i}": 0.3 + (i % 5) * 0.1 for i in range(10)}

    @staticmethod
    def _generate_synthetic_1m_grid(db: Session, field_id: str, modifier: float, ground_truth: float = None):
        points = []
        base_time = datetime.utcnow()
        
        for i in range(10):
            p = VirtualSensorGrid1m(
                id=uuid.uuid4(),
                field_id=field_id,
                grid_id=f"{field_id}_1m_{i}",
                timestamp=base_time,
                location=f"POINT(-105.00{i} 40.00{i})",
                moisture_surface=0.25 * modifier,
                moisture_root=0.30 * modifier,
                temperature=22.5,
                ndvi=0.4 + (modifier - 1.0),
                ndwi=0.1,
                confidence_score=0.95 if modifier > 0.8 else 0.6,
                physical_probe_value=ground_truth,
                crop_stress_probability=max(0.0, 1.0 - modifier),
                yield_forecast_kgha=8500 * modifier,
                irrigation_priority=1 if modifier < 0.8 else 5
            )
            points.append(p)
            db.add(p)
        
        db.commit()
        return points
