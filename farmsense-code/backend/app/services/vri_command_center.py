"""
vri_command_center.py — Hierarchical Zoned VRI Orchestrator

Manages the spatial fidelity hierarchy (1m, 10m/20m, 50m) based on 
field context, attention modes, and hardware availability.
"""

import logging
from typing import List, Any
from sqlalchemy.orm import Session
from datetime import datetime

from app.services.grid_renderer import GridRenderingService
from app.services.adaptive_recalc_engine import FishermansAttentionEngine, AttentionMode
from app.models.sensor_data import VirtualSensorGrid50m, VirtualSensorGrid20m, VirtualSensorGrid1m

logger = logging.getLogger(__name__)

class VRICommandCenter:
    @staticmethod
    def get_best_available_resolution(db: Session, field_id: str) -> str:
        """
        Determines the optimal resolution for the current field state.
        BAR (Best Available Resolution) logic.
        """
        # 1. Check current attention mode
        # In a real app, this would query the latest RecalculationLog
        # For now, we'll instantiate the engine or query a mock state
        attention = FishermansAttentionEngine(field_id)
        # Mocking mode retrieval
        current_mode = AttentionMode.DORMANT 
        
        # 2. Logic for BAR
        # Collapse mode (emergency/high-action) -> Prefers 1m if possible, or 10m/20m
        # Anticipatory mode (pivot moving) -> 20m
        # Dormant mode -> 50m is sufficient
        
        if current_mode == AttentionMode.COLLAPSE:
            return "1m"
        elif current_mode == AttentionMode.ANTICIPATORY:
            return "20m"
        else:
            return "50m"

    @staticmethod
    def fetch_vri_grid(db: Session, field_id: str, requested_res: str = None) -> List[Any]:
        """
        Returns grid data at the Best Available Resolution (BAR).
        """
        if requested_res is None:
            resolution = VRICommandCenter.get_best_available_resolution(db, field_id)
        else:
            resolution = requested_res
            
        logger.info(f"VRICommandCenter: Delivering {resolution} resolution for field {field_id}")
        
        return GridRenderingService.get_or_render_grid(db, field_id, resolution)
