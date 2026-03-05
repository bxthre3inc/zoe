# Lateral Root-Zone Scout (LRZ) Hardware & Firmware Hyper-Specification

## 1. Physical Architecture & Material Science

The LRZ is a 24-inch kinetic penetrator designed for autonomous horizontal soil variability mapping.

### 1.1 Mechanical Design

- **Housing:** IP68/IP69K Polycarbonate/PBT blend (UV-shielded with PVDF).
- **Geometry:** 15-degree parabolic tapered tip for zero-air-gap soil coupling.
- **Sealant:** Viton (FKM) dual-redundant O-rings for high-alkali soil resilience.
- **Weight:** 750g (weighted tip for high-momentum insertion).

### 1.2 Bill of Materials (Granular)

| Part Class | Model/Manufacturer | Qty | Role |
| :--- | :--- | :--- | :--- |
| **Main MCU** | Nordic nRF52840 (QIAA-F0) | 1 | SoC / Bluetooth 5 / FHSS |
| **Power Cell** | Saft LS14500 (Li-SOCl2) | 1 | 5-year Primary Energy Source |
| **HPC** | Saft 1520 Hybrid Pulse Cap | 1 | Buffers 150mA RF Bursts |
| **Antenna** | Custom 1/2 Wave Dipole | 1 | 3-foot internal wire element |
| **Sensing** | 50mm Dielectric Ring | 1 | Non-contact Soil Tension |

## 2. Firmware Implementation (v2.4.1)

### 2.1 Boot & Initialization

1. **Cold Start:** 750ms wake-up from deep sleep via RTC interrupt.
2. **BIST (Built-In Self Test):** Verifies capacitor charge and antenna VSWR.
3. **Sensor Read:** 10-point mean of raw ADC soil tension + canopy ambient temp.

### 2.2 The "Dumb Chirp" Protocol (LPI/LPD)

- **Modulation:** GFSK (Gaussian Frequency Shift Keying).
- **Hopping:** 128-bit pseudo-random seed synced to PMT epoch.
- **Packet Structure:**
  - `[4B Preamble] | [8B NodeID] | [2B Tension] | [2B Temp] | [16B AES-MAC] | [4B CRC]`
- **Encryption:** Hardware-accelerated AES-128 in CCM mode.

### 2.3 Power Managed Duty Cycle

- **Sleep:** 0.8µA (RTC active).
- **Ingest:** 4.5mA (50ms window).
- **Chirp:** 14mA @ +8dBm (12ms window).
- **Life Expectancy:** 36,400 cycles (approx 5.2 years at 4-hour intervals).

### 2.4 "Ripple" Mode Logic

The LRZ passively monitors for a "Sub-Beacon" from the PMT. If detected:

- **Action:** Transition from 4-hour to 15-minute sampling.
- **Duration:** 12 hours or until "Stable" beacon received.
- **Objective:** Map propagating anomaly epicenters in real-time.

---
*Infrastructure Classification: Permanent Ground-Truth Asset*
