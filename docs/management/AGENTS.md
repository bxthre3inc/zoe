# FarmSense Project Memory

## Document Map

| Document | Purpose | Audience |
|----------|---------|----------|
| `FarmSense_Master_Manual.md` | Comprehensive system documentation (7,936 lines) | External: investors, grants, water court, partners |
| `FarmSense_Internal_Guide.md` | Development workflow & AI assistant instructions | Internal: developers, AI assistants |
| `RECONCILIATION_CHECKLIST.md` | Code ↔ documentation alignment tracker | Internal: project management |

---

## CRITICAL INSTRUCTIONS FOR AI ASSISTANT

### Before Creating ANYTHING

1. **CHECK EXISTING ROUTES FIRST**: Use `list_space_routes` to see all current pages and APIs
2. **CHECK EXISTING FILES**: Use `grep_search` or `list_files` before creating new files
3. **CHECK AGENTS.MD**: Read this file at the start of every conversation for context
4. **ASSUME NOTHING EXISTS**: Always verify before assuming something needs to be created

---

## CURRENT PHASE: Pilot Validation (NOW - June 2026)

### Critical Deadlines

| Deadline | Date | Deliverable |
|----------|------|-------------|
| Federal Federal ESG Pre-Proposal | March 26, 2026 | Grant application submitted |
| CSU SLV Pilot Deployment | April 2026 | Hardware installed, data flowing |
| Water Court Evidence | June 2026 | Empirical hydrodynamic proof |

### Immediate Focus

1. Backend & API deployment to Zo server
2. Frontend portal deployment (farmer, regulatory, marketing)
3. Hardware BOM finalization and ordering
4. Federal ESG grant application drafting

---

## Architecture Principle: Anti-AI / Deterministic

FarmSense uses **deterministic, judgment-based algorithms** - NOT ML/AI black boxes.

- Water courts don't accept AI decisions
- All logic must be explainable and auditable
- See `file 'farmsenseOS/GENUINELY_NOVEL_IP.md'` for defensible moats

**Future AI**: Post-beta, sandboxed Digital Twin simulations only.

- See `file 'farmsenseOS/AI_INTEGRATION_ROADMAP.md'`
- **DO NOT ACT** until user says "begin to integrate AI per our previous discussions"

---

## Vision: Global Water Ledger

FarmSense as sovereign water infrastructure—legally recognized, cryptographically secure, scientifically absolute.

### Scaling Roadmap

1. **Pilot** (Now - June 2026): CSU SLV 2-Field Pilot
2. **Regional Master** (Q3-Q4 2026): 100% SLV Subdistrict 1
3. **State Standard** (2027): Colorado DWR adoption
4. **National Layer** (2028): USDA/USGS partnership
5. **Sovereign Global** (2029+): International G2G treaties

### Resolution Pop UI Transition

| Tier | Resolution | Price | Target |
|------|------------|-------|--------|
| Free | 50m | $0 | Government baseline |
| Basic | 20m | $49/mo | Small farmers |
| Pro | 10m | $199/mo | Commercial farms |
| Enterprise | 1m | Custom | ESG, enforcement |

---

## Dependency Reduction

See `file 'farmsenseOS/DEPENDENCY_REDUCTION.md'` for full plan.

- Phase 1 ✅: Removed numpy, pandas, scipy, scikit-learn, redis, celery, requests
- Next: Phase 3 (clsx/tailwind-merge replacement)

---

## Project Overview

**FarmSense** is a deterministic precision agriculture operating system designed for:

- **Agronomic Output**: 20-30% reduction in irrigation water, 18-22% increase in ROI
- **Economic Output**: Continuous Cost-Benefit Analysis preventing water deployment when costs exceed yield revenue
- **Legal Output**: Cryptographically secure "Water Ledger" valid in State Water Courts

### Core Philosophy

- **Deterministic, judgment-based algorithms** — NOT ML/AI black boxes
- All logic must be explainable and auditable for water court admissibility
- Future AI: Post-beta, sandboxed Digital Twin simulations only

### Current Deployment Target

**2-Field Pilot at CSU San Luis Valley (SLV) Research Center, Center, Colorado**

