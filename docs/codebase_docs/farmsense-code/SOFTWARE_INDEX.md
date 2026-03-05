# FarmSense: Software & Firmware Ecosystem Specifications

This document serves as the master index for the FarmSense deterministic operations platform. It maps out the technical specifications for all frontend portals, backend infrastructure, and the firmware logic operating on each hardware node.

> See also: [`docs/00_NAVIGATION.md`](../../00_NAVIGATION.md) — full role-based navigation index.

---

## 🖥️ Frontend Software Specifications

> **Architecture Note (2026-03-05):** FarmSense has transitioned from **8 separate containerized portals (Gen 1)** to a **single unified React app with RBAC (Gen 2)**. The `farmsense-portal/` directory is the active unified portal. The 8 legacy SPECIFICATION.md files below now serve as **role-specific requirements documents** (what each view should contain), not independent app specs.
>
> See [`farmsense-portal/README.md`](frontend/farmsense-portal/README.md) for the full transition details.

### Active Unified Portal

- **[farmsense-portal](frontend/farmsense-portal/README.md)** — Single React/Vite app with JWT-scoped RBAC. Consolidates all 8 role views into one deployment at `brodiblanco.zo.computer/farmsense/`.

### Legacy Role Requirements (Use as feature input for unified portal)

1. **[Farmer Dashboard](frontend/specs/farmer-dashboard-spec.md)** — Real-time MapLibre, irrigation scheduling, crop stress alerts.
2. **[Regulatory Portal](frontend/specs/regulatory-portal-spec.md)** — Immutable audit ledger, State Engineer reporting, SLV Subdistrict compliance.
3. **[Admin Dashboard](frontend/specs/admin-dashboard-spec.md)** — System-wide controls, tenant management, billing, alert configurations.
4. **[Investor Dashboard](frontend/specs/investor-dashboard-spec.md)** — Aggregate metrics, Water-ROI per acre-foot, regional impact analytics.
5. **[Grant Portal](frontend/specs/grant-portal-spec.md)** — Data-extraction for LOR Foundation and academic partners.
6. **[Research Portal](frontend/specs/research-portal-spec.md)** — Raw variogram data, detrended residuals, historical Kriging calibration sets.
7. **[Docs Portal](frontend/specs/docs-portal-spec.md)** — Static-site engineering docs, API references, installation guides.
8. **[Marketing Site](frontend/specs/marketing-site-spec.md)** — Public landing page, dual-use case studies, contact forms.

---

## 📡 Hardware Firmware Specifications

> **Note (2026-03-05):** Firmware supplement files have been merged into their canonical Master Specifications in `docs/specifications/`. The links below point to the appropriate section of each Master Spec.

| Hardware Node | Master Specification | Firmware Section |
| :- | :- | :- |
| Pivot Motion Tracker (PMT) | [PMT V1.6](../../../../specifications/Master%20Specification:%20Pivot%20Motion%20Tracker%20(PMT)%20V1.6.md) | §7 Firmware Details |
| Vertical Field Anchor (VFA) | [VFA V1.21](../../../../specifications/Master%20Specification:%20Vertical%20Field%20Anchor%20(VFA)%20V1.21.md) | §6 Firmware Details |
| Lateral Root-Zone Scout (LRZ) | [LRZ V1.21](../../../../specifications/Master%20Specification:%20Lateral%20Root-Zone%20Scout%20(LRZ)%20V1.21.md) | §6 Firmware Details |
| Pressure & Flow Anchor (PFA) | [PFA V1.9](../../../../specifications/Master%20Specification:%20Pressure%20&%20Flow%20Anchor%20(PFA)%20V1.9.md) | Firmware & Control Details |
| Corner-Swing Auditor (CSA) | [CSA V1.0](../../../../specifications/Master%20Specification:%20Corner-Swing%20Auditor%20(CSA)%20V1.0.md) | Firmware & Protocol Details |
| District Hub (DHU) | [DHU V1.1](../../../../specifications/Master%20Specification:%20District%20Hub%20(DHU)%20V1.1.md) | Hardware & BOM Details |
| Regional Superstation (RSS) | [RSS V1.3](../../../../specifications/Master%20Specification:%20Regional%20Superstation%20(RSS)%20V1.3.md) | Facility & Infrastructure Details |

---

## 🧠 Backend Ecosystem Specifications

- **[Backend Service Map](backend/BACKEND_SERVICE_MAP.md)** — Canonical reference for all 15 Python services including Adaptive Recalculation, 1m Kriging, and Compliance logic.
- **[Codebase Architecture](ARCHITECTURE.md)** — Systems data flow, database positioning (PostgreSQL/TimescaleDB), and core infrastructure layout.

---

#### Last updated: 2026-03-05
