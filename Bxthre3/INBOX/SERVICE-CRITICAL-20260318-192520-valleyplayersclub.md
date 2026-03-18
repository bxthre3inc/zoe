# CRITICAL: valleyplayersclub Service Down

**Timestamp:** 2026-03-18T19:25:20Z  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Port:** 5175

## Status
HTTP 403 (Forbidden) - Service may be running but access is blocked

## Restart Attempts
- Restart #1: Failed (still HTTP 403)
- Restart #2: Failed (still HTTP 403)

## Service Details
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- TCP Address: ts3.zocomputer.io:10548

## Action Required
Manual investigation needed. Service failed automatic recovery after 2 restart attempts.

**Note:** 403 status suggests the service may be running but rejecting requests - could be auth/configuration issue rather than a crash.
