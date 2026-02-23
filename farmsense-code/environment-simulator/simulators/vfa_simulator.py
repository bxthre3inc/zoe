from .base_simulator import BaseSimulator
import random
import asyncio

class VFASimulator(BaseSimulator):
    def __init__(self, hardware_id, field_id, backend_url, lat, lon):
        super().__init__(hardware_id, field_id, backend_url)
        self.latitude = lat
        self.longitude = lon
        self.battery_voltage = 12.4
        
        # State
        self.moisture_profile = {
            "slot_10": 0.25,
            "slot_18": 0.28,
            "slot_25": 0.30,
            "slot_35": 0.32,
            "slot_48": 0.34
        }
        self.nitrogen_pressure = 45.0
        
    def dry_soil(self, rate_multiplier=1.0):
        # Soil naturally dries over time
        for depth, value in self.moisture_profile.items():
            self.moisture_profile[depth] = max(0.05, value - (0.001 * rate_multiplier))
            
    def irrigate(self, intensity=1.0, depth="shallow"):
        # Increase moisture based on irrigation
        if depth == "shallow":
            self.moisture_profile["slot_10"] = min(0.45, self.moisture_profile["slot_10"] + (0.02 * intensity))
            self.moisture_profile["slot_18"] = min(0.40, self.moisture_profile["slot_18"] + (0.01 * intensity))
        else:
            for d in self.moisture_profile:
                self.moisture_profile[d] = min(0.45, self.moisture_profile[d] + (0.015 * intensity))

    async def emit(self):
        if self.is_broken:
            return # Dead unit
            
        payload = {
            "hardware_id": self.hardware_id,
            "field_id": self.field_id,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "nitrogen_pressure_psi": self.nitrogen_pressure + random.uniform(-1, 1),
            "slot_10_moisture": self.moisture_profile["slot_10"],
            "slot_10_ec": random.uniform(1.1, 1.5),
            "slot_10_temp": 22.0 + random.uniform(-1, 1),
            "slot_18_moisture": self.moisture_profile["slot_18"],
            "slot_25_moisture": self.moisture_profile["slot_25"],
            "slot_25_ec": random.uniform(1.0, 1.4),
            "slot_25_temp": 18.0 + random.uniform(-0.5, 0.5),
            "slot_35_moisture": self.moisture_profile["slot_35"],
            "slot_48_moisture": self.moisture_profile["slot_48"],
            "slot_48_ec": random.uniform(0.9, 1.2),
            "battery_voltage": self.battery_voltage - random.uniform(0.001, 0.005)
        }
        
        try:
            response = await self.client.post("/api/v1/hardware/vfa/payload", json=payload)
            response.raise_for_status()
            self.logger.debug(f"Emitted VFA payload for {self.hardware_id}")
        except Exception as e:
            self.logger.error(f"Failed to emit VFA data: {e}")
