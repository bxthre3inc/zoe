# FarmSense Actionable Task List

## Active Hardware & Architecture Remediation

- [x] [x] Rectify District Hub (DHU) BOM to include 900MHz LoRaWAN gateway.
- [x] [x] Rectify Pivot Motion Tracker (PMT) BOM to include 2.4GHz/BLE module for PFA communication.
- [x] [x] Validate Thermal Loss capacity for 5W Kapton heater inside the PFA/DHU (-30°F extreme weather events).
- [x] [x] Integrate Hybrid Pulse Capacitor (HPC) with the PMT's LiSOCl2 battery to bypass spring passivation.
- [x] [x] Treat Polycarbonate enclosures with fluoropolymer coatings (PVDF) or UV inhibitors to prevent radiation embrittlement at 8,000ft altitude.

## Software-Driven Expansions

- [x] [x] Implement Predictive Maintenance via Current Harmonic Analysis on the Pressure & Flow Anchor (PFA).
- [x] [x] Integrate k-means Machine-Learning Kriging algorithms into the CSE Core Compute Engine.
- [x] [x] Implement PBFT Alliance-Chain Blockchain inside the DHU "Black Box" SSD for water rights trading. (`edge-compute/src/alliance_chain.go` — Go PBFT ledger complete)
- [x] [x] **Bridge Alliance-Chain ↔ Backend**: `WaterTradingService.initiate_trade()` now calls the Go DHU HTTP server via `httpx`. Go `AllianceChainServer` added with `/trade`, `/ledger`, `/health` endpoints and backend callback on finalization. 5/5 unit tests passing.
- [x] [x] Build Federal Federated Data Fabric Adapters. (`app/services/jadc2_adapter.py` — CoT v2.0 translation + LPI/LPD metadata complete)
- [x] [x] Implement Dual-Layer Spatial Privacy (Contextual Anonymization) for cloud/federated machine learning. (`app/services/spatial_privacy.py` — GPS jitter + k-anonymity + Laplace DP complete)
- [x] [x] Develop automated GLOBALG.A.P. compliance report generator. (`app/services/globalGAP_compliance.py` — all 6 IFA v6 control points + SHA-256 audit hash complete)

## Advanced Dual-Use Enhancements (R&D)

- [x] [x] Verify Low Probability of Intercept/Detection (LPI/LPD) logic on LRZ FHSS chirps. (`backend/tests/verify_lpi_lpd.py` — Simulates and verifies constraints)
- [x] [x] Concept design for Rapid Deployment Housing LRZ housings. (`specifications/Master Specification: Airborne Ballistic-grade Penetrator LRZ V1.0.md` — Complete)
- [x] [x] Upgrade Regional Superstation (RSS) compute layer to support Fully Homomorphic Encryption (FHE) Kriging operations. (`edge-compute/src/edge_kriging_fhe.py` — Proof of concept complete)

## Non-Dilutive Grant Strategy & Execution

- [ ] [ ] Draft Federal Federal ESG "Water Resilience on Federal Installations" pre-proposal (Deadline: March 26, 2026).
- [ ] [ ] Structure empirical pilot evidence framework for Bill & Melinda Gates Foundation COP30 smallholder adaptation pledges.
- [ ] [ ] Prepare nominations/proposals incorporating empirical hydro-economic data for the World Food Prize and Earthshot Prize.
