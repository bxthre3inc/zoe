# Master Specification: Vertical Field Anchor (VFA) V1.21

**Role**: Layer 1 "Truth" Node & Sensor Aggregator | **Network Density**: 1 VFA per Field (Aggregating LRZs)

As the primary field-level relay and intelligence hub of the FarmSense SFD (single field deployment) architecture, the Vertical Field Anchor (VFA) operates as a high-fidelity subsurface data logger, a secure routing node, and the critical baseline calibration tool—the absolute "Truth" node—for the **Oracle Unified Compute**.

**Network Topology**: There is exactly one VFA deployed per field. The VFA is "Pinned" spatially by the high-precision PMT during the initial 24-hour calibration window, eliminating the need for internal GPS while maintaining sub-meter spatial integrity. This single VFA is responsible for intercepting the 128-bit encrypted FHSS chirps from the surrounding high-density Lateral Root-Zone (LRZ) scouts, which are deployed at a strict density of 1 unit per 15 acres.
**Subsurface Housing**: HDPE (High-Density Polyethylene) SDR9 or 11. Selected for zero-degradation in high-alkali San Luis Valley mineral profiles and superior impact strength at -30°F.
 Instead of treating each data point in isolation, the solitary VFA seamlessly aggregates this expansive lateral spatial data, combines it with its own 48-inch deep-profile vertical readings, and securely routes the highly compressed, unified payload to the central Farm Hub located at the pivot. By serving as the localized edge coordinator, the VFA ensures that absolutely no data is lost during cellular blackouts. More importantly, it establishes the rigorous empirical ground truth required for ultra-precision irrigation, yield optimization, and the strict legal water-use auditing demanded by local water authorities.

**The Seasonal Deployment Model**: To maximize the lifespan of the high-value electronics, the VFA utilizes a two-phase seasonal deployment strategy. The outer structural shells act as ultra-cheap, geo-located permanent docking stations that remain buried in the field year-round. This internal, highly sensitive sensor sleds are dropped into these shells after spring planting and physically extracted just prior to harvest. This workflow entirely eliminates the risk of deep-freeze winter battery degradation while perfectly preserving the exact physical/spatial baseline required by the **RSS RDC Compute**. By maintaining this permanent sub-surface coordinate, the Oracle engine can flawlessly integrate the seasonal VFA telemetry with the static **Soil Variability Maps** during the 1m Kriging generation.

## 1. Structural Housing & Climate Control (The Seasonal Docking Station)

The VFA housing has been radically re-engineered using a dual-cylinder architecture designed to completely isolate external structural loads from the delicate internal electronics.

* **The Outer Shell (The Docking Station)**: Constructed from Standard 2" Schedule 40 UV-Stabilized HDPE (Inside Diameter: 2.067" / 52.5mm). By utilizing an exact 4-foot (48-inch) cut, the outer 2" pipe sits completely flush with the soil surface. This shell stays in the ground over the winter, resisting sub-zero frost-shatter.
* **Low-Profile Antenna Mount**: The removable C&C Cap mounts a 3-foot SS-304 stainless steel whip antenna directly to its base via a heavy-duty spring. This gives the VFA an exact 3-foot profile above the soil, minimizing collision risk with tractor booms while remaining highly visible to the elevated PMT hub overhead.
* **Monolithic Chemical Fix (HDPE-to-HDPE)**: The outer shell is paired with a Custom HDPE Tapered Driving Tip, chemically fused using low-surface-energy Structural HDPE Acrylic Epoxy.
* **The Removable Internal Sled**: The core internal structure is a 48-Inch 50mm Co-Extruded Alpha-Sled capped with precision Injection-Molded Circular End-Caps. This sled acts as a robust internal spine, clamping the 48U sequence of modular cartridges.
* **The Seasonal Climate (+5 psi Defense)**: Upon seasonal insertion, Viton (FKM) 2" O-rings seal the sled against the shell walls. The internal cavity is flushed and pressurized to +5 psi with Dry Nitrogen, creating an inert, zero-humidity environment that acts as an active defense against micro-fractures and groundwater ingress.

