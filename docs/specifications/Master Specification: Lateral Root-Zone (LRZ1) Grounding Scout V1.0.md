# Master Specification: Lateral Root-Zone (LRZ1) Grounding Scout V1.0

**Role**: Level 1 "Grounding" Node | **Network Density**: 20 units per 150-acre Field (Radial Stratification)

The Lateral Root-Zone 1 (LRZ1) is a specialized, ultra-low-cost "Validation Truth Node." Unlike the modular LRZ2 scouts, the LRZ1 is designed for high-density permanent deployment to scientifically verify the accuracy of the **Virtual Sensor Grid** (50m, 20m, 10m, and 1m resolutions).

By providing a periodic "Truth Check" (1-4 times daily), the LRZ1 ensures that the Bayesian models and Kriging interpolations produced by the Oracle engine remain synchronized with physical reality. This high-density grounding (1 node per 5.7 acres) enables the **1cm Precision Query** feature, allowing surgical plant-level soil analytics. If a discrepancy is detected between the virtual grid and the LRZ1's grounding readings, the system automatically triggers a recalibration of the underlying **Soil Variability Maps**.

## 1. Structural Design (Non-Modular Stability)

To achieve the $32.00 target unit cost, the LRZ1 utilizes a fixed-function internal architecture while maintaining exterior cohesion with the FarmSense fleet.

- **Unified Housing**: 2" Schedule 40 UV-Stabilized PVC (18-inch length).
- **Non-Modular PCBA**: The internal electronics are mounted to a rigid internal PET spine, eliminating the expensive Co-Extruded Alpha-Sled used in higher tier nodes.
- **Permanent Core**: Vacuum-sealed internal cavity, factory-potted for absolute moisture defense.
- **Battery Interface**: Maintains the same **Viton-sealed battery cap** as the LRZ2, allowing for centralized maintenance using the standard 21700 battery packs.

## 2. Sensing Physics (Single-Depth Grounding)

The LRZ1 focuses on the primary active root zone to provide high-density spatial truth.

- **Depth**: Fixed at **10 inches (250mm)**.
- **Sensor Type**: Single-depth Dielectric Capacitance (High-Frequency).
- **Update Frequency**: 1-4 chirps per day (Managed by PMT heartbeat).

## 3. Communication & Intelligence

- **SoC**: **ASR6601** (LoRa SoC: ARM Cortex-M4 + Semtech SX1262 LoRa).
- **Protocol**: 900MHz LoRa Mesh (Spread Spectrum).
- **Network Optimization**: Due to the high node density, the LRZ1 utilizes optimized Spreading Factors (SF7/SF8) for local hops, reducing "on-air" time and extending battery lifecycle by ~25% compared to the legacy V1.x long-range modes.
- **State Machine**:
  - **Hibernation**: 1.5µA.
  - **Grounding Burst**: Every 6-12 hours, unless "Rapid Mode" is triggered by PMT during active irrigation.

## 4. Line-Item BOM (Absolute OEM Scale)

| Category | Component Detail | Unit Cost |
| :--- | :--- | :--- |
| **Housing** | 2" PVC Shell (18") + Friction Tip | $4.70 |
| **PCBA** | ASR6601 High-Integration LoRa PCBA | $4.00 |
| **Sensing** | 1U Basic Dielectric Ring (10") | $4.00 |
| **Power** | Swappable 21700 Cell (LFP) | $8.50 |
| **Seals** | Viton O-Rings + blanking cap | $4.80 |
| **TOTAL** | **Target Unit Hardware Cost** | **$26.00** |

---
*Infrastructure Classification: High-Density Spatial Grounding Node*
*Spec Version: V1.0 | Protocol: LoRa Mesh 2.1*
