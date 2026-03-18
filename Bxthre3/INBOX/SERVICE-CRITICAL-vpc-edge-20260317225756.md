# CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-17 22:57:56 UTC
**Service:** vpc-edge
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Status:** DOWN (HTTP 502)
**Severity:** CRITICAL

## Service Details
- **Service ID:** svc_WaYPe4_lNN0
- **Port:** 3001
- **Entrypoint:** bun run src/index.ts
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **Protocol:** HTTP

## Action History
1. Initial check: HTTP 502 - Service DOWN
2. Restart attempt #1: Service restarted
3. Verification after 10s: Still DOWN (HTTP 502)
4. Restart attempt #2: Service restarted
5. Final verification after 10s: Still DOWN (HTTP 502)

## Required Action
- Manual investigation needed
- Check service logs at /dev/shm/vpc-edge.log and /dev/shm/vpc-edge_err.log
- Verify code/state in workdir
- Potential issues: Application crash, dependency failure, port conflict