- Purpose: Generate empirical Gold Standard data for June 2026 Subdistrict 1 Water Court
- Hardware: 2 PMTs, 2 PFAs, 2 VFAs, 16-20 LRZs
- Grant deadline: Federal Federal ESG pre-proposal (March 26, 2026)

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    FARMSENSE PLATFORM                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────┐          │
│  │   Sensors   │  │   Pumps     │  │    Weather     │          │
│  │   (IoT)     │  │ (Telemetry) │  │   (Stations)   │          │
│  └──────┬──────┘  └──────┬──────┘  └───────┬────────┘          │
│         └─────────────────┴─────────────────┘                   │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │  PMT (Edge)  │  10-15ft pivot span mount   │
│                    │  50m Grid    │  Edge-EBK, FHSS hub         │
│                    └──────┬───────┘                            │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │    DHU       │  35ft pole, 10km radius     │
│                    │   20m Grid   │  Regional mesh manager      │
│                    └──────┬───────┘                            │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │ RSS / Cloud  │  40ft container cluster     │
│                    │    1m Grid   │  Regression Kriging         │
│                    └──────┬───────┘                            │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │   Zo Server  │  Core compute (this server) │
│                    │  Analytics   │  Adaptive recalc engine     │
│                    └──────────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Hardware Tiers

| Device | Level | Role | Density |
|--------|-------|------|---------|
| **LRZ** (Lateral Root-Zone Scout) | 1 | Dumb spatial mapper | 1 per 15 acres |
| **VFA** (Vertical Field Anchor) | 1 | 48" deep-profile truth node | 1 per field |
| **PFA** (Pressure & Flow Anchor) | Sentry | Wellhead pump telemetry | 1 per wellhead |
| **PMT** (Pivot Motion Tracker) | 1.5 | Field hub, edge-EBK engine | 1 per pivot |
| **CSA** (Corner-Swing Auditor) | 1.5 | Swing-arm tracking | Dual-node config |
| **DHU** (District Hub) | 2 | Regional mesh manager | 10km radius |
| **RSS** (Regional Superstation) | 3 | Territory master | Container cluster |

### Robotics & Autonomy

FarmSense supports autonomous field operations tracked via the `robotics_missions` model:

| Mission Type | Description | Tracking |
|--------------|-------------|----------|
| Weeding | Autonomous weed removal | Path data, coverage area |
| Seeding | Precision planting | Row spacing, depth |
| Spraying | Targeted application | Chemical usage, drift |

Robotic devices report real-time telemetry including battery level, mission status, and coverage metrics.

---

## Water Markets & Trading

FarmSense includes a water trading system for federal water market integration:

| Component | Purpose |
|-----------|---------|
| `trading.py` router | Water allocation trading endpoints |
| `trading_service.py` | Market logic, pricing, transaction execution |
| `water_rights.py` model | Water rights ownership, allocations, transfers |

**Features:**
- Water allocation buy/sell orders
- Transfer verification & chain of custody
- Market price tracking
- Integration with Water Ledger for legal admissibility

---

## File Locations

### Backend (FastAPI)

```
farmsense-code/backend/
├── app/
│   ├── api/
│   │   ├── main.py              # API entrypoint
│   │   ├── routers/
│   │   │   ├── hardware.py      # Sensor data ingestion
│   │   │   ├── users.py         # Admin user management
│   │   │   ├── metrics.py       # Stakeholder metrics
│   │   │   ├── grants.py        # Grants & investment
│   │   │   ├── analytics.py     # Geospatial analytics
│   │   │   ├── compliance.py    # SLV 2026 compliance
│   │   │   ├── trading.py       # Water market operations
│   │   │   └── federated.py     # Inter-agency / Federal data fabric
│   │   └── tiles.py             # Map tiles
│   ├── models/
│   │   ├── sensor_data.py       # SQLAlchemy models
│   │   ├── devices.py           # Hardware models
│   │   ├── user.py              # User models
│   │   └── water_rights.py      # Water rights & allocations
│   ├── services/
│   │   ├── adaptive_recalc_engine.py  # Judgment-based recalc
│   │   ├── decision_engine.py         # Deterministic logic
│   │   ├── grid_renderer.py           # Spatial grid rendering
│   │   ├── vri_command_center.py      # VRI actuation orchestrator
│   │   ├── trading_service.py         # Water market trading
│   │   ├── jadc2_adapter.py           # Inter-agency / Federal data fabric
│   │   ├── satellite_service.py       # Satellite data integration
│   │   ├── spatial_privacy.py         # Dual-layer spatial privacy
│   │   ├── rss_kriging.py             # RSS Kriging operations
│   │   ├── globalGAP_compliance.py    # GLOBALG.A.P. compliance
│   │   ├── predictive_maintenance.py  # Predictive maintenance
│   │   ├── csa_alignment.py           # CSA alignment service
│   │   ├── terrain.py                 # Terrain analysis
│   │   ├── equity_service.py          # Equity/investment service
│   │   ├── external_data_service.py   # External data integration
│   │   └── notification_service.py    # Notification system
│   └── core/
│       ├── database.py          # PostgreSQL/TimescaleDB
│       └── websocket.py         # Real-time updates
└── requirements.txt
```

