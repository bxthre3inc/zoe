# Admin Dashboard Specification

## Overview

The Admin Dashboard is the centralized command and control interface for FarmSense operations staff and system integrators. It provides a global view of hardware health, tenant management, and system-wide configurations.

## 1. Global Hardware Fleet Management

* **Live Node Mapping:** Real-time global map displaying the online/offline status, battery life, and solar charging rates of every PMT, PFA, VFA, and LRZ deployed in the field.
* **Firmware OTA Control:** Interface to push Over-The-Air (OTA) firmware updates down the hierarchical chain (Cloud -> DHU -> PMT -> VFA/LRZ).
* **Sentry Diagnostics:** Deep-dive view into the raw PFA Current Harmonic Analysis and PMT 9-axis IMU vibration data for predictive hardware maintenance.

## 2. Tenant & Gateway Management

* **Organization Provisioning:** Create and manage distinct farming organizations, setting up their billing, access control lists (RBAC), and user onboarding.
* **DHU Gateway Configuration:** Management of the physical District Hubs, including LoRaWAN channel assignment, payload routing, and backhaul connectivity (Cellular vs. Starlink).

## 3. Global Edge Computation Monitoring

* **Adaptive Recalculation Overhead:** Real-time metrics on the load of the Zo Core Compute Engine.
* **"Fisherman's Attention" Network Status:** A high-level view showing which percentages of the global network are currently operating in *Dormant*, *Anticipatory*, *Ripple*, or *Collapse* modes, allowing for predictive scaling of cloud resources.

## 4. Architectural Integration

* **Frontend Stack:** React 18, TypeScript, Material-UI.
* **Monitoring Hooks:** Deep integration with the backend Prometheus and Grafana instances to surface infrastructure-level alerts directly within the administrative UI.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*
