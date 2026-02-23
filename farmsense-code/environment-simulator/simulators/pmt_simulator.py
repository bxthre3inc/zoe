from .base_simulator import BaseSimulator
import math
import random

class PMTSimulator(BaseSimulator):
    def __init__(self, hardware_id, field_id, backend_url, pivot_lat, pivot_lon, span_length_meters=400):
        super().__init__(hardware_id, field_id, backend_url)
        self.pivot_lat = pivot_lat
        self.pivot_lon = pivot_lon
        self.span_length = span_length_meters
        self.current_angle = 0.0 # Degrees, 0 is North
        self.moving = False
        self.speed_mph = 0.0
        
    def toggle_motion(self, state: bool, speed=0.5):
        self.moving = state
        self.speed_mph = speed if state else 0.0
        
    def advance_time(self, time_delta_hours):
        if self.moving and not self.is_broken:
            # roughly calculate degree change. Very simple arc math for demo purposes
            # Circumference = 2 * pi * r
            circ_miles = (2 * math.pi * self.span_length) / 1609.34
            if circ_miles > 0:
                hours_for_full_circle = circ_miles / self.speed_mph
                degrees_per_hour = 360 / hours_for_full_circle
                self.current_angle = (self.current_angle + (degrees_per_hour * time_delta_hours)) % 360

    def get_current_location(self):
        # Extremely simplified coordinate offset
        lat_offset = (self.span_length / 111111) * math.cos(math.radians(self.current_angle))
        lon_offset = (self.span_length / (111111 * math.cos(math.radians(self.pivot_lat)))) * math.sin(math.radians(self.current_angle))
        return self.pivot_lat + lat_offset, self.pivot_lon + lon_offset

    async def emit(self):
        if self.is_broken:
            self.moving = False
            self.speed_mph = 0.0
            
        cur_lat, cur_lon = self.get_current_location()
        
        payload = {
            "hardware_id": self.hardware_id,
            "field_id": self.field_id,
            "latitude": cur_lat,
            "longitude": cur_lon,
            "kinematic_angle_deg": self.current_angle,
            "span_speed_mph": self.speed_mph,
            "gps_fix_quality": 4 # RTK Fix
        }
        
        try:
            response = await self.client.post("/api/v1/hardware/pmt/kinematics", json=payload)
            response.raise_for_status()
        except Exception as e:
            self.logger.error(f"Failed to emit PMT data: {e}")
