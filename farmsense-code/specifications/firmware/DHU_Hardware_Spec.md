# District Hub (DHU) Master Specification V2.0

**Tier**: Layer 2 (Regional Mesh Manager) | **Radius**: 10km (Overlapping Mesh)

## 1. Role: The Regional Director

The DHU coordinate regional mesh traffic, bridging the gap between field-level SFDs and the RDC. It manages localized "Reflex Logic" and executes mid-tier spatial probability grids.

## 2. Infrastructure & Siting

### 2.1 Vertical Strategy (30-40' AGL)

- **Mount**: 40ft Class 1 Cedar Poles or Existing Grain Silos.
- **Visibility**: Clears 60% Fresnel zone over 10km span to avoid canopy attenuation.
- **Stability**: Timber poles selected for 40-year lifespan and "Shimmer Resistance."

### 2.2 Enclosure (The Thermal Buffer)

- **Housing**: NEMA 4X Polycarbonate (24x20x10).
- **Thermal Logic**: Large internal volume acts as a passive air-gap buffer for 200Ah battery bank against SLV solar radiation.
- **Climate**: Dual Gore-Tex vents for alkali dust exclusion.

## 3. Edge Compute Architecture

### 3.1 Localized Kriging Engine

- **SoC**: OnLogic CL210 8-Core ARM SOC (formerly NVIDIA Jetson Nano variant).
- **Logic**: Executes 10m and 20m spatial probability grids for up to 100 fields locally.
- **Reflex Logic**: Instant pump stop commands (PFA relay) bypassing cloud latency.

### 3.2 The "Black Box" Ledger

- **SSD**: 128GB Swissbit PSLC Industrial (Pseudo-Single Level Cell).
- **Integrity**: 30-day write-endurance for legal audit preservation during total internet outages.

## 4. Radio Spine & Power

### 4.1 Sector Radio Array

- **Antennas**: 3x Ubiquiti LTU Sector Antennas (120° coverage).
- **Gateway**: Enterprise-Grade 900MHz LoRaWAN for SFD mesh sink.
- **Backhaul**: Fiber ONT (Primary) + Telit ME910G1 LTE-M (Backup).

### 4.2 Resilient Power (7-Day Rating)

- **Solar**: 200W High-Tilt Rigid Array.
- **Storage**: Battle Born 200Ah Heated LiFePO4 Bank.
- **Protection**: L-com GDT Lightning Arrestors on all Sector lines.

## 5. Hyper-Granular BOM (Subdistrict 1 Batch)

| Component | Detail | Unit Cost |
| :--- | :--- | :--- |
| **Computing** | OnLogic CL210 ARM Cluster | $299.00 |
| **Storage** | 128GB PSLC SSD | $185.00 |
| **Radio Array** | 120° Sector Array (x3) | $850.00 |
| **Backhaul** | Fiber ONT + LTE-M Backup | $465.00 |
| **Housing** | NEMA 4X Polycarbonate Buffer | $180.00 |
| **Power** | 200W Array + 200Ah Heated LFP | $1,190.00|
| **Structure** | 40ft Class 1 Cedar Pole (Installed) | $2,250.00|
| **Labor** | Vertical Blitz Crew (Site Prep) | $450.00 |
| **TOTAL** | **DHU INFRASTRUCTURE COST** | **$5,869.00**|

---
*Infrastructure Classification: Permanent Mesh Director*
