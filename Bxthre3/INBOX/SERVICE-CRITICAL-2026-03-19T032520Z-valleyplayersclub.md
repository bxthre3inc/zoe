# SERVICE CRITICAL ALERT: valleyplayersclub

**Timestamp:** 2026-03-19T03:25:20Z
**Severity:** CRITICAL
**Status:** DOWN AFTER 2 RESTART ATTEMPTS

## Service Details
- **Service ID:** svc_e8ZjTEIhSIo
- **Label:** valleyplayersclub
- **URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
- **Port:** 5175
- **Protocol:** HTTP
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
- **Entrypoint:** bash -c 'bun run preview -- --port $PORT'

## Failure History
1. Initial check: HTTP 403 (Forbidden)
2. Restart attempt 1: HTTP 403 (after restart)
3. Restart attempt 2: HTTP 403 (after restart)

## Action Required
Service requires manual intervention. Automatic restarts failed to restore service.

## Logs
Check: /home/workspace/Bxthre3/agents/logs/service-restarts.log
Service logs: /dev/shm/valleyplayersclub.log, /dev/shm/valleyplayersclub_err.log
