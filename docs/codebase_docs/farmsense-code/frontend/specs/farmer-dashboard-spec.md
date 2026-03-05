# Farmer Dashboard — Frontend Specification V1.75

**Portal:** `farmer-dashboard` | **User Type:** Field Operator / Farm Owner  
**Framework:** React + Vite + TypeScript | **Port:** 3000

---

## V1 Feature Inventory (Existing)

| View / Component | Description |
|---|---|
| **Operations Command** | Hero dashboard with 5 KPI cards (**Equity Protection Status**, water savings, temperature, flow, PMT kinematics) |
| **AgriMap Explorer** | Interactive map with Sentinel-2 overlay and 1m Kriging grid visualization |
| **SILAS Mode (Simple)** | Large-button simplified UX featuring the **MAD Battery** metaphor |
| **AR Field Vision** | Augmented reality field overlay component |
| **Live Telemetry** | Real-time aggregated sensor stream panel |
| **Forecast Widget** | Predictive AI weather and irrigation forecast |
| **Weather HUD** | Floating atmospheric conditions overlay |
| **Hardware Diagnostics** | Node health ($1,090 PMT, $603 PFA, $319 VFA, $50 LRZ) |
| **Privacy & Data Settings** | Data-sharing toggles (auditors, investors, research pool) |
| **Voice Decision Engine** | Mic-activated field decision assistant with rule provenance |

---

## V1.75 Additions — New Primary Views

### 1. Irrigation Command Center

A full Variable Rate Irrigation (VRI) control interface driven by the 1m Kriging output.

**Key elements:**

- **Zone Actuator Grid** — The field is divided into Zones derived from the 1m Kriging output. Each Zone card displays: current Soil Matric Potential (SMP), Volumetric Water Content (SWC), recommended dwell time (minutes), and actuate/hold status toggle.
- **Decision Countdown Timer** — Live countdown to the next scheduled adaptive recalculation cycle. Mode indicator (STABLE / ACTIVE / CRITICAL / OUT_OF_TURN) with color-coded urgency.
- **Rule Provenance Trace** — "Show Me The Math" drawer for any Zone: expands to show full deterministic decision chain — every sensor input, threshold comparison, and the specific rule string that produced the actuate/hold decision. All labelled with CSU SLV RC Thresholds v2026.1 source reference.
- **Manual Override Console** — Override individual Zone decisions with two-tap confirmation and a mandatory reason log (for audit trail). Override events emit a signed entry to the DHU cryptographic ledger.
- **Irrigation History Timeline** — 30-day rolling chart of Zone-level actuation events overlaid with precipitation and ET data. Highlights events that deviated from the model recommendation.

---

### 2. Well & Pump Operations Suite

Dedicated PFA (Pressure & Flow Anchor) dashboard replacing the sparse pump card in V1.

**Key elements:**

- **Real-Time Waveform Display** — Live torque ripple waveform from the NXP Cortex-M7 CT Clamp analysis (400A, 3-phase). Rendered as a scrolling oscilloscope-style chart at 10Hz refresh.
- **Health Scores Panel** — ML Current Harmonic Analysis outputs four continuous health indices: Bearing Wear (0–100), Cavitation Risk (0–100), Vibration Harmonic Distortion (% THD), and Efficiency Degradation (% vs. baseline). Each index has a warning threshold and a predicted days-to-failure estimate.
- **Flow & Pressure Gauges** — Live GPM and PSI readings from the ultrasonic transit-time flow meter (Badger Meter). Trend sparklines for the last 24 hours.
- **Predictive Maintenance Calendar** — ML-generated maintenance schedule: next recommended inspection date, estimated component lifetimes (impeller, bearings, motor windings), and history of past maintenance events.
- **Emergency Stop / Start** — Large, prominent pump actuator button with two-step confirmation. Stop events are immediately broadcast to the DHU and logged in the cryptographic ledger with timestamp, GPS, and operator identity.

