# Master Specification: District Hub (DHU) V1.1

**Role**: District Director & Edge Coordinator | **Tier**: Layer 2 (Regional Mesh Manager) | **Radius**: 5km (Overlapping Redundancy)

The District Hub (DHU) operates as the primary "Director" and traffic coordinator of the FarmSense network. Positioned atop high-elevation structures across Subdistrict 1, the DHU provides the high-bandwidth backhaul connectivity, localized edge processing, and multi-node mesh coordination required to keep the "Digital Water Ledger" synchronized across thousands of acres. While the VFA acts as the field-level truth, the DHU is the central nervous system node that bridges the gap between raw field data and the high-performance computing clusters at the Regional Superstation (RSS). By utilizing an **NVIDIA Jetson Nano** at the edge, the DHU provides the localized GPU-accelerated compute required for mid-tier spatial probability grids (10m and 20m) across the entire district mesh.

**Network Topology & High-Availability Backhaul**: Each DHU covers a **5km radius zone**, strategically overlapped with adjacent hubs to provide **high-availability redundancy**. This topology ensures that if one hub fails, at least 80% of its managed VFAs can failover to a neighboring hub's sector radios. To ensure 99.9% data availability, the DHU employs a "Fiber-First" Backhaul Mandate: in any location where fiber internet can be installed within a cost-effective trenching or aerial distance, it must be utilized as the primary uplink. For sites beyond the fiber footprint, or as a critical failover for fiber-connected sites, the DHU utilizes a Pay-As-You-Go IoT Cellular (LTE-M/NB-IoT) or Satellite (Starlink) array. This ensures that even during regional fiber cuts or severe weather events, the critical water accounting data remains synchronized.

## 1. Enclosure Engineering & Siting Dynamics

The DHU is engineered for a 40-year structural lifespan, utilizing utility-grade standards to ensure signal integrity across the San Luis Valley’s intense thermal and wind gradients.

