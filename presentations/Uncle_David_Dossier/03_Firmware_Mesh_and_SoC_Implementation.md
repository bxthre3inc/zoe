# 03 Firmware Mesh and SoC Implementation

This document serves as the low-level engineering specification for the FarmSense edge architecture. It details how the physical physics of the agricultural field are ingested by the silicon, encrypted, and safely transmitted to the Oracle servers.

## 1. SoC Peripherals & Register Mapping

The core intelligence of the FarmSense edge relies heavily on direct register manipulation rather than abstract HALs (Hardware Abstraction Layers), ensuring deterministic execution timing and absolute power minimalization.

### 1.1 nRF52840 (VFA) LoRa SPI Interface

The nRF52840 interfaces with the Semtech SX1262 LoRa transceiver via the SPI3 peripheral. To prevent the high-power LoRa chirps from introducing noise into the analog sensor read streams, SPI transactions are heavily synchronized.

* The `SPIM3->EVENTS_END` register triggers an interrupt that shifts the SoC from an active transmission state back into a `__WFE()` (Wait For Event) low-power sleep state within micro-seconds of the SPI buffer clearing, ensuring the 800Ah LiFePO4 battery is not needlessly drained.

### 1.2 i.MX RT1020 (PFA) ADC Calibration

The Pressure & Flow Anchor acts as the safety shut-off valve for a 1,500 GPM wellhead. The NXP i.MX RT1020 must read rapid pressure differentials.

* **Bandgap Reference Offset**: We do not rely on standard 3.3V rail estimations for the ADC. The firmware utilizes the internal 1.2V bandgap reference. The register `ADC_CAL` command is triggered every 10,000 read cycles to dynamically re-calculate the `ADC_OFS` (Offset) register. This ensures that the 4-20mA pressure transducers remain perfectly linear across a grueling -20°C to +55°C seasonal temperature swing.

## 2. Real-Time OS & Interrupt Topology

FarmSense nodes utilize FreeRTOS to manage tasks, but the critical physical logic relies on the ARM Cortex-M Nested Vectored Interrupt Controller (NVIC).

### The Priority Matrix

* **Priority 0 (Absolute Safety Override):** Reserved exclusively for mechanical runaway states. On the PFA, if the hardware watchdog (`WDT->CR`) detects that the 1,500 GPM pump has lost flow but the electrical contactor is still active (a cavitation event that will melt the pump), Priority 0 immediately bypasses all software state-machines and aggressively fires a hardware GPIO pin to sever the 480V pump relay.
* **Priority 1 (Kinematic Lock):** Reserved for the u-blox ZED-F9P RTK Timepulse (PPS) on the PMT. This nanosecond-accurate pulse triggers the start of the DMA transfer for the ultrasonic flow meters, ensuring that the volume of water is perfectly timestamped to the pivot's exact geometric location.
* **Priority 2 & 3 (Network Layer):** Handle BLE mesh synchronization events and incoming LoRaWAN MAC commands.

## 3. "Fringe Field" Capacitance Physiscs (LRZ)

The Lateral Root-Zone scout utilizes a custom time-of-flight analog circuit. It does not measure raw resistance; it measures the dielectric permittivity ($E_r$) of the soil.

* **The CHIRP State Machine**: The nRF52811 uses its internal 32MHz oscillator to fire an 80MHz 'CHIRP' via a custom LC tank circuit embedded in the LRZ's PCB traces.
* **Charge/Discharge Timing**: The soil acts as the dielectric medium between the traces. The firmware utilizes the nRF's internal Comparator (`COMP`) and hardware Timer (`TIMER2`). It measures the exact nanosecond delay required for the RC circuit to cross a 1.65V threshold. Water has an $E_r$ of ~80, while dry soil is ~4. This massive dielectric shift slows the capacitor's charge rate, providing a hyper-accurate, sub-millimeter measurement of the moisture envelope moving through the soil horizon.

## 4. Hardware Security Module (HSM) & Encryption

Agricultural data at this scale is heavily targeted. To prevent "Water Hackers" from spoofing data to the State Water Engineer, the physical mesh is completely cryptographically blind to unsigned payloads.

### 4.1 ARM CryptoCell-310 (CC310)

The VFA explicitly uses the nRF52840 because it features the ARM TrustZone CryptoCell-310 hardware security subsystem.

* **Key Injection (SOP-09)**: During the Winter Sled Hospital overhaul, a unique, device-specific ECC-256 private key is injected directly into the CC310's secure NVRAM via a physical JTAG debug lead.
* **AES-128 Blind Payloads**: The CC310 handles the AES-CCM encryption entirely in hardware. The main Cortex-M4 CPU hands a raw moisture payload pointer to the CC310, and receives an encrypted, signed hash back. The CPU never possesses the private key in open RAM, preventing memory-scraping attacks.

### 4.2 PBFT Mesh Consensus & The Virtual Mesh

At the District Hub (DHU) level, we operate a Practical Byzantine Fault Tolerance (PBFT) consensus model. Before a Regional Superstation logs a 1,000,000-gallon water usage tick to the irreversible Digital Water Ledger, it requires a mathematical multi-signature.

If 1 VFA out of 10 in a mesh cluster reports catastrophic flooding while the other 9 report dry soil, the Hub evaluates this "outlier" against the **static Soil Variability Map**. If the outlier sits in an isolated clay depression, the Kriging algorithm validates its heavy weighting and interpolates the localized flood into the **1m Virtual Sensor Network**. However, if the outlier sits in a highly-drainable sandy ridge (where flooding is physically impossible given the other 9 nodes), the Hub flags the outlier for physical inspection and temporarily nullifies its weight, ensuring that sensor malfunction (or hardware tampering) cannot mathematically corrupt the Digital Water Ledger.