---

### 3. Crop Health Intelligence Panel

Visual crop stress monitoring fusing satellite multispectral data with drone 0.7cm/pixel mosaic resolution.

**Key elements:**

- **Dual-Source NDVI/NDWI Map** — Choropleth 1m grid layer combining Sentinel-2 spectral indices and drone multispectral mosaic data (Resolution Pop). Toggle between: Sentinel-only (20m), Kriging-interpolated (1m), and drone-fused (0.7cm where available).
- **Time-Lapse Comparison Slider** — Side-by-side or blend-slider comparison of the current NDVI map vs. 14 days ago vs. same week last season. Highlights areas of significant decline (ΔNDVI > 0.1).
- **Automated Stress Detection** — Background analysis flags 1m² Zones with canopy decline. Each flagged Zone is presented as a clickable alert: shows the Zone coordinates, NDVI drop magnitude, linked VFA/LRZ sensor node readings for that Zone, and a root-cause hypothesis (moisture stress, salinity, pest pressure, nutrient deficiency).
- **Canopy Cover Trend Chart** — Field-level weekly NDVI trend over the growing season, overlaid with irrigation events and rainfall. Useful for demonstrating yield preservation impact to auditors or grant officers.

---

### 4. Water Ledger & Rights Manager

Full blockchain-backed water accounting and PBFT peer-to-peer groundwater rights trading interface.

**Key elements:**

- **Season Water Budget Gauge** — Visual "water budget" showing: seasonal cap (acre-inches allocated by subdistrict), consumed to date (from PFA flow meter, cryptographically verified), remaining budget, and projected end-of-season consumption based on current trajectory.
- **Extraction Ledger** — Paginated, timestamped log of every extraction event. Each entry shows: date/time, GPM, acre-inches, verifying sensor node ID, and cryptographic hash signed by the DHU hardware key. Filterable by date range. Exportable as a court-ready PDF.
- **PBFT Water Rights Marketplace** — Browse active buy/sell offers within the local alliance district. Each listing shows: seller farm ID (anonymized alias), volume offered (acre-inches), price ($/acre-inch), and cryptographic trade proof. One-click "Accept Offer" executes the PBFT consensus transaction and updates both parties' water budgets instantly.
- **Trade History** — Complete record of executed trades with PBFT consensus hash, counterparty ID, volume, price, and settlement timestamp. Immutable and admissible in Water Court.
- **Water Credit Dashboard** — Tracks SLV water credits earned this season (acre-inches conserved vs. historical baseline × credit rate). Shows pending vs. issued credits and estimated monetary value.

---

### 5. Aerial Fleet Operations

Full drone mission planning, dispatching, and post-flight analysis center.

**Key elements:**

- **Mission Planner** — Draw flight corridors directly on the field map. Define: target Zones (drawn polygons), spectral payload (RGB, NIR, NDRE, thermal), flight altitude, and overlap percentage. System auto-calculates estimated flight time, battery requirements, and generated mosaic resolution.
- **Live Drone Telemetry Feed** — During active missions: altitude, airspeed, battery %, GPS position tracked on map, ETA to completion, and real-time streaming thumbnail of nadir camera.
- **Mission History Archive** — Completed missions listed with date, coverage area, and primary finding summary. View the full generated mosaic and Resolution Pop 1m grid output for each mission.
- **Automated Dispatch Triggers** — Configurable rules that recommend drone dispatch: e.g., "NDVI drops >0.15 in any Zone → suggest coverage scan." User confirms or dismisses the recommendation.
- **Pre/Post-Treatment Comparison** — For any irrigation or treatment event, overlay the NDVI mosaic from just before and just after. Quantify the improvement in canopy health directly attributable to the action.

---

### 6. Economic Intelligence Dashboard

Full season-to-date financial performance derived directly from field telemetry.

**Key elements:**

