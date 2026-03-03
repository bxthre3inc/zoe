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

- **Live Counter Grid** — Six auto-refreshing counters, large and centered: Active Hardware Nodes, Acres Under Live Monitoring, Sensor Readings Ingested (today), Compliance Reports Filed (this year), Water Saved m³ (this season), and System Uptime %.
- **Real-Time Ingestion Feed** — Scrolling live feed of sensor batch ingestion events: timestamp, field ID (anonymized), reading count, and processing time. Updates every 15 seconds with actual data throughput numbers.
- **Network Status Map** — Miniaturized version of the mesh topology showing live node activity across all deployed subdistricts. Color-coded by region.
- **Incident & Anomaly Feed** — Live stream of anomaly detection events as they fire across the basin. Each event shows: type, confidence score, regulatory escalation status. Demonstrates the forensic intelligence operating in real time.
- **Platform Milestones Ticker** — Each time a new record is broken (new acres enrolled, highest single-day ingestion, etc.), a celebratory milestone banner fires.

---

### 2. Spatial Analytics View: Detailed breakdown of the Resolution Pop engagement metrics with full spatial analytics

**Key elements:**

- **Conversion Funnel Visualization** — End-to-end funnel from Free (Silas Tier) → Basic → Pro → Enterprise. Shows absolute counts, conversion rates between each step, and average time-to-convert. Overlays the grant-subsidy effect: what percentage of free users convert to paid after their subsidy expires.
- **ARPU & MRR Waterfall** — Monthly chart of MRR broken out by tier. Net MRR movement month-over-month (new MRR, expansion MRR, contraction MRR, churned MRR). ARPU trend per tier.
- **Cohort Retention Analysis** — Cohort retention table showing how each monthly sign-up cohort retains across months 1–12. Identifies which cohorts have the highest retention (likely grant-program cohorts) vs. organic.
- **CAC vs. LTV by Channel** — Customer acquisition cost vs. lifetime value broken out by acquisition channel: grant program, direct outreach, regulatory referral, academic partnership. LTV:CAC ratio highlighted per channel.
- **Grant-Subsidy Revenue Bridge** — Shows the transition from subsidy-dependent revenue to self-sustaining ARR as grant programs mature. Projects the inflection point where platform revenue exceeds subsidy dependency.

---

### 3. Carbon & Water Asset Exchange

Full portfolio view of the FSN-CARBON and FSN-WATER derivative instruments generated and verified by the platform.

**Key elements:**

- **Live Asset Prices** — Real-time price charts for FSN-CARBON (Carbon Farming Standard credits, $/tonne) and FSN-WATER (verified acre-inch conservation credits, $/acre-inch). 1-day, 7-day, and 30-day price histories.
- **Credit Generation Model** — Visual explanation of how credits are generated: verified water conservation (acre-inches saved vs. historical baseline) → PBFT-confirmed and officer-validated → issued as tradeable FSN-WATER credit. Same pipeline for carbon via soil carbon sequestration proxy estimates from the NDVI trend.
- **Platform Credit Portfolio** — Total credits generated to date across all enrolled farms. Annual credit issuance trajectory. Current market value of all outstanding credits at spot price.
- **Projected Annual Yield** — Based on current enrolled acreage, average conservation rate, and credit price trend: projected credit revenue for next 12 months. Sensitivity range (low/mid/high price scenario).
- **Secondary Market Activity** — Trade volume, unique buyer/seller count, and liquidity metrics for the credit exchange. Supports the narrative of a functioning, liquid market for platform-generated assets.

---

### 4. Sovereign Expansion War Room

Interactive stage-gated expansion roadmap visualization from regional pilot to global water infrastructure.

**Key elements:**

- **Stage Map** — Four concentric rings or a linear stage diagram: Stage 1 (San Luis Valley Pilot) → Stage 2 (Colorado Statewide / DWR Integration) → Stage 3 (National — USDA/USGS / High Plains Aquifer) → Stage 4 (Sovereign Global — Australia, Brazil, UN Water Security). Each stage is clickable.
- **Stage Detail Panels** — For each stage: required hardware node count, target enrolled acres, required regulatory milestones (e.g., "DWR Rule-Compliant designation"), projected ARR at stage completion, and current progress bars.
- **Policy Risk Heatmap** — For each target jurisdiction: a color-coded risk score across: regulatory receptivity, water rights legal framework compatibility, existing competitor presence, and infrastructure (power/connectivity) availability. Helps investors understand where and why the expansion path is sequenced as it is.
- **Timeline with Capital Requirements** — Gantt-style timeline showing each stage's projected start/end date alongside the capital deployment milestones required to achieve it. Clearly maps Series A proceeds to specific expansion outcomes.
- **International G2G Status** — Government-to-government treaty discussion tracker: which countries have had preliminary discussions, who initiated contact, and what the proposed framework looks like.

---

### 5. IP & Competitive Moat Analysis

Complete intellectual property registry and competitive differentiation matrix.

