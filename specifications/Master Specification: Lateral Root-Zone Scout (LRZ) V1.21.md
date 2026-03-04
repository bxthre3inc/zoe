# Master Specification: Lateral Root-Zone Scout (LRZ) V1.21

**Role**: Lateral Variability "Scout," High-Density Dumb Node, & Spatial Mapper | **Network Density**: 1 LRZ per 15 Acres (Reporting to 1 VFA per Field)

While the Vertical Field Anchor (VFA) serves as the singular high-fidelity "Truth" node for an entire field, the Lateral Root-Zone Scout (LRZ) is the indispensable high-density spatial component of the FarmSense grid. Designed to be mass-deployed at a strict density of 1 unit per 15 acres, the LRZ operates as a hyper-efficient "dumb node."

**Network Topology**: On a standard 125-160 acre center pivot, a fleet of approximately 8 to 10 LRZ units will form a local mesh. They do not process complex Worksheets or execute localized Bayesian math. They do not carry on-board GPS; instead, they are "Pinned" to the regional map by the PMT's RTK-GNSS anchor as it transits the field. This "Pin Mapping" ensures that every moisture data point is accurately geofenced with sub-meter precision. Their sole operational imperative is to capture raw dielectric and electrical conductivity (EC) counts across their specific 15-acre zone, encrypt them, and "chirp" them back to the single VFA anchored in that field. This massive density of spatial data is what ultimately powers the FarmSense UI and **Command & Control (C&C)** logic—allowing the system to mathematically transition from the Free (50m) and Basic (20m) tiers to the highly lucrative Pro (10m) and Enterprise (1m) resolution "pops."

**The Seasonal Deployment Model**: To protect the LRZ's internal electronics and guarantee a 10-year hardware lifecycle, FarmSense utilizes a two-phase seasonal deployment strategy. The outer structural shells act as ultra-cheap, geo-located permanent docking stations that remain buried in the field year-round. The internal, highly sensitive sensor sleds are dropped into these shells after spring planting and physically extracted just prior to harvest. This workflow entirely eliminates the risk of deep-freeze winter battery degradation while perfectly preserving the exact physical/spatial baseline required by the **RSS Oracle Compute**. By maintaining this permanent sub-surface coordinate, the Oracle engine can flawlessly integrate the seasonal LRZ telemetry with the static **Soil Variability Maps** during the 1m Kriging generation.

## 1. Structural Housing ("Invisible Presence" Architecture & Seasonal Docking)

The LRZ housing is engineered for an "Invisible Presence"—a ruggedized subterranean deployment capable of withstanding the extreme mechanical stresses of 4WD tractor passes and repetitive deep-soil compaction cycles common in potato-barley rotations.

* **The Outer Shell (The Docking Station)**: Constructed from Standard 2" Schedule 40 UV-White HDPE. Cut precisely to 18 inches to perfectly match the internal 18U sled, this shell sits perfectly flush with the soil surface.
* **Material Science**: White HDPE was selected specifically for its high albedo (thermal reflection) to prevent internal components from baking during surface exposure. HDPE is also chemically inert to the sulfur-rich SLV alkali soils.
* **Installation Efficiency**: By keeping the shell at exactly 18 inches, the hydraulic auger crews only need to drill a shallow pilot hole, exponentially speeding up installation.
* **15-Degree Tapered Driving Tip (Compaction-Fit)**: The 18-inch outer shell is chemically fused to a Custom HDPE Driving Tip featuring a precise 15-degree taper, eliminating air gaps that corrupt moisture readings.
* **Low-Profile Antenna Mount**: The removable C&C Cap mounts a 3-foot SS-304 stainless steel whip antenna directly to its base via a heavy-duty spring. This gives the LRZ an exact 3-foot profile above the soil, keeping it beneath the destructive sweep of the pivot span.
* **The Removable Internal Sled**: The core internal structure is an 18-Inch 50mm Co-Extruded Alpha-Sled capped with Injection-Molded Circular End-Caps. This removable payload is swiftly inserted post-planting and extracted pre-harvest.
* **The Seasonal Climate (+5 psi Defense)**: Upon insertion, Viton (FKM) 2" O-rings seal the sled against the shell walls. The internal cavity is flushed and pressurized to +5 psi with Dry Nitrogen for active protection against micro-fractures.

## 2. Edge Logic & The Secure "Chirp" Protocol

The LRZ is an exercise in extreme power efficiency. It lacks the eMMC storage and heavy compute processors found in edge coordinators. It is a "Set and Forget" asset that awakens, acts, and sleeps.

* **Ultra-Low Power nRF Logic**: The compute board relies on a Nordic nRF52811 SoC (Cortex-M4 @ 64MHz). This chip stays in a deep 1.5µA sleep state for 99% of its life.
* **Fringe Field Physics**: Wakens to sample the dielectric interface using a direct analog measurement via P0.02 (AIN0) and P0.03 (AIN1), pulling 5mA for 1.0ms.
* **Interference Mitigation (FHSS)**: The LRZ chirp utilizes a Frequency-Hopping Spread Spectrum (FHSS) approach, scattering micro-transmissions across 75 different frequencies to ensure zero packet collisions in high-density fields.
* **128-Bit Edge Encryption**: Before the chirp leaves the antenna, the payload is signed and encrypted with a factory-burned 128-bit AES key. The field VFA intercepts and decrypts this packet for routing. (Transmit draws 120mA for 50ms).
* **Oracle Unified Compute Remote Calibration**: The LRZ requires zero manual calibration. Its baseline is established remotely by the **Oracle Unified Compute** using the high-fidelity Bayesian math from the field's VFA "Truth Node."

## 3. The High-Density Sensor Array (18-Inch / 18U Sequence)

Like the VFA, the LRZ employs the advanced "Proxy Method" of non-contact sensing, shooting high-frequency dielectric fields directly through the 50mm sled wall, the nitrogen gap, and the permanent HDPE shell.

**Locked 18U Physical Stack Sequence**:

* **Slot 1**: 1U Bulk Stamped Desiccant Pack (Growing season moisture trap)
* **Slots 2-5**: 4U Battery #1 (3x 21700 lithium-ion cells for frost defense heating)
* **Slots 6-9**: 4U Extruded Spacer
* **Slot 10**: 1U Basic Sensor (10" Depth: Seedbed & Evapotranspiration Monitoring)
* **Slots 11-14**: 4U Battery #2 (Redundant energy overhead for thermal defense)
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
| **Adhesive** | Structural HDPE Acrylic Epoxy | Automated Bulk | 1 Week | $4.50 |
| **Seals** | Nitrile O-Rings + Cap | FS-SEAL-V0 | 3 Weeks | $4.80 |
| **Nitrogen Port** | Mini-Check Valve (316-SS) | Swagelok-SS-CHK | 3 Weeks | $10.00 |
| **Computing** | nRF52811 Embedded Sled | Nordic-FS-V1.0 | 8 Weeks | $12.50 |
| **Logic Board** | Proprietary 18U PCBA | FS-LRZ-18U | 12 Weeks | $8.00 |
| **Climate** | 1U Stamped Desiccant Matrix | Bulk Supply | 1 Week | $1.50 |
| **Power (x2)** | 4U Battery Cartridges (18650x2) | LFP-18650-1500 | 6 Weeks | $13.00 |
| **Basic Sensor** | 1U Basic Sensor (VWC/Temp) | Fab-Direct Assembly | 4 Weeks | $4.00 |
| **TOTAL** | **Per Unit Hardware Cost (Absolute OEM Scale)** | | | **$67.80** |
