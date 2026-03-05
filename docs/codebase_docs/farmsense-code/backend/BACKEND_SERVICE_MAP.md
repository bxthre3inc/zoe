# FarmSense Backend Service Map

> **Canonical reference** for all backend service modules in `farmsense-code/backend/app/services/`.
> Each service is a discrete Python module consumed by the FastAPI router layer.
>
> Related: [`SOFTWARE_INDEX.md`](../SOFTWARE_INDEX.md) | [`ARCHITECTURE.md`](../ARCHITECTURE.md)

*Last updated: 2026-03-05*

---

## Service Dependency Overview

```
API Routers
    │
    ├── vri_command_center        ← top-level spatial orchestrator
    │       ├── adaptive_recalc_engine   ← AttentionMode scheduler
    │       └── grid_renderer            ← tile generation
    │
    ├── rss_kriging               ← 1m GPR Kriging (FHE stubs)
    │       ├── satellite_service        ← Sentinel-2/Landsat STAC
    │       └── terrain                  ← DEM slope correction
    │
    ├── decision_engine           ← reflex logic (PMT stall → PFA stop)
    │       └── notification_service     ← alert dispatch
    │
    ├── trading_service           ← water credit trading (AllianceChain)
    ├── equity_service            ← water rights equity calculations
    ├── csa_alignment             ← corner-swing kinematic resolver
    ├── predictive_maintenance    ← FFT motor health from PFA CT data
    ├── spatial_privacy           ← dual-layer coordinate anonymization
    ├── globalGAP_compliance      ← GLOBALG.A.P. certification checks
    ├── external_data_service     ← satellite + external API ingestion
    ├── jadc2_adapter             ← DoD JADC2 tactical data translation
    └── satellite_service         ← Sentinel-2/Landsat fetch + NDVI/NDRE
```

---

## Services

### `adaptive_recalc_engine.py`

**Role:** AttentionMode scheduler — controls when and at what resolution the spatial grid recalculates.

| Property | Detail |
|---|---|
| **Class** | `AdaptiveRecalculationEngine` |
| **Key Enum** | `AttentionMode` — `DORMANT`, `ANTICIPATORY`, `ANOMALY`, `COLLAPSE` |
| **Logic** | Fisherman's Attention scale: dormant=4-hour sweeps, anticipatory=1-hour, anomaly=15-min, collapse=5-sec |
| **Hardware trigger** | PMT IMU/GNSS pivot-active detection → triggers `COLLAPSE` mode |
| **Database** | Writes `RecalculationLog` entries for audit trail |
| **Used by** | `vri_command_center` |

---

### `csa_alignment.py`

**Role:** Corner-swing arm kinematic resolver — converts dual-node GNSS positions into swing-arm angle (θ) for spatial grid correction.

| Property | Detail |
|---|---|
| **Hardware** | CSA dual-node (PST + SAT), each with ZED-F9P RTK GNSS |
| **Algorithm** | Law of Cosines: `θ = arccos((d1²+d2²-d3²)/(2·d1·d2))` |
| **Output** | θ angle fed into PFA flow readings to compute Gallons/Acre at 1m field edge |
| **ZVRI integration** | If θ > 120°, boosts pivot speed to normalize application across extended radius |
| **Used by** | Irrigation router for corner-field VRI accuracy |

---

### `decision_engine.py`

**Role:** Reflex logic orchestrator — evaluates field-state conditions and issues "Soft-Stop" or "VRI Adjust" commands in real time.

| Property | Detail |
|---|---|
| **Reflex rules** | `PMT_STALL → ACTUATE_STOP`, `BURST_MAINLINE → ACTUATE_STOP`, `SATURATION_ALERT → ACTUATE_STOP` |
| **Latency target** | Sub-cloud (DHU-local execution) to bypass internet round-trip |
| **Downstream** | Issues commands to PFA relay, writes `DecisionLog`, triggers `notification_service` |
| **Used by** | `hardware` and `analytics` routers |

---

### `equity_service.py`

**Role:** Water rights equity calculations — computes Water-ROI per acre-foot, irrigation efficiency scoring, and allocation sufficiency for each field.

| Property | Detail |
|---|---|
| **Model** | `WaterAllocation`, `WaterTrade` (from `models/water_rights.py`) |
| **Output** | Per-field Water-ROI, depletion risk score, equity dashboard data |
| **Used by** | Investor dashboard and `trading_service` (validates pre-trade quota) |

---

### `external_data_service.py`

**Role:** Satellite and external API ingestion gateway — abstracts STAC catalog queries and third-party API calls behind a unified interface.

