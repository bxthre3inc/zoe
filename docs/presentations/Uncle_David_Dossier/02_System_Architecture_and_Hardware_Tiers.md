# 02 System Architecture and Hardware Tiers

This document details the hardware hierarchy and specific component rationale that allows FarmSense to operate a reliable, real-time telemetry mesh across 150,000 acres of aggressive agricultural terrain.

## 1. Network Topology: The "Deep Edge" Strategy

Standard cellular IoT approaches fail in dense corn/potato canopies. FarmSense utilizes a tiered "Deep Edge" architectural approach, progressively bumping data up the chain from subterranean physics to orbital satellite links.

1. **Tier 1 (Subsurface/Canopy Edge)**: Ten Lateral Root-Zone (LRZ) scouts communicate via low-energy 2.4GHz BLE to a central Vertical Field Anchor (VFA). This localized mesh functions entirely below the crop canopy line.
2. **Tier 2 (The Gateway Anchor)**: The VFA acts as the aggregator. It packages the localized BLE data and utilizes a high-power 900MHz LoRaWAN transceiver to blast the payload over the top of the crop canopy.
3. **Tier 3 (The Cell-Tower Substation)**: District Hubs (DHUs), mounted on 40ft agricultural towers, act as the LoRaWAN receivers for a 10-mile radius.
4. **Tier 4 (The Oracle Cloud & The Virtual Mesh)**: The DHU processes the payloads via an NVIDIA Jetson Nano edge-computer, and hauls the data back to the Regional Superstation (RSS) via Starlink Business or Cellular LTE for massive parallel processing. At the RSS, 64-Core Threadrippers fuse the live telemetry with **static Soil Variability Maps**. By running Kriging algorithms that respect the underlying soil texture boundaries, the Oracle Engine interpolates the data from 10 physical nodes into a "Virtual Sensor Mesh" of 15,600 individual 1-meter pixels.

## 2. Component Rationale: Tier 1 (In-Soil Nodes)

The LRZ and VFA nodes live brutal lives. They endure constant freeze-thaw cycles, highly alkaline (pH 8.5) soil chemistry, and the mechanical impacts of heavy farm machinery.

### 2.1 The Silicon Core: Nordic Semiconductor nRF52 Series

We standardized our Tier-1 architecture on the Nordic nRF52 family (nRF52840 for the VFA master, nRF52811 for the LRZ slaves).

* **Integrated Multi-Protocol RF**: The nRF52840 supports both BLE 5.0 (for the localized mesh) and features the raw processing power (Cortex-M4F) to manage the Semtech SX1262 LoRa transceiver via SPI.
* **Extreme Low-Power Regimes**: The nodes must survive entirely on a 10W solar lid and a LiFePO4 buffer, with a Saft LiSOCl2 primary pack for dark-winter hibernation. The nRF52 boasts incredible micro-amp sleep states (System OFF: 0.4 µA, System ON with RTC: 1.5 µA).
* **Peripheral Matrix Interconnect (PPI)**: The nRF's PPI system is critical for our direct analog "Fringe Field" sampling on the LRZ probes. It allows peripherals (like the ADC and Timer) to interact directly, entirely bypassing the CPU, which saves massive amounts of power during high-frequency capacitance sampling loops.

### 2.2 Material Science: The "AlphaSled" Extrusion

Historically, subsurface sensors were "potted" in permanent epoxy resin to prevent water intrusion. This makes them unrepairable e-waste when a single capacitor fails.

**The FarmSense Approach**: Our IP67 housings are injection-molded from UV-stabilized High-Density Polyethylene (HDPE). Instead of potting, our PCBs are mounted on slide-out "AlphaSleds". The sled interfaces with the external world via a robust 5-port Amphenol bulk-head connector matrix.

* **The Nitrogen Defense**: The housing is sealed using dual-Viton O-rings. During the Winter "Sled Hospital" refurbishment, the node is re-pressurized to +5 psi with Dry Nitrogen. This slight overpressure ensures that the internal atmosphere is denser than the surrounding air. If a seal experiences microscopic wear, the nitrogen pushes *out*, preventing humid, alkaline groundwater from migrating *in*.

## 3. Component Rationale: Tier 2 (Surface Kinematics)

The Pivot Motion Tracker (PMT) and Corner-Swing Auditor (CSA) ride on top of the massive steel irrigation pivots. Their job is not to measure soil, but to measure the immense kinematic geometry and hydraulic flow of the machine itself.

### 3.1 The Silicon Core: Microchip ATSAMD51

While the nRF52 is ideal for low-power edge sensing, the PMT acts as a localized mathematical processor. We selected the Microchip ATSAMD51 (120MHz Cortex-M4F) for this role.

* **Floating Point Math & SRAM**: The PMT must constantly calculate complex trigonometric offsets based on its RTK GNSS string, while simultaneously running Fast Fourier Transforms (FFT) on the raw transit-time ultrasonic flow data. The SAMD51's dedicated hardware FPU and 256KB of SRAM prevent memory heap fragmentation during these intense, concurrent calculation loops.
* **Peripheral DMA**: The SAMD51 utilizes direct memory access (DMA) to stream the massive NMEA strings from the u-blox ZED-F9P GPS receiver directly into memory banks without stalling the main processor core, ensuring deterministic real-time kinematic calculations.
