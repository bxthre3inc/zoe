# SERVICE CRITICAL ALERT - vpc-edge

**Timestamp:** 2026-03-18 04:25:40 UTC
**Service:** vpc-edge (svc_WaYPe4_lNN0)
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Port:** 3001
**Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
**Entrypoint:** bun run src/index.ts

## Status
- **HTTP Code:** 502 (Bad Gateway)
- **Response Time:** Within 5 seconds

## Restart Attempts
- Attempt 1: 04:25:20 UTC - Restarted, still 502 after 10s
- Attempt 2: 04:25:30 UTC - Restarted, still 502 after 10s

## Issue
Service returning HTTP 502 after 2 restart attempts. Service is not recovering automatically.

## Action Required
Manual investigation needed. Check server logs at /dev/shm/vpc-edge.log and /dev/shm/vpc-edge_err.log
