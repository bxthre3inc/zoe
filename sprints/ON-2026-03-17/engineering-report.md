# Engineering Report - Overnight Sprint ON-2026-03-17
**Department:** Engineering  
**Lead:** Drew  
**Duration:** 04:00 - 08:00 UTC  
**Status:** ⚠️ 2 Critical Issues

## Summary
- Service checks: 6 services monitored
- Critical outages: 2 (Frontend, PostgreSQL)
- Security findings: 2 (1 P1, 1 P2)
- Code reviews: N/A (no PRs overnight)

## Infrastructure Status
| Service | Status | Port | Notes |
|---------|--------|------|-------|
| FarmSense API | ✅ UP | 8001 | Operational |
| FarmSense Frontend | ❌ DOWN | 5174 | P0 - Connection refused |
| VPC Edge | ✅ UP | 3001 | Operational |
| PostgreSQL | ❌ DOWN | 5432 | P0 - New outage at 07:04 |
| Oracle (external) | ⚠️ DOWN | - | Persistent P2 since 03/16 |

## Security Findings

### 🔴 P1: Hardcoded Secrets
**File:** `farmsense-code/backend/start.sh` (lines 13-17)
- JWT_SECRET hardcoded
- SECRET_KEY hardcoded  
- Database credentials exposed
- **Action Required:** Migrate to environment variables only

### 🟡 P2: Default Passwords in Template
**File:** `farmsense-code/.env.example`
- Template contains realistic-looking passwords
- Risk of accidental production use
- **Action Required:** Replace with placeholder text

## Blockers
1. PostgreSQL outage blocking database-dependent operations
2. Frontend service down - user-facing impact

## Next Steps
- Investigate PostgreSQL failure (task assigned)
- Restart/restore Frontend service
- Coordinate with Iris on P1 security remediation
