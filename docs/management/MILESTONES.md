# FarmSense V1 and Beta Milestones

## Overview

This document clearly defines the "Beta Milestone" and "V1 Milestone" for FarmSense. This provides a clear checklist for the CSU SLV 2-Field pilot / Beta testing this year, and the ultimate V1 launch product.

---

## 1. Beta Development Completed Milestone

**Target Date:** Late February / Early March 2026

*The milestone defining the completion of all core software logic, cloud infrastructure, and frontend UI required for the Beta launch.*

### Software / Cloud

- [ ] **Core Ingestion Pipeline:** Zo Server configured to receive data from the DHU mesh.
- [ ] **Kriging Engine:** First operational version of IDW (Edge) and k-means Kriging (Cloud) calculating field hydrology.
- [ ] **Automated Reporting:** Basic logging of sensor data and simple visualization logic ready.

### Frontend / User Access

- [ ] **Farmer Dashboard (Beta):** Farmers can log in, view their fields, and see basic metrics.

---

## 2. Beta Launch Milestone (CSU SLV Pilot)

**Target Date:** March 10, 2026

*The milestone defining readiness for the physical CSU SLV Pilot launch, including hardware manufacturing, deployment, and data validation.*

### Hardware Minimum Viable Product (MVP)

- [ ] **Prototype Hardware Built:** 16-20 LRZs, 2 PMTs, 2 PFAs, and localized DHU logic manufactured and tested.
- [ ] **Firmware Stabilized:** PMT, VFA, LRZ, and PFA nodes capable of reliable connection and data transfer in the field.
- [ ] **LPI/LPD Validated:** Basic FHSS radio stealth confirmed in the field.

### Validation & Outcomes

- [ ] **Empirical Water Court Evidence:** Pilot generates hydrodynamic proof of pumping limits with `<5%` margin of error.
- [ ] **Grant Baselines:** Baseline verified for target Q3 Grants (NSF SBIR, CWCB, BoR WaterSMART).

---

## 3. V1 Milestone

**Target Date:** Spring 2027 (Before planting in SLV)

*The master milestone defining the completion of the core FarmSense OS for the official V1 Launch (State & Market readiness).*

### Hardware Evolution

- [ ] **Scaled Production:** Capable of 100% SLV Subdistrict 1 coverage (Instrumenting 1,280 fields, 25x DHUs).
- [ ] **Hardened Infrastructure:** Faraday shielding on core compute, ruggedized Rapid Deployment Housings for LRZs.

### Software / Cloud / Edge

- [ ] **Decentralized Resilience:** Edge "Reflex Logic" active, acting autonomously if Zo server connection drops.
- [ ] **Ledger & Trading:** PBFT AllianceChain Blockchain fully active for auditable, real-time water trading.
- [ ] **Advanced Privacy:** Dual-Layer Spatial Privacy (GPS jitter + DP) fully active for all tenants.
- [ ] **Unified Integrations:** JADC2 / Federated Data Fabric adapters live.

### Frontend / User Access

- [ ] **Resolution Pop UI:** Tiered access fully implemented (Free, Basic, Pro, Enterprise).
- [ ] **Regulatory Portal (V1):** DWR and State Auditors can view basin-wide aggregated depletion data natively.
- [ ] **Marketing Site:** Live and optimized for broader commercial rollout.

### Validation & Outcomes

- [ ] **State Standard:** V1 forms the established standard for Colorado DWR rules.
- [ ] **Global Scaling:** Supports grant/award scaling across Gates Foundation, Earthshot, etc.
