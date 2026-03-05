# FarmSense Documentation Navigator

#### Start here. This file routes every reader to exactly what they need. The FarmSense repo has **68 documentation files**. Do not browse blindly — use this map

#### Last updated: 2026-03-05

---

## Quick-Start by Role

### 🤖 AI Agent / Developer (start here first)

| Step | Document | Why |
|------|----------|-----|
| 1 | [`docs/management/AGENTS.md`](management/AGENTS.md) | Project memory, current phase, critical deadlines, task status |
| 2 | [`docs/codebase_docs/farmsense-code/BLUEPRINT.md`](codebase_docs/farmsense-code/BLUEPRINT.md) | Vision, architecture, feature set, strategic mandate |
| 3 | [`docs/codebase_docs/farmsense-code/ARCHITECTURE.md`](codebase_docs/farmsense-code/ARCHITECTURE.md) | System layers, Lambda architecture, data flow |
| 4 | [`docs/codebase_docs/farmsense-code/todo.md`](codebase_docs/farmsense-code/todo.md) | **Canonical task board** — check before creating anything |
| 5 | [`docs/codebase_docs/farmsense-code/backend/BACKEND_SERVICE_MAP.md`](codebase_docs/farmsense-code/backend/BACKEND_SERVICE_MAP.md) | All 15 backend services: algorithms, hardware links, router map |
| 6 | [`docs/reference/Subdistrict_1_Market_Intelligence.md`](reference/Subdistrict_1_Market_Intelligence.md) | All market numbers (TAM, acres, pivots) — cite this, don't copy it |

> ⚠️ **Before creating any file or route:** run `grep_search` and `list_dir` first. AGENTS.md §"Before Creating ANYTHING" has the rule.

---

### 🏗️ Hardware / Firmware Engineer

| Step | Document | Why |
| :--- | :--- | :--- |
| 1 | [`docs/specifications/`](specifications/) | Master Specs for your device (versioned, authoritative) |
| 2 | [`docs/architecture/hardwarebreakdown.md`](architecture/hardwarebreakdown.md) | Circuit-level detail: GPIO pinouts, register maps, firmware state machines, BOM |
| 3 | [`docs/specifications/`](specifications/) | Master Specs with §6 Firmware Details (protocol, packet structures) |

**Master Spec files:**

| Device | File |
|--------|------|
| LRZ v1.21 | [`Master Specification: Lateral Root-Zone Scout (LRZ) V1.21.md`](specifications/Master%20Specification:%20Lateral%20Root-Zone%20Scout%20%28LRZ%29%20V1.21.md) |
| VFA v1.21 | [`Master Specification: Vertical Field Anchor (VFA) V1.21.md`](specifications/Master%20Specification:%20Vertical%20Field%20Anchor%20%28VFA%29%20V1.21.md) |
| PFA v1.9 | [`Master Specification: Pressure & Flow Anchor (PFA) V1.9.md`](specifications/Master%20Specification:%20Pressure%20%26%20Flow%20Anchor%20%28PFA%29%20V1.9.md) |
| PMT v1.6 | [`Master Specification: Pivot Motion Tracker (PMT) V1.6.md`](specifications/Master%20Specification:%20Pivot%20Motion%20Tracker%20%28PMT%29%20V1.6.md) |
| CSA v1.0 | [`Master Specification: Corner-Swing Auditor (CSA) V1.0.md`](specifications/Master%20Specification:%20Corner-Swing%20Auditor%20%28CSA%29%20V1.0.md) |
| DHU v1.1 | [`Master Specification: District Hub (DHU) V1.1.md`](specifications/Master%20Specification:%20District%20Hub%20%28DHU%29%20V1.1.md) |
| RSS v1.3 | [`Master Specification: Regional Superstation (RSS) V1.3.md`](specifications/Master%20Specification:%20Regional%20Superstation%20%28RSS%29%20V1.3.md) |
| Aerial Fleet v1.3 | [`Master Specification: Aerial Fleet Strategy V1.3.md`](specifications/Master%20Specification:%20Aerial%20Fleet%20Strategy%20V1.3.md) |
| AKP-LRZ v1.0 | [`Master Specification: Airborne Kinetic Penetrator LRZ V1.0.md`](specifications/Master%20Specification:%20Airborne%20Kinetic%20Penetrator%20LRZ%20V1.0.md) |

---

### 💼 Investor / Advisor

