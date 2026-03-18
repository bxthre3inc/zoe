# CRITICAL: valleyplayersclub Service Down

**Timestamp:** 2026-03-18 06:25:00 UTC  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Port:** 5175

## Status
- **Initial Check:** HTTP 403 (Forbidden)
- **Restart Attempt #1:** Failed - Still HTTP 403
- **Restart Attempt #2:** Failed - Still HTTP 403

## Service Configuration
- **Protocol:** http
- **Entrypoint:** bash -c 'bun run preview -- --port $PORT'
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
- **TCP Address:** ts3.zocomputer.io:10548
- **Created:** 2026-03-18T01:11:08.310528Z

## Action Required
Service is down after 2 restart attempts. Manual investigation needed.

## Check Command
```bash
curl -s -o /dev/null -w "%{http_code}" --max-time 5 https://valleyplayersclub-brodiblanco.zocomputer.io
```
