# Master Specification: Smart Section Node (SSN) V1.0

**Role**: Span-Level Pressure & Volume Regulator | **Network Density**: 1 per Pivot Span (approx. 8-12 per Pivot)

The Smart Section Node (SSN) provides the "Coarse Tuning" of the irrigation prescription. It operates in two primary modes: as a standalone **Section-Level Grid Controller** (coarse resolution) or as a **Hydraulic Stabilizer** in tandem with Integrated Smart Nozzles (ISNs) for 1m precision.

## 1. Technical Architecture

- **SoC**: **ESP32-C6** (Matter/Thread/Wi-Fi/LoRa support). Higher compute for local hydraulic management.
- **Actuation**: Heavy-Duty Solenoid Driver for 2" - 3" Butterfly or Ball Valves.
- **Sensors**: Integrated **Ultrasonic Flow Meter** (Span-Level) + Pressure Transducer.
- **Power**: 24VAC Standard Pivot Power.

## 2. Operational Modes & Siphoning Logic

### 2.1 Standalone Mode (Section-Grid VRI)

In standalone mode, the SSN enables grid-based prescription watering at the span-level. While less granular than the 1m ISN grid, it allows for high-efficiency dynamic application across large soil management zones.

### 2.2 Hybrid Mode (Nozzle-Precision VRI)

When paired with ISNs, the SSN manages the span's bulk pressure and volume, preventing the "Water Hammer" effect during micro-dithering and ensuring that the ISN fleet always has optimal head-pressure for 1m-pixel precision.

### 2.3 Proportional Siphoning (Bypass Logic)

The SSN valve assembly is engineered as a **Siphoning Manifold**. It is designed to let full system pressure pass through the span's main bypass line for downstream sections while precisely "siphoning off" only the allotted volume required for its specific span nozzles. This prevents span-level throttling from starving the end-gun or outer sections.

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
