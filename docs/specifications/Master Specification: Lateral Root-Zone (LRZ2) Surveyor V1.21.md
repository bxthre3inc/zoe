# Master Specification: Lateral Root-Zone (LRZ2) Surveyor V1.21

**Role**: Layer 1 Lateral Root-Zone **Reference** | **Network Density**: 4 units per 140-160 acre Field (2:4:12 Stereo Standard)

The Lateral Root-Zone **Reference** (LRZ2) serves as the high-density spatial mapper of the FarmSense network. Deployed at a density of 5 units per 150-acre field, these mass-produced **Dumb Node** Surveyors provide the granular moisture and temperature counts required to translate field-wide trends into sub-meter soil variability maps.
 They do not process complex Worksheets or execute localized Bayesian math. They do not carry on-board GPS; instead, they are "Pinned" to the regional map by the PMT's RTK-GNSS anchor as it transits the field. This "Pin Mapping" ensures that every moisture data point is accurately geofenced with sub-meter precision. Their sole operational imperative is to capture raw dielectric and electrical conductivity (EC) counts across their specific zone, encrypt them, and "chirp" them back to the **PMT Field Aggregator** anchored on the pivot. This massive density of spatial data is what ultimately powers the FarmSense UI and **Command & Control (C&C)** logic—allowing the system to mathematically transition from the Free (50m) and Basic (20m) tiers to the highly lucrative Pro (10m) and Enterprise (1m) resolution "pops."

**The Seasonal Deployment Model**: To protect the LRZ's internal electronics and guarantee a 10-year hardware lifecycle, FarmSense utilizes a two-phase seasonal deployment strategy. The outer structural shells act as ultra-cheap, geo-located permanent docking stations that remain buried in the field year-round. The internal, highly sensitive sensor sleds are dropped into these shells after spring planting and physically extracted just prior to harvest. This workflow entirely eliminates the risk of deep-freeze winter battery degradation while perfectly preserving the exact physical/spatial baseline required by the **RSS RDC Compute**. By maintaining this permanent sub-surface coordinate, the Oracle engine can flawlessly integrate the seasonal LRZ telemetry with the static **Soil Variability Maps** during the 1m Kriging generation.

## 1. Structural Housing ("Invisible Presence" Architecture & Seasonal Docking)

The LRZ housing is engineered for an "Invisible Presence"—a ruggedized subterranean deployment capable of withstanding the extreme mechanical stresses of 4WD tractor passes and repetitive deep-soil compaction cycles common in potato-barley rotations.

* **The Outer Shell (The Docking Station)**: Constructed from Standard 2" HDPE SDR9 (High-Albedo White). Cut precisely to 18 inches to perfectly match the internal 18U sled, this shell sits perfectly flush with the soil surface.
* **Material Science**: White HDPE was selected specifically for its high albedo (thermal reflection) to prevent internal components from baking during surface exposure. HDPE is also chemically inert to the sulfur-rich SLV alkali soils.
* **Installation Efficiency**: By keeping the shell at exactly 18 inches, the hydraulic auger crews only need to drill a shallow pilot hole, exponentially speeding up installation.
* **15-Degree Tapered Driving Tip (Compaction-Fit)**: The 18-inch outer shell is chemically fused to a Custom HDPE Driving Tip featuring a precise 15-degree taper, eliminating air gaps that corrupt moisture readings.
* **Low-Profile Antenna Mount**: The removable **Wide-Brim Solar Cap** (4"-5" diameter) replaces the standard C&C Cap, integrating a flexible solar panel to enable **Solar-Enhanced Mode** (4-8 chirps/day). Mounts a 3-foot SS-304 stainless steel whip antenna. Below-span height maintained.
* **The Removable Internal Sled**: The core internal structure is an 18-Inch 50mm Co-Extruded Alpha-Sled capped with Injection-Molded Circular End-Caps. This removable payload is swiftly inserted post-planting and extracted pre-harvest.
* **The Seasonal Climate (+5 psi Defense)**: Upon insertion, Viton (FKM) 2" O-rings seal the sled against the shell walls. The internal cavity is flushed and pressurized to +5 psi with Dry Nitrogen for active protection against micro-fractures.

## 2. Edge Logic & The Secure "Chirp" Protocol

The LRZ is an exercise in extreme power efficiency. It lacks the eMMC storage and heavy compute processors found in edge coordinators. It is a "Set and Forget" asset that awakens, acts, and sleeps.

* **Ultra-Low Power ASR6601 Logic**: The compute board relies on the ASR6601 LoRa SoC (Cortex-M4 + Semtech SX1262 LoRa). This chip stays in a deep 1.5µA sleep state for 99% of its life.
* **Fringe Field Physics**: Wakens to sample the dielectric interface using a direct analog measurement via P0.02 (AIN0) and P0.03 (AIN1), pulling 5mA for 1.0ms.
* **900MHz FHSS Implementation:** The LRZ units execute 128- **Protocol**: 900MHz FHSS (Frequency-Hopping Spread Spectrum)

* **Encryption**: AES-128 CCM (Authenticated Encryption)

* **Networking Ability**: Synchronized 1:1 with VFA/PFA for uniform field-layer data reporting.
d. By scattering micro-transmissions across 75 different frequencies, the system ensures superior penetration through dense crop canopies and mitigates co-channel interference, completely eliminating the probability of packet collisions within the confines of a single high-density farm field.

* **128-Bit Edge Encryption**: Before the chirp leaves the antenna, the payload is signed and encrypted with a factory-burned 128-bit AES key. The **PMT aggregator** intercepts and decrypts this packet for routing. (Transmit draws 55mA for 50ms).
* **Oracle Unified Compute Remote Calibration**: The LRZ2 requires zero manual calibration. Its baseline is established remotely by the **Oracle Unified Compute** using the high-fidelity Bayesian math from the field's VFA "Truth Node."

