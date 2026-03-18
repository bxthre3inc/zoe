# CRITICAL: vpc-edge Service Failure

## Service Details
- **Name:** vpc-edge
- **Service ID:** svc_WaYPe4_lNN0
- **Port:** 3001
- **URL:** https://vpc-edge-brodiblanco.zocomputer.io
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **Entrypoint:** bun run src/index.ts

## Failure Report
- **Timestamp (UTC):** 2026-03-18 05:20:00
- **User Timezone:** America/Denver (2026-03-18 05:20:00 MDT)
- **HTTP Status:** 502 (Bad Gateway)
- **Status:** Service DOWN - requires manual intervention

## Restart History
1. Initial check: 502
2. Restart attempt 1: Triggered → Still 502 after 10s
3. Restart attempt 2: Triggered → Still 502 after 10s

## Action Required
Service failed to recover after 2 automatic restart attempts. Manual investigation needed:
- Check server logs at /dev/shm/vpc-edge.log and /dev/shm/vpc-edge_err.log
- Verify bun dependencies and build status
- Investigate any code or configuration changes

---
Logged by Service Restarter Agent
