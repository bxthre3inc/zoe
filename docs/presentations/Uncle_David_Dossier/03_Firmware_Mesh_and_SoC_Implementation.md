# 03 Firmware Mesh and SoC Implementation

This document serves as the low-level engineering specification for the FarmSense edge architecture. It details how the physical physics of the agricultural field are ingested by the silicon, encrypted, and safely transmitted to the Oracle servers.

## 1. SoC Peripherals & Register Mapping

The core intelligence of the FarmSense edge relies heavily on direct register manipulation rather than abstract HALs (Hardware Abstraction Layers), ensuring deterministic execution timing and absolute power minimalization.

### 1.1 nRF52840 (VFA) LoRa SPI Interface

The nRF52840 interfaces with the Semtech SX1262 LoRa transceiver via the SPI3 peripheral. To prevent the high-power LoRa chirps from introducing noise into the analog sensor read streams, SPI transactions are heavily synchronized.

* The `SPIM3->EVENTS_END` register triggers an interrupt that shifts the SoC from an active transmission state back into a `__WFE()` (Wait For Event) low-power sleep state within micro-seconds of the SPI buffer clearing, ensuring the 800Ah LiFePO4 battery is not needlessly drained.

* **Bandgap Reference Offset**: We do not rely on standard 3.3V rail estimations for the ADC. The firmware utilizes the internal 1.2V bandgap reference. The register `ADC_CAL` command is triggered every 10,000 read cycles. This ensures that the pressure transducers remain perfectly linear across a grueling -40°C to +55°C seasonal temperature swing.

## 2. Real-Time OS & Interrupt Topology

FarmSense nodes utilize FreeRTOS to manage tasks, but the critical physical logic relies on the ARM Cortex-M Nested Vectored Interrupt Controller (NVIC).

### The Priority Matrix

* **Priority 0 (Absolute Safety Override):** Reserved exclusively for mechanical runaway states (PFA cavitation or PMT structural stall).
* **Priority 1 (Kinematic Lock):** Reserved for the u-blox ZED-F9P RTK Timepulse (PPS) on the PMT, triggering vector-accelerated flow math on the **ESP32-S3**.
* **Priority 2 & 3 (Network Layer):** Handle LoRa mesh synchronization and FHSS epoch shifts.

## 3. "Fringe Field" Capacitance Physiscs (LRZ)

The Lateral Root-Zone scout utilizes a custom time-of-flight analog circuit. It does not measure raw resistance; it measures the dielectric permittivity ($E_r$) of the soil.

* **The CHIRP State Machine**: The **ASR6601** (LRZ) or nRF52840 (VFA) uses internal logic to fire an 80-100MHz 'CHIRP' via a custom LC tank circuit.
* **Charge/Discharge Timing**: Measures the dielectric permittivity ($E_r$) shift. Water ($E_r \approx 80$) vs dry soil ($E_r \approx 4$) provides a hyper-accurate, sub-millimeter moisture envelope measurement.

## 4. Hardware Security Module (HSM) & Encryption

Agricultural data at this scale is heavily targeted. To prevent "Water Hackers" from spoofing data to the State Water Engineer, the physical mesh is completely cryptographically blind to unsigned payloads.

### 4.1 ARM CryptoCell-310 (CC310)

The VFA explicitly uses the nRF52840 because it features the ARM TrustZone CryptoCell-310 hardware security subsystem.

* **AES-128/256 Blind Payloads**: The CC310 handles the encryption entirely in hardware. The main CPU hands a raw moisture payload pointer to the CC310, ensuring the private key never exists in open RAM.

### 4.2 PBFT Mesh Consensus & The Virtual Mesh

At the District Hub (DHU) level, we operate a Practical Byzantine Fault Tolerance (PBFT) consensus model. Before a Regional Superstation logs a 1,000,000-gallon water usage tick to the irreversible Digital Water Ledger, it requires a mathematical multi-signature.

If 1 VFA out of 10 in a mesh cluster reports catastrophic flooding while the other 9 report dry soil, the Hub evaluates this "outlier" against the **static Soil Variability Map**. If the outlier sits in an isolated clay depression, the Kriging algorithm validates its heavy weighting and interpolates the localized flood into the **1m Virtual Sensor Network**. However, if the outlier sits in a highly-drainable sandy ridge (where flooding is physically impossible given the other 9 nodes), the Hub flags the outlier for physical inspection and temporarily nullifies its weight, ensuring that sensor malfunction (or hardware tampering) cannot mathematically corrupt the Digital Water Ledger.