## 3. The High-Density Sensor Array (18-Inch / 18U Sequence)

Like the VFA, the LRZ employs the advanced "Proxy Method" of non-contact sensing, shooting high-frequency dielectric fields directly through the 50mm sled wall, the nitrogen gap, and the permanent HDPE shell.

**Locked 18U Physical Stack Sequence**:

* **Slot 1**: 1U Bulk Stamped Desiccant Pack (Growing season moisture trap)
* **Slots 2-5**: 4U Battery #1 (3x 21700 lithium-ion cells - Optimized for 5+ year seasonal cycling)
* **Slots 6-9**: 4U Extruded Spacer
* **Slot 10**: 1U Basic Sensor (10" Depth: Seedbed & Evapotranspiration Monitoring)
* **Slots 11-14**: 4U Battery #2 (Redundant energy overhead for extended seasonal sampling ripples)
* **Slots 15-17**: 3U Extruded Spacer
* **Slot 18**: 1U Basic Sensor (18" Depth: Root Anchor Monitoring)

## 4. The Seasonal Deployment Workflow & OEM Scale BOM

**The "Blitz" Installation & Extraction Cycle**:

1. **Post-Planting Insertion**: Utilizing a three-crew rotation, installation is calculated at under 10 minutes per unit. Crew A drills/sets the shell, Crew B drops/pressurizes the sled, and Crew C performs final compaction.
2. **Harvest Extraction**: Prior to harvest, crews extract the internal sleds and cap the permanent shells with crush-proof blanking plugs.

## 5. Hyper-Granular OEM Scale BOM & Logistics (15,600 Unit Tier)

| Category | Component Detail | MPN / Supplier | Lead Time | Unit Cost |
| :--- | :--- | :--- | :--- | :--- |
| **Housing** | 2" SCH 40 UV-HDPE (18-inch) | JM-602-18 | 2 Weeks | $1.50 |
| **Housing** | HDPE Injection-Molded (H6) Tip | FS-TIP-H6 | 4 Weeks | $4.50 |
| **Antenna** | 3ft SS-304 Whip + Spring | Industrial Pultrusion | 2 Weeks | $3.50 |
| **Solar Cap** | Wide-Brim Flexible Solar Panel (4"-5" dia) | FS-SOL-WB-1 | 4 Weeks | $2.80 |
| **Adhesive** | Structural HDPE Acrylic Epoxy | Automated Bulk | 1 Week | $4.50 |
| **Seals** | Nitrile O-Rings + Cap | FS-SEAL-V0 | 3 Weeks | $4.80 |
| **Nitrogen Port** | Mini-Check Valve (316-SS) | Swagelok-SS-CHK | 3 Weeks | $10.00 |
| **Computing** | **ASR6601 LoRa SoC (Integrated)** | FS-ASR-V1.0 | 8 Weeks | $4.00 |
| **PCBA** | Optimized 18U PCBA (Fixed-Function) | FS-LRZ2-18U | 12 Weeks | $4.95 |
| **Climate** | 1U Stamped Desiccant Matrix | Bulk Supply | 1 Week | $1.50 |
| **Structure** | HDPE SDR9 Structural Shell | FS-Custom-18U | 2 Weeks | $4.25 |
| **Basic Sensor** | 1U Basic Sensor (VWC/Temp) (x2) | Fab-Direct Assembly | 4 Weeks | $8.00 |
| **TOTAL** | **Per Unit Hardware Cost (Absolute OEM Scale)** | | | **$54.30** |

---

## 6. Firmware Details (v2.4.1)

> *Source: consolidated from `codebase_docs/.../specifications/firmware/LRZ_Firmware_Spec.md`*

### 6.1 Boot & Initialization

1. **Cold Start:** 750ms wake-up from deep sleep via RTC interrupt.
2. **BIST (Built-In Self Test):** Verifies capacitor charge and antenna VSWR.
3. **Sensor Read:** 10-point mean of raw ADC soil tension + canopy ambient temp.

### 6.2 The "Dumb Chirp" Protocol (LPI/LPD)

* **Modulation:** GFSK (Gaussian Frequency Shift Keying).
* **Frequency Hopping:** 128-bit pseudo-random seed synced to PMT epoch — 75 channels, zero packet collisions in high-density fields.
* **Packet Structure:**
  * `[4B Preamble] | [8B NodeID] | [2B Tension] | [2B Temp] | [16B AES-MAC] | [4B CRC]`
* **Encryption:** Hardware-accelerated AES-128 in CCM mode (factory-burned key).

### 6.3 Power-Managed Duty Cycle

| State | Current | Duration |
| :--- | :--- | :--- |
| Deep sleep (RTC active) | 0.8µA | Continuous baseline |
| Sensor ingest | 4.5mA | 50ms window |
| RF chirp (+8dBm) | 14mA | 12ms window |

**Life Expectancy:** 36,400 cycles ≈ 5.2 years at 4-hour sampling intervals.

### 6.4 "Ripple" Mode — Adaptive Sampling

The LRZ passively monitors for a "Sub-Beacon" from the PMT. If detected:

* **Trigger:** PMT broadcasts Sub-Beacon on anomaly detection.
* **Action:** Transition from 4-hour → 15-minute sampling intervals.
* **Duration:** 12 hours or until "Stable" beacon received.
* **Objective:** Real-time mapping of propagating soil anomaly epicenters.

---

*Infrastructure Classification: Permanent Ground-Truth Asset*  
*Spec Version: V1.21 | Firmware Version: 2.4.1*
