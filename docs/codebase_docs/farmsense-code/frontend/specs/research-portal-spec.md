# Research Portal — Frontend Specification V2.0

**Portal:** `research-portal` | **User Type:** Agronomist / Data Scientist / CSU Researcher  
**Framework:** React + Vite + TypeScript | **Port:** 3003

---

## 1. Objective: The Geostatistical Sandbox

The Research Portal provides the "Raw Metal" access to the Core Simulation Engine (CSE). It focuses on model calibration, kriging validation, and yield correlation.

## 2. Advanced Research Toolset

### 2.1 Kriging Worksheet Inspector

- **Visualization:** A multi-layered map showing:
  - Layer 1: Raw Sensor Points (VFA/LRZ).
  - Layer 2: Variogram Model (Spherical/Exponential fit).
  - Layer 3: Residual Heatmap (Difference between predicted and ground truth).
- **Control:** Sliders for "Kriging Range," "Sill," and "Nugget" parameters to tune the model in real-time.

### 2.2 SPAC (Soil-Plant-Atmosphere Continuum) Lab

- **Chart:** 3D surface plot of Volumetric Water Content (VWC) vs. Vapor Pressure Deficit (VPD) vs. NDVI.
- **Analysis:** Calculates the "Thermal Stress Threshold" (TST) for specific potato/barley varieties used in the SLV.

### 2.3 Federated Learning Console

- **Focus:** Global model updates without private data exposure.
- **UI:** Verification of "Differential Privacy" parameters (epsilon/delta sliders) and monitoring of decentralized training loops across regional DHUs.

## 3. Data Integrity & Export

### 3.1 Raw STAC Browser

- **Integration:** Visual browser for Sentinel-2/Landsat-9 raw COGs (Cloud Optimized GeoTIFFs).
- **Feature:** Manual band-math calculator (e.g., custom NDWI or SAVI formulas).

### 3.2 Export Formats

- **Standard:** CSV, JSON.
- **Scientific:** NetCDF, GeoTIFF, and R-Script snippets for programmatic analysis in RStudio.

## 4. API Endpoints (Research Tier)

- `GET /v2/research/variogram/{field_id}`: Raw geostatistical parameters.
- `GET /v2/research/satellite/meta`: Direct STAC metadata access.
- `POST /v2/research/calibrate`: Pushes new Kriging parameters to the RDC test-bed.

---
*Status: Approved for Unified Engineering Realignment*