## 2. Custom Relay Logic & Encryption (The Hub Pipeline)

By stripping the VFA down to pure routing and encryption functions, we have intentionally offloaded all heavy cellular backhaul requirements and complex computations to the central Farm Hub and the **Command & Control (C&C)** backend.

* **Interference Mitigation & FHSS**: The VFA utilizes a highly sensitive onboard FHSS mesh receiver to intercept the transmit-only "dumb" chirps from its fleet of 15-acre LRZs.
* **Firmware Logic & Interrupts**: Operates an RTOS prioritizing pressure transients (Priority 0) over mesh coordination (Priority 1) and ADC dielectric sampling (Priority 2).
* **Edge Decryption & Aggregation**: As the VFA catches these asynchronous chirps, it performs localized Edge Decryption, aggregating the raw electrical counts from the 15-acre lateral nodes with its own high-fidelity deep-soil data.
* **Hardware Security & Root of Trust (RoT)**: A 256-bit Private Key is generated within the nRF52840's CryptoCell-310 HSM. It is injected at the RSS and never leaves the silicon.
* **Local 900MHz Uplink & 2.4GHz Transceiver**: The VFA utilizes a high-gain 900MHz LoRa uplink to bounce the secure payload directly to the District Farm Hub. It also incorporates a **2.4GHz/BLE Transceiver** module to communicate with the Pressure & Flow Anchor (PFA) safety nodes and field-level sensors.
  * **Radio**: nRF52811
  * **Protocol**: 900MHz FHSS (Frequency-Hopping Spread Spectrum)
  * **Encryption**: AES-128 CCM (Authenticated Encryption)
  * **Networking Ability**: Synchronized 1:1 with LRZ/PFA for uniform field-layer data reporting.
  * Output Power: +4dBm. Sensitivity: -96dBm. Modulated for 100% penetration through potato/corn canopies.
  * **Antenna**: Flush-mount 3-foot flexible 900MHz whip (Internalized).

### 2.1 Deep Technical Specs (nRF52840 Interface)

* **P0.28-31**: SPI Bus (LoRa Radio SCK/MOSI/MISO/CS).
* **P1.02**: PWM (Auxiliary Actuator Port - Formerly Heater).

## 3. The "Proxy Method" Sensor Array (48-Inch / 48U Sequence)

The VFA employs advanced non-contact sensing, shooting high-frequency dielectric fields directly through the removable 50mm sled wall, across the nitrogen gap, and straight through the permanent HDPE shell.

**Locked 48U Physical Stack Sequence**:

