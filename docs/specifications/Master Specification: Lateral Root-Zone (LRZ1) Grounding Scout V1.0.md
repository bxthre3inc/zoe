# Master Specification: Lateral Root-Zone (LRZ1) Grounding Scout V1.0

**Role**: Level 1 "Grounding" Node | **Network Density**: 12 units per 140-160 acre Field (Radial Stratification)

The Lateral Root-Zone 1 (LRZ1) is a specialized, ultra-low-cost "Validation Truth Node." Unlike the modular LRZ2 scouts, the LRZ1 is designed for high-density permanent deployment to scientifically verify the accuracy of the **Virtual Sensor Grid** (50m, 20m, 10m, and 1m resolutions).

By providing a periodic "Truth Check" (1-4 times daily), the LRZ1 ensures that the Bayesian models and Kriging interpolations produced by the Oracle engine remain synchronized with physical reality. This high-density grounding (1 node per 5.7 acres) enables the **1cm Precision Query** feature, allowing surgical plant-level soil analytics. If a discrepancy is detected between the virtual grid and the LRZ1's grounding readings, the system automatically triggers a recalibration of the underlying **Soil Variability Maps**.

## 1. Structural Design (Non-Modular Stability)

To achieve the $32.00 target unit cost, the LRZ1 utilizes a fixed-function internal architecture while maintaining exterior cohesion with the FarmSense fleet.

- **Unified Housing**: 2" Schedule 40 UV-Stabilized PVC (18-inch length).
- **Non-Modular PCBA**: The internal electronics are mounted to a rigid internal PET spine, eliminating the expensive Co-Extruded Alpha-Sled used in higher tier nodes.
- **Permanent Core**: The HDPE pipe remains in the soil as a permanent "Hole Anchor."
- **Sensing Spine**: The internal electronics (ASR6601 + Battery + Sensors) are mounted on a removable PET spine, sealed with a **Threaded High-Density Urethane (T-HDU) Plug**.
- **Refurbishment Workflow**: After 7-10 years, the internal spine is extracted via a standard pulling tool. The factory swaps the Li-SOCl2 cell and re-potts the spine for reuse, saving 70% of the hardware value.
- **Battery Interface**: Maintains the same **Viton-sealed battery cap** as the LRZ2, allowing for centralized maintenance using the standard 21700 battery packs.

## 2. Sensing Physics (Single-Depth Grounding)

The LRZ1 focuses on the primary active root zone to provide high-density spatial truth.

- **Depth**: Fixed at **10 inches (250mm)**.
- **Sensor Type**: Single-depth Dielectric Capacitance (High-Frequency).
- **Update Frequency**: **Low Power Mode**: 1-4 chirps/day (battery-only). **Solar-Enhanced Mode**: 4-8 chirps/day (Wide-Brim Cap charging).
- **Lifespan**: **10+ Years**. The ultra-low duty cycle (4x lower than LRZ2) enables a "Decade Deployment" model.

## 3. Communication & Intelligence

- **SoC**: **ASR6601** (LoRa SoC: ARM Cortex-M4 + Semtech SX1262 LoRa).
- **Protocol**: 900MHz LoRa Mesh (Spread Spectrum).
- **Network Optimization**: Due to the high node density, the LRZ1 utilizes optimized Spreading Factors (SF7/SF8) for local hops, reducing "on-air" time and extending battery lifecycle by ~25% compared to the legacy V1.x long-range modes.
- **State Machine**:
  - **Hibernation**: 1.5µA.
  - **Grounding Burst**: 4x less often than the LRZ2's unless "Rapid Mode" is triggered by PMT during active irrigation.

## 4. Line-Item BOM (Absolute OEM Scale)

| Category | Component Detail | Unit Cost |
| :--- | :--- | :--- |
| **Housing** | 2" PVC Shell (10") + Friction Tip | $3.70 |
| **PCBA** | ASR6601 High-Integration LoRa PCBA | $4.00 |
| **Sensing** | 1U Basic Dielectric Ring (10") | $4.00 |
| **Power** | 10-Year Li-SOCl2 or LFP Cell | $8.50 |
| **Solar Cap** | Wide-Brim Flexible Solar Panel (4"-5" dia) | $2.80 |
| **Seals** | Viton O-Rings + T-HDU Spine Plug | $4.80 |
| **Sensing Spine** | Removable PET Spine Assembly | $1.20 |
| **TOTAL** | **Target Unit Hardware Cost** | **$29.00** |

---
*Infrastructure Classification: High-Density Spatial Grounding Node*
*Spec Version: V1.0 | Protocol: LoRa Mesh 2.1*
