from .base_simulator import BaseSimulator
import random

class LRZSimulator(BaseSimulator):
    def __init__(self, hardware_id, field_id, backend_url, lat, lon):
        super().__init__(hardware_id, field_id, backend_url)
        self.latitude = lat
        self.longitude = lon
        self.moisture_surface = 0.22
        self.moisture_root = 0.28
        
    def dry_soil(self, rate_multiplier=1.0):
        self.moisture_surface = max(0.05, self.moisture_surface - (0.0015 * rate_multiplier))
        self.moisture_root = max(0.10, self.moisture_root - (0.0008 * rate_multiplier))
        
    def irrigate(self, intensity=1.0):
        self.moisture_surface = min(0.45, self.moisture_surface + (0.025 * intensity))
        self.moisture_root = min(0.40, self.moisture_root + (0.01 * intensity))

    async def emit(self):
        # LRZ doesn't have a direct endpoint in the provided snippet except if we add one, or we use a general sensor update.
        # But wait! The VFA ingests LRZ data. In the current FarmSense API, how is LRZ data ingested?
        # looking at main.py, there's `SensorReadingCreate` which might be the generic one.
        pass
