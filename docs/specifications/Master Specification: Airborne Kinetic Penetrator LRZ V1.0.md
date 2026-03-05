# Master Specification: Airborne Ballistic-grade Penetrator LRZ (AKP-LRZ) V1.0

## 1. Executive Summary

The Airborne Ballistic-grade Penetrator Lateral Root-Zone Scout (AKP-LRZ) represents a dual-use (agricultural/tactical) evolution of the standard LRZ architecture. It is designed to be deployed from low to medium altitude via Unmanned Aerial Vehicles (UAVs) or manned agricultural aircraft. The AKP-LRZ utilizes an aerodynamic sabot and a hardened penetrator tip to self-install into the soil profile upon impact, eliminating the need for manual ground operations.

Once embedded, the AKP-LRZ functions identically to a standard LRZ, utilizing 50mm non-contact capacitive telemetry fields to gather soil moisture and temperature data, and transmitting this data via Low Probability of Intercept/Detection (LPI/LPD) Frequency-Hopping Spread Spectrum (FHSS) chirps to a local DHU or PMT.

## 2. Aerodynamic & Mechanical Design

### 2.1 The Penetrator Chassis

Unlike the standard extruded AlphaSled HDPE profile of the base LRZ, the AKP-LRZ requires a hardened structure capable of surviving high-velocity terminal impact (typically 40-70 m/s depending on drop altitude and drogue configuration).

- **Nose Cone / Driving Tip:** Forged Cr-Mo (Chromium-Molybdenum) steel, angled at a 22-degree ogive profile to ensure consistent penetration depth across varying soil compaction levels (from loose sand to dense clay pan).
- **Core Housing:** High-strength, UV-stabilized impact-copolymer polypropylene. While slightly less resilient long-term than the standard VFA's HDPE, it provides the necessary compressive strength off the drop.
- **Tail Assembly / Sabot:** Includes a 4-fin aerodynamic stabilizing tail ring to prevent tumbling during descent. The tail may incorporate a biodegradable trailing ribbon (drogue) to arrest terminal velocity to optimal penetration speeds.

### 2.2 PCB Shock Isolation (Potting)

To protect the delicate nRF52840 SoC and ceramic antenna from G-forces exceeding 500G upon impact:

- The entire internal circuitry is vacuum-potted using a specialized two-part low-durometer polyurethane thermosetting resin.
- This resin provides rigid mechanical support while maintaining a slight viscoelastic property to absorb shock wave propagation through the PCB.

## 3. Sensors and Payload

The sensor suite remains functionally identical to the standard LRZ but must account for the thicker chassis and potting material.

- **Non-Contact Capacitive Field:** The 50mm fringe-field capacitors are calibrated to account for the dielectric constant of the polyurethane potting resin, ensuring the resulting soil volumetric water content (VWC) algorithms remain accurate.
- **Embedded SoC:** Nordic nRF52840 (QIAA-F0) handling all sensing, AES-128 encryption, and LPI/LPD FHSS transmission duties.
- **Power:** The battery remains a high-energy-density LiSOCl2 primary cell, though configured in a "jelly roll" format for better radial shock resistance.

## 4. Deployment Profile

1. **Airborne Release:** Dispensed from a standardized payload rack (e.g., standard NATO sonobuoy launcher dimensions or custom agricultural drone racks).
2. **Freefall & Stabilization:** The tail fins align the unit vertically relative to the ground.
3. **Terminal Impact:** The Cr-Mo tip pierces the soil. The penetration depth is determined by terminal velocity and soil compaction. Target depth for the sensing element is 4-8 inches sub-surface.
4. **Auto-Initialization (Wake-on-Shock):** A mechanical reed switch or MEMS accelerometer triggers on impact, transitioning the nRF52840 from deep sleep (transport mode) to active deployment mode.
5. **Mesh Integration:** The AKP-LRZ begins broadcasting its LPI/LPD FHSS discovery chirps to join the local VFA/DHU umbrella mesh.

## 5. Dual-Use (Inter-agency/Federal) Applications

The AKP-LRZ offers distinct tactical advantages in contested or denied environments:

- **Zero Human Footprint:** Can be seeded behind enemy lines or in hazardous terrain without risking ground personnel.
- **LPI/LPD Operations:** The ultra-short (10ms) FHSS chirps, powered by AES-128 PRNG sequences, make the network highly resistant to electronic warfare (EW) detection and jamming.
- **Covert Sensing Intelligence:** Provides allied forces with immediate terrain trafficability data (soil moisture implies mud depth for armored vehicle operations) or serves as an acoustic/seismic tripwire via its mesh integration capabilities.
