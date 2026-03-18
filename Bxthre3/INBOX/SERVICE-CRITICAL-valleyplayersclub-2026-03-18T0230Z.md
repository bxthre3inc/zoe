# CRITICAL: valleyplayersclub Service Down

**Service:** valleyplayersclub  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Service ID:** svc_e8ZjTEIhSIo  
**Timestamp:** 2026-03-18 02:30:00Z

## Issue Summary
Service is returning HTTP 403 (Forbidden) and has failed to recover after 2 automatic restart attempts.

## Restart Attempts
| Attempt | Time | Result |
|---------|------|--------|
| Check 1 | 02:30:00Z | HTTP 403 |
| Restart 1 | 02:30:00Z | Initiated |
| Verify 1 | 02:30:10Z | Still HTTP 403 |
| Restart 2 | 02:30:10Z | Initiated |
| Verify 2 | 02:30:20Z | Still HTTP 403 |

## Service Configuration
- **Port:** 5175
- **Entrypoint:** `bash -c 'bun run preview -- --port $PORT'`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- **Protocol:** http

## Action Required
Manual investigation needed. Possible causes:
- Preview server configuration issue
- Missing build artifacts
- Environment/configuration issue
- Resource constraints

## Logs
Check service logs: `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
