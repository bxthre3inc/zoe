# FarmSense: Software & Firmware Ecosystem Specifications

This document serves as the master index for the FarmSense deterministic operations platform. It maps out the technical specifications for all 8 frontend software portals, the backend infrastructure, and the edge-processing firmware operating on the 5 distinct hardware nodes.

---

## 🖥️ Frontend Software Specifications

The FarmSense platform utilizes a unified backend REST API and decentralized database architecture (PostgreSQL/TimescaleDB) to feed 8 distinct, containerized frontend portals. Each portal presents a specialized lens into the 1m Kriging grid.

1. **[Farmer Dashboard Specification](frontend/farmer-dashboard/SPECIFICATION.md):** The primary daily-driver application. Real-time MapLibre visualization of the 50m, 20m, and 1m virtual sensor grids, irrigation scheduling, and crop stress alerts.
2. **[Regulatory Portal Specification](frontend/regulatory-portal/SPECIFICATION.md):** The immutable audit ledger. Generates cryptographically secure water extraction reporting for the State Engineer and SLV Subdistrict compliance.
3. **[Admin Dashboard Specification](frontend/admin-dashboard/SPECIFICATION.md):** System-wide administrative controls, tenant management, billing, and global alert configurations.
4. **[Investor Dashboard Specification](frontend/investor-dashboard/SPECIFICATION.md):** High-level aggregate metrics, Water-ROI (Return on Investment per acre-foot), and regional impact analytics.
5. **[Grant Portal Specification](frontend/grant-portal/SPECIFICATION.md):** Dedicated data-extraction portal for academic and foundation partners (e.g., LOR Foundation) tracking the efficacy of grant-funded deployments.
6. **[Research Portal Specification](frontend/research-portal/SPECIFICATION.md):** Deep-dive interface for agronomists and CSU SLV Research Center Zones. Provides access to raw variogram data, detrended residuals, and historical Kriging calibration sets.
7. **[Docs Portal Specification](frontend/docs-portal/SPECIFICATION.md):** The static-site generator housing all public and internal engineering documentation, API references, and installation guides.
8. **[Marketing Site Specification](frontend/marketing-site/SPECIFICATION.md):** The public-facing landing page outlining the FarmSense architecture, Federal dual-use case studies, and contact forms.

---

## 📡 Hardware Firmware Specifications

Unlike traditional static IoT networks, FarmSense pushes intense computational processing natively to the edge. The following firmware specifications detail the specific logic loops, spatial interpolation capabilities, and failover behavior of each bare-metal node.

1. **[Pivot Motion Tracker (PMT) Firmware Specification](../specifications/firmware/PMT_Firmware_Spec.md):** The autonomous Level 1.5 Field Hub. Details the continuous execution of the 50m Empirical Bayesian Kriging (Edge-EBK) matrix and the "Fisherman's Attention" update scaling.
2. **[Vertical Field Anchor (VFA) Firmware Specification](../specifications/firmware/VFA_Firmware_Spec.md):** The Level 1 Advanced Peer Node. Details the deep-profile ground truth telemetry generation processes and 900MHz FHSS routing.
3. **[Lateral Root-Zone Scout (LRZ) Firmware Specification](../specifications/firmware/LRZ_Firmware_Spec.md):** The mass-produced "dumb node." Details the LPI/LPD capacitive telemetry sweeps and high-frequency chirp protocols.
4. **[Pressure & Flow Anchor (PFA) Firmware Specification](../specifications/firmware/PFA_Firmware_Spec.md):** The "Sentry of the Source." Details the Cortex-M7 Current Harmonic Analysis of the wellhead motor, cavitation detection, and 2.4GHz High-Gain linking.
5. **[Corner-Swing Auditor (CSA) Firmware Specification](../specifications/firmware/CSA_Firmware_Spec.md):** Details the dual-node kinematics required to resolve swing-arm transit and overlap matrices.

---

## 🧠 Backend Engine Specifications

The intelligence powering the frontends and edge-hardware relies on these deeply integrated cloud and multi-tier databases.

* **[Core Engine (CSE) Specification](backend/cse_ENGINE_SPECIFICATION.md):** The overarching logic detailing the execution of Bayesian priors, the 1m Regression Kriging algorithms using Sentinel-2/Landsat data, and the orchestration of the Adaptive Recalculation Engine.
* **[Database Architecture (PostgreSQL + TimescaleDB)](backend/DATABASE_SPECIFICATION.md):** The schema mapping for the Master Legal Ledger, contextual obfuscation (Privacy layer), and continuous temporal aggregations.