- **Season P&L Breakdown** — Itemized financial summary: water pumping cost (GPM × hours × energy rate), yield preservation value (ΔNDVI × commodity price model), labor efficiency gain (automation hours saved), regulatory fee avoidance (water credits × fee rate), and net economic benefit. All sourced and traceable to specific telemetry readings.
- **MAD Battery Visualization** — The soil profile presented as a "battery" metaphor: current % of the Management Allowable Depletion window remaining until irrigation becomes mandatory. Rendered as a large, intuitive gauge. Replaces all abstract moisture percentage displays for non-technical users.
- **Cost-Benefit Analysis Live Feed** — Real-time CBA updating every recalculation cycle. Shows the marginal cost of pumping (energy + fees + equipment wear) vs. the marginal revenue of yield preservation at the current crop stage. A clear `PUMP` or `HOLD` boolean with supporting numbers beneath it.
- **Benchmark Comparisons** — How does this field's water efficiency compare to: (a) the user's own historical baseline, (b) the anonymized regional average (from the federated pool), and (c) the best-performing similar farm in the anonymized dataset?
- **Grant Subsidy Tracker** — If the account is grant-subsidized, shows the original grant amount, amount consumed by hardware/subscription costs, remaining balance and expiry date.

---

### 7. Corner-Swing Auditor (CSA) Monitor

Dedicated view for fields equipped with Corner-Swing Auditor hardware variants.

**Key elements:**

- **Live Arc Geometry Visualizer** — The field boundary overlaid with the pivot circle and corner-swing arm geometry. Real-time position dot for both the Primary Span Tracker and the Swing-Arm Tracker nodes. Deviation from the programmed arc path shown in real-time (meters off-path).
- **Arc Completion Progress** — Per-pass progress ring showing current arc completion percentage and estimated completion time. Historical pass log with start time, end time, and completion accuracy %.
- **Water Application Heatmap** — 1m-resolution heatmap of water application rate across the corner swing Zone for the most recent pass, derived from flow meter data and arc geometry. Identifies over- or under-application Zones at the edge of the swing radius.
- **Mechanical Health Alerts** — Monitors for irregular swing-arm deceleration patterns that may indicate drive motor issues. Flags anomalies for the pump operations suite maintenance calendar.

---

### 8. SILAS Mode V1.75 (Complete Redesign)

A full visual and UX redesign of the simplified mode for non-technical farm operators.

**Key elements:**

- **Color-First Interface** — All metrics expressed as traffic-light colors with plain-English labels. No raw numbers shown (moisture percentages, GPM, SMP values all hidden). Green = Good, Yellow = Watch, Red = Act.
- **"Today's Farm Report" Auto-Brief** — Generated each morning at 6:00 AM local. A plain-text 3-sentence summary: field water status, today's weather risk, and one recommended action. Deliverable by push notification or SMS.
- **Full-Screen Action Cards** — Three categories only: `WATER STATUS`, `PUMP CONTROL`, `FIELD MAP`. Each card occupies the full viewport with massive text and one primary action button.
- **Voice Assistant Command Library** — Pre-built command library with 20+ natural-language queries ("Is it going to rain?", "How much have I saved?", "When should I turn the pump on?", "What does Zone 4 look like?"). Responses delivered as plain-English sentences, not data tables.
- **Print-to-Paper Field Card** — One-click export of a single A4 page with today's soil status, pump schedule, and field alert summary. Designed for operators who manage fields without a phone signal.

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

- **Dual-Mode Architecture:** SILAS Mode V1.75 and Advanced Mode share the same backend data; the presentation layer is entirely separate. Switching modes is a single toggle in the sidebar.
- **Offline Resilience:** All views degrade gracefully to local edge cache data when the DHU uplink is unavailable. A prominent banner indicates "Offline Mode — Edge Cache Active."
- **Audit Trail:** Every actuator command (pump start/stop, Zone override) writes a signed, immutable entry to the DHU ledger before the UI confirms the action.
