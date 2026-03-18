# SERVICE CRITICAL: vpc-edge

**Timestamp:** 2026-03-18T09:25:00Z  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Status:** DOWN (HTTP 502 - Bad Gateway)

## Issue Summary
Service has been DOWN for multiple check cycles and failed to recover after 2 restart attempts.

## Restart History
- Attempt 1: Restarted at 09:25:00Z → Still DOWN (502)
- Attempt 2: Restarted at 09:25:10Z → Still DOWN (502)

## Service Configuration
- **Port:** 3001
- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **Protocol:** HTTP

## Action Required
Manual intervention needed. The service appears to have a configuration or runtime issue that automatic restarts cannot resolve. Check:
1. Service logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
2. Workdir for missing dependencies or build issues
3. Environment variables and configuration
