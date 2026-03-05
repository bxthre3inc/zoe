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

- **Network Topology Graph** — Force-directed graph visualization of the mesh hierarchy: RSS (orange node) → DHU nodes (blue) → PMT nodes (green) → VFA/LRZ/PFA leaf nodes (white). Edge thickness represents link quality (RSSI). Animated pulses show data packets flowing up the hierarchy.
- **Per-Node Drill-Down Panel** — Click any node to expand: firmware version, battery voltage, last packet received timestamp, queue depth (packets pending sync), RSSI to parent node, GPS coordinates, and field assignment. Shows a 24-hour uptime sparkline.
- **Silent Node Alerts** — Any node that has not transmitted in >15 minutes is highlighted red with an elapsed time counter. Configurable alert threshold per node type (e.g., LRZ nodes may sleep longer without alarming).
- **Mesh Health Score** — Composite platform-wide health index: % of nodes reporting normally, average RSSI across all links, queue backlog depth, and sync lag to cloud. Updated every 60 seconds.
- **Geographic Map Overlay** — Toggle from graph view to a geographic map showing node positions plotted on satellite imagery. Useful for field technicians verifying physical deployment.

---

### 2. OTA Firmware Deployment Manager

A staged over-the-air firmware deployment and version tracking system for all hardware tiers.

**Key elements:**

- **Firmware Version Registry** — Table of all available firmware releases per device type (RSS, DHU, PMT, VFA, LRZ, PFA). Shows: version number, release date, changelog summary, compatibility warnings, and whether it is the currently promoted stable release.
- **Rollout Controller** — Define a deployment batch: select target device type + subdistrict filter + optional individual node selection. Set a deployment window (e.g., 02:00–04:00 local time to avoid irrigation cycles). Preview: estimated # of devices affected before confirming.
- **Real-Time Deployment Progress** — Live progress bar per device batch. Individual device rows show: queued → downloading → installing → rebooting → verified. Failed devices flagged immediately with error code.
- **Rollback Tool** — One-click revert to the previous firmware version for any individual device or cohort. Rollbacks require an admin justification note (logged for audit).
- **Version Matrix** — Fleet-wide firmware version heatmap: for each device type, what percentage of the fleet is on each version. Identifies stale firmware concentrations.

---

### 3. Tenant & Billing Operations

Full multi-tenant account management and revenue operations panel.

**Key elements:**

- **Account Portfolio Table** — All registered farm accounts with: tier (Silas/Basic/Pro/Enterprise), MRR contribution, active hardware node count, grant subsidy flag and expiry, trial status, last login, and payment status. Sortable and filterable by any field.
- **Tier Override Controls** — Admin can manually promote or demote any account's tier (for sales, support, or grant-program purposes). Tier changes are logged with a required reason note and admin identity.
- **Revenue Waterfall Chart** — MRR breakdown by tier, with month-over-month trend. Separate lines for grant-subsidized vs. self-pay ARR to show organic vs. program-dependent revenue.
- **Churn Risk Indicators** — ML-flagged accounts exhibiting churn signals: no login in >14 days, hardware going offline, compliance reports not being generated, or MRR payment failure. Admin action buttons: send re-engagement email, schedule support call, flag for account management.
- **Subsidy Ledger** — For each grant program: total authorized subsidy budget, amount disbursed to date, accounts enrolled, per-account subsidy balance and burn rate. Linked to the Grant Portal for cross-reference.

---

### 4. Platform Health Command

Unified system status dashboard for all backend services, infrastructure, and SLA tracking.

**Key elements:**

- **Service Status Grid** — Live health panel for every deployed service: FastAPI backend (response time p50/p95, error rate), Celery workers (queue depth, job completion rate), TimescaleDB (connections, query latency, hypertable sizes), Redis (hit rate, memory usage), RabbitMQ (message rate, consumer lag), edge sync service (batch upload lag, sync failures).
- **Historical Uptime Graphs** — 30-day rolling uptime graphs per service. Outage events annotated with root-cause tags (deployments, migrations, upstream API failures, hardware events).
- **Active Incident Log** — Open incidents with: severity (P0/P1/P2/P3), affected services, start time, elapsed duration, assigned responder, and current status. Resolved incidents show MTTR and post-mortem link.
- **SLA Tracker** — Per-customer-tier SLA dashboard. Enterprise accounts show contracted uptime % vs. actual. Breach risk alerts when a service is trending toward SLA violation in the current month.
- **API Usage Analytics** — Time-series charts of API call volume by endpoint, error rates, authentication failures, and rate-limit events. Top consumers by account with anomaly flags for unusual spike patterns.

---

### 5. Data Governance Center

Privacy, data-sharing, and access-control management across the entire platform.

**Key elements:**