| Property | Detail |
|---|---|
| **Providers** | Microsoft Planetary Computer, AWS STAC (production); `MockSTAC` (dev/test) |
| **Collections** | Sentinel-2 MSI, Landsat-9 OLI |
| **Bands targeted** | Red Edge (RE), NIR, SWIR for NDVI/NDRE/NDWI computation |
| **env flag** | `SATELLITE_PROVIDER` in `.env` switches between mock and live |
| **Used by** | `satellite_service`, `rss_kriging` |

---

### `globalGAP_compliance.py`

**Role:** GLOBALG.A.P. certification compliance engine — validates field practices and generates compliant audit records.

| Property | Detail |
|---|---|
| **Standard** | GLOBALG.A.P. IFA (Integrated Farm Assurance) |
| **Checks** | Water usage within allocated limits, pesticide application boundaries, traceability chain |
| **Output** | Compliance certificate payload for regulatory portal; audit log signed with field key |
| **Status** | ✅ Implemented (verified in earlier audit — `todo.md` task complete) |
| **Used by** | `compliance` router |

---

### `grid_renderer.py`

**Role:** Virtual sensor grid tile generator — produces 50m, 20m, 10m, and 1m resolution grid tiles for map rendering.

| Property | Detail |
|---|---|
| **Class** | `GridRenderingService` |
| **Tiers** | `VirtualSensorGrid50m` (PMT EBK), `VirtualSensorGrid20m`/`10m` (DHU Kriging), `VirtualSensorGrid1m` (RSS GPR) |
| **Tier enforcement** | Checks JWT subscription tier before returning resolution — triggers "Resolution Pop" blur for locked tiers |
| **Output format** | GeoJSON Feature Collections with sensor-value properties per tile |
| **Used by** | `vri_command_center`, map tile API router |

---

### `jadc2_adapter.py`

**Role:** DoD JADC2 (Joint All-Domain Command and Control) tactical data translation adapter — converts FarmSense sensor payloads into JADC2-compatible formats for inter-agency data sharing.

| Property | Detail |
|---|---|
| **Purpose** | Enables FarmSense terrain data (soil moisture → trafficability) to feed DoD tactical systems |
| **Data path** | `AKP-LRZ mesh → RSS → jadc2_adapter → JADC2 endpoint` |
| **Payload** | Soil moisture, EC, terrain trafficability scores in STANAG-aligned schema |
| **Auth** | DoD-specific API key, separate from farmer JWT auth |
| **Used by** | `federated` router (inter-agency data sharing endpoint) |

---

### `notification_service.py`

**Role:** Multi-channel alert dispatch — sends farmer/operator alerts via SMS, email, and webhook when thresholds are breached or reflex events fire.

| Property | Detail |
|---|---|
| **Channels** | SMS (Twilio), Email (SendGrid), Webhook (configurable), WebSocket push |
| **Priority levels** | `CRITICAL` (PFA stop), `WARNING` (MAD threshold), `INFO` (routine reports) |
| **Used by** | `decision_engine`, threshold monitors in `adaptive_recalc_engine` |

---

### `predictive_maintenance.py`

**Role:** FFT-based motor health prediction — analyzes CT clamp data from PFA to detect motor faults before failure.

| Property | Detail |
|---|---|
| **Input** | 3-phase current harmonics (Phase A/B/C) from Magnelab SCT-1250 CT clamps via PFA |
| **Algorithm** | 1,024-point FFT; isolates 3rd/5th harmonics for True Power Factor; detects cavitation sidebands, torque ripple, bearing harmonics |
| **Prediction horizon** | Flags issues 7–14 days before catastrophic motor burn-out |
| **Output** | `HealthScore` (0–100), `FaultType` enum, estimated days-to-failure |
| **Used by** | `hardware` router; alerts routed through `notification_service` |

---

### `rss_kriging.py`

**Role:** Regional Superstation 1m Regression Kriging engine — FarmSense's highest-fidelity spatial interpolation service.

| Property | Detail |
|---|---|
| **Class** | `RSSKrigingEngine` + `FHEVector` |
| **Algorithm** | Gaussian Process Regression (sklearn GPR) with RBF + ConstantKernel + WhiteKernel |
| **FHE integration** | TenSEAL CKKS encryption stubs (poly_modulus_degree=8192) for encrypted computation on sensitive spatial data |
| **Inputs** | LRZ/VFA sensor pings, Sentinel-2 NDVI/NDRE, Static Soil Variability Maps, DEM from `terrain` service |
| **Output** | 15,600 virtual sensors per 160-acre field at 1m resolution |
| **Dependency** | `sklearn` (required), `tenseal` (optional — FHE disabled if absent) |
| **Used by** | `analytics` router (1m grid endpoint) |

