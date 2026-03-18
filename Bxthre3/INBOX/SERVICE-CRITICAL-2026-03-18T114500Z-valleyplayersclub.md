# CRITICAL: Service Down - valleyplayersclub

**Timestamp:** 2026-03-18T11:45:00Z  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Status:** DOWN

## Issue Details
- HTTP Response Code: 403 (Forbidden)
- Max restart attempts reached: 2
- Automatic restarts failed to resolve the issue

## Service Configuration
- Port: 5175
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- TCP Address: ts3.zocomputer.io:10548

## Action History
1. Initial check failed (HTTP 403) - 2026-03-18T11:45:00Z
2. Restart attempt 1 triggered
3. Check after restart 1 - still HTTP 403
4. Restart attempt 2 triggered
5. Check after restart 2 - still HTTP 403

## Required Action
Manual investigation required. Check:
- Application logs at `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
- Preview server configuration
- Service configuration and environment variables

**Note:** 403 error suggests auth/middleware issue rather than a crash - may need code-level fix.
