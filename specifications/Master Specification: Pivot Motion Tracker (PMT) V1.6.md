# Master Specification: Pivot Motion Tracker (PMT) V1.6

**Role**: Field Hub (DHU Uplink) & Hydraulic Auditor | **Network Density**: 1 per Pivot (Subdistrict 1 Deployment)

The Pivot Motion Tracker (PMT) serves as the high-fidelity "Nervous System" and the primary "Hydraulic Auditor" of the FarmSense SFD (Single Field Deployment) architecture. Positioned externally on the main span of a center-pivot irrigation machine, it provides the essential kinematic and hydraulic flow data required to verify exactly where, when, and how much water is applied to the land. While the LRZ (Lateral Root-Zone) scouts monitor the soil's response to water, the PMT provides the certified proof of application, completing the data loop for the **Oracle Unified Compute** and establishing the legal foundation for the "Digital Water Ledger."

**Subdistrict 1 Economics & Strategic Procurement**: This version of the specification reflects the optimized procurement strategy for the 1,280-unit deployment in Subdistrict 1. At this scale, FarmSense leverages high-volume industrial discounts from established, reliable suppliers (such as Polycase, SparkFun, and Badger Meter) rather than attempting full custom silicon integration at this stage. This ensures immediate field reliability, insurance-backed liability protection, and professional-grade accuracy for Water Court auditing.

## 1. Structural Housing & "Cut-Less" Mounting Logistics

Because the PMT is an above-ground asset mounted directly to massive moving steel machinery, it faces extreme environmental stressors: intense high-altitude UV, 100mph alpine wind gusts, and continuous sand-blasting from alkali dust.

