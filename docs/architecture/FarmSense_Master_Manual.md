# FarmSense Master Manual

<div style="page-break-after: always;"></div>

# Table of Contents

[TOC]

<div style="page-break-after: always;"></div>

<div style="page-break-after: always;"></div>

# PART I: EXECUTIVE VISION & STRATEGY

# **Definitive Systems Architecture Blueprint: FarmSense San Luis Valley Deployment**

## **Executive Summary**

This document constitutes the definitive technical, operational, and financial deployment blueprint of the FarmSense agricultural technology and Internet of Things (IoT) platform, actively integrating across Subdistrict 1 of the San Luis Valley (SLV), Colorado. Engineered as a "Deterministic Farming Operating System," FarmSense replaces stochastic, intuition-based agricultural practices with a high-fidelity, rule-based computational engine. The platform's ultimate objective is to optimize the Soil-Plant-Atmosphere Continuum (SPAC) using an expansive multi-layered sensor network, aiming for a 20–30% reduction in irrigation water consumption alongside an 18–22% increase in crop return on investment (ROI).

The primary economic catalyst for this deployment is the severe hydro-economic crisis characterizing the Rio Grande Basin. Driven by an 89,000 acre-foot annual aquifer depletion rate and stringent compliance mandates under the 1938 Rio Grande Compact, the local Rio Grande Water Conservation District (RGWCD) has imposed a highly punitive $500 per acre-foot groundwater pumping fee. In this extreme regulatory environment, FarmSense's value proposition shifts from a standard agronomic optimization tool to a critical legal and financial necessity, providing an immutable "Digital Water Ledger" capable of defending water rights in state Water Court.

By executing a targeted, phased 2-field pilot specifically designed to provide empirical ground truth for the June 29, 2026, Subdistrict 1 water court trial, the project ensures rigorous validation before maximum scale. This operational reality positions FarmSense for 100% non-dilutive funding through global infrastructure grants, the Department of Defense, and premier philanthropic organizations like the Bill & Melinda Gates Foundation.

## ---

**1\. Hydro-Economic Logic and The Deterministic Paradigm**

The financial viability of the FarmSense platform is inextricably linked to its underlying agronomic logic and the macroeconomic realities of the San Luis Valley. To appeal to climate-tech venture capital and federal conservation programs, the operational logic must demonstrate a flawless understanding of localized biophysics.

### **1.1 The San Luis Valley Crisis as an Economic Multiplier**

The SLV floor, situated at 7,500 to 8,000 feet in altitude, is a high-desert environment receiving only 7 to 10 inches of annual precipitation, making the region's 300,000 acres of irrigated agriculture entirely dependent on snowmelt and two massive underground aquifers.1 With regional reservoir storage declining to 26% of historical capacity, the region is facing an existential threat.1

To combat a legacy of over-consumption, Subdistrict 1 treats water as a public good. The implementation of the $500 per acre-foot (AF) groundwater pumping fee represents a quadrupling of previous costs ($75–$150/AF).1 This fee acts as the primary economic multiplier for the FarmSense system. The platform performs a continuous Cost-Benefit Analysis (CBA): if the marginal cost of a "last minute" irrigation event (the $500/AF fee plus associated electrical and labor costs) exceeds the marginal revenue of the yield protected, the system deterministically recommends withholding the resource.1

For a standard 130-acre center pivot consuming roughly 260 AF per season, achieving the stated 20% water reduction saves 52 AF.1 At $500/AF, this translates to $26,000 in direct savings per pivot, effortlessly justifying the platform's $499/month ($5,988/year) Enterprise Tier SaaS subscription.1

### **1.2 SPAC Modeling and Edaphic Variability**

Unlike "black-box" artificial intelligence systems, FarmSense utilizes 11 domain-specific engines that are entirely explainable, allowing agronomists to reconstruct every decision.1 This logic relies heavily on modeling the Soil-Plant-Atmosphere Continuum (SPAC).1

The system maps fluxes of energy and mass across three domains:

* **The Soil Layer (Edaphic):** Monitors Soil Matric Potential (SMP), Volumetric Water Content (SWC), Electrical Conductivity (EC), and pH.1 The SLV features extreme soil heterogeneity. For example, the *San Luis* soil series is highly alkaline (pH 8.4-9.8) with high exchangeable sodium (15-60%), presenting risks of salt buildup.1 The *Gunbarrel* series is highly porous sand requiring low-volume, high-frequency micro-irrigation.1 FarmSense dynamically shifts its "refill points" based on these textures, triggering irrigation at 75-80 kPa for silty clay loams, but lowering the threshold to 20-25 kPa for fine sands where hydraulic conductivity drops precipitously.1  
* **The Plant Layer (Vegetative):** Monitors leaf water potential (![][image1]), Canopy Water Stress Index (CWSI), and Normalized Difference Vegetation Index (NDVI) to detect stomatal closure prior to visible wilting.1  
* **The Atmosphere Layer (Meteorologic):** Integrates Vapor Pressure Deficit (VPD), solar radiation, and wind speed.1 By utilizing Long Short-Term Memory (LSTM) deep learning networks, the system forecasts Evapotranspiration (ET) trends with 81-94% accuracy, anticipating the intense 4.5 to 7.7 mm/day ET demand of SLV potato crops.1

### **1.3 The Management Allowable Depletion (MAD) Framework**

The culmination of the SPAC model is executed via the Management Allowable Depletion (MAD) framework. MAD defines the precise percentage of available soil water that can be depleted before a crop experiences physiological damage.1 By synthesizing 1-to-9 day ensemble weather forecasts, the Core Compute Server (Zo) delays irrigation until the "last possible minute," utilizing the deep soil profile as a dynamic battery.1 This strategy leaves critical "headroom" in the soil profile to capture unexpected rainfall, mathematically eliminating the risk of deep percolation, nutrient leaching, and over-irrigation wastage.1

## ---

**2\. System Architecture and Component Hierarchy**

To execute the MAD framework across 166,000 acres, FarmSense deploys a sophisticated, tiered network architecture. Crucially, the system does not rely on vulnerable third-party public clouds; instead, it operates its own decentralized monolithic grid.

### **2.1 Backend Intelligence (Decentralized Cloud Layer)**

The cloud architecture is designed for heavy spatial analytics and operates locally to ensure rural resilience:

* **Map Servers (Oracle Vault):** The master data library housing spatial, satellite (Sentinel-2, Landsat), and historical edaphic datasets.\[1, 1\]  
* **Spatial Query Engine (Map Manager):** The "librarian" that extracts specific values (elevation, slope, aspect, NDVI) at precise latitude and longitude coordinates, converting them into lightweight JSON arrays.1  
* **Core Compute Server (Zo):** The "scientist" engine executing Bayesian priors and Localized Kriging algorithms (geostatistical interpolation) to process hundreds of thousands of data points into predictive "Worksheets".1

### **2.2 Regional and District Edge Infrastructure**

Relying purely on external cloud connectivity in rural agricultural environments is a critical point of failure. FarmSense mitigates this by pushing heavy computational loads to the edge and utilizing the Regional Superstation as its own localized cloud.

* **Regional Superstation (RSS):** Located in Monte Vista, this Level 3 node serves as the territory master and equal cloud counterpart to the backend intelligence. Operating as a decentralized monolithic grid, it ensures that heavy spatial analytics and the "Digital Water Ledger" remain intact and legally irrefutable even during total regional internet or cellular blackouts. Housed in a modified 40-foot High-Cube container, it contains a 64-Core AMD Threadripper PRO cluster with 256GB of ECC RAM and stores the master spatial database on a 50TB Enterprise NVme array.\[1, 1\]  
* **District Hubs (DHU):** Acting as Level 2 Regional Mesh Managers, DHUs are true edge coordinators mounted on 35-foot Class 4 timber poles, covering a 10km line-of-sight radius.1 Powered by an OnLogic CL210 Industrial 8-Core ARM SOC, the DHU executes the Zo "Worksheets" locally, allowing for instantaneous "Reflex Logic" decisions (e.g., executing an emergency pump shutdown) without suffering from cellular latency.1

### **2.3 The "Black Box" Ledger and Legal Defensibility**

A standout engineering feature of the DHU is the 30-Day "Black Box" Cache, utilizing a 128GB Swissbit PSLC (Pseudo-Single Level Cell) Industrial SSD.1 If a total regional backhaul failure occurs (fiber cut and cellular blackout), the DHU continuously records cryptographically signed (128-bit AES) "Audit Packets".\[1, 1\] This guarantees that the unbroken chain of custody required for the "Digital Water Ledger" is preserved, ensuring the data remains admissible as empirical evidence in Colorado Water Court.\[1, 1\]

## ---

**3\. Telemetry Stress Test: Identifying Critical Disconnects**

With the data integrity architecture established, cross-examination of the Master Specifications guided the optimization of the radio telemetry stack, executed directly within the finalized engineering phase.

### **3.1 The VFA-to-DHU Backhaul Failure (900MHz vs. 5GHz)**

The Vertical Field Anchor (VFA) serves as the primary data aggregation point for an individual field.1

* **VFA Specification:** The VFA V1.21 specification explicitly mandates the use of a "local high-gain 900MHz LoRa uplink" to bypass expensive cellular modems and transmit secure payloads to the District Hub.1  
* **DHU Specification:** The DHU V1.1 specification dictates a "Triple-Sector Radio Spine" consisting of three Ubiquiti LTU Sector Antennas (120°) operating exclusively on the 5GHz frequency band.1  
* **The Disconnect:** The proprietary Ubiquiti LTU 5GHz architecture cannot receive 900MHz LoRa modulations.1  
* **Resolution:** Correcting this by upgrading the VFA to 5GHz is not agronomically viable. High-frequency 5GHz waves suffer from severe attenuation and multipath interference when attempting to penetrate dense, water-rich foliage. The DHU BOM must be immediately revised to include an enterprise-grade 900MHz LoRaWAN gateway alongside the existing Ubiquiti array.

### **3.2 The PMT Field Hub Architecture (Telemetry Coordination)**

The Pressure & Flow Anchor (PFA) is the critical safety actuator mounted at the wellhead. The Vertical Field Anchor (VFA) and its surrounding LRZs are buried in the soil. Initially, there were concerns about how these disparate ground-level devices would communicate through a dense, wet corn canopy.

* **The PMT Solution:** The system solves this by elevating the Pivot Motion Tracker (PMT) 10-15 feet above the ground on the pivot span, acting as an \"umbrella\" receiver.
* **Routing:** The VFA, LRZs, and the PFA all report upward directly to the PMT. The PMT then acts as the central \"Field Hub\", packaging the data and sending it down the line to the nearest active District Hub (DHU).
* **Resolution:** This elevated topology entirely physically circumvents the dense water canopy that attenuates ground-level signals, ensuring a constant line of sight between the field sensors and the PMT field hub.

### **3.3 The LRZ Sub-Node Architecture: The FHSS Advantage**

In contrast to the backhaul failures, the communication protocol between the Lateral Root-Zone (LRZ) scouts and the VFA represents state-of-the-art IoT engineering.

* **LR-FHSS Implementation:** The LRZ units execute 128-bit encrypted Frequency-Hopping Spread Spectrum (FHSS) "dumb chirps".1 By scattering micro-transmissions across 75 different frequencies, the system mitigates co-channel interference, completely eliminating the probability of packet collisions within the confines of a single high-density farm field.\[1, 1\]

## ---

**4\. Hardware Specifications and Field-Level Auditing**

The realization of the "Digital Water Ledger" relies on the mechanical accuracy and durability of the edge nodes.

### **4.1 Pivot Motion Trackers (PMT) and Kinematic Auditing**

The PMT (V1.6) is the "Nervous System" of the center pivot.1

* **GNSS Architecture:** The PMT utilizes a u-blox ZED-F9P RTK GNSS module, achieving sub-2.5m horizontal accuracy.1 This precision allows the Zo engine to calculate precisely which 1-meter spatial tile received water.\[1, 1\]  
* **Structural Auditing:** The unit incorporates a Bosch BNO055 9-Axis Inertial Measurement Unit (IMU) to continuously monitor vibration harmonics and detect dangerous "crabbing".1

### **4.2 Hydraulic Auditing: Transit-Time Ultrasonic Flow Sensors**

The primary engine for water rights verification is the PMT's hydraulic flow stack, utilizing a Badger Meter TFX-5000 ultrasonic transit-time transducer pair.1

* **Benefits:** This "cut-less" clamp-on design creates zero hydraulic drag, preserving the well pump's energy efficiency.1  
* **Legal Defensibility:** The specification achieves ![][image2] flow accuracy, matching the "Gold Standard" for State Engineer reporting.1 This non-invasive, certified flow data will serve as the core empirical evidence presented at the upcoming June 2026 water court trial.

### **4.3 Lateral Root-Zone (LRZ) and Vertical Field Anchors (VFA)**

* **The \"Invisible Presence\" Architecture:** Both units utilize a two-phase seasonal deployment model. Permanent UV-Stabilized Rigid Polyvinyl Chloride (PVC) outer shells remain buried flush with the soil surface year-round, while internal \"Alpha-Sleds\" (constructed of high-temperature CPVC) containing the electronics are extracted pre-harvest.\\[1, 1\\]  
* **The Proxy Method:** The sensors utilize an advanced non-contact capacitive method, shooting high-frequency dielectric fields through the 50mm sled wall and across a \+5 psi dry nitrogen gap directly into the soil.\[1, 1\]

## ---

**5\. Thermodynamics and Material Science Stress-Testing**

Equipment deployed in the San Luis Valley must endure 100mph wind gusts, severe alkali dust storms, and massive thermal gradients.\[1, 1\]

### **5.1 Enclosure Material Science: UV Degradation at High Altitude**

FarmSense explicitly mandates NEMA 4X-rated Polycarbonate enclosures (e.g., Polycase WP-21F and ML Series).\[1, 1, 1\]

* **Engineering Rationale:** Polycarbonate provides superior impact resistance, acts as an electrical insulator, is RF-transparent, and will not rust when exposed to high-sulfur alkali dust.\[1, 1\]  
* **The UV Lifespan Flaw:** At 8,000 feet, intense ultraviolet radiation induces rapid photodegradation in unshielded polymers. To achieve the stated "40-year structural lifespan," the enclosures must be treated with industrial fluoropolymer coatings (like PVDF) or specific UV inhibitors to prevent embrittlement.

### **5.2 Battery Thermodynamics in Sub-Zero Climates**

* **LiFePO4 Active Heating (PFA and DHU):** The DHU and PFA utilize LiFePO4 banks with active heating elements (a 5W Kapton heater in the PFA).\[1, 1\] The thermal loss profile of the 8mm PE closed-cell foam insulation must be optimized to ensure the heater does not drain the battery during a prolonged \-30°F "Polar Vortex".1  
* **LiSOCl2 Passivation (PMT):** The PMT utilizes a Saft LS14500 Lithium Thionyl Chloride (LiSOCl2) primary cell to keep the GNSS Real-Time Clock alive under the snow.1 The design must incorporate an HPC (Hybrid Pulse Capacitor) to handle instantaneous pulse currents and bypass LiSOCl2 "passivation" upon spring start-up.

## ---

**6\. Phased Deployment Strategy**

The FarmSense rollout is structured around a highly targeted, phased deployment methodology to ensure rigorous empirical validation before maximum scale.

### **6.1 Phase 1: The 2-Field Pilot (CSU SLV RC)**

The initial deployment is a targeted, 2-field pilot project located in Center, Colorado, executed in primary collaboration with the CSU San Luis Valley Research Center (SLV RC).

By focusing initial resources on this high-fidelity pilot, FarmSense will immediately provide the court and regulators with the exact empirical ground truth needed—specifically the highly accurate hydraulic data from the PMTs and the secure ledger from the District Hubs. This establishes the critical proof-of-concept for the hardware, telemetry, and water data sovereignty prior to the massive 1,280-field Subdistrict 1 rollout.

## ---

**7\. Non-Dilutive Capital & Global Infrastructure Strategy**

The phased deployment strategy completely bypasses the need for traditional, dilutive Series A venture capital. The FarmSense architecture—functioning as a secure, decentralized network generating immutable water data—aligns perfectly with premier philanthropic and defense funding mechanisms for 2026\.

### **7.1 Department of Defense (Federal) & ARPA-E**

FarmSense possesses immense dual-use potential as a highly resilient, ruggedized environmental sensing network capable of operating in contested environments. This directly aligns with the Federal's Joint All-Domain Command and Control (Inter-agency) network priorities.

* **Value Proposition:** FarmSense's ability to execute localized "Reflex Logic" without relying on external cloud connectivity, its 128-bit AES encryption, and its FHSS interference mitigation provide the exact secure edge-computing data transport the military requires.

### **7.2 The Bill & Melinda Gates Foundation**

At COP30, the Gates Foundation pledged $1.4 billion (2026-2029) to support innovations helping smallholder farmers adapt to climate change, with a specific focus on "digital advisory services" and tailored data-driven planting decisions.

* **Value Proposition:** FarmSense acts as an automated \"digital agronomist.\" By validating the ultra-lean $59.30 unit cost for the LRZ scout 1, FarmSense proves that advanced, deterministic resource optimization can be democratized and scaled affordably to smallholder farms in sub-Saharan Africa and South Asia.

### **7.3 "Nobel Equivalent" Global Prizes**

The pilot's focus on generating legally defensible, basin-saving metrics qualifies it for the highest tiers of global recognition:

* **The World Food Prize:** A $500,000 award recognizing individual achievements that advance human development by improving food availability. Nominations require absolute, quantifiable proof of impact, which the June 2026 pilot is designed to capture.  
* **The Earthshot Prize:** A £1 million award (focusing on categories like "Fix Our Climate" and "Protect and Restore Nature"). Solutions must be "in-field" and at a "tipping point" for scaling globally over the next five years. The SLV pilot provides the exact deployment maturity required.

## ---

**8\. Software-Driven Feature Expansion and Privacy Architecture**

To drastically improve the platform's feature set and functionality without increasing hardware capital expenditure, FarmSense leverages the massive computational overhead already engineered into its edge devices (the PFA's ESP32-S3, the DHU's Nvidia Jetson Orin Nano, and the RSS's Threadripper cluster).

### **8.1 Zero-CapEx Edge Enhancements**

* **Predictive Maintenance via Current Harmonic Analysis (PFA):** Using the existing non-invasive 400A CT Clamps, the PFA can deploy machine learning to analyze the well pump's energy signature (vibration, torque ripple). This "short-horizon forecasting" elevates the PFA into an enterprise-grade predictive maintenance tool, detecting cavitation or bearing wear before a $20,000 motor burnout occurs.  
* **Machine-Learning Kriging (Zo Engine):** The 1m Enterprise resolution is enhanced by integrating k-means clustering algorithms that combine the sparse proximal sensor data with high-frequency satellite data (Landsat/Sentinel-2), boosting mapping accuracy without adding physical sensors.  
* **Blockchain Water Trading Ledger (DHU):** The DHU's 2TB NVMe SSD can be leveraged via software to run an alliance-chain blockchain utilizing a practical Byzantine fault tolerance (PBFT) consensus mechanism. This actively aligns the "Black Box" to serve as a secure, decentralized agricultural water rights trading platform for neighboring farmers.  
* **Federal "Federated Data Fabric" Adapters:** To secure military grants, software adapters can be deployed that format the environmental data gathered by the network into military-standard communication protocols, feeding directly into the Federal's Joint All-Domain Command and Control (Inter-agency) network priorities.

### **8.2 Dual-Layer Spatial Privacy and Federated Learning**

To ensure absolute farmer operator trust and data sovereignty, the network architecture is strictly bifurcated to comply with and exceed the Colorado Privacy Act, which legally classifies precise geolocation data (GPS coordinates within a 1,850-foot radius) as \"sensitive data.\"

* **The Internal Legal Ledger (Absolute Precision):** Exact, unabridged GPS coordinates are strictly mandated for the localized District Hub "Black Box." This data is cryptographically locked, cannot be used, seen, or modified by anyone but the account user and the core algorithms, and exists solely to defend water rights as empirical evidence in Water Court.  
* **Contextual Anonymization for Cloud & Federated Learning:** When data is utilized for broader analytics, research sharing, or Federated Learning (where DHUs train localized ML models at the edge and only send parameter updates back to the RSS), the system applies "contextual anonymization." This adds algorithmic spatial noise or aggregates points into larger regional grids, preserving the overall hydrologic and ET trends for the region while successfully masking the specific location and identity of the individual farmer.

## ---

**9\. Advanced Software & Dual-Use Military Capabilities**

To solidify the FarmSense architecture for premier global infrastructure grants and defense funding, the following advanced capabilities and zero-cost software frameworks are integrated into the deployment roadmap:

* **LPI/LPD Positioning (FHSS):** The Lateral Root-Zone (LRZ) network's existing Frequency-Hopping Spread Spectrum (FHSS) architecture should be explicitly pitched as a "Low Probability of Intercept" (LPI) and "Low Probability of Detection" (LPD) asset. In tactical scenarios, rapidly switching frequencies makes the sensor grid highly resistant to adversarial jamming and interception.  
* **Rapid Deployment Housings:** To dramatically expand the Federal dual-use appeal, the LRZ physical housing concept can be adapted for high-altitude (HALO) or low-orbit kinetic deployment. By engineering the 18-inch PVC shell to withstand high-G impacts and utilizing the existing 15-degree friction molded tapered driving tip, the sensors could act as kinetic penetrators that are air-dropped to autonomously bury themselves flush with the ground. This fulfills military requirements for covert, rapidly deployable unattended ground sensor (UGS) networks in contested environments.  
* **Fully Homomorphic Encryption (FHE):** Upgrade the Regional Superstation (RSS) from standard AES encryption to Fully Homomorphic Encryption (FHE). FHE is a groundbreaking cryptographic technology that allows the Zo engine's complex Kriging algorithms to be executed directly on encrypted data without ever decrypting it first. This ensures absolute data confidentiality during processing.  
* **Automated GLOBALG.A.P. Compliance:** Develop a software module that translates the platform's certified flow and moisture data into automated GLOBALG.A.P. compliance reports. This allows farmers to effortlessly prove sustainable water management to international standards, unlocking premium supply chain markets globally.

## ---

**10\. Immediate Strategic Roadmap**

The FarmSense platform represents a highly sophisticated synthesis of edge computing and agronomic science. To lock in non-dilutive global funding targets and successfully define the June 2026 Water Court trial parameters, the following tactical milestones are executed:

1. **Execute the 2-Field Pilot Strategy:** Deploy the finalized hardware stack (2 PMTs, 2 PFAs, 2 VFAs, and 20 LRZs) at the CSU SLV Research Center. This guarantees independent academic validation of the MAD framework.
2. **Scale Optimized Telemetry:** The DHU (V1.1) is deployed with an industrial 900MHz LoRaWAN gateway, while the PMT operates as the primary 2.4GHz receiver for the PFA safety nodes, optimizing processing efficiency across the field network.  
3. **Target the Federal Federal ESG Deadline:** Leverage the system's dual-use LPI/LPD architecture to submit the final proposal for the Federal's Environmental Security Technology Certification Program (Federal ESG) "Water Resilience on Federal Installations" grant.  
4. **Implement Software-Driven Feature Expansions:** Activate Current Harmonic Analysis on the PFA edge processors for predictive maintenance, and enforce the Dual-Layer Spatial Privacy architecture for absolute ledger protection.  
5. **Validate Thermodynamic Hardware:** Utilize the published thermal loss metrics confirming the 40Ah LiFePO4 battery securely runs the 5W Kapton heater through \-30°F events. The PMT's LiSOCl2 battery, integrated with an HPC, ensures relentless GNSS "Warm Starts."  
6. **Non-Dilutive Philanthropic Funding Integration:** The continuous empirical data generated from the 2-field pilot directly powers the finalized Bureau of Reclamation WaterSMART grants and anchors the current architecture's nominations for the Earthshot and World Food Prizes.

#### **Works cited**

1. FarmSense Research.pdf  
2. Study warns of 'existential water crisis' in the Rio Grande Basin - Alamosa Citizen, accessed February 22, 2026, [https://www.alamosacitizen.com/study-warns-of-existential-water-crisis-in-the-rio-grande-basin/](https://www.alamosacitizen.com/study-warns-of-existential-water-crisis-in-the-rio-grande-basin/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAYCAYAAAB5j+RNAAABbklEQVR4Xu3WyyuEURgG8DeXEOUuZWGjFDuF5L4dzYqFlEsIpSxQcikiNiJZsxrZjJ1r2VjZsLP2R/gPPK/znOZ0TJnC55R56rd43/PNzDtnvu+bTySbf5o9vxFKCmHHb4aSThjwm6Ek6OFWoMRvRpkC2KYriDlr9mJYpDtnLZKsQiXdwjjk0y6PaaVn1pEl6OHqoZzeoBr6yF4MdthD1ut0zvonsgWXflMzSnZxk8pYL1A76zGaYP2d9NIadHhrH5mlR8gTs0N2l5phmmzOqIr1FA1L6os0QIWY00YNwg3kkKYNHuhEzK3rU4IeTj9EvcIT3FMX1DnHaXLhmjQtYl6jJmGIiiEh5lRQRWKG83NBekF+GX1je06lSzdskO7qCCyRG/1ffnHqfjE39SaysRuRUWagkdJFd/OYeqBWzGuU1jqE0l9imT01D0eSuhNoSiFJGSXo4fb9xi+lBuIwR0HlAE7FPFj86cNFNpHmHWVcVXXUvM2RAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAXCAYAAABefIz9AAAB5ElEQVR4Xu3WvUscR4zG8TFKEgtNkcoqRkFBjRBNERstIr5iBCuLgCRWaiJ2kiJooYiSBFEEBbGxEUsrtdP8DYJvkMJCNIGUAUX0ebLPcHc/9u68gyAe+4UPhzN7sLvuzpxzUVFRUakrhFmZgW7IE98TGTPjaftsB5L0SDqhxsylqgo24LssQ1nCEc59gxYpgl3olSGYgAPp0XduXc5f4Fc7ENIILMoVvEmcDq1ADuFl3Phz2HOxG8ZO4JmwJX363sKCZBzvaiZduuBOp6tJ/toJdAatwvahVNi0Plk57MBjybj/dYH9cm4n0JELHj1i89AlfETHXWyR2YRKHZdVOXGBT+FLEnyh7RjxO2S7gGY7GNKgnNoJFzySXNz8AsdtggsNzUEJDMt7HfNJpqBOY7cqm/+gf3dS9U5+2wl0DAMSVgWsCOOi5vdJxr0yX9IWXaCJF9hmB0N6LdxWHpi5Py446bDthie9BsXCuD35R559gGpJWzYX2G4HXbBXkT9pv0j8hFf+IBcsGL/godi4LzeYMZ7jR2F8L1/Iv1ItMj9Cxuwi0weTcg3rccf5zXpbVvW3rxa2XLBSEvc0/ta0Ncq4GWcdLvZLiHExSnhEc/4C70N8rynZSft9cxTqzVxUVNQddgOZw4wQIvG8IAAAAABJRU5ErkJggg==>

<div style="page-break-after: always;"></div>


# Long-Term Roadmap: FarmSense as Sovereign Water Infrastructure

Vision: To establish FarmSense as the definitive "Global Water Ledger"—the legally recognized,

cryptographically secure, and scientifically absolute source of truth for water management,

recognized by state engineers and national governments worldwide.

1. The Sovereign Value Proposition

FarmSense provides the official "Water Balance Sheet" for nations, enabling international treaty

compliance, climate resilience enforcement, and the legal verification of water rights. By

integrating high-resolution spatial data with hardware-level cryptographic signing, FarmSense

becomes a critical national asset—a "Zero-Trust" infrastructure that converts physical water

movement into immutable legal evidence. This system moves beyond simple monitoring; it

provides the empirical foundation for national security interests related to food stability and

aquifer preservation.

1. Strategic Objectives for "Gold Standard" Status

A. Regulatory Capture & State Recognition (Year 1–2)

DWR (Division of Water Resources) Integration: Partner with state agencies to accept

FarmSense data as "Rule-Compliant" for groundwater reporting. This involves automating

the submittal process so that a FarmSense-enabled well is "Presumed Compliant,"

drastically reducing the administrative overhead for state engineering offices.

The State Auditor Portal: A specialized UI role for regulatory bodies providing basin-wide

aggregated depletion data while maintaining producer privacy. This portal allows for

"Macro-Management," where a State Engineer can observe real-time aquifer draw-down

across an entire valley and issue "Reflex" pumping limits to the entire mesh during

emergency drought conditions.

Defensible Science: Formalizing the Zo Scientist Kriging models as the legal standard for

Consumptive Use (CU) calculations. By replacing traditional, static formulas (like Blaney

Criddle) with real-time, multi-layered profiling (soil moisture, atmospheric vapor pressure,

and multispectral canopy health), FarmSense provides a scientifically superior record that

can withstand the highest levels of judicial scrutiny in Water Court.

B. Cryptographic Audit Trail & The Forensic Water Record (Year 2–3)

Hardware Signing: Every data packet from a Vertical Field Anchor (VFA) or Pump Sentry

(PFA) is cryptographically signed at the hardware level using Secure Element (SE) chips.

<https://gemini.google.com/app/625852be44d61d17?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&…> 1/3


This ensures that the data is untampered from the moment it leaves the sensor, effectively

"fingerprinting" every gallon of water measured.

Immutable Ledger: Creates an unbreakable chain of custody from the well-head to the

Oracle Vault. In Water Court, this data is "Self-Authenticating," removing the need for

manual inspections or witness testimony. This "Forensic Record" allows for historical re

play, where a state can audit the exact hydrological state of a field from years prior to

resolve property or water right disputes with absolute certainty.

C. The "Resolution Pop" Economic Engine

The Compliance Hook: Governments provide the 50m Free Tier to ensure 100% market

participation. This "Baseline Ledger" gives the state a low-resolution but complete picture

of the regional water balance, effectively mapping the "Macro-Truth" of the basin.

The Enterprise Revenue & Verification: Private entities, corporate sustainability officers,

and enforcement agencies utilize the 1m Enterprise "Total Truth" resolution. This tier is

used to verify ESG goals, investigate specific instances of illegal depletion, and manage

high-value water transfers. The "Resolution Pop" creates a psychological and economic

funnel where the need for "Micro-Truth" drives a high-margin revenue stream that

subsidizes the state's baseline infrastructure.

1. Scaling the Sovereign Mesh & Geopolitical Strategy

Stage Milestone Infrastructure & Geopolitical Goal

Stabilize the Monte Vista Logistics Epicenter and the first Regional
Superstation (RSS). Establish the first "Rule-Compliant" digital
subdistrict.

Deploy 15+ RSS units across the Front Range and Western Slope;
achieve full DWR status. Become the state’s primary tool for
Colorado River Compact compliance.

Roll out the "Cloneable Command Center" to the High Plains
Aquifer. Standardize "Federal Water Credits" based on FarmSenseverified depletions.

Deploy RSS nodes in Australia and Brazil. Act as the neutral, thirdparty ledger for trans-boundary water conflicts and UN Water
Security initiatives.

Regional
Master

State
Standard

National
Layer

Sovereign
Global

100% of SLV
Subdistrict 1

Colorado
Statewide
Adoption

USDA/USGS
Partnership

International G2G
Treaties

1. Technical Architecture for Sovereignty

<https://gemini.google.com/app/625852be44d61d17?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&…> 2/3


The Librarian/Scientist Split: By keeping storage (Oracle) and math (Zo) separate, national

governments can audit the science without compromising the security of the data vault. If

the state updates its legal definition of "Consumptive Use," they simply update the Zo

Worksheet, and the entire historical record is re-calculated instantly without altering the

raw evidence.

Worksheet Autonomy & The Reflex Logic: The Worksheet Reflex ensures that even during

a national cyber-event or total internet blackout, the local "Reflex" logic—governing pump

actuation and depletion limits—continues to function at the edge (Hub/VFA level). This

"Hydraulic Autonomy" prevents catastrophic aquifer damage during periods of civil or

digital instability.

Decentralized Resilience: Each RSS (Regional Superstation) is a peer. If a central node is

offline, the decentralized mesh continues to process and synchronize the water ledger for

their respective regions. This peer-to-peer verification prevents any single point of failure

from compromising the national water record.

1. Final Valuation & Socio-Economic Implications

As the "Official Data Source," FarmSense becomes a mandatory utility. By underwriting the

value of the land through verified water rights, the network moves from a management tool to a

financial clearinghouse.

Market Stability: Land value becomes "Intrinsic + Verified Water," making the agricultural

real estate market more transparent and resilient to climate shocks.

The Global Standard: FarmSense eventually becomes a prerequisite for agricultural

exports; international buyers will demand a "FarmSense Audit" to prove that the crops were

grown within sustainable water envelopes.

A th i d f l t t t i i l t ti

<https://gemini.google.com/app/625852be44d61d17?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&…> 3/3

<div style="page-break-after: always;"></div>


# FarmSense: Technical Project Overview & Research Validation Guide

This document provides an exhaustive technical summary of the FarmSense project, specifically

curated for scientific validation and comprehensive deployment planning by

research institutions, hydrologists, and agricultural stakeholders.

## 1. Project Overview & Current Scope

FarmSense is a high-resolution, multi-modal agricultural intelligence and water-resource

management platform. Its primary mission is the stabilization and long-term preservation of the

San Luis Valley (SLV) Aquifer—a critical, semi-arid water resource currently facing systemic

depletion due to prolonged drought and historical over-extraction.

Project Status: Shovel-Ready: The project has successfully finalized its high-level

architectural design, backend software framework, and data ingestion pipelines. It is

currently positioned as a "shovel-ready" pilot. The immediate critical path to activation is

securing funding for the fabrication, assembly, and field installation of the physical sensor

hardware.

Planned Deployment: CSU SLV RC Pilot: A high-density 2-field pilot phase located in

Center, Colorado. This deployment is designed in direct partnership with the Colorado

State University San Luis Valley Research Center (CSU SLV RC). This partnership

allows FarmSense to leverage existing research-grade lysimeters, weather stations, and

historical soil records for rigorous ground-truth calibration.

Primary Objective: Precision Hydrology: The goal is to move beyond "estimated"

irrigation and achieve "Precision Hydrology." By correlating real-time sub-surface

telemetry with atmospheric demand, the project aims to eliminate the "irrigation safety

margin"—the common practice of over-watering by 10-20% to avoid localized stress. This

optimization is intended to sustain agricultural productivity and the local tax base without

the need for mandatory fallowing or the aggressive closure of historic wells.

Target Area: SLV Subdistrict 1: The initial scaling focus is Subdistrict 1 (approx. 166,000

acres), a high-priority zone for the Rio Grande Water Conservation District. Success in this

pilot is intended to serve as a blueprint for the entire Rio Grande Basin.

## 2. System Architecture & Component Hierarchy

A. Backend Intelligence (Cloud Layer)

<https://gemini.google.com/app/9fe738dfc0a70bee> 1/5


Map Servers (Distributed Data Library): These serve as the system’s "Long-Term

Memory." They consist of distributed databases storing multi-temporal, multi-spectral

satellite imagery, historical yield data, and high-resolution topographical maps. This layer

handles the continuous ingestion of massive spatial datasets from sources like Sentinel-2

(European Space Agency) and Landsat (NASA), performing pre-processing tasks such as

cloud masking and atmospheric correction.

Spatial Query Engine (SQE): Acting as the "Librarian," this specialized middleware

performs high-speed lookups across tiered spatial datasets. When a specific field or Local

Resource Zone (LRZ) requires analysis, the SQE extracts localized variables—elevation,

slope, aspect, and NDVI (Normalized Difference Vegetation Index)—at precise Lat/Long

coordinates. These are packaged into lightweight JSON arrays, allowing the compute layer

to process complex spatial relationships without the overhead of full raster manipulation.

Core Compute Server (The "Scientist"): This is the central intelligence of FarmSense. It

utilizes a custom stack of math libraries to reconcile remote sensing data with sparse, in

ground sensor telemetry.

Bayesian Priors: The system uses Bayesian logic to establish initial probability

distributions of soil moisture. By using historical data and Soil Functional Domain (SFD)

profiles as "priors," the system can make high-probability estimates even when real

time sensor data is intermittent.

Kriging Trends & Geostatistics: To move from point-based sensor data to a

continuous field-wide map, the server employs Kriging. This method accounts for the

spatial autocorrelation of soil moisture, allowing the system to "fill the gaps" between

sensors with a statistically valid confidence interval.

B. Hardware & Infrastructure (Field Layer)

Regional Superstations: High-capacity, elevated nodes providing the long-range

backhaul for the entire subdistrict. They manage the mesh network and provide redundant

internet gateways, ensuring that field data reaches the cloud even if local cellular towers

are congested or fail.

District Hubs (The Edge Compute Layer): These are the "Local Commanders."

Positioned at the field edge (typically near the pivot point), these units possess significant

local processing power. They receive encrypted data from relays and store the localized

"Worksheet." Crucially, the Hub is designed for autonomous operation; it can execute

irrigation logic for days or weeks without cloud connectivity, syncing back once a

connection is re-established.

Field Relays: Signal aggregators that utilize low-power, long-range (LoRa) radio protocols

to "wake up" sensors, collect their data, and hop the signal back to the District Hub. This

<https://gemini.google.com/app/9fe738dfc0a70bee> 2/5


multi-hop architecture allows the system to cover massive circular fields (120+ acres)

without requiring high-power batteries in the sensors themselves.

Sensors (The Sensor Grid): Designed as low-cost, "dumb" transmission units to facilitate

high-density deployment:

Vertical Profiling Sensors: Multi-depth probes measuring soil moisture tension (kPa),

temperature, and Electrical Conductivity (EC) across the root zone (typically at 10cm,

30cm, 60cm, and 90cm intervals).

Horizontal Profiling Sensors: Specialized units detecting lateral moisture movement

and moisture "fronts," which are critical for identifying drainage issues or sub-surface

leaching.

Master Nails: High-precision reference sensors per field, often co-located with PFA

sample sites, used to calibrate the cheaper, high-density sensor grid.

## 3. The SFD (Soil Functional Domain) Framework

Scientific validation is achieved through the SFD framework, which translates raw data into

actionable agronomic management zones.

VFA (Visual Field Analysis): The macroscopic mapping of field variability. This includes

using satellite-derived NDVI to identify historical vigor patterns, as well as LIDAR-based

Digital Elevation Models (DEM) to identify low spots where water naturally accumulates or

ridges where run-off is likely.

PFA (Physicochemical Field Analysis): This is the mapping of the soil’s "hardware." By

analyzing Cation Exchange Capacity (CEC), pH, organic matter, and texture (sand/silt/clay

ratios), the system understands the soil's hydraulic conductivity and water-holding

capacity. Different PFAs require different irrigation "curves."

PMT / +CSA (Profile Management Tools / Core Sample Analysis): This is the critical

"Ground Truth" phase. Physical core samples are extracted at various depths and sent to

the CSU SLV RC labs. The results are used to "fingerprint" the specific soil mineralogy,

allowing the digital sensor grid to be calibrated specifically to the unique properties of that

exact field.

LRZ (Local Resource Zones): The operational output. The field is subdivided into zones

that behave similarly from a hydraulic perspective. Instead of one irrigation rate for the

whole field, the pivot or drip system receives a prescription tailored to each LRZ,

maximizing water efficiency.

## 4. Operational Logic & Data Integration

A. Data Sources

<https://gemini.google.com/app/9fe738dfc0a70bee> 3/5


Satellite APIs: Automated pipelines for Sentinel-2 and Landsat imagery, providing 10m to

80m resolution multi-spectral data for biomass monitoring.

Weather APIs: Integration with global NOAA datasets and regional IBM/The Weather

Company forecasts to predict short-term Evapotranspiration (ET) rates.

Research-Grade Local Weather Stations: Integration with on-site stations at CSU SLV RC

to obtain localized wind speed, solar radiation, and humidity. These variables are essential

for calculating the Penman-Monteith ET0, which serves as the "demand" side of the water

balance equation.

Virtual Sensor Grid: Through Kriging interpolation, the system generates a "virtual" data

point for every square meter of the field. This allows for a 1-meter resolution map even with

a sensor spacing of 10-15 acres.

B. The Worksheet Cycle

1. Ingestion & Fusion: The Map Servers and Query Engine synthesize all atmospheric and

spatial data.

1. Model Generation: The Core Compute Server runs the Bayesian/Kriging models,

comparing current sub-surface telemetry against the existing Soil Variability Maps.

1. Refinement: Following an irrigation event or significant rainfall, the system observes the

"wetting front" movement. If the reality (sensor data) differs from the model (prediction),

the Virtual Sensor Grid is automatically updated to reflect the new soil behavior (e.g.,

faster-than-expected drainage).

1. OTA Update: An optimized, machine-readable "Worksheet" is sent via Over-The-Air (OTA)

update to the District Hub.

1. Local Execution: The Hub uses the Worksheet to calculate the exact gallonage needed for

each LRZ. This local calculation ensures the farmer has an auditable, real-time record of

water usage that is accurate to the gallon.

## 5. Funding & Sustainability

Primary Funding Partner: The project is currently supported by the LOR Foundation, an

organization dedicated to enhancing the quality of life and economic resilience in rural

mountain communities. Their focus is specifically on the intersection of water conservation

and agricultural viability.

Immediate Capital Need: The project is currently seeking funding specifically for the

construction, assembly, and deployment of the sensor hardware for the 2-field CSU pilot.

This hardware procurement directly drives the transition from a digital design to an operational, revenue-generating pilot.

<https://gemini.google.com/app/9fe738dfc0a70bee> 4/5


Commercial Model: Data-as-a-Service (DaaS):

Free (50m): Community-level insights for general trend monitoring.

Basic (20m): Standard precision for small-to-medium operations.

Pro (10m): High-resolution analytics for commercial growers looking to maximize yield

and minimize input costs.

Enterprise (1m): Research-grade resolution, full SFD integration, and direct API access

for integration into existing farm management software.

## 6. Scientific Validation & Environmental Hardening

Hardware Fabrication & Deployment: The software architecture and "Core Compute" models are actively ingesting physical sensor data to generate the first real-world "Worksheets" for the CSU SLV pilot.

Scientific Calibration (Soil Tension vs. Volumetric Content): The system correlates soil moisture tension (what the plant feels) with volumetric water content (what the sensor reads) across the highly variable profiles of the SLV. This continuous Core Sample validation actively reduces the "uncertainty envelope" of the predictive models.

Extreme Environmental Hardening: The SLV is characterized by extreme temperature swings (-40°C to +35°C) and high soil alkalinity. Hardware, including LiSOCl2 batteries and PVC sensor casings, has been rigorously engineered to sustain these conditions across multi-year lifecycles.

Computational Scaling Infrastructure: Maintaining a 1-meter resolution (Enterprise level) across Subdistrict 1 (160,000 acres) is achieved via distributed parallel processing within the Core Compute Server (Zo).

# Subdistrict 1 Market Intelligence: 2024–2025

**Source:** Colorado Division of Water Resources / Rio Grande Water Conservation District (RGWCD) operational data.

This document constitutes the authoritative statistical grounding for all FarmSense market sizing, TAM calculations, and grant proposal language. All references to "Subdistrict 1 scale" in project documentation should trace back to these figures.

---

## 1. Infrastructure Footprint

| Metric | Value |
| --- | --- |
| **Total Irrigation Wells** | **3,617** active wells |
| **Total Irrigated Acreage** | ~**160,000 acres** |
| **Estimated Active Pivot Count** | **~1,250 – 1,300** center-pivot fields |
| **Avg. Field Size** | **126 acres** per pivot |

The 126-acre average is not arbitrary. It is the precise geometric result of fitting a 1,300-foot radius circular pivot arm into a standard 160-acre Public Land Survey System (PLSS) "quarter-section," leaving the four corners unirrigated or fallow.

---

## 2. Field Size Distribution

| Field Size Category | Typical Acreage | District Share |
| --- | --- | --- |
| **Standard (Full Circle)** | ~126 Acres | **~72%** |
| **Double / Large Units** | ~252 Acres | **~8%** |
| **Partial (Half-Circle)** | ~63 Acres | **~15%** |
| **Small / Specialty** | ~31 – 40 Acres | **~5%** |

> **Engineering Note:** The 8% Double/Large Unit figure is particularly significant for the FarmSense hardware BOM. These fields represent a likely requirement for a Corner-Swing Auditor (CSA) dual-PMT configuration, increasing the per-field deployment cost from $1,112 to $2,224.

---

## 3. Regulatory & Water Crisis Context

* **Closed Basin Mandate:** Subdistrict 1 is mandated to recover **170,000 acre-feet** of groundwater by **2031**.
* **Active Fallowing Programs:** The active pivot count is deliberately declining as the RGWCD compensates farmers to permanently retire "wet" acres (e.g., CREP). The ~1,250–1,300 figure represents the *current floor*, not a static target.
* **Aerial Depletion Rate:** The unconfined aquifer previously depleted at ~89,000 AF/year.

---

## 4. Crop Mix

Approximately **85%** of Subdistrict 1 fields grow three primary crops:

* **Potatoes** (High ET demand: 4.5 – 7.7 mm/day)
* **Barley** (Primary supply to Coors/Molson Brewery, Alamosa)
* **Alfalfa** (Extremely high water use; primary fallowing target)

---

## 5. FarmSense TAM Calculations (Subdistrict 1)

Using the conservative pivot estimate of **1,270 pivots** (midpoint of 1,250–1,300 range):

### Per-Pivot Annual SaaS Revenue (Enterprise Tier at $499/month)

`1,270 pivots × $5,988/year = $7,604,760 ARR`

### Per-Pivot Hardware Deployment (1x Standard PMT SFD)

`1,270 × ( $1,112 PMT + $750 PFA + $158.20 VFA + ~$593 LRZ×10 ) = ~$3.32M one-time hardware market`

### Annual Water Fee Savings Unlocked (20% reduction @ $500/AF)

Standard pivot: 126 acres × ~2 AF/acre/season = 252 AF. 20% savings = **50.4 AF/pivot/year**.
`1,270 pivots × 50.4 AF × $500 = $31.9M in annual regulatory fees returned to farmers`

---

*This document supersedes earlier population estimates used in prior FarmSense feasibility documents, which referenced 166,000 acres or 130-acre average fields.*

<div style="page-break-after: always;"></div>

<div style="page-break-after: always;"></div>

# PART II: GRANT FUNDING STRATEGY

# Master Specification: Grant Funding & Financial Strategy V1.0

**Role**: 100% Non-Dilutive Capital Sourcing | **Focus**: AgTech, Water Conservation, & Infrastructure

To fund FarmSense hardware, deployment, and ongoing operations 100% through grants, the strategy stacks "Development & Innovation" grants with "Implementation & Conservation" grants.

## 1. Federal Grants (The Heavy Lifters)

### USDA NRCS: Conservation Innovation Grants (CIG)

* **Focus:** Development and adoption of innovative conservation approaches and technologies.
* **Relevance:** FarmSense aligns perfectly with CIG's focus on water management, irrigation efficiency, and aquifer recovery.
* **Funding Profile:** Up to $2M+ for National Classic; requires 1:1 match (often via in-kind contributions).

### Bureau of Reclamation (BoR): WaterSMART Grants

* **Focus:** Securing and managing water supplies in the American West.
* **Programs of Interest:**
  * **Applied Science Grants:** (Up to $300K) Funds tools and modeling for water managers.
  * **Water and Energy Efficiency Grants:** Funds projects conserving water.

### Federal Federal ESG: Installation Energy and Water (IEW)

* **Focus:** Demonstrating innovative energy and water technologies on military installations.
* **Relevance:** Dual-use AES-256 / FHSS mesh network and LPI/LPD characteristics.
* **Funding Profile:** $500K to $1.5M+, no strict cost-share required for private industry.

### National Science Foundation (NSF): SBIR/STTR (AgTech & Environment)

* **Focus:** Deep-tech startups conducting R&D with high commercial potential.
* **Funding Profile:** Phase I ($275K); Phase II ($1M+). Non-dilutive, taking $0 equity.

## 2. State & Regional Grants (Colorado Specific)

### Colorado Water Conservation Board (CWCB): Water Plan Grants

* **Focus:** Implementing the Colorado Water Plan.
* **Funding Profile:** ~$37.7M available. Targeting Agriculture, Conservation, and Engagement & Innovation categories.

### Colorado Department of Agriculture (CDA): ACRE3 Program

* **Focus:** Advancing Renewable Energy and Energy Efficiency (ACRE3) in agriculture.
* **Relevance:** Reduces irrigation pumping energy through VFD monitoring and soft-stops.

## 3. Private, Philanthropic & AgTech Innovation Grants

* **The Walton Family Foundation (Environment Program)**: Protecting water resources in the Colorado River Basin.
* **Foundation for Food & Agriculture Research (FFAR)**: Matching funds for research on water scarcity.
* **1% for the Planet / Corporate Sustainability Grants**: Supply chain sustainability for major crop buyers (e.g., Coors, Frito-Lay).

<div style="page-break-after: always;"></div>

# PART III: MASTER SPECIFICATIONS (HARDWARE)

# Master Specification: Aerial Fleet Strategy V1.3

Role: Multispectral Spatial Auditor & High-Resolution Data Anchor | Objective: 1m Enterprise

Resolution & "Resolution Pop" Revenue Funnel

The FarmSense Aerial Fleet serves as the critical "Spatial Bridge" in the SFD (Single Field

Deployment) architecture. While physical subsurface sensors (VFA and LRZ) provide absolute

"Deep Truth" at specific, geolocated pins, the aerial fleet provides the "Spatial Envelope"

required to interpolate the vast, unmonitored acreage between those pins. By capturing high

altitude multispectral data—specifically targeting the Red Edge and Near-Infrared bands—the

fleet provides the Zo Scientist Engine with the high-frequency spatial gradients needed to

transform discrete sensor pings into a continuous, hyper-accurate 1m-resolution "Digital Twin"

of the entire subdistrict.

The Strategic Convergence of Air and Earth: In the FarmSense ecosystem, drones are not

merely cameras; they are Remote Radiometric Calibration Tools. The LRZ mesh provides the

"Zero-Point" soil moisture and EC (Electrical Conductivity) calibration, while the aerial

multispectral imagery identifies the "Vegetative Expression" of that data. When Zo (the

Scientist) observes a dip in NDVI (Normalized Difference Vegetation Index) that correlates with a

specific dielectric shift at an LRZ node, it can then mathematically "anchor" that relationship

across every 1-meter tile of the field. This fusion eliminates the "Kriging Guesswork" common in

lower-resolution platforms, providing the empirical foundation for Subdistrict 1’s Digital Water

Ledger.

The "Resolution Pop" Sales Funnel: The drone fleet is the primary psychological and technical

driver for SaaS revenue growth. FarmSense operates on a "Resolution-as-a-Product" model,

where the UI itself acts as a constant sales representative:

The Interaction: When a Free (50m) or Basic (20m) tier user interacts with their interactive

field map, the interface is powered by satellite-level data.

The "Pop" Trigger: The moment the user attempts to zoom in to inspect a specific pivot

tower or a suspected nozzle leak, the high-fidelity aerial data triggers the "Resolution

Pop." * The Information Gap: Instead of a pixelated blur, the system generates a high

contrast, blurred-out preview of the 1m grid, overlaid with a "High-Resolution Audit

Available" call-to-action. This demonstrates the presence of hidden variability—such as

localized crop stress or nitrogen leaching—that the user is currently missing. By proving

the existence of an "unknown problem" via the 1m aerial ground-truth, the "Resolution

Pop" converts the fear of missing out (FOMO) into an Enterprise-tier subscription upgrade.

## 1. Phased Mobilization & Hardware Selection

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 1/5


The fleet scales in three distinct phases designed to align with Subdistrict 1's adoption curve,

regulatory milestones, and seasonal cash flow requirements.

Phase 0: Startup (The Proof of Concept)

Goal: Prove the end-to-end data pipeline—from multispectral capture at the field to Zo

Worksheet correlation in the RSS—on 2 pilot fields (approx. 500 acres total).

Unit: 1 DJI Mavic 3M (Multi-rotor). Selected for its portability and integrated

multispectral sensor suite.

Focus: Establishing the "Spectral-to-Soil" correlation baseline. This phase is founder

led to minimize overhead while refining the Kriging algorithms that power the 1m

"Resolution Pop."

Phase 1: Regional Scaling (The Rapid Support)

Goal: Support the first 100 high-value pivots (approx. 16,000 acres) with 10m Pro Tier

audits and initial 1m previews.

Fleet: 2 Fixed-wing (eBee Ag) for broad-acre mapping + 3 Multi-rotor (Mavic 3M) for

targeted audits.

Logistics: Deployment of portable RTK base stations at field edges to ensure sub-5cm

absolute geographic accuracy, ensuring that aerial pixels align perfectly with

subsurface sensor coordinates.

Phase 2: Full Automation (District-Wide Umbrella)

Goal: Achieving 150,000-acre subdistrict-wide coverage via automated Remote

Operation Centers (ROC).

Fleet: 4 Fixed-wing + 7 Multi-rotor.

Regulatory Horizon: Requires FAA Part 108 (BVLOS) waivers to allow automated

deployments directly from RSS hubs. The RSS container serves as the "Hangar" and

weather-shielded charging dock for these automated sorties, allowing the fleet to

respond to "Zo Detection Events" (e.g., a sudden pressure drop in a PFA) within

minutes.

## 2. Unit Roles & Agronomic Intelligence Logic

The fleet utilizes a "Macro-to-Micro" strategy, where high-speed fixed-wing units identify

regional stress patterns that multi-rotor units then investigate for "Resolution Pop" verification.

Fixed-Wing (AgEagle eBee Ag): Broad-Acre Auditor

Role: Temporal Baseline Creation and Regional Trend Analysis.

Capability: 90-minute endurance allows for mapping 1,200+ acres per flight at 400ft

AGL.

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 2/5


Logic: These units fly the entire subdistrict every 30 days to establish the "Seasonal

Baseline." They detect regional "Anomalies"—such as a subdistrict-wide dip in NDRE

(Normalized Difference Red Edge) that might indicate a regional pest outbreak or a

shifting water table—allowing the Zo Engine to prioritize which individual fields require

immediate subsurface sensor attention.

Multi-Rotor (DJI Mavic 3M): The Precision Diagnostic Tool

Role: Targeted "Resolution Pops," Irrigation Failure Audits, and Plant-Level Verification.

Capability: 0.7cm/pixel GSD (Ground Sample Distance) at 50m AGL.

Logic: Dispatched only when the Zo Engine detects anomalous variability between LRZ

scouts (e.g., Slot 10 is "dry" while Slot 18 is "wet," indicating a potential surface

compaction layer). These high-resolution sweeps provide the hyper-granular proof

needed for Enterprise-tier customers to see individual plant health and nozzle

performance. They are the "Closing Tool" for the Enterprise sales funnel.

## 3. Data Fusion: The Zo-Oracle Synergy

The true value of the Aerial Fleet is not in the images themselves, but in their integration within

the Regional Superstation (RSS) architecture.

Oracle (The Spatial Librarian): Oracle ingests drone-captured orthomosaics and stacks

them into a "Multilayered Data Cake." It aligns spectral indices (NDVI/NDRE) directly on top

of 1m DEM (Digital Elevation Models), soil texture maps, and historical yield data.

Zo (The Scientist): Zo uses the aerial data as a Spatial Prior. While the LRZ mesh might

have sensors 1,000 feet apart, the drone data provides the "Texture" between those

points. If the drone sees a strip of high NDVI between two sensors, Zo assumes the

moisture levels in that strip follow a similar gradient, allowing for the generation of 1m

resolution maps with >90% statistical confidence.

## 4. Phase 2 Financials & Operational Breakeven

To achieve 150,000-acre coverage, the fleet operates on a militarized budget with 3 FTE staff

members coordinating flights from the Monte Vista RSS.

Category Expense Description Estimated Cost

Hardware CAPEX 4x eBee Ag + 7x Mavic 3M + Spares $110,000

Support CAPEX RTK Ground Stations + Field Vehicles $26,500

Technical Labor 3 FTE (Lead Pilot + 2 Field Technicians) $280,000 (Annual)

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 3/5


Maintenance Hull Insurance + Component Overhauls $67,000 (Annual)

Cloud Compute Zo Server Multispectral Processing & Storage $32,500 (Annual)

CAPEX TOTAL Full Fleet Mobilization $136,500

MONTHLY OPEX Operational Run-Rate $31,625

## 5. Revenue Model: The Resolution Pop Impact

The model is designed to be profitable even at minimal adoption, with a massive ceiling for profit

as Enterprise Tier conversions scale through the "Resolution Pop" funnel.

Tier Rate Target Acreage Monthly Revenue

Basic (20m Res) $15/acre 1,500 acres $22,500

Enterprise (1m Res) $30/acre 400 acres $12,000

TOTAL REVENUE 1,900 acres $34,500

NET MONTHLY PROFIT $2,875

Economic Verdict: Breakeven is achieved by servicing just 1.3% of the total subdistrict

acreage (approx. 2,000 out of 150,000 acres) per month. This low threshold provides a

massive safety margin for expansion. Every Enterprise upgrade beyond the initial 400 acres

contributes directly to the bottom line, turning the drone fleet into a high-margin profit center

that actively fuels the entire FarmSense sales funnel.

## 6. Regulatory & Compliance Framework

Operating 11 drones across a 150,000-acre basin requires a robust compliance architecture to

ensure long-term "License to Operate."

Part 107 & BVLOS Path: All pilots are Part 107 certified. Phase 2 moves toward

autonomous flight under Part 108, utilizing the RSS and DHU towers as electronic "Visual

Observers" to maintain airspace safety during Beyond Visual Line of Sight operations.

Privacy & Data Security: FarmSense maintains a strict "No-Fly" registry for adjacent

landowners. Aerial data is surgically cropped to the field boundaries defined in the Oracle

Map Manager, ensuring that only paid subscribers have access to their specific

multispectral insights, while ensuring the "Digital Water Ledger" remains a secure, private

asset for the district.

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 4/5


<https://gemini.google.com/app/7d9f7fc3aa518d8b> 5/5

<div style="page-break-after: always;"></div>

# Master Specification: Corner-Swing Auditor (CSA) V1.0

Role: Dual-Node Kinematic & Hydraulic Auditor for Swing-Arm Pivots | Network Density: 2 PMT

Units per Corner Pivot (Subdistrict 1)

The Corner-Swing Auditor (CSA) is a specialized dual-node configuration of the FarmSense

PMT system, specifically engineered for center-pivots equipped with swinging corner arms

(swing-spans) or end-gun extensions. In a standard pivot, a single PMT can calculate the

circular application area. However, a swinging pivot introduces a non-linear "elbow" joint that

extends the irrigation reach into the corners of square fields. To maintain the Enterprise (1m)

Resolution required for the Digital Water Ledger, the CSA utilizes two synchronized PMT units—

a Primary Span Tracker (PST) and a Swing-Arm Tracker (SAT)—to mathematically resolve

the complex kinematics and hydraulic surges associated with corner irrigation.

The "Corner Reach" Data Gap: Corner irrigation is historically the most "unaudited" zone in

agriculture. Because swing arms extend and retract based on soil boundaries and legal

property lines, the water distribution is rarely uniform. The CSA closes this gap, providing the Zo

Scientist Engine with the high-fidelity proof needed to audit every gallon sprayed into the high

value corner acres of Subdistrict 1.

## 1. Dual-Node Kinematic Architecture (The Elbow Logic)

The CSA operates on a "Master-Slave" kinematic relationship to resolve the pivot's exact

footprint in real-time.

Primary Span Tracker (PST): Mounted on the first or second tower of the main pivot

span. It establishes the "Base Vector" of the machine. It tracks the primary rotation angle

(0-360°) and the bulk flow entering the main pipe from the wellhead.

Swing-Arm Tracker (SAT): Mounted on the distal end of the swinging corner arm. It tracks

the "Swing Angle" relative to the main span. By comparing the GNSS and IMU data

between the PST and SAT, the Zo Server can triangulate the exact position of every nozzle

on the swing arm within 1 meter.

Kinematic Synchronization: Both units utilize a sub-second BLE handshake. The SAT

feeds its angular displacement data to the PST, which then packages a unified "Double

Kinematic" payload for the VFA. This allows the Zo Engine to calculate the "Crabbing"

effect of the swing-arm tires independently of the main span, identifying structural stress

caused by mud or terrain slope in the corners.

## 2. Advanced Hydraulic Auditing (End-Gun & Solenoid Pulse)

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 1/4


Corner spans often utilize high-pressure "End-Guns" that pulse on and off via solenoids as the

arm swings. This creates massive pressure spikes and flow variability that a single meter cannot

capture.

Dual-Flow Correlation: The SAT unit is equipped with its own dedicated set of clamp-on

ultrasonic transducers placed downstream of the swing-arm's main joint. This allows the

system to differentiate between the Main Span Flow and the Swing-Arm/End-Gun Flow.

Solenoid Audit Logic: The IMU in the SAT is specifically tuned to detect the "Hydraulic

Hammer" (vibration signature) produced when the end-gun solenoid fires. By timestamping

this mechanical vibration against the ultrasonic flow surge, the CSA provides the "Digital

Ledger" with certified proof of exactly how much water was dumped into the corner zones,

preventing over-application and nitrate leaching in these sensitive areas.

## 3. Structural Housing & "Cut-Less" Mounting (Subdistrict 1 Grade)

The CSA nodes utilize the same ruggedized housing as the standard PMT but are reinforced for

the higher vibration and centrifugal forces experienced at the edge of the swing arm.

IP67 UV-Polycarbonate Puck: Both nodes are housed in Polycase WP-21F enclosures.

Polycarbonate is mandated due to its RF-transparency, ensuring the GNSS RTK lock is not

interrupted by the massive steel trusses of the swing-arm extension.

Vibration Isolation (The Corner Whip): The SAT unit is subject to a "whip effect" as the

corner arm starts and stops. To protect the electronics, the SAT utilizes a double-layer

Neoprene Friction Pad. This isolates the u-blox ZED-F9P chipset from the high-frequency

metal-on-metal vibration of the swing joint, ensuring the GNSS lock remains stable even

during aggressive machine maneuvers.

Zero-Impact Installation: Like the standard PMT, the CSA is 100% "Cut-Less." It uses

304-SS Band-It straps for mounting and clamp-on transducers for flow. This allows the

District’s "Band-It Rapid" crews to install a full CSA system on a corner pivot in under 4 hours

without any welding or structural modifications.

## 4. UI Logic & The "Corner Pop" Sales Funnel

The high-fidelity data generated by the SAT unit is the primary driver for Enterprise (1m) Tier

conversions in fields with corner irrigation.

The Resolution Challenge: In the Free (50m) and Basic (20m) tiers, the corner irrigation is

often rendered as a simplified square block. However, when the farmer views their "Corner

Health" on the interactive tile map, the system triggers a specialized "Corner Pop." * The

Enterprise Hook: The UI showcases the real-time angular movement of the swing arm

(audited by the SAT) and offers a preview of the 1m-resolution "Application Map." This

proves to the farmer that they are wasting water in the corners or missing critical zones

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 2/4


due to end-gun malfunctions, providing a high-conversion incentive to upgrade to the

Enterprise tier to unlock the full hydraulic audit.

## 5. Hyper-Granular CSA BOM & Project Costs (Dual-Unit Setup)

Because a corner pivot requires two full PMT nodes (PST + SAT), the cost is essentially doubled

per machine. This ledger reflects the Subdistrict 1 volume pricing for the dual-unit hardware.

Category Component Description Supplier Part # /
Type

Unit
Cost

Ext. Cost
(x2)

Housing IP67 UV-Polycarbonate Puck Polycase WP-21F $45.00 $90.00

Mounting 304-SS Band-It Straps (x4) McMaster 5530K34 $12.50 $25.00

Mounting Neoprene Friction Pad (x2) McMaster 8637K32 $5.50 $11.00

Computing Cortex-M4 Processing Sled
(x2)

Position u-blox ZED-F9P RTK GNSS
(x2)

Position 9-Axis IMU (Vibration/Tilt)
(x2)

Hydraulic Ultrasonic Transit-Time Pair
(x2)

Power 10W Solar Lid + LiFePO4
Buffer (x2)

Power LiSOCl2 5yr Hibernation
Pack (x2)

Radio High-Gain BLE Whip
Antenna (x2)

Digi-Key ATSAMD51 $65.00 $130.00

SparkFun GPS-15136 $140.00 $280.00

Bosch BNO055 $32.00 $64.00

Badger
Meter

TFX-5000 $648.00 $1,296.00

Renogy Cust-10W $95.00 $190.00

Saft LS14500 $25.00 $50.00

Linx ANT-BLE $30.00 $60.00

Fasteners SS M4 Security Screws (x8) McMaster SecurityM4

TOTAL Per Unit Hardware Cost
(Dual PMT)

$2.00 $4.00

$2,200.00

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 3/4


Total CSA Project Financials (Per Corner Pivot):

Hardware Total: $2,200.00

Dual-Point Calibration & Audit: $114.88 (Requires a double-run with the Master Meter to

verify both the main span flow and the swing-arm flow separately).

Labor (Installation): $200.00 (Calculated at 4 hours total per corner pivot to handle the

complex mounting on the swing arm).

CSA PER-PIVOT TOTAL: $2,514.88

## 6. Strategic Legal Value

The CSA provides the ultimate level of protection in Water Court. For Subdistrict 1 farmers, the

corners are often the first areas to have their water rights curtailed during drought years.

Empirical Defense: The CSA provides the only certified way to prove that water was

delivered only within the permitted swing-arm boundaries and was not "oversprayed" onto

non-irrigated land.

Worksheet Integration: The Zo Server uses the dual-node data to update the field's

"Swing Worksheet." If the SAT detects that the swing arm is not extending fully, it informs

the Zo Scientist, who then adjusts the virtual sensor grid values for the corner tiles,

i th 1 E t i i th d fi iti "G d T th "

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 4/4

<div style="page-break-after: always;"></div>

# Master Specification: District Hub (DHU) V1.1

**Role**: District Director & Edge Coordinator | **Tier**: Layer 2 (Regional Mesh Manager) | **Radius**: 5km (Overlapping Redundancy)

The District Hub (DHU) operates as the primary "Director" and traffic coordinator of the FarmSense network. Positioned atop high-elevation structures across Subdistrict 1, the DHU provides the high-bandwidth backhaul connectivity, localized edge processing, and multi-node mesh coordination required to keep the "Digital Water Ledger" synchronized across thousands of acres. While the VFA acts as the field-level truth, the DHU is the central nervous system node that bridges the gap between raw field data and the high-performance computing clusters at the Regional Superstation (RSS). By utilizing an **NVIDIA Jetson Nano** at the edge, the DHU provides the localized GPU-accelerated compute required for mid-tier spatial probability grids (10m and 20m) across the entire district mesh.

**Network Topology & High-Availability Backhaul**: Each DHU covers a **5km radius zone**, strategically overlapped with adjacent hubs to provide **high-availability redundancy**. This topology ensures that if one hub fails, at least 80% of its managed VFAs can failover to a neighboring hub's sector radios. To ensure 99.9% data availability, the DHU employs a "Fiber-First" Backhaul Mandate: in any location where fiber internet can be installed within a cost-effective trenching or aerial distance, it must be utilized as the primary uplink. For sites beyond the fiber footprint, or as a critical failover for fiber-connected sites, the DHU utilizes a Pay-As-You-Go IoT Cellular (LTE-M/NB-IoT) or Satellite (Starlink) array. This ensures that even during regional fiber cuts or severe weather events, the critical water accounting data remains synchronized.

## 1. Enclosure Engineering & Siting Dynamics

The DHU is engineered for a 40-year structural lifespan, utilizing utility-grade standards to ensure signal integrity across the San Luis Valley’s intense thermal and wind gradients.

* **The Enclosure (The Oversized Thermal Buffer)**: A NEMA 4X Rated Oversized Polycarbonate Enclosure (24"x20"x10") from Polycase.
* **RF-Transparency**: Polycarbonate is mandated over steel to allow internal diagnostic radios, GPS modules, and high-gain BLE antennas to maintain locks through the housing, significantly reducing the external cable entry points where moisture or lightning could strike.
* **Thermal Mass Management**: The oversized volume is a strategic requirement. It provides a massive internal air-gap for the 200Ah battery system, acting as a passive thermal buffer against the high-altitude solar radiation (7,600ft+) of the SLV. This prevents "battery cooking" during the peak of summer while providing enough interior space for active heating elements during the winter.
* **Siting & Vertical Infrastructure**: To clear the 60% Fresnel zone over a 10km span and avoid signal attenuation from mature 10ft potato/barley canopies, DHUs are mounted at a minimum of 30ft Above Ground Level (AGL).

### Infrastructure Tiers

1. **Grain Silos & Water Towers**: The preferred mounting points due to their extreme stability and pre-existing height.
2. **35ft Class 4 Timber Poles**: Set 6ft-8ft deep and backfilled with crushed rock. These are utility-standard assets selected for their 40-year lifespan and inherent resistance to "wind-shimmer" (vibration that can break radio locks).
3. **Guyed Steel Towers (Rohn 25G)**: Utilized specifically for remote ridgeline bluffs to extend the "Umbrella" coverage to peripheral fields.

## 2. Compute Architecture & The "Black Box" Ledger

The DHU performs heavy "Data Decimation" at the edge to reduce monthly backhaul costs while maintaining a high-fidelity local record for legal auditing.

* **Edge Processing Engine**: Utilizes an **NVIDIA Jetson Nano Developer Kit** (or custom carrier equivalent) featuring a 128-core Maxwell GPU and Quad-core ARM A57 CPU.
* **Localized Kriging (10m & 20m)**: The DHU executes localized Bayesian math worksheets provided by the **RSS Oracle Compute** specifically for the 10-meter and 20-meter resolution tiers. By performing these multi-tenancy calculations for up to 100 fields at the edge, the DHU can make instantaneous "Reflex Logic" decisions (e.g., stopping a pump if a pivot stalls) without waiting for a cloud round-trip, which is vital during cellular latency spikes.
* **The 30-Day "Black Box" Cache**: Equipped with a 128GB Swissbit PSLC Industrial SSD. Unlike consumer-grade storage, the Swissbit PSLC (Pseudo-Single Level Cell) drive is selected for extreme write-endurance and data retention in sub-zero temperatures.
* **Data Integrity**: It maintains a localized master ledger of all regional water transactions. If both the fiber and cellular backhauls fail, the DHU continues to record every "Audit Packet," ensuring that the farmer's water conservation credits are never lost or questioned in Water Court.
* **Atmospheric Management**: Includes dual passive Gore-Tex vents for pressure equalization. During rapid alpine storm fronts, the internal pressure must equalize to prevent the enclosure gaskets from "breathing" and sucking in the fine, abrasive alkali dust that can degrade the cooling fins.

## 3. Edge OS & Software Stack

The DHU maintains a mission-critical, containerized environment to support localized intelligence and regional coordination.

* **Base Layer**: NVIDIA JetPack 4.6.1 with specialized Maxwell GPU drivers for FP16-accelerated Kriging.
* **Service Architecture**: Containerized via **Docker**, allowing individual upgrades to the Kriging engine or radio drivers without compromising the core OS.
* **Firmware Reliability**: Implements a dual-partition (A/B) boot strategy. If an Over-the-Air (OTA) update fails or a kernel-panic is detected, the hub automatically rolls back to the previous stable state within 45 seconds.
* **Watchdog Sentry**: A physical hardware watchdog monitors the `fs-mesh-coordinator` health. If the internal mesh heartbeats stall, the system executes a full power-cycle of the Jetson module.

## 4. Triple-Sector Radio Spine & Resilient Power

To provide 360-degree high-bandwidth coverage across the basin, the DHU utilizes a specialized carrier-grade radio stack.

* **Sector Radio Array & LoRaWAN Gateway**: Three (3) Ubiquiti LTU Sector Antennas (120°). This configuration allows the hub to handle high-bandwidth 5GHz connections while mitigating multipath interference caused by heat-shimmer and the massive metallic surfaces of center-pivot spans. Additionally, the DHU incorporates an Enterprise-Grade 900MHz LoRaWAN Gateway to receive secure payloads directly from the Vertical Field Anchors (VFAs).

### Redundant Backhaul Spine

* **Primary**: Fiber ONT (G-PON) where cost-effective. Fiber eliminates the "RF-Noise" issues common in high-interference pump houses.
* **Secondary/Failover**: Telit ME910G1 LTE-M Modem. Configured for "Pay-As-You-Go" IoT data, this modem only consumes data during fiber outages, keeping operational costs low while ensuring absolute connectivity.

### Resilient Power (7-Day Rating)

* **Solar**: 200W High-Tilt Rigid Mono-Solar Array designed to shed snow in under 2 hours.
* **Battery**: Battle Born 200Ah Heated LiFePO4 Bank. Internal heating elements ensure the cells stay at +5°C even during −30°F "Polar Vortex" events. The system uses a "Solar First" charging priority to warm the battery before accepting charge current, preserving the 10-year battery life.
* **Lightning Defense**: Positioned at 35ft, DHUs are prime targets. Inclusion of L-com GDT (Gas Discharge Tube) Lightning Arrestors is non-negotiable for every antenna line.

## 4. Hyper-Granular DHU CapEx & Procurement (25-Unit Fleet)

This ledger reflects the civil engineering and hardware costs for the 25-hub "Umbrella" required to cover Subdistrict 1.

| Category | Component Description | Supplier / Part # | Unit Cost |
| :--- | :--- | :--- | :--- |
| Computing | NVIDIA Jetson Nano Dev Kit | NVIDIA | $99.00 |
| Storage | 128GB PSLC SSD | Swissbit X-75 | $185.00 |
| Radio | 120° 5GHz Sector (x3) | Ubiquiti UISP | $850.00 |
| Backhaul A | Fiber ONT (Primary) | Local ISP | $350.00 |
| Backhaul B | IoT LTE-M/NB-IoT (Backup) | Telit ME910G1 | $115.00 |
| Housing | NEMA 4X Polycarbonate Box | Polycase ML | $180.00 |
| Power | 200W Mono-Solar Array | Renogy | $340.00 |
| Power | 200Ah Heated LiFePO4 Bank | Battle Born | $850.00 |
| Tower | 35ft Class 4 Timber Pole | Local Utility | $1,500.00 |
| Protection | Lightning Arrestor/Surge | L-com | $125.00 |
| **TOTAL** | **Per Unit Hardware Cost** | | **$4,594.00** |

**Subdistrict 1 Infrastructure Totals (25 Hubs)**:

* Hardware Subtotal: $114,850
* Fiber Trenching/Drop Allowance: $25,000
* Site Foundation & Concrete: $12,500
* Labor (Vertical Integration): $18,375
* **DHU PROJECT TOTAL: $170,725**

## 5. Strategic Value & "Resolution Pop" Support

The DHU is the final staging area for the Enterprise (1m) Resolution Tier.

* **The Resolution Engine**: By aggregating the high-fidelity GNSS and flow data from the PMT with the subsurface pings from the LRZ mesh, the DHU facilitates the "Resolution Pop" in the farmer’s UI.
* **The Sales Funnel**: If a user on a lower tier attempts to view 1m granular data, the DHU triggers the blurred preview funnel. This proves the value of the Enterprise subscription by demonstrating the DHU's ability to sync data in real-time, even during regional internet outages. Furthermore, the DHU provides the high-fidelity spatial data stream required for the **Command & Control (C&C)** XR deployment tools used by field technicians.

<div style="page-break-after: always;"></div>

# Master Specification: Lateral Root-Zone Scout (LRZ) V1.21

**Role**: Lateral Variability \"Scout,\" High-Density Dumb Node, & Spatial Mapper | **Network Density**: 1 LRZ per 15 Acres (Reporting directly to the PMT Field Hub)

While the Vertical Field Anchor (VFA) serves as the singular high-fidelity \"Truth\" node for an entire field, the Lateral Root-Zone Scout (LRZ) is the indispensable high-density spatial component of the FarmSense grid. Designed to be mass-deployed at a strict density of 1 unit per 15 acres, the LRZ operates as a hyper-efficient \"dumb node.\"

**Network Topology**: On a standard 125-160 acre center pivot, a fleet of approximately 8 to 10 LRZ units will form a local mesh. They do not process complex Worksheets or execute localized Bayesian math. They do not carry on-board GPS; instead, they are \"Pinned\" to the regional map by the PMT's RTK-GNSS anchor as it transits the field. This \"Pin Mapping\" ensures that every moisture data point is accurately geofenced with sub-meter precision. Their sole operational imperative is to capture raw dielectric and electrical conductivity (EC) counts across their specific 15-acre zone, encrypt them, and \"chirp\" them directly to the overhead PMT Field Hub. This massive density of spatial data is what ultimately powers the FarmSense UI and **Command & Control (C&C)** logic—allowing the system to mathematically transition from the Free (50m) and Basic (20m) tiers to the highly lucrative Pro (10m) and Enterprise (1m) resolution \"pops.\"

**The Seasonal Deployment Model**: To protect the LRZ's internal electronics and guarantee a 10-year hardware lifecycle, FarmSense utilizes a two-phase seasonal deployment strategy. The outer structural shells act as ultra-cheap, geo-located permanent docking stations that remain buried in the field year-round. The internal, highly sensitive sensor sleds are dropped into these shells after spring planting and physically extracted just prior to harvest. This workflow entirely eliminates the risk of deep-freeze winter battery degradation while perfectly preserving the exact spatial baseline required by the **RSS Oracle Compute**'s Kriging algorithms.

## 1. Structural Housing ("Invisible Presence" Architecture & Seasonal Docking)

The LRZ housing is engineered for an "Invisible Presence"—a ruggedized subterranean deployment capable of withstanding the extreme mechanical stresses of 4WD tractor passes and repetitive deep-soil compaction cycles common in potato-barley rotations.

* **The Outer Shell (The Docking Station)**: Constructed from Standard 2\" Schedule 40 UV-Stabilized Rigid PVC. Cut precisely to 18 inches to perfectly match the internal 18U sled, this shell sits perfectly flush with the soil surface and provides the extreme rigidity required to prevent bowing during deep-soil compaction.
* **Material Science**: UV-Stabilized PVC was selected specifically for its high stiffness (flexural modulus), low cost, and total electromagnetic transparency for the capacitive sensors. It is also chemically inert to the sulfur-rich SLV alkali soils.
* **Installation Efficiency**: By keeping the shell at exactly 18 inches, the hydraulic auger crews only need to drill a shallow pilot hole, exponentially speeding up installation.
* **15-Degree Friction Molded Driving Tip (Compaction-Fit)**: The 18-inch outer shell is sealed with a Custom PVC Driving Tip. To ensure extreme accuracy and a permanent monolithic weld, the tip is **friction molded**: the PVC pipe is spun at extremely high speeds while being pressed slowly into a tapered mold, heating and melting the plastic into its precise 15-degree final tapered shape.
* **Low-Profile Antenna Mount**: The removable C&C Cap mounts a 3-foot SS-304 stainless steel whip antenna directly to its base via a heavy-duty spring. This gives the LRZ an exact 3-foot profile above the soil, keeping it beneath the destructive sweep of the pivot span.
* **The Removable Internal Sled**: The core internal structure is an 18-Inch 50mm Co-Extruded Alpha-Sled constructed of **Rigid CPVC** (Chlorinated Polyvinyl Chloride) to prevent high-temperature warping in the back of installation trucks. This removable payload is swiftly inserted post-planting and extracted pre-harvest.
* **The Seasonal Climate (+5 psi Defense)**: Upon insertion, Viton (FKM) 2\" O-rings seal the sled against the shell walls. The internal cavity is flushed and pressurized to +5 psi with Dry Nitrogen for active protection against micro-fractures.

## 2. Edge Logic & The Secure "Chirp" Protocol

The LRZ is an exercise in extreme power efficiency. It lacks the eMMC storage and heavy compute processors found in edge coordinators. It is a "Set and Forget" asset that awakens, acts, and sleeps.

* **Ultra-Low Power nRF Logic**: The compute board relies on a Nordic nRF52840 SoC. This chip stays in a deep micro-amp sleep state for 99% of its life, waking only to capture raw dielectric counts before immediately cutting power.
* **Interference Mitigation (FHSS)**: The LRZ chirp utilizes a Frequency-Hopping Spread Spectrum (FHSS) approach, scattering micro-transmissions across 75 different frequencies to ensure zero packet collisions in high-density fields.
* **128-Bit Edge Encryption**: Before the chirp leaves the antenna, the payload is signed and encrypted with a factory-burned 128-bit AES key. The PMT Field Hub intercepts and decrypts this packet for routing.
* **Oracle Unified Compute Remote Calibration**: The LRZ requires zero manual calibration. Its baseline is established remotely by the **Oracle Unified Compute** using the high-fidelity Bayesian math from the field's VFA "Truth Node."

## 3. The High-Density Sensor Array (18-Inch / 18U Sequence)

Like the VFA, the LRZ employs the advanced \"Proxy Method\" of non-contact sensing, shooting high-frequency dielectric fields directly through the 50mm CPVC sled wall, the nitrogen gap, and the permanent PVC shell.

**Locked 18U Physical Stack Sequence**:

* **Slot 1**: 1U Bulk Stamped Desiccant Pack (Growing season moisture trap)
* **Slots 2-5**: 4U Battery #1 (3x 21700 lithium-ion cells for frost defense heating)
* **Slots 6-9**: 4U Extruded Spacer
* **Slot 10**: 1U Basic Sensor (10" Depth: Seedbed & Evapotranspiration Monitoring)
* **Slots 11-14**: 4U Battery #2 (Redundant energy overhead for thermal defense)
* **Slots 15-17**: 3U Extruded Spacer
* **Slot 18**: 1U Basic Sensor (18" Depth: Root Anchor Monitoring)

## 4. The Seasonal Deployment Workflow & OEM Scale BOM

**The "Rapid Deployment" Installation & Extraction Cycle**:

1. **Post-Planting Insertion**: Utilizing a three-crew rotation, installation is calculated at under 10 minutes per unit. Crew A drills/sets the shell, Crew B drops/pressurizes the sled, and Crew C performs final compaction.
2. **Harvest Extraction**: Prior to harvest, crews extract the internal sleds and cap the permanent shells with crush-proof blanking plugs.

## 5. Hyper-Granular OEM Scale BOM (15,600 Unit Tier)

| Category | Component Detail | Supplier / Scale Method | Unit Cost | Ext. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Housing | 2\" SCH 40 UV-Stabilized PVC (18-inch) | Direct Extruder | $1.25 | $1.25 |
| Housing | Friction Molded PVC Tapered Tip | Rotational Formed | $3.50 | $3.50 |
| Antenna | 3ft SS-304 Whip + Spring | Hub-Mount Pultruded | $3.50 | $3.50 |
| Adhesive | Industrial PVC Cement | Automated Bulk | $0.50 | $0.50 |
| Computing| nRF52840 \"Chirp\" Logic Board | Tier-1 PCBA | $6.50 | $6.50 |
| Seals | Viton (FKM) 2\" O-Rings (x2) | Bulk Supplier | $1.20 | $2.40 |
| Purge | Dry Nitrogen Gas Shell Fill | Automated Assembly | $0.15 | $0.15 |
| Climate | 1U Stamped Desiccant Matrix | Bulk Supply | $1.50 | $1.50 |
| Structure| 18\" CPVC AlphaSled Chassis | Continuous Extrusion | $1.40 | $1.40 |
| Structure| Extruded Rigid CPVC Spacers (7U)| Recycled Bulk | $0.10 | $0.10 |
| Power | 4U Battery Cartridges (21700x3) | Direct Cell Sourcing | $16.75 | $33.50 |
| Sensors | 1U Basic Sensor (VWC/Temp) | Fab-Direct Assembly | $2.50 | $5.00 |
| **TOTAL** | **Per Unit Hardware Cost** | | | **$59.30** |
| | **(Absolute OEM Scale)** | | | |

<div style="page-break-after: always;"></div>

# Master Specification: Pivot Motion Tracker (PMT) V1.6

**Role**: Field Hub (DHU Uplink) & Hydraulic Auditor | **Network Density**: 1 per Pivot (Subdistrict 1 Deployment)

The Pivot Motion Tracker (PMT) serves as the high-fidelity "Nervous System" and the primary "Hydraulic Auditor" of the FarmSense SFD (Single Field Deployment) architecture. Positioned externally on the main span of a center-pivot irrigation machine, it provides the essential kinematic and hydraulic flow data required to verify exactly where, when, and how much water is applied to the land. While the LRZ (Lateral Root-Zone) scouts monitor the soil's response to water, the PMT provides the certified proof of application, completing the data loop for the **Oracle Unified Compute** and establishing the legal foundation for the "Digital Water Ledger."

**Subdistrict 1 Economics & Strategic Procurement**: This version of the specification reflects the optimized procurement strategy for the 1,280-unit deployment in Subdistrict 1. At this scale, FarmSense leverages high-volume industrial discounts from established, reliable suppliers (such as Polycase, SparkFun, and Badger Meter) rather than attempting full custom silicon integration at this stage. This ensures immediate field reliability, insurance-backed liability protection, and professional-grade accuracy for Water Court auditing.

## 1. Structural Housing & "Cut-Less" Mounting Logistics

Because the PMT is an above-ground asset mounted directly to massive moving steel machinery, it faces extreme environmental stressors: intense high-altitude UV, 100mph alpine wind gusts, and continuous sand-blasting from alkali dust.

* **The Enclosure (RF-Transparent Architecture)**: Housed in an IP67 UV-Stabilized Polycarbonate Box (8"x6"x4") from Polycase.
* **Material Logic**: Polycarbonate provides superior impact resistance, ensuring the unit survives accidental strikes from low-hanging branches or pivot hardware. It is also inherently RF-transparent, allowing the internal high-precision GNSS and BLE antennas to maintain high-gain locks without the need for fragile externalized "puck" antennas that are prone to being sheared off during operation.
* **Environmental Defense**: The enclosure features a dual-stage Gore-Tex breather vent. During rapid alpine temperature drops (e.g., a 40°F drop during a sudden storm), this prevents the box from creating an internal vacuum that would suck in moisture-laden outside air through the gaskets, causing catastrophic condensation on the logic boards.
* **"Cut-Less" Mounting (Zero-Impact Integration)**: Attached to the main galvanized pivot span (typically 6.625" or 8.625" OD) using heavy-duty 304 Stainless Steel "Band-It" straps combined with a Neoprene Friction Pad.
* **Structural Integrity**: This non-invasive mount requires zero drilling, welding, or tapping into the pivot's span, preserving the manufacturer's structural warranty and preventing point-source corrosion. The Neoprene pad acts as a critical vibration dampener, isolating the sensitive IMU and GNSS electronics from the rhythmic mechanical "clanking" of the pivot's electric drive motors and gearboxes.

## 2. Kinematic Positioning & Structural Audit Stack

The PMT moves beyond simple GPS tracking to professional-grade kinematic auditing, differentiating mathematically between "Walking" (motion without water) and "Pumping."

* **The 1m "Resolution Pop"**: This precision data is the empirical backbone of the FarmSense UI. By correlating the PMT's RTK-grade location with subsurface VFA/LRZ proximity chirps, the **Oracle Compute Layer** "Pins" the static nodes to a sub-meter coordinate grid without requiring on-board GNSS for every sensor. If a Basic Tier (20m) user attempts to zoom in, the PMT's underlying high-fidelity data triggers the "Resolution Pop," initiating a pricing funnel for the Enterprise upgrade.
* **9-Axis IMU (The "Crabbing" & Structural Sentry)**: A Bosch BNO055 Inertial Measurement Unit continuously monitors vibration harmonics and 3D orientation.
* **Diagnostic Intelligence**: It detects "Crabbing"—a dangerous condition where a tower's drive motor slips or stalls in deep mud, causing the massive steel span to bow and drift out of alignment. If crabbing or abnormal vibration is detected, the PMT alerts the Hub, which can immediately command the PFA (Pressure & Flow Anchor) to execute a "Soft-Stop" of the well pump, preventing catastrophic, $80,000+ structural collapses.

## 3. Non-Invasive Hydraulic Flow Stack (The Audit Engine)

The hydraulic flow stack is the primary engine for water rights verification and state-level regulatory compliance.

* **Ultrasonic Transit-Time Transducers**: Utilizes a Badger Meter TFX-5000 clamp-on transducer pair.
* **Physics of Flow**: These sensors utilize "Transit-Time" logic, measuring the nanosecond difference between ultrasonic pulses traveling upstream vs. downstream. This difference is directly proportional to the water's flow velocity.
* **The "Cut-Less" Advantage**: Because these clamp to the outside of the 8" main pipe, they require zero pipe cutting or downtime. Most importantly, they ensure zero pressure drop in the hydraulic system. Unlike invasive paddle-wheel meters that create drag, this non-invasive approach preserves the energy efficiency of the well pump, saving the farmer thousands in seasonal energy costs.
* **Legal Certification**: The system provides ±1.0% flow accuracy, meeting the "Gold Standard" required for verified water use reporting to the State Engineer and securing long-term water rights through empirical proof.

## 4. Edge Processing & Winter Hibernation Logic

* **Cortex-M4 Processing Sled**: Features an ATSAMD51 processing sled (sourced via Digi-Key). It buffers 1-second interval flow data and GNSS coordinates, applying a localized Kalman Filter to the IMU data to smooth out the intense vibration noise of the pivot spans.
* **Comms (The Field Hub)**: Features a dual-radio stack. Transmits and receives via a High-Gain 900MHz FHSS antenna to act as the primary \"listening post\" for the field's LRZ & VFA mesh. It then intercepts this data, bundles it with its own 2.4GHz/BLE hydraulic payload received from the PFA, and blasts the entire field's encrypted payload via a 900MHz LoRaWAN transceiver to the District Hub (DHU).

### Empirical Bayesian Kriging (Edge-EBK) & VRI Failover Operations

The PMT acts as an **Autonomous Compute Engine** continuously. Utilizing the ATSAMD51's 120MHz hardware Floating-Point Unit (FPU), the PMT intercepts the mesh data points and calculates a 50m-resolution spatial probability grid (a 16x16 matrix across the 160-acre quarter section) regardless of DHU connectivity. This native processing enables the 20m and 10m grids to be processed at the DHU, and the highly complex 1m grids to be processed downstream at the RSS or Cloud levels.

**Dynamic Update Frequency (The "Fisherman's Attention" Scale)**:

1. **Dormant Baseline (4-Hour Sweeps)**: When the weather is stable, soil moisture is high, and the pivot is parked, the PMT "relaxes," calculating the 16x16 field matrix only once every 4 hours.
2. **Anticipatory Watch (1-Hour Sweeps)**: If the PMT knows active evaporation factors are rising, it pays closer attention, increasing the grid calculation to every 60 minutes.
3. **Active Anomaly Tracking (15-Minute Sweeps)**: The moment the PMT gets a "nibble"—detecting the first sign of a rapid statistical trend—it scales updates to 15 minutes. This triggers a **"Focus Ripple,"** commanding peer nodes to increase reporting frequency.
4. **Significant Event (5-Second Sweeps)**: When a critical threshold is breached or water is moving, the PMT triggers a **"Focus Collapse,"** ignoring dormant parts of the field to concentrate computational power on the path of the active event. During the "Rapid Deployment" deployment phase, the PMT enters **Command & Control (C&C) Deployment Mode**, providing live RTK-anchored XR overlays to field technicians for sub-meter "Pinning" of VFAs and LRZs.

* **Failover Logic**: Because the PMT is already maintaining this dynamic 50m grid natively, if the DHU uplink drops, it seamlessly executes autonomous Variable Rate Irrigation (VRI) speed commands.
* **Data Buffering**: During an outage, the PMT logs payloads to its onboard SPI Flash, burst-transmitting the backlog once the DHU connection is restored.
* **Winter Hibernation & "Warm Start"**: Powered by an integrated 10W Solar Lid + LiFePO4 Buffer from Renogy. Includes a Saft LS14500 LiSOCl2 5yr Hibernation Pack to keep the GNSS Real-Time Clock alive all winter, ensuring a "Warm Start" in under 5 seconds in the spring.

## 5. Hyper-Granular BOM & Subdistrict 1 Project Costs (1,280 Units)

This ledger deconstructs the hardware costs for the initial 1,280-unit rollout.

| Category | Component Description | Supplier Part # | Unit Cost | Ext. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Housing | IP67 UV-Polycarbonate Puck | Polycase WP-21F | $45.00 | $45.00 |
| Mounting | 304-SS Band-It Straps (x2) | McMaster 5530K34 | $12.50 | $12.50 |
| Mounting | Neoprene Friction Pad | McMaster 8637K32 | $5.50 | $5.50 |
| Computing | Cortex-M4 Processing Sled | Digi-Key ATSAMD51 | $65.00 | $65.00 |
| Position | u-blox ZED-F9P RTK GNSS | SparkFun GPS-15136 | $140.00 | $140.00 |
| Position | 9-Axis IMU (Vibration/Tilt) | Bosch BNO055 | $32.00 | $32.00 |
| Hydraulic | Ultrasonic Transit-Time Pair | Badger Meter TFX-5000 | $648.00 | $648.00 |
| Power | 10W Solar Lid + LiFePO4 | Renogy Cust-10W | $95.00 | $95.00 |
| Power | LiSOCl2 5yr Hibernation Pack | Saft LS14500 | $25.00 | $25.00 |
| Fasteners | SS M4 Security Screws (x4) | McMaster Security-M4 | $2.00 | $2.00 |
| Radio | High-Gain BLE Whip Antenna | Linx ANT-BLE | $30.00 | $30.00 |
| Radio | 900MHz LoRaWAN Transceiver | Semtech SX1262 | $12.00 | $12.00 |
| **TOTAL** | **Per Unit Hardware Cost** | | **$1,112.00** | |

**Total Subdistrict 1 Project Financials (1,280 Units)**:

* Hardware Subtotal: $1,423,360
* Calibration & Field Audit: $57,440
* Labor (Installation): $100,000
* **TOTAL PROJECT COST: $1,580,800**

## 6. Strategic Value & Legal Defensibility

By deploying the PMT at this scale, FarmSense moves the needle from "estimated water use" to "audited water reality."

* **Water Court Integrity**: In the event of an aquifer depletion dispute, the PMT's unbroken, ±1.0% accurate log serves as the absolute "Gold Standard" of evidence, proving that every gallon was applied exactly where the **Oracle Compute Layer** calculated it was needed.

<div style="page-break-after: always;"></div>


# Master Specification: Pressure & Flow Anchor (PFA) V1.9

Role: Source/Well Monitor & Safety Actuator | Network Density: 1 per Well Station (Subdistrict 1

Deployment)

The Pressure & Flow Anchor (PFA) is the "Sentry of the Source," serving as the primary

hardware interface for monitoring groundwater extraction and ensuring the mechanical safety

of the multi-thousand-dollar pumping infrastructure. Within the FarmSense SFD (Single Field

Deployment) architecture, the PFA focuses exclusively on the extraction point—the pump and

the aquifer. While the LRZ and VFA nodes monitor the consumption of water at the crop level,

the PFA provide the high-fidelity data required to bridge the gap between farm-gate operations

and regional aquifer health, serving as the primary gatekeeper for the "Digital Water Ledger."

Subdistrict 1 Economics & Strategic Procurement: This version of the specification reflects

the optimized procurement strategy for the 1,280-unit deployment in Subdistrict 1. At this

scale, FarmSense leverages high-volume industrial discounts from established, reliable

suppliers (such as Hoffman, Dwyer, and Magnelab) rather than attempting full custom silicon

integration. This ensures immediate field reliability, insurance-backed liability protection, and

NEC (National Electrical Code) compliance for legal auditing, while maintaining a clear,

documented path toward the $300.00 global unit target in future phases of mass-market

expansion.

## 1. Structural Housing & EMI Hardening (The VFD Shield)

Pump houses in the San Luis Valley (SLV) are notoriously hostile environments. They are subject

∘ ∘

## to extreme temperature swings (ranging from −30 F in winter to over 90 F in mid-summer)

high humidity from "sweating" pipes, and massive amounts of electromagnetic interference

(EMI) generated by high-voltage lines and Variable Frequency Drives (VFDs).

The Outer Enclosure (NEMA 4X): Constructed from a Hoffman NEMA 4X Ruggedized

Polycarbonate Enclosure. This specific enclosure is utilized for its superior impact

resistance and absolute defense against dust, water spray, and aggressive corrosion found

in damp, unventilated pump pits. Unlike metal boxes, polycarbonate is RF-transparent,

allowing the internal 2.4GHz high-gain antenna to maintain a solid, uninterrupted link to the

field's VFA without the need for fragile externalized antenna "pucks."

EMI Hardening (The Faraday Effect): High-voltage VFDs emit severe high-frequency

electrical "noise" that can easily corrupt sensitive analog-to-digital (ADC) conversions. The

PFA enclosure is internally treated with a specialized conductive coating to create a

"Faraday Cage" effect. This protects the NXP processing sled's delicate circuitry, ensuring

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 1/5


that aquifer recovery levels and line pressure data remain pristine and statistically

significant for the Zo math engines.

Environmental Sealing & Longevity: To guarantee a 20-year operational lifecycle, the

internal electronics are available with a fully potted option. This process encapsulates the

logic boards in a specialized, moisture-proof resin, isolating every component from the

oxidation and condensation common in the unventilated pump houses of the San Luis

Valley.

## 2. Sensing Array & Actuation (The Digital Heartbeat)

The PFA utilizes an industrial-grade sensor suite to simultaneously monitor the mechanical

health of the pumping infrastructure and the hydrological state of the underlying water table, all

via non-invasive, "cut-less" installation.

Energy Monitor (Predictive Analytics): Three (3) non-invasive 400A Split-Core CT

(Current Transformer) Clamps from Magnelab.

Mechanism: These clamp directly around the existing 480V motor leads, requiring zero

downtime or hazardous wire-cutting. This "cut-less" approach ensures that existing

pump warranties remain fully intact.

Predictive Logic: By analyzing the "Energy Signature" (harmonics, phase balance, and

torque ripple), the Zo Engine (the Scientist) can detect early-stage cavitation, bearing

wear, or impeller inefficiency. This enables "Predictive Maintenance," allowing the

farmer to schedule repairs in the off-season rather than facing a catastrophic

$20,000 motor burn-out during a 100-degree heatwave.

Well Depth Sounder (Legal & Hydrological Defense): A Vented 316-Stainless Steel

Pressure Transducer (0-100m) from Dwyer, dropped down the well casing via a 300ft

vented PVC tube.

Vented Technology: The "vented" cable allows the sensor to automatically compensate

for changes in barometric pressure, ensuring that the water level reading is purely

hydrostatic.

Hydrological Logic: It captures minute-by-minute static and dynamic water levels. This

raw data feeds the "Digital Water Ledger," providing the empirical proof necessary for

Water Court testimony and securing the farmer's long-term water rights through

documented, sustainable extraction practices.

Line Pressure Sensor (Reflex Response): A 0-200 PSI Industrial SS Transducer from

TE Connectivity.

Cut-Less Integration: Installs via a simple stainless-steel T-splitter onto the existing

analog pressure gauge port. This allows the farmer to maintain their visual gauge while

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 2/5


providing FarmSense with high-fidelity digital data.

Safety Logic: Acts as the heartbeat monitor for the pipe network, instantly detecting

sudden pressure drops (indicating a burst mainline) or dangerous spikes (indicating a

blocked valve).

Control Interface (The Reflex Actuator): An integrated 30A Industrial Control Relay

(Dry Contact) from Omron, tied directly into the pump's "E-Stop" or "Remote Start" coil.

Reflex Logic: Receives encrypted "Soft-Stop" commands from the network. For

example: "Stop pump if the PMT detects a pivot stall" or "Stop pump if the VFA

detects moisture saturation at deep percolation depths." This prevents "wasteful

pumping" where water would otherwise just perk back into the aquifer without hitting

the root zone, potentially causing massive soil erosion or nutrient leaching.

## 3. Edge Computing & The "Blackout Buffer"

The PFA logic is designed for extreme resilience, ensuring that data integrity is maintained even

during total grid failures or utility-mandated Public Safety Power Shutoffs (PSPS).

Processing Sled: Features an NXP i.MX RT (Cortex-M7) high-speed processing sled. This

MCU is chosen for its ability to handle rapid, synchronous sampling of analog inputs, which

is critical for capturing the milliseconds of transients that occur during motor start-up or

hydraulic water hammer events.

Networking & Mesh Protocol: Utilizes a 2.4GHz High-Gain Link to communicate directly

with the elevated PMT Field Hub. It is programmed with "Critical Packet Priority"—if the line

pressure drops or a "Soft-Stop" is triggered, the PFA suppresses all non-essential

diagnostic pings to ensure the emergency command has a clear, prioritized path to the

coordinator.

The Blackout Buffer (7-Day Sentry): Powered primarily via an AC Step-Down

transformer, but backed by a massive 40,000mAh Dual-Pack LiFePO4 battery system.

Thermal Defense: Protected by a 5W Kapton heater and 8mm PE closed-cell foam

insulation.

Blackout Resilience: This massive buffer ensures at least 7 days of continuous logging

during a total power failure. This is vital for recording static aquifer recovery levels—

data that is only available when the pump is off—which represents the most valuable

hydrological data point for regional water management and legal defensibility.

## 4. Hyper-Granular BOM & Subdistrict 1 Project Costs

This ledger reflects the actual procurement costs for the 1,280-unit Subdistrict 1 rollout, utilizing

industrial wholesale pricing and certified professional installation labor.

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 3/5


Category Component Description Supplier / Detail Unit
Cost

Ext.
Cost

Housing NEMA 4X EMI-Shielded Enclosure Hoffman
(A080604CHNF)

$55.00 $55.00

Computing NXP i.MX RT (Cortex-M7) Sled Digi-Key (RT1020) $95.00 $95.00

Diagnosis 400A Split-Core CT Clamps (x3) Magnelab (SCT-1250) $110.00 $110.00

Hydrology Submersible Depth Sounder (SS) Dwyer (PBLTX-Vented) $185.00 $185.00

Hydrology Vented Tubing (300ft roll) Dwyer (Tubing-PVC) $45.00 $45.00

Pressure 200 PSI SS Line Transducer TE Conn (1/4" NPT) $70.00 $70.00

Actuation 30A Industrial Control Relay Omron (Dry Contact) $45.00 $45.00

Power AC Step-Down + 40Ah LiFePO4
Buffer

MeanWell / Custom $115.00 $115.00

Wiring 12AWG Shielded Control Wire Belden (Shielded Spool) $30.00 $30.00

TOTAL Per Unit Hardware Cost $750.00

Subdistrict 1 Total Project Financials (1,280 Units):

Hardware Subtotal: $960,000 (Includes high-capacity LiFePO4 systems for every well

station)

Electrical Conduit & Fittings: $64,000 (Covers rigid steel conduit, grounding rods, and

weather-proof fittings required to bring every PFA installation up to NEC standards)

Electrician Labor (Install): $224,000 (The "Safety First" Protocol: Calculated at 4

hours/unit for Licensed Journeyman Electricians. This ensures the high-voltage tie-ins are

legal, insured, and do not create liability for the farmer or the district)

SUBDISTRICT 1 PROJECT TOTAL: $1,248,000

## 5. Strategic Value & Credit Generation

By deploying the PFA at this scale, FarmSense establishes the primary interface for "Credit

Generation" in modern water-saving programs.

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 4/5


Conservation Funding: The PFA's accuracy and tamper-proof mounting are vital for

farmers participating in voluntary fallowing or pumping reduction programs. Because it

provides verifiable, third-party data, the PFA is 100% eligible for subsidization via State

Water Plan (CWCB) and Federal (NRCS) Conservation Innovation grants.

Zo-Oracle Coordination: The Zo Server (the Scientist) crunches the PFA's extraction

data against the Oracle (the Librarian) spatial maps to update the field's irrigation

"Worksheet." This allows the system to identify exactly when the pump is operating outside

of peak efficiency or when extraction exceeds the crop's calculated Evapotranspiration

(ET) rate.

Water Court Integrity: In the event of an water rights dispute, the PFA's unbroken data log

<https://gemini.google.com/app/7d9f7fc3aa518d8b> 5/5

<div style="page-break-after: always;"></div>

# Master Specification: Regional Superstation (RSS) V1.3

**Role**: Regional Cortex & Master Librarian | **Tier**: Layer 3 (Territory Master) | **Location**: Monte Vista Hub, SLV

The Regional Superstation (RSS) is the absolute "Cortex" of the FarmSense network for Subdistrict 1. It serves as the physical high-performance computing anchor, the master data repository, and the primary logistics staging ground for the regional Digital Water Ledger. Unlike the field-level VFA or the district-level DHU, the RSS is designed for heavy-lift spatial analytics and long-term legal data vaulting. It houses the **Oracle Multi-Core Compute Layer** and the Oracle Vault, providing the computational horsepower required to turn hundreds of millions of raw sensor "chirps" into hyper-accurate 1m-resolution Enterprise maps, while managing the heavy Fully Homomorphic Encryption (FHE) overhead for long-term secure vaulting.

**Operational Philosophy**: The RSS is the bridge between field-level IoT hardware and cloud-scale scientific modeling. It serves as the physical backbone for the **Command & Control (C&C)** portal, providing the internal workforce with a unified interface for subdistrict-wide monitoring and fleet deployment, including XR workforce role support. It is engineered to ensure that even during total regional internet failures or cellular blackouts, the subdistrict's water accounting data remains intact, auditable, and legally irrefutable. Furthermore, the RSS acts as the "Sled Hospital" for the seasonal extraction program, ensuring the 10-year hardware lifecycle is maintained through precision maintenance, trickle-charging, and nitrogen re-pressurization. By centralizing the intelligence and maintenance of the subdistrict, the RSS reduces the marginal cost of data management while maximizing the legal "Seniority" of the members' water rights.

## 1. Facility Architecture: The Linear High-Cube Command Center

The RSS utilizes a 40' High-Cube (HC) Modified Shipping Container as its structural foundation. To maintain thermal stability and operational flow within the narrow 7'8" (2.35m) internal width, the facility is divided into three distinct functional zones in a "Dirty-to-Clean" linear progression. This layout is specifically designed to facilitate the "Field Rapid" deployment model, where speed and precision are paramount.

### Zone A: The Logistics & Refurbishment Bay (20' x 7.7')

Located at the primary double-door end of the container, this zone handles the heavy physical movement of the "Rapid Deployment" deployment and serves as the primary intake for field hardware.

* **Tactical Fleet Dock**: Specifically dimensioned to house the Polaris Ranger-HD UTV and the Hydraulic Auger Trailer. With a 62" vehicle width, this leaves a 30" walk-aisle for personnel. The floor is reinforced with industrial-grade anti-slip diamond plating to withstand the weight of loaded UTVs and the constant tracking of SLV alkali dust.
* **The Sled Hospital (The Circular Economy Hub)**: A longitudinal stainless steel workbench (12' long) equipped with automated JIGs. This is the heart of the hardware's 10-year survival strategy.
* **Nitrogen Station**: Includes a manifold for flushing and re-pressurizing sleds to +5 psi with Dry Nitrogen. This slight over-pressure is critical; it creates an internal atmosphere that is denser than the surrounding air, actively pushing out moisture and preventing the ingress of groundwater even if the Viton seals experience microscopic wear over a decade.
* **Seal Validation & QC**: Features a specialized digital pressure-decay tester. Every sled extracted during the harvest window must pass a 15-minute seal integrity test before being moved to the trickle-charge racks.
* **Environmental Barrier**: A heavy-duty, clear industrial strip curtain separates Zone A from Zone B. This provides a secondary thermal and dust barrier, ensuring that the abrasive particulates from the maintenance bay do not migrate into the sensitive electronics zones.

### Zone B: Inventory Staging & Ready-Rack (10' x 7.7')

The intermediate zone acts as the supply chain buffer, ensuring the field crews are always equipped for maximum daily "Rapid Deployment" output.

* **The Ready-Rack**: High-density vertical shelving designed to hold 3-5 days of installation inventory (approx. 500 units). These racks are organized by "Pivot Kits," pre-packaging the 1 VFA and 8-10 LRZs required for a standard 160-acre center-pivot deployment.
* **Burn-in & Calibration Benches**: Before any sled is cleared for Zone A loading, it is placed on the "Burn-in Bench." Here, every sensor sled is GPS-tagged and undergoes a 24-hour verification cycle, syncing with the local DHU mesh to ensure the radio chipset and the u-blox GNSS module are achieving sub-meter locks before they ever hit the soil.

### Zone C: The "Clean" Core & Server Vault (10' x 7.7')

The most protected, hermetically sealed section at the far end of the container, accessible only to tier-1 technical staff.

* **Oracle Cortex & Vault Storage**: Houses the multi-core compute clusters and the high-density storage arrays. The server racks are mounted on specialized vibration-dampening feet to protect the spinning storage media from the rumble of passing heavy farm equipment.
* **Precision HVAC & Thermal Dynamics**: Utilizes a Mitsubishi Hyper-Heat Mini-Split with an integrated low-ambient kit. In a room only 77 sq. ft in size, the HVAC system can cycle the entire air volume every 90 seconds. This creates a hyper-stable thermal environment, maintaining exactly 68°F ± 1° even when external SLV ambient temperatures plunge to a "Polar Vortex" low of −40°F.
* **Air Scrubbing**: A dual-stage HEPA filtration system runs 24/7. This is non-negotiable in the San Luis Valley, where the fine alkali dust can be highly conductive and corrosive; even a microscopic layer on a high-speed NVMe contact can lead to data corruption in the Oracle Vault.

## 2. Computational Infrastructure: Oracle Unified Compute

The RSS provides the local muscle for FarmSense’s primary software engine, ensuring that "Digital Water Ledger" transactions are processed with sub-second latency and absolute cryptographic certainty.

### Oracle Multi-Core Compute (The Scientist)

* **Processing Power**: 64-Core AMD Threadripper PRO with 256GB of ECC RAM and dual NVIDIA RTX data-processing GPUs.
* **Mathematical Logic**: This cluster is responsible for the massive Bayesian math required to synchronize data from 15,600 LRZ sensors. Oracle executes Localized Kriging, an advanced geostatistical interpolation method that "fills in the gaps" between physical sensors.
* **Function**: By processing these math "Worksheets" locally, the RSS can generate hyper-granular 1m grid "pops" for Enterprise Tier users and host the regional Map Tile server. This local processing allows the FarmSense UI and **Command & Control (C&C)** field tools to be snappy and responsive, serving high-resolution map tiles and XR deployment overlays without the multi-second latency of cloud round-trips.

### The Oracle Vault (The Master Librarian)

* **Storage Hardware**: 50TB WD Gold Enterprise NVMe Array in a RAID-10 configuration for maximum read/write performance and 100% data redundancy.
* **Spatial Query Engine**: Oracle manages the master spatial database. It combines raw moisture chirps with localized context—NDVI maps from Satellite, the Aerial Fleet, 1m DEM (Digital Elevation Models), and historical soil texture maps. To support the **Command & Control (C&C) XR Toolkit**, Oracle implements **Frustum-Aware Streaming**, dynamically culling regional map tiles to serve only the high-resolution 1m data required for the technician's immediate visual field. This reduces XR device bandwidth by >90% during regional rapid deployments.
* **Legal Integrity**: Every incoming data packet is cryptographically signed at the source (VFA/PFA) using 128-bit AES keys and verified at the RSS before being committed to. This creates an Immutable Audit Trail. In a Water Court dispute, this allows the district to present a minute-by-minute, tamper-proof record of water use that is virtually impossible to challenge.

## 3. Triple-Redundant Networking & Power

Following the "Fiber-First" mandate, the RSS acts as the primary backhaul hub for the entire regional mesh, ensuring the "Digital Twin" of Subdistrict 1 is always online.

### The Networking Spine

* **Primary (Fiber ONT)**: Wherever possible, a dedicated fiber-to-the-premise (FTTP) line is trenched to the RSS to provide symmetrical gigabit speeds. This is the primary pipeline for syncing the Oracle Vault with the FarmSense Cloud Backup.
* **Secondary (Starlink Business)**: A high-performance Starlink dish is mounted on a 100ft regional distribution tower. It provides a low-latency satellite backhaul if the regional fiber is cut or during large-scale utility failures.
* **Tertiary (900MHz Mesh Peering)**: The RSS maintains a high-power 900MHz peer-to-peer radio link with neighboring District Hubs (DHUs). This ensures that critical "Soft Stop" commands (e.g., stopping a pump because a pivot has stalled) can move across the basin even during a total internet and cellular blackout.

### Resilient Power Plant (Off-Grid Capability)

* **Solar Harvest**: 1.2kW ground-mounted rigid mono-crystalline array located within the secure fenced perimeter. The array is tilted at a steep 55-degree angle to shed heavy Colorado snow loads automatically.
* **Battery Storage**: 800Ah 48V Heated LiFePO4 bank. Internal heating pads draw power from the first 5% of morning solar production to warm the cells above +5°C before allowing the charge current to flow, preventing cold-plate lithium plating and ensuring a 10-year battery lifespan.
* **Autonomous Backup**: A 5kW dual-fuel (Propane/Gas) Honda EU7000iS generator. If the battery bank drops below 30% state-of-charge (SOC) during a prolonged winter storm, the RSS triggers an auto-start sequence to recharge the bank and maintain the HVAC systems for the server vault.

## 4. Hyper-Granular RSS CapEx & Procurement (Subdistrict 1)

This ledger reflects the absolute cost for a fully operational 40' HC RSS hub, encompassing everything from the structural modifications to the specialized "Rapid Deployment" deployment fleet.

| Category | Component Description | Supplier / Detail | Unit Cost |
| :--- | :--- | :--- | :--- |
| Structure | 40' HC Container | Western Container | $18,000 |
| Climate | Mini-Split + HEPA | Mitsubishi | $4,500 |
| Compute | 64-Core Threadripper | Puget Systems | $22,000 |
| Storage | 50TB NVMe Array | WD Gold | $12,500 |
| Network | Fiber + Starlink | Local / SpaceX | $6,500 |
| Security | AI Perimeter + Fence | Verkada | $15,000 |
| Power | 1.2kW Array + LFP | Renogy | $14,000 |
| Backup | 5kW Gen (Auto-Start) | Honda | $5,500 |
| Fleet | 4WD Heavy Duty UTV | Polaris | $28,500 |
| Trailer | Mobile Lab + Auger | Proprietary | $15,000 |
| Software | Oracle Unified Compute | FarmSense Core | $50,000 |
| O&M | Y1 Ops Contingency | Local Supply | $20,500 |
| **TOTAL** | **RSS Project Total** | | **$212,000** |

## 5. Strategic Value: ROI & The 10-Year Lifecycle

By investing $212,000 in a centralized RSS, FarmSense dramatically lowers the per-acre cost of high-precision irrigation management across 150,000 acres.

* **Maintenance ROI (The Sled Hospital Effect)**: The centralized refurbishment model allows the district to treat sensors as long-term assets rather than disposables. A failed $167 VFA sled can be brought to the Sled Hospital and repaired for less than $15 in parts (new O-rings and a fresh cell), allowing the district to recycle hardware indefinitely and preserving the initial capital investment.
* **The "Digital Twin" Revenue Multiplier**: The RSS is what makes the 1m Enterprise resolution possible. By hosting the Oracle compute layer locally, the RSS facilitates the "Resolution Pop" feature in the farmer's app. This high-conversion UI feature is the primary driver for SaaS upgrades, effectively paying for the RSS infrastructure through increased subscription revenue within the first 24 months.
* **Legal Defensibility & Aquifer Security**: In the high-stakes environment of Subdistrict 1, data is a weapon. The RSS provides the "Empirical Fortress" required to win Water Court disputes. By storing signed, encrypted data locally in the Oracle Vault, the district can prove its water stewardship regardless of global cloud outages or geopolitical instability, securing the seniority of its members' water rights for the next generation of farmers.

<div style="page-break-after: always;"></div>

# Master Specification: Vertical Field Anchor (VFA) V1.21

**Role**: Field-Level \"Truth\" Node | **Network Density**: 1 VFA per Field (Reporting directly to the PMT Field Hub)

As the primary field-level high-fidelity subsurface data logger, the Vertical Field Anchor (VFA) operates as a secure routing node and the critical baseline calibration tool—the absolute \"Truth\" node—for the **Oracle Unified Compute**.

**Network Topology**: There is exactly one VFA deployed per field. The VFA is \"Pinned\" spatially by the high-precision PMT during the initial 24-hour calibration window, eliminating the need for internal GPS while maintaining sub-meter spatial integrity. Like the surrounding high-density Lateral Root-Zone (LRZ) scouts, the single VFA is responsible for securely routing its highly compressed, unified payload directly to the central PMT Field Hub located above on the pivot. By serving as the localized ground truth, the VFA ensures that absolutely no deep-profile data is lost during cellular blackouts. More importantly, it establishes the rigorous empirical baseline required for ultra-precision irrigation, yield optimization, and the strict legal water-use auditing demanded by local water authorities.

**The Seasonal Deployment Model**: To maximize the lifespan of the high-value electronics, the VFA utilizes a two-phase seasonal deployment strategy. The outer structural shells act as ultra-cheap, geo-located permanent docking stations that remain buried in the field year-round. This internal, highly sensitive sensor sleds are dropped into these shells after spring planting and physically extracted just prior to harvest. This workflow entirely eliminates the risk of deep-freeze winter battery degradation while perfectly preserving the exact spatial baseline required by the **RSS Oracle Compute**'s Kriging algorithms.

## 1. Structural Housing & Climate Control (The Seasonal Docking Station)

The VFA housing has been radically re-engineered using a dual-cylinder architecture designed to completely isolate external structural loads from the delicate internal electronics.

* **The Outer Shell (The Docking Station)**: Constructed from Standard 2\" Schedule 40 UV-Stabilized Rigid PVC (Inside Diameter: 2.067\" / 52.5mm). By utilizing an exact 4-foot (48-inch) cut, the outer 2\" pipe sits completely flush with the soil surface. This rigid shell stays in the ground over the winter, resisting sub-zero frost-shatter and deep soil compaction warping.
* **Low-Profile Antenna Mount**: The removable C&C Cap mounts a 3-foot SS-304 stainless steel whip antenna directly to its base via a heavy-duty spring. This gives the VFA an exact 3-foot profile above the soil, minimizing collision risk with tractor booms while remaining highly visible to the elevated PMT hub overhead.
* **Friction Molded Tapered Drive Tip**: The outer shell is sealed with a Custom PVC Tapered Driving Tip. To ensure extreme accuracy and a permanent monolithic weld, the tip is **friction molded**: the 48-inch PVC pipe is spun at extremely high speeds while being pressed slowly into a tapered mold, heating and melting the plastic into its precise final shape.
* **The Removable Internal Sled**: The core internal structure is a 48-Inch 50mm Co-Extruded Alpha-Sled constructed of **Rigid CPVC** designed to prevent long-axis bowing. This sled acts as a robust internal spine, clamping the 48U sequence of modular cartridges.
* **The Seasonal Climate (+5 psi Defense)**: Upon seasonal insertion, Viton (FKM) 2\" O-rings seal the CPVC sled against the PVC shell walls. The internal cavity is flushed and pressurized to +5 psi with Dry Nitrogen, creating an inert, zero-humidity environment that acts as an active defense against micro-fractures and groundwater ingress.

## 2. Custom Relay Logic & Encryption (The Hub Pipeline)

By stripping the VFA down to pure routing and encryption functions, we have intentionally offloaded all heavy cellular backhaul requirements and complex computations to the central Farm Hub and the **Command & Control (C&C)** backend.

* **128-Bit Edge Encryption**: The VFA encrypts its own high-fidelity deep-soil data using military-grade AES-256 protocols before transmitting it.
* **Direct PMT Routing**: Rather than acting as a mesh relay for the LRZs, the VFA sends its standalone 128-bit encrypted payload directly to the PMT Field Hub umbrella, mirroring the flattened architecture of the rest of the field sensors.
* **Local 900MHz Uplink**: The VFA utilizes a high-gain 900MHz LoRa uplink to bounce the secure payload directly to the elevated PMT Field Hub.

## 3. The "Proxy Method" Sensor Array (48-Inch / 48U Sequence)

The VFA employs advanced non-contact sensing, shooting high-frequency dielectric fields directly through the removable 50mm CPVC sled wall, across the nitrogen gap, and straight through the electromagnetically transparent permanent PVC shell.

**Locked 48U Physical Stack Sequence**:

* **Slot 1**: 1U Bulk Stamped Desiccant Pack (Apex moisture trap)
* **Slots 2-5**: 4U Battery #1 (3x 21700 lithium-ion cells for frost defense heating)
* **Slots 6-9**: 4U Extruded Spacer
* **Slot 10**: 1U Advanced Sensor (10" Depth: Active root zone proxy)
* **Slots 11-14**: 4U Battery #2
* **Slots 15-17**: 3U Extruded Spacer
* **Slot 18**: 1U Basic Sensor (18" Depth: Evaporation transition monitoring)
* **Slots 19-24**: 6U Extruded Spacer
* **Slot 25**: 1U Advanced Sensor (25" Depth: Mature root zone "Pivot Point")
* **Slots 26-29**: 4U Battery #3
* **Slots 30-34**: 5U Extruded Spacer
* **Slot 35**: 1U Basic Sensor (35" Depth: Descending wetting front tracking)
* **Slots 36-39**: 4U Battery #4
* **Slots 40-43**: 4U Extruded Spacer
* **Slots 44-47**: 4U Battery #5
* **Slot 48**: 1U Advanced Sensor (48" Depth: The Deep Percolation Anchor)

## 4. The Seasonal Deployment Workflow & OEM BOM

**The Post-Planting "Rapid Deployment" & Harvest Extraction**:

1. **Post-Planting Insertion**: Sensor sleds are dropped into the pre-located permanent PVC shells, locked, and pressurized in under 15 minutes.
2. **Harvest Extraction**: Prior to harvest, crews pull the C&C caps, extract the sleds for warehouse charging, and cap the shells with blanking plugs.

## 5. Hyper-Granular OEM Scale BOM (1,280 Unit Tier)

| Category | Component Detail | Supplier / Scale Method | Unit Cost | Ext. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Housing | 2\" SCH 40 UV-Stabilized PVC (4ft) | Direct Extruder | $3.25 | $3.25 |
| Housing | Friction Molded PVC Tapered Tip | Rotational Formed | $3.50 | $3.50 |
| Antenna | 3ft SS-304 Whip + Spring | Hub-Mount Pultruded | $3.50 | $3.50 |
| Adhesive | Industrial PVC Cement | Automated Bulk | $0.50 | $0.50 |
| Computing| nRF52840 \"Routing\" Board | Tier-1 PCBA | $8.50 | $8.50 |
| Seals | Viton (FKM) 2\" O-Rings (x2) | Bulk Supplier | $1.20 | $2.40 |
| Purge | Dry Nitrogen Gas Shell Fill | Automated Assembly | $0.15 | $0.15 |
| Climate | 1U Stamped Desiccant Matrix | Bulk Supply | $1.50 | $1.50 |
| Structure| 48\" CPVC AlphaSled Chassis | Continuous Extrusion | $3.75 | $3.75 |
| Structure| Extruded Rigid CPVC Spacers(22U)| Recycled Bulk | $0.35 | $0.35 |
| Power | 4U Battery Cartridges (21700x3) | Direct Cell Sourcing | $16.75 | $83.75 |
| Sensors | 1U Adv Sensor (NPK/EC/pH) | Fab-Direct Assembly | $14.00 | $42.00 |
| Sensors | 1U Basic Sensor (VWC/Temp) | Fab-Direct Assembly | $2.50 | $5.00 |
| **TOTAL** | **Per Unit Hardware Cost** | | | **$158.20** |
| | **(Absolute OEM Scale)** | | | |

<div style="page-break-after: always;"></div>

<div style="page-break-after: always;"></div>

# PART IV: MASTER DEVELOPMENT PLANS & BLUEPRINTS

# FarmSense: Master Development Plan

## 1. Executive Vision: The Global Water Ledger

FarmSense is the definitive sovereign water infrastructure—legally recognized, cryptographically secure, and scientifically absolute. Our mission is to replace stochastic, intuition-based agricultural practices with a high-fidelity, rule-based computational engine that serves as the "Global Water Ledger."

### Core Philosophy: Deterministic Farming

* **MAD Framework:** Implementation of Management Allowable Depletion (MAD) to treat soil as a "battery," mathematically eliminating deep percolation and water wastage.
* **Legal Defense:** A decentralized, unbreakable 128-bit AES cryptographic chain of custody for water rights evidence in State Water Courts.
* **Economic Optimization:** Continuous Cost-Benefit Analysis (CBA) preventing irrigation when marginal pumping cost exceeds marginal yield revenue.

---

## 2. Technical Architecture Baseline

### 2.1. Hierarchical Processing Stack

1. **Level 1 (Field):** **LRZ/VFA** (FHSS chirps) -> **PMT Hub** (50m Grid, EBK baseline).
2. **Level 2 (District):** **DHUs** (NVIDIA Jetson Nano) -> 20m/10m Grid (Go-based IDW).
3. **Level 3 (Regional):** **RSS** (64-Core Threadripper) -> 1m Grid (Python-based Regression Kriging + FHE).
4. **Level 4 (Global):** **Zo.computer Cloud** -> Multi-field analytics, Federated Learning.

### 2.2. Core Software Components

* **Backend:** FastAPI (async), PostgreSQL + TimescaleDB (Time-series), PostGIS (Spatial), Redis (Cache), RabbitMQ (Queue).
* **Edge Computing:** Go-optimized IDW interpolation with offline SQLite resilience.
* **Cloud Analytics:** NumPy/SciPy Regression Kriging incorporating Sentinel-2/Landsat-9 imagery.
* **Security:** JWT Authentication, 128-bit AES payload encryption, Secure Element (SE) chip integration (planned).

---

## 3. Phase 1: Pilot Validation (Now - June 2026)

**Goal:** CSU SLV 2-Field Pilot + Empirical Water Court Evidence.

### M1.1: Backend & Infrastructure Hardening (Weeks 1-4)

* [ ] Optimize TimescaleDB retention policies and continuous aggregates.
* [ ] Implement Dual-Layer Spatial Privacy (Contextual Anonymization) for cloud datasets.
* [ ] Set up Prometheus/Grafana monitoring on Zo server.
* [ ] Hardening of `adaptive_recalc_engine.py` for "Critical" event triggers.

### M1.2: Hardware Finalization & BOM (Weeks 5-8)

* [ ] **PMT:** Finalize LoRaWAN 900MHz gateway & u-blox ZED-F9P RTK logic.
* [ ] **PFA:** Implement Current Harmonic Analysis for predictive pump maintenance.
* [ ] **VFA/LRZ:** Finalize PVDF enclosure coating and HPC battery integration for -30°F survivability.
* [ ] Order prototype components for the CSU SLV pilot.

### M1.3: Portal Deployment & 3D Integration (Weeks 9-12)

* [ ] Deploy **Farmer Dashboard** (MapLibre + React).
* [ ] Deploy **Regulatory Portal** (Compliance reporting).
* [ ] **3D Terrain Integration:** Implement `TerrainService` (1m DEM data) and `TerrainMesh` for spatial visualization.
* [ ] Validate 1m Regression Kriging accuracy against SLV ground-truth.

### M1.4: Pilot Deployment & Data Ingestion (Weeks 13-16)

* [ ] Physical installation at CSU SLV (2 PMTs, 2 PFAs, 2 VFAs, 20 LRZs).
* [ ] Continuous data flowing to Zo via DHU backhaul.
* [ ] Verify 99.9% uptime and <5% Kriging error.

### M1.5: Legal Submission & Grants (Weeks 17-20)

* [ ] Generate **Subdistrict 1 Water Court Evidence Package**.
* [ ] Submit **Federal Federal ESG** pre-proposal (Deadline: March 26, 2026).
* [ ] Finalize Bill & Melinda Gates Foundation smallholder adaptation proposal.

---

## 4. Phase 2: Regulatory Capture (Q3-Q4 2026)

**Goal:** 100% SLV Subdistrict 1 coverage (1,280 fields, 25 DHUs) + PBFT Water Trading.

### 4.1. PBFT Alliance-Chain Implementation

* [ ] Develop decentralized PBFT consensus service in Go for the DHU "Black Box."
* [ ] Implement smart contracts for "Water Credit" tokenization and trading.
* [ ] 128-bit Cryptographic Chain-of-Custody for DWR audit trails.

### 4.2. DWR Integration

* [ ] Build **State Engineer Portal** for automated compliance submittal.
* [ ] Implement "Presumed Compliant" well status workflow.
* [ ] Basin-wide depletion visualization for state auditors.

---

## 5. Phase 3: State Standard (2027)

**Goal:** Colorado DWR primary tool & State-wide rollout.

### 5.1. Advanced Analytics & Privacy

* [ ] Upgrade RSS compute layer to support **FHE (Fully Homomorphic Encryption)** Kriging.
* [ ] Implement Real-time aquifer draw-down monitoring with emergency drought reflex logic.
* [ ] Historical audit replay for State Auditor investigations.

### 5.2. Regional Expansion

* [ ] Rollout 15+ RSS nodes across Front Range and Western Slope.
* [ ] Colorado River Compact Compliance automation.

---

## 6. Phase 4-5: National & Global Expansion (2028+)

* **National Layer (2028):** USDA/USGS Partnership, High Plains Aquifer expansion.
* **Sovereign Global (2029+):** International G2G treaties (Australia, Brazil), UN Water Security initiatives.

---

## 7. Strategic Grant & Funding Schedule

| Deadline | Lead | Amount | Tier |
|----------|------|--------|------|
| **Mar 26, 2026** | Federal Federal ESG | $500K-$2M | Defense Dual-Use |
| **Q3 2026** | Gates Foundation | TBD | Global Adaptation |
| **Q3 2026** | World Food Prize | $250K | Empirical Metrics |
| **Q4 2026** | Earthshot Prize | £1M | Innovation |

---

## 8. Development Success Metrics (Phase 1)

* [ ] **p95 Latency:** <200ms for API responses.
* [ ] **Ingestion:** Stress-tested up to 10K sensor readings/sec.
* [ ] **Accuracy:** Kriging RMSE < 0.05 m³/m³.
* [ ] **Resilience:** Hub-level "Reflex Logic" operational during backhaul blackout.

---

*Last Updated: 2026-02-28*
*Contact: <support@farmsense.io>*

<div style="page-break-after: always;"></div>

# FarmSense Development Roadmap

## Vision: Global Water Ledger

FarmSense as the definitive sovereign water infrastructure—legally recognized, cryptographically secure, scientifically absolute.

---

## Timeline Overview

| Phase | Timeline | Goal | Status |
|-------|----------|------|--------|
| **Pilot** | Now - June 2026 | CSU SLV 2-Field Pilot + Water Court Evidence | 🔄 Active |
| **Regional Master** | Q3-Q4 2026 | 100% SLV Subdistrict 1 coverage | 📋 Planned |
| **State Standard** | 2027 | Colorado statewide DWR adoption | 📋 Planned |
| **National Layer** | 2028 | USDA/USGS partnership | 📋 Planned |
| **Sovereign Global** | 2029+ | International G2G treaties | 📋 Planned |

---

## Phase 1: Pilot Validation (NOW - June 2026)

### Critical Deadlines

| Deadline | Date | Deliverable |
|----------|------|-------------|
| Federal Federal ESG Pre-Proposal | March 26, 2026 | Grant application submitted |
| CSU SLV Pilot Deployment | April 2026 | Hardware installed, data flowing |
| Water Court Evidence | June 2026 | Empirical hydrodynamic proof |
| World Food Prize Nomination | Q3 2026 | Empirical metrics package |

### Immediate Engineering Tasks

#### Week 1-2: Backend & API Hardening

* [ ] Verify all API endpoints return valid responses
* [ ] Test sensor data ingestion pipeline
* [ ] Validate Adaptive Recalculation Engine logic
* [ ] Set up PostgreSQL + TimescaleDB on Zo server
* [ ] Deploy docker-compose.zo-unified.yml

#### Week 3-4: Frontend Portal Deployment

* [ ] Deploy farmer-dashboard to Zo server
* [ ] Deploy regulatory-portal (compliance reporting)
* [ ] Deploy marketing-site (public landing)
* [ ] Configure Nginx routing for all portals

#### Week 5-6: Hardware Integration

* [ ] Finalize PMT firmware spec
* [ ] Finalize VFA firmware spec
* [ ] Finalize LRZ firmware spec
* [ ] Finalize PFA firmware spec
* [ ] Order prototype components
* [ ] Implement PBFT Alliance-Chain prototype (Draft spec)

#### Week 7-8: Grant & Documentation

* [ ] Finalize Federal Federal ESG pre-proposal (Deadline: March 26, 2026)
* [ ] Create pilot hardware BOM with costs
* [ ] Document Kriging validation methodology
* [ ] Prepare Water Court evidence template

### Technical Architecture for Pilot

```
┌─────────────────────────────────────────────────────────────┐
│                    FARMSENSE PILOT STACK                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ZO SERVER (brodiblanco.zo.computer)      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │  │
│  │  │ PostgreSQL  │  │ TimescaleDB │  │    Redis     │ │  │
│  │  │ + PostGIS   │  │ (time-series)│  │   (cache)    │ │  │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘ │  │
│  │         │                │                 │          │  │
│  │  ┌──────▼────────────────▼─────────────────▼───────┐ │  │
│  │  │              FASTAPI BACKEND                     │ │  │
│  │  │  • Sensor ingestion  • Adaptive recalc engine   │ │  │
│  │  │  • Kriging endpoints • Compliance reports       │ │  │
│  │  └──────────────────────┬──────────────────────────┘ │  │
│  │                         │                             │  │
│  │  ┌──────────────────────▼──────────────────────────┐ │  │
│  │  │                 NGINX REVERSE PROXY              │ │  │
│  │  │  /api → backend  /farmer → farmer-dashboard     │ │  │
│  │  │  /regulatory → regulatory-portal                │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              CSU SLV PILOT SITE (Center, CO)          │  │
│  │  ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐     │  │
│  │  │ PMT-1 │   │ PMT-2 │   │ PFA-1 │   │ PFA-2 │     │  │
│  │  │(Hub)  │   │(Hub)  │   │(Well) │   │(Well) │     │  │
│  │  └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘     │  │
│  │      │           │           │           │           │  │
│  │  ┌───▼───────────▼───────────▼───────────▼───┐     │  │
│  │  │         VFA-1 / VFA-2 (Ground Truth)       │     │  │
│  │  └─────────────────┬─────────────────────────┘     │  │
│  │                    │                                │  │
│  │  ┌─────────────────▼─────────────────────────┐     │  │
│  │  │    LRZ Fleet (16-20 units, 1 per 15 acres) │     │  │
│  │  └───────────────────────────────────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 2: Regulatory Capture (Q3-Q4 2026)

### DWR Integration Objectives

* [ ] State Engineer Portal UI
* [ ] Automated compliance submittal API
* [ ] "Presumed Compliant" well status workflow
* [ ] Basin-wide depletion visualization

### Cryptographic Audit Trail

* [ ] Secure Element (SE) chip integration in VFA
* [ ] Hardware-level packet signing
* [ ] Immutable ledger database schema
* [ ] Chain-of-custody verification API

### Resolution Pop Implementation

* [ ] 50m Free Tier (government baseline)
* [ ] 20m Basic Tier ($49/mo)
* [ ] 10m Pro Tier ($199/mo)
* [ ] 1m Enterprise Tier (custom)

---

## Phase 3: State Standard (2027)

### Colorado River Compact Compliance

* [ ] 15+ RSS deployments across Colorado
* [ ] Front Range coverage
* [ ] Western Slope coverage
* [ ] Real-time aquifer draw-down monitoring
* [ ] Emergency drought reflex logic

### State Auditor Portal

* [ ] Basin-wide aggregated depletion data
* [ ] Producer privacy protections
* [ ] Emergency pumping limit authority
* [ ] Historical audit replay

---

## Phase 4: National Layer (2028)

### USDA/USGS Partnership

* [ ] High Plains Aquifer expansion
* [ ] Federal Water Credits standard
* [ ] Cloneable Command Center
* [ ] Multi-state Kriging coordination

---

## Phase 5: Sovereign Global (2029+)

### International Deployment

* [ ] Australia RSS nodes
* [ ] Brazil RSS nodes
* [ ] UN Water Security initiatives
* [ ] Trans-boundary conflict resolution

---

## Key Technical Decisions

### 1. Librarian/Scientist Split

* **Oracle Vault** = Raw data storage (immutable)
* **Zo Server** = Computation layer (worksheets)
* Benefit: Governments audit science without compromising data vault

### 2. Worksheet Autonomy

* Local "Reflex Logic" at edge (Hub/VFA level)
* Functions during internet blackout
* Hydraulic autonomy prevents aquifer damage

### 3. Decentralized Resilience

* Each RSS is a peer node
* P2P verification prevents single point of failure
* **Edge Computing:** NVIDIA Jetson Nano optimization for 10m/20m IDW/Kriging interpolation with offline SQLite resilience.
* **Cloud Analytics:** NumPy/SciPy Regression Kriging incorporating Sentinel-2/Landsat-9 imagery on Zo Cloud.

---

## Revenue Model: Resolution Pop

| Tier | Resolution | Price | Target User |
|------|------------|-------|-------------|
| Free | 50m | $0 | Government baseline |
| Basic | 20m | $49/mo | Small farmers |
| Pro | 10m | $199/mo | Commercial farms |
| Enterprise | 1m | Custom | ESG, enforcement, transfers |

**Economic Logic:**

* Free tier ensures 100% market participation (compliance hook)
* Enterprise tier drives high-margin revenue
* Subsidizes state baseline infrastructure

---

## Success Metrics

### Pilot Phase (June 2026)

* [ ] 2 fields instrumented
* [ ] 16-20 LRZs deployed
* [ ] 2 PMTs operational
* [ ] 2 PFAs at wellheads
* [ ] Continuous data flowing to Zo
* [ ] Kriging validation <5% error

### Regional Master (Q4 2026)

* [ ] 100% Subdistrict 1 coverage
* [ ] DWR "Rule-Compliant" status
* [ ] Water Court evidence accepted

### State Standard (2027)

* [ ] Colorado DWR primary tool
* [ ] Colorado River Compact compliance
* [ ] 15+ RSS nodes operational

---

## Non-Dilutive Funding Strategy

| Grant | Deadline | Status | Amount |
|-------|----------|--------|--------|
| Federal Federal ESG | March 26, 2026 | 🔄 Drafting | $500K-$2M |
| Bill & Melinda Gates | Q3 2026 | 📋 Planned | TBD |
| World Food Prize | Q3 2026 | 📋 Planned | $250K |
| Earthshot Prize | Q4 2026 | 📋 Planned | £1M |

---

*Last updated: 2026-02-24*

<div style="page-break-after: always;"></div>

# Sprint Plan: Pilot Validation

**Sprint Duration**: Week 1 (Feb 24 - Mar 2, 2026)
**Sprint Goal**: Deploy core backend + farmer dashboard to Zo server

---

## Sprint Backlog

### Priority 1: Backend Deployment (Days 1-3)

* [ ] Install Python dependencies

* [ ] Set up PostgreSQL database
* [ ] Run database migrations
* [ ] Start FastAPI backend
* [ ] Verify all API endpoints respond
* [ ] Test sensor ingestion endpoint

### Priority 2: Database Setup (Days 2-4)

* [ ] Create PostgreSQL database

* [ ] Enable PostGIS extension
* [ ] Run schema migrations
* [ ] Seed test data
* [ ] Verify queries work

### Priority 3: Frontend Deployment (Days 3-5)

* [ ] Build farmer-dashboard

* [ ] Deploy via nginx
* [ ] Test farmer-dashboard loads
* [ ] Verify API connection from frontend

### Priority 4: Hardware Documentation (Days 5-7)

* [ ] Finalize PMT BOM with costs

* [ ] Finalize VFA BOM with costs
* [ ] Finalize LRZ BOM with costs
* [ ] Finalize PFA BOM with costs
* [ ] Create procurement spreadsheet

### Priority 5: Grant Preparation (Parallel)

* [ ] Draft Federal ESG pre-proposal outline

* [ ] Gather pilot metrics
* [ ] Prepare budget justification

---

## Daily Standup Template

**Yesterday**: What was completed
**Today**: What's being worked on
**Blockers**: What's preventing progress

---

## Definition of Done

* [ ] Code committed to main branch
* [ ] API endpoints return valid responses
* [ ] Frontend loads and connects to backend
* [ ] Database queries return expected data
* [ ] Documentation updated

---

## Notes

* Focus on **working software** over perfect architecture
* Pilot deadline is June 2026 — we have time but need momentum
* Federal ESG deadline March 26, 2026 is HARD deadline

---

*Sprint started: 2026-02-24*

<div style="page-break-after: always;"></div>

# FarmSense: System Architecture

The FarmSense infrastructure is an uncompromising, decentralized monolithic grid that functions indigenously without relying on external or public cloud services. Designed for deployment in rural, extreme weather environments, the architecture operates synchronously across multiple tiers, securing data integrity for legal auditing.

## Backend Intelligence (Decentralized Cloud Layer)

* **RSS Oracle Vault (Master Database & Compute):** The central nervous system of FarmSense. It houses the master spatial library, historical datasets, and the consolidated **Zo Compute Layer**. It is responsible for executing Bayesian priors, generating deterministic "Worksheets," and pre-rendering the 1m-resolution Enterprise map tiles.

## Regional & District Edge Infrastructure

Relying entirely on external backhauls in rural zones creates unacceptable vulnerability. Heavy computational loads process continuously at the edge:

* **Regional Superstation (RSS) [Level 3 - Territory Master]:** A localized cloud counterpart housed in a modified 40-foot High-Cube container. Features a 64-Core AMD Threadripper PRO cluster, 256GB ECC RAM, and a 50TB Enterprise NVMe array securing the master spatial database. Will support FHE (Fully Homomorphic Encryption) Kriging modeling at **1m spatial fidelity**.
* **District Hubs (DHU) [Level 2 - Regional Mesh Manager]:** Edge coordinators mounted on 35-foot Class 4 timber poles. Line-of-sight 10km radius. Runs an NVIDIA Jetson Nano edge processor. Capable of instant "Reflex Logic" responses bypassing cellular latency. Processes **20m and 10m spatial fidelity** grids.
  * **Audit Node Addendum**: Houses a cryptographically signed (128-bit AES) "Black Box" cache.

## Field-Level Edge Hardware

Sensors and actuators deployed below and above ground across field zones. Equipment strictly utilizes UV-shielded (fluoropolymer coated) Polycarbonate due to altitude degradation risks and requires Hybrid Pulse Capacitors (HPC) for extreme-cold \-30°F survivability.

* **Vertical Field Anchors (VFA) [Level 1 - Advanced Peer Node]:** The 48-inch deep-profile central ground-truth soil node. Downgraded from a routing hub to a highly efficient peer, it uses a flush 3-foot antenna to transmit 128-bit encrypted FHSS payload data directly to the elevated PMT.
* **Lateral Root-Zone Scout (LRZ) [Level 1 - Spatial Mapper]:** Mass-produced "dumb nodes" deployed at a 1:15-acre density. Utilizes high-frequency Frequency-Hopping Spread Spectrum (FHSS) chirps, providing inherent Low Probability of Intercept/Detection (LPI/LPD) features natively desirable under Federal architectures. Enclosures feature 50mm non-contact capacitive telemetry fields.
* **Pressure & Flow Anchor (PFA) [Sentry of the Source]:** Mounts at the wellhead, monitoring vibration torque ripple, cavitation, and bearing wear via 400A CT Clamps. Runs NXP Cortex-M7 edge processors preparing to process Current Harmonic Analysis signatures. Uses 2.4GHz High-Gain links to bounce data to the elevated PMT, safely bypassing canopy interference.
* **Pivot Motion Trackers (PMT) [Level 1.5 - Field Hub & Edge-EBK Engine]:** The command center and Nervous System of the field, mounted 10-15 feet high on the pivot span.
  * **RF Umbrella:** Receives 900MHz FHSS chirps from the VFA/LRZs and 2.4GHz payloads from the PFA, bundling the entire field state into a single ~187-byte AES-256 payload and blasting it to the DHU via 900MHz LoRaWAN.
  * **Sensors:** Generates +/- 1% flow accuracy non-invasively using Badger Meter ultrasonic transit-time components. Contains u-blox ZED-F9P RTK GNSS modules for sub-2.5m horizontal spatial resolution and Bosch BNO055 9-Axis IMUs for vibration harmonics.
  * **Edge IQ:** Constant Edge-EBK processing utilizing an onboard ATSAMD51 Cortex-M4 FPU to continuously calculate a **50m spatial fidelity** EBK spatial probability grid using "Fisherman's Attention" and Ripple/Collapse logic. This constant baseline enables hierarchical processing upstream (20m/10m grids at DHU, 1m at RSS/Cloud). It inherently serves as zero-downtime VRI failover guidance if the DHU uplink drops.
  * **Corner-Swing Auditor (CSA)** variants utilize dual-node configurations (Primary Span Tracker and Swing-Arm Tracker) to resolve swing-arm irrigation mechanics mathematically.

## Dual-Layer Spatial Privacy Architecture

To comply with strict privacy laws surrounding accurate geolocation data, FarmSense segments analytics logically:

1. **Internal Legal Ledger (Absolute Precision):** Exact GPS data locked cryptographically within the DHU cache. Strictly preserved unmodified for legal evidentiary submission.
2. **Contextual Anonymization (Federated Learning):** Data uploaded for broader analysis and global model training is contextually anonymized, obfuscating individual localized geometries while maintaining regional hydro-climate validity.

<div style="page-break-after: always;"></div>

# FarmSense: BLUEPRINT

## Vision Statement

To establish FarmSense as the definitive "Global Water Ledger" — the legally recognized, cryptographically secure, and scientifically absolute source of truth for water management, recognized by state engineers and national governments worldwide.

## The Core Philosophy: Deterministic Farming Operating System

FarmSense seeks to replace stochastic, intuition-based agricultural practices with a high-fidelity, rule-based computational engine. The platform optimizes the Soil-Plant-Atmosphere Continuum (SPAC) using an expansive multi-layered sensor network.

Our core methodology shifts from simple agronomic optimization to providing critical legal and financial defense for water rights.

## Problem Statement

In extreme regulatory environments (like the Rio Grande Basin and Subdistrict 1), traditional agriculture faces existential threats from aquifer depletion and subsequent high groundwater pumping fees. Current precision ag tools operate as "black boxes" lacking legal defensibility or absolute empirical grounding.

## The FarmSense Solution

By unifying edge computing, hyper-local meteorological and edaphic physics, and immutable continuous reporting, FarmSense achieves:

* **Agronomic Output**: 20-30% reduction in irrigation water consumption alongside an 18-22% increase in ROI.
* **Economic Output**: Continuous Cost-Benefit Analysis preventing the deployment of water when the marginal cost of pumping exceeds the marginal revenue of yield.
* **Legal Output**: A decentralized, unbreakable 128-bit AES cryptographic chain of custody serving as an empirical "Water Ledger" valid in State Water Courts.

## The Management Allowable Depletion (MAD) Framework

FarmSense synthesizes weather forecasts, localized soil properties, and vegetation stress models to strategically delay irrigation to the "last possible minute." This technique treats the dynamic deep soil profile as a battery, mathematically eliminating deep percolation and water wastage.

## Phased Approach & Dual-Use

* **Civilian Scaling**: Targeting immediate 2-field pilot validations to freeze punitive regulatory mandates, while building momentum for Earthshot and World Food Prize grants.
* **Defense/Federal (Dual-Use)**: Designing infrastructure to serve as a Highly resilient, Environmental Unattended Ground Sensor (UGS) network (Inter-agency compliant), leveraging native FHSS architecture for Low Probability of Intercept (LPI) properties.

<div style="page-break-after: always;"></div>

# FarmSense: Platform Feature Set

FarmSense encompasses a complete suite of precision agriculture optimization methodologies combined with forensic legal tech. The feature set expands logically beyond standard crop metrics to empower resource accountability and geopolitical water stability.

## Core Application & Dashboard Capabilities

* **Digital Water Ledger & Audit Tracking**: Cryptographically signed, immutable chains of custody monitoring precise groundwater extraction and dispersal. Compliant as empirical evidence in State Water Courts.
* **Deterministic Irrigation Guidance**: Direct "withdraw or pump" boolean logic preventing water dispersal when macroeconomic models note that the operational cost (regulatory fees, energy, labor) outweighs predicted crop yield preservation.
* **Automated SPAC Modeling (Soil-Plant-Atmosphere Continuum)**: Dynamic integration of Soil Matric Potential (SMP), Volumetric Water Content (SWC), Electrical Conductivity (EC), Vapor Pressure Deficit (VPD), solar radiation, NDVI, and LSTM deep-learning Evapotranspiration forecasting.
* **Resolution Pop (Hierarchical Spatial Grids)**: Integration of high-fidelity 0.7cm/pixel multispectral drone data natively layered above a tiered sensor grid: **50m (PMT Edge IQ)**, **20m/10m (DHU)**, and **1m (RSS/Cloud)** spatial fidelity. Includes support for Satellite (Sentinel-2, Landsat) covariates.
* **Automated GLOBALG.A.P. Compliance Reports**: Single-click generation translating field hardware hydro-metrics into recognized sustainable farming criteria for global premium supply markets.

## Software-Driven Edge Hardware Expansions

Zero-cost, OTA software-only framework upgrades activating extreme analytical potential from existing Level-1/2 hardware processors:

* **Predictive Well Maintenance [PFA]**: Implementing Machine Learning Current Harmonic Analysis. The NXP Cortex-M7 utilizes 400A CT Clamps to detect minute "torque ripples," bearing wear, or cavitation prior to a catastrophic pump motor failure.
* **Machine-Learning Kriging [Zo]**: K-means clustering algorithms unifying sparse proximal data with high-frequency satellite integrations, massively increasing predictive model accuracy without additional sensors.
* **PBFT Alliance Blockchain Ledger [DHU]**: Transforming the 128GB passive "Black Box" memory module into an active, Byzantine fault tolerance consensus mechanism for executing hyper-local peer-to-peer groundwater trading rights.
* **Dual-Layer Contextual Anonymization**: Systematically dividing hyper-accurate, unmodifiable legal ledger data (for private court use) from anonymized, federally-shared machine learning analytics (obfuscating individual farmers).

## Strategic Defense/Federal "Dual-Use" Features (Inter-agency Alignment)

Aligning FarmSense hardware to operate optimally under contested deployment and military environments to support Environmental Security Technology Certification Program (Federal ESG) investments:

* **Low Probability of Intercept / Detection (LPI/LPD)**: Applying the LRZ's native 128-bit Frequency-Hopping Spread Spectrum (FHSS) framework to mitigate co-channel interference and adversarial jamming.
* **Rapid Deployment Housings**: Leveraging high-density Polycarbonate geometries and 15-degree tapered impact tips to enable airdrops (HALO/Low-Orbit). Allows the sensor fleet to auto-bury during sudden deployment as a covert, Unattended Ground Sensor (UGS) grid.
* **Fully Homomorphic Encryption (FHE)**: Upgrading the Central Zo Kriging Algorithms to calculate geostatistical processes directly upon encrypted incoming environmental data, maintaining military-grade confidentiality without requiring intermediary decryption loops.
* **Federated Data Fabric Adapters**: Software layers directly translating localized deterministic agricultural reads into standardized Joint All-Domain Command and Control (Inter-agency) networking protocols.

<div style="page-break-after: always;"></div>

# FarmSense Implementation Guide

## 📋 Implementation Phases (20 Weeks)

### Phase 1: Foundation (Weeks 1-4)

#### Week 1-2: Infrastructure Setup (Zo.computer Pivot)

* [ ] Provision custom Zo.computer server ($18 paid tier)
* [ ] Install Docker & Docker Compose on Zo.computer
* [ ] Deploy unified `docker-compose.zo-unified.yml` (Postgres, Timescale, Redis, RabbitMQ)
* [ ] Configure Nginx reverse proxy for the 7 frontend portals
* [ ] Set up CI/CD pipeline deployment hooks for Zo.computer
* [ ] Set up monitoring stack (Prometheus + Grafana) inside Zo

**Deliverables:**

* Infrastructure-as-Code (Terraform) ✓
* CI/CD pipeline operational
* Monitoring dashboards

#### Week 3-4: Core Data Models

* [ ] Implement database schema (migrations)
* [ ] Create SQLAlchemy models
* [ ] Set up API authentication (JWT)
* [ ] Implement basic CRUD operations
* [ ] Create seed data for testing

**Deliverables:**

* Database schema deployed
* API authentication working
* Basic CRUD endpoints

---

### Phase 2: Data Ingestion & Processing (Weeks 5-8)

#### Week 5: Sensor Data Pipeline

* [ ] Implement sensor data ingestion API
* [ ] Set up data validation and QA/QC
* [ ] Create batch ingestion endpoints
* [ ] Implement error handling and retry logic
* [ ] Set up data quality monitoring

**Key Files:**

* `backend/app/api/main.py` - API endpoints ✓
* `backend/app/models/sensor_data.py` - Data models ✓

#### Week 6: Edge Computing (20m Grid)

* [ ] Deploy edge processor to Raspberry Pi
* [ ] Implement IDW interpolation
* [ ] Set up offline caching
* [ ] Configure sync mechanisms
* [ ] Test with real sensor hardware

**Key Files:**

* `edge-compute/src/edge_processor.go` ✓
* `edge-compute/config/field_001.json` ✓

#### Week 7-8: Cloud Processing (1m Grid)

* [ ] Implement Regression Kriging pipeline
* [ ] Integrate Sentinel-2 imagery processing
* [ ] Set up Landsat historical data pipeline
* [ ] Implement variogram fitting
* [ ] Optimize for large-scale processing

**Key Files:**

* `cloud-processing/pipelines/kriging_1m.py` ✓

**Deliverables:**

* Dual-layer virtual sensor grid operational
* Edge devices deployed
* Cloud processing pipeline running

---

### Phase 3: Adaptive Recalculation & Analytics (Weeks 9-12)

#### Week 9-10: Adaptive Recalculation Engine

* [ ] Implement trend analysis logic
* [ ] Create mode determination algorithms
* [ ] Set up event-driven triggers
* [ ] Implement recalculation scheduler
* [ ] Test with various field scenarios

**Key Files:**

* `backend/app/services/adaptive_recalc_engine.py` ✓

**Deliverables:**

* Adaptive recalculation working across all modes
* Deterministic diagnostic queries available via API

---

### Phase 4: Dashboards & Compliance (Weeks 13-16)

#### Week 13-14: Farmer Dashboard

* [ ] Implement React frontend with MapLibre
* [ ] Create real-time field visualization
* [ ] Build irrigation recommendation UI
* [ ] Implement alert system (email/SMS)
* [ ] Mobile-responsive design

**Tech Stack:**

* React 18 + TypeScript
* MapLibre GL JS for maps
* Socket.io for real-time updates
* Material-UI components

#### Week 15: Regulatory Portal

* [ ] Build compliance report generator
* [ ] Implement SLV 2026 validation
* [ ] Create audit trail viewer
* [ ] Design export functionality (PDF/Excel)

#### Week 16: Testing & QA

* [ ] End-to-end testing
* [ ] Load testing (10K concurrent users)
* [ ] Security penetration testing
* [ ] UAT with pilot farmers

**Deliverables:**

* All dashboards operational
* Compliance reporting system live
* System tested and validated

---

### Phase 5: Optimization & Rollout (Weeks 17-20)

#### Week 17-18: Performance Optimization

* [ ] Database query optimization
* [ ] Implement caching strategies
* [ ] Optimize Kriging algorithms
* [ ] CDN setup for static assets
* [ ] Load balancer configuration

#### Week 19: Documentation & Training

* [ ] Complete API documentation
* [ ] Write user manuals
* [ ] Create video tutorials
* [ ] Conduct farmer training sessions
* [ ] Train support staff

#### Week 20: 2-Field Production Pilot Rollout

* [ ] Abandon generic 10-farm scaling deployment in favor of targeted high-fidelity 2-Field Pilot at CSU SLV Research Center, Center Colorado.
* [ ] Build & install Minimum Viable Hardware Stack under 2-Field constraints (2 PMTs, 2 PFAs, 2 VFAs, and 16-20 LRZs).
* [ ] Capture empirical Phase-1 data for the June 2026 Subdistrict 1 Water Court evidence submission.
* [ ] Submit Federal Federal ESG pre-proposal grant application by the March 26, 2026 deadline.
* [ ] Begin structuring metrics framing for the World Food Prize and Earthshot Prize packages.

**Deliverables:**

* Production system live (Center, Colorado SLV 2-Field Pilot)
* Documentation complete
* Empirical validation data generated
* Global infrastructure & defense grant packages initiated

---

## 🔧 Technical Implementation Details

### 1. Database Setup

```bash
# Connect to PostgreSQL
psql -h your-rds-host -U farmsense_user -d farmsense

# Run initialization
\i database/migrations/001_initial_schema.sql

# Verify tables
\dt
\d+ soil_sensor_readings
```

### 2. Backend Deployment

```bash
# SSH into Zo.computer
ssh ubuntu@your-zo-ip

# Run the deployment script
cd /opt/farmsense/deployment
chmod +x zo_deploy.sh
./zo_deploy.sh
```

### 3. Edge Device Setup

```bash
# On Raspberry Pi (SSH)
sudo apt-get update
sudo apt-get install -y golang-1.21 postgresql-client

# Clone and build
git clone https://github.com/your-org/farmsense.git
cd farmsense/edge-compute
go build -o edge_processor src/edge_processor.go

# Install as systemd service
sudo cp edge_processor /opt/farmsense/
sudo cp config/field_001.json /opt/farmsense/config.json
sudo cp deployment/systemd/farmsense-edge.service /etc/systemd/system/
sudo systemctl enable farmsense-edge
sudo systemctl start farmsense-edge

# Verify
sudo systemctl status farmsense-edge
```

### 4. Frontend Deployment

Frontends are now automatically containerized and routed via Nginx within the Zo.computer unified stack. No manual AWS S3/CloudFront invalidations are required for Phase 1.

```bash
# If developing locally, rebuild a specific portal:
docker-compose -f deployment/docker/docker-compose.zo-unified.yml up -d --build farmer-dashboard
```

### 5. Monitoring Setup

Available out-of-the-box via the unified Zo stack. (Pending `docker-compose.zo-unified.yml` expansion to include prometheus/grafana containers).

```bash
# Access Grafana locally hosted on the Zo server
http://your-zo-ip:3000
```

---

## 🧪 Testing Strategy

### Unit Tests

```bash
# Backend
cd backend
pytest tests/unit/ -v --cov=app --cov-report=html

# Edge module
cd edge-compute
go test ./... -v -cover
```

### Integration Tests

```bash
# Start test environment
docker-compose -f docker-compose.test.yml up -d

# Run tests
pytest tests/integration/ -v

# Cleanup
docker-compose -f docker-compose.test.yml down
```

### Load Testing

```bash
# Install k6
brew install k6  # macOS
# or: sudo apt-get install k6

# Run load test
k6 run tests/load/api_load_test.js
```

**Test Scenarios:**

* 1,000 sensor readings/second
* 10,000 concurrent dashboard users
* 1m grid computation for 100 hectare field
* Compliance report generation for 1 year data

---

## 📊 Performance Targets

| Metric | Target | Critical |
|--------|--------|----------|
| API Response (p95) | < 200ms | < 500ms |
| Sensor Ingestion Rate | 10,000/sec | 5,000/sec |
| 20m Grid Computation | < 30 sec | < 60 sec |
| 1m Grid Computation | < 5 min | < 10 min |
| Dashboard Load Time | < 2 sec | < 5 sec |
| System Uptime | 99.9% | 99.5% |
| Data Latency | < 1 min | < 5 min |

---

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Errors

```bash
# Check PostgreSQL status inside Zo
docker ps | grep postgres-core

# View logs
docker logs -f postgres-core

# Test connection via interactive shell
docker exec -it postgres-core psql -U farmsense_user -d farmsense_core -c "SELECT 1;"
```

#### Edge Device Offline

```bash
# Check edge device status
ssh pi@field-device
sudo systemctl status farmsense-edge

# Check local cache
ls -lh /data/field_001_cache.db

# View logs
sudo journalctl -u farmsense-edge -f
```

#### Kriging Computation Slow

```bash
# Check cloud processor
docker logs -f cloud-processor

# Monitor resource usage
docker stats

# Scale up Celery workers (Increase concurrency flag in compose file)
docker-compose -f deployment/docker/docker-compose.zo-unified.yml up -d --scale cloud-processor=4
```

---

## 📞 Support Contacts

* **Technical Lead**: <tech-lead@farmsense.io>
* **DevOps**: <devops@farmsense.io>
* **Support**: <support@farmsense.io>
* **Emergency**: +1-800-FARM-911

---

## 🎯 Success Criteria

### Technical

* ✅ All API endpoints operational
* ✅ 99.9% system uptime
* ✅ Sub-second dashboard response
* ✅ Real-time alerts working
* ✅ Compliance reports accurate

### Business

* ✅ 100+ farms onboarded
* ✅ 10,000+ hectares monitored
* ✅ 50,000+ sensors ingesting data
* ✅ 95% user satisfaction
* ✅ Regulatory approval achieved

---

**Next Steps**: Start with Phase 1 infrastructure setup and work through sequentially. Each phase builds on the previous one. 🚀

<div style="page-break-after: always;"></div>

<div style="page-break-after: always;"></div>

# PART V: APPENDICES (INTERNAL DOCS, PORTALS, FIRMWARE)

# FarmSense Project Memory

## CRITICAL INSTRUCTIONS FOR AI ASSISTANT

### Before Creating ANYTHING

1. **CHECK EXISTING ROUTES FIRST**: Use `list_space_routes` to see all current pages and APIs
2. **CHECK EXISTING FILES**: Use `grep_search` or `list_files` before creating new files
3. **CHECK AGENTS.MD**: Read this file at the start of every conversation for context
4. **ASSUME NOTHING EXISTS**: Always verify before assuming something needs to be created

---

## CURRENT PHASE: Pilot Validation (NOW - June 2026)

### Critical Deadlines

| Deadline | Date | Deliverable |
|----------|------|-------------|
| Federal Federal ESG Pre-Proposal | March 26, 2026 | Grant application submitted |
| CSU SLV Pilot Deployment | April 2026 | Hardware installed, data flowing |
| Water Court Evidence | June 2026 | Empirical hydrodynamic proof |

### Immediate Focus

1. Backend & API deployment to Zo server
2. Frontend portal deployment (farmer, regulatory, marketing)
3. Hardware BOM finalization and ordering
4. Federal ESG grant application drafting

---

## Architecture Principle: Anti-AI / Deterministic

FarmSense uses **deterministic, judgment-based algorithms** - NOT ML/AI black boxes.

* Water courts don't accept AI decisions
* All logic must be explainable and auditable
* See `file 'farmsenseOS/GENUINELY_NOVEL_IP.md'` for defensible moats

**Future AI**: Post-beta, sandboxed Digital Twin simulations only.

* See `file 'farmsenseOS/AI_INTEGRATION_ROADMAP.md'`
* **DO NOT ACT** until user says "begin to integrate AI per our previous discussions"

---

## Vision: Global Water Ledger

FarmSense as sovereign water infrastructure—legally recognized, cryptographically secure, scientifically absolute.

### Scaling Roadmap

1. **Pilot** (Now - June 2026): CSU SLV 2-Field Pilot
2. **Regional Master** (Q3-Q4 2026): 100% SLV Subdistrict 1
3. **State Standard** (2027): Colorado DWR adoption
4. **National Layer** (2028): USDA/USGS partnership
5. **Sovereign Global** (2029+): International G2G treaties

### Resolution Pop Revenue Model

| Tier | Resolution | Price | Target |
|------|------------|-------|--------|
| Free | 50m | $0 | Government baseline |
| Basic | 20m | $49/mo | Small farmers |
| Pro | 10m | $199/mo | Commercial farms |
| Enterprise | 1m | Custom | ESG, enforcement |

---

## Dependency Reduction

See `file 'farmsenseOS/DEPENDENCY_REDUCTION.0md'` for full plan.

* Phase 1 ✅: Removed numpy, pandas, scipy, scikit-learn, redis, celery, requests
* Next: Phase 3 (clsx/tailwind-merge replacement)

---

## Project Overview

**FarmSense** is a deterministic precision agriculture operating system designed for:

* **Agronomic Output**: 20-30% reduction in irrigation water, 18-22% increase in ROI
* **Economic Output**: Continuous Cost-Benefit Analysis preventing water deployment when costs exceed yield revenue
* **Legal Output**: Cryptographically secure "Water Ledger" valid in State Water Courts

### Core Philosophy

* **Deterministic, judgment-based algorithms** — NOT ML/AI black boxes

* All logic must be explainable and auditable for water court admissibility
* Future AI: Post-beta, sandboxed Digital Twin simulations only

### Current Deployment Target

**2-Field Pilot at CSU San Luis Valley (SLV) Research Center, Center, Colorado**

* Purpose: Generate empirical Gold Standard data for June 2026 Subdistrict 1 Water Court
* Hardware: 2 PMTs, 2 PFAs, 2 VFAs, 16-20 LRZs
* Grant deadline: Federal Federal ESG pre-proposal (March 26, 2026)

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    FARMSENSE PLATFORM                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────┐          │
│  │   Sensors   │  │   Pumps     │  │    Weather     │          │
│  │   (IoT)     │  │ (Telemetry) │  │   (Stations)   │          │
│  └──────┬──────┘  └──────┬──────┘  └───────┬────────┘          │
│         └─────────────────┴─────────────────┘                   │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │  PMT (Edge)  │  10-15ft pivot span mount   │
│                    │  50m Grid    │  Edge-EBK, FHSS hub         │
│                    └──────┬───────┘                            │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │    DHU       │  35ft pole, 10km radius     │
│                    │   20m Grid   │  Regional mesh manager      │
│                    └──────┬───────┘                            │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │ RSS / Cloud  │  40ft container cluster     │
│                    │    1m Grid   │  Regression Kriging         │
│                    └──────┬───────┘                            │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │   Zo Server  │  Core compute (this server) │
│                    │  Analytics   │  Adaptive recalc engine     │
│                    └──────────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Hardware Tiers

| Device | Level | Role | Density |
|--------|-------|------|---------|
| **LRZ** (Lateral Root-Zone Scout) | 1 | Dumb spatial mapper | 1 per 15 acres |
| **VFA** (Vertical Field Anchor) | 1 | 48" deep-profile truth node | 1 per field |
| **PFA** (Pressure & Flow Anchor) | Sentry | Wellhead pump telemetry | 1 per wellhead |
| **PMT** (Pivot Motion Tracker) | 1.5 | Field hub, edge-EBK engine | 1 per pivot |
| **CSA** (Corner-Swing Auditor) | 1.5 | Swing-arm tracking | Dual-node config |
| **DHU** (District Hub) | 2 | Regional mesh manager | 10km radius |
| **RSS** (Regional Superstation) | 3 | Territory master | Container cluster |

---

## File Locations

### Backend (FastAPI)

```
farmsense-code/backend/
├── app/
│   ├── api/
│   │   ├── main.py              # API entrypoint
│   │   ├── routers/
│   │   │   ├── hardware.py      # Sensor data ingestion
│   │   │   ├── users.py         # Admin user management
│   │   │   ├── metrics.py       # Stakeholder metrics
│   │   │   ├── grants.py        # Grants & investment
│   │   │   ├── analytics.py     # Geospatial analytics
│   │   │   ├── compliance.py    # SLV 2026 compliance
│   │   │   └── nexus.py         # Breakroom automation
│   │   └── tiles.py             # Map tiles
│   ├── models/
│   │   ├── sensor_data.py       # SQLAlchemy models
│   │   ├── devices.py           # Hardware models
│   │   └── user.py              # User models
│   ├── services/
│   │   ├── adaptive_recalc_engine.py  # Judgment-based recalc
│   │   ├── decision_engine.py         # Deterministic logic
│   │   └── grid_renderer.py           # Spatial grid rendering
│   └── core/
│       ├── database.py          # PostgreSQL/TimescaleDB
│       └── websocket.py         # Real-time updates
└── requirements.txt
```

### Frontend (React + TypeScript)

```
farmsense-code/frontend/
├── farmer-dashboard/        # Farmer field interface
├── regulatory-portal/       # SLV 2026 compliance
├── investor-dashboard/      # Investment portal
├── grant-portal/            # Grant reviewer portal
├── admin-dashboard/         # System admin
├── research-portal/         # Research data
├── docs-portal/             # Documentation
├── marketing-site/          # Public marketing
└── shared/                  # Shared design system
```

### Specifications

```
specifications/
├── Master Specification: Lateral Root-Zone Scout (LRZ) V1.21.md
├── Master Specification: Vertical Field Anchor (VFA) V1.21.md
├── Master Specification: Pressure & Flow Anchor (PFA) V1.9.md
├── Master Specification: Pivot Motion Tracker (PMT) V1.6.md
├── Master Specification: Corner-Swing Auditor (CSA) V1.0.md
├── Master Specification: District Hub (DHU) V1.1.md
├── Master Specification: Regional Superstation (RSS) V1.3.md
└── Master Specification: Aerial Fleet Strategy V1.3.md
```

### Reference Documents

```
reference/
├── Due Diligence and Systems Architecture Audit_ FarmSense San Luis Valley Pilot.md
├── FarmSense Long Term Roadmap.md
├── FarmSense: Technical Project Overview & Research Validation Guide.md
└── Subdistrict_1_Market_Intelligence.md
```

---

## API Endpoints

| Router | Prefix | Purpose |
|--------|--------|---------|
| hardware | `/api/v1/hardware` | Sensor data ingestion |
| users | `/api/v1/users` | Admin user management |
| metrics | `/api/v1/metrics` | Stakeholder metrics |
| grants | `/api/v1/grants` | Grants & investment |
| analytics | `/api/v1/analytics` | Geospatial analytics |
| compliance | `/api/v1/compliance` | SLV 2026 compliance |
| nexus | `/api/v1/nexus` | Breakroom automation |
| tiles | `/api/v1/tiles` | Map tiles |
| ws | `/ws` | WebSocket real-time |

---

## Tier Structure (CANONICAL)

| Tier | Price | Grid Resolution | Features |
|------|-------|-----------------|----------|
| Free | $0 | 50m | Read only, no actuation |
| Basic | $49/mo | 20m | Irrigation recommendations |
| Pro | $199/mo | 10m | Actuation, daily reports |
| Enterprise | Custom | 1m | Compliance guarantee, connect any hardware |

---

## User Types & Portals

| User Type | Portal | Description |
|-----------|--------|-------------|
| Farmer | `farmer-dashboard` | Field management, irrigation |
| Investor | `investor-dashboard` | Investment info, equity |
| Grant Reviewer | `grant-portal` | Grant applications, support letters |
| Admin | `admin-dashboard` | System management |
| Regulator | `regulatory-portal` | SLV 2026 compliance monitoring |
| Researcher | `research-portal` | Research data access |

---

## Adaptive Recalculation Modes

| Mode | Interval | Trigger |
|------|----------|---------|
| DORMANT | 4 hours | Stable conditions |
| ANTICIPATORY | 60 min | Anticipated changes |
| RIPPLE | 15 min | Active monitoring |
| COLLAPSE | 1 min | Critical events |

### Decision Logic (Judgment-Based, NOT AI)

1. **Critical events** → Immediate recalc (moisture drops >30% in 6h, pump failure)
2. **Out-of-turn triggers** → Event-driven (sensor anomalies, rainfall >10mm/h)
3. **Trend-based** → Scheduled (volatility score, moisture trends, irrigation status)

---

## Key Thresholds

```python
'moisture_stable_band': 0.05        # ±5% is stable
'moisture_active_threshold': 0.15   # >15% = active
'moisture_critical_threshold': 0.30 # >30% = critical
'trend_volatile_threshold': 2.0     # >2%/hr = volatile
'temp_stress_threshold': 35.0       # >35°C = heat stress
'rainfall_event_threshold': 10.0    # >10mm = significant
```

---

## Current Task Status

### Completed ✅

* [x] Rectify DHU BOM for 900MHz LoRaWAN gateway

* [x] Rectify architecture so PFA communicates with PMT (Not VFA)

* [x] Validate Thermal Loss capacity for 5W Kapton heater
* [x] Integrate HPC with PMT LiSOCl2 battery
* [x] Treat Polycarbonate with fluoropolymer coatings
* [x] Implement Predictive Maintenance via Current Harmonic Analysis
* [x] Integrate k-means ML Kriging algorithms

### Pending 🔄

* [ ] Implement PBFT Alliance-Chain Blockchain in DHU

* [ ] Build Federal Federated Data Fabric Adapters
* [ ] Implement Dual-Layer Spatial Privacy
* [ ] Develop automated GLOBALG.A.P. compliance reports
* [ ] Verify LPI/LPD logic on LRZ FHSS chirps
* [ ] Concept design for Rapid Deployment Housing
* [ ] Upgrade RSS for FHE Kriging operations
* [ ] Draft Federal Federal ESG pre-proposal (Deadline: March 26, 2026)

---

## Reading Order for New Developers

1. `BLUEPRINT.md` — Vision and existential threat context
2. `PROJECT_OVERVIEW.md` — Codebase delivery overview
3. `ARCHITECTURE.md` — Detailed system interactions
4. `FEATURESET.md` — Current capabilities and dual-use features
5. `IMPLEMENTATION_GUIDE.md` — Timeline and deployment sequences
6. `todo.md` — Active task board

---

## Performance Targets

| Metric | Target | Critical |
|--------|--------|----------|
| API Response (p95) | <200ms | <500ms |
| Sensor Ingestion | 10K/sec | 5K/sec |
| 20m Grid Compute | <30 sec | <60 sec |
| 1m Grid Compute | <5 min | <10 min |
| Dashboard Load | <2 sec | <5 sec |
| System Uptime | 99.9% | 99.5% |

---

## Hardware BOM Summary

**Minimum Viable Hardware Stack (2-Field Pilot):**

* 2x PMT (Pivot Motion Tracker)
* 2x PFA (Pressure & Flow Anchor)
* 2x VFA (Vertical Field Anchor)
* 16-20x LRZ (Lateral Root-Zone Scout)

**Total Investment**: $5,382,940 (for Subdistrict 1: 19,466 devices)

---

## Regulatory Context

* **Subdistrict 1**: ~150,000 acres, San Luis Valley, Colorado
* **Water Court Deadline**: June 2026
* **Compliance**: SLV 2026 regulatory alignment
* **Audit Requirement**: Immutable, cryptographically signed chain of custody

---

## Security Requirements

* JWT authentication for API
* 128-bit AES encryption for field data
* FHSS (Frequency-Hopping Spread Spectrum) for LRZ communications
* Dual-layer spatial privacy (exact GPS locked, cloud data anonymized)
* FHE (Fully Homomorphic Encryption) planned for RSS

---

## Dual-Use (Federal) Features

* LPI/LPD native FHSS architecture
* Inter-agency-compliant UGS network
* Air-deliverable kinetic penetrator housings
* FHE Kriging on encrypted data
* Federal ESG grant application in progress

---

*Last updated: 2026-02-24*
*Repository: github.com/bxthre3inc/farmsenseOS*
*Server: brodiblanco.zo.computer*

<div style="page-break-after: always;"></div>

# 🚀 FarmSense CI/CD Setup Guide

This guide explains how to connect your GitHub repository to your **Oracle** and **Zo.computer** instances for automated deployment.

## 1. Prepare Your Servers

On **BOTH** servers (Oracle and Zo), perform these one-time setup steps:

1. **Install Git & Docker**: Ensure git, docker, and docker-compose are installed.
2. **Clone the Repository**:

    ```bash
    cd ~
    git clone https://github.com/bxthre3/farmsense-implementation-package.git farmsense-code
    ```

    *(Note: Ensure the directory name matches `farmsense-code` as used in the workflow)*

## 2. Configure GitHub Secrets

Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**.

Add the following secrets:

### 🌍 Oracle Cloud (Map Stack)

| Secret Name | Value Description |
| ------------- | ------------------- |
| `ORACLE_HOST` | Public IP address of your Oracle instance |
| `ORACLE_USER` | SSH username (e.g., `ubuntu` or `opc`) |
| `ORACLE_SSH_KEY` | Private SSH Key (Content of your `.pem` file) |
| `ENV_FILE_ORACLE` | The full content of your `.env` file for Oracle. Must include: `POSTGRES_USER`, `POSTGRES_PASSWORD`, etc. |

### 🧠 Zo.computer (Core Platform)

| Secret Name | Value Description |
| ------------- | ------------------- |
| `ZO_HOST` | Public IP address of your Zo instance |
| `ZO_USER` | SSH username (e.g., `user` or `root`) |
| `ZO_SSH_KEY` | Private SSH Key |
| `ENV_FILE_ZO` | The full content of your `.env` file for Zo. |

Must include: `MAP_DATABASE_URL` pointing to Oracle IP. |

## 3. Deployment Flow

1. **Push** changes to the `main` branch.
2. **GitHub Action** triggers automatically.
3. **Job 1**: Deploys `docker-compose.oracle.yml` to Oracle.
4. **Job 2**: Deploys `docker-compose.zo.yml` to Zo (only runs if Oracle deploy succeeds).

## ⚠️ Troubleshooting

* **Permission Denied**: Ensure the SSH keys added to GitHub match the public keys in `~/.ssh/authorized_keys` on the servers.
* **Timeout**: Deployment might take time if building images from scratch. The workflow pulls changes and rebuilds.

<div style="page-break-after: always;"></div>

# FarmSense: Onboarding Guide

Welcome to FarmSense. This document serves as the introductory roadmap for engineers, agronomists, and system integrators deploying the Deterministic Farming Operating System.

## Immediate Deployment Scope

Our immediate operational objective centers on the specialized 2-Field Pilot at the CSU San Luis Valley (SLV) Research Center in Center, Colorado. This targeted deployment generates strictly empirical, Gold Standard verifiable hydrodynamic "Proof of Concept" data for the upcoming June 2026 Subdistrict 1 Water Court trials, bypassing traditional mass rollout requirements.

## Reading and Documentation Flow

Please familiarize yourself with the FarmSense project documentation in the following order:

1. **`BLUEPRINT.md`**: Start here to understand the core existential threat of aquifer depletion in the San Luis valley and the FarmSense "Deterministic" solution framework and operational philosophy.  
2. **`PROJECT_OVERVIEW.md`**: Provides a systemic overview of the codebase delivery, core system layers, and the dual-database architecture.
3. **`ARCHITECTURE.md`**: Explains the detailed interaction between the Decentralized Cloud intelligence, the Level 2 District Hubs (DHU), and the hardware Edge constraints across the fields (PMT Hub, VFA, LRZ, PFA).
4. **`FEATURESET.md`**: Lists the current production capabilities, zero-cost Edge software expansions, and our dual-use applicability for defense operations (Inter-agency integration, FHE, LPI/LPD).
5. **`IMPLEMENTATION_GUIDE.md`**: Maps out the structural timeline, hardware manufacturing objectives, deployment sequences, and performance validation metrics.
6. **`todo.md`**: The live, active issue board tracking the double-checkbox sprint tasks.

## Initial Developer Setup

1. **Extract and Prepare**:
    Navigate to the `farmsense-code` directory. Set up environment variables via `.env.example` templates.

2. **Docker Unified Stacks**:
    Our infrastructure operates heavily on local Edge containerization. Use our included unified compose scripts to spin up instances of PostgreSQL/TimescaleDB, Redis, the REST API, and Background Processing workers.

3. **Database Pre-Initialization**:
    The system utilizes PostGIS extentions and TimescaleDB hypertables. Run `001_initial_schema.sql` immediately on container startup.

4. **Kriging and Interpolation Verification**:
    Run `pytest` integration protocols to test the backend Adaptive Recalculation Engine rulesets prior to hardware telemetry mapping.

## Important Operational & Policy Context

* **Federal Funding and ARPA-E**: We are tailoring architectures to qualify for the Federal Environmental Security Technology Certification Program (Federal ESG) (Deadline: March 26, 2026). Ensure any Edge communication protocol changes (e.g. 5GHz/900MHz backhaul adjustments) maintain secure 128-bit encryption constraints.
* **Privacy Policy**: Our Spatial Privacy Framework requires all individual geographic point parameters sent to the Global Cloud to be contextually obfuscated. Do not bypass the Differential Privacy protocols applied downstream of the District Hub "Black Box".

<div style="page-break-after: always;"></div>

# FarmSense - Implementation Package Summary

## 🎉 Package Contents

This comprehensive implementation package contains **everything needed** to build and deploy FarmSense from scratch.

---

## 📦 What's Included

### 1. **System Architecture Documentation**

* **Complete technical specifications** (15 major sections, 80+ pages)
* System diagrams and data flow charts
* Technology stack decisions with trade-off analysis
* Deployment architecture (Decentralized Monolithic / Sovereign Edge)
* Security & compliance framework (SLV 2026)

**Access**: [System Architecture Document](https://docs.FarmSense.com/architecture)

---

### 2. **Backend Services** (Python/FastAPI)

#### Core Components

* ✅ **Data Models** (`backend/app/models/sensor_data.py`)
  * 7 complete SQLAlchemy models
  * PostGIS spatial data types
  * TimescaleDB time-series optimization
  * Full audit trail support

* ✅ **Adaptive Recalculation Engine** (`backend/app/services/adaptive_recalc_engine.py`)
  * Judgment-based timing logic (1min → 12hr)
  * 4 operational modes (Stable, Active, Critical, Out-of-Turn)
  * Event-driven trigger system
  * Configurable thresholds per crop/field

* ✅ **REST API** (`backend/app/api/main.py`)
  * 15+ endpoints for data ingestion, analytics, compliance
  * Real-time sensor ingestion (batch + streaming)
  * Virtual grid queries (20m & 1m)
  * Field analytics and irrigation recommendations
  * Compliance report generation

* ✅ **Database Layer** (`backend/app/core/database.py`)
  * PostgreSQL + PostGIS configuration
  * TimescaleDB integration
  * Connection pooling
  * Session management

**Lines of Code**: ~4,500 (Production-ready)

---

### 3. **Edge Computing Module** (Go)

#### Key Features

* ✅ **20m Virtual Grid Processor** (`edge-compute/src/edge_processor.go`)
  * IDW (Inverse Distance Weighting) interpolation
  * Real-time field-level computation
  * Offline resilience with local SQLite cache
  * Automatic cloud synchronization
  * Configurable recalculation intervals

* ✅ **Configuration System** (`edge-compute/config/field_001.json`)
  * Per-field configuration
  * Sensor mapping
  * Threshold customization
  * Alert definitions

**Lines of Code**: ~600 (Optimized for Raspberry Pi 4/Jetson Nano)

---

### 4. **Cloud Processing Pipeline** (Python)

#### Advanced Analytics

* ✅ **Regression Kriging** (`cloud-processing/pipelines/kriging_1m.py`)
  * 1m high-resolution interpolation
  * Multi-source data fusion (sensors + satellites)
  * Trend modeling with satellite covariates
  * Variogram fitting and validation
  * Uncertainty quantification (kriging variance)

* ✅ **Satellite Integration**
  * NDVI, NDWI calculation
  * Sentinel-2 and Landsat processing
  * Cloud masking and atmospheric correction
  * Historical trend calibration

**Lines of Code**: ~800 (NumPy/SciPy optimized)

---

### 5. **Deployment Infrastructure**

#### Docker Compose (`deployment/docker/docker-compose.yml`)

* **11 containerized services**:
  * PostgreSQL + PostGIS
  * TimescaleDB
  * Redis (caching)
  * RabbitMQ (message queue)
  * FastAPI backend
  * Cloud processor (Celery)
  * Farmer dashboard (React)
  * Regulatory portal (React)
  * Grafana (monitoring)
  * Prometheus (metrics)

* **One-command startup**: `docker-compose up -d`
* **Production-ready** with health checks, volume persistence, networking

#### Bare-Metal Systemd Services (Ready for RSS)

* Production service configurations
* Auto-restart policies
* Hardware resource limits
* Monitoring integration

---

### 6. **Database Schema**

#### Initialization Script (`database/migrations/001_initial_schema.sql`)

* ✅ PostGIS extension setup
* ✅ TimescaleDB hypertables (5 tables)
* ✅ Spatial indices (GIST)
* ✅ Composite indices for common queries
* ✅ Retention policies (2-year data retention)
* ✅ Continuous aggregates (hourly field stats)
* ✅ Sample data for testing

**Tables**: 7 core tables + 1 materialized view

---

### 7. **Configuration & Documentation**

#### Environment Configuration

* `.env.example` - Complete environment template
  * Database credentials
  * STAC endpoints and self-hosted MapLibre
  * Security keys (JWT)
  * Email/SMS alert configuration
  * Sovereign Data Vault credentials

#### Comprehensive Documentation

* **README.md** - Getting started guide
* **IMPLEMENTATION_GUIDE.md** - 20-week rollout plan
  * Phase-by-phase breakdown
  * Technical implementation details
  * Testing strategies
  * Performance targets
  * Troubleshooting guide

---

## 🏗️ Architecture Highlights

### Data Flow

```
Sensors → API → TimescaleDB → Edge (20m IDW) → Cloud (1m Kriging) → Dashboards
                                    ↓
                          Adaptive Recalc Engine
                        (1min/15min/12hr modes)
```

### Computational Layers

1. **Edge Layer**: Raspberry Pi 4 @ field (20m grid, offline-capable)
2. **Regional Superstation (RSS)**: Oracle Compute Node (1m grid, satellite integration, Analytics)
3. **Analytics Layer**: Real-time predictions, irrigation recommendations
4. **Compliance Layer**: SLV 2026 reporting, immutable audit logs

### Scalability

* **Sensors**: 100,000+ concurrent
* **Fields**: 10,000+ monitored
* **Data Rate**: 10,000 readings/second
* **Grid Points**: 1M+ per field (1m resolution)
* **Users**: 10,000+ concurrent dashboard access

---

## 🚀 Quick Start (5 Commands)

```bash
# 1. Extract package
tar -xzf farmsense-implementation-package.tar.gz
cd farmsense-code

# 2. Configure environment
cp .env.example .env
nano .env  # Add your API keys

# 3. Start all services
cd deployment/docker
docker-compose up -d

# 4. Initialize database
docker-compose exec backend python -m app.core.database

# 5. Access dashboards
# Backend API: http://localhost:8000/docs
# Farmer Dashboard: http://localhost:3000
# Monitoring: http://localhost:3002
```

---

## 📊 Deliverables Summary

| Component | Status | LOC | Technology |
|-----------|--------|-----|------------|
| System Architecture | ✅ Complete | 80+ pages | Documentation |
| Data Models | ✅ Complete | 350 | Python/SQLAlchemy |
| Adaptive Recalc Engine | ✅ Complete | 400 | Python |
| REST API | ✅ Complete | 450 | FastAPI |
| Edge Processor | ✅ Complete | 600 | Go |
| Cloud Kriging | ✅ Complete | 800 | Python/NumPy |
| Database Schema | ✅ Complete | 150 | SQL |
| Docker Compose | ✅ Complete | 200 | YAML |
| Configuration | ✅ Complete | 100 | JSON/ENV |
| Documentation | ✅ Complete | 500+ | Markdown |

**Total Production Code**: ~4,500 lines  
**Total Configuration**: ~600 lines  
**Total Documentation**: 100+ pages

---

## 🎯 Key Features Implemented

### ✅ Data Ingestion

* Multi-source sensor data (soil, pump, weather)
* Batch and streaming ingestion
* Data quality validation
* Anomaly detection

### ✅ Virtual Sensor Networks

* **Edge**: 20m grid with IDW interpolation
* **Cloud**: 1m grid with Regression Kriging
* Satellite data integration (Sentinel-2, Landsat)
* Historical calibration

### ✅ Adaptive Recalculation

* **4 operational modes**: Stable (12h), Active (15min), Critical (1min), Out-of-Turn
* Trend-based decision logic
* Event-driven triggers (sensor anomalies, weather)
* Configurable thresholds

### ✅ Analytics & Modeling

* Irrigation scheduling
* Crop stress detection
* Water deficit calculation
* Yield forecasting (ready for analytics modeling integration)

### ✅ Compliance Reporting

* SLV 2026 regulatory alignment
* Immutable audit trails
* Water usage tracking
* Export to PDF/Excel

### ✅ Dashboards

* Real-time field visualization (MapLibre)
* Irrigation recommendations
* Alert system (email/SMS)
* Multi-field analysis (consultant view)

---

## 🔧 Technology Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Backend** | FastAPI + Python 3.11 | High performance, async support |
| **Edge** | Go 1.21 | Low memory, fast, cross-compile |
| **Database** | PostgreSQL 15 + PostGIS | Spatial data, proven reliability |
| **Time-Series** | TimescaleDB | Optimized for sensor data |
| **Cache** | Redis 7 | Sub-millisecond latency |
| **Queue** | RabbitMQ 3.12 | Event-driven recalc triggers |
| **Frontend** | React 18 + TypeScript | Modern, maintainable |
| **Maps** | MapLibre GL JS | Open-source geospatial rendering |
| **Orchestration** | Systemd / Docker Compose | Monolithic Stability |
| **Monitoring** | Prometheus + Grafana | Industry standard |
| **Processing** | NumPy, SciPy, Rasterio | Scientific computing |

---

## 📈 Next Steps

### Immediate (Week 1)

1. Review architecture document
2. Set up Regional Superstation (RSS) hardware
3. Deploy PostgreSQL + TimescaleDB
4. Configure CI/CD pipeline

### Short-term (Weeks 2-8)

1. Deploy backend API to staging
2. Install edge processors on pilot fields
3. Integrate satellite data pipelines
4. Test adaptive recalculation with real data

### Medium-term (Weeks 9-16)

1. Train analytics models with collected data
2. Build farmer and regulatory dashboards
3. Conduct UAT with pilot users
4. Security audit and penetration testing

### Long-term (Weeks 17-20)

1. Performance optimization
2. National rollout preparation
3. User training and documentation
4. Production launch (100+ farms)

---

## 📞 Support & Resources

* **Architecture Doc**: [View Full Architecture Document](https://docs.FarmSense.com/architecture)
* **API Documentation**: <http://localhost:8000/docs> (after deployment)
* **GitHub Issues**: For bug reports
* **Email**: <support@farmsense.io>

---

## ✨ What Makes This Package Special

1. **Production-Ready Code**: Not just prototypes - actual working implementations
2. **Deployment Scripts**: One-command setup with Docker Compose
3. **Scalable Architecture**: Designed for national deployment (100K+ sensors)
4. **Real-World Validation**: Based on precision agriculture best practices
5. **Compliance-First**: SLV 2026 regulatory alignment built-in
6. **Extensible Design**: Modular, well-documented, easy to customize
7. **Complete Documentation**: 100+ pages covering every aspect

---

## 🏆 Success Metrics

The system is designed to achieve:

* **99.9%** uptime
* **<1 minute** data latency
* **10,000** readings/second ingestion
* **<5 minutes** for 1m grid computation (100 ha field)
* **<200ms** API response time (p95)
* **100%** SLV 2026 compliance

---

**Total Package Size**: 30 KB compressed  
**Estimated Implementation Time**: 20 weeks  
**Team Size**: 11 people (see architecture doc)  
**Deployment Cost**: Fixed CapEx + Minimal O&M (Sovereign hardware)

---

🌾 **Built for sustainable agriculture. Ready for immediate implementation.** 🚀

---

*Generated: 2026-02-12*  
*Package Version: 1.0.0*  
*Status: ✅ Complete and Deployment-Ready*

---

Project Name: FarmSense | Document Type: Technical Architecture Specification | Version:

1.0 | Date: February 2026

# **Project FarmSense Architecture** **Specification**

## **1. Executive Summary & System Overview**

Project FarmSense is a full-stack precision agriculture application designed to

bridge the gap between raw field telemetry and actionable regulatory compliance.

The system ingests data from heterogeneous sources—soil sensors, pump

telemetry, weather stations, and satellite imagery—to compute high-resolution virtual

sensor networks. By leveraging a dual-layer compute architecture (Edge 20m grid vs.

Cloud 1m grid), FarmSense delivers real-time operational insights for farmers while

ensuring rigorous audit-ready logging for regulatory bodies.

Key Objectives:

Precision: Downscaling satellite and sparse sensor data to a 1m resolution grid.

Responsiveness: Utilizing an adaptive recalculation engine that shifts between

12-hour trends and critical 1-minute updates.

Compliance: Automating SLV 2026 regulatory reporting with non-repudiable

audit logs.

## **2. System Architecture Overview**

The FarmSense platform utilizes a tiered Lambda architecture extended to the edge.

This hybrid approach ensures low latency for field operations while maintaining the

immense computational capacity required for high-resolution spatial interpolation in

the cloud.

High-Level System Topology

[ FIELD LAYER ]

Sensors | Pumps | Weather Stations

⬇ (LoRaWAN / MQTT)

[ EDGE GATEWAY ]

Data Buffering | 20m Grid Compute | Critical Alerting

⬇ (HTTPS / Secure WebSocket)

[ CLOUD INGESTION LAYER ]

Load Balancers | API Gateway | Kafka Event Bus

⬇

[ PROCESSING CORE ]

Stream Processing (Go Edge) | Batch Processing (Celery)

⬇

[ DATA PERSISTENCE ]

Time-Series DB | Spatial DB | Data Lake

⬇

[ APPLICATION LAYER ]

Dashboard API | Compliance Engine | ML Inference

## **3. Data Layer Architecture**

The data layer handles the ingestion, validation, and storage of high-velocity time

series data and high-volume geospatial rasters.

**Data Sources & Ingestion**

|Source|Protocol|Frequency|Data Type|
|---|---|---|---|
|Soil Moisture<br>Probes|MQTT / LoRaWAN|15 min|Volumetric Water Content (2<br>depths)|
|Vertical<br>Profling<br>Sensors|MQTT / LoRaWAN|30 min|Multi-depth moisture profle (4-<br>8 levels)|
|Pump<br>Telemetry|2.4GHz RF /<br>BLE|Real-time (1-5<br>sec)|Flow rate, Power status,<br>Pressure, Voltage|
|Weather<br>Stations|REST API / MQTT|10 min|Temperature, Humidity,<br>Rainfall, Wind, Solar Radiation|
|Sentinel-1<br>(SAR)|Copernicus Open<br>Access Hub API|6 days (with both<br>satellites)|Backscatter coefcient (soil<br>moisture proxy)|
|Sentinel-2<br>(Optical)|Copernicus Open<br>Access Hub API|5 days (with both<br>satellites)|Multispectral (NDVI, NDRE,<br>NDWI, LAI)|
|Landsat 8/9|USGS Earth Explorer<br>API|16 days|Thermal/Optical (Historical<br>baseline, 2013-present)|

**Data Preprocessing Pipeline**

Raw data undergoes a multi-stage preprocessing pipeline before storage:

1. Quality Control: Flagging out-of-range values, stuck sensors, and

communication errors.

1. Temporal Alignment: Synchronizing data from different sources to common

timestamps.

1. Atmospheric Correction: Sentinel-2 imagery processed with Sen2Cor for

surface reflectance.

1. Cloud Masking: Automated cloud detection using QA bands and ML-based

classifiers.

1. Landsat Index Computation: Pre-computing NDVI, NDMI, LST (Land Surface

Temperature) for calibration.

## **4. Edge Computing Layer (20m Grid)**

The edge layer is designed to operate with intermittent connectivity. It processes raw

telemetry locally to generate a coarse 20m virtual grid, ensuring farmers have

visibility even if the cloud connection is severed.

**4.1 Edge Hardware Specifications**

|Component|Specification|Purpose|
|---|---|---|
|Compute<br>Module|Raspberry Pi 4 (4GB) or NVIDIA<br>Jetson Nano|Main processing unit for local grid<br>computation|
|Storage|64GB Industrial microSD + 128GB<br>SSD|OS, application, 30-day data buffer|
|Connectivity|4G LTE modem + Ethernet backup|Cloud synchronization and remote<br>monitoring|
|Sensor<br>Interface|LoRaWAN Gateway (8-channel) +<br>MQTT broker|Collect data from feld sensors|
|Power|12V DC with UPS backup (6hr<br>capacity)|Continuous operation during power<br>outages|

**4.2 Edge Processing Architecture**

Local Compute Engine: Lightweight IDW (Inverse Distance Weighting)

interpolation for 20m grid.

Data Buffer: SQLite database storing 30 days of telemetry with automatic

compression.

Alert Engine: Rule-based system for critical condition detection (moisture <

wilting point).

Synchronization: "Store and Forward" mechanism with exponential backoff retry

logic.

Conflict Resolution: Timestamp-based priority; cloud-generated data takes

precedence.

**4.3 Edge Software Stack**

Language: Go (compiled binary ~15MB) for minimal footprint and fast startup.

Local Web Server: Embedded HTTP server for local dashboard access via farm

WiFi.

Sensor Drivers: 2.4GHz RF/BLE, MQTT client libraries for diverse sensor

integration.

Containerization: Docker Compose for easy deployment and updates.

## **5. Cloud Computing Layer (1m Grid)**

The cloud layer performs heavy-lifting spatial statistics to generate the 1m precision

grid required for SLV 2026 compliance.

**5.1 Interpolation Methodology**

We employ a hybrid Regression Kriging approach:

1. Trend Component: Derived from high-resolution satellite imagery (Sentinel-2

NDVI at 10m resolution) which provides the spatial structure.

1. Residual Component: Derived from ground sensors (soil moisture) using

Ordinary Kriging to correct the satellite bias.

1. Uncertainty Quantification: Kriging variance provides confidence intervals for

each 1m cell.

1. Result: A 1m resolution soil moisture map that respects both local

measurements and field heterogeneity.

**5.2 Cloud Processing Pipeline**

Cloud Processing Workflow

[ Sensor Data + Satellite Imagery ]

⬇

[ Data Fusion Layer ]

Co-registration, Temporal Matching

⬇

[ Spatial Statistics Engine ]

Regression Kriging, Bayesian Interpolation

⬇

[ Grid Generator ]

1m × 1m cell generation with uncertainty

⬇

[ Quality Assurance ]

Cross-validation, Outlier detection

⬇

[ Grid Storage + API ]

PostGIS database + Vector Tile generation

**5.3 Batch vs Real-time Processing**

|Processing<br>Type|Use Case|Technology|Latency|
|---|---|---|---|
|Real-time<br>Stream|Sensor data ingestion, critical<br>alerts|Go Edge Compute / RabbitMQ<br>Routing|< 5 seconds|
|Micro-batch|Active mode recalculation (15-<br>min window)|Celery / Python<br>Workers|5-15<br>minutes|
|Batch|Satellite imagery processing,<br>historical analysis|Apache Airfow + Dask|Hours to<br>days|

**5.4 Scalability Architecture**

Horizontal Scaling: Kubernetes auto-scaling based on queue depth and CPU

metrics.

Geographic Partitioning: Data partitioned by field ID for parallel processing.

Caching Layer: Redis cluster for frequently accessed grid tiles (dashboard).

CDN Integration: Pre-rendered Mapbox Vector Tiles cached at CloudFront edge

locations.

## **6. Adaptive Recalculation Engine**

To optimize compute costs and responsiveness, the system does not recalculate

grids on a fixed schedule. Instead, it uses a state-machine based approach with

event-driven triggers.

**6.1 Recalculation Modes**

|Mode|Trigger Condition|Recalculation<br>Window|Action|
|---|---|---|---|
|Stable|Variance < 5% over 6 hours|12 Hours|Background batch<br>update|
|Active|Pump Status = ON or Rain ><br>2mm|15 Minutes|Standard grid update|
|Critical|Moisture < Wilting Point or<br>Pump Failure|1 Minute|Priority queue<br>processing + SMS Alerts|
|Out-of-<br>Turn|Unexpected sensor swing<br>(>20% change in 30 min)|Immediate|Recalculate affected<br>feld only|

**6.2 Judgment-Based Logic Implementation**

The adaptive engine uses a combination of rules and trend analysis:

# Pseudocode for Mode Transition Logic

def calculate_next_interval(field_id):
recent_variance = calculate_variance(field_id, window='6h')
pump_status = get_pump_status(field_id)
rainfall = get_rainfall(field_id, window='1h')
moisture_current = get_moisture(field_id)

if moisture_current < WILTING_POINT or pump_status == 'FAILED':
return MODE_CRITICAL, interval=60 # 1 minute

if pump_status == 'ON' or rainfall > 2.0: # mm
return MODE_ACTIVE, interval=900 # 15 minutes

if recent_variance < 0.05: # Stable field
return MODE_STABLE, interval=43200 # 12 hours

# Default: moderate monitoring

return MODE_ACTIVE, interval=1800 # 30 minutes

**6.3 Event-Driven Triggers**

Sensor Anomaly: Multiple consecutive out-of-range readings trigger immediate

recalculation.

Pump State Change: Transition from OFF to ON initiates Active mode for next 2

hours.

Extreme Weather: Heavy rainfall (>10mm/hr) or high winds trigger Critical

mode.

Satellite Update: New Sentinel-2 imagery arrival triggers batch recalibration.

**6.4 Configuration Management**

All thresholds are configurable per field or crop type via admin dashboard:

Wilting point moisture level (crop-specific)

Variance threshold for Stable mode (soil texture-dependent)

Rainfall trigger level (climate zone-adjusted)

Alert notification channels (SMS, email, push)

## **7. Database Schema Design**

**7.1 Time-Series Schema (TimescaleDB)**

CREATE TABLE sensor_readings (
time    TIMESTAMPTZ NOT NULL,
device_id  UUID NOT NULL,
field_id  UUID NOT NULL,
sensor_type VARCHAR(50), -- 'moisture_10cm', 'moisture_30cm', 'flow_rate
value    DOUBLE PRECISION,
quality_score FLOAT,   -- 0.0 to 1.0 confidence
metadata  JSONB,    -- Additional sensor-specific data
PRIMARY KEY (time, device_id, sensor_type)
);

-- Hypertable conversion for automatic time-based partitioning
SELECT create_hypertable('sensor_readings', 'time');

-- Create indexes for common queries
CREATE INDEX idx_sensor_field_time ON sensor_readings (field_id, time DESC);
CREATE INDEX idx_sensor_type_time ON sensor_readings (sensor_type, time DESC

-- Retention policy: keep raw data for 3 years, then aggregate
SELECT add_retention_policy('sensor_readings', INTERVAL '3 years');

**7.2 Spatial Grid Schema (PostGIS)**

**7.3 Compliance & Audit Schema (PostgreSQL)**

CREATE TABLE compliance_logs (
id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
field_id  UUID REFERENCES fields(id),
log_time  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
event_type VARCHAR(50), -- 'IRRIGATION_EVENT', 'VIOLATION', 'CALIBRATIO
details   JSONB NOT NULL,
hash    VARCHAR(64), -- SHA-256 hash for tamper detection
previous_hash VARCHAR(64), -- Blockchain-style chaining
user_id   UUID REFERENCES users(id),

**7.5 Data Partitioning Strategy**

Time-series partitioning: Automatic monthly chunks via TimescaleDB

hypertables.

Spatial partitioning: Grid cells partitioned by field_id for parallel processing.

Hot/Warm/Cold tiers:

Hot: Last 7 days in high-performance SSD storage (TimescaleDB)

Warm: 7 days to 1 year in standard storage (PostgreSQL + TimescaleDB

continuous aggregates)

Cold: >1 year compressed in S3 with Parquet format for analytics

## **8. API Specifications**

All APIs follow RESTful standards with OpenAPI 3.0 documentation. Authentication

is handled via OAuth2/JWT.

**8.1 Authentication & Authorization**

# JWT Token Structure

{
"sub": "user_uuid",
"role": "farmer" | "consultant" | "regulator" | "admin",
"farm_ids": ["uuid1", "uuid2"],
"exp": 1735689600,
"iat": 1735603200
}

# Authorization Levels

* Farmer: Read/Write access to own fields

* Consultant: Read access to multiple farms (multi-tenant)

* Regulator: Read-only access to compliance logs (all farms)

* Admin: Full system access

**8.2 Core API Endpoints**

**Data Ingestion API**

POST /api/v1/ingest/telemetry
Content-Type: application/json
Authorization: Bearer {edge_device_token}

Request Body:
{
"device_id": "550e8400-e29b-41d4-a716-446655440000",
"timestamp": "2023-10-15T14:30:00Z",
"readings": [
{
"sensor_type": "moisture_10cm",

"value": 0.28,
"quality_score": 0.95
},
{
"sensor_type": "moisture_30cm",
"value": 0.32,
"quality_score": 0.98
}
]
}

Response: 202 Accepted
{
"status": "queued",
"message_id": "msg_abc123"
}

**Virtual Grid Query API**

GET /api/v1/fields/{field_id}/grid/latest
Query Parameters:

* resolution: "1m" | "20m"
* layer: "moisture" | "ndvi" | "temperature"
* format: "geojson" | "mvt" (Mapbox Vector Tiles)
* bbox: "xmin,ymin,xmax,ymax" (optional, for spatial filtering)

Response: 200 OK (GeoJSON example)
{
"type": "FeatureCollection",
"timestamp": "2023-10-15T14:30:00Z",
"features": [
{
"type": "Feature",
"geometry": {
"type": "Polygon",
"coordinates": [[[lon, lat], [lon, lat], [lon, lat], [lon, lat], [lon
},
"properties": {
"moisture": 0.28,
"uncertainty": 0.02,
"status": "SAFE"
}
}
// ... more grid cells
]

}

**Analytics & Forecasting API**

**Compliance Reporting API**

GET /api/v1/compliance/report/{field_id}
Query Parameters:

* start_date: "2023-01-01"
* end_date: "2023-10-15"
* format: "pdf" | "json" | "csv"

Response: 200 OK
Content-Type: application/pdf (or JSON/CSV)

# JSON Response Structure

{
"field_id": "uuid",
"report_period": "2023-01-01 to 2023-10-15",
"generated_at": "2023-10-15T14:35:00Z",
"total_irrigation_events": 45,
"total_water_applied_m3": 1250.5,
"compliance_violations": 0,

"events": [
{
"timestamp": "2023-03-15T06:00:00Z",
"event_type": "IRRIGATION_START",
"water_applied_mm": 25.0,
"duration_minutes": 120,
"compliance_status": "COMPLIANT",
"audit_hash": "a7b8c9d0..."
}
]
}

**8.3 Rate Limiting & Throttling**

|Endpoint Category|Rate Limit|Burst Allowance|
|---|---|---|
|Data Ingestion (Edge Devices)|1000 req/min per device|1500 req/min (burst)|
|Dashboard Queries (Authenticated)|100 req/min per user|200 req/min (burst)|
|Compliance Reports (Regulator)|10 req/min per user|20 req/min (burst)|

**8.4 API Versioning Strategy**

URL Versioning: /api/v1/, /api/v2/ for major breaking changes.

Backward Compatibility: v1 maintained for minimum 12 months after v2

release.

Deprecation Headers: Sunset header indicates API version retirement date.

## **9. Analytics & ML Layer**

The analytics engine runs in a containerized environment (Kubernetes CronJobs)

accessing the Data Lake.

**9.1 Predictive Irrigation Scheduling**

Model Architecture: LSTM (Long Short-Term Memory) networks with attention

mechanism

Input Features:

Historical soil moisture (7-day window)

Weather forecast (temperature, rainfall, evapotranspiration)

Crop stage and water demand coefficients

Field characteristics (soil type, slope, drainage)

Output: 48-hour ahead irrigation recommendations with confidence intervals

Training Data: Multi-year historical records from Landsat-derived indices and

weather logs

Model Update Frequency: Weekly retraining during growing season

**9.2 Crop Stress Detection**

Algorithm: Ensemble of Random Forest and Gradient Boosting classifiers

Input Features:

NDVI, NDRE, NDWI from Sentinel-2

Soil moisture deficit from ground sensors

Temperature stress indices

Historical stress patterns

Stress Categories: None, Mild, Moderate, Severe (4-class classification)

Early Detection Target: Identify stress 3-5 days before visible symptoms

**9.3 Yield Forecasting**

Model Type: Multi-modal deep learning (CNN for imagery + LSTM for time

series)

Data Sources:

Satellite time-series (vegetation indices progression)

Weather data (growing degree days, water stress integral)

Irrigation history and soil moisture patterns

Historical yield data for calibration

Forecast Horizon: 30 days before harvest with weekly updates

Accuracy Target: ±10% of actual yield at 30 days pre-harvest

**9.4 Anomaly Detection for Pump Telemetry**

Algorithm: Isolation Forest for unsupervised anomaly detection

Monitored Parameters: Flow rate, pressure, power consumption, vibration (if

available)

Alert Triggers: Cavitation patterns, bearing failure signatures, efficiency

degradation

Predictive Maintenance: Estimate time-to-failure based on degradation trends

**9.5 Model Training & Deployment Pipeline**

ML Pipeline Architecture

[ Data Lake (S3) ]

Historical sensor + satellite data

⬇

[ Feature Engineering ]

Celery / Python Workers

⬇

[ Model Training ]

Kubeflow / MLflow on K8s

⬇

[ Model Validation ]

Cross-validation, A/B testing

⬇

[ Model Registry ]

MLflow Model Registry

⬇

[ Inference Service ]

TensorFlow Serving / Seldon Core

⬇

[ API Gateway ]

REST/gRPC endpoints for predictions

**9.6 Feature Engineering Pipeline**

Temporal Features: Moving averages, rate of change, seasonality

decomposition

Spatial Features: Distance to nearest sensor, terrain slope/aspect, soil

variability indices

Derived Indices: Moisture deficit integral, cumulative growing degree days,

water stress days

Satellite Indices: NDVI, NDRE, NDWI, LAI (Leaf Area Index), fAPAR

## **10. Interface Layer Architecture**

**10.1 Farmer Dashboard**

Technology Stack: React 18 + TypeScript, Mapbox GL JS for mapping, Recharts

for analytics

Key Features:

Real-time field heatmap visualization (1m grid overlay)

"Traffic Light" status indicators (Green=Safe, Yellow=Warning, Red=Critical)

Irrigation recommendations with explanations

Pump status monitoring and control

Historical trend charts and comparison views

Mobile-responsive design for field access

Performance Optimization:

Mapbox Vector Tiles for fast rendering of large grid datasets

Progressive Web App (PWA) with offline capability

WebSocket connection for real-time updates

Lazy loading and code splitting for fast initial load

**10.2 Regulatory Compliance Portal**

Technology Stack: React + TypeScript, Tailwind CSS, PDF generation via jsPDF

Key Features:

Read-only view with tamper-proof audit logs

Historical compliance report generation (PDF, CSV export)

Field-level and regional aggregation views

Violation tracking and trend analysis

Immutable log verification (hash chain validation)

Role-based access control for different regulator levels

Compliance Indicators: SLV 2026 alignment metrics, water usage vs allocation,

violation alerts

**10.3 Consultant Multi-Field View**

Technology Stack: React + TypeScript, D3.js for advanced visualizations

Key Features:

Multi-farm dashboard with side-by-side field comparison

Regional stress maps aggregating multiple fields

Benchmarking tools (compare field performance)

Recommendation engine for agronomic interventions

Export capabilities for client reports

Multi-Tenancy: Secure isolation of data across different client farms

**10.4 Mobile Application Architecture**

Technology: React Native for iOS and Android

Core Capabilities:

Simplified field view optimized for mobile screens

Push notifications for critical alerts

Offline mode with local data caching

GPS-based field navigation

Manual sensor reading entry (backup for connectivity issues)

**10.5 Real-Time Alert System**

Notification Channels: SMS (Twilio), Email (SendGrid), Push (Firebase Cloud

Messaging), In-app

Alert Types:

Critical: Moisture below wilting point, pump failure (immediate)

Warning: Approaching stress threshold, unusual readings (within 30 min)

Info: Irrigation recommendations, forecast updates (scheduled)

Smart Throttling: Prevent alert fatigue with intelligent grouping and escalation

rules

**10.6 UI/UX Design Principles**

Accessibility: WCAG 2.1 AA compliance, screen reader support, high contrast

modes

Internationalization: Multi-language support (English, Spanish, Chinese initially)

Color Scheme: Agriculture-themed green/brown palette with colorblind-friendly

indicators

Performance Target: < 2 second load time, 60fps map interactions

## **11. Technology Stack Recommendations**

|Component|Technology|Justification|
|---|---|---|
|Backend<br>Language|Python 3.11+<br>(FastAPI)|Native support for geospatial libraries (GDAL,<br>Rasterio, GeoPandas) and ML frameworks (PyTorch,<br>TensorFlow). FastAPI provides high-performance<br>async support, automatic OpenAPI documentation,<br>and excellent type validation.|
|Edge Module|Go (Golang) 1.21+|Compiles to single binary (~10MB), low memory<br>footprint (<50MB runtime), excellent concurrency with<br>goroutines for handling sensor streams on limited<br>hardware (Raspberry Pi). Fast startup time for edge<br>resilience.|
|Time-Series<br>DB|TimescaleDB 2.11+|Built on PostgreSQL 15+, allowing seamless joining<br>of time-series data with relational/spatial (PostGIS)<br>business data. Automatic time-based partitioning,<br>compression (90% storage savings), and continuous<br>aggregates for historical analysis. Open-source with<br>commercial support option.|
|Spatial<br>Database|PostGIS 3.3+|Industry-standard for geospatial data. Supports<br>complex spatial queries, indexing (R-tree, GIST), and<br>seamless integration with TimescaleDB. Proven<br>scalability for millions of polygons.|
|Message<br>Queue|Apache Kafka 3.5+ /<br>RabbitMQ 3.12|Kafka: High-throughput event streaming (1M+<br>msg/sec), durable log storage, ideal for sensor<br>ingestion pipeline and audit trail.<br>RabbitMQ: Complex routing for alert triggers,<br>guaranteed delivery for critical notifcations.<br>Recommendation: Use both - Kafka for data pipeline,<br>RabbitMQ for alerts.|

|Component|Technology|Justification|
|---|---|---|
|Stream<br>Processing|Go Edge Compute<br>(IDW)|Native Go processing on the edge for real-time<br>grid recalculation. Handles local sensor ingestion<br>and critical "Reflex" alerts under 5 seconds.|
|Batch<br>Processing|Celery +<br>RabbitMQ|Celery: Task orchestration for satellite data<br>ingestion, ML training, report generation. Distributed<br>workers handle heavy NumPy/SciPy computing.|
|Satellite Data<br>Processing|Google Earth Engine<br>(API) + Rasterio +<br>GDAL|GEE: Massive satellite preprocessing in cloud<br>(Petabyte-scale archive), free tier available, pre-<br>computed indices.<br>Rasterio/GDAL: Local/cloud custom interpolation<br>logic, full control over processing pipeline. SNAP<br>toolbox for advanced SAR processing.|
|ML<br>Frameworks|PyTorch 2.0+ /<br>TensorFlow 2.13+ /<br>scikit-learn|PyTorch: LSTM models for time-series forecasting,<br>fexible research-to-production workfow.<br>TensorFlow: Production-ready serving infrastructure<br>(TF Serving), mobile deployment (TFLite).<br>scikit-learn: Classical ML algorithms (Random<br>Forest, Isolation Forest), spatial statistics (Kriging via<br>scikit-gstat).|
|Model Serving|Seldon Core /<br>TensorFlow Serving|Kubernetes-native model deployment, A/B testing,<br>canary rollouts, metrics collection. Seldon supports<br>multi-framework (PyTorch, TF, XGBoost) with unifed<br>API.|
|Frontend<br>Framework|React 18+ with<br>TypeScript|Large ecosystem, excellent performance, strong<br>typing with TS reduces bugs, extensive mapping<br>library support (Mapbox, Leafet). Mature server-side<br>rendering (Next.js) for SEO and performance.|
|Mapping<br>Library|Mapbox GL JS 3.0+|Best-in-class performance for rendering large vector<br>tile sets (the 1m grid). WebGL-accelerated, smooth<br>interactions with millions of features, excellent<br>mobile support. Style customization via Mapbox<br>Studio.|

Authentication, rate limiting, request transformation,

analytics. Kong: open-source, self-hosted option.

API Gateway Kong Gateway /

AWS API Gateway

|Component|Technology|Justification|
|---|---|---|
|||AWS API Gateway: fully managed, tight AWS<br>integration.|
|Container<br>Orchestration|Kubernetes 1.28+<br>(Amazon EKS /<br>Azure AKS / Google<br>GKE)|Industry standard, cloud-agnostic (portability across<br>AWS/Azure/GCP), auto-scaling, self-healing, rich<br>ecosystem (Helm charts, operators). Managed<br>services reduce operational burden.|
|Infrastructure<br>as Code|Terraform 1.5+ /<br>Pulumi|Multi-cloud support, declarative confguration, version<br>control for infrastructure. Terraform: mature, large<br>community. Pulumi: allows real programming<br>languages (Python/TypeScript) instead of HCL.|
|Monitoring &<br>Observability|Prometheus +<br>Grafana + ELK Stack|Prometheus: Metrics collection, time-series storage,<br>alerting (Alertmanager).<br>Grafana: Visualization dashboards, multi-datasource<br>support.<br>ELK (Elasticsearch, Logstash, Kibana): Centralized<br>logging, full-text search, log analytics.|
|Distributed<br>Tracing|Jaeger /<br>OpenTelemetry|Track requests across microservices, identify<br>performance bottlenecks, debug distributed systems.<br>OpenTelemetry provides vendor-neutral<br>instrumentation.|
|Cache Layer|Redis 7.0+ (Cluster<br>mode)|In-memory caching for hot data (dashboard queries,<br>frequently accessed grids), pub/sub for real-time<br>updates, geospatial queries support. Cluster mode<br>for high availability.|
|Object Storage|AWS S3 / Azure<br>Blob / Google Cloud<br>Storage|Durable storage for satellite imagery, historical data<br>archives, compliance logs. Tiered storage (Standard,<br>Infrequent Access, Glacier) for cost optimization.<br>WORM (Write-Once-Read-Many) support for audit<br>logs.|
|CDN|CloudFront /<br>Cloudfare|Cache static assets (map tiles, dashboard resources)<br>at edge locations, reduce latency, lower origin load.<br>DDoS protection and WAF included.|
|CI/CD|GitHub Actions /<br>GitLab CI|Integrated with version control, matrix testing<br>(multiple Python versions), artifact management,<br>secrets management. GitHub Actions: free for public<br>repos. GitLab: self-hosted option.|

Centralized secret storage (API keys, DB credentials),

dynamic secrets generation, audit logging.

Secret

Management

HashiCorp Vault /

AWS Secrets

|Component|Technology|Justification|
|---|---|---|
||Manager|Kubernetes integration for automatic secret injection.|

**Technology Decision Trade-offs**

## **12. Deployment Architecture**

The infrastructure is defined as code (Terraform) to ensure national replicability and

consistent deployments.

**12.1 Cloud Provider Selection**

|Provider|Strengths|Use Case Fit|
|---|---|---|
|AWS|Largest service catalog, mature geospatial<br>services (Ground Station, Location Service),<br>strong IoT suite|Best for comprehensive full-<br>stack deployment|
|Azure|Excellent enterprise integration, strong AI/ML<br>services, FarmBeats platform|Good for enterprise customers<br>with existing Microsoft stack|
|GCP|Best data analytics (BigQuery), tight Earth<br>Engine integration, cost-effective compute|Ideal for satellite data<br>processing workloads|

Recommendation: AWS as primary provider with multi-cloud capability via Terraform

abstraction.

**12.2 AWS Reference Architecture**

AWS Cloud Infrastructure

[ Route 53 ] DNS + Health Checks

⬇

[ CloudFront CDN ] Static assets, map tiles

⬇

[ Application Load Balancer ]

⬇

[ Amazon EKS Cluster ]

        - FastAPI Services (Fargate/EC2 nodes)


           - Cloud Processing Workers (Celery)


           - ML Inference (Seldon Core)

⬇

[ Data Layer ]

       - RDS PostgreSQL + TimescaleDB (Multi-AZ)


        - Amazon MSK (Kafka) for event streaming


        - Amazon ElastiCache (Redis) for caching


       - Amazon S3 (raw data, satellite imagery)

⬇

[ Analytics Layer ]

          - Amazon SageMaker (ML training)


          - AWS Glue (ETL for data lake)


        - Amazon Athena (ad-hoc queries on S3)

⬇

[ Edge Connectivity ]

           - AWS IoT Core (MQTT broker)


       - AWS Greengrass (edge software management)

**12.3 Kubernetes Cluster Configuration**

Node Groups:

General Purpose (t3.large): API services, lightweight processing

Compute Optimized (c6i.xlarge): Stream processing, grid calculations

Memory Optimized (r6i.xlarge): In-memory caching, large dataset

processing

GPU Nodes (g4dn.xlarge): ML inference, satellite image processing

Auto-scaling: KEDA (Kubernetes Event-driven Autoscaling) based on:

Kafka consumer lag for ingestion services

Queue depth for grid recalculation workers

HTTP request rate for API services

High Availability: Multi-AZ deployment, minimum 3 replicas for critical services

**12.4 Database Deployment Strategy**

Primary Database: Amazon RDS PostgreSQL 15 with TimescaleDB extension

Multi-AZ deployment for 99.95% availability

Automated backups (point-in-time recovery, 35-day retention)

Read replicas for analytics queries (separate from operational traffic)

Instance size: db.r6g.xlarge initially (4 vCPU, 32GB RAM)

Cache Layer: Amazon ElastiCache Redis Cluster

Multi-AZ with automatic failover

6 shards × 2 replicas for 99.99% availability

Node type: cache.r6g.large (2 vCPU, 13GB RAM per node)

**12.5 Edge Deployment Architecture**

Device Management: AWS IoT Greengrass for over-the-air updates

Deployment Package:

Docker Compose stack (Go edge module + SQLite + local MQTT broker)

Automatic updates via Greengrass deployment groups

Rollback capability in case of failed updates

Network Configuration:

Primary: 4G LTE with static IP (via cellular router)

Fallback: Ethernet connection (farm network)

VPN tunnel (WireGuard) for secure cloud communication

**12.6 Scalability & Performance Targets**

|Metric|Target|Scaling Strategy|
|---|---|---|
|Sensor<br>Ingestion|100,000 sensors × 4<br>readings/hour = 400K msgs/hr|RabbitMQ routing, FastAPI<br>parallel processing|

|Metric|Target|Scaling Strategy|
|---|---|---|
|Grid<br>Recalculation|1000 felds × 1m grid (avg 10<br>hectares) in 15 min|Horizontal pod autoscaling, GPU<br>acceleration for large felds|
|Dashboard<br>Queries|10,000 concurrent users, < 2s<br>response time|Redis caching, CDN for map tiles, load<br>balancing|
|API Throughput|50,000 req/min across all<br>endpoints|Auto-scaling API pods, rate limiting per<br>user tier|

**12.7 Disaster Recovery & Backup**

Recovery Time Objective (RTO): < 1 hour for full system recovery

Recovery Point Objective (RPO): < 5 minutes (minimal data loss)

Backup Strategy:

Database: Automated daily snapshots + continuous transaction log backup

Object Storage: S3 versioning + cross-region replication

Configuration: Infrastructure code in Git, immutable deployments

Disaster Recovery Test: Quarterly full-stack recovery drill

**12.8 Cost Optimization Strategies**

Compute: Reserved Instances (1-year) for baseline load, Spot Instances for

batch processing (50-70% savings)

Storage: S3 Intelligent-Tiering for automatic lifecycle management, Glacier for

>3-year archives

Data Transfer: VPC endpoints to avoid NAT gateway charges, CloudFront

caching to reduce origin traffic

Monitoring: Right-sizing recommendations via AWS Compute Optimizer, unused

resource alerts

**12.9 Monitoring & Observability Stack**

Metrics: Prometheus (in-cluster) + Amazon Managed Prometheus (long-term

storage)

Logging: FluentBit (log collection) → Amazon OpenSearch Service (ELK

alternative)

Tracing: Jaeger (in-cluster) + AWS X-Ray (managed service)

Dashboards: Grafana for technical metrics, custom admin dashboard for

business metrics

Alerting: Prometheus Alertmanager → PagerDuty (on-call) / Slack (team

notifications)

## **13. Security & Compliance Framework**

SLV 2026 Regulatory Alignment: All compliance logs are hashed and stored in a

"WORM" (Write Once, Read Many) compatible S3 bucket configuration with

Object Lock to prevent tampering. This ensures non-repudiable audit trails.

**13.1 Data Encryption**

|Data State|Encryption Method|Key Management|
|---|---|---|
|In-Transit|TLS 1.3 (all API communications),<br>mTLS (service-to-service in K8s)|Let's Encrypt (public endpoints),<br>AWS Certifcate Manager (internal)|
|At-Rest<br>(Databases)|AES-256 encryption for RDS volumes|AWS KMS (Customer Managed<br>Keys with automatic rotation)|
|At-Rest (Object<br>Storage)|S3 SSE-KMS (Server-Side<br>Encryption)|AWS KMS with separate keys per<br>data classifcation|
|Backups|AES-256 encrypted snapshots|Separate KMS key for backup data|

**13.2 Identity & Access Management**

Authentication:

OAuth 2.0 / OpenID Connect for user authentication

Multi-Factor Authentication (MFA) required for admin and regulator roles

API key authentication for edge devices with automatic rotation

SSO integration (SAML 2.0) for enterprise customers

Authorization (RBAC - Role-Based Access Control):

Farmer: Read/Write on own fields, read-only on shared consultant reports

Consultant: Read access to assigned client farms, write access for

recommendations

Regulator: Read-only access to compliance logs and reports across all

farms

Admin: Full system access, user management, configuration

Edge Device: Write-only to ingestion endpoints, read configuration

Principle of Least Privilege: Fine-grained permissions, time-limited access

tokens (1-hour JWT expiry)

**13.3 Audit Trail & Compliance Logging**

Immutable Audit Log:

Every grid recalculation logged with input parameters, algorithm version,

output hash

All configuration changes logged with user ID, timestamp, old/new values

Irrigation events logged with precise timestamps, volumes, field conditions

Blockchain-style hash chaining: each log entry references previous entry's

hash

Compliance Report Generation:

Automated daily/weekly/monthly compliance summary reports

Violation detection with automatic regulator notification

Historical trend analysis for water usage patterns

PDF/CSV export with digital signatures for legal validity

Retention Policy:

Compliance logs: 10 years (regulatory requirement)

Operational logs: 1 year (system troubleshooting)

Raw sensor data: 3 years (trend analysis)

**13.4 SLV 2026 Specific Requirements**

# SLV 2026 Compliance Checklist

✓ Real-time water usage monitoring (15-min resolution)
✓ Field-level irrigation event logging with precise timestamps

✓ Soil moisture tracking at regulatory depths (10cm, 30cm minimum)
✓ Annual water allocation vs actual usage reporting
✓ Violation alerting for over-irrigation or off-schedule watering
✓ Immutable audit trail with tamper-proof logging
✓ Regulator portal access for inspection and compliance verification
✓ Historical data retention for 10+ years
✓ Data export in standardized formats (CSV, PDF, GeoJSON)

**13.5 Data Privacy & GDPR Compliance**

Personal Data Handling:

Minimal PII collection (only necessary for authentication and contact)

Encrypted storage of user credentials (bcrypt with salt)

Right to erasure: automated anonymization of user data upon request

Data portability: export user data in machine-readable format

Consent Management:

Explicit opt-in for data sharing with consultants/third parties

Granular consent controls (separate for analytics, marketing, research)

Audit log of all consent changes

Geographic Data Restrictions:

EU data residency requirements (deploy in eu-west region for EU

customers)

Data transfer agreements for cross-border compliance data sharing

**13.6 Network Security**

Perimeter Security:

Web Application Firewall (WAF) protecting API endpoints

DDoS protection via AWS Shield Standard (free) / Advanced (for critical

deployments)

Rate limiting and IP allowlisting for edge device ingestion

Internal Network Segmentation:

Kubernetes Network Policies isolating namespaces (development, staging,

production)

Private subnets for databases and internal services (no direct internet

access)

Bastion hosts (jump servers) for administrative access with MFA

Edge Security:

VPN tunnels (WireGuard) for edge-to-cloud communication

Device authentication via mutual TLS certificates

Firmware signature verification before updates

**13.7 Vulnerability Management**

Dependency Scanning: Automated scanning of container images (Trivy, Snyk) in

CI/CD pipeline

Penetration Testing: Annual third-party security audit and penetration test

Patch Management:

Critical security patches applied within 24 hours

Regular patches applied within 7 days

Automated OS patching for edge devices via Greengrass

Incident Response Plan:

Security incident detection via SIEM (Security Information and Event

Management)

Defined escalation procedures and communication templates

* Continuous vulnerability scanning
* Post-incident review and security tracking

**13.8 Compliance Certifications (Roadmap)**

ISO 27001: Information Security Management System (Target: Year 2 post

launch)

SOC 2 Type II: Service Organization Control audit (Target: Year 1 post-launch)

GDPR Compliance: Mandatory for EU operations (Day 1 requirement)

Regional Agriculture Standards: Country-specific compliance (ongoing)

## **14. Development Roadmap**

**Phase 1: Foundation & Infrastructure (Weeks 1-4)**

Objective: Establish core infrastructure and basic data ingestion pipeline.

Infrastructure Setup:

Terraform scripts for AWS EKS cluster, RDS (PostgreSQL + TimescaleDB),

S3 buckets

Kubernetes namespaces and basic networking (load balancers, ingress)

CI/CD pipeline setup (GitHub Actions with EKS deployment)

Data Ingestion:

MQTT broker setup (AWS IoT Core or self-hosted Mosquitto)

Basic FastAPI ingestion endpoint (sensor_readings table)

Kafka cluster deployment and basic producer/consumer

Database Schema:

Implement time-series schema (sensor_readings hypertable)

Field and device management tables

Initial PostGIS setup for spatial queries

Validation:

Test sensor data ingestion from 5-10 simulated devices

Verify data persistence and basic querying

Load testing (10K messages/min ingestion)

Deliverables: Functional data ingestion pipeline, deployed infrastructure, basic

monitoring.

**Phase 2: Core Processing (Weeks 5-8)**

Objective: Implement edge and cloud compute layers for virtual grid generation.

Edge Module (Go):

20m grid IDW interpolation algorithm

Local SQLite buffer with automatic compression

Store-and-forward synchronization logic

Docker Compose packaging and Greengrass deployment

Cloud Processing:

Sentinel-2 imagery download and preprocessing pipeline (Airflow DAG)

Regression Kriging implementation (Python with scikit-gstat)

1m grid generation and PostGIS storage

Mapbox Vector Tile generation for frontend

Adaptive Recalculation Engine:

State machine implementation (Stable/Active/Critical modes)

Event-driven trigger system (Kafka consumers)

Configuration management (field-specific thresholds)

Validation:

Test 20m → 1m grid synchronization for 5 fields

Verify mode transitions based on simulated events

Performance testing (1000 fields × 10 hectares each)

Deliverables: Functional edge module, cloud interpolation engine, adaptive

recalculation system.

**Phase 3: Analytics & ML Integration (Weeks 9-12)**

Objective: Deploy predictive models and analytics capabilities.

Irrigation Prediction Model:

LSTM model training on historical Landsat data (2013-2023)

Weather API integration (NOAA, OpenWeather)

Model deployment on Seldon Core with A/B testing

48-hour forecast API endpoint

Crop Stress Detection:

Random Forest classifier training (NDVI, moisture, temperature)

Real-time inference on new satellite imagery

Stress map generation and alert system

Yield Forecasting:

Multi-modal CNN+LSTM model training

30-day pre-harvest forecast endpoint

Field-level and regional aggregation views

Landsat Historical Calibration:

10-year Landsat data download and preprocessing

Baseline soil variability mapping

Sensor calibration adjustment recommendations

Validation:

Backtesting models on 2022-2023 data (80/20 train/test split)

Real-world validation with 10 pilot farms

Accuracy metrics: RMSE, MAE, R² for continuous predictions; F1-score for

classification

Deliverables: Deployed ML models, forecast APIs, historical calibration system.

**Phase 4: Interface & Compliance (Weeks 13-16)**

Objective: Build user-facing dashboards and compliance reporting system.

Farmer Dashboard:

React application with Mapbox GL JS integration

Real-time field heatmap (1m grid overlay)

"Traffic Light" status indicators and alerts

Historical trend charts and irrigation recommendations

Mobile-responsive PWA with offline capability

Regulatory Compliance Portal:

Read-only audit log viewer with hash verification

Compliance report generation (PDF/CSV export)

Violation tracking and trend analysis

Multi-field and regional aggregation views

Consultant Multi-Field View:

Side-by-side field comparison tools

Regional stress maps and benchmarking

Recommendation engine for agronomic interventions

Client report export functionality

SLV 2026 Compliance Implementation:

Immutable audit log with blockchain-style hash chaining

WORM S3 bucket configuration for compliance logs

Automated daily/weekly/monthly compliance summaries

Digital signature for legal validity of reports

Alert System:

Multi-channel notification (SMS, Email, Push, In-app)

Smart throttling to prevent alert fatigue

Configurable alert rules per user/field

Validation:

User acceptance testing with 20 farmers, 5 consultants, 3 regulators

Load testing (10,000 concurrent dashboard users)

Accessibility audit (WCAG 2.1 AA compliance)

Deliverables: Production-ready dashboards, compliance reporting system, alert

infrastructure.

**Phase 5: Optimization & National Rollout (Weeks 17-20)**

Objective: Performance optimization, documentation, and prepare for scale.

Performance Optimization:

Database query optimization (index tuning, query plan analysis)

Caching strategy refinement (Redis cache hit rate > 80%)

CDN configuration for global edge distribution

Kubernetes resource tuning and cost optimization

Documentation:

API documentation (OpenAPI/Swagger)

Deployment runbooks and operational procedures

User guides for farmers, consultants, regulators

Training materials and video tutorials

Security Hardening:

* Key rotation management
* Penetration testing and security tracking

Security audit and compliance certification prep

Incident response plan and disaster recovery testing

Multi-Region Deployment:

Terraform modules for regional deployment (US, EU, Asia-Pacific)

Data residency compliance for different jurisdictions

Localization (language support, regulatory adaptation)

Pilot Program:

50-field pilot across diverse climates and crop types

Gather feedback and iterate on user experience

Real-world performance validation and tuning

Deliverables: Production-hardened system, comprehensive documentation, multi

region deployment capability.

**Post-Launch Roadmap (Months 6-12)**

Month 6: Mobile app launch (iOS/Android), advanced analytics dashboard

Month 9: Integration with precision agriculture equipment (variable rate

irrigation, automated valves)

Month 12: Expansion to additional satellite data sources (PlanetScope for daily

imagery), drone integration

**Resource Requirements**

|Role|Headcount|Key Responsibilities|
|---|---|---|
|Backend Engineers|3|FastAPI services, data ingestion, grid computation|
|Data Engineer|1|ETL pipelines, satellite data processing, data lake|
|ML Engineer|1|Model training, deployment, feature engineering|
|Frontend Engineers|2|React dashboards, mobile app, UI/UX|
|DevOps Engineer|1|Infrastructure, CI/CD, monitoring, security|

|Role|Headcount|Key Responsibilities|
|---|---|---|
|Edge/IoT Engineer|1|Edge module development, device management|
|Product Manager|1|Requirements, roadmap, stakeholder coordination|
|QA Engineer|1|Testing strategy, automation, quality assurance|

Total Team Size: 11 full-time employees

## **15. Implementation Guidelines**

**15.1 Development Environment Setup**

**Prerequisites**

Docker 24+ and Docker Compose 2.20+

Kubernetes (Minikube or Kind for local development)

Python 3.11+, Go 1.21+, Node.js 20+

Terraform 1.5+, kubectl, helm 3+

PostgreSQL client (psql), Redis CLI

**Local Development Stack**

# docker-compose.yml for local development

version: '3.8'
services:
postgres:
image: timescale/timescaledb:latest-pg15
environment:
POSTGRES_DB: farmsense_dev
POSTGRES_USER: dev
POSTGRES_PASSWORD: dev_password
ports:

* "5432:5432"
volumes:
* postgres_data:/var/lib/postgresql/data

redis:
image: redis:7-alpine
ports:

* "6379:6379"

kafka:
image: confluentinc/cp-kafka:7.5.0
environment:
KAFKA_BROKER_ID: 1
KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
ports:

* "9092:9092"

zookeeper:
image: confluentinc/cp-zookeeper:7.5.0
environment:
ZOOKEEPER_CLIENT_PORT: 2181

volumes:
postgres_data:

**15.2 Repository Structure (Monorepo)**

farmsense/
├── infrastructure/       # Terraform and Kubernetes configs
│ ├── terraform/
│ │ ├── modules/      # Reusable TF modules
│ │ ├── environments/    # Dev, staging, prod configs
│ │ └── main.tf
│ └── kubernetes/
│ ├── base/        # Base K8s manifests
│ ├── overlays/      # Environment-specific overlays
│ └── helm-charts/
│
├── services/          # Backend microservices
│ ├── ingestion/       # Data ingestion API (FastAPI)
│ │ ├── src/
│ │ ├── tests/
│ │ ├── Dockerfile
│ │ └── requirements.txt
│ ├── compute/        # Grid computation service (Python)
│ ├── analytics/       # ML inference service
│ └── api-gateway/      # Main API gateway
│
├── edge/            # Edge computing module (Go)
│ ├── cmd/
│ ├── internal/
│ ├── pkg/
│ ├── Dockerfile
│ └── go.mod
│
├── frontend/          # React applications

│ ├── farmer-dashboard/
│ ├── regulator-portal/
│ ├── consultant-view/
│ └── shared-components/
│
├── ml/             # ML models and training pipelines
│ ├── irrigation-prediction/
│ ├── stress-detection/
│ ├── yield-forecast/
│ └── notebooks/       # Jupyter notebooks for experimentation
│
├── data-pipelines/       # Airflow DAGs and ETL scripts
│ ├── dags/
│ └── scripts/
│
├── lib/             # Shared libraries
│ ├── python/
│ │ ├── farmsense_common/  # Common Python utilities
│ │ └── spatial_utils/   # Geospatial helper functions
│ └── go/
│ └── common/       # Shared Go packages
│
├── docs/            # Documentation
│ ├── architecture/
│ ├── api/
│ └── guides/
│
├── scripts/           # Utility scripts
│ ├── setup-dev.sh
│ ├── run-tests.sh
│ └── deploy.sh
│
├── .github/
│ └── workflows/       # CI/CD pipelines
│ ├── backend-ci.yml
│ ├── frontend-ci.yml
│ └── deploy-prod.yml
│
└── README.md

**15.3 Testing Strategy**

**Unit Testing**

Python (Backend/ML): PyTest with 80%+ coverage target

# Example: pytest for interpolation algorithm

def test_regression_kriging():

sensor_data = create_mock_sensor_data()
satellite_data = create_mock_satellite_raster()

result = regression_kriging(sensor_data, satellite_data, grid_resolu

assert result.shape == (100, 100) # Expected grid size
assert 0 <= result.all() <= 1   # Moisture values in valid range
assert result.uncertainty.mean() < 0.1 # Reasonable uncertainty

Go (Edge Module): Standard testing package with table-driven tests

// Example: Go test for IDW interpolation
func TestIDWInterpolation(t *testing.T) {
tests := []struct {
name   string
sensors []SensorReading
expected float64
}{
{"single sensor", []SensorReading{{Lat: 0, Lon: 0, Value: 0.5}},
{"multiple sensors", []SensorReading{{Lat: 0, Lon: 0, Value: 0.3
}

for _, tt := range tests {
t.Run(tt.name, func(t *testing.T) {
result := IDWInterpolate(tt.sensors, Point{Lat: 0.5, Lon: 0.
if math.Abs(result-tt.expected) > 0.01 {
t.Errorf("Expected %f, got %f", tt.expected, result)
}
})
}
}

JavaScript (Frontend): Jest + React Testing Library

// Example: React component test
test('renders field status with correct color', () => {
const field = { id: '1', status: 'CRITICAL', moisture: 0.15 };
render();

const statusElement = screen.getByTestId('field-status');
expect(statusElement).toHaveClass('status-critical');
expect(statusElement).toHaveTextContent('CRITICAL');

});

**Integration Testing**

API Integration Tests: Test database with pytest-postgresql

@pytest.fixture
def test_db():

# Setup test database with schema

db = setup_test_database()
yield db
teardown_test_database(db)

def test_ingestion_endpoint(test_db, test_client):
response = test_client.post('/api/v1/ingest/telemetry', json={
'device_id': 'test-device-1',
'timestamp': '2023-10-15T14:30:00Z',
'readings': [{'sensor_type': 'moisture_10cm', 'value': 0.28}]
})

assert response.status_code == 202

# Verify data persisted in database

reading = test_db.query(SensorReading).first()
assert reading.value == 0.28

Kafka Integration: Testcontainers for integration tests with message queues

Database Migration Tests: Validate schema migrations don't break existing data

**End-to-End Testing**

Frontend E2E: Cypress for critical user flows

describe('Farmer Dashboard', () => {
it('should display field heatmap and allow zoom', () => {
cy.visit('/dashboard');
cy.login('<farmer@test.com>', 'password');

cy.get('[data-testid="field-map"]').should('be.visible');
cy.get('[data-testid="field-1"]').click();
cy.get('[data-testid="field-details"]').should('contain', 'Field 1')

// Verify map interaction

Stress Testing: Identify breaking points (max throughput, memory limits)

Endurance Testing: 24-hour soak tests to detect memory leaks

**15.4 CI/CD Pipeline**

# .github/workflows/backend-ci.yml

name: Backend CI/CD

on:

push:
branches: [main, develop]
paths:

* 'services/**'
pull_request:
branches: [main]

jobs:
test:
runs-on: ubuntu-latest
services:
postgres:
image: timescale/timescaledb:latest-pg15
env:
POSTGRES_PASSWORD: postgres
options: >--health-cmd pg_isready
--health-interval 10s
--health-timeout 5s
--health-retries 5

steps:

* uses: actions/checkout@v3

* name: Set up Python
uses: actions/setup-python@v4
with:
python-version: '3.11'

* name: Install dependencies
run: |
cd services/ingestion
pip install -r requirements.txt -r requirements-dev.txt

* name: Run tests
run: |
cd services/ingestion
pytest --cov=src --cov-report=xml

* name: Upload coverage
uses: codecov/codecov-action@v3

build-and-push:
needs: test
runs-on: ubuntu-latest
if: github.ref == 'refs/heads/main'

steps:

* uses: actions/checkout@v3

* name: Configure AWS credentials
uses: aws-actions/configure-aws-credentials@v2
with:

aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
aws-region: us-west-2

* name: Login to Amazon ECR
id: login-ecr
uses: aws-actions/amazon-ecr-login@v1

* name: Build and push Docker image
env:
ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
IMAGE_TAG: ${{ github.sha }}
run: |
docker build -t $ECR_REGISTRY/farmsense-ingestion:$IMAGE_TAG servic
docker push $ECR_REGISTRY/farmsense-ingestion:$IMAGE_TAG

* name: Deploy to EKS
run: |
aws eks update-kubeconfig --name farmsense-prod --region us-west-2
kubectl set image deployment/ingestion ingestion=$ECR_REGISTRY/farm
kubectl rollout status deployment/ingestion

**15.5 Deployment Procedures**

**Production Deployment Checklist**

1. ✓ All tests passing (unit, integration, E2E)

2. ✓ Code review approved by 2+ engineers

3. ✓ Database migration scripts tested in staging

4. ✓ Performance testing completed (no degradation)

5. ✓ Security scan passed (no critical vulnerabilities)

6. ✓ Monitoring dashboards updated for new metrics

7. ✓ Rollback plan documented

8. ✓ Stakeholder notification sent

**Deployment Strategy**

Blue-Green Deployment: Zero-downtime deployment with instant rollback

capability

Canary Releases: Roll out to 5% of users, monitor for 1 hour, then full rollout

Database Migrations: Forward-compatible migrations (additive changes first,

removals later)

**15.6 Monitoring & Maintenance**

**Key Metrics to Monitor**

|Category|Metric|Alert Threshold|
|---|---|---|
|Infrastructure|CPU utilization|> 80% for 5 minutes|
||Memory utilization|> 85%|
||Disk space|> 90% full|
|Application|API response time (p95)|> 2 seconds|
||Error rate|> 1% (4xx/5xx)|
||Kafka consumer lag|> 1000 messages|
|Business|Data ingestion rate|< 50% of normal (data loss)|
||Grid recalculation time|> 30 minutes (SLA breach)|
||ML model accuracy|< 70% (model degradation)|

**Operational Runbooks**

Service Outage Response: Step-by-step incident response procedures

Database Recovery: Point-in-time recovery and failover procedures

Scaling Operations: Manual scaling procedures for traffic spikes

Certificate Renewal: TLS certificate rotation procedures

Development Best Practices:

Code Reviews: All code changes require peer review before merging

Documentation: Update docs alongside code changes (docs-as-code)

Feature Flags: Use feature flags for gradual rollout of new features

Logging: Structured logging (JSON format) with correlation IDs for request

tracing

© 2026 FarmSense Initiative. Confidential Technical Architecture Document.

Version 1.0 | Last Updated: February 12, 2026

<div style="page-break-after: always;"></div>

# 🌾 FarmSense: Precision Agriculture & Regulatory Integrity Platform

[![Platform: Unified](https://img.shields.io/badge/Platform-Unified-blueviolet?style=for-the-badge)](https://zo.computer)
[![Compliance: GLOBALG.A.P. v6](https://img.shields.io/badge/Compliance-GLOBALG.A.P._v6-emerald?style=for-the-badge)](https://globalgap.org)
[![Build: Success](https://img.shields.io/badge/Build-Success-success?style=for-the-badge)](https://github.com/farmsense/farmsense-portal)
[![Stack: FastAPI + React](https://img.shields.io/badge/Stack-FastAPI_+_React-6366f1?style=for-the-badge)](https://github.com/farmsense/farmsense-portal)

**FarmSense** is an enterprise-grade precision agriculture ecosystem designed for cryptographically verifiable water management, soil health analytics, and multi-stakeholder regulatory alignment. Initially deployed for the 2026 San Luis Valley water compacts, it provides a "Source of Truth" for producers, regulators, and investors.

---

## 🏔️ The Vision

In many agricultural basins, water extraction is managed through manual logs and opaque estimates. **FarmSense** replaces this with a **Unified Spatial Ledger**:

* **For Producers**: Data-driven irrigation scheduling that saves input costs.
* **For Regulators**: Immutable audit trails that eliminate "ghost pumping" and reporting friction.
* **For the Basin**: Long-term aquifer stability through transparent, verifiable extraction data.

---

## 🧩 Architectural Deep-Dive

### 1. Edge IQ (20m Spatial Fidelity)

The `edge-compute` module is designed to run on field-deployed hardware (Raspberry Pi/Jetson).

* **Real-time IDW**: Inverse Distance Weighting interpolation at the field edge.
* **Attention Engine**: A logic layer that identifies sensor anomalies (e.g., a broken flow meter) before data reaches the cloud.
* **Offline First**: Local storage with optimistic syncing for low-connectivity environments.

### 2. Cloud Core (1m Spatial Fidelity)

The `cloud-processing` engine provides high-resolution insights by fusing IoT data with multi-spectral satellite imagery.

* **Regression Kriging**: A Sophisticated ML algorithm that interpolates soil moisture by correlating ground sensors with Sentinel-2 NDVI/NDWI indices.
* **Adaptive Recalculation**: An event-driven engine that adjusts its resolution and window (1min → 1hr → 12hr) based on field dynamics (e.g., active irrigation cycles).

### 3. Regulatory Integrity Engine

FarmSense implements the **GLOBALG.A.P. IFA v6** standard through an automated backend engine.

* **Cryptographic Anchoring**: Every telemetry packet and manual entry is hashed using SHA-256 and anchored to a chronological integrity chain.
* **Verifiable Reports**: Digital audit reports that can be verified by secondary auditors without accessing confidential producer data.

### 4. Spatial Privacy Protection

To protect producers, FarmSense implements a multi-tier privacy engine in `backend/app/core/spatial_privacy.py`:

* **Tier 1 (Raw)**: Full precision for the producer.
* **Tier 2 (Audit)**: Grid-snapped and jittered data for auditors.
* **Tier 3 (Public)**: k-anonymized and Laplace-differentially private aggregates for basin analytics.

---

## 📁 Ecosystem Structure

```
farmsense-code/
├── backend/                    # FastAPI Services (Privacy, Compliance, REST)
│   ├── app/
│   │   ├── api/               # API Router structure
│   │   ├── services/          # GLOBALG.A.P. & CSA Alignment Engines
│   │   └── core/              # Spatial Privacy & Auth Logic
├── frontend/
│   ├── farmsense-portal/      # NEW Unified Premium Portal (Vite/TSX)
│   │   ├── src/
│   │   │   ├── views/         # 30+ Role-based stakeholder views
│   │   │   └── auth/          # RBAC & switchRole logic
├── cloud-processing/          # Regression Kriging & ML Pipelines
├── edge-compute/              # Go-based Field Processing Modules
├── database/                  # PostGIS & TimescaleDB Migration Logic
└── environment-simulator/     # Full-stack simulation for testing
```

---

## � Unified Stakeholder Roles

FarmSense consolidates 8 legacy applications into one unified portal:

1. **ADMIN**: Fleet monitoring, system health, and global audit oversight.
2. **GRANT_MANAGER**: $0 → Award pipeline tracking for LOR and Federal ESG grants.
3. **FARMER**: 3D field maps, VRI scheduling, and "Fisherman's Attention" metrics.
4. **RESEARCHER**: Raw data feeds, SPAC modeling, and basin-wide analytics.
5. **AUDITOR**: Remote compliance verification and certificate issuance.
6. **REGULATOR**: SLV extraction monitoring and water court reporting.
7. **INVESTOR**: Impact ROI, fleet penetration, and obfuscated aggregate stats.
8. **DOCS**: Role-tailored documentation portal (Overview to Water Court SOPs).

---

## 🚀 Development Quick Start

### 1. Unified Portal (Frontend)

```bash
cd frontend/farmsense-portal
npm install
npm run dev
```

* **Dev URL**: `http://localhost:5173`
* **Role Setup**: Use the "Role Switcher" in the top bar to simulate different stakeholders.

### 2. Core Service (Backend)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.api.main:app --reload --port 8000
```

* **API Docs**: `http://localhost:8000/docs`

### 3. Simulation & Testing

To test the platform with live simulated data:

```bash
cd environment-simulator
python main.py
```

---

## 🛠️ Hardware Stack Compatibility

FarmSense is compatible with the following specialized sensors (specifications found in `/specifications/firmware`):

* **VFA**: Vertical Flow Array (multi-depth soil moisture).
* **PMT**: Precision Metering Telemetry (pump flow volumes).
* **PFA**: Pivot Flow Array (distribution uniformity).
* **LRZ**: Low-Resolution Zone (atmospheric boundary sensors).
* **CSA**: Corner-Swing Auditor (GPS alignment for non-standard pivot corners).

---

## 📄 License & Legal

Copyright © 2026 FarmSense. Developed for the San Luis Valley Groundwater Pilot. All rights reserved.

**Security Vulnerabilities**: Report to <security@farmsense.io>

---

**Built with ❤️ for a resilient agricultural future.** 🌾💧

<div style="page-break-after: always;"></div>

# FarmSense: Software & Firmware Ecosystem Specifications

This document serves as the master index for the FarmSense deterministic operations platform. It maps out the technical specifications for all 8 frontend software portals, the backend infrastructure, and the edge-processing firmware operating on the 5 distinct hardware nodes.

---

## 🖥️ Frontend Software Specifications

The FarmSense platform utilizes a unified backend REST API and decentralized database architecture (PostgreSQL/TimescaleDB) to feed 8 distinct, containerized frontend portals. Each portal presents a specialized lens into the 1m Kriging grid.

1. **[Farmer Dashboard Specification](frontend/farmer-dashboard/SPECIFICATION.md):** The primary daily-driver application. Real-time MapLibre visualization of the 50m, 20m, and 1m virtual sensor grids, irrigation scheduling, and crop stress alerts.
2. **[Regulatory Portal Specification](frontend/regulatory-portal/SPECIFICATION.md):** The immutable audit ledger. Generates cryptographically secure water extraction reporting for the State Engineer and SLV Subdistrict compliance.
3. **[Admin Dashboard Specification](frontend/admin-dashboard/SPECIFICATION.md):** System-wide administrative controls, tenant management, billing, and global alert configurations.
4. **[Investor Dashboard Specification](frontend/investor-dashboard/SPECIFICATION.md):** High-level aggregate metrics, Water-ROI (Return on Investment per acre-foot), and regional impact analytics.
5. **[Grant Portal Specification](frontend/grant-portal/SPECIFICATION.md):** Dedicated data-extraction portal for academic and foundation partners (e.g., LOR Foundation) tracking the efficacy of grant-funded deployments.
6. **[Research Portal Specification](frontend/research-portal/SPECIFICATION.md):** Deep-dive interface for agronomists and CSU SLV Research Center scientists. Provides access to raw variogram data, detrended residuals, and historical Kriging calibration sets.
7. **[Docs Portal Specification](frontend/docs-portal/SPECIFICATION.md):** The static-site generator housing all public and internal engineering documentation, API references, and installation guides.
8. **[Marketing Site Specification](frontend/marketing-site/SPECIFICATION.md):** The public-facing landing page outlining the FarmSense architecture, Federal dual-use case studies, and contact forms.

---

## 📡 Hardware Firmware Specifications

Unlike traditional static IoT networks, FarmSense pushes intense computational processing natively to the edge. The following firmware specifications detail the specific logic loops, spatial interpolation capabilities, and failover behavior of each bare-metal node.

1. **[Pivot Motion Tracker (PMT) Firmware Specification](../specifications/firmware/PMT_Firmware_Spec.md):** The autonomous Level 1.5 Field Hub. Details the continuous execution of the 50m Empirical Bayesian Kriging (Edge-EBK) matrix and the "Fisherman's Attention" update scaling.
2. **[Vertical Field Anchor (VFA) Firmware Specification](../specifications/firmware/VFA_Firmware_Spec.md):** The Level 1 Advanced Peer Node. Details the deep-profile ground truth telemetry generation processes and 900MHz FHSS routing.
3. **[Lateral Root-Zone Scout (LRZ) Firmware Specification](../specifications/firmware/LRZ_Firmware_Spec.md):** The mass-produced "dumb node." Details the LPI/LPD capacitive telemetry sweeps and high-frequency chirp protocols.
4. **[Pressure & Flow Anchor (PFA) Firmware Specification](../specifications/firmware/PFA_Firmware_Spec.md):** The "Sentry of the Source." Details the Cortex-M7 Current Harmonic Analysis of the wellhead motor, cavitation detection, and 2.4GHz High-Gain linking.
5. **[Corner-Swing Auditor (CSA) Firmware Specification](../specifications/firmware/CSA_Firmware_Spec.md):** Details the dual-node kinematics required to resolve swing-arm transit and overlap matrices.

---

## 🧠 Backend Engine Specifications

The intelligence powering the frontends and edge-hardware relies on these deeply integrated cloud and multi-tier databases.

* **[Core Engine (Zo) Specification](backend/ZO_ENGINE_SPECIFICATION.md):** The overarching logic detailing the execution of Bayesian priors, the 1m Regression Kriging algorithms using Sentinel-2/Landsat data, and the orchestration of the Adaptive Recalculation Engine.
* **[Database Architecture (PostgreSQL + TimescaleDB)](backend/DATABASE_SPECIFICATION.md):** The schema mapping for the Master Legal Ledger, contextual obfuscation (Privacy layer), and continuous temporal aggregations.

<div style="page-break-after: always;"></div>

# 🌾 FarmSense Precision Agriculture Platform

## 📦 Split Deployment Guide

This project is configured for a **Hybrid Cloud Deployment**:

* **Core Platform (Zo.computer)**: Hosts the API, processing, and frontend applications.
* **Map Stack (Oracle Cloud)**: Hosts the geospatial database and map tile services.

### 1. Oracle Cloud (Map Stack) Setup

Deploy this FIRST to ensure the database is available for the core platform.

```bash
# On your Oracle Instance
cd deployment/docker
docker-compose -f docker-compose.oracle.yml up -d
```

**Services Started:**

* `postgis-map`: Review `docker-compose.oracle.yml` for credentials (Default: `map_user`/`changeme`).
* `map-service`: Tile serving endpoint (Port 8001).

**Network Config:**

* Ensure Port `5432` is accessible from your Zo.computer IP (configure Oracle Security List / VCN).

### 2. Zo.computer (Core Platform) Setup

```bash
# On your Zo Instance
cd deployment/docker

# Set the connection string to your Oracle instance
export MAP_DATABASE_URL="postgresql://map_user:changeme@<ORACLE_IP>:5432/farmsense_map"

docker-compose -f docker-compose.zo.yml up -d
```

**Services Started:**

* `backend-api`: Main API (Port 8000).
* `frontend-dashboard`: Farmer Dashboard (Port 3000).
* Core DBs: Postgres, Timescale, Redis.

### 3. Verification

1. Access the Dashboard at `http://<ZO_IP>:3000`.
2. The map tiles will be served from `http://<ZO_IP>:8000/api/v1/tiles/...` which internally queries the Oracle DB.

---

## 🏗️ Development Setup

For local development (single machine), use the standard compose file:

```bash
docker-compose up -d
```

<div style="page-break-after: always;"></div>

# Admin Dashboard Specification

## Overview

The Admin Dashboard is the centralized command and control interface for FarmSense operations staff and system integrators. It provides a global view of hardware health, tenant management, and system-wide configurations.

## 1. Global Hardware Fleet Management

* **Live Node Mapping:** Real-time global map displaying the online/offline status, battery life, and solar charging rates of every PMT, PFA, VFA, and LRZ deployed in the field.
* **Firmware OTA Control:** Interface to push Over-The-Air (OTA) firmware updates down the hierarchical chain (Cloud -> DHU -> PMT -> VFA/LRZ).
* **Sentry Diagnostics:** Deep-dive view into the raw PFA Current Harmonic Analysis and PMT 9-axis IMU vibration data for predictive hardware maintenance.

## 2. Tenant & Gateway Management

* **Organization Provisioning:** Create and manage distinct farming organizations, setting up their billing, access control lists (RBAC), and user onboarding.
* **DHU Gateway Configuration:** Management of the physical District Hubs, including LoRaWAN channel assignment, payload routing, and backhaul connectivity (Cellular vs. Starlink).

## 3. Global Edge Computation Monitoring

* **Adaptive Recalculation Overhead:** Real-time metrics on the load of the Zo Core Compute Engine.
* **"Fisherman's Attention" Network Status:** A high-level view showing which percentages of the global network are currently operating in *Dormant*, *Anticipatory*, *Ripple*, or *Collapse* modes, allowing for predictive scaling of cloud resources.

## 4. Architectural Integration

* **Frontend Stack:** React 18, TypeScript, Material-UI.
* **Monitoring Hooks:** Deep integration with the backend Prometheus and Grafana instances to surface infrastructure-level alerts directly within the administrative UI.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<div style="page-break-after: always;"></div>

# Docs Portal Specification

## Overview

The Docs Portal is the central repository for all FarmSense technical documentation, API references, architecture diagrams, and hardware deployment manuals. It serves both internal engineering teams and external partners utilizing the platform.

## 1. Developer Guidelines

* **API Reference:** Automatically generated (Swagger/OpenAPI) documentation detailing all available REST endpoints for sensor ingestion, grid querying, and compliance reporting.
* **Architecture & Codebase Overview:** In-depth explanations of the decentralized cloud layer (Zo), District Hubs (DHU), and edge-processing mechanics.
* **Deployment Manuals:** Step-by-step instructions for deploying the backend infrastructure (Docker Compose, Kubernetes) and flashing firmware to physical nodes.

## 2. Hardware Deployment & Calibration

* **Field Installation Guides:** Standard Operating Procedures (SOPs) for agronomists and electricians installing VFAs, LRZs, PFAs, and PMTs. Includes antenna positioning guidelines, power integration, and weatherproofing standards.
* **"Master Meter" Calibration Protocols:** The strict, legally mandated procedures for calibrating the PMT/PFA systems against third-party master meters to ensure the required +/- 1% flow accuracy for Regulatory Court submission.

## 3. Platform Policies & Standards

* **Spatial Privacy Policy:** Clear, public-facing documentation on how the system implements Contextual Obfuscation and federated learning to protect farmer data from public exposure or FOIA requests.
* **Security Architecture:** Detailed overviews of the 128-bit AES encryption schemas, FHSS protocols, and LoRaWAN backhauls utilized to meet Federal Federal ESG and Inter-agency standards.

## 4. Architectural Integration

* **Frontend Stack:** Static Site Generator (e.g., Docusaurus, Nextra, or MkDocs) optimized for ultra-fast text rendering and Markdown ingestion.
* **CI/CD Pipeline:** Fully automated deployment linked directly to the `farmsense-code` repository. Any changes to markdown specifications (like this file) instantly trigger a rebuild and redeployment of the Docs Portal.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

<div style="page-break-after: always;"></div>

# Farmer Dashboard Specification

## Overview

The Farmer Dashboard is the primary operational portal for the end user. It serves as the day-to-day command center for monitoring field health, evaluating the output of the hierarchical Kriging grids, executing VRI (Variable Rate Irrigation) plans, and receiving predictive anomaly alerts.

## 1. Core Visualization Engine (MapLibre GL JS)

The dashboard centers around a high-performance web-mapping interface built on `MapLibre GL JS`. This engine visualizes the massive volume of spatial data generated by the Zo Kriging engines without client-side lag.

* **Hierarchical Grid Toggling:** Users can seamless switch between the 3 tiers of Empirical Bayesian Kriging resolution:
  * **50m Hardware Edge-EBK Layer:** Displaying the direct probability grid generated autonomously by the PMT's FPU array. Represents raw offline capability.
  * **20m DHU Enhanced Layer:** Displaying the interpolated output generated at the District Hub level leveraging mesh data from surrounding fields.
  * **1m "Zo" Master Layer:** The ultimate high-fidelity output. This layer overlays the 20m grid interpolated against Sentinel-2/Landsat satellite covariates (processed via FHE Regression Kriging at the Regional Superstation/Cloud).
* **Time-Series Playback:** A scrubbing timeline allowing farmers to animate the progression of soil moisture, temperature, and crop stress over previous days/weeks to visualize deterministic trend tracking.
* **"Resolution Pop" (Coming Soon - Phase 7):** Pre-allocated UI scaffolding to inject ultra-high density (+/- 2cm) multispectral drone imagery over suspected anomaly zones.

## 2. VRI Command & Control

The interface provides direct (but secure) controls over the pivot's Variable Rate Irrigation systems.

* **Deterministic Worksheet Generation:** The UI surfaces the "Worksheets" automatically generated by the Zo Engine. These are mathematically optimized speed maps defining the exact % speed the pivot should travel at specific degrees of its rotation to resolve identified crop stress.
* **Review & Execute/Modify:** The farmer reviews the proposed Worksheet. They can approve it for execution (sending the speed envelope payload to the PMT), or manually adjust specific sectors using an interactive arc-drawing tool.
* **Kinematic Auditing Viewer:** A secondary display tracks the real-time physical position of the pivot against its prescribed Worksheet using the PMT's u-blox RTK GNSS feed.

## 3. Alerts & Anomaly Center

Provides a deterministic interpretation of system flags, rather than dumping raw alarm codes.

* **"Fisherman's Attention" Status Indicator:** A prominent UI element showing the current intelligence posture of a given field (e.g., *Dormant [4Hr], Anticipatory [1Hr], Ripple [15m], or Collapse [5s]*).
* **Ripple/Collapse Epicenter Targeting:** When an anomaly is detected, the map auto-focuses on the epicenter of the statistical anomaly, outlining the "Ripple" of peer-nodes currently hyper-pinging to track the event margin.
* **Hardware Sentry Feed:** Constant feed of mechanical health from the PFA (cavitation warnings, bearing wear trends) and PMT (vibration harmonics indicating strut fatigue or flat tires).

## 4. Architectural Integration

* **Frontend Stack:** React 18, TypeScript, MapLibre GL JS, Material-UI.
* **Real-time Streaming:** Utilizes Socket.io for instantaneous UI updates when "Significant Event Focus Collapses" occur across the mesh network.
* **Authentication:** JWT via the centralized user management microservice.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

<div style="page-break-after: always;"></div>

# Grant Portal Specification

## Overview

The Grant Portal is a highly specialized, read-only data extraction interface. It is purposefully built for philanthropic foundations, academic institutions, and government bodies (e.g., the LOR Foundation, Federal Federal ESG, CSU SLV Research Center) who have funded specific FarmSense deployments and require rigorous, independent validation of system efficacy.

## 1. Project-Scoped Data Silos

* **Grant-Specific Dashboards:** Each funding body is granted access to a sandboxed environment that only visualizes the specific fields/hardware nodes deployed under their financial award.
* **Baseline vs. Deployed Metrics:** The interface heavily emphasizes comparative analytics. It contrasts the historical water extraction data of a specific field (before FarmSense) against the deterministic extraction rates achieved during the active grant period.

## 2. Validation & Export Tools

* **Raw Data Access:** Unlike the generalized Investor Portal, the Grant Portal allows academic partners to download the raw CSV datasets generated by the PMT (kinematics), PFA (flow rates), and VFA (soil matric potential) for independent peer-reviewed analysis.
* **Zo Kriging Outputs:** Access to export the generated 50m, 20m, and 1m Empirical Bayesian Kriging probability grids to validate the accuracy of the spatial interpolation engines against physical soil cores.
* **API Provisioning:** Allows partner universities to generate secure API tokens to pull live telemetry directly into their own research databases (e.g., feeding FarmSense data directly into CSU's agricultural models).

## 3. Milestone Tracking

* **Automated Grant Reporting:** Built-in tools to auto-generate the specific milestone reports required by the funding body (e.g., 6-month progress reports detailing hardware deployment status, gallons saved, and system uptime).

## 4. Architectural Integration

* **Frontend Stack:** React 18, TypeScript, specialized CSV/JSON export utility libraries.
* **Security:** Strict Role-Based Access Control (RBAC) ensuring funding bodies cannot access data outside their specific grant purview, adhering to the FarmSense Spatial Privacy Policy.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# Investor Dashboard Specification

## Overview

The Investor Dashboard is a high-level, aggregate metric interface designed for venture capitalists, sustainability funds, and large-scale agricultural stakeholders to evaluate the economic and ecological impact of the FarmSense platform.

## 1. Macro Impact Analytics

* **Water Savings Calculator:** Real-time aggregation of gallons of water saved across the entire managed footprint, compared against historical baseline pumping averages.
* **Water-ROI (Return on Investment):** Algorithms combining water savings with local commodity crop prices to calculate the exact dollar value preserved per acre-foot of water saved.
* **Energy Efficiency Tracking:** Calculations of electrical kWh saved by reducing well pump run-times via deterministic VRI optimization.

## 2. Fleet Expansion metrics

* **Deployment Footprint:** Visual mapping showing the density of active nodes and the total acreage currently operating under FarmSense coverage globally.
* **Hardware Amortization:** Tracking the operational lifespan and failure rates of the physical nodes (PMTs, VFAs) to validate the hardware economic model.

## 3. Privacy & Compliance

* **Contextual Obfuscation Guarantee:** The Investor portal strictly connects to the *Federated Learning* database layer. It receives obfuscated, mathematically generalized regional data, absolutely guaranteeing zero exposure of individual farmer locations or legal extraction histories.

## 4. Architectural Integration

* **Frontend Stack:** React, Next.js for server-side rendering of complex financial dashboards. Highcharts/D3.js for advanced data visualization.
* **Data Sourcing:** Read-only access to specific, anonymized aggregate material views within TimescaleDB.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# Marketing Site Specification

## Overview

The Marketing Site is the primary public-facing portal for FarmSense. It acts as the "top of funnel" landing environment designed to communicate the dense, highly-technical value proposition of the Deterministic Farming Operating System to a broad audience of farmers, water district managers, foundations, and Federal acquisition officers.

## 1. Value Proposition Messaging

* **The "Deterministic" Philosophy:** Focuses the core messaging on the shift from "Estimated Agriculture" (guessing based on sparse soil probes) to "Deterministic Agriculture" (calculating the exact status of the field using Empirical Bayesian Kriging and massive sensor redundancy).
* **San Luis Valley Crisis Context:** Explicitly grounds the technology in the existential reality of the SLV unconfined aquifer depletion, demonstrating the immediate, non-theoretical need for the system.
* **Return on Investment (ROI):** Clear, interactive calculators allowing prospective farmers to estimate their precise savings regarding the $500/acre-foot groundwater pumping fees versus the cost of a FarmSense rollout.

## 2. Technical Architecture Showcase

* **Node Teardowns:** High-fidelity 3D renders and exploded views of the PMT, PFA, VFA, and LRZ hardware, emphasizing their ruggedized (Polycarbonate, Hybrid Pulse Capacitor) engineering.
* **The "Zo" Engine:** Simplifying the concept of spatial interpolation (1m Regression Kriging) and the decentralized edge computing capabilities (PMT Edge-EBK) for non-technical stakeholders.

## 3. Dual-Use & Federal Applicability

* **Federal ESG & Inter-agency Relevance:** A dedicated silo highlighting the military applications of the technology. This section emphasizes the Low Probability of Intercept/Detection (LPI/LPD) features of the LRZ chirps, the 128-bit AES FHSS protocols, and the potential for the Regional Superstations (RSS) to utilize Fully Homomorphic Encryption (FHE).

## 4. Architectural Integration

* **Frontend Stack:** React, Next.js (for optimal SEO and server-side rendering). TailwindCSS for rapid layout iteration, and Framer Motion for complex scroll-driven animations of the hardware nodes.
* **Lead Generation Engine:** Integration with in-Admin portal CRM (open sourced) to capture interest from prospect farmers and government entities.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# Regulatory Portal Specification

## Overview

The Regulatory Portal is the immutable legal ledger of the FarmSense platform. It is designed specifically for compliance officers, basin managers, and State Engineers to audit the exact water extracted by farmers operating under strict regulatory regimes (such as the unconfined aquifer caps in the San Luis Valley).

## 1. Immutable Ledger

* **Cryptographic "Black Box" Verification:** Displays the cryptographically signed (128-bit AES) flow data extracted directly from the District Hub's secure cache. This data represents the exact volumetric flow measured by the Pressure & Flow Anchor (PFA) and kinematic movement verified by the PMT.
* **Audit Trail:** An unalterable history of every drop pumped, mapped against the specific water right allocated to the field or subdistrict.
* **Tamper Alerts:** Automatic flagging of any hardware anomalies that suggest tampering (e.g., sudden loss of PFA telemetry, unapproved movement of the PMT, or abnormal vibration signatures).

## 2. Compliance Reporting Generation

* **Automated Subdistrict 1 Alignment:** Specifically formatted to generate the exact PDF/Excel reporting standard required for the June 2026 Subdistrict 1 Water Court trials.
* **"Master Meter" Calibration Logs:** Secure vault for storing the manual double-run calibration data executed by certified technicians, legally validating the +/- 1% accuracy of the PFA/PMT hardware.

## 3. Basin-Wide Analytics

* **Total Extraction vs. Allocation:** Macro-level dashboard comparing the cumulative extraction of all enrolled farms against the total allowable depletion limits of the aquifer.
* **Geostatistical Ground Truth:** Access to the 20m DHU grids to cross-reference reported extraction with actual physical soil moisture changes, preventing "paper water" fraud.

## 4. Architectural Integration

* **Frontend Stack:** React 18, TypeScript. Data-grid heavy interface utilizing Material-UI DataTables.
* **Data Sourcing:** Direct connection to the secure, unalterable tables within the PostgreSQL/TimescaleDB architecture.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# Research Portal Specification

## Overview

The Research Portal is the deepest, most complex frontend within the FarmSense ecosystem. It is designed exclusively for Zo Data Scientists, Agronomists, and advanced academic partners (e.g., CSU Researchers) to monitor, debug, and refine the core geostatistical engines powering the entire platform.

## 1. Kriging Engine Diagnostics

* **Variogram Visualizer:** Interactive tools for analyzing the experimental and theoretical variograms generated during the 1m Regression Kriging process. Allows scientists to visually verify the sill, range, and nugget parameters fitted by the algorithms.
* **Residual Analysis:** Displays the detrended residuals (the difference between the satellite covariate trend and actual sensor readings) to evaluate the accuracy of the underlying regression models.
* **Uncertainty Mapping:** Visualizes the Kriging variance arrays alongside the primary probability grids. This allows researchers to identify zones across the global network where sensor sparsity is resulting in unacceptably low confidence intervals, indicating the need for additional physical VFA/LRZ deployments.

## 2. Adaptive Recalculation Telemetry

* **Engine State Monitoring:** Real-time visibility into the current operational mode of the Zo Adaptive Recalculation Engine.
* **Event Trigger Logs:** Detailed timelines showing exactly when and why the system shifted from a Dormant (12hr) state to an Active (15m) or Critical (1m) state based on environmental stimuli (e.g., sudden temperature drops, unexpected PFA flow spikes).

## 3. Algorithm Versioning & A/B Testing

* **Model Comparison:** Interface for running "shadow" Kriging engines (e.g., testing a new FHE-enabled interpolation algorithm) alongside the production engine and comparing their spatial outputs before deployment.
* **Historical Re-runs:** The ability to select historic field datasets and re-process them through updated Zo algorithms to quantify exact improvements in deterministic accuracy.

## 4. Architectural Integration

* **Frontend Stack:** React 18, TypeScript. Heavy reliance on WebGL-accelerated charting libraries (e.g., Plotly.js, advanced MapLibre layers) for rendering immense multidimensional arrays.
* **Direct API Access:** Interacts directly with the specialized `cloud-processing` administrative endpoints, bypassing the standard farmer-facing REST APIs.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# Admin Dashboard — Frontend Specification V1.75

**Portal:** `admin-dashboard` | **User Type:** FarmSense Platform Administrator / Operations  
**Framework:** React + Vite + TypeScript | **Port:** 3001

---

## V1 Feature Inventory (Existing)

| View / Component | Description |
|---|---|
| **System Overview** | 3 KPI cards: active users, system health %, pending audits |
| **User List** | Paginated table of registered users with role badges |
| **User Modal** | Create/edit user with role assignment |
| **Signature Portal** | Digital signature workflow for pending authorizations |
| **Settings** | Basic admin configuration panel |

---

## V1.75 Additions — New Primary Views

### 1. Live Mesh Network Monitor

A real-time topology map of the entire deployed hardware mesh with signal-flow animation and per-node drill-down.

**Key elements:**

* **Network Topology Graph** — Force-directed graph visualization of the mesh hierarchy: RSS (orange node) → DHU nodes (blue) → PMT nodes (green) → VFA/LRZ/PFA leaf nodes (white). Edge thickness represents link quality (RSSI). Animated pulses show data packets flowing up the hierarchy.
* **Per-Node Drill-Down Panel** — Click any node to expand: firmware version, battery voltage, last packet received timestamp, queue depth (packets pending sync), RSSI to parent node, GPS coordinates, and field assignment. Shows a 24-hour uptime sparkline.
* **Silent Node Alerts** — Any node that has not transmitted in >15 minutes is highlighted red with an elapsed time counter. Configurable alert threshold per node type (e.g., LRZ nodes may sleep longer without alarming).
* **Mesh Health Score** — Composite platform-wide health index: % of nodes reporting normally, average RSSI across all links, queue backlog depth, and sync lag to cloud. Updated every 60 seconds.
* **Geographic Map Overlay** — Toggle from graph view to a geographic map showing node positions plotted on satellite imagery. Useful for field technicians verifying physical deployment.

---

### 2. OTA Firmware Deployment Manager

A staged over-the-air firmware deployment and version tracking system for all hardware tiers.

**Key elements:**

* **Firmware Version Registry** — Table of all available firmware releases per device type (RSS, DHU, PMT, VFA, LRZ, PFA). Shows: version number, release date, changelog summary, compatibility warnings, and whether it is the currently promoted stable release.
* **Rollout Controller** — Define a deployment batch: select target device type + subdistrict filter + optional individual node selection. Set a deployment window (e.g., 02:00–04:00 local time to avoid irrigation cycles). Preview: estimated # of devices affected before confirming.
* **Real-Time Deployment Progress** — Live progress bar per device batch. Individual device rows show: queued → downloading → installing → rebooting → verified. Failed devices flagged immediately with error code.
* **Rollback Tool** — One-click revert to the previous firmware version for any individual device or cohort. Rollbacks require an admin justification note (logged for audit).
* **Version Matrix** — Fleet-wide firmware version heatmap: for each device type, what percentage of the fleet is on each version. Identifies stale firmware concentrations.

---

### 3. Tenant & Billing Operations

Full multi-tenant account management and revenue operations panel.

**Key elements:**

* **Account Portfolio Table** — All registered farm accounts with: tier (Silas/Basic/Pro/Enterprise), MRR contribution, active hardware node count, grant subsidy flag and expiry, trial status, last login, and payment status. Sortable and filterable by any field.
* **Tier Override Controls** — Admin can manually promote or demote any account's tier (for sales, support, or grant-program purposes). Tier changes are logged with a required reason note and admin identity.
* **Revenue Waterfall Chart** — MRR breakdown by tier, with month-over-month trend. Separate lines for grant-subsidized vs. self-pay ARR to show organic vs. program-dependent revenue.
* **Churn Risk Indicators** — ML-flagged accounts exhibiting churn signals: no login in >14 days, hardware going offline, compliance reports not being generated, or MRR payment failure. Admin action buttons: send re-engagement email, schedule support call, flag for account management.
* **Subsidy Ledger** — For each grant program: total authorized subsidy budget, amount disbursed to date, accounts enrolled, per-account subsidy balance and burn rate. Linked to the Grant Portal for cross-reference.

---

### 4. Platform Health Command

Unified system status dashboard for all backend services, infrastructure, and SLA tracking.

**Key elements:**

* **Service Status Grid** — Live health panel for every deployed service: FastAPI backend (response time p50/p95, error rate), Celery workers (queue depth, job completion rate), TimescaleDB (connections, query latency, hypertable sizes), Redis (hit rate, memory usage), RabbitMQ (message rate, consumer lag), edge sync service (batch upload lag, sync failures).
* **Historical Uptime Graphs** — 30-day rolling uptime graphs per service. Outage events annotated with root-cause tags (deployments, migrations, upstream API failures, hardware events).
* **Active Incident Log** — Open incidents with: severity (P0/P1/P2/P3), affected services, start time, elapsed duration, assigned responder, and current status. Resolved incidents show MTTR and post-mortem link.
* **SLA Tracker** — Per-customer-tier SLA dashboard. Enterprise accounts show contracted uptime % vs. actual. Breach risk alerts when a service is trending toward SLA violation in the current month.
* **API Usage Analytics** — Time-series charts of API call volume by endpoint, error rates, authentication failures, and rate-limit events. Top consumers by account with anomaly flags for unusual spike patterns.

---

### 5. Data Governance Center

Privacy, data-sharing, and access-control management across the entire platform.

**Key elements:**

* **Data-Sharing Access Matrix** — Cross-reference table: rows are farmer accounts, columns are portal types (Regulatory, Investor, Research, Grant). Each cell shows the current sharing consent status (enabled/disabled), the date it was set, and who set it. Admins can view but not change farmer-owned consent.
* **Data Access Event Audit Log** — Immutable log of every data access event across all portals: requesting officer identity, data scope requested, field(s) accessed, timestamp, and session duration. Filterable by portal, account, or date range. Exportable for compliance review.
* **Legal Hold Manager** — Flag specific accounts or field datasets as under legal hold (e.g., active Water Court litigation). Hold prevents data deletion, tier downgrades, or consent changes until the hold is lifted by a named legal officer.
* **GDPR / CCPA Request Tracker** — Queue of incoming privacy requests (access, deletion, portability). Workflow: intake → verification → fulfillment → confirmation. Tracks SLA compliance (legal deadlines per jurisdiction).
* **Force-Revoke Console** — Admin can revoke a farmer's data-sharing grants on their behalf in an emergency (verified legal instruction required). Generates an automated notification to the farmer and the affected portal with the revocation timestamp and reason.

---

### 6. Reflex Logic Configuration

Basin-level threshold editor for the deterministic decision engine.

**Key elements:**

* **Global Threshold Editor** — Edit the core decision-engine thresholds that govern the entire platform: moisture stable band, active threshold, critical threshold, trend volatile score, ET trigger coefficients, and minimum pump cycle intervals. Changes require a two-admin co-signature before going live.
* **Threshold Change Preview** — Before committing a threshold change, the system simulates the effect on the last 30 days of field data across all enrolled farms. Shows: how many actuation decisions would have changed, estimated water savings impact, and any new critical-event triggers that would have fired.
* **Reflex Message Broadcaster** — Send a mesh-wide Reflex message (emergency pump ceiling, drought advisory, Mandatory stop). Three severity levels: Advisory (informational), Warning (dashboard alert), Mandatory (automatically enforced by DHU Reflex Logic). Mandatory broadcasts require dual-officer co-signature with hardware-backed timestamp.
* **Basin Drought Status Board** — Current declared drought status, active Reflex limits by subdistrict, and historical Reflex event log.

---

### 7. Grant Subsidy Management

Track and administer all grant-funded hardware programs and account subsidies.

**Key elements:**

* **Grant Program Registry** — All active grant programs: program name, administering agency, total budget, accounts enrolled, hardware units covered, and program timeline. Each program links to the Grant Portal for detailed reporting.
* **Hardware Fulfillment Tracker** — For each grant program: ordered hardware quantities, shipped to field, installed and online, and firmware-verified. Tracks deployment completion % against grant milestones.
* **Per-Account Subsidy Detail** — Drill into any subsidized account: exact subsidy amount, monthly burn rate, hardware costs covered, subscription costs covered, remaining balance, and projected exhaustion date.
* **Bulk Subsidy Operations** — Apply or extend subsidies to a cohort of accounts in one operation (e.g., "extend all Subdistrict 1 accounts by 90 days"). All bulk operations require admin sign-off and are logged.
* **USDA/EPA Adoption Report Generator** — Auto-generate a structured report for grant administrators showing: # of farmers reached, total acres covered, system uptime, compliance report generation rate, and water savings metrics. Used to satisfy grant deliverable reporting requirements.

---

### 8. Compliance Audit Operations

Internal queue and workflow manager for all regulatory submissions across all tenant accounts.

**Key elements:**

* **Submission Queue** — All pending compliance submissions across every tenant account in a unified queue. Columns: account name, field, submission type, generated date, assigned officer, status (Drafted/In Review/Signed/Submitted/Acknowledged by DWR).
* **Review & Flagging Console** — Open any submission draft, review the auto-generated content, and: approve as-is, flag for revision (with comment), or reject (with legal justification). Flagged items are returned to the tenant with admin comments.
* **Officer Assignment** — Assign a named FarmSense compliance officer to any submission. Assignment is logged and the officer receives an in-app notification with the review deadline.
* **DWR Submission Pipeline** — Track each submission's status through the state DWR ingestion pipeline. Status states: Submitted to DWR → Acknowledged → Under Review → Accepted / Returned for Revision.
* **Compliance Analytics** — Platform-wide compliance metrics: submissions generated per month, average time from generation to DWR submission, rejection rate, and first-pass acceptance rate by submission type.

---

## Design Notes

* **Permission Model:** All destructive actions (force-revoke, tier change, Reflex mandatory broadcast, legal hold) require at least one additional admin co-signature logged as a hardware-timestamped event.
* **Audit Trail:** Every admin action in every view is logged to an immutable internal audit table (separate from farmer-facing ledgers) with admin identity, action type, affected resource, and timestamp.
* **Performance:** The mesh network monitor supports up to 50,000 nodes; the topology graph uses a canvas-based renderer (not SVG) for performance at scale.

<div style="page-break-after: always;"></div>

# Farmer Dashboard — Frontend Specification V1.75

**Portal:** `farmer-dashboard` | **User Type:** Field Operator / Farm Owner  
**Framework:** React + Vite + TypeScript | **Port:** 3000

---

## V1 Feature Inventory (Existing)

| View / Component | Description |
|---|---|
| **Operations Command** | Hero dashboard with 4 KPI cards (savings, temperature, flow, PMT kinematics) |
| **AgriMap Explorer** | Interactive map with Sentinel-2 overlay and 1m grid visualization |
| **SILAS Mode (Simple)** | Large-button simplified UX for non-technical operators |
| **AR Field Vision** | Augmented reality field overlay component |
| **Live Telemetry** | Real-time aggregated sensor stream panel |
| **Forecast Widget** | Predictive AI weather and irrigation forecast |
| **Weather HUD** | Floating atmospheric conditions overlay |
| **Hardware Diagnostics** | Node health panel (battery, RSSI, last-seen) |
| **Privacy & Data Settings** | Data-sharing toggles (auditors, investors, research pool) |
| **Voice Decision Engine** | Mic-activated field decision assistant with rule provenance |

---

## V1.75 Additions — New Primary Views

### 1. Irrigation Command Center

A full Variable Rate Irrigation (VRI) control interface driven by the 1m Kriging output.

**Key elements:**

* **Zone Actuator Grid** — The field is divided into zones derived from the 1m Kriging output. Each zone card displays: current Soil Matric Potential (SMP), Volumetric Water Content (SWC), recommended dwell time (minutes), and actuate/hold status toggle.
* **Decision Countdown Timer** — Live countdown to the next scheduled adaptive recalculation cycle. Mode indicator (STABLE / ACTIVE / CRITICAL / OUT_OF_TURN) with color-coded urgency.
* **Rule Provenance Trace** — "Show Me The Math" drawer for any zone: expands to show full deterministic decision chain — every sensor input, threshold comparison, and the specific rule string that produced the actuate/hold decision. All labelled with CSU SLV RC Thresholds v2026.1 source reference.
* **Manual Override Console** — Override individual zone decisions with two-tap confirmation and a mandatory reason log (for audit trail). Override events emit a signed entry to the DHU cryptographic ledger.
* **Irrigation History Timeline** — 30-day rolling chart of zone-level actuation events overlaid with precipitation and ET data. Highlights events that deviated from the model recommendation.

---

### 2. Well & Pump Operations Suite

Dedicated PFA (Pressure & Flow Anchor) dashboard replacing the sparse pump card in V1.

**Key elements:**

* **Real-Time Waveform Display** — Live torque ripple waveform from the NXP Cortex-M7 CT Clamp analysis (400A, 3-phase). Rendered as a scrolling oscilloscope-style chart at 10Hz refresh.
* **Health Scores Panel** — ML Current Harmonic Analysis outputs four continuous health indices: Bearing Wear (0–100), Cavitation Risk (0–100), Vibration Harmonic Distortion (% THD), and Efficiency Degradation (% vs. baseline). Each index has a warning threshold and a predicted days-to-failure estimate.
* **Flow & Pressure Gauges** — Live GPM and PSI readings from the ultrasonic transit-time flow meter (Badger Meter). Trend sparklines for the last 24 hours.
* **Predictive Maintenance Calendar** — ML-generated maintenance schedule: next recommended inspection date, estimated component lifetimes (impeller, bearings, motor windings), and history of past maintenance events.
* **Emergency Stop / Start** — Large, prominent pump actuator button with two-step confirmation. Stop events are immediately broadcast to the DHU and logged in the cryptographic ledger with timestamp, GPS, and operator identity.

---

### 3. Crop Health Intelligence Panel

Visual crop stress monitoring fusing satellite multispectral data with drone 0.7cm/pixel mosaic resolution.

**Key elements:**

* **Dual-Source NDVI/NDWI Map** — Choropleth 1m grid layer combining Sentinel-2 spectral indices and drone multispectral mosaic data (Resolution Pop). Toggle between: Sentinel-only (20m), Kriging-interpolated (1m), and drone-fused (0.7cm where available).
* **Time-Lapse Comparison Slider** — Side-by-side or blend-slider comparison of the current NDVI map vs. 14 days ago vs. same week last season. Highlights areas of significant decline (ΔNDVI > 0.1).
* **Automated Stress Detection** — Background analysis flags 1m² zones with canopy decline. Each flagged zone is presented as a clickable alert: shows the zone coordinates, NDVI drop magnitude, linked VFA/LRZ sensor node readings for that zone, and a root-cause hypothesis (moisture stress, salinity, pest pressure, nutrient deficiency).
* **Canopy Cover Trend Chart** — Field-level weekly NDVI trend over the growing season, overlaid with irrigation events and rainfall. Useful for demonstrating yield preservation impact to auditors or grant officers.

---

### 4. Water Ledger & Rights Manager

Full blockchain-backed water accounting and PBFT peer-to-peer groundwater rights trading interface.

**Key elements:**

* **Season Water Budget Gauge** — Visual "water budget" showing: seasonal cap (acre-inches allocated by subdistrict), consumed to date (from PFA flow meter, cryptographically verified), remaining budget, and projected end-of-season consumption based on current trajectory.
* **Extraction Ledger** — Paginated, timestamped log of every extraction event. Each entry shows: date/time, GPM, acre-inches, verifying sensor node ID, and cryptographic hash signed by the DHU hardware key. Filterable by date range. Exportable as a court-ready PDF.
* **PBFT Water Rights Marketplace** — Browse active buy/sell offers within the local alliance district. Each listing shows: seller farm ID (anonymized alias), volume offered (acre-inches), price ($/acre-inch), and cryptographic trade proof. One-click "Accept Offer" executes the PBFT consensus transaction and updates both parties' water budgets instantly.
* **Trade History** — Complete record of executed trades with PBFT consensus hash, counterparty ID, volume, price, and settlement timestamp. Immutable and admissible in Water Court.
* **Water Credit Dashboard** — Tracks SLV water credits earned this season (acre-inches conserved vs. historical baseline × credit rate). Shows pending vs. issued credits and estimated monetary value.

---

### 5. Aerial Fleet Operations

Full drone mission planning, dispatching, and post-flight analysis center.

**Key elements:**

* **Mission Planner** — Draw flight corridors directly on the field map. Define: target zones (drawn polygons), spectral payload (RGB, NIR, NDRE, thermal), flight altitude, and overlap percentage. System auto-calculates estimated flight time, battery requirements, and generated mosaic resolution.
* **Live Drone Telemetry Feed** — During active missions: altitude, airspeed, battery %, GPS position tracked on map, ETA to completion, and real-time streaming thumbnail of nadir camera.
* **Mission History Archive** — Completed missions listed with date, coverage area, and primary finding summary. View the full generated mosaic and Resolution Pop 1m grid output for each mission.
* **Automated Dispatch Triggers** — Configurable rules that recommend drone dispatch: e.g., "NDVI drops >0.15 in any zone → suggest coverage scan." User confirms or dismisses the recommendation.
* **Pre/Post-Treatment Comparison** — For any irrigation or treatment event, overlay the NDVI mosaic from just before and just after. Quantify the improvement in canopy health directly attributable to the action.

---

### 6. Economic Intelligence Dashboard

Full season-to-date financial performance derived directly from field telemetry.

**Key elements:**

* **Season P&L Breakdown** — Itemized financial summary: water pumping cost (GPM × hours × energy rate), yield preservation value (ΔNDVI × commodity price model), labor efficiency gain (automation hours saved), regulatory fee avoidance (water credits × fee rate), and net economic benefit. All sourced and traceable to specific telemetry readings.
* **MAD Battery Visualization** — The soil profile presented as a "battery" metaphor: current % of the Management Allowable Depletion window remaining until irrigation becomes mandatory. Rendered as a large, intuitive gauge. Replaces all abstract moisture percentage displays for non-technical users.
* **Cost-Benefit Analysis Live Feed** — Real-time CBA updating every recalculation cycle. Shows the marginal cost of pumping (energy + fees + equipment wear) vs. the marginal revenue of yield preservation at the current crop stage. A clear `PUMP` or `HOLD` boolean with supporting numbers beneath it.
* **Benchmark Comparisons** — How does this field's water efficiency compare to: (a) the user's own historical baseline, (b) the anonymized regional average (from the federated pool), and (c) the best-performing similar farm in the anonymized dataset?
* **Grant Subsidy Tracker** — If the account is grant-subsidized, shows the original grant amount, amount consumed by hardware/subscription costs, remaining balance and expiry date.

---

### 7. Corner-Swing Auditor (CSA) Monitor

Dedicated view for fields equipped with Corner-Swing Auditor hardware variants.

**Key elements:**

* **Live Arc Geometry Visualizer** — The field boundary overlaid with the pivot circle and corner-swing arm geometry. Real-time position dot for both the Primary Span Tracker and the Swing-Arm Tracker nodes. Deviation from the programmed arc path shown in real-time (meters off-path).
* **Arc Completion Progress** — Per-pass progress ring showing current arc completion percentage and estimated completion time. Historical pass log with start time, end time, and completion accuracy %.
* **Water Application Heatmap** — 1m-resolution heatmap of water application rate across the corner swing zone for the most recent pass, derived from flow meter data and arc geometry. Identifies over- or under-application zones at the edge of the swing radius.
* **Mechanical Health Alerts** — Monitors for irregular swing-arm deceleration patterns that may indicate drive motor issues. Flags anomalies for the pump operations suite maintenance calendar.

---

### 8. SILAS Mode V1.75 (Complete Redesign)

A full visual and UX redesign of the simplified mode for non-technical farm operators.

**Key elements:**

* **Color-First Interface** — All metrics expressed as traffic-light colors with plain-English labels. No raw numbers shown (moisture percentages, GPM, SMP values all hidden). Green = Good, Yellow = Watch, Red = Act.
* **"Today's Farm Report" Auto-Brief** — Generated each morning at 6:00 AM local. A plain-text 3-sentence summary: field water status, today's weather risk, and one recommended action. Deliverable by push notification or SMS.
* **Full-Screen Action Cards** — Three categories only: `WATER STATUS`, `PUMP CONTROL`, `FIELD MAP`. Each card occupies the full viewport with massive text and one primary action button.
* **Voice Assistant Command Library** — Pre-built command library with 20+ natural-language queries ("Is it going to rain?", "How much have I saved?", "When should I turn the pump on?", "What does Zone 4 look like?"). Responses delivered as plain-English sentences, not data tables.
* **Print-to-Paper Field Card** — One-click export of a single A4 page with today's soil status, pump schedule, and field alert summary. Designed for operators who manage fields without a phone signal.

---

## Data & API Dependencies (V1.75 Additions)

| Feature | Backend Endpoint(s) |
|---|---|
| Irrigation Command Center | `GET /fields/{id}/grid/1m`, `POST /irrigation/actuate` |
| Pump Suite | `GET /hardware/pfa/telemetry`, `GET /hardware/pfa/health` |
| Crop Health Panel | `GET /analytics/ndvi`, `GET /analytics/drone-mosaic` |
| Water Ledger | `GET /ledger/extractions`, `GET /ledger/credits` |
| PBFT Marketplace | `GET /marketplace/offers`, `POST /marketplace/trade` |
| Aerial Fleet | `GET /drones`, `POST /drones/mission`, `GET /drones/history` |
| Economic Dashboard | `GET /analytics/financials`, `GET /fields/{id}/analytics` |
| CSA Monitor | `GET /hardware/csa/telemetry` |

---

## Design Notes

* **Dual-Mode Architecture:** SILAS Mode V1.75 and Advanced Mode share the same backend data; the presentation layer is entirely separate. Switching modes is a single toggle in the sidebar.
* **Offline Resilience:** All views degrade gracefully to local edge cache data when the DHU uplink is unavailable. A prominent banner indicates "Offline Mode — Edge Cache Active."
* **Audit Trail:** Every actuator command (pump start/stop, zone override) writes a signed, immutable entry to the DHU ledger before the UI confirms the action.

<div style="page-break-after: always;"></div>

# Investor Dashboard — Frontend Specification V1.75

**Portal:** `investor-dashboard` | **User Type:** Seed / Series A Investor / Fund Manager  
**Framework:** React + Vite + TypeScript | **Port:** 3003

---

## V1 Feature Inventory (Existing)

| View / Component | Description |
|---|---|
| **Investor Landing** | Pre-auth marketing splash with "Explore" CTA |
| **HQ Milestones** | Phased rollout status with milestone progress tracking |
| **Equity Buy-In Portal** | Seed equity participation and investment terms |
| **Holographic Globe** | 3D globe showing global node deployment locations |
| **Seed Projections Chart** | Area chart of projected ROI over time (Q1 2024–Q2 2025) |
| **Live Bloomberg Ticker** | Scrolling FSN-CARBON / FSN-WATER prices and active node count |
| **Seed Agreement Portal** | Legal document signing for seed investment execution |

---

## V1.75 Additions — New Primary Views

### 1. Live Platform Intelligence Terminal

A Bloomberg-style real-time operational data terminal designed to make the platform's live scale viscerally real to investors.

**Key elements:**

* **Live Counter Grid** — Six auto-refreshing counters, large and centered: Active Hardware Nodes, Acres Under Live Monitoring, Sensor Readings Ingested (today), Compliance Reports Filed (this year), Water Saved m³ (this season), and System Uptime %.
* **Real-Time Ingestion Feed** — Scrolling live feed of sensor batch ingestion events: timestamp, field ID (anonymized), reading count, and processing time. Updates every 15 seconds with actual data throughput numbers.
* **Network Status Map** — Miniaturized version of the mesh topology showing live node activity across all deployed subdistricts. Color-coded by region.
* **Incident & Anomaly Feed** — Live stream of anomaly detection events as they fire across the basin. Each event shows: type, confidence score, regulatory escalation status. Demonstrates the forensic intelligence operating in real time.
* **Platform Milestones Ticker** — Each time a new record is broken (new acres enrolled, highest single-day ingestion, etc.), a celebratory milestone banner fires.

---

### 2. Revenue Engine Deep-Dive

Detailed breakdown of the Resolution Pop monetization funnel with full SaaS analytics.

**Key elements:**

* **Conversion Funnel Visualization** — End-to-end funnel from Free (Silas Tier) → Basic → Pro → Enterprise. Shows absolute counts, conversion rates between each step, and average time-to-convert. Overlays the grant-subsidy effect: what percentage of free users convert to paid after their subsidy expires.
* **ARPU & MRR Waterfall** — Monthly chart of MRR broken out by tier. Net MRR movement month-over-month (new MRR, expansion MRR, contraction MRR, churned MRR). ARPU trend per tier.
* **Cohort Retention Analysis** — Cohort retention table showing how each monthly sign-up cohort retains across months 1–12. Identifies which cohorts have the highest retention (likely grant-program cohorts) vs. organic.
* **CAC vs. LTV by Channel** — Customer acquisition cost vs. lifetime value broken out by acquisition channel: grant program, direct outreach, regulatory referral, academic partnership. LTV:CAC ratio highlighted per channel.
* **Grant-Subsidy Revenue Bridge** — Shows the transition from subsidy-dependent revenue to self-sustaining ARR as grant programs mature. Projects the inflection point where platform revenue exceeds subsidy dependency.

---

### 3. Carbon & Water Asset Exchange

Full portfolio view of the FSN-CARBON and FSN-WATER derivative instruments generated and verified by the platform.

**Key elements:**

* **Live Asset Prices** — Real-time price charts for FSN-CARBON (Carbon Farming Standard credits, $/tonne) and FSN-WATER (verified acre-inch conservation credits, $/acre-inch). 1-day, 7-day, and 30-day price histories.
* **Credit Generation Model** — Visual explanation of how credits are generated: verified water conservation (acre-inches saved vs. historical baseline) → PBFT-confirmed and officer-validated → issued as tradeable FSN-WATER credit. Same pipeline for carbon via soil carbon sequestration proxy estimates from the NDVI trend.
* **Platform Credit Portfolio** — Total credits generated to date across all enrolled farms. Annual credit issuance trajectory. Current market value of all outstanding credits at spot price.
* **Projected Annual Yield** — Based on current enrolled acreage, average conservation rate, and credit price trend: projected credit revenue for next 12 months. Sensitivity range (low/mid/high price scenario).
* **Secondary Market Activity** — Trade volume, unique buyer/seller count, and liquidity metrics for the credit exchange. Supports the narrative of a functioning, liquid market for platform-generated assets.

---

### 4. Sovereign Expansion War Room

Interactive stage-gated expansion roadmap visualization from regional pilot to global water infrastructure.

**Key elements:**

* **Stage Map** — Four concentric rings or a linear stage diagram: Stage 1 (San Luis Valley Pilot) → Stage 2 (Colorado Statewide / DWR Integration) → Stage 3 (National — USDA/USGS / High Plains Aquifer) → Stage 4 (Sovereign Global — Australia, Brazil, UN Water Security). Each stage is clickable.
* **Stage Detail Panels** — For each stage: required hardware node count, target enrolled acres, required regulatory milestones (e.g., "DWR Rule-Compliant designation"), projected ARR at stage completion, and current progress bars.
* **Policy Risk Heatmap** — For each target jurisdiction: a color-coded risk score across: regulatory receptivity, water rights legal framework compatibility, existing competitor presence, and infrastructure (power/connectivity) availability. Helps investors understand where and why the expansion path is sequenced as it is.
* **Timeline with Capital Requirements** — Gantt-style timeline showing each stage's projected start/end date alongside the capital deployment milestones required to achieve it. Clearly maps Series A proceeds to specific expansion outcomes.
* **International G2G Status** — Government-to-government treaty discussion tracker: which countries have had preliminary discussions, who initiated contact, and what the proposed framework looks like.

---

### 5. IP & Competitive Moat Analysis

Complete intellectual property registry and competitive differentiation matrix.

**Key elements:**

* **Patent Portfolio Registry** — Catalogue of all filed and granted patents: algorithm patents (Regression Kriging workflow, EBK implementation), hardware design IP (kinetic penetrator geometry, HPC cold-start capacitor design, FHSS 128-bit frequency-hopping schema), and trade secrets (MAD threshold calibration constants, CU model coefficients). Filing dates, countries, and legal status.
* **Moat Analysis Matrix** — Side-by-side competitive comparison. Rows: key differentiating capabilities (hardware-signed immutable ledger, 1m Kriging resolution, PBFT water trading, FHSS LPI, FHE capability, Water Court admissibility, Reflex offline autonomy). Columns: FarmSense vs. named competitors (Climate Corp, Trimble Ag, Arable, Planet Labs, Ag Leader). Binary or scored comparison cells with a source footnote for each claim.
* **Trade Secret Classification** — Summary of what is patent-protected vs. trade-secret-protected vs. copyright-protected. Shows the legal strategy behind each protection mechanism.
* **IP Defense Timeline** — Milestones for IP: pending patent approvals, continuation applications, PCT international filings. Shows which IP rights will strengthen the moat over the next 12–36 months.

---

### 6. Federal / Federal ESG Dual-Use Revenue Simulator

Investor-facing model of the defense contract revenue potential of the FarmSense network.

**Key elements:**

* **Node Qualification Counter** — Current count of hardware nodes that qualify for Federal/Federal ESG programs based on: FHSS LPI/LPD capability, FHE-capable RSS units, Inter-agency-compatible mesh topology, and air-deliverable kinetic penetrator qualification.
* **Program Pipeline Model** — Structured view of the Federal ESG contract pipeline: program name, program office, contract type (R&D, pilot, production), estimated contract value range, and FarmSense's competitive positioning. Not binding — clearly labelled as projections for scenario modeling.
* **Revenue Scenario Sliders** — Investor can adjust: % of FHSS-qualified nodes contracted by Federal, Federal ESG R&D pilot award probability, and FHE RSS unit deployment count. Revenue model recalculates in real time showing notional contract values under each scenario.
* **Civilian-to-Defense Handoff Narrative** — Visual timeline showing how civilian deployment milestones (Subdistrict 1 proof, Colorado DWR approval) create the validation record that enables Federal procurement. Explains why civilian revenue is the on-ramp to defense revenue.

---

### 7. Secure Data Room

Time-gated, watermarked investor document access with full engagement analytics.

**Key elements:**

* **Document Library** — Organized folders: Company Overview, Financials (cap table, audited P&L), Technical Diligence (architecture docs, patent filings, CSU validation reports), Regulatory (DWR MOU, SLV 2026 alignment docs), Legal (term sheet drafts, LOIs from government agencies). Each document has a classification level (Confidential / Highly Confidential).
* **Watermarked PDF Delivery** — Every document opened or downloaded is automatically watermarked with the viewing investor's name, organization, and session timestamp. Prevents forwarding of uncontrolled copies.
* **Invitation & Access Control** — Admins control which investors have access to which folder levels. Access invitations are time-limited (7/30/90 days). Admin can revoke access at any time.
* **Engagement Analytics** — For each document: view count, time spent (minutes), last viewed date, and how many pages were read. Helps the FarmSense team identify which diligence topics investors are spending the most time on and tailor follow-up conversations accordingly.

---

### 8. Deal Mechanics & Portfolio Tracker

Post-investment portfolio tracking and deal structure management for committed investors.

**Key elements:**

* **Equity Position Dashboard** — Current ownership %, implied current valuation (using latest-round price), paper gain/loss vs. initial investment, and projected value at target exit multiples (3x, 5x, 10x).
* **Pro-Forma Cap Table Modeler** — Interactive cap table: shows current structure (founder, seed investors, option pool). Adjust Series A raise amount and pre-money valuation to model dilution effect. Projects post-Series-A ownership for each existing shareholder.
* **Liquidation Preference Waterfall** — For proposed exit valuations, shows the payout waterfall by share class and investor. Clearly shows at what exit price each investor class enters the money.
* **Liquidity Event Timeline** — Projected milestones toward liquidity: Series A close target, Federal contract activation, Colorado DWR approval, Series B raise, and IPO runway model. Not binding — labelled as management projections.
* **Investor Relations Feed** — Curated update feed: board meeting summaries, monthly KPI updates, milestone achievements, press mentions. Replaces ad-hoc email communication with a structured, searchable investor comms log.

---

## Design Notes

* **Authentication:** The Investor Terminal uses a separate, higher-assurance authentication pathway (MFA required) compared to the public landing page. All sessions are logged with IP, device fingerprint, and duration.
* **Data Sensitivity:** All financial projections are clearly labelled as forward-looking estimates based on current trajectories. No guarantee language.
* **Visual Identity:** Maintains the Bloomberg-terminal aesthetic from V1 — dark background, monospaced financial data, live tickers. The new views extend this language rather than departing from it.

<div style="page-break-after: always;"></div>

# Regulatory Portal — Frontend Specification V1.75

**Portal:** `regulatory-portal` | **User Type:** State Engineer / Water Rights Officer / DWR Compliance Auditor  
**Framework:** React + Vite + TypeScript | **Port:** 3002

---

## V1 Feature Inventory (Existing)

| View / Component | Description |
|---|---|
| **Compliance Reports List** | Paginated list of generated SLV 2026 compliance reports |
| **Scientific Validation** | Display of Kriging methodology validation and CSU citations |
| **Economic Impact & IP** | Economic metrics panel and intellectual property overview |
| **Drone AR Feed** | Live drone camera feed with augmented reality overlay |
| **Integrity Chain Visualizer** | AES-128 cryptographic hash chain of custody visualization |
| **Anomaly Detection Alert** | Automated cryptographic hash mismatch alert banner |
| **4 KPI Cards** | Compliance rate, critical violations, audits this month, fields monitored |

---

## V1.75 Additions — New Primary Views

### 1. Basin Command Map (DWR Macro View)

A full-basin situational awareness map giving State Engineers a live, macro-level view of groundwater conditions across the entire valley.

**Key elements:**

* **Choropleth Depletion Map** — The entire monitored basin rendered as an animated choropleth map where color intensity represents real-time aquifer drawdown rate. Colour scale from deep blue (stable, no draw) through amber (significant draw) to red (critical depletion pace). Animations show the depletion gradient spreading or contracting over user-selected time windows (24h / 7d / 30d / season).
* **Layer Toggles** — Officers can overlay: groundwater elevation contours (interpolated from well depth sensors), registered well locations with permit status, FarmSense node density heatmap, active irrigation events (currently pumping nodes pulsing on the map), and annotated water rights boundary polygons.
* **Basin Summary Statistics** — Live panel alongside the map: total active extraction rate (GPM basin-wide), cumulative season depletion vs. sustainable yield, estimated days until the seasonal allocation cap is reached at the current rate, and count of at-risk wells (within 10% of their permit ceiling).
* **Field Drill-Down** — Click any field polygon to load a sidebar with that farm's current extraction rate, season-to-date usage vs. allocation, compliance status, last VFA reading timestamps, and direct link to their compliance report history.
* **Basin Alert Feed** — Chronological list of basin-wide anomaly events, sorted by severity, with one-click escalation to the Enforcement Console.

---

### 2. Reflex Enforcement Console

Emergency drought response tool enabling State Engineers to issue basin-wide pump restrictions with legal enforceability via the hardware mesh.

**Key elements:**

* **Severity Level Selector** — Three broadcast tiers:
  * **Advisory** — Informational notification pushed to all farmer dashboards. No automatic enforcement.
  * **Warning** — Dashboard alert with 48-hour voluntary compliance window before escalation. Logged to the DHU ledger for each farm.
  * **Mandatory** — DHU Reflex Logic enforces a hard pump ceiling automatically at the field edge level. GPM caps are encoded into the mesh-wide Reflex parameter and activated within 60 seconds of broadcast.
* **Dual-Officer Co-Signature Requirement** — Mandatory broadcasts require two named officers to cryptographically co-sign using their hardware-backed credentials. The co-signature event is logged with both officer identities, badge numbers, and a hardware timestamp before the broadcast propagates to the mesh.
* **Mesh Delivery Confirmation** — Real-time map showing which DHU nodes have acknowledged the Reflex message. Any node that has not acknowledged within 5 minutes is flagged for manual intervention.
* **Broadcast History** — Full log of all Reflex broadcasts: who issued it, co-signer identity, severity, declared reason, geographic scope, mesh delivery rate, and lift date/lifting officer. Admissible record for regulatory and legal proceedings.
* **Lift & Adjust Controls** — Modify or lift an active Reflex limit with the same dual-signature workflow. Supports partial lift (lift for specific subdistricts while maintaining restrictions elsewhere).

---

### 3. Forensic Playback Engine

Historical time-travel scrub of any field's complete hydrological state — the core tool for Water Court dispute resolution.

**Key elements:**

* **Time Slider Interface** — Scrub any date and time within the stored data range (up to 5 years). The interface renders the 20m IDW grid and 1m Kriging grid as they existed at the selected timestamp, along with all active sensor readings and pump telemetry.
* **Satellite Cross-Reference** — For any selected timestamp, the system fetches the nearest Sentinel-2 (optical) and Sentinel-1 SAR (radar) overpasses and overlays them alongside the ground sensor data for corroboration.
* **"Frozen Moment" Legal Package Generator** — For any selected timestamp and field: auto-compile a court-ready evidence package. Contents: (a) 1m Kriging grid PDF map; (b) raw sensor readings table with hardware-signed hash; (c) pump flow telemetry for the period; (d) satellite imagery with source metadata; (e) Zo Kriging CU calculation for the period; (f) cryptographic hash chain proving data integrity from that exact moment. Package is watermarked with the generating officer's ID and session timestamp.
* **Anomaly Replay** — Replays a flagged anomaly event in real time. Shows how the ground sensor readings and satellite moisture index diverged — the exact data that triggered the anomaly detection.
* **Chain of Custody Trace** — For any data point in the playback, display the full provenance: which hardware node generated it, the hardware signing key used, the DHU that received and countersigned it, and the cloud timestamp — an unbroken chain from sensor to evidence package.

---

### 4. Water Court Submission Workflow

A guided, multi-step wizard that takes a detected violation or anomaly and produces a complete, legally admissible evidence package ready for Water Court filing.

**Steps:**

1. **Case Setup** — Select field(s), date range, and violation type (unmetered extraction, permit ceiling breach, illegal diversion, data tampering attempt). Assign case reference number.
2. **Evidence Auto-Population** — System automatically pulls: cryptographic ledger data (hash chain), Zo Kriging CU calculations for the period, anomaly detection records with confidence scores, satellite corroboration imagery, and pump flow telemetry. All linked to the specific date range.
3. **Narrative Builder** — Officer adds a plain-language case summary (pre-filled with AI-drafted language from the telemetry). Flags which evidence items are being cited in the submission.
4. **Legal Package Preview** — Full preview of the court-ready PDF: cover page, case summary, evidence index, sensor data appendix, and hash chain appendix. Officer can annotate specific pages before finalizing.
5. **Officer Signature & Submission** — Sign with hardware-backed credentials. If dual-officer filing is required by the court, second officer receives a countersignature request. System tracks submission status: Drafted → Signed → Filed → Docketed → Adjudicated.
6. **Status Tracker** — All active cases listed with court status, next hearing date, and required follow-on filings dashboard.

---

### 5. Consumptive Use (CU) Science Panel

A transparency layer allowing officers to interrogate the Zo Kriging CU calculation and compare it directly against legacy Blaney-Criddle estimates.

**Key elements:**

* **Dual CU Calculator** — Input any field, crop type, and date range. Left panel shows the traditional Blaney-Criddle CU estimate (static formula, historical averages). Right panel shows the Zo Kriging real-time CU (multi-layer: SMP, SWC, VPD, solar radiation, NDVI, NDWI, LST, elevation). Both produce a final acre-inches/day figure.
* **Discrepancy Analysis** — Automatic comparison: how much does the Zo CU differ from Blaney-Criddle and why? Breakdown of which variables drove the difference (e.g., lower CU because VPD was suppressed by cloud cover; higher because anomalous soil temperature). Supports expert witness testimony on methodology superiority.
* **Input Factor Decomposition** — Bar chart showing the contribution weight of each input variable to the final Zo CU estimate. Officers can verify that the model is using physically reasonable weights for local conditions.
* **Confidence Interval Display** — The Kriging variance output is displayed as a confidence band around all CU estimates. Supports the argument that FarmSense CU calculations are statistically bounded to a defensible precision level.
* **Methodology Citation Export** — One-click PDF export of the full methodology note: variogram model used, training data sources, seasonal calibration log, and CSU SLV RC 2026 validation reference. Ready for attachment to Water Court filings.

---

### 6. Water Credit Registry & PBFT Ledger

Basin-wide view of all PBFT-verified peer-to-peer groundwater trading activity.

**Key elements:**

* **Active Credit Listings** — All open buy/sell offers for groundwater rights within the subdistrict. Each listing shows: listing farm (anonymized alias), volume (acre-inches), price, listing expiry, and PBFT proposal hash.
* **Executed Trade Log** — Complete history of all settled trades: buyer, seller, volume, price, settlement timestamp, PBFT consensus round proof hash, and officer validation hash. Every trade requires regulatory acknowledgement before settlement is final.
* **Officer Validation Workflow** — Proposed trades are held in a "pending officer review" state for up to 24 hours. Officers can approve with a cryptographic signature or block with a documented reason (e.g., trade would push buyer above their seasonal permit ceiling).
* **Credit Issuance & Invalidation** — Officers can issue new credits (when a farm verifiably conserves beyond their baseline) or invalidate credits (if supporting data is found to be fraudulent). Both actions require a case reference and an officer signature.
* **Basin Trading Volume Analytics** — Monthly and seasonal charts of trading volume (acre-inches exchanged), average price, number of participating farms, and total credit value in circulation. Trends inform future allocation policy decisions.

---

### 7. Multi-Constellation Anomaly Engine

Cross-spectral anomaly detection fusing Sentinel-1 SAR radar with Sentinel-2 optical to achieve cloud-free continuous monitoring.

**Key elements:**

* **Cloud-Free Detection Architecture** — Sentinel-2 NDWI provides optical moisture anomalies when skies are clear. Sentinel-1 SAR (VV/VH backscatter) detects soil moisture anomalies through cloud cover. Both signals are fused; the system flags an anomaly only when at least one constellation corroborates the ground sensor data — or when they contradict each other in a way that implies the ground sensor may have been tampered with.
* **Anomaly Confidence Scores** — Each flagged event receives a confidence score (0–100%) based on: number of corroborating data sources, delta magnitude, historical baseline deviation, and proximity to other confirmed events. High-confidence anomalies trigger automatic officer notification.
* **Anomaly Event Cards** — Each event card shows: field ID, date/time, anomaly type (unexpected moisture gain, pump data vs. satellite divergence, sensor blackout), confidence score, satellite imagery thumbnail for the date, and ground sensor readings at the time. One-click escalation path to the Water Court Submission Workflow.
* **False Positive Feedback Loop** — Officers can mark any anomaly as a false positive (with reason: known irrigation event, sensor maintenance, etc.). False positive data feeds back into model calibration to reduce future noise.
* **Temporal Anomaly Patterns** — Long-range pattern detection: identifies fields with recurring anomaly events at similar intervals or conditions. Flags systematic patterns for potential systematic non-compliance investigation.

---

### 8. Predictive Aquifer Modeling

30/60/90/365-day aquifer depletion trajectory forecasting to support proactive regulatory policy.

**Key elements:**

* **Depletion Forecast Charts** — Multi-horizon time-series forecast for basin-wide aquifer level. Three scenario lines: (a) Current Trajectory — no policy change; (b) Moderate Conservation — 10% extraction reduction (e.g., from Reflex Warnings); (c) Emergency Conservation — 25% reduction (Mandatory Reflex). Each line shows projected aquifer level vs. the legally designated critical drawdown threshold.
* **Well-Level Projections** — Drill into any specific well to see its individual projected level under each scenario, given its current extraction rate and allocated permit ceiling.
* **Policy Impact Simulator** — Adjust policy parameters (extraction reduction %, Reflex limit values, seasonal cap changes) and immediately see the effect on the forecast chart. Designed for use in planning meetings with legislators and DWR administrators.
* **Precipitation Sensitivity Analysis** — The forecast incorporates NOAA seasonal precipitation outlooks. Show the projected depletion range under dry / average / wet precipitation scenarios to communicate forecast uncertainty.
* **Regulatory Trigger Alerts** — Pre-set notification thresholds: when the forecast model predicts the aquifer will breach the critical drawdown level within a specified number of days, an automatic alert escalates to the Reflex Enforcement Console for proactive action.

---

## Data & API Dependencies (V1.75 Additions)

| Feature | Backend Endpoint(s) |
|---|---|
| Basin Command Map | `GET /basin/map`, `GET /basin/extraction-rate`, `GET /fields` |
| Reflex Console | `POST /mesh/reflex/broadcast`, `GET /mesh/reflex/history` |
| Forensic Playback | `GET /fields/{id}/grid/20m?timestamp=`, `GET /fields/{id}/grid/1m?timestamp=` |
| Water Court Wizard | `GET /ledger/extractions`, `GET /analytics/cku`, `POST /court/submissions` |
| CU Science Panel | `GET /analytics/cku/compare`, `GET /analytics/kriging/metadata` |
| PBFT Registry | `GET /marketplace/trades`, `PUT /marketplace/trades/{id}/validate` |
| Anomaly Engine | `GET /anomalies`, `POST /anomalies/{id}/feedback` |
| Aquifer Modeling | `GET /basin/aquifer/forecast`, `POST /basin/aquifer/simulate` |

---

## Design Notes

* **Access Control:** All views are read-only by default. Write actions (Reflex broadcast, court submission, trade validation, credit issuance) require hardware-backed officer credential co-signature.
* **Evidence Integrity:** All evidence packages generated by this portal carry a portal-level countersignature separate from and in addition to the hardware-level sensor signatures. The dual-signature chain establishes both data origin and officer integrity.
* **Privacy Architecture:** The Basin Command Map and Anomaly Engine display only anonymized or aggregated data. Individual farm data is visible only in the Forensic Playback and Court Submission views, which require case-level authorization logging.

<div style="page-break-after: always;"></div>

# Research Portal — Frontend Specification V1.75

**Portal:** `research-portal` | **User Type:** University Researcher / Agronomic Data Scientist / Climate Scientist  
**Framework:** React + Vite + TypeScript | **Port:** 3004

---

## V1 Feature Inventory (Existing)

| View / Component | Description |
|---|---|
| **Matrix Data Stream** | Animated raw data feed visualization |
| **Parameter Dials** | Interactive knobs for depth range, moisture index, and pH |
| **Soil Nutrient Trend Chart** | Line chart of nutrient A/B time-series |
| **Latest Datasets List** | Fetchable list of available datasets with download |
| **Lab Connect** | Button stub for external lab system integration |
| **Export All** | Bulk dataset export trigger |

---

## V1.75 Additions — New Primary Views

### 1. Federated Learning Experiment Console

Submit, monitor, and analyze distributed model training jobs over the anonymized global sensor pool.

**Key elements:**

* **Experiment Builder** — Define a hypothesis and configure the training job: select target variable (e.g., predict NDVI decline at day+14), select input features (EC, SMP, VPD, ET, rainfall preceding days), choose anonymized field cohort (by geography, crop type, or sensor tier), and configure training parameters (epochs, learning rate, validation split).
* **Privacy Compliance Gate** — Before submission, a required dual-layer privacy review confirms: (a) the job uses only contextually anonymized data, (b) no query could reconstruct an individual farm's GPS coordinates or identity, and (c) the output model parameters do not encode individual-level information. Research coordinator must acknowledge.
* **Live Training Monitor** — Once a job is submitted to the Zo compute cluster, the researcher sees: real-time loss/accuracy curves, per-epoch metrics, estimated time to completion, and compute resource utilization.
* **Results Review Board** — Completed experiment results: model performance metrics (RMSE, R², AUC), feature importance rankings, and a plain-English summary of the hypothesis test result. The researcher annotates findings, classifies the result (Confirmed / Rejected / Inconclusive), and submits for inclusion in the Zo Worksheet candidate review queue.
* **Experiment Registry** — History of all experiments submitted by the researcher and by the broader research community (anonymized by researcher institution). Enables discovery of prior work and prevents duplication.

---

### 2. Satellite Covariate Science Suite

An interactive multi-layer satellite data explorer for conducting spectral analysis over any field zone and time period.

**Key elements:**

* **Layer Selector** — Toggle individual satellite data layers: Sentinel-1 (VV backscatter, VH backscatter, VV/VH ratio), Sentinel-2 (NDVI B8/B4, NDWI B8A/B3, false-color composite), Landsat-8 (LST surface temperature), DEM derivatives (elevation, slope, aspect, TWI).
* **Date-Range Comparison Slider** — Select any two dates within the archive. Renders both dates side by side with a blend-slider. Pixel-value tooltip shows the exact spectral value at the cursor position for each date.
* **Pixel Inspector** — Click any map cell and get a full spectral profile: all available band values for that pixel at the selected date, plus a 12-month time series chart of that pixel's NDVI and SSM (surface soil moisture). Useful for identifying long-term trends at a single location.
* **Spatial Correlation Analysis** — Draw a polygon over any area of interest. The system calculates a Pearson correlation matrix between all enabled satellite layers and all available ground sensor types (SMP, SWC, EC) for measurements within that polygon. Visualized as a heatmap.
* **Cloud Mask Overlay** — Show the cloud/shadow mask applied to each Sentinel-2 overpass. Select alternate Sentinel-1 SAR passes (cloud-penetrating) for comparison.

---

### 3. Zo Kriging Worksheet Inspector

Full transparency into the mathematical pipeline of every Kriging computation — the core of the platform's scientific defensibility.

**Key elements:**

* **Input Variable Panel** — For any field and timestamp, display all inputs fed into the Kriging model: SMP (per depth node), SWC (per VFA depth), EC, VPD (from weather station grid), solar radiation (from HUD/satellite), NDVI, NDWI, LST, elevation, slope, aspect. Each value shown with its source node ID and hardware signature hash.
* **Trend Model Coefficients** — The fitted linear regression trend model displayed in full: coefficient values for each covariate, standard errors, t-statistics, p-values, and model R². Allows researchers to evaluate whether the trend model is well-conditioned for the current field conditions.
* **Variogram Model Parameters** — The fitted spherical variogram: nugget, sill, and range parameters, plus the method-of-moments empirical variogram scatter plot vs. the fitted model curve. Critical for assessing spatial autocorrelation assumptions.
* **Residual Kriging Predictions** — The interpolated residual surface after trend removal, rendered as a 1m grid. Variance map (kriging standard error) displayed alongside predictions. Researchers can identify spatial zones where uncertainty is high (sparse sensor coverage).
* **End-to-End Prediction Grid** — The final combined 1m grid: trend + residual prediction at every grid cell. Downloadable as GeoTIFF, CSV, or NetCDF. Each file includes embedded metadata: model version, input data timestamps, and hash chain proof of input integrity.

---

### 4. Field Trial Design Engine

Define, run, and statistically analyze spatial A/B agronomic experiments within instrumented fields.

**Key elements:**

* **Treatment Zone Mapper** — Draw experimental and control zone polygons directly on the field map. Assign each zone a treatment label: irrigation protocol, fertilizer variant, cover crop species, or custom label. Minimum zone size enforced (must contain ≥3 sensor nodes) to ensure statistical validity.
* **Pre-Trial Power Analysis** — Before the trial starts, calculate required sample size (sensor nodes × time periods) to detect a hypothesized effect size at a chosen power level (e.g., 80%) and significance level (α=0.05). Warns if the zone configuration is underpowered.
* **Trial Dashboard** — Live tracking during the trial: sensor readings per zone, NDVI per zone (from satellite or drone), irrigation event log per zone, and soil health metrics per zone. Shows whether zones are diverging as expected.
* **Statistical Analysis Suite** — At trial conclusion: automated Mann-Whitney U test (non-parametric, appropriate for small agricultural datasets), Cohen's d effect size, bootstrapped confidence intervals. Results table with interpretation labels (significant / not significant at chosen α). Option to download the raw data and statistical results as a structured CSV for publication.
* **Results Visualization** — Box plots of primary outcome variables per zone, overlaid with NDVI treatment-effect maps at 1m resolution. Before/after composite views.

---

### 5. SPAC Continuum Model Sandbox

An interactive environment for exploring and validating the Soil-Plant-Atmosphere Continuum model that underpins all irrigation decisions.

**Key elements:**

* **7-Variable Input Panel** — Sliders or numeric inputs for all SPAC model variables: Soil Matric Potential (bars), Volumetric Water Content (%), Electrical Conductivity (dS/m), Vapor Pressure Deficit (kPa), Solar Radiation (W/m²), NDVI (0–1), and LSTM ET Forecast (mm/day). Each slider has a tooltip explaining the physical significance of the variable.
* **Live Decision Recalculation** — As variables are adjusted, the model deterministic output updates in real time: the MAD battery % remaining, the irrigation recommendation (PUMP / HOLD boolean), the projected time-to-critical if HOLD is maintained, and the estimated water application rate if PUMP is triggered.
* **Threshold Sensitivity Map** — Vary any single input while holding others constant. Renders a 1D sensitivity chart: x-axis is the input range, y-axis is the model output (e.g., MAD %). Identifies which variables most strongly control the decision boundary at current conditions.
* **Calibration Mode** — Toggle into calibration mode: load actual sensor readings from a specified field and date, compare the model's prediction to actual measured outcomes (e.g., did soil moisture recover after irrigation as predicted?). Supports crop-specific and geography-specific model calibration.
* **Export Configuration** — Save the current set of SPAC parameters as a named configuration file. Researchers can propose new configurations for evaluation against the global dataset, which then enters the Zo Worksheet candidate review process.

---

### 6. Open Data Repository

A publicly accessible, privacy-preserving catalog of research datasets generated by the FarmSense platform.

**Key elements:**

* **Dataset Catalog** — Full listing of available anonymized research datasets. Each entry: dataset name, geographic region, date range, sensor types included, spatial resolution, record count, file size, DOI (for publication citation), license (CC-BY for academic use), and version history.
* **Filter & Discovery** — Filter datasets by: geography (basin, state, climate zone), date range, sensor type (soil, atmospheric, satellite, drone), crop category, and data completeness (% of expected readings present).
* **Data Preview** — Before downloading, view a statistical summary: variable distributions, missing data rates, and a sample scatter plot of key variables. Helps researchers assess dataset fitness before investing in a full download.
* **API Access** — For programmatic access: authenticated API endpoint for querying datasets with selectable spatial bounds, time windows, and output format (JSON / CSV / NetCDF-4 / GeoTIFF). Rate-limited per research institution credential.
* **Citation & Attribution** — Auto-generated APA and BibTeX citation strings for each dataset. Tracks usage: how many papers have cited each dataset (based on DOI lookup). Builds FarmSense's academic impact profile.
* **Data Quality Badges** — Each dataset carries quality indicators: sensor calibration status, field maintenance record completeness, percentage of readings that passed automated QA/QC flags, and whether the dataset has been independently validated by a university partner.

---

### 7. Anonymized Basin Analytics

Research-grade aggregated basin statistics for climate science and aquifer sustainability research.

**Key elements:**

* **Basin Extraction Time-Series** — Total groundwater extraction volume (acre-feet/day) across the monitored basin for the full data archive. Seasonally decomposed to show annual patterns and long-term trend. Compared against historical basin-level pumping permit data.
* **ET Demand vs. Precipitation Surplus/Deficit** — Multi-year chart of basin-aggregated ET demand from the SPAC model vs. precipitation input from the weather grid. The gap between ET demand and precipitation is the "irrigation necessity signal" — shows why the basin depends on groundwater.
* **Crop Health Basin Trends** — Average NDVI time-series for each major crop type in the basin. Identifies years or periods of basin-wide crop stress, correlated with precipitation, temperature, and aquifer drawdown data. Enables climate impact attribution research.
* **Sensor Network Coverage Map** — Shows which areas of the basin have high node density (good coverage) vs. sparse coverage. Identifies geographic gaps where Kriging uncertainty is highest. Useful for guiding future hardware deployment strategy.
* **Cross-Basin Comparison** — When multiple basins are monitored, researchers can overlay the extraction and crop health time-series from different basins. Supports comparative aquifer hydrology research.

---

### 8. Instrument & Lab Integration Bridge

Connect and calibrate external laboratory instruments and measurement systems to contribute additional ground-truth data into the platform.

**Key elements:**

* **Integration Registry** — List of connected external data sources: soil spectrometers (LIBS, XRF), LIMS (Laboratory Information Management Systems), third-party weather station networks, eddy covariance flux towers, and custom IoT sensors. Each integration shows: last sync time, record count contributed, and data quality score.
* **New Integration Wizard** — Step-by-step setup for connecting a new instrument: select instrument type, configure API endpoint or file upload format, map instrument data fields to FarmSense schema variables, set contribution frequency, and define geographic assignment (which fields this instrument acts as ground truth for).
* **Calibration Dashboard** — For each integrated instrument: view the offset correction currently applied before data enters the model. See the residual error between the instrument's readings and the primary FarmSense sensor network for the same field. Accept or reject proposed auto-calibration corrections.
* **Contribution Quality Scoring** — Each instrument's contributed data is scored on: timeliness (% of expected readings present), agreement with primary sensors (mean absolute error), drift detection (is the instrument calibration changing over time?). Instruments below a quality threshold are flagged and excluded from model training until recalibrated.

---

## Data & API Dependencies (V1.75 Additions)

| Feature | Backend Endpoint(s) |
|---|---|
| Federated Learning Console | `POST /research/experiments`, `GET /research/experiments/{id}` |
| Satellite Suite | `GET /satellite/layers`, `GET /satellite/pixel/{lat}/{lon}` |
| Zo Worksheet Inspector | `GET /analytics/kriging/worksheet?field_id=&timestamp=` |
| Field Trial Engine | `POST /research/trials`, `GET /research/trials/{id}/results` |
| SPAC Sandbox | `POST /analytics/spac/simulate` |
| Open Data Repository | `GET /research/datasets`, `GET /research/datasets/{id}/download` |
| Basin Analytics | `GET /basin/analytics/extraction`, `GET /basin/analytics/ndvi` |
| Lab Integration Bridge | `POST /integrations/instruments`, `PUT /integrations/instruments/{id}/calibrate` |

---

## Design Notes

* **Privacy Architecture:** All data accessible through this portal has passed through dual-layer contextual anonymization. Individual farm GPS coordinates, farmer identities, and specific field boundaries are not accessible. Research queries that attempt to reconstruct individual-level data through aggregation are rate-limited and flagged.
* **Scientific Transparency:** The Zo Worksheet Inspector is designed specifically to enable peer review of the platform's scientific methodology. All model parameters and training data provenance are exposed at the level of detail required for a journal paper supplementary methods section.
* **Collaboration:** Experiment results and dataset citations are cross-linked to the academic publication record wherever DOI references are available, building an evidence base for the platform's scientific impact.

<div style="page-break-after: always;"></div>

# FarmSense Video Prompts for Google Flow

## *Optimized for Flow's capabilities (~8 sec clips, text/image-to-video, Veo 3)*

---

## Video 1: General Public (Website Landing Page)

**Format:** Single 8-second clip for hero section

**Prompt:**
> Aerial view of golden farmland at sunset, camera slowly descending toward a center pivot irrigation system. As we get closer, subtle blue data particles begin floating upward from the soil, forming a faint grid pattern over the field. The camera continues to descend, transitioning to ground level where healthy green crops sway gently. Cinematic, golden hour lighting, hope and abundance. 16:9, highest quality.

**Alternative prompt (drought transformation):**
> Wide shot of cracked, dry earth under harsh midday sun. Camera slowly pushes in. Over 6 seconds, subtle transformation: cracks begin to fill with moisture, dry soil turns darker, and a single green sprout emerges and grows. Final frame: lush green crops filling the frame. Cinematic documentary style, warm but hopeful. 16:9, highest quality.

**Production Note:** Generate 2-3 variations, select best hero shot. Add text overlays in post-production (Flow doesn't handle complex text well).

---

## Video 2: Grant Writers (Federal Federal ESG, USDA, etc.)

**Format:** 3-4 clips to stitch in post-production

**Clip 1 - The Problem:**
> Aerial shot flying over the San Luis Valley at dawn, vast agricultural landscape stretching to distant mountains. Camera slowly pans across irrigation circles, some green, some brown and stressed. Documentary style, serious tone, blue-grey morning light. 16:9, highest quality.

**Clip 2 - The Technology:**
> Close-up of a soil moisture sensor being inserted into rich, dark earth. Camera pulls back slowly to reveal a network of small sensors across a field, faint blue light pulses traveling between them. Technology meeting nature, clean and precise. 16:9, highest quality.

**Clip 3 - The Scale:**
> Low-angle shot of a pivot irrigation system at golden hour, water spraying in a perfect arc against a blue sky with scattered clouds. Camera slowly tilts up from the water to the sky, emphasizing scale. Cinematic, hopeful. 16:9, highest quality.

**Clip 4 - The Vision:**
> Time-lapse style transformation (simulate with Flow): wide shot of a single green irrigation circle, camera pulls back to reveal multiple circles appearing one by one, creating a pattern across the valley landscape. Documentary epic style. 16:9, highest quality.

**Production Note:** Stitch clips together with title cards and data overlays added in post-production. Flow handles individual clips well; assemble in CapCut or similar editor.

---

## Video 3: Potential Investors

**Format:** 2-3 clips focused on scale and opportunity

**Clip 1 - Market Opportunity:**
> Wide shot of an expansive American agricultural landscape at sunrise, hundreds of irrigation circles visible stretching to the horizon. Camera slowly rises, revealing the massive scale of irrigated farmland. Epic, cinematic, golden light. 16:9, highest quality.

**Clip 2 - The Solution:**
> Split the frame in post (shoot single field, mirror/flip): Left side shows a farmer looking at a tablet, right side shows their field with visible moisture variation (use color grading to differentiate wet/dry zones). Flow generates the farmer and field; add split effect in post. 16:9, highest quality.

**Clip 3 - Growth Trajectory:**
> Single shot of one green irrigation circle, camera pulls back slowly and upward, revealing more circles fading in (plan for post-production layering). The shot emphasizes expansion and scale. Clean, modern, tech-forward aesthetic. 16:9, highest quality.

**Production Note:** Text overlays for market size, revenue tiers, and growth timeline must be added in post-production. Flow excels at atmospheric shots but not data visualization.

---

## Video 4: Farmers

**Format:** 2 clips focused on relatability and benefits

**Clip 1 - The Challenge:**
> Close-up of weathered hands holding dry, cracked soil. Camera slowly pulls back to reveal a tired farmer at dawn, looking across a stressed field. Authentic, documentary realism, warm morning light. 16:9, highest quality.

**Clip 2 - The Solution:**
> Same farmer (maintain consistency via "Ingredients" feature) now holding a smartphone showing a colorful field map. Camera pulls back to show healthy green crops in background, farmer smiling slightly. Warm, hopeful, authentic. 16:9, highest quality.

**Alternative Clip - Pivot in Action:**
> Low-angle shot of a center pivot irrigation system in motion, water spraying in golden hour light. Camera pans slowly, capturing the precision and scale. Cinematic, satisfying, showing technology that works. 16:9, highest quality.

**Production Note:** Use Flow's "Ingredients to Video" feature to maintain character consistency between clips. Voice-over and text overlays added in post.

---

## Video 5: Researchers

**Format:** 2-3 clips focused on precision and methodology

**Clip 1 - The Data Collection:**
> Close-up of a soil moisture probe being gently inserted into the ground, numbers on a small LED display briefly visible. Camera pulls back to reveal a grid of sensors across a research field, with a university research building in the background. Clean, scientific, precise lighting. 16:9, highest quality.

**Clip 2 - The Processing:**
> Abstract visualization: Start with scattered points of light on a dark background, slowly connecting to form a grid pattern. Camera orbits around the emerging structure. Technical, precise, visualization style. 16:9, highest quality.

**Clip 3 - The Field Validation:**
> Wide shot of a research field with clear plot divisions, researchers walking between rows with tablets and measurement tools. Camera slowly descends from above. Documentary academic style, overcast even lighting. 16:9, highest quality.

**Production Note:** Methodology diagrams and technical annotations must be added in post. Flow handles the atmospheric field shots well.

---

## Video 6: Regulators

**Format:** 2 clips focused on compliance and auditability

**Clip 1 - The Scope:**
> Aerial shot descending over the San Luis Valley, revealing the patchwork of irrigation circles stretching across 117,000 acres. Camera continues to descend, emphasizing the massive scale of monitoring required. Documentary style, serious, institutional tone. 16:9, highest quality.

**Clip 2 - The Accountability:**
> Close-up of a digital display showing a simple timestamp and verification checkmark, slowly pulling back to reveal a tablet held by a professional in a government building setting. Clean, authoritative, blue tones suggesting trust and security. 16:9, highest quality.

**Alternative - Water Ledger Concept:**
> Abstract visualization: A chain of glowing blocks forming in sequence, each block containing faint data symbols. Camera slowly orbits the forming chain. Technical, secure, blockchain-inspired but not explicitly cryptocurrency. Dark blue and white color scheme. 16:9, highest quality.

**Production Note:** Text overlays for "Cryptographic Chain of Custody" and "Water Court Admissible" added in post.

---

## Video 7: Consolidated Overview

**Format:** 4-5 clips to stitch into a 30-40 second overview

**Clip 1 - The Problem:**
> Aerial shot of stressed farmland, dry irrigation circles visible from above. Harsh afternoon light, dusty atmosphere. Camera slowly pans across the landscape. Documentary serious tone. 16:9, highest quality.

**Clip 2 - The Technology:**
> Ground-level shot of soil sensors with blue indicator lights, camera slowly rising to reveal a pivot irrigation system in the background at golden hour. Technology meeting agriculture, hopeful. 16:9, highest quality.

**Clip 3 - The Farmer:**
> Medium shot of a farmer in work clothes, looking at a tablet with a subtle smile, healthy green field behind them. Authentic, warm, relatable. 16:9, highest quality.

**Clip 4 - The Scale:**
> Wide aerial shot pulling back from one green irrigation circle to reveal dozens, then hundreds, across a valley landscape. Epic, cinematic, golden hour. 16:9, highest quality.

**Clip 5 - The Vision:**
> Sunrise over farmland, camera slowly rising to reveal a vast, healthy agricultural landscape stretching to distant mountains. Hopeful, epic, visionary. 16:9, highest quality.

**Production Note:** This is a montage approach - generate each clip independently, then stitch with transitions and voice-over in post-production. Flow handles individual clips beautifully; assembly is a post-production task.

---

## Flow-Specific Production Guidelines

### What Flow Does Well

* ✅ Cinematic single-shot landscapes

* ✅ Aerial perspectives (simulate with camera movement)
* ✅ Environmental transformations (dry → wet, bare → green)
* ✅ Character consistency via "Ingredients" feature
* ✅ Atmospheric lighting and mood
* ✅ Abstract visualizations (grids, particles, connections)
* ✅ Camera movements (pan, tilt, push-in, pull-back)

### What Flow Struggles With

* ❌ Complex data visualizations (charts, graphs, numbers)

* ❌ Text overlays (add in post-production)
* ❌ Voice-over (Flow audio is ambient only)
* ❌ Multiple interacting characters
* ❌ UI/dashboard demonstrations
* ❌ Precise technical diagrams
* ❌ Long-form content (>8 seconds)

### Recommended Workflow

1. **Generate clips in Flow** using prompts above
2. **Export at 1080p** (highest quality available)
3. **Assemble in post-production tool** (CapCut, DaVinci Resolve, Premiere)
4. **Add text overlays** for key messages
5. **Add voice-over** recorded separately
6. **Add data visualizations** using motion graphics tools
7. **Color grade** for consistent look across clips

### Character Consistency (for Farmer video)

Use Flow's "Ingredients to Video" feature:

1. Generate an image of your farmer character first
2. Upload as an "Ingredient"
3. Reference the ingredient in subsequent prompts
4. Flow will maintain consistent appearance across clips

### Aspect Ratio

* All prompts set to 16:9 (standard widescreen)

* For social media variations, regenerate at 9:16 or 1:1

### Quality Settings

* Use "Highest Quality" for hero shots

* Use "Quality" for background/b-roll clips
* Use "Fast" only for rapid iteration/testing

---

## Post-Production Asset List

For each video, plan to add:

**Video 1 (General Public):**

* Text: "30% less water. 22% more yield."
* Music: Hopeful, building

**Video 2 (Grant Writers):**

* Title cards: "The Challenge", "The Solution", "The Vision"
* Data overlays: "700,000 acre-feet deficit", "117,000 acres"
* Voice-over: Technical narration

**Video 3 (Investors):**

* Text: Market size, revenue tiers, growth timeline
* Charts: Generate separately in motion graphics tool
* Music: Confident, forward-looking

**Video 4 (Farmers):**

* Voice-over: Relatable farmer narrative
* Text: "28% less water. 15% higher yield."
* Music: Acoustic, grounded

**Video 5 (Researchers):**

* Diagrams: Interpolation methodology
* Text: Technical annotations
* Music: Minimal, serious

**Video 6 (Regulators):**

* Text: "Cryptographic Chain of Custody", "Water Court Admissible"
* Voice-over: Institutional authority
* Music: Minimal, respectful

**Video 7 (Overview):**

* Full voice-over script
* Text: Vision statement at end
* Music: Orchestral, inspiring

---

## Alternative: When Flow Isn't Enough

For clips requiring complex data visualization or UI demonstration, consider:

1. **Screen recording** of actual FarmSense dashboard (for regulatory/investor videos)
2. **Motion graphics tools** (After Effects, Motion, DaVinci Fusion) for charts and diagrams
3. **Hybrid approach**: Flow for atmospheric shots, motion graphics for data

---

*Revised for Google Flow capabilities*
*Date: 2026-02-24*

<div style="page-break-after: always;"></div>

# Corner-Swing Auditor (CSA) Firmware Specification

## Overview

The Corner-Swing Auditor (CSA) is not a standalone node type, but rather a specialized firmware variance operating across a dual-node PMT configuration to resolve the complex, non-linear kinematics of a pivot swing-arm.

## 1. Dual-Node Initialization

A standard circular center-pivot requires only one PMT. To audit a "Corner-Swing" system, two identical hardware PMTs are deployed. The firmware logic links them into a Master/Slave configuration.

* **Primary Span Tracker (Master):** The PMT hardware mounted at the very end of the main structural pivot line (e.g., Tower 7).
* **Swing-Arm Tracker (Slave):** The PMT hardware mounted at the very tip of the folding swing-arm extension.

## 2. Geometric Kinematics Loop

The core firmware challenge for the CSA is resolving the physical folding geometry of the swing-arm in real-time, independent of the main pivot rotation.

* **Dual-GNSS Triangulation:** The Primary Tracker logs the constant outer-circumference rotation of the main pivot. Concurrently, the Swing-Arm Tracker logs the erratic, folding path of the corner arm as it extends into the square corners of the field.
* **Corner Overlap Calculation (The "Wiper Effect"):** The Primary Tracker's FPU continuously calculates the angular difference between the two u-blox ZED-F9P RTK GNSS coordinates. It uses this delta to determine the exact degree of extension (the swing angle).
* **Variable Extraction Resolution:** Because the swing-arm extends outward, covering radically more square-footage while traveling faster than the inner spans, the firmware must dynamically calculate the "Wiper Effect." It instantly determines the variable extraction rate (Gallons per Acre) being applied specifically by the swing-arm versus the main spans.

## 3. Telemetry Integration

* The Swing-Arm Tracker transmits its precise 187-byte GNSS/IMU payload directly to the Primary Span Tracker via a localized 2.4GHz High-Gain link (similar to the PFA uplink).
* The Primary Span Tracker consolidates both kinematic streams, aggregates the VFA/LRZ peer mesh, and executes the 50m Edge-EBK grid exactly like a standard PMT Field Hub.

## 4. VRI Failover Overrides

* If the DHU uplink is lost, the CSA firmware executes the exact same "Fisherman's Attention" Edge-EBK failover.
* However, the VRI speed commands generated by the Primary Tracker are geometrically modified to account for the swing-arm extension, ensuring the outer corners do not receive excessive over-watering while the arm is fully extended.

---
*Return to [Master Software Index](../../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# Lateral Root-Zone Scout (LRZ) Firmware Specification

## Overview

The Lateral Root-Zone Scout (LRZ) is the ultimate **Level 1 Spatial Mapper**. It is the heavily mass-produced, expendable "dumb node" deployed at a 1:15-acre density across the crop canopy. Its sole firmware objective is executing micro-power telemetry chirps.

## 1. Hardware Initialization Routine

* **Processor:** nRF52840 (Ultra-low power ARM Cortex-M4F).
* **Sensors:** Single-depth lateral soil tension and canopy ambient temperature sensors.
* **Power:** Internal prolonged lithium core (Designed for 5-year multi-season survival without solar tracking).
* **Enclosure Rating:** IP68/IP69K (Hermetically sealed polycarbonate).

## 2. The "Dumb Chirp" Execution

The LRZ firmware represents absolute deterministic simplicity. It executes no spatial math, no decision masking, and no mesh coordination.

* **Micro-Payload:** Reads the singular soil tension value and ambient canopy data.
* **Encryption:** Applies AES-128 encryption.
* **FHSS Burst:** Pulses the payload via the integrated 3-foot antenna utilizing 900MHz FHSS. The RF path is a direct vertical connection to the overhead PMT Field Hub umbrella.

## 3. Defense Protocol Adherence

Because the LRZs represent the highest density of RF emitters in the FarmSense physical architecture, their firmware is strictly regulated.

* **LPI/LPD:** The firmware dictates exact pseudo-random frequency hopping sequences to ensure the massive array of LRZs across a District do not create a localized RF "bloom" detectable by adversarial ELINT (Electronic Intelligence), fulfilling Federal Inter-agency and Federal ESG dual-use requirements.

## 4. The "Ripple" Receiver

Like the VFA, the LRZ idles at a 4-hour chirp baseline. The firmware contains a passive listening hook: if the PMT identifies an anomaly near the LRZ's geographic coordinate, the PMT commands the LRZ to "Ripple" (increase chirp frequency to 15m) to delineate the physical boundaries of the propagating statistical event.

---
*Return to [Master Software Index](../../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# Pressure & Flow Anchor (PFA) Firmware Specification

## Overview

The Pressure & Flow Anchor (PFA) operates as the **Sentry of the Source**. Attached directly to the high-voltage 480V/3-Phase center-pivot wellhead, it serves as the critical intersection between agricultural hydrodynamic auditing and predictive mechanical maintenance.

## 1. Hardware Initialization Routine

* **Processor:** NXP i.MX RT (Cortex-M7). Required for localized high-frequency analog-to-digital (ADC) conversion.
* **Sensors:** Badger Meter TFX-5000 ultrasonic transit-time components, 400A Current Transformer (CT) Clamps, high-frequency internal accelerometers.
* **Power:** Stepped down directly from the 480V wellhead power block.

## 2. Dual-Core Operations Loop

The PFA firmware runs two highly specialized logic loops concurrently:

**Loop A: Hydrodynamic Auditing (The Legal Truth)**

* Calculates volumetric flow (Gallons per Minute) utilizing the ultrasonic transit-time differentials across the well pipe.
* Must maintain rigorous calibration offsets (updated via the Regulatory Portal) to ensure the State Engineer mandated +/- 1% accuracy.

**Loop B: Current Harmonic Analysis (Predictive Maintenance)**

* Continuously samples the 400A CT clamps on the pump's 3-phase power line at extremely high frequencies.
* Executes localized Fast Fourier Transforms (FFTs) on the Cortex-M7 to calculate "Current Harmonic Analysis" and "Voltage Ripple" signatures.
* These localized FFT models allow the PFA to mathematically detect cavitation (air pockets in the pump), impending bearing failure, or voltage sag *before* a catastrophic $25,000 pump explosion occurs.

## 3. Telemetry & PMT Bouncing

* The PFA generates a highly condensed payload combining the strict GPM flow audit and the predictive mechanical hazard flags.
* Unlike the field sensors, the PFA transmits this data via **2.4GHz High-Gain links** directly to the elevated PMT Field Hub. This physically circumvents the dense water canopy of a full-grown corn crop, which would otherwise attenuate a standard 900MHz signal emitted from the ground-level well pump.

## 4. Autonomous Fail-Safe Actuation

The PFA has physical actuation authority over the well pump relay. If the Localized FFT loop detects severe cavitation, or if the PMT (acting as the localized Edge-EBK failover engine) commands an emergency halt due to total VRI failure, the PFA firmware executes an immediate, hard electrical kill-switch to protect the infrastructure.

---
*Return to [Master Software Index](../../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# Pivot Motion Tracker (PMT) Firmware Specification

## Overview

The Pivot Motion Tracker (PMT) operates as the **Level 1.5 Field Hub**. It is the deterministic command center of the field, responsible for aggregating all Peer Node telemetry, performing constant 50m geostatistical math, and routing backhaul payloads to the District Hub (DHU).

## 1. Hardware Initialization Routine

* **Processor:** ATSAMD51 (Cortex-M4, 120MHz FPU).
* **Sensors:** Badger Meter Ultrasonic Transit-Time, u-blox ZED-F9P RTK GNSS, Bosch BNO055 9-Axis IMU.
* **Power:** 10W Solar Lid + LiFePO4 Buffer.
* **Hibernation Logic:** The primary Saft LS14500 LiSOCl2 cell maintains ONLY the GNSS Real-Time Clock through the 120-day SLV winter dormancy.

## 2. Continuous Edge-EBK Logic Loop

The PMT continuously executes Empirical Bayesian Kriging (Edge-EBK) to generate a 50m-resolution spatial probability grid (16x16 matrix). This is **not a failover state**, but the baseline operational mode of the PMT.

* **Data Ingestion:** The PMT intercepts the 128-bit AES encrypted payload chirps from the 2 VFAs and 20 LRZs traversing its 900MHz RF Umbrella.
* **FPU Calculation:** The hardware FPU processes this spatial data into the 16x16 matrix, quantifying the exact soil moisture probability curve across the 160-acre quarter section.
* **The "Fisherman's Attention" Scale:** The execution frequency of this calculation is dynamically governed:
  * *Dormant Baseline:* Every 4 Hours (High soil moisture, pivot parked).
  * *Anticipatory:* Every 60 Minutes (Sunrise, rapidly rising temperature).
  * *Ripple:* Every 15 Minutes (Detection of rapid trend shifts; PMT commands peer nodes to increase chirp frequency radially outward from anomaly).
  * *Collapse:* Every 5 Seconds (Critical failure, or pivot actively sweeping). The FPU zeroes calculation on dormant field sections, "Focus Collapsing" computation exclusively on the trajectory of the active pivot span.

## 3. Telemetry & Routing (The "Field Hub")

* **Payload Bundling:** The PMT bundles its own High-Fidelity kinematic data, the processed 50m Edge-EBK arrays, and the intercepted VFA/LRZ intelligence.
* **PFA Aggregation:** Intercepts the 2.4GHz Current Harmonic Analysis payload from the wellhead PFA.
* **LoRaWAN Backhaul:** Blasts the unified, heavily encrypted ~187-byte Field State Payload to the District Hub (DHU) via 900MHz LoRaWAN.

## 4. Zero-Downtime VRI Failover Execution

If the PMT detects a loss of LoRaWAN ping-acknowledgment from the DHU:

* **Autonomous VRI:** Because the PMT is *already* calculating the 50m EBK grid natively, it instantly switches to executing autonomous Variable Rate Irrigation commands (speeding/slowing the pivot or actuating safety valves) based *only* on its localized intelligence, bypassing the offline DHU/Zo engines entirely.
* **Audit Buffering:** Stores all 187-byte payload state changes to onboard SPI Flash, burst-transmitting the backlog upon DHU reconnection to preserve the State Engineer audit ledger.

---
*Return to [Master Software Index](../../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# Vertical Field Anchor (VFA) Firmware Specification

## Overview

The Vertical Field Anchor (VFA) operates as a **Level 1 Advanced Peer Node**. It is the central 48-inch deep-profile ground truth node for a field quadrant, tasked strictly with telemetry generation and secure RF transmission, leaving heavy computation to the PMT.

## 1. Hardware Initialization Routine

* **Processor:** nRF52840 (Ultra-low power ARM Cortex-M4F).
* **Sensors:** GroPoint Profile multivariant soil moisture, temperature, and salinity probe.
* **Power:** Flush 5W Polycarbonate Solar Lid + Hybrid Pulse Capacitor (HPC).
* **Telemetry Range:** 50mm non-contact capacitive telemetry field for physical diagnostics.

## 2. Telemetry Processing & "Dumb Chirp" Transformation

The VFA was deliberately downgraded from an AES-routing hub to a highly efficient Peer Node to maximize battery life under snowpack.

* **Data Aggregation:** The firmware reads 4 specific depths along the 48-inch profile (8", 16", 24", 36") to determine total matric potential and deep percolation loss.
* **Encryption at the Edge:** The processor applies AES-128 bit encryption independently to its localized payload before it ever leaves the component.
* **Transmission:** Actuates the flush 3-foot low-profile antenna to chirp the encrypted payload via 900MHz Frequency-Hopping Spread Spectrum (FHSS) directly to the overhead Pivot Motion Tracker (PMT) acting as the Field Hub.

## 3. Dynamic "Ripple" Responsiveness

While fundamentally a "dumb chirp" node, the VFA firmware is governed by the PMT's adaptive scaling logic.

* **Baseline Chirp:** Every 4 hours.
* **Triggered Ripple:** When the PMT detects a rapid statistical shift and initiates a "Focus Ripple," it pings the VFA. The VFA firmware must immediately scale its chirp frequency to every 15 minutes to provide the PMT Kriging engine with real-time ground truth data regarding the spatial expansion of the anomaly.
* **LPI/LPD Constraints:** The firmware ensures that even at elevated 15-minute chirp rates, the FHSS frequency hopping conforms to Federal Low Probability of Intercept/Detection standards.

---
*Return to [Master Software Index](../../SOFTWARE_INDEX.md)*

<div style="page-break-after: always;"></div>

# FarmSense Actionable Task List

## Active Hardware & Architecture Integration

* [x] [x] Rectify District Hub (DHU) BOM to include 900MHz LoRaWAN gateway.
* [x] [x] Rectify Pivot Motion Tracker (PMT) BOM to include 2.4GHz/BLE module for PFA communication.
* [x] [x] Validate Thermal Loss capacity for 5W Kapton heater inside the PFA/DHU (-30°F extreme weather events).
* [x] [x] Integrate Hybrid Pulse Capacitor (HPC) with the PMT's LiSOCl2 battery to bypass spring passivation.
* [x] [x] Treat Polycarbonate enclosures with fluoropolymer coatings (PVDF) or UV inhibitors to prevent radiation embrittlement at 8,000ft altitude.

## Software-Driven Expansions

* [x] [x] Implement Predictive Maintenance via Current Harmonic Analysis on the Pressure & Flow Anchor (PFA).
* [x] [x] Integrate k-means Machine-Learning Kriging algorithms into the Zo Core Compute Engine.
* [ ] [ ] Implement PBFT Alliance-Chain Blockchain inside the DHU "Black Box" SSD for water rights trading.
* [ ] [ ] Build Federal Federated Data Fabric Adapters.
* [ ] [ ] Implement Dual-Layer Spatial Privacy (Contextual Anonymization) for cloud/federated machine learning.
* [ ] [ ] Develop automated GLOBALG.A.P. compliance report generator.

## Advanced Dual-Use Enhancements (R&D)

* [ ] [ ] Verify Low Probability of Intercept/Detection (LPI/LPD) logic on LRZ FHSS chirps.
* [ ] [ ] Concept design for Rapid Deployment Housing LRZ housings.
* [ ] [ ] Upgrade Regional Superstation (RSS) compute layer to support Fully Homomorphic Encryption (FHE) Kriging operations.

## Non-Dilutive Grant Strategy & Execution

* [ ] [ ] Draft Federal Federal ESG "Water Resilience on Federal Installations" pre-proposal (Deadline: March 26, 2026).
* [ ] [ ] Structure empirical pilot evidence framework for Bill & Melinda Gates Foundation COP30 smallholder adaptation pledges.
* [ ] [ ] Prepare nominations/proposals incorporating empirical hydro-economic data for the World Food Prize and Earthshot Prize.

<div style="page-break-after: always;"></div>

# Bxthre3 Inc. Website

This directory contains the source code for the Bxthre3 Inc. website hosted on Zo Space at <https://brodiblanco.zo.space>.

## Structure

```
site/
├── pages/
│   ├── index.tsx          # Home page
│   ├── farmsense.tsx      # FarmSense project page
│   ├── cofounder.tsx      # CoFounder project page
│   ├── cane.tsx           # CANE project page
│   ├── android-native-ide.tsx  # Android IDE project page
│   ├── wellserved.tsx     # WellServed project page
│   ├── adm-standard.tsx   # ADM Standard project page
│   └── crayfish.tsx       # Crayfish project page
└── api/
    └── deploy.ts          # GitHub webhook for auto-deploy

## Project Statuses

- **Building Hardware Prototypes** - Active hardware development
- **Active Development** - Software in active development
- **Pilot** - Testing with early users
- **Research Phase** - Early research and exploration
- **Validated** - Concept validated, ready for development
- **Fund Raising** - Seeking investment
- **Ideated** - Concept only, not yet in development

## Tech Stack

- React + TypeScript
- Tailwind CSS 4
- Lucide React icons
- Hosted on Zo Space

## Updates

These files are source-of-truth copies of the live Zo Space routes. 
To update the live site, use the Zo Space tools or edit directly in the Zo dashboard.


<div style="page-break-after: always;"></div>


