# FarmSense Development Roadmap

## Vision: Global Water Ledger

FarmSense as the definitive sovereign water infrastructure—legally recognized, cryptographically secure, scientifically absolute.

---

## Timeline Overview

| Phase | Timeline | Goal | Status |
|-------|----------|------|--------|
| **Pilot** | Now - June 2026 | CSU SLV 2-Field Pilot + Water Court Evidence | 🔄 Active |
| **Regional Master** | Q3-Q4 2026 | 100% SLV Subdistrict 1 coverage | 📋 Planned |
| **State Standard** | 2027 | Colorado statewide DWR adoption | 📋 Planned |
| **National Layer** | 2028 | USDA/USGS partnership | 📋 Planned |
| **Sovereign Global** | 2029+ | International G2G treaties | 📋 Planned |

---

## Phase 1: Pilot Validation (NOW - June 2026)

### Critical Deadlines

| Deadline | Date | Deliverable |
|----------|------|-------------|
| Federal Federal ESG Pre-Proposal | March 26, 2026 | Grant application submitted |
| CSU SLV Pilot Deployment | April 2026 | Hardware installed, data flowing |
| Water Court Evidence | June 2026 | Empirical hydrodynamic proof |
| World Food Prize Nomination | Q3 2026 | Empirical metrics package |

### Immediate Engineering Tasks

#### Week 1-2: Backend & API Hardening

- [ ] Verify all API endpoints return valid responses
- [ ] Test sensor data ingestion pipeline
- [ ] Validate Adaptive Recalculation Engine logic
- [ ] Set up PostgreSQL + TimescaleDB on Zo server
- [ ] Deploy docker-compose.zo-unified.yml

#### Week 3-4: Frontend Portal Deployment

- [ ] Deploy farmer-dashboard to Zo server
- [ ] Deploy regulatory-portal (compliance reporting)
- [ ] Deploy marketing-site (public landing)
- [ ] Configure Nginx routing for all portals

#### Week 5-6: Hardware Integration

- [ ] Finalize PMT firmware spec
- [ ] Finalize VFA firmware spec
- [ ] Finalize LRZ firmware spec
- [ ] Finalize PFA firmware spec
- [ ] Order prototype components

#### Week 7-8: Grant & Documentation

- [ ] Draft Federal Federal ESG pre-proposal
- [ ] Create pilot hardware BOM with costs
- [ ] Document Kriging validation methodology
- [ ] Prepare Water Court evidence template

### Technical Architecture for Pilot

