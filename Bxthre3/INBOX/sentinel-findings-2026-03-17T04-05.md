# 🔴 P1: Hardcoded Secrets in Backend Start Script

**Time:** 2026-03-17T04:05:00Z  
**Source:** Sentinel Security Scan  
**Severity:** P1 - Production Critical

## Finding

**File:** `farmsense-code/backend/start.sh` (lines 13-17)

Hardcoded secrets detected:
- `JWT_SECRET="farmsense-tactical-secret-2026-v1-mvp"`
- `SECRET_KEY="farmsense_jwt_secret_key_minimum_32_characters_long_2026"`
- `DATABASE_URL="postgresql://farmsense_user:farmsense_secure_2026@localhost:5432/farmsense_core"`
- `TIMESCALE_URL="postgresql://farmsense_user:farmsense_secure_2026@localhost:5432/farmsense_timeseries"`
- `MAP_DATABASE_URL="postgresql://farmsense_user:farmsense_secure_2026@localhost:5432/farmsense_core"`

## Risk
These credentials are exposed in the codebase and could be committed to version control. Database passwords and JWT secrets should ONLY be provided via environment variables.

## Action Required
1. Remove hardcoded values from `start.sh`
2. Ensure production deployments use environment variables only
3. Rotate any exposed credentials immediately

## IP Scan Results
- No new patents found
- Existing P1 trademark conflicts remain in monitoring
