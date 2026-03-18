# CRITICAL: Service Down - valleyplayersclub

**Status:** CRITICAL FAILURE  
**Timestamp:** 2026-03-18T20:10:00Z  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  

## Failure Details

| Check | Result |
|-------|--------|
| Initial Check | HTTP 403 (Forbidden) |
| Restart 1 | Attempted at 2026-03-18T20:10:00Z |
| Post-Restart 1 | Still HTTP 403 |
| Restart 2 | Attempted at 2026-03-18T20:10:00Z |
| Post-Restart 2 | Still HTTP 403 |

## Service Configuration

- **Label:** valleyplayersclub
- **Protocol:** http
- **Local Port:** 5175
- **Entrypoint:** `bash -c 'bun run preview -- --port $PORT'`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- **Public URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
- **TCP Address:** ts3.zocomputer.io:10548

## Action Required

Manual intervention required. Service has failed to recover after 2 automatic restart attempts.

Check:
1. Server logs at `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
2. Application code and dependencies
3. Resource availability (CPU, memory)
4. Authentication/authorization configuration
5. Bun preview server configuration

## Log Reference

See `/home/workspace/Bxthre3/agents/logs/service-restarts.log` for full restart history.