- **Data-Sharing Access Matrix** — Cross-reference table: rows are farmer accounts, columns are portal types (Regulatory, Investor, Research, Grant). Each cell shows the current sharing consent status (enabled/disabled), the date it was set, and who set it. Admins can view but not change farmer-owned consent.
- **Data Access Event Audit Log** — Immutable log of every data access event across all portals: requesting officer identity, data scope requested, field(s) accessed, timestamp, and session duration. Filterable by portal, account, or date range. Exportable for compliance review.
- **Legal Hold Manager** — Flag specific accounts or field datasets as under legal hold (e.g., active Water Court litigation). Hold prevents data deletion, tier downgrades, or consent changes until the hold is lifted by a named legal officer.
- **GDPR / CCPA Request Tracker** — Queue of incoming privacy requests (access, deletion, portability). Workflow: intake → verification → fulfillment → confirmation. Tracks SLA compliance (legal deadlines per jurisdiction).
- **Force-Revoke Console** — Admin can revoke a farmer's data-sharing grants on their behalf in an emergency (verified legal instruction required). Generates an automated notification to the farmer and the affected portal with the revocation timestamp and reason.

---

### 6. Reflex Logic Configuration

Basin-level threshold editor for the deterministic decision engine.

**Key elements:**

- **Global Threshold Editor** — Edit the core decision-engine thresholds that govern the entire platform: moisture stable band, active threshold, critical threshold, trend volatile score, ET trigger coefficients, and minimum pump cycle intervals. Changes require a two-admin co-signature before going live.
- **Threshold Change Preview** — Before committing a threshold change, the system simulates the effect on the last 30 days of field data across all enrolled farms. Shows: how many actuation decisions would have changed, estimated water savings impact, and any new critical-event triggers that would have fired.
- **Reflex Message Broadcaster** — Send a mesh-wide Reflex message (emergency pump ceiling, drought advisory, Mandatory stop). Three severity levels: Advisory (informational), Warning (dashboard alert), Mandatory (automatically enforced by DHU Reflex Logic). Mandatory broadcasts require dual-officer co-signature with hardware-backed timestamp.
- **Basin Drought Status Board** — Current declared drought status, active Reflex limits by subdistrict, and historical Reflex event log.

---

### 7. Grant Subsidy Management

Track and administer all grant-funded hardware programs and account subsidies.

**Key elements:**

- **Grant Program Registry** — All active grant programs: program name, administering agency, total budget, accounts enrolled, hardware units covered, and program timeline. Each program links to the Grant Portal for detailed reporting.
- **Hardware Fulfillment Tracker** — For each grant program: ordered hardware quantities, shipped to field, installed and online, and firmware-verified. Tracks deployment completion % against grant milestones.
- **Per-Account Subsidy Detail** — Drill into any subsidized account: exact subsidy amount, monthly burn rate, hardware costs covered, subscription costs covered, remaining balance, and projected exhaustion date.
- **Bulk Subsidy Operations** — Apply or extend subsidies to a cohort of accounts in one operation (e.g., "extend all Subdistrict 1 accounts by 90 days"). All bulk operations require admin sign-off and are logged.
- **USDA/EPA Adoption Report Generator** — Auto-generate a structured report for grant administrators showing: # of farmers reached, total acres covered, system uptime, compliance report generation rate, and water savings metrics. Used to satisfy grant deliverable reporting requirements.

---

### 8. Compliance Audit Operations

Internal queue and workflow manager for all regulatory submissions across all tenant accounts.

**Key elements:**

- **Submission Queue** — All pending compliance submissions across every tenant account in a unified queue. Columns: account name, field, submission type, generated date, assigned officer, status (Drafted/In Review/Signed/Submitted/Acknowledged by DWR).
- **Review & Flagging Console** — Open any submission draft, review the auto-generated content, and: approve as-is, flag for revision (with comment), or reject (with legal justification). Flagged items are returned to the tenant with admin comments.
- **Officer Assignment** — Assign a named FarmSense compliance officer to any submission. Assignment is logged and the officer receives an in-app notification with the review deadline.
- **DWR Submission Pipeline** — Track each submission's status through the state DWR ingestion pipeline. Status states: Submitted to DWR → Acknowledged → Under Review → Accepted / Returned for Revision.
- **Compliance Analytics** — Platform-wide compliance metrics: submissions generated per month, average time from generation to DWR submission, rejection rate, and first-pass acceptance rate by submission type.

---

## Design Notes

- **Permission Model:** All destructive actions (force-revoke, tier change, Reflex mandatory broadcast, legal hold) require at least one additional admin co-signature logged as a hardware-timestamped event.
- **Audit Trail:** Every admin action in every view is logged to an immutable internal audit table (separate from farmer-facing ledgers) with admin identity, action type, affected resource, and timestamp.
- **Performance:** The mesh network monitor supports up to 50,000 nodes; the topology graph uses a canvas-based renderer (not SVG) for performance at scale.
