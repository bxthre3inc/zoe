# Vertical Field Anchor (VFA) Hardware & Firmware Hyper-Specification

## 1. Deep-Profile Architecture (48U Sequence)

The VFA is the permanent "Ground Truth" node, providing high-resolution soil-water battery status.

### 1.1 Mechanical Implementation

- **Shaft:** 48-inch UV-Stabilized Rigid PVC permanent co-extruded shell.
- **Internal Sled:** Modular alpha-sled for seasonal extraction and service ("The Sled Hospital").
- **Antenna:** Internal 3-foot vertical spine for 2.4GHz FHSS.

### 1.2 Sensing Stack (The 48U Array)

The VFA utilizes a vertical sequence of slots for modular sensor placement:

- **Depth 10", 25", 48":** Tensiometric soil moisture (Matric Potential).
- **Depth 18", 35":** Volumetric Water Content (VWC) + Soil Temperature + EC.
- **Chemical:** Integrated pH sensing at deep root-zone (36").

## 2. Core Electronics

### 2.1 Processing

- **MCU:** Nordic nRF52840 (ARM Cortex-M4F).
- **Role:** Aggregates multi-depth readings into a single 48-byte "Battery State" payload.

### 2.2 Power Architecture

- **Battery:** 4U Sled Cartridges containing high-density 21700 cells (x3 per sled).
- **Solar:** 5W Monocrystalline Lid (Tempered Glass) with integrated MPPT controller.
- **Operation:** Designed for "Set and Forget" 10-year field lifespan.

## 3. Firmware Protocol

### 3.1 The MAD Battery Metaphor

The firmware calculates the Management Allowable Depletion (MAD) status locally:

- **Logic:** Aggregates SMP across all 3 depths to determine the "Remaining Charge" in the soil water profile.
- **Chirp:** Transmits the MAD percentage as a primary telemetry priority.

### 3.2 Seasonal Dormancy

- **Logic:** If soil temperature drops below 33°F for 48 consecutive hours, the node enters "Winter Sleep" (8µA draw, 1-week heartbeats).
- **Activation:** Wakes on thermal rise or PMT "Spring Wake" radio pulse.

## 4. Bill of Materials (Granular)

| Part Class | Model/Manufacturer | Qty | Role |
| :--- | :--- | :--- | :--- |
| **Main SoC** | Nordic nRF52840 | 1 | Logic/Radio |
| **Moisture 1** | Tensiometric (Custom) | 3 | Deep Profiling |
| **Moisture 2** | Dielectric Ring | 2 | VWC/Temp |
| **Cells** | Samsung 50E (21700) | 12 | Energy Storage |
| **Solar** | 5W Custom Panel | 1 | MPPT Harvesting |
| **Unit Cost** | **$319.75** | | |

---
*Infrastructure Classification: Permanent Ground-Truth Asset*
