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
