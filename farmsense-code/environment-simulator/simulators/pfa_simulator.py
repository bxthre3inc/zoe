from .base_simulator import BaseSimulator
import random

class PFASimulator(BaseSimulator):
    def __init__(self, hardware_id, field_id, backend_url):
        super().__init__(hardware_id, field_id, backend_url)
        self.pump_on = False
        self.base_pressure = 0.0
        self.base_flow = 0.0
        
    def toggle_pump(self, state: bool):
        self.pump_on = state
        if self.pump_on:
            self.base_pressure = 65.0 # Normal operating pressure
            self.base_flow = 800.0 # Normal flow GPM
        else:
            self.base_pressure = 0.0
            self.base_flow = 0.0

    async def emit(self):
        if self.is_broken:
            # Emits bad data or zero if broken, depending on the fault type. Here we simulate 0 pressure but pump "on"
            pressure = 5.0
            flow = 0.0
            status = "cavitation_alert"
        else:
            pressure = self.base_pressure + random.uniform(-2, 2) if self.pump_on else 0.0
            flow = self.base_flow + random.uniform(-10, 10) if self.pump_on else 0.0
            status = "running" if self.pump_on else "off"
            
        payload = {
            "hardware_id": self.hardware_id,
            "field_id": self.field_id,
            "well_pressure_psi": max(0, pressure),
            "flow_rate_gpm": max(0, flow),
            "pump_status": status
        }
        
        try:
            response = await self.client.post("/api/v1/hardware/pfa/telemetry", json=payload)
            response.raise_for_status()
        except Exception as e:
            self.logger.error(f"Failed to emit PFA data: {e}")
