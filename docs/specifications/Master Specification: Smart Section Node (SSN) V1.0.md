# Master Specification: Smart Section Node (SSN) V1.0

**Role**: Span-Level Pressure & Volume Regulator | **Network Density**: 1 per Pivot Span (approx. 8-12 per Pivot)

The Smart Section Node (SSN) provides the "Coarse Tuning" of the irrigation prescription. By controlling the inlet flow to an entire pivot span, it balances the hydraulic pressure needed for downstream **Integrated Smart Nozzles (ISNs)**.

## 1. Technical Architecture

- **SoC**: **ESP32-C6** (Matter/Thread/Wi-Fi/LoRa support). Higher compute for local hydraulic management.
- **Actuation**: Heavy-Duty Solenoid Driver for 2" - 3" Butterfly or Ball Valves.
- **Sensors**: Integrated **Ultrasonic Flow Meter** (Span-Level) + Pressure Transducer.
- **Power**: 24VAC Standard Pivot Power.

## 2. Tiered VRI Logic

The SSN acts as a "Local Conductor" for the span:

- **Bulk Regulation**: Opens/Closes to set the span's baseline application rate (e.g., 80% span flow).
- **ISN Synchronization**: Communicates with the 12-15 ISNs on its span to ensure total hydraulic load does not exceed pipe ratings.

## 3. Cost Breakdown (Target: $115.00)

| Category | Component Detail | Unit Cost |
| :--- | :--- | :--- |
| **Housing** | NEMA 4X Ruggedized Enclosure | $12.00 |
| **PCBA** | ESP32-C6 + High-Power Driver | $18.00 |
| **Valve** | 2" Low-Cost Butterfly Valve | $45.00 |
| **Sensing** | Ultrasonic Transducer Pair | $25.00 |
| **Mounting** | Structural Span Clamps | $15.00 |
| **TOTAL** | **Target Unit Hardware Cost** | **$115.00** |

---
*Infrastructure Classification: Section-VRI Actuator Tier*
*Spec Version: V1.0 | Protocol: LoRa Mesh 2.1 / Thread*