| Document | Why |
|----------|-----|
| [`docs/presentations/Uncle_David_Dossier/01_FarmSense_Executive_Business_Plan.md`](presentations/Uncle_David_Dossier/01_FarmSense_Executive_Business_Plan.md) | Business model, Resolution Pop SaaS, Sled Hospital strategy |
| [`docs/presentations/Uncle_David_Dossier/02_System_Architecture_and_Hardware_Tiers.md`](presentations/Uncle_David_Dossier/02_System_Architecture_and_Hardware_Tiers.md) | Hardware tier explanation for non-technical investors |
| [`docs/presentations/Uncle_David_Dossier/03_Firmware_Mesh_and_SoC_Implementation.md`](presentations/Uncle_David_Dossier/03_Firmware_Mesh_and_SoC_Implementation.md) | Firmware architecture for technical investors |
| [`docs/presentations/Grant_Proposals/Romero_Seed_Proposal.md`](presentations/Grant_Proposals/Romero_Seed_Proposal.md) | Seed proposal: $25K ask, 1% equity offer |
| [`docs/presentations/Grant_Proposals/Romero_Technical_Seed_Dossier.md`](presentations/Grant_Proposals/Romero_Technical_Seed_Dossier.md) | Technical depth companion |
| [`docs/reference/Subdistrict_1_Market_Intelligence.md`](reference/Subdistrict_1_Market_Intelligence.md) | TAM: 1,270 pivots, ~160K acres, $500/AF pumping fee |

---

### 🏛️ Grant Reviewer / DoD

| Document | Why |
|----------|-----|
| [`docs/presentations/Grant_Proposals/DoD_ESTCP_Water_Resilience_PreProposal.md`](presentations/Grant_Proposals/DoD_ESTCP_Water_Resilience_PreProposal.md) | **Active submission — deadline March 26, 2026** |
| [`docs/presentations/Grant_Proposals/Project_OMNI_Intelligence_Roadmap.md`](presentations/Grant_Proposals/Project_OMNI_Intelligence_Roadmap.md) | Global aquifer intelligence strategy for DoD context |
| [`docs/presentations/Grant_Proposals/CSU_SLV_Pilot_Budget.md`](presentations/Grant_Proposals/CSU_SLV_Pilot_Budget.md) | Granular pilot budget ($25K seed, hardware BOM) |
| [`docs/presentations/Grant_Proposals/Phase_1_and_2_IP_Budget.md`](presentations/Grant_Proposals/Phase_1_and_2_IP_Budget.md) | Patent strategy: 6 provisional filings + PCT path |
| [`docs/management/FUNDING_PIPELINE.md`](management/FUNDING_PIPELINE.md) | All active & planned grants, deadlines, amounts, status |

---

### ⚖️ Water Court / Regulator

| Document | Why |
|----------|-----|
| [`docs/architecture/FarmSense_Master_Manual.md`](architecture/FarmSense_Master_Manual.md) | Comprehensive system narrative (read-only reference) |
| [`docs/reference/Due Diligence and Systems Architecture Audit_ FarmSense San Luis Valley Pilot.md`](reference/Due%20Diligence%20and%20Systems%20Architecture%20Audit_%20FarmSense%20San%20Luis%20Valley%20Pilot.md) | Third-party style audit, chain-of-custody architecture |
| [`docs/reference/Subdistrict_1_Market_Intelligence.md`](reference/Subdistrict_1_Market_Intelligence.md) | Authoritative SLV market/regulatory data |

---

### 🌾 Project Manager / Founder

| Document | Why |
|----------|-----|
| [`docs/management/AGENTS.md`](management/AGENTS.md) | Project memory, current phase, critical deadlines, task status |
| [`docs/management/ROADMAP.md`](management/ROADMAP.md) | Full Phase 1–5 roadmap + grant schedule |
| [`docs/management/FUNDING_PIPELINE.md`](management/FUNDING_PIPELINE.md) | All grants: status, deadlines, amounts |

---

## Document Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Current | Accurate, actively maintained |
| ⚠️ Partial | Useful but may have stale sections |
| 🗂️ Reference | Read-only historical/reference document |
| 🔨 Build Artifact | Generated file — do not edit directly |
| ❌ Stale | Content superseded — see note in file |

---

## Full Inventory by Directory

### `docs/management/` — Living project management

