# Vertical Field Anchor (VFA) Firmware Specification

## Overview

The Vertical Field Anchor (VFA) operates as a **Level 1 Advanced Peer Node**. It is the central 48-inch deep-profile ground truth node for a field quadrant, tasked strictly with telemetry generation and secure RF transmission, leaving heavy computation to the PMT.

## 1. Hardware Initialization Routine

* **Processor:** nRF52840 (Ultra-low power ARM Cortex-M4F).
* **Sensors:** GroPoint Profile multivariant soil moisture, temperature, and salinity probe.
* **Power:** Flush 5W Polycarbonate Solar Lid + Hybrid Pulse Capacitor (HPC).
* **Telemetry Range:** 50mm non-contact capacitive telemetry field for physical diagnostics.

## 2. Telemetry Processing & "Dumb Chirp" Transformation

The VFA was deliberately downgraded from an AES-routing hub to a highly efficient Peer Node to maximize battery life under snowpack.

* **Data Aggregation:** The firmware reads 4 specific depths along the 48-inch profile (8", 16", 24", 36") to determine total matric potential and deep percolation loss.
* **Encryption at the Edge:** The processor applies AES-128 bit encryption independently to its localized payload before it ever leaves the component.
* **Transmission:** Actuates the flush 3-foot low-profile antenna to chirp the encrypted payload via 2.4GHz mesh networking directly to the overhead Pivot Motion Tracker (PMT) acting as the Field Hub.

## 3. Dynamic "Ripple" Responsiveness

While fundamentally a "dumb chirp" node, the VFA firmware is governed by the PMT's adaptive scaling logic.

* **Baseline Chirp:** Every 4 hours.
* **Triggered Ripple:** When the PMT detects a rapid statistical shift and initiates a "Focus Ripple," it pings the VFA. The VFA firmware must immediately scale its chirp frequency to every 15 minutes to provide the PMT Kriging engine with real-time ground truth data regarding the spatial expansion of the anomaly.
* **LPI/LPD Constraints:** The firmware ensures that even at elevated 15-minute chirp rates, the FHSS frequency hopping conforms to DoD Low Probability of Intercept/Detection standards.

---
*Return to [Master Software Index](../../SOFTWARE_INDEX.md)*
