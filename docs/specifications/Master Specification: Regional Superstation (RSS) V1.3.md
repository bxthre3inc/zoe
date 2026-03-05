# Master Specification: Regional Superstation (RSS) V1.3

**Role**: Layer 3 Territory Cortex & Master DIL | **Location**: Monte Vista Hub, SLV

The Regional Superstation (RSS) is the absolute "Cortex" of the FarmSense network for Subdistrict 1. It serves as the physical high-performance computing anchor, the master data repository, and the primary logistics staging ground for the regional Digital Water Ledger. Unlike the field-level VFA or the district-level DHU, the RSS is designed for heavy-lift spatial analytics and long-term legal data vaulting. It houses the **Oracle Multi-Core Compute Layer** and the RDC, providing the computational horsepower required to turn hundreds of millions of raw sensor "chirps" into hyper-accurate 1m-resolution Enterprise maps, while managing the heavy Fully Homomorphic Encryption (FHE) overhead for long-term secure vaulting.

**Operational Philosophy**: The RSS is the bridge between field-level IoT hardware and cloud-scale scientific modeling. It serves as the physical backbone for the **Command & Control (C&C)** portal, providing the internal workforce with a unified interface for subdistrict-wide monitoring and fleet deployment, including XR workforce role support. It is engineered to ensure that even during total regional internet failures or cellular blackouts, the subdistrict's water accounting data remains intact, auditable, and legally irrefutable. Furthermore, the RSS acts as the "Sled Hospital" for the seasonal extraction program, ensuring the 10-year hardware lifecycle is maintained through precision maintenance, trickle-charging, and nitrogen re-pressurization. By centralizing the intelligence and maintenance of the subdistrict, the RSS reduces the marginal cost of data management while maximizing the legal "Seniority" of the members' water rights.

## 1. Facility Architecture: The Linear High-Cube Command Center

The RSS utilizes a 40' High-Cube (HC) Modified Shipping Container as its structural foundation. To maintain thermal stability and operational flow within the narrow 7'8" (2.35m) internal width, the facility is divided into three distinct functional zones in a "Dirty-to-Clean" linear progression. This layout is specifically designed to facilitate the "Field Blitz" deployment model, where speed and precision are paramount.

### Zone A: The Logistics & Refurbishment Bay (20' x 7.7')

Located at the primary double-door end of the container, this zone handles the heavy physical movement of the "Blitz" deployment and serves as the primary intake for field hardware.