| File | Status | Purpose |
|------|--------|---------|
| `AGENTS.md` | ✅ Current | AI agent instructions, project memory |
| `ROADMAP.md` | ✅ Current | Phase 1–5 roadmap + grant schedule |
| `FUNDING_PIPELINE.md` | ✅ Current | Grant pipeline tracking |
| `RECONCILIATION_CHECKLIST.md` | ⚠️ Partial | Code ↔ docs alignment (some items stale) |
| `CI_CD_SETUP.md` | ⚠️ Partial | Correct steps, some naming conventions old (Oracle/CSE) |

### `docs/specifications/` — **Authoritative hardware specs**

All 9 files are ✅ Current and versioned. These are the canonical source of truth for all hardware. See table above for per-device links.

### `docs/architecture/` — System-level documents

| File | Status | Purpose |
|------|--------|---------|
| `hardwarebreakdown.md` | ✅ Current | Circuit-level detail, GPIO maps, register tables, BOM |
| `FarmSense_Master_Manual.md` | 🗂️ Reference | PDF-source composite of reference/ docs |
| `FarmSense_Internal_Guide.md` | ⚠️ Partial | Part I (lines 1–472): useful dev/AI guide. Part II: appended hardware specs (skip) |
| `FarmSense_Master_Manual.pdf` | 🔨 Build Artifact | ❌ Outdated — missing trading, federated, water markets |

### `docs/codebase_docs/farmsense-code/` — Code-aligned docs

| File | Status | Purpose |
|------|--------|---------|
| `BLUEPRINT.md` | ✅ Current | Core strategic + technical overview |
| `ARCHITECTURE.md` | ✅ Current | System layers, Lambda architecture |
| `FEATURESET.md` | ✅ Current | Feature inventory |
| `README.md` | ✅ Current | Project overview |
| `ONBOARDING.md` | ✅ Current | Reading order for new devs |
| `SOFTWARE_INDEX.md` | ✅ Current | Master index of software specs (portals + firmware links) |
| `todo.md` | ✅ Current | **Canonical task board** |
| `IMPLEMENTATION_GUIDE.md` | ⚠️ Partial | Good troubleshooting, but weekly plan assumes old scale |
| `SPLIT_DEPLOYMENT_README.md` | ⚠️ Partial | Uses old Zo.computer/RDC naming |
| `marketing-video-prompts.md` | ✅ Current | Video scripts |

#### `docs/codebase_docs/farmsense-code/backend/`

| File | Status | Purpose |
|------|--------|---------|
| `BACKEND_SERVICE_MAP.md` | ✅ Current | All 15 service modules: algorithms, hardware connections, router mapping |

### `docs/reference/` — Research and strategic reference

| File | Status | Purpose |
|------|--------|---------|
| `Subdistrict_1_Market_Intelligence.md` | ✅ **Canonical** | All market numbers (cite this, don't copy) |
| `Zo_Computer_Deployment_Architecture.md` | ✅ Current | Routing strategy for Zo.computer |
| `Strategic_Remediation_Archive.md` | 🗂️ Reference | Early hardware pivot decisions — institutional memory |
| `Due Diligence and Systems Architecture Audit.md` | 🗂️ Reference | Original third-party audit narrative |
| `FarmSense Long Term Roadmap.md` | ⚠️ Partial | Raw Gemini export (URLs embedded), content absorbed into ROADMAP.md |
| `FarmSense: Technical Project Overview & Research Validation Guide.md` | ⚠️ Partial | Raw Gemini export, content absorbed |

### `docs/presentations/` — Investor & grant materials

All files in `Grant_Proposals/` and `Uncle_David_Dossier/` are ✅ Current investor/grant-facing documents. See role sections above for guidance on which to use.

### `docs/audit_logs/` — Historical audit records

`phase_1.md` through `phase_5.md` are 🗂️ Reference documents. Accurate historical audit of the codebase at each phase. Read-only.

---

## Key Numbers (Canonical — cite `Subdistrict_1_Market_Intelligence.md`)

| Metric | Value |
|--------|-------|
| Active irrigation wells, SD1 | 3,617 |
| Total irrigated acreage, SD1 | ~160,000 acres |
| Active pivot count, SD1 | ~1,270 |
| Avg. field size | 126 acres |
| Aquifer depletion rate | 89,000 AF/year |
| Recovery mandate by 2031 | 170,000 AF |
| Groundwater pumping fee | $500/AF |
| Per-pivot annual savings (20% reduction) | $26,000 |
| Enterprise SaaS price | $499/month |
| LRZ unit cost (OEM scale) | $67.80 |
| PMT unit cost | $1,112 |
| 2-Field Pilot seed ask | $25,000 |

---

*Generated by documentation audit — 2026-03-05*
