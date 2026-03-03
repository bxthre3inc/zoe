# Regulatory Portal — Frontend Specification V2.0

**Portal:** `regulatory-portal` | **User Type:** Water Court Auditor / RGWCD Enforcement  
**Framework:** React + Vite + TypeScript | **Port:** 3002

---

## 1. Mission: The Digital Water Court

The Regulatory Portal is the forensic interface for the 1938 Rio Grande Compact. It provides unmodifiable, self-authenticating evidence of groundwater extraction and compact compliance.

## 2. Core Forensic Views

### 2.1 The Cumulative Extraction Ledger

- **Focus:** Total AF (Acre-Feet) pumped per well/permit.
- **Data Source:** PFA (Pressure & Flow Anchor) ultrasonic audit logs.
- **Verification:** Every entry displays a "Green Shield" icon indicating the PBFT alliance-chain consensus hash matches the local RDC hash.
- **Audit Tool:** One-click PDF export of "Certified Extraction Statement" for legal proceedings.

### 2.2 Tamper & Anomaly HUD

- **Logic:** Compares PFA electrical harmonics (CHA) with ultrasonic flow. If flow is detected but CHA shows 0.0A (or vice-versa), an **Anomaly Ticket** is generated.
- **Alert Matrix:**
  - **Level 1 (Blue):** Firmware update pending / low battery.
  - **Level 2 (Yellow):** Slight sensor drift detected via Kriging residual.
  - **Level 3 (Red):** Potential "Ghost Pumping" (Flow bypass) or physical sensor tampering.

### 2.3 Basin Compact Meters

- **Metric:** Live "Compact Balance."
- **Visualization:** A horizontal progress bar showing the 170,000 AF recovery target.
- **Breakdown:** Partitioned by Subdistrict, highlighting which zones are leading or lagging in conservation.

## 3. Technical Implementation

### 3.1 Cryptographic Integrity Flow

1. **Source:** DHU signs payload with hardware-backed Private Key.
2. **Transfer:** RDC verifies signature via Public Key stored in `AuditNode`.
3. **UI Display:** React Frontend uses `tweetnacl` or WebCrypto API to verify the hash before rendering the "Verified" status.

### 3.2 Role-Based Access Matrix

| Feature | READ | WRITE | NOTES |
| :--- | :--- | :--- | :--- |
| **Raw Flow Data** | AUDITOR | - | Legal preservation. |
| **Tamper Status** | ADMIN | - | Fleet health. |
| **Report Sign-off** | REGULATOR | AUDITOR | Final certification. |

## 4. API Endpoints (Forensic Tier)

- `GET /v2/regulatory/ledger/{well_id}`: Full audit history (1s granularity).
- `GET /v2/regulatory/anomalies`: Active tamper alerts.
- `POST /v2/regulatory/certify`: Generates cryptographically signed PDF statement.

---
*Status: Approved for Unified Engineering Realignment*
