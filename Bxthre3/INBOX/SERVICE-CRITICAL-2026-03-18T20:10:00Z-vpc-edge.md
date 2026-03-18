# CRITICAL: Service Down - vpc-edge

**Status:** CRITICAL FAILURE  
**Timestamp:** 2026-03-18T20:10:00Z  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  

## Failure Details

| Check | Result |
|-------|--------|
| Initial Check | HTTP 502 (Bad Gateway) |
| Restart 1 | Attempted at 2026-03-18T20:10:00Z |
| Post-Restart 1 | Still HTTP 502 |
| Restart 2 | Attempted at 2026-03-18T20:10:00Z |
| Post-Restart 2 | Still HTTP 502 |

## Service Configuration

- **Label:** vpc-edge
- **Protocol:** http
- **Local Port:** 3001
- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **Public URL:** https://vpc-edge-brodiblanco.zocomputer.io
- **TCP Address:** ts3.zocomputer.io:10834

## Action Required

Manual intervention required. Service has failed to recover after 2 automatic restart attempts.

Check:
1. Server logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
2. Application code and dependencies
3. Resource availability (CPU, memory)
4. External dependencies (databases, APIs)

## Log Reference

See `/home/workspace/Bxthre3/agents/logs/service-restarts.log` for full restart history.
