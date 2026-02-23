# Pivot Motion Tracker (PMT) Firmware Specification

## Overview

The Pivot Motion Tracker (PMT) operates as the **Level 1.5 Field Hub**. It is the deterministic command center of the field, responsible for aggregating all Peer Node telemetry, performing constant 50m geostatistical math, and routing backhaul payloads to the District Hub (DHU).

## 1. Hardware Initialization Routine

* **Processor:** ATSAMD51 (Cortex-M4, 120MHz FPU).
* **Sensors:** Badger Meter Ultrasonic Transit-Time, u-blox ZED-F9P RTK GNSS, Bosch BNO055 9-Axis IMU.
* **Power:** 10W Solar Lid + LiFePO4 Buffer.
* **Hibernation Logic:** The primary Saft LS14500 LiSOCl2 cell maintains ONLY the GNSS Real-Time Clock through the 120-day SLV winter dormancy.

## 2. Continuous Edge-EBK Logic Loop

The PMT continuously executes Empirical Bayesian Kriging (Edge-EBK) to generate a 50m-resolution spatial probability grid (16x16 matrix). This is **not a failover state**, but the baseline operational mode of the PMT.

* **Data Ingestion:** The PMT intercepts the 128-bit AES encrypted payload chirps from the 2 VFAs and 20 LRZs traversing its 900MHz RF Umbrella.
* **FPU Calculation:** The hardware FPU processes this spatial data into the 16x16 matrix, quantifying the exact soil moisture probability curve across the 160-acre quarter section.
* **The "Fisherman's Attention" Scale:** The execution frequency of this calculation is dynamically governed:
  * *Dormant Baseline:* Every 4 Hours (High soil moisture, pivot parked).
  * *Anticipatory:* Every 60 Minutes (Sunrise, rapidly rising temperature).
  * *Ripple:* Every 15 Minutes (Detection of rapid trend shifts; PMT commands peer nodes to increase chirp frequency radially outward from anomaly).
  * *Collapse:* Every 5 Seconds (Critical failure, or pivot actively sweeping). The FPU zeroes calculation on dormant field sections, "Focus Collapsing" computation exclusively on the trajectory of the active pivot span.

## 3. Telemetry & Routing (The "Field Hub")

* **Payload Bundling:** The PMT bundles its own High-Fidelity kinematic data, the processed 50m Edge-EBK arrays, and the intercepted VFA/LRZ intelligence.
* **PFA Aggregation:** Intercepts the 2.4GHz Current Harmonic Analysis payload from the wellhead PFA.
* **LoRaWAN Backhaul:** Blasts the unified, heavily encrypted ~187-byte Field State Payload to the District Hub (DHU) via 900MHz LoRaWAN.

## 4. Zero-Downtime VRI Failover Execution

If the PMT detects a loss of LoRaWAN ping-acknowledgment from the DHU:

* **Autonomous VRI:** Because the PMT is *already* calculating the 50m EBK grid natively, it instantly switches to executing autonomous Variable Rate Irrigation commands (speeding/slowing the pivot or actuating safety valves) based *only* on its localized intelligence, bypassing the offline DHU/Zo engines entirely.
* **Audit Buffering:** Stores all 187-byte payload state changes to onboard SPI Flash, burst-transmitting the backlog upon DHU reconnection to preserve the State Engineer audit ledger.

---
*Return to [Master Software Index](../../SOFTWARE_INDEX.md)*
