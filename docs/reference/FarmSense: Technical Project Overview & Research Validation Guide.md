2/22/26, 6:05 AM Google Gemini

# FarmSense: Technical Project Overview & Research Validation Guide


This document provides an exhaustive technical summary of the FarmSense project, specifically


curated for scientific validation, gap analysis, and multi-dimensional risk assessment by


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


https://gemini.google.com/app/9fe738dfc0a70bee 1/5


2/22/26, 6:05 AM Google Gemini


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


https://gemini.google.com/app/9fe738dfc0a70bee 2/5


2/22/26, 6:05 AM Google Gemini


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


https://gemini.google.com/app/9fe738dfc0a70bee 3/5


2/22/26, 6:05 AM Google Gemini


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


2. Model Generation: The Core Compute Server runs the Bayesian/Kriging models,


comparing current sub-surface telemetry against the existing Soil Variability Maps.


3. Refinement: Following an irrigation event or significant rainfall, the system observes the


"wetting front" movement. If the reality (sensor data) differs from the model (prediction),


the Virtual Sensor Grid is automatically updated to reflect the new soil behavior (e.g.,


faster-than-expected drainage).


4. OTA Update: An optimized, machine-readable "Worksheet" is sent via Over-The-Air (OTA)


update to the District Hub.


5. Local Execution: The Hub uses the Worksheet to calculate the exact gallonage needed for


each LRZ. This local calculation ensures the farmer has an auditable, real-time record of


water usage that is accurate to the gallon.

## 5. Funding & Sustainability


Primary Funding Partner: The project is currently supported by the LOR Foundation, an


organization dedicated to enhancing the quality of life and economic resilience in rural


mountain communities. Their focus is specifically on the intersection of water conservation


and agricultural viability.


Immediate Capital Need: The project is currently seeking funding specifically for the


construction, assembly, and deployment of the sensor hardware for the 2-field CSU pilot.


This hardware procurement is the critical bottleneck preventing the transition from a digital


framework to a physical, ground-truth validation system.


https://gemini.google.com/app/9fe738dfc0a70bee 4/5


2/22/26, 6:05 AM Google Gemini


Commercial Model: Data-as-a-Service (DaaS):


Free (50m): Community-level insights for general trend monitoring.


Basic (20m): Standard precision for small-to-medium operations.


Pro (10m): High-resolution analytics for commercial growers looking to maximize yield


and minimize input costs.


Enterprise (1m): Research-grade resolution, full SFD integration, and direct API access


for integration into existing farm management software.

## 6. Gap & Risk Analysis for Researchers


Implementation Risk: Hardware Fabrication: The most immediate risk is the delay in


hardware deployment. While the software architecture and "Core Compute" models are


ready for ingestion, the lack of physical sensors prevents the generation of the first real

world "Worksheets."


Scientific Gap: Soil Tension vs. Volumetric Content: There is a significant research gap


in correlating soil moisture tension (what the plant feels) with volumetric water content


(what the sensor reads) across the highly variable PFA profiles of the SLV. This requires


continuous CSA (Core Sample) validation to reduce the "uncertainty envelope" of the


predictive models.


Technical Risk: Extreme Environmental Stress: The SLV is characterized by extreme


temperature swings (-40°C to +35°C) and high soil alkalinity. The long-term reliability of


LiSOCl2 batteries and sensor casings under these conditions is a primary hardware risk


that requires the 2-field pilot for validation.


Scaling Risk: Computational Overhead: Maintaining a 1-meter resolution (Enterprise


level) across the entirety of Subdistrict 1 (166,000 acres) will require a massive increase in


parallel processing within the Core Compute Server. Researchers must evaluate the trade

https://gemini.google.com/app/9fe738dfc0a70bee 5/5


