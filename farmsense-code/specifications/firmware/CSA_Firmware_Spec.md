# Corner-Swing Auditor (CSA) Hardware & Firmware Hyper-Specification

## 1. Dual-Node Architecture

The CSA resolves the non-linear kinematics of a folding center-pivot swing-arm using a distributed dual-node configuration.

### 1.1 Hardware Distribution

- **Master Node (PST):** Primary Span Tracker mounted on the fixed outer span.
- **Slave Node (SAT):** Swing-Arm Tracker mounted on the articulating corner-swing span.
- **Backhaul:** Private 2.4GHz GFSK peer link between SAT and PST (latency <50ms).

### 1.2 Material Science & Mounting

- **SAT Mounting:** High-vibration Neoprene dampers to mitigate the chaotic harmonics of the end-gun actuation.
- **Armor:** SS-304 "Goose-Neck" conduits for the SAT cabling to ensure hydraulic spray resistance.

## 2. Kinematic Estimation Engine (Firmware v4.1.0)

### 2.1 Geometric Triangulation

The PST executes a real-time Law of Cosines resolver to determine the swing-arm angle (θ):

- **C1 (PST):** Absolute RTK coordinate of the main span.
- **C2 (SAT):** Absolute RTK coordinate of the swing-arm.
- **R1 (Pivot Center):** Fixed coordinate of the pivot center.
- **Logic:** `θ = arccos((d1²+d2²-d3²)/(2*d1*d2))` where `d3` is the variable chord length between trackers.

### 2.2 The "Wiper Effect" Resolution

- **Linear Velocity Scaling:** As the arm extends, the arc-length per degree increases. The CSA firmware applies a dynamic scale factor to the PFA flow readings to calculate real-time Gallons per Acre applied at the 1m field edge.
- **End-gun Pulse Monitoring:** The SAT IMU utilizes a Bosch BNO055 tap-detection algorithm to verify "Water-On" state of the hydraulic end-gun, auditing extraction vs. spatial application.

## 3. Communication & Failover

### 3.1 SAT-to-PST Synch

- **Period:** 10Hz sync window.
- **Packet:** `[RTK-Lon] | [RTK-Lat] | [IMU-Yaw] | [Gun-Status] | [Checksum]`.
- **Latency:** Fixed 24ms buffer to ensure timestamp-aligned geostatistical fusion.

### 3.2 ZVRI Decision Loop

The PST incorporates the swing-arm θ into the local 50m EBK grid calculation:

- **Rule:** If `θ > 120°` (extended), the speed-map worksheet automatically boosts pivot transit speed by `X.YZ%` to normalize the volumetric application across the increased spatial radius.

## 4. Bill of Materials (Granular Dual-Node)

| Part Class | Model/Manufacturer | Qty | Role |
| :--- | :--- | :--- | :--- |
| **PST Hub** | PMT Hardware (ATSAMD51) | 1 | Master Kinematic Resolver |
| **SAT Node** | PMT Hardware (ATSAMD51) | 1 | Swing-Arm Tracker |
| **Link Radio** | Nordic nRF52840 | 1 | Inter-Node Backhaul |
| **GNSS Array** | u-blox ZED-F9P | 2 | Differential Positioning |
| **Unit Cost** | **$2,514.88** | | (Includes mounting/labor) |

---
*Infrastructure Classification: Permanent Forensic Kinematic Asset*