### Frontend (React + TypeScript)

```
farmsense-code/frontend/
├── farmsense-portal/        # Farmer field interface (renamed from farmer-dashboard)
├── regulatory-portal/       # SLV 2026 compliance
├── investor-dashboard/      # Investment portal
├── grant-portal/            # Grant reviewer portal
├── admin-dashboard/         # System admin
├── research-portal/         # Research data
├── docs-portal/             # Documentation
├── marketing-site/          # Public marketing
└── shared/                  # Shared design system
```

### Specifications

```
specifications/
├── Master Specification: Lateral Root-Zone Scout (LRZ) V1.21.md
├── Master Specification: Vertical Field Anchor (VFA) V1.21.md
├── Master Specification: Pressure & Flow Anchor (PFA) V1.9.md
├── Master Specification: Pivot Motion Tracker (PMT) V1.6.md
├── Master Specification: Corner-Swing Auditor (CSA) V1.0.md
├── Master Specification: District Hub (DHU) V1.1.md
├── Master Specification: Regional Superstation (RSS) V1.3.md
└── Master Specification: Aerial Fleet Strategy V1.3.md
```

### Reference Documents

```
reference/
├── Due Diligence and Systems Architecture Audit_ FarmSense San Luis Valley Pilot.md
├── FarmSense Long Term Roadmap.md
├── FarmSense: Technical Project Overview & Research Validation Guide.md
└── Subdistrict_1_Market_Intelligence.md
```

---

## API Endpoints

| Router | Prefix | Purpose |
|--------|--------|---------|
| hardware | `/api/v1/hardware` | Sensor data ingestion |
| users | `/api/v1/users` | Admin user management |
| metrics | `/api/v1/metrics` | Stakeholder metrics |
| grants | `/api/v1/grants` | Grants & investment |
| analytics | `/api/v1/analytics` | Geospatial analytics |
| compliance | `/api/v1/compliance` | SLV 2026 compliance |
| trading | `/api/v1/trading` | Water market operations |
| federated | `/api/v1/federated` | Inter-agency / Federal data fabric |
| tiles | `/api/v1/tiles` | Map tiles |
| ws | `/ws` | WebSocket real-time |

---

## Tier Structure (CANONICAL)

| Tier | Price | Grid Resolution | Features |
|------|-------|-----------------|----------|
| Free | $0 | 50m | Read only, no actuation |
| Basic | $49/mo | 20m | Irrigation recommendations |
| Pro | $199/mo | 10m | Actuation, daily reports |
| Enterprise | Custom | 1m | Compliance guarantee, connect any hardware |

---

## User Types & Portals

| User Type | Portal | Description |
|-----------|--------|-------------|
| Farmer | `farmer-dashboard` | Field management, irrigation |
| Investor | `investor-dashboard` | Investment info, equity |
| Grant Reviewer | `grant-portal` | Grant applications, support letters |
| Admin | `admin-dashboard` | System management |
| Regulator | `regulatory-portal` | SLV 2026 compliance monitoring |
| Researcher | `research-portal` | Research data access |

---

## Adaptive Recalculation Modes

| Mode | Interval | Trigger |
|------|----------|---------|
| DORMANT | 4 hours | Stable conditions |
| ANTICIPATORY | 60 min | Anticipated changes |
| RIPPLE | 15 min | Active monitoring |
| COLLAPSE | 1 min | Critical events |

### Decision Logic (Judgment-Based, NOT AI)

1. **Critical events** → Immediate recalc (moisture drops >30% in 6h, pump failure)
2. **Out-of-turn triggers** → Event-driven (sensor anomalies, rainfall >10mm/h)
3. **Trend-based** → Scheduled (volatility score, moisture trends, irrigation status)

