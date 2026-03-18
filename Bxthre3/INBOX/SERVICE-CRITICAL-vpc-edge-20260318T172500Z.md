# 🚨 SERVICE CRITICAL: vpc-edge

**Timestamp:** 2026-03-18T17:25:00Z
**Service:** vpc-edge (svc_WaYPe4_lNN0)
**Port:** 3001
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Status:** DOWN after 2 restart attempts

## Failure History
- Initial check: HTTP 502
- Restart attempt 1: Triggered → still HTTP 502
- Restart attempt 2: Triggered → still HTTP 502

## Service Details
- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **TCP Address:** ts3.zocomputer.io:10834

## Action Required
Service is not responding to restarts. Requires manual investigation:
1. Check service logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
2. Verify workdir exists and code is valid
3. Check for dependency issues or port conflicts

## Log Reference
See full restart log: `/home/workspace/Bxthre3/agents/logs/service-restarts.log`