* **The Enclosure (RF-Transparent Architecture)**: Housed in an IP67 UV-Stabilized Polycarbonate Box (8"x6"x4") from Polycase.
* **Material Logic**: Polycarbonate provides superior impact resistance, ensuring the unit survives accidental strikes from low-hanging branches or pivot hardware. It is also inherently RF-transparent, allowing the internal high-precision GNSS and BLE antennas to maintain high-gain locks without the need for fragile externalized "puck" antennas that are prone to being sheared off during operation.
* **Environmental Defense**: The enclosure features a dual-stage Gore-Tex breather vent. During rapid alpine temperature drops (e.g., a 40°F drop during a sudden storm), this prevents the box from creating an internal vacuum that would suck in moisture-laden outside air through the gaskets, causing catastrophic condensation on the logic boards.
* **"Cut-Less" Mounting (Zero-Impact Integration)**: Attached to the main galvanized pivot span (typically 6.625" or 8.625" OD) using heavy-duty 304 Stainless Steel "Band-It" straps combined with a Neoprene Friction Pad.
* **Structural Integrity**: This non-invasive mount requires zero drilling, welding, or tapping into the pivot's span, preserving the manufacturer's structural warranty and preventing point-source corrosion. The Neoprene pad acts as a critical vibration dampener, isolating the sensitive IMU and GNSS electronics from the rhythmic mechanical "clanking" of the pivot's electric drive motors and gearboxes.

## 2. Kinematic Positioning & Structural Audit Stack

The PMT moves beyond simple GPS tracking to professional-grade kinematic auditing, differentiating mathematically between "Walking" (motion without water) and "Pumping."

* **The 1m "Resolution Pop"**: This precision data is the empirical backbone of the FarmSense UI. By correlating the PMT's RTK-grade location with subsurface VFA/LRZ proximity chirps, the **Oracle Compute Layer** "Pins" the static nodes to a sub-meter coordinate grid without requiring on-board GNSS for every sensor. If a Basic Tier (20m) user attempts to zoom in, the PMT's underlying high-fidelity data triggers the "Resolution Pop," initiating a pricing funnel for the Enterprise upgrade.
* **9-Axis IMU (The "Crabbing" & Structural Sentry)**: A Bosch BNO055 Inertial Measurement Unit continuously monitors vibration harmonics and 3D orientation.
* **Diagnostic Intelligence**: It detects "Crabbing"—a dangerous condition where a tower's drive motor slips or stalls in deep mud, causing the massive steel span to bow and drift out of alignment. If crabbing or abnormal vibration is detected, the PMT alerts the Hub, which can immediately command the PFA (Pressure & Flow Anchor) to execute a "Soft-Stop" of the well pump, preventing catastrophic, $80,000+ structural collapses.

## 3. Non-Invasive Hydraulic Flow Stack (The Audit Engine)

The hydraulic flow stack is the primary engine for water rights verification and state-level regulatory compliance.

* **Ultrasonic Transit-Time Transducers**: Utilizes a Badger Meter TFX-5000 clamp-on transducer pair.
* **Physics of Flow**: These sensors utilize "Transit-Time" logic, measuring the nanosecond difference between ultrasonic pulses traveling upstream vs. downstream. This difference is directly proportional to the water's flow velocity.
* **The "Cut-Less" Advantage**: Because these clamp to the outside of the 8" main pipe, they require zero pipe cutting or downtime. Most importantly, they ensure zero pressure drop in the hydraulic system. Unlike invasive paddle-wheel meters that create drag, this non-invasive approach preserves the energy efficiency of the well pump, saving the farmer thousands in seasonal energy costs.
* **Legal Certification**: The system provides ±1.0% flow accuracy, meeting the "Gold Standard" required for verified water use reporting to the State Engineer and securing long-term water rights through empirical proof.

## 4. Edge Processing & Winter Hibernation Logic

* **Cortex-M4 Processing Sled**: Features an ATSAMD51 processing sled (sourced via Digi-Key). It buffers 1-second interval flow data and GNSS coordinates, applying a localized Kalman Filter to the IMU data to smooth out the intense vibration noise of the pivot spans.
* **Comms (The Field Hub)**: Features a dual-radio stack. Transmits and receives via a High-Gain 900MHz FHSS antenna to act as the primary "listening post" for the field's LRZ & VFA mesh. It then intercepts this data, bundles it with its own 2.4GHz/BLE hydraulic payload, and blasts the entire field's encrypted payload via a 900MHz LoRaWAN transceiver to the District Hub (DHU).

### Empirical Bayesian Kriging (Edge-EBK) & VRI Failover Operations

The PMT acts as an **Autonomous Compute Engine** continuously. Utilizing the ATSAMD51's 120MHz hardware Floating-Point Unit (FPU), the PMT intercepts the mesh data points and calculates a 50m-resolution spatial probability grid (a 16x16 matrix across the 160-acre quarter section) regardless of DHU connectivity. This native processing enables the 20m and 10m grids to be processed at the DHU, and the highly complex 1m grids to be processed downstream at the RSS or Cloud levels.

**Dynamic Update Frequency (The "Fisherman's Attention" Scale)**:

1. **Dormant Baseline (4-Hour Sweeps)**: When the weather is stable, soil moisture is high, and the pivot is parked, the PMT "relaxes," calculating the 16x16 field matrix only once every 4 hours.
2. **Anticipatory Watch (1-Hour Sweeps)**: If the PMT knows active evaporation factors are rising, it pays closer attention, increasing the grid calculation to every 60 minutes.
3. **Active Anomaly Tracking (15-Minute Sweeps)**: The moment the PMT gets a "nibble"—detecting the first sign of a rapid statistical trend—it scales updates to 15 minutes. This triggers a **"Focus Ripple,"** commanding peer nodes to increase reporting frequency.
4. **Significant Event (5-Second Sweeps)**: When a critical threshold is breached or water is moving, the PMT triggers a **"Focus Collapse,"** ignoring dormant parts of the field to concentrate computational power on the path of the active event. During the "Blitz" deployment phase, the PMT enters **Command & Control (C&C) Deployment Mode**, providing live RTK-anchored XR overlays to field technicians for sub-meter "Pinning" of VFAs and LRZs.

* **Failover Logic**: Because the PMT is already maintaining this dynamic 50m grid natively, if the DHU uplink drops, it seamlessly executes autonomous Variable Rate Irrigation (VRI) speed commands.
* **Data Buffering**: During an outage, the PMT logs payloads to its onboard SPI Flash, burst-transmitting the backlog once the DHU connection is restored.
* **Winter Hibernation & "Warm Start"**: Powered by an integrated 10W Solar Lid + LiFePO4 Buffer from Renogy. Includes a Saft LS14500 LiSOCl2 5yr Hibernation Pack to keep the GNSS Real-Time Clock alive all winter, ensuring a "Warm Start" in under 5 seconds in the spring.

## 5. Hyper-Granular BOM & Subdistrict 1 Project Costs (1,280 Units)

This ledger deconstructs the hardware costs for the initial 1,280-unit rollout.

| Category | Component Description | Supplier Part # | Unit Cost | Ext. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Housing | IP67 UV-Polycarbonate Puck | Polycase WP-21F | $45.00 | $45.00 |
| Mounting | 304-SS Band-It Straps (x2) | McMaster 5530K34 | $12.50 | $12.50 |
| Mounting | Neoprene Friction Pad | McMaster 8637K32 | $5.50 | $5.50 |
| Computing | Cortex-M4 Processing Sled | Digi-Key ATSAMD51 | $65.00 | $65.00 |
| Position | u-blox ZED-F9P RTK GNSS | SparkFun GPS-15136 | $140.00 | $140.00 |
| Position | 9-Axis IMU (Vibration/Tilt) | Bosch BNO055 | $32.00 | $32.00 |
| Hydraulic | Ultrasonic Transit-Time Pair | Badger Meter TFX-5000 | $648.00 | $648.00 |
| Power | 10W Solar Lid + LiFePO4 | Renogy Cust-10W | $95.00 | $95.00 |
| Power | LiSOCl2 5yr Hibernation Pack | Saft LS14500 | $25.00 | $25.00 |
| Fasteners | SS M4 Security Screws (x4) | McMaster Security-M4 | $2.00 | $2.00 |
| Radio | High-Gain BLE Whip Antenna | Linx ANT-BLE | $30.00 | $30.00 |
| Radio | 900MHz LoRaWAN Transceiver | Semtech SX1262 | $12.00 | $12.00 |
| **TOTAL** | **Per Unit Hardware Cost** | | **$1,112.00** | |

**Total Subdistrict 1 Project Financials (1,280 Units)**:

* Hardware Subtotal: $1,423,360
* Calibration & Field Audit: $57,440
* Labor (Installation): $100,000
* **TOTAL PROJECT COST: $1,580,800**

## 6. Strategic Value & Legal Defensibility

By deploying the PMT at this scale, FarmSense moves the needle from "estimated water use" to "audited water reality."

* **Water Court Integrity**: In the event of an aquifer depletion dispute, the PMT's unbroken, ±1.0% accurate log serves as the absolute "Gold Standard" of evidence, proving that every gallon was applied exactly where the **Oracle Compute Layer** calculated it was needed.
