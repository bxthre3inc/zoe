# 🚨 CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-18 19:55:20 UTC
**Service:** vpc-edge (port 3001)
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Service ID:** svc_WaYPe4_lNN0

## Status
- **HTTP Response:** 502 Bad Gateway
- **Restart Attempts:** 2 (both failed)
- **Previous Restarts:** 2026-03-18 19:55:00 UTC, 2026-03-18 19:55:10 UTC

## Service Configuration
- **Protocol:** HTTP
- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **TCP Address:** ts3.zocomputer.io:10834

## Action Required
Service has failed to recover after 2 automated restart attempts. Manual investigation required.

## Logs
Check service logs at: `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