* **The Enclosure (The Oversized Thermal Buffer)**: A NEMA 4X Rated Oversized Polycarbonate Enclosure (24"x20"x10") from Polycase.
* **RF-Transparency**: Polycarbonate is mandated over steel to allow internal diagnostic radios, GPS modules, and high-gain BLE antennas to maintain locks through the housing, significantly reducing the external cable entry points where moisture or lightning could strike.
* **Thermal Mass Management**: The oversized volume is a strategic requirement. It provides a massive internal air-gap for the 200Ah battery system, acting as a passive thermal buffer against the high-altitude solar radiation (7,600ft+) of the SLV. This prevents "battery cooking" during the peak of summer while providing enough interior space for active heating elements during the winter.
* **Siting & Vertical Infrastructure**: To clear the 60% Fresnel zone over a 10km span and avoid signal attenuation from mature 10ft potato/barley canopies, DHUs are mounted at a minimum of 30ft Above Ground Level (AGL).

### Infrastructure Tiers

1. **Grain Silos & Water Towers**: The preferred mounting points due to their extreme stability and pre-existing height.
2. **35ft Class 4 Timber Poles**: Set 6ft-8ft deep and backfilled with crushed rock. These are utility-standard assets selected for their 40-year lifespan and inherent resistance to "wind-shimmer" (vibration that can break radio locks).
3. **Guyed Steel Towers (Rohn 25G)**: Utilized specifically for remote ridgeline bluffs to extend the "Umbrella" coverage to peripheral fields.

## 2. Compute Architecture & The "Black Box" Ledger

The DHU performs heavy "Data Decimation" at the edge to reduce monthly backhaul costs while maintaining a high-fidelity local record for legal auditing.

* **Edge Processing Engine**: Utilizes an **NVIDIA Jetson Nano Developer Kit** (or custom carrier equivalent) featuring a 128-core Maxwell GPU and Quad-core ARM A57 CPU.
* **Operational Reliability & Mesh Consensus**: Enforces PBFT (Practical Byzantine Fault Tolerance) consensus by aggregating Schnorr multi-signatures from up to 1,280 VFA nodes. This ensures the "Digital Water Ledger" remains immutable against local tampering or spoofed sensor packets.
* **Localized Kriging (10m & 20m)**: The DHU executes localized Bayesian math worksheets provided by the **RSS Oracle Compute** specifically for the 10-meter and 20-meter resolution tiers. Using **static Soil Variability Maps** loaded into the edge cache, the DHU Kriging engine provides instantaneous "Reflex Logic" decisions (e.g., stopping a pump if a pivot stalls in an area of porous sandy soil) without waiting for a cloud round-trip, which is vital during cellular latency spikes.
* **The 30-Day "Black Box" Cache**: Equipped with a 128GB Swissbit PSLC Industrial SSD. Unlike consumer-grade storage, the Swissbit PSLC (Pseudo-Single Level Cell) drive is selected for extreme write-endurance and data retention in sub-zero temperatures.
* **Data Integrity**: It maintains a localized master ledger of all regional water transactions. If both the fiber and cellular backhauls fail, the DHU continues to record every "Audit Packet," ensuring that the farmer's water conservation credits are never lost or questioned in Water Court.
* **Atmospheric Management**: Includes dual passive Gore-Tex vents for pressure equalization. During rapid alpine storm fronts, the internal pressure must equalize to prevent the enclosure gaskets from "breathing" and sucking in the fine, abrasive alkali dust that can degrade the cooling fins.

## 3. Edge OS & Software Stack

The DHU maintains a mission-critical, containerized environment to support localized intelligence and regional coordination.

* **Base Layer**: NVIDIA JetPack 4.6.1 with specialized Maxwell GPU drivers for FP16-accelerated Kriging against the cached Soil Variability Maps.
* **Service Architecture**: Containerized via **Docker**, allowing individual upgrades to the Kriging engine or radio drivers without compromising the core OS.
* **Firmware Reliability**: Implements a dual-partition (A/B) boot strategy. If an Over-the-Air (OTA) update fails or a kernel-panic is detected, the hub automatically rolls back to the previous stable state within 45 seconds.
* **Watchdog Sentry**: A physical hardware watchdog monitors the `fs-mesh-coordinator` health. If the internal mesh heartbeats stall, the system executes a full power-cycle of the Jetson module.

## 4. Triple-Sector Radio Spine & Resilient Power

To provide 360-degree high-bandwidth coverage across the basin, the DHU utilizes a specialized carrier-grade radio stack.

* **Sector Radio Array & LoRaWAN Gateway**: Three (3) Ubiquiti LTU Sector Antennas (120°). This configuration allows the hub to handle high-bandwidth 5GHz connections while mitigating multipath interference caused by heat-shimmer and the massive metallic surfaces of center-pivot spans. Additionally, the DHU incorporates an Enterprise-Grade 900MHz LoRaWAN Gateway to receive secure payloads directly from the Vertical Field Anchors (VFAs).

### Redundant Backhaul Spine

* **Primary**: Fiber ONT (G-PON) where cost-effective. Fiber eliminates the "RF-Noise" issues common in high-interference pump houses.
* **Secondary/Failover**: Telit ME910G1 LTE-M Modem. Configured for "Pay-As-You-Go" IoT data, this modem only consumes data during fiber outages, keeping operational costs low while ensuring absolute connectivity.

### Resilient Power (7-Day Rating)

* **Solar**: 200W High-Tilt Rigid Mono-Solar Array designed to shed snow in under 2 hours.
* **Battery**: Battle Born 200Ah Heated LiFePO4 Bank. Internal heating elements ensure the cells stay at +5°C even during −30°F "Polar Vortex" events. The system uses a "Solar First" charging priority to warm the battery before accepting charge current, preserving the 10-year battery life.
* **Wind-Shimmer & Polar Vortex Recovery**: The 35ft Class 4 timber poles are stayed to eliminate oscillations <20Hz, ensuring the 5GHz radio spine never drops. In extreme -20°F blizzards, a hardcoded "Polar Vortex" subroutine shuts down non-essential LTE sectors to prioritize battery warming and core LoRa mesh routing.
* **Lightning Defense**: Positioned at 35ft, DHUs are prime targets. Inclusion of L-com GDT (Gas Discharge Tube) Lightning Arrestors is non-negotiable for every antenna line.

## 5. Hyper-Granular DHU CapEx & Procurement (25-Unit Fleet)

This ledger reflects the civil engineering and hardware costs for the 25-hub "Umbrella" required to cover Subdistrict 1.

| Category | Component Description | MPN / Supplier | Lead Time | Unit Cost |
| :--- | :--- | :--- | :--- | :--- |
| **Computing** | NVIDIA Jetson Nano Dev Kit | NVIDIA-Nano-4GB | 4 Weeks | $149.00 |
| **Storage** | 128GB PSLC SSD | Swissbit-X-75 | 2 Weeks | $185.00 |
| **Radio** | 120° 5GHz Sector (x3) | Ubiquiti-UISP | 4 Weeks | $850.00 |
| **Backhaul A** | Fiber ONT (Primary) | Local ISP | 6 Weeks | $350.00 |
| **Backhaul B** | IoT LTE-M/NB-IoT (Backup) | Telit-ME910G1 | 4 Weeks | $115.00 |
| **Housing** | NEMA 4X Polycarbonate Box | Polycase-ML | 3 Weeks | $180.00 |
| **Power** | 200W Mono-Solar Array | Renogy-200W | 2 Weeks | $340.00 |
| **Power** | 200Ah Heated LiFePO4 Bank | BattleBorn-200Ah | 6 Weeks | $850.00 |
| **Tower** | 35ft Class 4 Timber Pole | Local Utility | 3 Weeks | $1,500.00 |
| **Protection**| Lightning Arrestor/Surge | L-com-GDT | 2 Weeks | $125.00 |
| **TOTAL** | **Per Unit Hardware Cost** | | | **$4,644.00** |

**Subdistrict 1 Infrastructure Totals (25 Hubs)**:

* Hardware Subtotal: $116,100
* Fiber Trenching/Drop Allowance: $25,000
* Site Foundation & Concrete: $12,500
* Labor (Vertical Blitz): $18,375
* **DHU PROJECT TOTAL: $171,975**

## 6. Strategic Value & "Resolution Pop" Support

The DHU is the final staging area for the Enterprise (1m) Resolution Tier.

* **The Resolution Engine**: By aggregating the high-fidelity GNSS and flow data from the PMT with the subsurface pings from the LRZ mesh, the DHU facilitates the "Resolution Pop" in the farmer’s UI.
* **The Sales Funnel**: If a user on a lower tier attempts to view 1m granular data, the DHU triggers the blurred preview funnel. This proves the value of the Enterprise subscription by demonstrating the DHU's ability to sync data in real-time, even during regional internet outages. Furthermore, the DHU provides the high-fidelity spatial data stream required for the **Command & Control (C&C)** XR deployment tools used by field technicians.
