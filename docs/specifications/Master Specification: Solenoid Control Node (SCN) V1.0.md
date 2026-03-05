# Master Specification: Integrated Smart Nozzle (ISN) V1.1

**Role**: Grid VRI Actuator | **Network Density**: 1 per Nozzle (approx. 125 per Pivot)

To achieve the **$18.00 target cost**, the ISN abandons the modular "Node + Valve" approach. Instead, it utilizes an **Integrated Monolithic Design** where the LoRa electronics are overmolded directly into the glass-reinforced nylon valve body.

## 1. Integrated Architecture

- **SoC**: **ASR6601** (LoRa SoC) potted in epoxy for 100% moisture isolation.
- **Valve Mechanics**: Low-friction **Diaphragm-Pilot** or **Pinch-Valve** assembly optimized for high-cycle PWM (Pulse Width Modulation).
- **Interface**: Single waterproof 2-wire pigtail for 24VAC power bus (power-over-cable).
- **Diagnostics**: Hall-effect feedback to verify the plunger physically moved (closed-loop actuation).
- **Hydraulic Safety (Dithering)**: The ISN local state machine enforces a "Soft-Pulse" delay (5-10ms) commanded by the PMT to prevent system-wide water hammer surges.

## 2. The $18.00 Path (OEM Scale: 160k Units)

Standard industrial valves are expensive because of low-volume distribution and universal fittings. The ISN hits its target through:

- **Integrated Housing**: The valve body *is* the enclosure.
- **ASR6601 Direct-on-Valve**: Eliminates separate PCBs, connectors, and mounting brackets.
- **Consolidated Supply Chain**: Direct-from-factory injection molding and PCBA assembly in a single facility.

| Category | Component Detail | Unit Cost |
| :--- | :--- | :--- |
| **Valve Body** | Glass-Reinforced Nylon (GRN) | $5.50 |
| **Electronics** | ASR6601 PCBA + Driver Stage | $4.50 |
| **Magnetics** | Solenoid Coil + Plunger | $4.00 |
| **Seals/Diaphragm**| Viton High-Cycle Membrane | $2.50 |
| **Assembly/Test** | Integrated potting & calibration | $1.50 |
| **TOTAL** | **Target Unit Hardware Cost** | **$18.00** |

---
*Infrastructure Classification: Grid-VRI Integrated Actuator*
*Spec Version: V1.1 | Protocol: LoRa Mesh 2.1*

---
*Infrastructure Classification: Zone VRI Actuator Tier*
*Spec Version: V1.0 | Protocol: LoRa Mesh 2.1*
