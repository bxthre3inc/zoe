"""
sensor_bridge.py — The Emulator Bridge

The SensorBridge is the central orchestrator. It:
1. Holds a reference to the physics engine (environment-simulator's SIMULATORS dict)
2. Runs the FishermansAttentionEngine per field to control emit timing
3. Applies hardware noise via noise.py before submission
4. Assembles the validated 187-byte payload via encoding.py
5. Submits hardware-authentic payloads to the FarmSense backend REST API

This bridge operates on the same principle as the physical DHU (District Hub):
it receives raw physics readings from the field and transforms them into
the exact payload structure the backend expects from real hardware.
"""

import asyncio
import logging
import httpx
import sys
import os
from typing import Any

from attention_engine import FishermansAttentionEngine, FieldState, AttentionMode
from edge_kriging import EdgeKrigingEngine
from .noise import (
    apply_bounded_noise, simulate_battery_drain, simulate_current_harmonics,
    simulate_pivot_vibration, apply_gnss_position_error, simulate_fhss_packet_loss,
    calculate_rssi
)
from .encoding import build_field_state_payload

logger = logging.getLogger("SensorBridge")


class SensorBridge:
    """
    Central bridge between the physics engine state and the backend REST API.
    One SensorBridge instance manages all simulators on a given field.
    """

    def __init__(self, field_id: str, backend_url: str, simulators: dict):
        self.field_id = field_id
        self.backend_url = backend_url
        self.simulators = simulators   # reference to environment-simulator's SIMULATORS dict
        self.client = httpx.AsyncClient(base_url=backend_url, timeout=5.0)
        self.attention = FishermansAttentionEngine(field_id)
        self.kriging = EdgeKrigingEngine(grid_size=16, resolution_m=50.0)
        self._sequence = 0
        self._lrz_nodes = []   # Will be populated by SensorBridge.register_lrz()

    def register_lrz(self, lrz_id: str, lrz_simulator: Any):
        """Register an LRZ simulator node into this bridge's management pool."""
        self._lrz_nodes.append({"id": lrz_id, "sim": lrz_simulator})
        logger.info(f"[{self.field_id}] Registered LRZ node: {lrz_id}")

    # ------------------------------------------------------------------
    # Tick — called by the simulation loop
    # ------------------------------------------------------------------

    async def tick(self, time_multiplier: float = 1.0):
        """
        One full bridge tick:
        1. Sample physics state from connected simulators
        2. Build FieldState for the attention engine
        3. Evaluate & apply new attention mode
        4. Emit all hardware payloads to backend
        5. Validate 187-byte payload budget
        """
        self._sequence = (self._sequence + 1) % 65536

        # --- 1. Sample simulators ---
        vfa = self.simulators.get("vfa_1")
        pmt = self.simulators.get("pmt_1")
        pfa = self.simulators.get("pfa_1")

        if not vfa or not pmt or not pfa:
            logger.warning(f"[{self.field_id}] Missing simulators, skipping tick.")
            return

        # --- 2. Build FieldState for attention engine ---
        avg_moisture = sum(vfa.moisture_profile.values()) / len(vfa.moisture_profile)
        moisture_vals = list(vfa.moisture_profile.values())
        std_moisture = (sum((x - avg_moisture)**2 for x in moisture_vals) / len(moisture_vals)) ** 0.5

        field_state = FieldState(
            moisture_avg=avg_moisture,
            moisture_std=std_moisture,
            pivot_moving=pmt.moving,
            pump_on=pfa.pump_on,
            any_node_faulted=any(s.is_broken for s in self.simulators.values()),
            critical_threshold_breached=(pfa.is_broken and pfa.pump_on),
        )

        # --- 3. Attention engine evaluation ---
        mode = self.attention.evaluate(field_state)

        # --- 4. Emit all hardware payloads ---
        tasks = [
            self._emit_vfa(vfa),
            self._emit_pmt(pmt),
            self._emit_pfa(pfa),
            self._emit_lrz_nodes(),
            self._emit_ebk_grid(vfa, pmt, mode),
        ]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        for r in results:
            if isinstance(r, Exception):
                logger.error(f"[{self.field_id}] Emit error: {r}")

        # --- 5. Validate payload budget ---
        pmt_lat, pmt_lon = pmt.get_current_location()
        noisy_lat, noisy_lon = apply_gnss_position_error(pmt_lat, pmt_lon, 4)
        imu = simulate_pivot_vibration(pmt.speed_mph)
        pmt_dict = {
            "latitude": noisy_lat, "longitude": noisy_lon,
            "kinematic_angle_deg": pmt.current_angle,
            "span_speed_mph": pmt.speed_mph, "gps_fix_quality": 4,
            **imu
        }
        pfa_dict = {
            "well_pressure_psi": pfa.base_pressure,
            "flow_rate_gpm": pfa.base_flow,
            "pump_status": "running" if pfa.pump_on else "off",
            "current_harmonics": simulate_current_harmonics(pfa.pump_on)
        }
        vfa_dict = {
            **{f"slot_{k.split('_')[1]}_moisture": v for k, v in vfa.moisture_profile.items()},
            "battery_voltage": 12.4,
            "nitrogen_pressure_psi": vfa.nitrogen_pressure,
        }
        lrz_summaries = [{"moisture_surface": n["sim"].moisture_surface,
                           "moisture_root": n["sim"].moisture_root}
                          for n in self._lrz_nodes]
        payload_meta = build_field_state_payload(
            pmt_dict, pfa_dict, vfa_dict, lrz_summaries, [], self.field_id, self._sequence
        )
        if not payload_meta["within_budget"]:
            logger.warning(f"[{self.field_id}] ⚠️ Payload over budget: {payload_meta['byte_count']}B > 187B")

    # ------------------------------------------------------------------
    # Individual hardware emitters
    # ------------------------------------------------------------------

    async def _emit_vfa(self, vfa):
        if vfa.is_broken:
            return
        # Simulate RF packet loss based on PMT distance (approximate)
        rssi = calculate_rssi(150.0, environment="field")  # ~150m from PMT
        if not simulate_fhss_packet_loss(rssi):
            logger.debug(f"[{self.field_id}] VFA packet dropped (FHSS loss simulation)")
            return

        payload = {
            "hardware_id": vfa.hardware_id,
            "field_id": self.field_id,
            "latitude": vfa.latitude,
            "longitude": vfa.longitude,
            "nitrogen_pressure_psi": apply_bounded_noise(vfa.nitrogen_pressure, 1.0, 0, 100),
            "slot_10_moisture": apply_bounded_noise(vfa.moisture_profile["slot_10"], 0.01, 0, 0.5),
            "slot_10_ec":       apply_bounded_noise(1.3, 0.05, 0, 5),
            "slot_10_temp":     apply_bounded_noise(22.0, 0.5, -10, 50),
            "slot_18_moisture": apply_bounded_noise(vfa.moisture_profile["slot_18"], 0.008, 0, 0.5),
            "slot_25_moisture": apply_bounded_noise(vfa.moisture_profile["slot_25"], 0.008, 0, 0.5),
            "slot_25_ec":       apply_bounded_noise(1.2, 0.04, 0, 5),
            "slot_25_temp":     apply_bounded_noise(18.0, 0.3, -10, 50),
            "slot_35_moisture": apply_bounded_noise(vfa.moisture_profile["slot_35"], 0.006, 0, 0.5),
            "slot_48_moisture": apply_bounded_noise(vfa.moisture_profile["slot_48"], 0.005, 0, 0.5),
            "slot_48_ec":       apply_bounded_noise(1.0, 0.03, 0, 5),
            "battery_voltage":  simulate_battery_drain(vfa.battery_voltage, active_tx=True, solar_charging=True),
        }
        try:
            resp = await self.client.post("/api/v1/hardware/vfa/payload", json=payload)
            resp.raise_for_status()
        except Exception as e:
            logger.error(f"VFA emit failed: {e}")

    async def _emit_pmt(self, pmt):
        cur_lat, cur_lon = pmt.get_current_location()
        noisy_lat, noisy_lon = apply_gnss_position_error(cur_lat, cur_lon, 4)
        imu = simulate_pivot_vibration(pmt.speed_mph)

        payload = {
            "hardware_id": pmt.hardware_id,
            "field_id": self.field_id,
            "latitude": noisy_lat,
            "longitude": noisy_lon,
            "kinematic_angle_deg": apply_bounded_noise(pmt.current_angle, 0.05, 0, 360),
            "span_speed_mph": apply_bounded_noise(pmt.speed_mph, 0.02, 0, 5),
            "gps_fix_quality": 4 if not pmt.is_broken else 1,
        }
        try:
            resp = await self.client.post("/api/v1/hardware/pmt/kinematics", json=payload)
            resp.raise_for_status()
        except Exception as e:
            logger.error(f"PMT kinematics emit failed: {e}")

    async def _emit_pfa(self, pfa):
        cavitation = pfa.is_broken
        harmonics = simulate_current_harmonics(pfa.pump_on, cavitation=cavitation,
                                               bearing_wear=0.3 if pfa.is_broken else 0.0)
        payload = {
            "hardware_id": pfa.hardware_id,
            "field_id": self.field_id,
            "well_pressure_psi": max(0, apply_bounded_noise(pfa.base_pressure, 1.5, 0, 200)),
            "flow_rate_gpm":     max(0, apply_bounded_noise(pfa.base_flow, 8.0, 0, 2000)),
            "pump_status": "cavitation_alert" if cavitation else ("running" if pfa.pump_on else "off"),
            "current_harmonics": harmonics,
        }
        try:
            resp = await self.client.post("/api/v1/hardware/pfa/telemetry", json=payload)
            resp.raise_for_status()
        except Exception as e:
            logger.error(f"PFA emit failed: {e}")

    async def _emit_lrz_nodes(self):
        for node in self._lrz_nodes:
            lrz_sim = node["sim"]
            if lrz_sim.is_broken:
                continue
            # LRZ chirps via 900MHz FHSS — simulate higher packet loss (dumb node, lower antenna)
            rssi = calculate_rssi(80.0, environment="field")
            if not simulate_fhss_packet_loss(rssi):
                continue

            payload = {
                "hardware_id": lrz_sim.hardware_id,
                "field_id": self.field_id,
                "latitude": lrz_sim.latitude,
                "longitude": lrz_sim.longitude,
                "moisture_surface": apply_bounded_noise(lrz_sim.moisture_surface, 0.015, 0, 0.5),
                "moisture_root":    apply_bounded_noise(lrz_sim.moisture_root,    0.010, 0, 0.5),
                "temp_surface":     apply_bounded_noise(24.0, 1.5, -10, 60),
                "battery_voltage":  apply_bounded_noise(3.2, 0.02, 2.9, 3.3),
            }
            try:
                resp = await self.client.post("/api/v1/hardware/lrz/reading", json=payload)
                resp.raise_for_status()
            except Exception as e:
                logger.error(f"LRZ [{lrz_sim.hardware_id}] emit failed: {e}")

    async def _emit_ebk_grid(self, vfa, pmt, mode: AttentionMode):
        """
        Compute a 16×16 EBK probability grid from the available
        VFA and LRZ moisture readings using the EdgeKrigingEngine.
        """
        # Collect all active sensor data
        sensors = []
        # Main VFA ground truth
        sensors.append({
            'lat': vfa.latitude, 
            'lon': vfa.longitude, 
            'moisture': sum(vfa.moisture_profile.values()) / len(vfa.moisture_profile)
        })
        
        # LRZ dumb chirps
        for node in self._lrz_nodes:
            lrz = node["sim"]
            if not lrz.is_broken:
                sensors.append({
                    'lat': lrz.latitude,
                    'lon': lrz.longitude,
                    'moisture': (lrz.moisture_surface + lrz.moisture_root) / 2.0
                })

        cur_lat, cur_lon = pmt.get_current_location()
        grid = self.kriging.compute_50m_grid(cur_lat, cur_lon, sensors)
        payload = {
            "hardware_id": pmt.hardware_id,
            "field_id": self.field_id,
            "latitude": cur_lat,
            "longitude": cur_lon,
            "attention_mode": mode.value,
            "grid_resolution_m": 50,
            "grid_rows": 16,
            "grid_cols": 16,
            "moisture_probability_grid": grid,
        }
        try:
            resp = await self.client.post("/api/v1/hardware/pmt/ebk_grid", json=payload)
            resp.raise_for_status()
        except Exception as e:
            logger.error(f"EBK grid emit failed: {e}")
