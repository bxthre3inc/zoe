# 🚨 SERVICE CRITICAL: valleyplayersclub

**Timestamp:** 2026-03-18T17:25:00Z
**Service:** valleyplayersclub (svc_e8ZjTEIhSIo)
**Port:** 5175
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Status:** DOWN after 2 restart attempts

## Failure History
- Initial check: HTTP 403
- Restart attempt 1: Triggered → still HTTP 403
- Restart attempt 2: Triggered → still HTTP 403

## Service Details
- **Entrypoint:** `bash -c 'bun run preview -- --port $PORT'`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- **TCP Address:** ts3.zocomputer.io:10548

## Action Required
Service is not responding to restarts. Requires manual investigation:
1. Check service logs at `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
2. Verify workdir exists and preview build is available
3. Check for dependency issues or port conflicts

## Log Reference
See full restart log: `/home/workspace/Bxthre3/agents/logs/service-restarts.log`
