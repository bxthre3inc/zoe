# FarmSense: Onboarding Guide

Welcome to FarmSense. This document serves as the introductory roadmap for engineers, agronomists, and system integrators deploying the Deterministic Farming Operating System.

## Immediate Deployment Scope

Our immediate operational objective centers on the specialized 2-Field Pilot at the CSU San Luis Valley (SLV) Research Center in Center, Colorado. This deployment bypasses traditional venture-capital mass rollout bottlenecks (i.e. equipping 1,280 pivots or the prior 16,880 unit blitz) to generate strictly empirical, Gold Standard verifiable hydrodynamic "Proof of Concept" data for the upcoming June 2026 Subdistrict 1 Water Court trials.

## Reading and Documentation Flow

Please familiarize yourself with the FarmSense project documentation in the following order:

1. **`BLUEPRINT.md`**: Start here to understand the core existential threat of aquifer depletion in the San Luis valley and the FarmSense "Deterministic" solution framework and operational philosophy.  
2. **`PROJECT_OVERVIEW.md`**: Provides a systemic overview of the codebase delivery, core system layers, and the dual-database architecture.
3. **`ARCHITECTURE.md`**: Explains the detailed interaction between the Decentralized Cloud intelligence, the Level 2 District Hubs (DHU), and the hardware Edge constraints across the fields (PMT Hub, VFA, LRZ, PFA).
4. **`FEATURESET.md`**: Lists the current production capabilities, zero-cost Edge software expansions, and our dual-use applicability for defense operations (JADC2 integration, FHE, LPI/LPD).
5. **`IMPLEMENTATION_GUIDE.md`**: Maps out the structural timeline, hardware manufacturing objectives, deployment sequences, and performance validation metrics.
6. **`todo.md`**: The live, active issue board tracking the double-checkbox sprint tasks.

## Initial Developer Setup

1. **Extract and Prepare**:
    Navigate to the `farmsense-code` directory. Set up environment variables via `.env.example` templates.

2. **Docker Unified Stacks**:
    Our infrastructure operates heavily on local Edge containerization. Use our included unified compose scripts to spin up instances of PostgreSQL/TimescaleDB, Redis, the REST API, and Background Processing workers.

3. **Database Pre-Initialization**:
    The system utilizes PostGIS extentions and TimescaleDB hypertables. Run `001_initial_schema.sql` immediately on container startup.

4. **Kriging and Interpolation Verification**:
    Run `pytest` integration protocols to test the backend Adaptive Recalculation Engine rulesets prior to hardware telemetry mapping.

## Important Operational & Policy Context

- **DoD Funding and DARPA**: We are tailoring architectures to qualify for the DoD Environmental Security Technology Certification Program (ESTCP) (Deadline: March 26, 2026). Ensure any Edge communication protocol changes (e.g. 5GHz/900MHz backhaul adjustments) maintain secure 128-bit encryption constraints.
- **Privacy Policy**: Our Spatial Privacy Framework requires all individual geographic point parameters sent to the Global Cloud to be contextually obfuscated. Do not bypass the Differential Privacy protocols applied downstream of the District Hub "Black Box".
