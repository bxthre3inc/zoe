# CRITICAL: Service Down - vpc-edge

**Timestamp:** 2026-03-19 03:10:00 UTC  
**Service:** vpc-edge (svc_WaYPe4_lNN0)  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Status:** DOWN

## Issue
Service returning HTTP 502 (Bad Gateway) after 2 restart attempts.

## Attempts Made
1. Restart attempt 1 at 03:10:00 UTC - no recovery
2. Restart attempt 2 at 03:10:10 UTC - no recovery

## Service Config
- Port: 3001
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`

## Action Required
Manual investigation needed. Check application logs and server health.
