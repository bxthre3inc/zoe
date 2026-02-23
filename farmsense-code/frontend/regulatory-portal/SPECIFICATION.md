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
