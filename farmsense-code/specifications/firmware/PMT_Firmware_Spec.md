# Pivot Motion Tracker (PMT) Hardware & Firmware Hyper-Specification

## 1. Field Hub Architecture

The PMT is the primary edge computer for the field, mounted 15ft AGL on the pivot span.

### 1.1 Core Processing Cluster

- **Main MCU:** Microchip ATSAMD51J20A-AF (ARM Cortex-M4F @ 120MHz).
- **SRAM:** 256KB for real-time Edge-EBK matrix calculations.
- **Flash:** 1MB internal + 16MB QSPI external for 72-hour telemetry buffering.

### 1.2 Precision Positioning (RTK-GNSS)

- **SoC:** u-blox ZED-F9P Multi-band RTK.
- **Precision:** <2cm with RTK correction (backhauled from DHU).
- **IMU:** Bosch BNO055 9-Axis Absolute Orientation Sensor.
  - **Logic:** Identifies "Strut Fatigue" via vibration harmonics and "Hydraulic Hammer" via solenoid impact profiles.

## 2. Connectivity & Mesh Coordination

### 2.1 The "Umbrella" Receiver (2.4GHz)

- **Role:** Aggregator for 100+ LRZ/VFA/PFA nodes per field.
- **Topology:** Star-mesh (LRZ chirps vertically).
- **Radio:** Nordic nRF52840 acting as a dedicated 2.4GHz sink.

### 2.2 Regional Backhaul (Dual-Mode)

- **Primary:** Private 5GHz LTU (Ubiquiti Rocket compatible) to District Hub (DHU).
- **Secondary:** LTE-M / NB-IoT carrier failover.
- **Payload:** 187-byte AES-256 field state vector.

## 3. Edge Intelligence (Edge-EBK Engine)

### 3.1 50m Spatial Fidelity Grid

The ATSAMD51 executes a simplified **Empirical Bayesian Kriging (EBK)** model locally.

- **Windowing:** 4-hour baseline.
- **Focus Collapse:** If IMU/GNSS detects movement (Pivot Active), the engine collapses sampling to a 5-second "Ripple" window.
- **Failover:** In the event of DHU uplink loss, the PMT executes the VRI speed-map worksheet internally using cached priors.

## 4. Bill of Materials (Granular)

| Part Class | Model/Manufacturer | Qty | Role |
| :--- | :--- | :--- | :--- |
| **Main SoC** | Microchip ATSAMD51 | 1 | Core Logic |
| **GNSS SoC** | u-blox ZED-F9P | 1 | RTK Positioning |
| **IMU** | Bosch BNO055 | 1 | Kinematics |
| **Mesh Radio** | Nordic nRF52840 | 1 | Sensor Sink |
| **Backhaul** | LTE-M Bridge | 1 | Fallback |
| **Storage** | 16MB QSPI Flash | 1 | Black-Box Cache |
| **Unit Cost** | **$1,112.00** | | |

---
*Infrastructure Classification: Permanent Command & Control Asset*
