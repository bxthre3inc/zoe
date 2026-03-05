# 01 FarmSense Executive Business Plan

## 1. The Operational Reality: Water as Liability

In regions like the San Luis Valley (Subdistrict 1), water is no longer just a farming input; it is a strictly legislated liability. Aquifer levels are crashing, and the state has enforced hard pumping caps. If a farmer exceeds their allocation, they face severe fines, and ultimately, court-ordered irrigation shut-offs.

Historically, irrigation was tracked linearly via a single meter at the wellhead, assuming uniform spread across a 160-acre quarter section. This is mathematically false. Evaporation from high winds, broken pivot nozzles, and slope run-off create massive spatial discrepancies.

**The FarmSense Solution**:
FarmSense provides a "Single-Field Deployment" (SFD) architecture. By weaving together subsurface telemetry (VFA/LRZ nodes), surface pivot tracking (PMT nodes), high-resolution aerial multispectral passes, and **baseline Soil Variability Maps**, we generate a continuous, 1-meter resolution **Digital Water Ledger**.

The hardware mesh provides absolute "Deep Truth" at specific pins, while the Soil Variability Maps (which chart soil texture, sand/clay ratios, and electrical conductivity zones) provide the underlying "Spatial Prior." The Oracle engine uses these soil maps to mathematically stretch the physical sensor data across the field, allowing us to generate 15,600 *virtual* sensors per quarter-section. This ledger provides empirical, cryptographically secure proof of exactly *where* and *how much* water was applied, saving farmers from punitive state action and protecting their multi-million dollar water rights portfolios.

## 2. The Revenue Model: The "Resolution Pop" SaaS Funnel

FarmSense operates a multi-tiered Software-as-a-Service (SaaS) model. Our core mechanism for revenue expansion is the "Resolution Pop"—a high-conversion behavioral trigger built directly into our User Interface.

* **Free Tier (50m Resolution)**: Utilizes low-res public satellite data. Free to farmers, serving as an onboarding magnet to capture acreage.
* **Basic Tier (20m Resolution)**: Initial processing of Sentinel-2 satellite data. Costs $15/acre.
* **Pro Tier (10m Resolution)**: Incorporates broad-acre drone flights and rudimentary subsurface data. Costs $22/acre.
* **Enterprise Tier (1m Resolution)**: The ultimate "Gold Truth." Requires the full deployment of the physical hardware mesh (VFA, LRZ, PMT). Costs $30/acre.

**The "Pop" Trigger**: When a Basic tier user attempts to zoom in on a suspected nozzle leak in the UI, they hit a resolution limit. The system momentarily generates a high-contrast, *blurred* preview of the 1m Enterprise grid, overlaid with: "High-Resolution Proof Available." By revealing hidden variability (e.g., localized nitrogen leaching) that the user is currently missing, we convert the fear of missing out (FOMO) into an immediate Enterprise-tier upgrade.

## 3. CapEx & Hard Financial Data (Subdistrict 1 Scale)

To achieve this absolute, 1m truth, FarmSense requires deploying physical hardware at scale. We have aggressively engineered our Bill of Materials (BOM) to survive 10 years in highly corrosive, alkaline soils, minimizing long-term Operational Expenditure (OpEx).

### 3.1 Representative Per-Node Hardware Costs (OEM Bulk Volume)

* **Vertical Field Anchor (VFA) [The Edge Gateway]:** ~$470 / unit
  * *Core Silicon*: Nordic nRF52840 (Compute/BLE Mesh) + Semtech SX1262 (LoRaWAN).
  * *Key Cost Drivers*: Polycase IP67 Housing ($42), 5-port Amphenol connector matrix ($120).
* **Lateral Root-Zone Scout (LRZ) [The Subsurface Sensor]:** ~$244 / unit (Deployed radially from VFA in a 10-node mesh layout).
  * *Core Silicon*: Nordic nRF52811.
  * *Key Cost Drivers*: Dual-Ring Capacitance/EC Probes, Tapered Viton-Sealed ABS stakes.
* **Pivot Motion Tracker (PMT) [The Surface Standardizer]:** ~$1,112 / unit
  * *Core Silicon*: Microchip ATSAMD51 (Compute) + u-blox ZED-F9P (RTK GNSS).
  * *Key Cost Drivers*: Badger Meter Ultrasonic Flow Pair ($648), ZED-F9P module ($140).

### 3.2 System Level Expansion (150,000 Acres)

Deploying to the full 150,000 acreage of Subdistrict 1 requires strategic hub infrastructure:

* **District Hubs (DHU):** $15,300 per 10-mile radius. (x25 required = $382,500). Features NVIDIA Jetson Nano edge-processing and dual Starlink/Cellular backhauls.
* **Regional Superstation (RSS):** $187,699. The core data repository. Features 64-Core AMD Threadripper PRO, dual RTX A6000 GPUs, and 50TB NVMe storage. Serves as the localized Oracle for generating Kriging maps and storing the Digital Ledger.
* **Aerial Fleet Mobilization:** $136,500 initial CapEx (4x AgEagle eBee + 7x DJI Mavic 3M). Monthly OpEx run-rate of ~$34,800.

## 4. The Economic Linchpin: The "Sled Hospital"

The most significant risk in standard Ag-Tech is field attrition—electronics dying due to water ingress or battery drain after 2-3 years. If FarmSense has to replace $470 VFA nodes every 3 years, the SaaS subscription margins are destroyed.

**Strategic Mitigation (SOP-09)**: FarmSense nodes are *not* potted in intractable resin. They utilize a distinct "Hardware Sled" that slots into the Viton-sealed housing.
At the end of every harvest window (November), the Regional Superstation acts as a **Sled Hospital**. Technicians retrieve the nodes, remove the internal electronic sleds, and subject them to an ultrasonic cleansing bath and a 15-minute digital pressure-decay seal test.

This circular "Sled Exchange" economy ensures that the high-value silicon (nRF52s, SAMD51s) is inspected, re-pressurized with Dry Nitrogen, and deployed fresh every Spring. This protocol forces the hardware into a 10-year survival curve, ensuring that the $30/acre Enterprise SaaS revenue is almost entirely high-margin profit by Year 3.
