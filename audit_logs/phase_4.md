# Phase 4: Backend Deep Dive - Audit Log

## Executive Summary

Phase 4 audited the FastAPI integration layer and the core Python microservices. The backend is heavily specialized, demonstrating deep enterprise integration models and advanced data privacy mechanisms rather than just standard CRUD operations.

## 1. API & Routing Layer

- **Hardware Ingestion (`hardware.py`)**: Well-structured POST endpoints tailored to specific hardware nodes (VFA, PFA, PMT, LRZ). Telemetry is immediately persisted to PostGIS and broadcasted asynchronously via WebSockets for sub-second UI updates.
- **AllianceChain / PBFT (`trading.py`)**: A unique integration wherein the Python backend acts as the ledger interface, but delegates PBFT consensus to the Go `AllianceChainServer` (running on DHUs). The backend provides internal `/callback` routes for Go to confirm block finalization and adjust quotas.
- **Federated Fabric (`federated.py`)**: Contains an endpoint `/sync/{field_id}` that translates 1m grid data into Cursor on Target (CoT) v2.0 payloads for JADC2 simulation.

## 2. Advanced Microservices

- **Spatial Privacy (`spatial_privacy.py`)**: Implements strict cryptographic standards. Contains a dual-layer approach: Geometric (Jitter radius, Grid snap) and Contextual (Laplace differential privacy with $\epsilon=0.5$ for moisture, and $k$-anonymity).
- **RSS Kriging Engine (`rss_kriging.py`)**: Not just a statistical model, but incorporates an `FHESimulator` simulating CKKS Fully Homomorphic Encryption. It tracks a `noise_budget` through operations and triggers mock bootstraps when the budget falls below 15 bits.

## 3. Database Layer

- **Hypertables**: `models/sensor_data.py` accurately maps SQLAlchemy classes to the TimescaleDB hypertables created in `001_initial_schema.sql`. It relies heavily on `GeoAlchemy2` and contains detailed structures for Vertical Profiling (VFA depth slots), Kinematics (PMT angles), and Audit Logging.

## Next Steps

Phase 4 is complete. Proceeding to Phase 5: Frontend Deep Dive (`farmsense-code/frontend/`) to understand how these highly complex data structures are visualized using MapLibre/Deck.gl.
