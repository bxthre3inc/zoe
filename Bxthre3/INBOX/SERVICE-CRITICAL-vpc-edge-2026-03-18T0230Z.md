# CRITICAL: vpc-edge Service Down

**Service:** vpc-edge  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Service ID:** svc_WaYPe4_lNN0  
**Timestamp:** 2026-03-18 02:30:00Z

## Issue Summary
Service is returning HTTP 502 (Bad Gateway) and has failed to recover after 2 automatic restart attempts.

## Restart Attempts
| Attempt | Time | Result |
|---------|------|--------|
| Check 1 | 02:30:00Z | HTTP 502 |
| Restart 1 | 02:30:00Z | Initiated |
| Verify 1 | 02:30:10Z | Still HTTP 502 |
| Restart 2 | 02:30:10Z | Initiated |
| Verify 2 | 02:30:20Z | Still HTTP 502 |

## Service Configuration
- **Port:** 3001
- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **Protocol:** http

## Action Required
Manual investigation needed. Possible causes:
- Application error in server code
- Missing dependencies
- Environment/configuration issue
- Resource constraints

## Logs
Check service logs: `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
