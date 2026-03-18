# CRITICAL: valleyplayersclub Service Down

**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Port:** 5175  

## Status
- **HTTP Response:** 403 (Forbidden)
- **First Detected:** 2026-03-18T07:35:00Z
- **Restart Attempts:** 2 (both failed)
- **Escalation Level:** CRITICAL

## Actions Taken
1. Initial health check failed (HTTP 403)
2. Restart Attempt 1 - service restarted, still returning 403 after 10s
3. Restart Attempt 2 - service restarted, still returning 403 after 10s

## Service Details
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
- **Entrypoint:** bash -c 'bun run preview -- --port $PORT'
- **TCP Addr:** ts3.zocomputer.io:10548

## Required Action
Manual intervention required. Check application logs and service configuration. 403 suggests the app may be rejecting requests or missing auth configuration.
