# 🚨 SERVICE CRITICAL ALERT: valleyplayersclub

**Timestamp:** 2026-03-18 04:35:45 UTC  
**Service:** valleyplayersclub  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Service ID:** svc_e8ZjTEIhSIo  
**Port:** 5175  
**Status:** DOWN AFTER 2 RESTART ATTEMPTS

## Failure Details

- **Initial Check:** HTTP 403 (Forbidden)
- **Restart Attempt 1:** Failed - HTTP 403
- **Restart Attempt 2:** Failed - HTTP 403

## Service Configuration

```
Entrypoint: bash -c 'bun run preview -- --port $PORT'
Workdir: /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
Protocol: http
Local Port: 5175
```

## Action Required

Manual investigation needed. Service has failed 2 automatic restart attempts.
- Check server logs at `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
- HTTP 403 suggests authentication/authorization or CORS configuration issue
- Verify workdir has valid preview build (bun run preview requires dist/build folder)
- Check for port conflicts or dependency issues