---

## Key Thresholds

```python
'moisture_stable_band': 0.05        # ±5% is stable
'moisture_active_threshold': 0.15   # >15% = active
'moisture_critical_threshold': 0.30 # >30% = critical
'trend_volatile_threshold': 2.0     # >2%/hr = volatile
'temp_stress_threshold': 35.0       # >35°C = heat stress
'rainfall_event_threshold': 10.0    # >10mm = significant
```

---

## Current Task Status

### Completed ✅

- [x] Rectify DHU BOM for 900MHz LoRaWAN gateway
- [x] Rectify PMT BOM for 2.4GHz/BLE module
- [x] Validate Thermal Loss capacity for 5W Kapton heater
- [x] Integrate HPC with PMT LiSOCl2 battery
- [x] Treat Polycarbonate with fluoropolymer coatings
- [x] Implement Predictive Maintenance via Current Harmonic Analysis
- [x] Integrate k-means ML Kriging algorithms

### Pending 🔄

- [ ] Implement PBFT Alliance-Chain Blockchain in DHU
- [ ] Build Federal Federated Data Fabric Adapters
- [ ] Implement Dual-Layer Spatial Privacy
- [ ] Develop automated GLOBALG.A.P. compliance reports
- [ ] Verify LPI/LPD logic on LRZ FHSS chirps
- [ ] Concept design for Rapid Deployment Housing
- [ ] Upgrade RSS for FHE Kriging operations
- [ ] Draft Federal Federal ESG pre-proposal (Deadline: March 26, 2026)

---

## Reading Order for New Developers

1. `BLUEPRINT.md` — Vision and existential threat context
2. `PROJECT_OVERVIEW.md` — Codebase delivery overview
3. `ARCHITECTURE.md` — Detailed system interactions
4. `FEATURESET.md` — Current capabilities and dual-use features
5. `IMPLEMENTATION_GUIDE.md` — Timeline and deployment sequences
6. `todo.md` — Active task board

---

## Performance Targets

| Metric | Target | Critical |
|--------|--------|----------|
| API Response (p95) | <200ms | <500ms |
| Sensor Ingestion | 10K/sec | 5K/sec |
| 20m Grid Compute | <30 sec | <60 sec |
| 1m Grid Compute | <5 min | <10 min |
| Dashboard Load | <2 sec | <5 sec |
| System Uptime | 99.9% | 99.5% |

---

## Hardware BOM Summary

**Minimum Viable Hardware Stack (2-Field Pilot):**

- 2x PMT (Pivot Motion Tracker)
- 2x PFA (Pressure & Flow Anchor)
- 2x VFA (Vertical Field Anchor)
- 16-20x LRZ (Lateral Root-Zone Scout)

**Total Investment**: $5,382,940 (for Subdistrict 1: 19,466 devices)

---

## Regulatory Context

- **Subdistrict 1**: 117,000 acres, San Luis Valley, Colorado
- **Water Court Deadline**: June 2026
- **Compliance**: SLV 2026 regulatory alignment
- **Audit Requirement**: Immutable, cryptographically signed chain of custody

---

## Security Requirements

- JWT authentication for API
- 128-bit AES encryption for field data
- FHSS (Frequency-Hopping Spread Spectrum) for LRZ communications
- Dual-layer spatial privacy (exact GPS locked, cloud data anonymized)
- FHE (Fully Homomorphic Encryption) planned for RSS

---

## Dual-Use (Federal) Features

- LPI/LPD native FHSS architecture
- Inter-agency-compliant UGS network
- Air-deliverable kinetic penetrator housings
- FHE Kriging on encrypted data
- Federal ESG grant application in progress

### Inter-agency / Federated Data Fabric

The `federated.py` router enables integration with Department of Defense data sharing infrastructure:

| Capability | Description |
|------------|-------------|
| Inter-agency Compliance | Joint All-Domain Command & Control compatible |
| Data Fabric Adapters | Secure data exchange with Federal systems |
| Federated Queries | Cross-domain data access without data leaving secure enclaves |
| FHE Support | Fully Homomorphic Encryption for sensitive operations |

---

*Last updated: 2026-03-03*
*Repository: github.com/bxthre3inc/farmsenseOS*
*Server: brodiblanco.zo.computer*