---

### `satellite_service.py`

**Role:** Sentinel-2/Landsat-9 data fetch and spectral index computation.

| Property | Detail |
|---|---|
| **Class** | `SatelliteDataService` |
| **Data sources** | STAC catalogs (Microsoft Planetary Computer / AWS) via `external_data_service` |
| **Computed indices** | NDVI (crop health), NDRE (nitrogen stress), NDWI (water stress) |
| **Cloud filtering** | Skips scenes with >30% cloud cover |
| **Cadence** | 5-day Sentinel-2 revisit cycle; 16-day Landsat backup |
| **Used by** | `rss_kriging`, `external_data_service` |

---

### `spatial_privacy.py`

**Role:** Dual-layer coordinate anonymization — prevents reverse-geocoding of individual field locations in aggregated/federated data exports.

| Property | Detail |
|---|---|
| **Layer 1** | Geometric: GPS jitter (±50m uniform noise), grid-cell snapping, bounding-box generalization |
| **Layer 2** | Contextual: k-anonymity (suppress if <k sensors per cell), Differential Privacy (Laplace noise, ε=0.5 for moisture, ε=1.0 for temp), field-boundary stripping (opaque `cluster_id`) |
| **References** | Dwork 2006 (Differential Privacy), Sweeney 2002 (k-anonymity) |
| **Status** | ✅ Implemented (verified in earlier audit) |
| **Used by** | `federated` router, all external data export paths |

---

### `terrain.py`

**Role:** Digital Elevation Model (DEM) integration — generates 1m resolution topographic mesh for slope correction in Kriging.

| Property | Detail |
|---|---|
| **Class** | `TerrainService` |
| **Data source** | PostGIS Raster (production) / USGS 3DEP API; deterministic synthetic mesh for V1 MVP |
| **Base elevation** | 2,336m (Monte Vista SLV average) |
| **Algorithm** | Multi-octave Perlin-style noise for realistic terrain; seeded by `field_id` for consistency |
| **Output** | 1m DEM grid: elevation matrix + gradient (slope) matrix for run-off correction |
| **Used by** | `rss_kriging` (slope correction on moisture gradient interpolation) |

---

### `trading_service.py`

**Role:** Water credit trading marketplace — enables peer-to-peer water rights transfers between farms via PBFT AllianceChain consensus.

| Property | Detail |
|---|---|
| **Class** | `WaterTradingService` |
| **Consensus** | Broadcasts to DHU AllianceChain via HTTP (`DHU_ALLIANCE_CHAIN_URL` env var) for PBFT commit |
| **Persistence** | Trade stored locally as `PENDING`, transitions to `COMMITTED` on DHU callback (`POST /api/v1/trade/callback`) |
| **Resilience** | If DHU unreachable, trade stays `PENDING` and retries on reconnect |
| **Model** | `WaterAllocation`, `WaterTrade`, `TradeStatus` enum |
| **Used by** | `trading` router |

---

### `vri_command_center.py`

**Role:** Top-level Variable Rate Irrigation spatial hierarchy orchestrator — determines which grid resolution to serve based on current `AttentionMode` and hardware availability.

| Property | Detail |
|---|---|
| **Class** | `VRICommandCenter` |
| **Logic** | BAR (Best Available Resolution): `COLLAPSE` → 1m, `ANTICIPATORY` → 20m, `DORMANT` → 50m |
| **Fallback** | If 1m grid unavailable, falls back to next available tier |
| **Inputs** | `AdaptiveRecalculationEngine.AttentionMode`, `GridRenderingService`, DB grid records |
| **Used by** | Primary VRI command router; PMT autonomous failover mode |

---

## API Router ↔ Service Mapping

| Router file | Primary services consumed |
|---|---|
| `analytics.py` | `rss_kriging`, `grid_renderer`, `satellite_service`, `terrain` |
| `compliance.py` | `globalGAP_compliance`, `spatial_privacy` |
| `federated.py` | `jadc2_adapter`, `spatial_privacy` |
| `grants.py` | `equity_service` |
| `hardware.py` | `predictive_maintenance`, `decision_engine`, `csa_alignment` |
| `metrics.py` | `adaptive_recalc_engine`, `vri_command_center` |
| `trading.py` | `trading_service`, `equity_service` |
| `users.py` | `notification_service` |

---

*Generated from source audit — 2026-03-05*
