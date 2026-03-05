# CSU SLV RC Pilot: Procurement and Operational Budget

This document outlines the **exact, hyper-granular procurement costs** to build two (2) Single-Field Deployments (SFDs) and one (1) District Hub (DHU) from scratch.

This is the "Lean Tracker" MVP strategy: we use the exact silicon specified in the Master Blueprints (NVIDIA Jetson Nano, Nordic nRF52840, Microchip ATSAMD51), but mounted on Commercial Off-The-Shelf (COTS) developer breakout boards. We substitute high-cost industrial mechanicals for hardware-store equivalents (e.g., standard PVC vs. custom extrusions) and account for every tool, wire, and zip-tie needed to execute the pilot.

**Logistics & Build Strategy:** All sensors and hardware will be fabricated, soldered, and pre-tested at the investor-provided workshop in **Monte Vista, CO**, before being deployed for live pilot operations in **Center, CO** with CSU SLV RC.

*Note: The Regional Superstation (RSS) compute node is omitted from this hardware build-out, assuming CSU SLV RC provides a cloud instance or standard PC to run the cloud/database backend.*

---

## 1. Silicon & Core Processing ("The Brains")

This covers the processing elements and sensors for 2x PMTs, 2x VFAs, 2x PFAs, and 10x LRZs.

| Item | Use Case | Qty | Unit Price | Total |
| :--- | :--- | :--- | :--- | :--- |
| Adafruit Grand Central M4 (SAMD51) | PMT Core Logic | 2 | $35.00 | $70.00 |
| SparkFun ZED-F9P RTK GNSS Receiver | PMT Precision Motion | 2 | $225.00 | $450.00 |
| SeaMetrics Paddle-Wheel Flow Switch | PMT Irrigation State | 2 | $35.00 | $70.00 |
| SparkFun Pro nRF52840 Mini | VFA / LRZ MESH Logic | 12 | $25.00 | $300.00 |
| Adafruit Metro M4 (SAMD51) | PFA Core Logic | 2 | $25.00 | $50.00 |
| 0-250 PSI Analog Pressure Transducer (5V) | PFA Line Pressure | 2 | $25.00 | $50.00 |
| SCT-013 100A Split-Core CT Clamps | PFA Motor Harmonics | 2 | $15.00 | $30.00 |
| **Subtotal: Electronics** | | | | **$1,020.00** |

---

## 2. District Hub Edge Compute & Radio Backhaul

The central aggregator that runs the Alliance-Chain ledger and routes data to the cloud.

| Item | Use Case | Qty | Unit Price | Total |
| :--- | :--- | :--- | :--- | :--- |
| NVIDIA Jetson Nano Dev Kit (4 GB) | DHU Kriging Engine | 1 | $120.00 | $120.00 |
| SanDisk Max Endurance 128GB MicroSD | DHU File System | 1 | $35.00 | $35.00 |
| RAK Wireless WisGate Edge Lite | DHU LoRaWAN Gateway | 1 | $185.00 | $185.00 |
| Sixfab 4G/LTE Cellular Base HAT for Jetson | DHU Internet Backhaul | 1 | $80.00 | $80.00 |
| Hologram Global IoT SIM (Pre-paid 1GB) | DHU Cellular Data | 1 | $30.00 | $30.00 |
| RAK Omni 8 dBi 915MHz LoRa Antenna | DHU Sector Coverage | 1 | $65.00 | $65.00 |
| LMR-400 Low Loss Coax Cable (10ft) | DHU Antenna Run | 1 | $40.00 | $40.00 |
| 915MHz LoRa Dipole + U.FL to SMA Pigtails | VFA/LRZ/PFA Antennas | 14 | $10.00 | $140.00 |
| 2.4GHz BLE Whip Antennas | PMT/VFA Local Link | 4 | $10.00 | $40.00 |
| **Subtotal: Edge Compute & RF** | | | | **$735.00** |

---

## 3. Power Systems (Solar, Primary Cells, Regulation)

| Item | Use Case | Qty | Unit Price | Total |
| :--- | :--- | :--- | :--- | :--- |
| Renogy 50W Monocrystalline Solar Panel | PMT / DHU Harvesting | 3 | $50.00 | $150.00 |
| Renogy Wanderer 10A PWM Charge Controller| PMT / DHU Regulation | 3 | $15.00 | $45.00 |
| 12V 50Ah SLA Deep Cycle Battery | DHU Storage | 1 | $100.00 | $100.00 |
| 12V 9Ah SLA Battery | PMT Storage | 2 | $20.00 | $40.00 |
| Saft LS33600 D-Cell (3.6V LiSOCl2) | VFA/LRZ/PFA Primary | 14 | $15.00 | $210.00 |
| LM2596 DC-DC Buck Converters (Pack of 10)| 12V to 5V/3.3V Step | 1 | $15.00 | $15.00 |
| Inline ATO Fuse Holders & 5A Fuses (Pack) | Battery Protection | 1 | $15.00 | $15.00 |
| **Subtotal: Power Systems** | | | | **$575.00** |

