# Investor Dashboard — Frontend Specification V2.0

**Portal:** `investor-dashboard` | **User Type:** Regional Investor / Fund Manager  
**Framework:** React + Vite + TypeScript | **Port:** 3001

---

## 1. High-Level Concept: The Sovereign Asset Monitor

The Investor Dashboard provides a "God View" of regional equity preservation. It focuses on the macroeconomic stability of the basin and the Return on Investment of the "Survival" model.

## 2. Key Metrics & Financial KPIs (The "Nut-and-Bolt" Data)

### 2.1 EUM (Equity-Under-Management)

- **Definition:** The total real estate asset value (land + water rights) protected by FarmSense installations.
- **Calculation:** `Protected_Acres * Market_Value_Per_Acre`.
- **UI Element:** Large digital ticker with real-time scaling as new pivots are brought online.

### 2.2 Sovereign Retention Score

- **Definition:** The percentage of water extraction that remains within the compact's "Sustainable Carry Capacity" (SCC).
- **Visualization:** A 3D "Aquifer Health" gauge showing current withdrawal rates vs. historical depletion curves.

### 2.3 Individual Field ROI (Asset Protection)

- **Logic:** $26,000 pumping savings + $944,000 saved equity per 160-acre circle.
- **Table View:** List of all funded pivots with "Days to Break-Even" and "Total Saved Equity to Date."

## 3. Advanced Analytical Components

### 3.1 Regional Impact Heatmap

- **Layering:** 1m Kriging grid aggregates at the district level.
- **Filter:** Toggle between "Water Saved," "Soil Health Improvement," and "Regulatory Risk."
- **Interaction:** Zooming into a circle triggers the "Resolution Pop," transitioning from district aggregates to individual 1m field tiles.

### 3.2 Basin Depletion Forecasting

- **Engine:** Integrates RDC-level Kriging with 9-day ensemble forecasts.
- **Chart:** Predictive spline showing projected basin-wide AF extraction for the next 30 days vs. Compact limits.
- **Alerts:** Triggers if projected extraction exceeds 1938 Rio Grande Compact daily allocations.

## 4. Technical Architecture (Frontend)

### 4.1 Data Lake Partitioning

- **Source:** Pulls from `RDC_MASTER_VAULT`.
- **Privacy:** All data is k-anonymized at the API layer (Tier 3 Privacy). Individual farm names are replaced by hex IDs (e.g., `FS-8821`).

### 4.2 API Mapping

| Component | Endpoint | Data Frequency |
| :--- | :--- | :--- |
| **EUM Ticker** | `GET /v2/investor/eum` | 60-minute polling |
| **Aquifer Gauge**| `GET /v2/basin/health` | Daily |
| **ROI Table** | `GET /v2/investor/roi-matrix` | Real-time (on load) |

## 5. Bill of Materials (UI Components)

- **Map Engine:** MapLibre GL JS with custom vector tiles for 1m grids.
- **Charts:** D3.js for predictive spline forecasting.
- **State:** TanStack Query (React Query) for aggressive caching of large regional datasets.

---
*Status: Approved for Unified Engineering Realignment*
