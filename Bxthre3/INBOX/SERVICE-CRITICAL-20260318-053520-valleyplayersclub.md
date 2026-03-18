# SERVICE CRITICAL ALERT - valleyplayersclub

**Timestamp:** 2026-03-18 05:35:20 UTC  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Port:** 5175

## Status
**DOWN** - HTTP 403 (Forbidden)

## Restart Attempts
- Attempt 1/2: 2026-03-18 05:35:00 UTC - Failed (still 403)
- Attempt 2/2: 2026-03-18 05:35:10 UTC - Failed (still 403)

## Service Configuration
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- Protocol: HTTP
- TCP Address: ts3.zocomputer.io:10548

## Action Required
Service requires manual investigation. Automatic restarts failed to restore service.
