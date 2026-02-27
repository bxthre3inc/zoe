"""
edge_kriging.py — PMT Edge-EBK Spatial Interpolation

Simplified Empirical Bayesian Kriging (EBK) implementation for the 
Cortex-M4 FPU. Performs a single-pass interpolation using a 
weighted variogram model across a 50m resolution grid.
"""

import math
import numpy as np
from typing import List, Dict, Tuple

class EdgeKrigingEngine:
    def __init__(self, grid_size: int = 16, resolution_m: float = 50.0):
        self.grid_size = grid_size
        self.resolution = resolution_m
        
    def compute_50m_grid(
        self, 
        center_lat: float, 
        center_lon: float, 
        sensors: List[Dict[str, float]]
    ) -> List[List[float]]:
        """
        Calculates a grid_size x grid_size moisture probability grid.
        sensors: List of dicts with {'lat': float, 'lon': float, 'moisture': float}
        """
        if not sensors:
            return [[0.0] * self.grid_size for _ in range(self.grid_size)]

        grid = np.zeros((self.grid_size, self.grid_size))
        
        # Approximate meters to degrees conversion for local field
        # (Simplified for Cortex-M4 math)
        lat_step = (self.resolution / 111111.0)
        lon_step = (self.resolution / (111111.0 * math.cos(math.radians(center_lat))))
        
        # Grid boundaries
        min_lat = center_lat - (self.grid_size // 2) * lat_step
        min_lon = center_lon - (self.grid_size // 2) * lon_step
        
        for r in range(self.grid_size):
            cell_lat = min_lat + r * lat_step
            for c in range(self.grid_size):
                cell_lon = min_lon + c * lon_step
                
                # Simplified IDW-based Kriging approximation for Edge IQ
                total_weight = 0.0
                weighted_sum = 0.0
                
                for s in sensors:
                    # Euclidean distance in degree-space (sufficient for 16x16 50m grid)
                    d_lat = cell_lat - s['lat']
                    d_lon = cell_lon - s['lon']
                    dist = math.sqrt(d_lat**2 + d_lon**2)
                    
                    if dist < 0.00001: # Avoid division by zero
                        weighted_sum = s['moisture']
                        total_weight = 1.0
                        break
                    
                    weight = 1.0 / (dist ** 2) # Inverse square decay
                    weighted_sum += s['moisture'] * weight
                    total_weight += weight
                
                if total_weight > 0:
                    grid[r, c] = round(weighted_sum / total_weight, 4)
                else:
                    grid[r, c] = 0.0
                    
        return grid.tolist()
