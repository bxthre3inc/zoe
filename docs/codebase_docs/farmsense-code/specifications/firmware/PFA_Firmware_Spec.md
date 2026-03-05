# Pressure & Flow Anchor (PFA) Master Specification V2.0

## 1. Role & Strategic Mandate

The Pressure & Flow Anchor (PFA) is the "Sentry of the Source," serving as the primary hardware interface for monitoring groundwater extraction and ensuring the mechanical safety of pumping infrastructure. It provides the forensic ground truth for the **Digital Water Ledger**.

## 2. Structural & Environmental Engineering

### 2.1 Enclosure (The Faraday Shield)

- **Housing**: Hoffman NEMA 4X Ruggedized Polycarbonate (NEMA 4X / IP68).
- **EMI Defense**: Internal conductive coating creates a "Faraday Cage" effect to protect analog-to-digital (ADC) conversions from VFD (Variable Frequency Drive) switching noise.
- **Breather System**: Dual-stage Gore-Tex vents prevent vacuum-suction of alkali dust during -40°F thermal cycles.

### 2.2 Sled Hospital Maintenance

- Sleds are extracted seasonally, cleaned, and re-pressurized to +5 psi with Dry Nitrogen.
- Pressure-decay testing (15-min cycle) ensures Viton (FKM) seal integrity.

## 3. Sensing & Actuation Matrix

### 3.1 Non-Invasive Extraction Audit

- **Ultrasonic Flow**: Badger Meter TFX-5000 transit-time transducers (±1.0% accuracy).
- **"Cut-Less" Logic**: Clamp-on transducers maintain pump warranties and eliminate pressure drag.

### 3.2 Predictive Motor Sentry (CHA)

- **CT Clamps**: 3x 400A Split-Core (Magnelab SCT-1250) monitoring Phase-A/B/C.
- **FFT Logic**: NXP i.MX RT1060 (600MHz Cortex-M7) executing 1,024-point FFTs.
- **Failure Detection**: Detects cavitation sidebands, torque ripple, and bearing harmonics before catastrophic failure.

### 3.3 Hydro-Legal Sensing

- **Well Depth**: Vented 316-SS Pressure Transducer (Dwyer PBLTX).
- **Vented Compensator**: Atmospheric tube ensures readings are purely hydrostatic, independent of barometric shifts.

## 4. Firmware & Control (Reflex Logic)

### 4.1 "Soft-Stop" Actuation

- **Actuator**: 30A Industrial Dry-Contact Relay (Omron).
- **Reflex Rules**:
  - `IF (PMT_STALL == TRUE) THEN ACTUATE_STOP`
  - `IF (BURST_MAINLINE == TRUE) THEN ACTUATE_STOP`
  - `IF (SATURATION_ALERT == TRUE) THEN ACTUATE_STOP`

### 4.2 Blackout Buffer

- **Energy Pool**: 40,000mAh Dual-Pack LiFePO4 battery.
- **Survivability**: 7-day continuous logging during total grid failure (critical for recording static aquifer recovery).

## 5. Bill of Materials (Subdistrict 1 Bulk)

| Part | Manufacturer/Detail | Unit Cost | Ext |
| :--- | :--- | :--- | :--- |
| **Housing** | Hoffman NEMA 4X + Conductive Coat | $55.00 | $55 |
| **MCU** | NXP i.MX RT1060 Sled | $95.00 | $95 |
| **Clamps** | Magnelab SCT-1250 (x3) | $110.00 | $110 |
| **Transducer**| Dwyer Vented (SS-316) | $185.00 | $185 |
| **Tubing** | Vented PVC (300ft) | $45.00 | $45 |
| **Pressure** | TE Conn 200 PSI SS | $70.00 | $70 |
| **Power** | 40Ah LiFePO4 + UPS + Heater | $115.00 | $115 |
| **Relay** | Omron 30A Industrial | $45.00 | $45 |
| **Labor** | 4hr Licensed Journeyman Install | $175.00 | $175 |
| **TOTAL** | **PFA INFRASTRUCTURE COST** | | **$895.00** |

---
*Infrastructure Classification: Permanent Forensic Water Asset*
