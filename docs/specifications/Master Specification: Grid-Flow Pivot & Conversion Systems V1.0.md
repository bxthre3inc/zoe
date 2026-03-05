# Master Specification: "Grid-Flow" Pivot & Conversion Systems V1.0

**Role**: Custom Application Infrastructure | **Configuration**: Sectional (Tier 2) or Hybrid Nozzle (Tier 3)

The FarmSense VRI system is designed for dual-track deployment: **Custom Integrated Pivots** for new standardizations and **Conversion Kits** for retrofitting existing multi-vendor (Valley, Lindsay, Reinke) hardware.

## 1. "Grid-Flow" Custom Pivot (Ground-Up Design)

The custom pivot is designed to be the "Hardware Native" platform for 1m Grid Prescriptions.

- **Integrated Backhaul**: Span pipes act as waveguides or contain internal low-profile patch antennas to ensure 100% signal reliability for the ISN/SSN fleet.
- **Pre-Integrated Bus**: 24VAC power and data-over-power (PLC alternative) are pre-installed in the structural truss.
- **Factory Calibration**: Every ISN/SSN is pre-mapped in the factory, allowing the DHU to activate the grid immediately upon field assembly.

## 2. Conversion Kit A: Section-VRI (Pressure Management)

Designed for users wanting optimized pressure and volume management without full nozzle-level complexity.

- **Hardware**: 10x **Smart Section Nodes (SSN)**.
- **Deployment**: Solenoid-actuated butterfly valves installed at each span's flexible joint.
- **Benefit**: Eliminates localized pressure drops and allows for "Span-Level" prescription zones (approx. 130ft x 5deg).
- **Target Price**: **$1,500 - $1,800 per field** (including hardware).

## 3. Conversion Kit B: Nozzle-VRI (Full Grid)

The "Precision Upgrade" for existing pivots.

- **Hardware**: 10x SSN + ~125x **Integrated Smart Nozzles (ISN)**.
- **Sensor Pairing**: Designed to pair with the **2:4:12 Stereo** field sensor standard (18 nodes/field), which provides the spatial data density needed to feed 1m-pixel prescriptions.
- **Deployment**: Existing nozzles are swapped for ISNs; a weatherproof power bus is clipped to the pivot arm.
- **Benefit**: Full 1m x 1m Square Pixel precision. Dynamic pressure stabilization via the SSN backbone.
- **Target Price**: **$3,800 - $4,500 per field** (including hardware).

## 4. Control Hierarchy

| Level | Primary Control | Resolution | Precision Node |
| :--- | :--- | :--- | :--- |
| **Tier 1**| Pivot PPS (Speed) | 5° Slices | PMT Only |
| **Tier 2**| Span Volume | ~130ft Blocks | SSN Nodes |
| **Tier 3**| Nozzle PWM | **1m x 1m Pixels**| **ISN Fleet** |

---
*Infrastructure Classification: VRI Application Tier*
*Spec Version: V1.0 | Protocol: LoRa Mesh 2.1*
