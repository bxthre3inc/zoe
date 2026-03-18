# CRITICAL: Service Down - valleyplayersclub

**Timestamp:** 2026-03-18T02:30:00Z
**Severity:** CRITICAL
**Service:** valleyplayersclub
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Service ID:** svc_e8ZjTEIhSIo

## Status
Service is DOWN after 2 restart attempts.

## HTTP Response
- Initial check: HTTP 403 (Forbidden)
- After restart 1: HTTP 403
- After restart 2: HTTP 403

## Actions Taken
1. Detected failure at 2026-03-18T02:30:00Z
2. Restart attempt 1 - FAILED
3. Restart attempt 2 - FAILED

## Service Configuration
- Protocol: HTTP
- Port: 5175
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`

## Next Steps
Manual intervention required. Check:
- Application logs at `/dev/shm/valleyplayersclub.log`
- Application errors at `/dev/shm/valleyplayersclub_err.log`
- Preview server configuration
- Build output and dependencies
