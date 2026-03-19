# CRITICAL: valleyplayersclub Service Down

**Timestamp:** 2026-03-19T01:10:50Z  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Port:** 5175  
**Status:** DOWN

## Error Details
- HTTP Response Code: 403 (Forbidden)
- Response Time: Within 5 seconds

## Restart Attempts
1. **First Restart:** 2026-03-19T01:10:30Z - FAILED (still 403)
2. **Second Restart:** 2026-03-19T01:10:50Z - FAILED (still 403)

## Service Configuration
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- Protocol: HTTP
- TCP Address: ts3.zocomputer.io:10548

## Action Required
Manual intervention required. Service has failed to recover after 2 automatic restart attempts.

## Log Location
`/home/workspace/Bxthre3/agents/logs/service-restarts.log`