---

## 4. Mechanical & Civil Infrastructure ("Guts & Pipes")

| Item | Use Case | Qty | Unit Price | Total |
| :--- | :--- | :--- | :--- | :--- |
| NEMA 3R/4X Polycarbonate Junction Box (12x12) | DHU Enclosure | 1 | $45.00 | $45.00 |
| NEMA 4X Polycarbonate Junction Box (8x6) | PMT/PFA Enclosures | 4 | $25.00 | $100.00 |
| 10-foot 2" Schedule 40 PVC Pipe Stems | VFA/LRZ Housings | 4 | $15.00 | $60.00 |
| 2" PVC Slip Caps (Dome Top, Flat Bottom)| VFA/LRZ Seal | 28 | $1.50 | $42.00 |
| Waterproof Cable Glands (PG9/PG11 Pack) | Sensor Pass-throughs| 1 | $20.00 | $20.00 |
| Marine-Grade Silicone RTV Sealant (Tubes) | PMT/PFA Sealing | 3 | $8.00 | $24.00 |
| Oatey PVC Primer and High-Strength Cement| VFA/LRZ Sealing | 1 | $15.00 | $15.00 |
| 10' Galvanized TV Mast w/ Guy Wire Kit | DHU Tower | 1 | $75.00 | $75.00 |
| Stainless Steel Band-It Straps & Clamp Kit | PMT Pivot Mounting | 1 | $45.00 | $45.00 |
| **Subtotal: Mechanical** | | | | **$426.00** |

---

## 5. Wiring, Consumables & Lab Supplies

| Item | Use Case | Qty | Unit Price | Total |
| :--- | :--- | :--- | :--- | :--- |
| 22 AWG Solid Core Hookup Wire Kit (6 Color) | PCB Breadboarding | 1 | $25.00 | $25.00 |
| 18 AWG Stranded Marine Wire (100ft Spool) | Solar / Power Runs | 1 | $30.00 | $30.00 |
| 3M VHB Double-Sided Tape Assortment | Sled Mounting | 1 | $15.00 | $15.00 |
| Heat Shrink Tubing (Marine Adhesive-Lined)| Splice Waterproofing | 1 | $20.00 | $20.00 |
| MG Chemicals Silicone Conformal Coating | Humidity PCB Defense | 2 | $17.50 | $35.00 |
| 63/37 Rosin Core Solder (1lb Spool) | Joint Fabrication | 1 | $15.00 | $15.00 |
| 1g Silica Gel Desiccant Packets (Bag of 100)| Enclosure Drying | 1 | $15.00 | $15.00 |
| UV-Resistant Nylon Zip Ties (Assorted Bag) | Cable Management | 1 | $15.00 | $15.00 |
| **Subtotal: Consumables** | | | | **$170.00** |

---

## 6. Prototyping Workshop Tools (Zero-to-One Build)

*Utilizing the investor-provided shop in Monte Vista, CO to build the pilot units prior to the Center deployment. This assumes we are stocking empty workbenches.*

| Item | Use Case | Qty | Unit Price | Total |
| :--- | :--- | :--- | :--- | :--- |
| Hakko FX-888D Soldering Station | PCB Assembly | 1 | $120.00 | $120.00 |
| Wire Strippers, Flush Cutters, Precision Kit| Wiring Fabrication | 1 | $45.00 | $45.00 |
| Fluke 101 Digital Multimeter | Power Debugging | 1 | $60.00 | $60.00 |
| Ratcheting PVC Pipe Cutter | VFA/LRZ Cutting | 1 | $20.00 | $20.00 |
| Handheld 20V Power Drill & Step-Bit Set | NEMA Box Drilling | 1 | $80.00 | $80.00 |
| Wagner Variable Temp Heat Gun | Heat Shrink / PVC Mold | 1 | $30.00 | $30.00 |
| **Subtotal: Tools** | | | | **$355.00** |

---

## 7. Cloud & Developer Compute Hardware

*Because the Regional Superstation (RSS) Threadripper is out of scope, a dedicated local proxy server is required to run the PostgresDB, AllianceChain ledger, and Python Kriging engine for the pilot. A reliable mid-level workstation is also included for field development and code compilation.*

