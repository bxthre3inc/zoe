# 02 System Architecture and Hardware Tiers

This document details the hardware hierarchy and specific component rationale that allows FarmSense to operate a reliable, real-time telemetry mesh across 150,000 acres of aggressive agricultural terrain.

## 1. Network Topology: The "Deep Edge" Strategy

Standard cellular IoT approaches fail in dense corn/potato canopies. FarmSense utilizes a tiered "Deep Edge" architectural approach, progressively bumping data up the chain from subterranean physics to orbital satellite links.

1. **Tier 1 (Subsurface/Canopy Edge)**: **Architecture 2.1 "Stereo Standard"**. Two (2) VFAs at hydraulic extremes, four (4) LRZ2 deep scouts, and twelve (12) LRZ1 grounding raster nodes per 160-acre field.
2. **Tier 2 (The Gateway Anchor)**: The VFA acts as the master truth node. It packages localized mesh data and utilizes high-power **900MHz FHSS (Frequency Hopping Spread Spectrum)** to transmit above the crop canopy.
3. **Tier 3 (The Cell-Tower Substation)**: District Hubs (DHUs), mounted on 40ft agricultural towers, act as the mesh coordinators for a 10-mile radius.
4. **Tier 4 (The RDC & The Virtual Mesh)**: The DHU processes payloads via an **NVIDIA Jetson Orin Nano (8GB)** edge-computer. At the Regional Superstation (RSS), 64-Core Threadrippers fuse telemetry with **static Soil Variability Maps**. Architecture 2.1 reduces Mean Absolute Error (MAE) from ~15% to **<5% at 1m**, with an uncertainty envelope of **<2% at "Precision Query" coordinates**.

## 2. Component Rationale: Tier 1 (In-Soil Nodes)

The LRZ and VFA nodes live brutal lives. They endure constant freeze-thaw cycles, highly alkaline (pH 8.5) soil chemistry, and the mechanical impacts of heavy farm machinery.

### 2.1 The Silicon Core: Nordic Semiconductor nRF52 Series

We standardized our Tier-1 architecture on the Nordic nRF52 family (nRF52840 for the VFA master, nRF52811 for the LRZ slaves).

* **Integrated Multi-Protocol RF**: The nRF52840 (VFA) supports BLE 5.0 and manages the Semtech SX1262 LoRa transceiver. The **ASR6601 LoRa SoC** (Cortex-M4) is used for high-density LRZ nodes to hit the target price point without sacrificing mesh reliability.
* **Extreme Low-Power Regimes**: Nodes survive on a 10W **Wide-Brim Solar Cap**. The nRF52 and ASR6601 boast micro-amp sleep states ensuring 10-year field persistence.
* **Peripheral Matrix Interconnect (PPI)**: Critically enables "Fringe Field" sampling without CPU wake-up, maximizing battery ROI.

### 2.2 Material Science: The "AlphaSled" Extrusion

Historically, subsurface sensors were "potted" in permanent epoxy resin to prevent water intrusion. This makes them unrepairable e-waste when a single capacitor fails.

**The FarmSense Approach**: Our IP67 housings are injection-molded from UV-stabilized High-Density Polyethylene (HDPE). Instead of potting, our PCBs are mounted on slide-out "AlphaSleds". The sled interfaces with the external world via a robust 5-port Amphenol bulk-head connector matrix.

* **The Nitrogen Defense**: The housing is sealed using dual-Viton O-rings. During the Winter "Sled Hospital" refurbishment, the node is re-pressurized to +5 psi with Dry Nitrogen. This slight overpressure ensures that the internal atmosphere is denser than the surrounding air. If a seal experiences microscopic wear, the nitrogen pushes *out*, preventing humid, alkaline groundwater from migrating *in*.

## 3. Component Rationale: Tier 2 (Surface Kinematics)

The Pivot Motion Tracker (PMT) and Corner-Swing Auditor (CSA) ride on top of the massive steel irrigation pivots. Their job is not to measure soil, but to measure the immense kinematic geometry and hydraulic flow of the machine itself.

### 3.1 The Silicon Core: ESP32-S3 (PMT)

-While the nRF52 is ideal for low-power edge sensing, the PMT acts as a localized mathematical processor. We selected the **ESP32-S3 (Dual-Core 240MHz)** for this role, providing vector acceleration for 9-axis fusion and flow math.

-### 3.2 Tier 2 & 3 Actuation: The "Muscle" (SSN/SCN)
-

-Variable Rate Irrigation (VRI) is achieved via:
-1. **SSN (Smart Section Node)**: Proportional siphoning for span-level control.
-2. **SCN (Section Control Node)**: Monolithic LoRa-actuator for 15,600-pixel grid precision
-

-Both utilize the **ASR6601 SoC** integrated directly into the valve body to hit the **$18.00 monolithic price point**.
