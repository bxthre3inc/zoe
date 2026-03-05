# FarmSense Master Manual ↔ Codebase Reconciliation Checklist

**Generated:** 2026-03-03
**Source:** `FarmSense_Master_Manual.pdf` (326 pages) vs `farmsense-code/`

---

## 🔴 MISSING FROM CODE (Manual documents, code doesn't exist)

### Backend Routers
- [ ] `tiles.py` — Map tiles router (`/api/v1/tiles`)

### Backend Services
- [ ] `decision_engine.py` — Deterministic logic service (listed in AGENTS.md file structure)

### Frontend Portals
- [ ] `regulatory-portal/` — SLV 2026 compliance (NEEDED BY JUNE 2026)
- [ ] `grant-portal/` — Grant reviewer portal (NEEDED BY MARCH 26, 2026)
- [ ] `admin-dashboard/` — System admin
- [ ] `investor-dashboard/` — Investment portal
- [ ] `docs-portal/` — Documentation
- [ ] `marketing-site/` — Public marketing

---

## 🟡 MISSING FROM MANUAL (Code exists, manual doesn't document)

### ✅ RESOLVED (Added to AGENTS.md 2026-03-03)
| File | What It Is | Status |
|------|------------|--------|
| `trading.py` | Water market router | ✅ Documented |
| `federated.py` | Inter-agency / Federal data fabric router | ✅ Documented |
| `trading_service.py` | Water market trading logic | ✅ Documented |
| `vri_command_center.py` | VRI actuation orchestrator | ✅ Documented |
| `water_rights.py` | Water rights model | ✅ Documented |
| `farmsense-portal/` | Renamed farmer-dashboard | ✅ Documented |
| `robotics_missions` | Autonomous field operations | ✅ Documented |

---

## ✅ VERIFIED ALIGNED

| Component | Manual | Codebase | Match |
|-----------|--------|----------|-------|
| Adaptive Recalc Modes | 4 modes documented | `adaptive_recalc_engine.py` | ✅ |
| Key Thresholds | 6 thresholds | Identical in code | ✅ |
| Hardware Tiers | LRZ, VFA, PFA, PMT, CSA, DHU, RSS | Specs exist for all | ✅ |
| `hardware.py` router | Documented | Exists | ✅ |
| `users.py` router | Documented | Exists | ✅ |
| `metrics.py` router | Documented | Exists | ✅ |
| `grants.py` router | Documented | Exists | ✅ |
| `analytics.py` router | Documented | Exists | ✅ |
| `compliance.py` router | Documented | Exists | ✅ |
| `grid_renderer.py` | Documented | Exists | ✅ |
| `devices.py` model | Documented | Exists | ✅ |
| `sensor_data.py` model | Documented | Exists | ✅ |
| `user.py` model | Documented | Exists | ✅ |
| `database.py` core | Documented | Exists | ✅ |
| `websocket.py` core | Documented | Exists | ✅ |
| `research-portal/` | Documented | Exists | ✅ |

---

## 📋 RECONCILIATION ACTIONS

### Phase 1: Documentation Updates ✅ COMPLETE

| File | What to Document | Status |
|------|------------------|--------|
| `trading.py` | Water market router | ✅ Done |
| `federated.py` | Inter-agency router | ✅ Done |
| `trading_service.py` | Trading logic | ✅ Done |
| `vri_command_center.py` | VRI orchestration | ✅ Done |
| `water_rights.py` | Water rights model | ✅ Done |
| Robotics | Autonomous missions | ✅ Done |

### Phase 2: Build Decisions (Missing Code)

| Component | Decision Needed | Deadline | Action |
|-----------|-----------------|----------|--------|
| `tiles.py` | Build or remove? | TBD | Pending |
| `decision_engine.py` | Build or remove? | TBD | Pending |
| `grant-portal` | Build | March 26, 2026 | **BUILD NOW** |
| `regulatory-portal` | Build | June 2026 | Build Q2 |
| Other portals | Build | Post-pilot | Backlog |

---

## ⚠️ MANUAL PDF SYNC NEEDED

The `FarmSense_Master_Manual.pdf` is outdated and contains:
- ❌ Old `nexus.py` references (removed from AGENTS.md)
- ❌ Missing `trading.py`, `federated.py`, `vri_command_center.py` documentation
- ❌ Missing Water Markets section
- ❌ Missing Inter-agency / Federated Data section
- ❌ Missing Robotics section

**Action:** Regenerate PDF from source HTML or update manually.

---

## NEXT STEPS

1. [x] Answer open questions above
2. [x] Update AGENTS.md with undocumented features (Phase 1)
3. [ ] Regenerate Master Manual PDF
4. [ ] Build `grant-portal` (Deadline: March 26, 2026)
5. [ ] Build `regulatory-portal` (Deadline: June 2026)
6. [ ] Make build/remove decisions for `tiles.py`, `decision_engine.py`
7. [ ] Re-run this audit quarterly

---

*Last reconciliation: 2026-03-03*
*Next audit due: 2026-04-01*