* **Tactical Fleet Dock**: Specifically dimensioned to house the Polaris Ranger-HD UTV and the Hydraulic Auger Trailer. With a 62" vehicle width, this leaves a 30" walk-aisle for personnel. The floor is reinforced with industrial-grade anti-slip diamond plating to withstand the weight of loaded UTVs and the constant tracking of SLV alkali dust.
* **The Sled Hospital (The Circular Economy Hub)**: A longitudinal stainless steel workbench (12' long) equipped with automated JIGs. This is the heart of the hardware's 10-year survival strategy.
* **Nitrogen Station**: Includes a manifold for flushing and re-pressurizing sleds to +5 psi with Dry Nitrogen. This slight over-pressure is critical; it creates an internal atmosphere that is denser than the surrounding air, actively pushing out moisture and preventing the ingress of groundwater even if the Viton seals experience microscopic wear over a decade.
* **Seal Validation & QC (SOP-09)**: Features a specialized digital pressure-decay tester. Every sled extracted during the harvest window undergoes an ultrasonic solvent bath to remove SLV mineral deposits before a strict 15-minute seal integrity test (Pass = <0.1 PSI drop) is performed. Sleds are scanned via RFID and their battery SoC is archived.
* **Environmental Barrier**: A heavy-duty, clear industrial strip curtain separates Zone A from Zone B. This provides a secondary thermal and dust barrier, ensuring that the abrasive particulates from the maintenance bay do not migrate into the sensitive electronics zones.

### Zone B: Inventory Staging & Ready-Rack (10' x 7.7')

The intermediate zone acts as the supply chain buffer, ensuring the field crews are always equipped for maximum daily "Blitz" output.

* **The Ready-Rack**: High-density vertical shelving designed to hold 3-5 days of installation inventory (approx. 500 units). These racks are organized by "Pivot Kits," pre-packaging the 1 VFA and 8-10 LRZs required for a standard 160-acre center-pivot deployment.
* **Burn-in & Calibration Benches**: Before any sled is cleared for Zone A loading, it is placed on the "Burn-in Bench." Here, every sensor sled is GPS-tagged and undergoes a 24-hour verification cycle, syncing with the local DHU mesh to ensure the radio chipset and the u-blox GNSS module are achieving sub-meter locks before they ever hit the soil.

### Zone C: The "Clean" Core & Server Vault (10' x 7.7')

The most protected, hermetically sealed section at the far end of the container, accessible only to tier-1 technical staff.

* **Oracle Cortex & Vault Storage**: Houses the multi-core compute clusters and the high-density storage arrays. The server racks are mounted on specialized vibration-dampening feet to protect the spinning storage media from the rumble of passing heavy farm equipment.
* **Precision HVAC & Thermal Dynamics**: Utilizes a Mitsubishi Hyper-Heat Mini-Split with an integrated low-ambient kit. In a room only 77 sq. ft in size, the HVAC system can cycle the entire air volume every 90 seconds. This creates a hyper-stable thermal environment, maintaining exactly 68°F ± 1° even when external SLV ambient temperatures plunge to a "Polar Vortex" low of −40°F.
* **Air Scrubbing**: A dual-stage HEPA filtration system runs 24/7. This is non-negotiable in the San Luis Valley, where the fine alkali dust can be highly conductive and corrosive; even a microscopic layer on a high-speed NVMe contact can lead to data corruption in the RDC.

## 2. Computational Infrastructure: Oracle Unified Compute

The RSS provides the local muscle for FarmSense’s primary software engine, ensuring that "Digital Water Ledger" transactions are processed with sub-second latency and absolute cryptographic certainty.

### Oracle Multi-Core Compute & Parallel Processing Workflow

* **Processing Power**: 64-Core AMD Threadripper PRO 5995WX with 512GB of ECC RAM and dual NVIDIA RTX A6000 (48GB) data-processing GPUs.
* **Mathematical Logic & CUDA Smoothing**: This cluster is responsible for the massive Bayesian math required to synchronize data from 15,600 LRZ sensors. The GPUs execute a parallel spatial pipeline: ingesting FHSS chirps, using CUDA kernels to trend-filter moisture noise from pivot "splash-zones," and calculating Variogram clouds.
* **Function**: By processing these math "Worksheets" locally against the high-resolution **Soil Variability Maps**, the RSS renders the 1m Enterprise Kriging Tiles (Layer 12 PNGs) every 15 minutes. This local processing serves the FarmSense UI and **Command & Control (C&C)** field tools, streaming frustum-culled map data to fieldXR headsets for sub-meter "Pinning."

### The RDC (The Master DIL)

* **Storage Hardware**: 50TB WD Gold Enterprise NVMe Array in a RAID-10 configuration for maximum read/write performance and 100% data redundancy.
* **Spatial Query Engine**: Oracle manages the master spatial database. It combines raw moisture chirps with localized context—NDVI maps from Satellite, the Aerial Fleet, 1m DEM (Digital Elevation Models), and historical soil texture maps. To support the **Command & Control (C&C) XR Toolkit**, Oracle implements **Frustum-Aware Streaming**, dynamically culling regional map tiles to serve only the high-resolution 1m data required for the technician's immediate visual field. This reduces XR device bandwidth by >90% during regional blitz deployments.
* **Legal Integrity**: Every incoming data packet is cryptographically signed at the source (VFA/PFA) using 128-bit AES keys and verified at the RSS before being committed to. This creates an Immutable Audit Trail. In a Water Court dispute, this allows the district to present a minute-by-minute, tamper-proof record of water use that is virtually impossible to challenge.

## 3. Triple-Redundant Networking & Power

Following the "Fiber-First" mandate, the RSS acts as the primary backhaul hub for the entire regional mesh, ensuring the "Digital Twin" of Subdistrict 1 is always online.

### The Networking Spine

* **Primary (Fiber ONT)**: Wherever possible, a dedicated fiber-to-the-premise (FTTP) line is trenched to the RSS to provide symmetrical gigabit speeds. This is the primary pipeline for syncing the RDC with the FarmSense Cloud Backup.
* **Secondary (Starlink Business)**: A high-performance Starlink dish is mounted on a 100ft regional distribution tower. It provides a low-latency satellite backhaul if the regional fiber is cut or during large-scale utility failures.
* **Tertiary (900MHz Mesh Peering)**: The RSS maintains a high-power 900MHz peer-to-peer radio link with neighboring District Hubs (DHUs). This ensures that critical "Soft Stop" commands (e.g., stopping a pump because a pivot has stalled) can move across the basin even during a total internet and cellular blackout.

### Resilient Power Plant (Off-Grid Capability)

* **Solar Harvest**: 1.2kW ground-mounted rigid mono-crystalline array located within the secure fenced perimeter. The array is tilted at a steep 55-degree angle to shed heavy Colorado snow loads automatically.
* **Battery Storage**: 800Ah 48V Heated LiFePO4 bank. Internal heating pads draw power from the first 5% of morning solar production to warm the cells above +5°C before allowing the charge current to flow, preventing cold-plate lithium plating and ensuring a 10-year battery lifespan.
* **Autonomous Backup**: A 5kW dual-fuel (Propane/Gas) Honda EU7000iS generator. If the battery bank drops below 30% state-of-charge (SOC) during a prolonged winter storm, the RSS triggers an auto-start sequence to recharge the bank and maintain the HVAC systems for the server vault.

## 4. Hyper-Granular RSS CapEx & Procurement (Subdistrict 1)

This ledger reflects the absolute cost for a fully operational 40' HC RSS hub, encompassing everything from the structural modifications to the specialized "Blitz" deployment fleet.

| Category | Component Description | MPN / Supplier | Lead Time | Unit Cost |
| :--- | :--- | :--- | :--- | :--- |
| **Structure** | 40' HC Modified Container (R-21) | SeaBox-HC40 | 12 Weeks | $18,500 |
| **Climate** | Mitsubishi 36k BTU Mini-Split | MUZ-FS36NA | 2 Weeks | $4,200 |
| **Compute** | AMD Threadripper PRO 5995WX | 100-100000444 | 4 Weeks | $6,499 |
| **Compute** | NVIDIA RTX A6000 (48GB) (x2) | VCNRTXA6000-PB | 6 Weeks | $9,300 |
| **Storage** | 50TB WD Gold NVMe Array | WDS768T1D0D | 2 Weeks | $9,200 |
| **Network** | Fiber ONT + Starlink Business | Local/SpaceX | 6 Weeks | $6,500 |
| **Security** | Verkada AI Perimeter + Badge | Verkada-Pack | 3 Weeks | $15,000 |
| **Power** | 1.2kW Array + 800Ah LFP | Renogy/BattleBorn | 6 Weeks | $14,000 |
| **Backup** | Honda EU7000iS Gen (Auto-Start) | EU7000iS | 2 Weeks | $5,500 |
| **Fleet** | 4WD Heavy Duty Polaris UTV | Polaris-Ranger-HD | 8 Weeks | $28,500 |
| **Software** | Oracle Unified Compute License | FarmSense-Core | 0 Weeks | $50,000 |
| **O&M** | Y1 Ops Contingency | Local Supply | 0 Weeks | $20,500 |
| **TOTAL** | **RSS Project Total** | | | **$187,699** |

## 5. Strategic Value: ROI & The 10-Year Lifecycle

By investing $212,000 in a centralized RSS, FarmSense dramatically lowers the per-acre cost of high-precision irrigation management across 150,000 acres.

* **Maintenance ROI (The Sled Hospital Effect)**: The centralized refurbishment model allows the district to treat sensors as long-term assets rather than disposables. A failed $167 VFA sled can be brought to the Sled Hospital and repaired for less than $15 in parts (new O-rings and a fresh cell), allowing the district to recycle hardware indefinitely and preserving the initial capital investment.
* **The "Digital Twin" Revenue Multiplier**: The RSS is what makes the 1m Enterprise resolution possible. By hosting the RDC Compute layer locally, the RSS facilitates the "Resolution Pop" feature in the farmer's app. This high-conversion UI feature is the primary driver for SaaS upgrades, effectively paying for the RSS infrastructure through increased subscription revenue within the first 24 months.
* **Legal Defensibility & Aquifer Security**: In the high-stakes environment of Subdistrict 1, data is a weapon. The RSS provides the "Empirical Fortress" required to win Water Court disputes. By storing signed, encrypted data locally in the RDC, the district can prove its water stewardship regardless of global cloud outages or geopolitical instability, securing the seniority of its members' water rights for the next generation of farmers.

---

## Facility & Infrastructure Details (Consolidated from RDC_Hardware_Spec.md)

> *Source: consolidated from `codebase_docs/.../specifications/firmware/RDC_Hardware_Spec.md` (formerly named "RDC") — 2026-03-05*
> *Note: "RDC" (Regional Data Center) was the legacy name for the RSS facility. The canonical name is RSS.*

### Facility Architecture (40' High-Cube Container)

The RSS is housed in a 40ft modified High-Cube container for rural resilience — operates independently of public clouds.

**Zone Progression:**

| Zone | Function |
|------|---------|
| **Zone A: Logistics Hub** | Polaris Ranger-HD staging, Auger Trailers, Sled Hospital (re-pressurization + pressure-decay testing) |
| **Zone B: Inventory Staging** | 500-unit Ready-Rack, 24-hour GPS/Mesh burn-in benches |
| **Zone C: The Clean Vault** | Hermetically sealed server room, Mitsubishi Hyper-Heat HVAC (±1°F), HEPA filtration |

### Computational Infrastructure (Oracle Engine)

* **Hardware:** 96-Core AMD Threadripper Pro + 512GB ECC RAM.
* **Primary Function:** Bayesian Localized Regression Kriging (1m grid).
* **FHE:** Fully Homomorphic Encryption overhead management for secure long-term vaulting.
* **Storage:** 50TB Enterprise NVMe array (RAID-10).
* **XR Streaming:** Frustum-Aware Tile Streaming for Command & Control portal.

### Resilient Networking & Power

| Layer | Technology |
|-------|-----------|
| **Primary** | Fiber ONT (Symmetrical Gigabit) |
| **Secondary** | Starlink Business (High-Performance Dish) |
| **Tertiary** | 900MHz mesh peering with regional DHUs (Soft-Stop propagation) |
| **Solar** | 1.2kW Ground-Mounted at 55° "Snow Shed" tilt |
| **Storage** | 800Ah 48V Heated LiFePO4 bank |
| **Generator** | 5kW Honda EU7000iS (auto-start) |

### Hyper-Granular Project Costs (Subdistrict 1)

| Category | Component | Cost |
|---|---|---|
| **Security** | AI Perimeter + Verkada Fence | $15,000 |
| **O&M** | Y1 Ops Contingency | $20,500 |
| **Software** | Oracle Unified Compute License | $50,000 |
| **TOTAL** | **RSS Facility Total** | **$187,699** |

*Infrastructure Classification: Permanent Territory Cortex*