| Item | Use Case | Qty | Unit Price | Total |
| :--- | :--- | :--- | :--- | :--- |
| High-Performance Mini PC (64GB RAM, 2TB NVMe) | Proxy RSS / Local Server | 1 | $850.00 | $850.00 |
| Mid-Level Developer Workstation (32GB RAM) | Reliable Dev / Field Laptop | 1 | $1,500.00 | $1,500.00 |
| **Subtotal: Compute Gear** | | | | **$2,350.00** |

---

## 8. Operational Expenses (6-Month Growing Season)

*Hardware alone does not run a pilot. This section outlines the OpEx (Operational Expenditure) required to keep the Center, CO deployment running, streaming, and validated from May through October.*

| OpEx Category | Justification | Monthly Rate | 6-Month Total |
| :--- | :--- | :--- | :--- |
| **RTK GNSS Corrections** | Cellular Ntrip subscriptions for 2 PMTs to achieve centimeter-accuracy pivot tracking. (e.g., Colorado CORS network). | $200.00 | $1,200.00 |
| **Cellular IoT Data** | Hologram Global SIM data for DHU to push compressed Kriging telemetry to the cloud. | $15.00 | $90.00 |
| **Cloud Hosting & APIs** | PostgresDB snapshots, DigitalOcean droplets for public dashboard access, and Mapbox map tiles. | $100.00 | $600.00 |
| **Field Maintenance Travel** | Fuel for weekly "truck rolls" from Monte Vista shop to the Center pivots for inspection and cleaning. | $100.00 | $600.00 |
| **Agronomic Core Testing** | Paying a local SLV lab to physically test soil cores to validate the VFA/LRZ Kriging algorithms twice during the season. | N/A | $1,000.00 |
| **Unforeseen Spares Bank** | 10% buffer for broken PVC, bad solder joints, or damaged sensors over the season. | N/A | $350.00 |
| **6-Month Operational Reserves** | A designated financial cushion to absorb unforeseen pilot execution costs (e.g. broken hardware, travel spikes) and provide a lean living stipend so the solo founder can focus 100% full-time on deployment. | N/A | $8,619.00 |
| **Subtotal: 6-Month OpEx** | | | | **$12,459.00** |

---

## 9. Phase 1 Legal, IP & Entity Formation

*Securing the massive intellectual property portfolio and legally shielding the founders via dual-corporate incorporation before stepping foot onto the active pilot field.*

| Legal/IP Category | Justification | Total Cost |
| :--- | :--- | :--- |
| **6x Provisional Patents** | USPTO Micro-Entity fees and Patent Agent formatting to secure 12-month "Patent Pending" status on the core tech (AllianceChain, Edge-FHE, etc.). | $5,760.00 |
| **Holding Co. Incorporation** | Stripe Atlas setup for "Bxthre3 Inc." (Delaware C-Corp) to hold the master IP and founder shares. | $500.00 |
| **Subsidiary Incorporation** | Stripe Atlas setup for "FarmSense, Inc." (Delaware C-Corp, 95% owned by Bxthre3 Inc.). | $500.00 |
| **Colorado Foreign Qual.** | Registering the Delaware subsidiary to legally operate the shop in Monte Vista/Center, CO. | $150.00 |
| **Subtotal: Phase 1 Legal** | | **$6,910.00** |

---

## 10. Ultimate Seed Ask & Summary

Executing the pilot requires a two-step localized supply chain:

1. **Fabrication & Pre-Testing:** Requires a secured local workshop (targeting Monte Vista).
2. **Live Field Deployment:** Installed on the pivots operated by **CSU SLV RC in Center**.

Summing the exhaustive list of individual components, parts, tools, and wire down to the single-unit retail price levels:

* **Electronics & Processing:** $1,020.00
* **DHU Edge Compute & RF:** $735.00
* **Power Systems:** $575.00
* **Mechanical & Civil:** $426.00
* **Wiring & Consumables:** $170.00
* **Workshop Tools:** $355.00
* **Cloud & Developer Compute:** $2,350.00

### **Total Ground-Up Pilot Procurement Budget:** $5,631.00

**Total Seed Funding Calculation:**

* **CapEx (Hardware Procurement & Workshop Tools):** $5,631.00
* **OpEx (6-Month Growing Season Operations + Reserves):** $12,459.00
* **Phase 1 Legal (Patents & Dual Incorporation):** $6,910.00

### **Total FarmSense Seed Funding Request:** $25,000.00