* **Slot 1**: 1U Bulk Stamped Desiccant Pack (Apex moisture trap)
* **Slots 2-5**: 4U Battery #1 (3x 21700 lithium-ion cells - High capacity for seasonal cycling)
* **Slots 6-9**: 4U Extruded Spacer
* **Slot 10**: 1U Advanced Sensor (10" Depth: Active root zone proxy)
* **Slots 11-14**: 4U Battery #2
* **Slots 15-17**: 3U Extruded Spacer
* **Slot 18**: 1U Basic Sensor (18" Depth: Evaporation transition monitoring)
* **Slots 19-24**: 6U Extruded Spacer
* **Slot 25**: 1U Advanced Sensor (25" Depth: Mature root zone "Pivot Point")
* **Slots 26-29**: 4U Battery #3
* **Slots 30-34**: 5U Extruded Spacer
* **Slot 35**: 1U Basic Sensor (35" Depth: Descending wetting front tracking)
* **Slots 36-39**: 4U Battery #4
* **Slots 40-43**: 4U Extruded Spacer
* **Slots 44-47**: 4U Battery #5
* **Slot 48**: 1U Advanced Sensor (48" Depth: The Deep Percolation Anchor)

## 4. The Seasonal Deployment Workflow & OEM BOM

**The Post-Planting "Blitz" & Harvest Extraction**:

1. **Post-Planting Insertion**: Sensor sleds are dropped into the pre-located permanent HDPE shells, locked, and pressurized in under 15 minutes.
2. **Harvest Extraction**: Prior to harvest, crews pull the C&C caps, extract the sleds for warehouse charging, and cap the shells with blanking plugs.

## 5. Hyper-Granular OEM Scale BOM & Logistics (1,280 Unit Tier)

| Category | Component Detail | MPN / Supplier | Lead Time | Unit Cost |
| :--- | :--- | :--- | :--- | :--- |
| **Housing** | 2" SCH 40 UV-HDPE (4ft) | JM-602-UV | 2 Weeks | $4.00 |
| **Housing** | Zinc-Plated Friction-Formed Tip | FS-TIP-H8 | 4 Weeks | $4.25 |
| **Antenna** | 3ft SS-304 Whip + Spring | Industrial Pultrusion | 2 Weeks | $3.50 |
| **Adhesive** | Structural HDPE Acrylic Epoxy | Automated Bulk | 1 Week | $4.50 |
| **Seals** | Viton O-Rings + Nitrogen Check Valve | FS-SEAL-V1 (316-SS) | 3 Weeks | $15.00 |
| **Computing** | nRF52840 Mainboard PCBA | Nordic-FS-V1.2 | 8 Weeks | $24.50 |
| **Climate** | 1U Stamped Desiccant Matrix | Bulk Supply | 1 Week | $1.50 |
| **Structure** | 48" AlphaSled Chassis | Continuous Extrusion | 3 Weeks | $3.25 |
| **Structure** | Injection-Molded EndCaps | High-Cavity Mold | 4 Weeks | $0.60 |
| **Structure** | Schedule 80 UV-PVC Spacers (22U) | FS-Custom-48U | 2 Weeks | $0.45 |
| **Power (x5)** | 4U Battery Cartridges (21700x3 Li-ion) | Samsung 50E | 6 Weeks | $83.75 |
| **Adv. Sensor** | Proprietary 10-Unit Stack (NPK/EC/pH) | FS-DE-48U | 12 Weeks | $120.00 |
| **Basic Sensor** | 1U Basic Sensor (VWC/Temp) | Fab-Direct Assembly | 4 Weeks | $4.00 |
| **TOTAL** | **Per Unit Hardware Cost (Absolute OEM Scale)** | | | **$159.65** |

---

## 6. Firmware Details & Protocol

> *Source: consolidated from `codebase_docs/.../specifications/firmware/VFA_Firmware_Spec.md`*

### 6.1 The MAD Battery Metaphor (Core Firmware Logic)

The firmware calculates Management Allowable Depletion (MAD) status locally on the nRF52840:

* **Logic:** Aggregates Soil Matric Potential (SMP) across all 3 depths to determine the "Remaining Charge" in the soil water battery profile.
* **Primary Telemetry:** MAD percentage transmitted as the highest-priority field in every chirp.
* **Upstream Use**: The Layer 1.5 PMT hub uses the aggregated MAD value as the ground-truth anchor for 50m grid interpolation.

### 6.2 Seasonal Dormancy (Winter Sleep)

* **Trigger:** Soil temperature < 33°F for 48 consecutive hours.
* **Sleep State:** 8µA draw, 1-week heartbeat chirps only.
* **Wake Conditions:** Thermal rise above 38°F, or PMT "Spring Wake" radio pulse.

### 6.3 Supplemental BOM (Firmware Hardware)

| Part Class | Model/Manufacturer | Qty | Role |
|---|---|---|---|
| **Main SoC** | Nordic nRF52840 | 1 | Logic/Radio |
| **Moisture** | Tensiometric (Custom) | 3 | Deep Profiling |
| **VWC Sensor** | Dielectric Ring | 2 | VWC/Temp/EC |
| **Cells** | Samsung 50E (21700) | 12 | Energy Storage |
| **Solar** | 5W Custom Panel + MPPT | 1 | MPPT Harvesting |

*Note: costs included in master BOM above.*

---

*Infrastructure Classification: Permanent Ground-Truth Asset*
*Spec Version: V1.21 | Firmware: nRF52840 SDK v17*
