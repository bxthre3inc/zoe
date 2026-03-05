# Master Specification: Section Control Node (SCN) V1.0

**Role**: Tier 3 Nozzle-Level Actuator | **Target Unit Cost**: $18.00 (Monolithic)

The Section Control Node (SCN) is the high-density "Muscle" of the FarmSense VRI grid. Designed as a monolithic, IP69K-rated actuator, it integrates the wireless LoRa SoC directly into the solenoid valve body to achieve unprecedented cost-efficiency and reliability.

## 1. Monolithic Hardware Architecture

To achieve the $18.00 price point, the SCN eliminates all external cabling and separate enclosures.

- **Integrated Body**: Glass-reinforced nylon valve body with overmolded electronics cavity.
- **Embedded SoC**: **ASR6601** (LoRa + ARM M4) potted in thermally-conductive epoxy.
- **Wireless Interface**: Internal PCB antenna optimized for LoRa signal penetration near water-rich span pipes.
- **Power**: 24VAC parasitic harvest from the pivot power bus (rectified on-board).
- **Actuation**: Ultra-low-wattage DC Latching Solenoid (reduces thermal load and power draw).

## 2. Intelligence & Control

Despite its low cost, the SCN is a fully addressable mesh node.

- **PWM Precision**: 0–100% duty cycle control for variable volume application.
- **Dithering Support**: Responds to **Hydraulic Dithering Scheduler (HDS)** phase offsets to prevent water hammer.
- **Health Monitoring**: Reports solenoid coil continuity and "Click" confirmation (via inductive kickback sensing) to the PMT.
- **Addressing**: Supports individual Unicast (1m precision) and **Zone Multicast** (group behavior).

## 3. BOM Breakdown (Monolithic Scale)

| Category | Component Detail | Unit Cost |
| :--- | :--- | :--- |
| **Valve Body** | Glass-Reinforced Nylon (GRN) + Diaphragm | $4.50 |
| **Electronics** | ASR6601 PCBA + Rectifier + Ant | $5.50 |
| **Actuator** | DC Latching Solenoid Coil | $3.50 |
| **Seal/Potting** | Thermal Epoxy + Viton O-Rings | $2.50 |
| **Assembly** | Automated Ultrasonic Welding/Potting | $2.00 |
| **TOTAL** | **Target Unit Cost** | **$18.00** |

---
*Infrastructure Classification: Tier 3 VRI Actuator | Spec Version: V1.0 | Protocol: LoRa Mesh 2.1*