**Key elements:**

- **Patent Portfolio Registry** — Catalogue of all filed and granted patents: algorithm patents (Regression Kriging workflow, EBK implementation), hardware design IP (kinetic penetrator geometry, HPC cold-start capacitor design, FHSS 128-bit frequency-hopping schema), and trade secrets (MAD threshold calibration constants, CU model coefficients). Filing dates, countries, and legal status.
- **Moat Analysis Matrix** — Side-by-side competitive comparison. Rows: key differentiating capabilities (hardware-signed immutable ledger, 1m Kriging resolution, PBFT water trading, FHSS LPI, FHE capability, Water Court admissibility, Reflex offline autonomy). Columns: FarmSense vs. named competitors (Climate Corp, Trimble Ag, Arable, Planet Labs, Ag Leader). Binary or scored comparison cells with a source footnote for each claim.
- **Trade Secret Classification** — Summary of what is patent-protected vs. trade-secret-protected vs. copyright-protected. Shows the legal strategy behind each protection mechanism.
- **IP Defense Timeline** — Milestones for IP: pending patent approvals, continuation applications, PCT international filings. Shows which IP rights will strengthen the moat over the next 12–36 months.

---

### 6. DoD / ESTCP Dual-Use Revenue Simulator

Investor-facing model of the defense contract revenue potential of the FarmSense network.

**Key elements:**

- **Node Qualification Counter** — Current count of hardware nodes that qualify for DoD/ESTCP programs based on: FHSS LPI/LPD capability, FHE-capable RSS units, JADC2-compatible mesh topology, and air-deliverable kinetic penetrator qualification.
- **Program Pipeline Model** — Structured view of the ESTCP contract pipeline: program name, program office, contract type (R&D, pilot, production), estimated contract value range, and FarmSense's competitive positioning. Not binding — clearly labelled as projections for scenario modeling.
- **Revenue Scenario Sliders** — Investor can adjust: % of FHSS-qualified nodes contracted by DoD, ESTCP R&D pilot award probability, and FHE RSS unit deployment count. Revenue model recalculates in real time showing notional contract values under each scenario.
- **Civilian-to-Defense Handoff Narrative** — Visual timeline showing how civilian deployment milestones (Subdistrict 1 proof, Colorado DWR approval) create the validation record that enables DoD procurement. Explains why civilian revenue is the on-ramp to defense revenue.

---

### 7. Secure Data Room

Time-gated, watermarked investor document access with full engagement analytics.

**Key elements:**

- **Document Library** — Organized folders: Company Overview, Financials (cap table, audited P&L), Technical Diligence (architecture docs, patent filings, CSU validation reports), Regulatory (DWR MOU, SLV 2026 alignment docs), Legal (term sheet drafts, LOIs from government agencies). Each document has a classification level (Confidential / Highly Confidential).
- **Watermarked PDF Delivery** — Every document opened or downloaded is automatically watermarked with the viewing investor's name, organization, and session timestamp. Prevents forwarding of uncontrolled copies.
- **Invitation & Access Control** — Admins control which investors have access to which folder levels. Access invitations are time-limited (7/30/90 days). Admin can revoke access at any time.
- **Engagement Analytics** — For each document: view count, time spent (minutes), last viewed date, and how many pages were read. Helps the FarmSense team identify which diligence topics investors are spending the most time on and tailor follow-up conversations accordingly.

---

### 8. Deal Mechanics & Portfolio Tracker

Post-investment portfolio tracking and deal structure management for committed investors.

**Key elements:**

- **Equity Position Dashboard** — Current ownership %, implied current valuation (using latest-round price), paper gain/loss vs. initial investment, and projected value at target exit multiples (3x, 5x, 10x).
- **Pro-Forma Cap Table Modeler** — Interactive cap table: shows current structure (founder, seed investors, option pool). Adjust Series A raise amount and pre-money valuation to model dilution effect. Projects post-Series-A ownership for each existing shareholder.
- **Liquidation Preference Waterfall** — For proposed exit valuations, shows the payout waterfall by share class and investor. Clearly shows at what exit price each investor class enters the money.
- **Liquidity Event Timeline** — Projected milestones toward liquidity: Series A close target, DoD contract activation, Colorado DWR approval, Series B raise, and IPO runway model. Not binding — labelled as management projections.
- **Investor Relations Feed** — Curated update feed: board meeting summaries, monthly KPI updates, milestone achievements, press mentions. Replaces ad-hoc email communication with a structured, searchable investor comms log.

---

## Design Notes

- **Authentication:** The Investor Terminal uses a separate, higher-assurance authentication pathway (MFA required) compared to the public landing page. All sessions are logged with IP, device fingerprint, and duration.
- **Data Sensitivity:** All financial projections are clearly labelled as forward-looking estimates based on current trajectories. No guarantee language.
- **Visual Identity:** Maintains the Bloomberg-terminal aesthetic from V1 — dark background, monospaced financial data, live tickers. The new views extend this language rather than departing from it.
