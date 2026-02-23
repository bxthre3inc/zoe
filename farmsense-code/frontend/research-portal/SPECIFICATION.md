# Research Portal Specification

## Overview

The Research Portal is the deepest, most complex frontend within the FarmSense ecosystem. It is designed exclusively for Zo Data Scientists, Agronomists, and advanced academic partners (e.g., CSU Researchers) to monitor, debug, and refine the core geostatistical engines powering the entire platform.

## 1. Kriging Engine Diagnostics

* **Variogram Visualizer:** Interactive tools for analyzing the experimental and theoretical variograms generated during the 1m Regression Kriging process. Allows scientists to visually verify the sill, range, and nugget parameters fitted by the algorithms.
* **Residual Analysis:** Displays the detrended residuals (the difference between the satellite covariate trend and actual sensor readings) to evaluate the accuracy of the underlying regression models.
* **Uncertainty Mapping:** Visualizes the Kriging variance arrays alongside the primary probability grids. This allows researchers to identify zones across the global network where sensor sparsity is resulting in unacceptably low confidence intervals, indicating the need for additional physical VFA/LRZ deployments.

## 2. Adaptive Recalculation Telemetry

* **Engine State Monitoring:** Real-time visibility into the current operational mode of the Zo Adaptive Recalculation Engine.
* **Event Trigger Logs:** Detailed timelines showing exactly when and why the system shifted from a Dormant (12hr) state to an Active (15m) or Critical (1m) state based on environmental stimuli (e.g., sudden temperature drops, unexpected PFA flow spikes).

## 3. Algorithm Versioning & A/B Testing

* **Model Comparison:** Interface for running "shadow" Kriging engines (e.g., testing a new FHE-enabled interpolation algorithm) alongside the production engine and comparing their spatial outputs before deployment.
* **Historical Re-runs:** The ability to select historic field datasets and re-process them through updated Zo algorithms to quantify exact improvements in deterministic accuracy.

## 4. Architectural Integration

* **Frontend Stack:** React 18, TypeScript. Heavy reliance on WebGL-accelerated charting libraries (e.g., Plotly.js, advanced MapLibre layers) for rendering immense multidimensional arrays.
* **Direct API Access:** Interacts directly with the specialized `cloud-processing` administrative endpoints, bypassing the standard farmer-facing REST APIs.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*
