# Lateral Root-Zone Scout (LRZ) Firmware Specification

## Overview

The Lateral Root-Zone Scout (LRZ) is the ultimate **Level 1 Spatial Mapper**. It is the heavily mass-produced, expendable "dumb node" deployed at a 1:15-acre density across the crop canopy. Its sole firmware objective is executing micro-power telemetry chirps.

## 1. Hardware Initialization Routine

* **Processor:** nRF52840 (Ultra-low power ARM Cortex-M4F).
* **Sensors:** Single-depth lateral soil tension and canopy ambient temperature sensors.
* **Power:** Internal prolonged lithium core (Designed for 5-year multi-season survival without solar tracking).
* **Enclosure Rating:** IP68/IP69K (Hermetically sealed polycarbonate).

## 2. The "Dumb Chirp" Execution

The LRZ firmware represents absolute deterministic simplicity. It executes no spatial math, no decision masking, and no mesh coordination.

* **Micro-Payload:** Reads the singular soil tension value and ambient canopy data.
* **Encryption:** Applies AES-128 encryption.
* **FHSS Burst:** Pulses the payload via the integrated 3-foot antenna utilizing 2.4GHz mesh networking. The RF path is a direct vertical connection to the overhead PMT Field Hub umbrella.

## 3. Defense Protocol Adherence

Because the LRZs represent the highest density of RF emitters in the FarmSense physical architecture, their firmware is strictly regulated.

* **LPI/LPD:** The firmware dictates exact pseudo-random frequency hopping sequences to ensure the massive array of LRZs across a District do not create a localized RF "bloom" detectable by adversarial ELINT (Electronic Intelligence), fulfilling DoD JADC2 and ESTCP dual-use requirements.

## 4. The "Ripple" Receiver

Like the VFA, the LRZ idles at a 4-hour chirp baseline. The firmware contains a passive listening hook: if the PMT identifies an anomaly near the LRZ's geographic coordinate, the PMT commands the LRZ to "Ripple" (increase chirp frequency to 15m) to delineate the physical boundaries of the propagating statistical event.

---
*Return to [Master Software Index](../../SOFTWARE_INDEX.md)*
