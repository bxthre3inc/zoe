# 🌾 FarmSense: Precision Agriculture & Regulatory Integrity Platform

[![Platform: Unified](https://img.shields.io/badge/Platform-Unified-blueviolet?style=for-the-badge)](https://zo.computer)
[![Compliance: GLOBALG.A.P. v6](https://img.shields.io/badge/Compliance-GLOBALG.A.P._v6-emerald?style=for-the-badge)](https://globalgap.org)
[![Build: Success](https://img.shields.io/badge/Build-Success-success?style=for-the-badge)](https://github.com/farmsense/farmsense-portal)
[![Stack: FastAPI + React](https://img.shields.io/badge/Stack-FastAPI_+_React-6366f1?style=for-the-badge)](https://github.com/farmsense/farmsense-portal)

**FarmSense** is an enterprise-grade precision agriculture ecosystem designed for cryptographically verifiable water management, soil health analytics, and multi-stakeholder regulatory alignment. Initially deployed for the 2026 San Luis Valley water compacts, it provides a "Source of Truth" for producers, regulators, and investors.

---

## 🏔️ The Vision

In many agricultural basins, water extraction is managed through manual logs and opaque estimates. **FarmSense** replaces this with a **Unified Spatial Ledger**:

* **For Producers**: Data-driven irrigation scheduling that saves input costs.
* **For Regulators**: Immutable audit trails that eliminate "ghost pumping" and reporting friction.
* **For the Basin**: Long-term aquifer stability through transparent, verifiable extraction data.

---

## 🧩 Architectural Deep-Dive

### 1. Edge IQ (20m Spatial Fidelity)

The `edge-compute` module is designed to run on field-deployed hardware (Raspberry Pi/Jetson).

* **Real-time IDW**: Inverse Distance Weighting interpolation at the field edge.
* **Attention Engine**: A logic layer that identifies sensor anomalies (e.g., a broken flow meter) before data reaches the cloud.
* **Offline First**: Local storage with optimistic syncing for low-connectivity environments.

### 2. Cloud Core (1m Spatial Fidelity)

The `cloud-processing` engine provides high-resolution insights by fusing IoT data with multi-spectral satellite imagery.

* **Regression Kriging**: A Sophisticated ML algorithm that interpolates soil moisture by correlating ground sensors with Sentinel-2 NDVI/NDWI indices.
* **Adaptive Recalculation**: An event-driven engine that adjusts its resolution and window (1min → 1hr → 12hr) based on field dynamics (e.g., active irrigation cycles).

### 3. Regulatory Integrity Engine

FarmSense implements the **GLOBALG.A.P. IFA v6** standard through an automated backend engine.

* **Cryptographic Anchoring**: Every telemetry packet and manual entry is hashed using SHA-256 and anchored to a chronological integrity chain.
* **Verifiable Reports**: Digital audit reports that can be verified by secondary auditors without accessing confidential producer data.

### 4. Spatial Privacy Protection

To protect producers, FarmSense implements a multi-tier privacy engine in `backend/app/core/spatial_privacy.py`:

* **Tier 1 (Raw)**: Full precision for the producer.
* **Tier 2 (Audit)**: Grid-snapped and jittered data for auditors.
* **Tier 3 (Public)**: k-anonymized and Laplace-differentially private aggregates for basin analytics.

---

## 📁 Ecosystem Structure

```
farmsense-code/
├── backend/                    # FastAPI Services (Privacy, Compliance, REST)
│   ├── app/
│   │   ├── api/               # API Router structure
│   │   ├── services/          # GLOBALG.A.P. & CSA Alignment Engines
│   │   └── core/              # Spatial Privacy & Auth Logic
├── frontend/
│   ├── farmsense-portal/      # NEW Unified Premium Portal (Vite/TSX)
│   │   ├── src/
│   │   │   ├── views/         # 30+ Role-based stakeholder views
│   │   │   └── auth/          # RBAC & switchRole logic
├── cloud-processing/          # Regression Kriging & ML Pipelines
├── edge-compute/              # Go-based Field Processing Modules
├── database/                  # PostGIS & TimescaleDB Migration Logic
└── environment-simulator/     # Full-stack simulation for testing
```

---

## � Unified Stakeholder Roles

FarmSense consolidates 8 legacy applications into one unified portal:

1. **ADMIN**: Fleet monitoring, system health, and global audit oversight.
2. **GRANT_MANAGER**: $0 → Award pipeline tracking for LOR and ESTCP grants.
3. **FARMER**: 3D field maps, VRI scheduling, and "Fisherman's Attention" metrics.
4. **RESEARCHER**: Raw data feeds, SPAC modeling, and basin-wide analytics.
5. **AUDITOR**: Remote compliance verification and certificate issuance.
6. **REGULATOR**: SLV extraction monitoring and water court reporting.
7. **INVESTOR**: Impact ROI, fleet penetration, and obfuscated aggregate stats.
8. **DOCS**: Role-tailored documentation portal (Overview to Water Court SOPs).

---

## 🚀 Development Quick Start

### 1. Unified Portal (Frontend)

```bash
cd frontend/farmsense-portal
npm install
npm run dev
```

* **Dev URL**: `http://localhost:5173`
* **Role Setup**: Use the "Role Switcher" in the top bar to simulate different stakeholders.

### 2. Core Service (Backend)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.api.main:app --reload --port 8000
```

* **API Docs**: `http://localhost:8000/docs`

### 3. Simulation & Testing

To test the platform with live simulated data:

```bash
cd environment-simulator
python main.py
```

---

## 🛠️ Hardware Stack Compatibility

FarmSense is compatible with the following specialized sensors (specifications found in `/specifications/firmware`):

* **VFA**: Vertical Flow Array (multi-depth soil moisture).
* **PMT**: Precision Metering Telemetry (pump flow volumes).
* **PFA**: Pivot Flow Array (distribution uniformity).
* **LRZ**: Low-Resolution Zone (atmospheric boundary sensors).
* **CSA**: Corner-Swing Auditor (GPS alignment for non-standard pivot corners).

---

## 📄 License & Legal

Copyright © 2026 FarmSense. Developed for the San Luis Valley Groundwater Pilot. All rights reserved.

**Security Vulnerabilities**: Report to <security@farmsense.io>

---

**Built with ❤️ for a resilient agricultural future.** 🌾💧