```
┌─────────────────────────────────────────────────────────────┐
│                    FARMSENSE PILOT STACK                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ZO SERVER (brodiblanco.zo.computer)      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │  │
│  │  │ PostgreSQL  │  │ TimescaleDB │  │    Redis     │ │  │
│  │  │ + PostGIS   │  │ (time-series)│  │   (cache)    │ │  │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘ │  │
│  │         │                │                 │          │  │
│  │  ┌──────▼────────────────▼─────────────────▼───────┐ │  │
│  │  │              FASTAPI BACKEND                     │ │  │
│  │  │  • Sensor ingestion  • Adaptive recalc engine   │ │  │
│  │  │  • Kriging endpoints • Compliance reports       │ │  │
│  │  └──────────────────────┬──────────────────────────┘ │  │
│  │                         │                             │  │
│  │  ┌──────────────────────▼──────────────────────────┐ │  │
│  │  │                 NGINX REVERSE PROXY              │ │  │
│  │  │  /api → backend  /farmer → farmer-dashboard     │ │  │
│  │  │  /regulatory → regulatory-portal                │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              CSU SLV PILOT SITE (Center, CO)          │  │
│  │  ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐     │  │
│  │  │ PMT-1 │   │ PMT-2 │   │ PFA-1 │   │ PFA-2 │     │  │
│  │  │(Hub)  │   │(Hub)  │   │(Well) │   │(Well) │     │  │
│  │  └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘     │  │
│  │      │           │           │           │           │  │
│  │  ┌───▼───────────▼───────────▼───────────▼───┐     │  │
│  │  │         VFA-1 / VFA-2 (Ground Truth)       │     │  │
│  │  └─────────────────┬─────────────────────────┘     │  │
│  │                    │                                │  │
│  │  ┌─────────────────▼─────────────────────────┐     │  │
│  │  │    LRZ Fleet (16-20 units, 1 per 15 acres) │     │  │
│  │  └───────────────────────────────────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 2: Regulatory Capture & Spatial Scarcity (Q3-Q4 2026)

### Infrastructure & Compliance

- [ ] Deploy 25x 40ft Cedar Pole DHU nodes across Subdistrict 1.
- [ ] Instrument 1,280 fields (100% Subdistrict 1 coverage).
- [ ] Implement PBFT AllianceChain validator for Water Court evidence.
- [ ] Set up localized Faraday shielding for the RSS core compute.

### SaaS & Monetization (Subsidized Hardware)

- [ ] Fully implement Tier 0-3 hierarchical spatial grids (50m, 20m, 10m, 1m).
- [ ] Deploy ZVRI automated zone routing for Enterprise users.
- [ ] Automate infrastructure loan subsidy tracking for SD1 farmers.

---

## Phase 3: Strategic Alignment & Dual-Use Expansion (2027)

### Federal / Inter-agency Integration (Federal ESG)

- [ ] Align FHSS encryption for LPI/LPD military requirements.
- [ ] Pilot HALO-dropped "Ballistic-grade Penetrator" sensor shells.
- [ ] Deploy Federated Data Fabric adapters for Inter-agency compliance.

### Global Philanthropy (Gates Foundation)

- [ ] Democratize LRZ architecture for smallholder farmer advisory ($50.80 target).
- [ ] Pilot low-bandwidth satellite backhauls for trans-boundary water conflict areas.

### Colorado River Compact Compliance

- [ ] 15+ RSS deployments across Colorado
- [ ] Front Range coverage
- [ ] Western Slope coverage
- [ ] Real-time aquifer draw-down monitoring
- [ ] Emergency drought reflex logic

### State Auditor Portal

- [ ] Basin-wide aggregated depletion data
- [ ] Producer privacy protections
- [ ] Emergency pumping limit authority
- [ ] Historical audit replay

---

## Phase 4: National Layer (2028)

### USDA/USGS Partnership

- [ ] High Plains Aquifer expansion
- [ ] Federal Water Credits standard
- [ ] Cloneable Command Center
- [ ] Multi-state Kriging coordination

---

## Phase 5: Sovereign Global (2029+)

### International Deployment

- [ ] Australia RSS nodes
- [ ] Brazil RSS nodes
- [ ] UN Water Security initiatives
- [ ] Trans-boundary conflict resolution

---

## Key Technical Decisions

### 1. DIL/Scientist Split

- **RDC** = Raw data storage (immutable)
- **Zo Server** = Computation layer (worksheets)
- Benefit: Governments audit science without compromising data vault

### 2. Worksheet Autonomy

- Local "Reflex Logic" at edge (Hub/VFA level)
- Functions during internet blackout
- Hydraulic autonomy prevents aquifer damage

### 3. Decentralized Resilience

- Each RSS is a peer node
- P2P verification prevents single point of failure
- Mesh continues processing if central node offline

---

## Technical Architecture Baseline

> *Absorbed from `MASTER_DEVELOPMENT_PLAN.md` (2026-03-05). That file is now a redirect stub.*

### Hierarchical Processing Stack

| Level | Hardware | Processing | Grid |
|-------|----------|-----------|------|
| **Field** | LRZ/VFA (FHSS chirps) → PMT Hub | EBK baseline | 50m |
| **District** | DHUs (OnLogic ARM SoC) | Go-based IDW | 20m / 10m |
| **Regional** | RSS (64-Core Threadripper) | Python Regression Kriging + FHE | 1m |
| **Global** | Zo.computer Cloud | Multi-field analytics, Federated queries | All tiers |

### Core Software Components

- **Backend:** FastAPI (async), PostgreSQL + TimescaleDB, PostGIS, RabbitMQ
- **Edge Computing:** Go-optimized IDW interpolation with offline SQLite resilience
- **Cloud Analytics:** Regression Kriging incorporating Sentinel-2/Landsat-9 imagery
- **Security:** JWT auth, 128-bit AES payload encryption, FHSS, Spatial Privacy layer
- **Advanced (Phase 2–3):** PBFT AllianceChain, FHE Kriging, Federated Data Fabric adapters

---

## UI/UX Feature: Resolution Pop

| Tier | Resolution | Price | Target User |
|------|------------|-------|-------------|
| Free | 50m | $0 | Government baseline |
| Basic | 20m | $49/mo | Small farmers |
| Pro | 10m | $199/mo | Commercial farms |
| Enterprise | 1m | Custom | ESG, enforcement, transfers |

**Economic Logic:**

- Free tier ensures 100% market participation (compliance hook)
- Enterprise tier drives high-margin revenue
- Subsidizes state baseline infrastructure

---

## Success Metrics

### Pilot Phase (June 2026)

- [ ] 2 fields instrumented
- [ ] 16-20 LRZs deployed
- [ ] 2 PMTs operational
- [ ] 2 PFAs at wellheads
- [ ] Continuous data flowing to Zo
- [ ] Kriging validation <5% error

### Regional Master (Q4 2026)

- [ ] 100% Subdistrict 1 coverage
- [ ] DWR "Rule-Compliant" status
- [ ] Water Court evidence accepted

### State Standard (2027)

- [ ] Colorado DWR primary tool
- [ ] Colorado River Compact compliance
- [ ] 15+ RSS nodes operational

---

## Non-Dilutive Funding Strategy

> See **[`docs/management/FUNDING_PIPELINE.md`](FUNDING_PIPELINE.md)** for the canonical grant tracking table with full deadlines, amounts, and statuses.

**Active submission (CRITICAL):**

| Grant | Deadline | Status |
|-------|----------|--------|
| **Federal ESG / DoD ESTCP** | **March 26, 2026** | 🔴 Drafting |

Full pipeline (NSF SBIR, CWCB, BoR WaterSMART, USDA NRCS, Gates, Earthshot) listed in `FUNDING_PIPELINE.md`.

---

## See Also

- **Long-Term Vision:** [`docs/reference/FarmSense Long Term Roadmap.md`](../reference/FarmSense%20Long%20Term%20Roadmap.md) — sovereign water infrastructure, global expansion, treaty compliance
- **Backend Services:** [`docs/codebase_docs/farmsense-code/backend/BACKEND_SERVICE_MAP.md`](../codebase_docs/farmsense-code/backend/BACKEND_SERVICE_MAP.md) — all 15 service modules documented

*Last updated: 2026-03-05*
