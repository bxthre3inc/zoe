# Bill of Materials: Subdistrict 1 Deployment (SLV)

This document outlines the capital expenditure (CAPEX) requirements for the FarmSense pilot rollout in Subdistrict 1. All costs are based on high-fidelity SDR9 standards and current OEM pricing.

## 1. Unit Cost Summary

| Asset Tier | Role | Component Name | Unit Cost (USD) |
| :--- | :--- | :--- | :--- |
| **Tier 3** | Regional Cortex | Regional Superstation (RSS) | $212,000.00 |
| **Tier 2** | District Manager | District Hub (DHU) | $4,594.00 |
| **Tier 1** | Foundation Node | VFA (48U Sled/Shell) | $159.65 |
| **Tier 1** | Reference Node | LRZ2 (18U Sled/Shell) | $59.30 |
| **Tier 1** | Truth Node | LRZ1 (10" Monolithic) | $29.00 |
| **Tier 1.5** | Primary Aggregator | PMT (Field Hub) | $985.50 |
| **Tier 1.5** | Source Sentry | PFA (Well Sentry) | $961.50 |
| **Tier 1.5** | Swing Resolver | CSA (PST + SAT) | $2,224.00 |

## 2. Subdistrict 1 Scale (1,280 Fields)

Based on the established **2:4:12 Stereo Ratio** and edge-compute density requirements.

### 2.1 Field-Level Infrastructure

Estimated for 1,280 pivots (Standard 160-acre circles).

| Component | Qty per Field | Total Qty | Unit Cost | Extended Cost |
| :--- | :---: | :---: | :---: | :---: |
| VFA Foundation | 2 | 2,560 | $159.65 | $408,704 |
| LRZ2 Reference | 4 | 5,120 | $59.30 | $303,616 |
| LRZ1 Truth Node | 12 | 15,360 | $29.00 | $445,440 |
| PMT Field Hub | 1 | 1,280 | $985.50 | $1,261,440 |
| PFA Well Sentry | 1 | 1,280 | $961.50 | $1,230,720 |
| **Subtotal (Field Assets)** | | | | **$3,649,920** |

### 2.2 Regional-Level Infrastructure

Estimated coverage for Subdistrict 1 territory.

| Component | Coverage Ratio | Total Qty | Unit Cost | Extended Cost |
| :--- | :---: | :---: | :---: | :---: |
| District Hub (DHU) | 1 per 100 Fields | 13 | $4,594.00 | $59,722 |
| Regional Superstation | 1 per Subdistrict | 1 | $212,000.00 | $212,000 |
| Aerial Fleet (eBee) | Fixed-Wing | 2 | $14,500.00 | $29,000 |
| Aerial Fleet (Mavic) | Multi-Rotor | 4 | $4,999.00 | $19,996 |
| **Subtotal (Regional Assets)** | | | | **$320,718** |

## 3. Total Project CAPEX (Subdistrict 1)

| Category | Total Investment |
| :--- | :--- |
| **Field-Level Assets** | $3,649,920 |
| **Regional-Level Assets** | $320,718 |
| **Total CAPEX Estimate** | **$3,970,638** |

---
**Deployment Density**: ~18 Nodes Per Field (26 total nodes per 140-160 acres).
**Material Integrity**: All sub-surface components utilize **HDPE SDR9**.
**Data Standard**: 1m-pixel high-resolution spatial moisture grid.
