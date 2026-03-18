# CRITICAL SERVICE ALERT: valleyplayersclub

**Timestamp:** 2026-03-18T06:15:20Z  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Port:** 5175

## Issue Summary
Service is returning HTTP 403 (Forbidden) after 2 restart attempts.

## Restart Attempts
- Attempt #1: 06:15:00Z - Restart triggered, still 403 after 10s
- Attempt #2: 06:15:10Z - Restart triggered, still 403 after 10s

## Action Required
Manual investigation needed. Check:
- Server logs at `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
- Loki logs at `http://localhost:3100`
- Service configuration and code in `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`

## Service Configuration
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- TCP Address: ts3.zocomputer.io:10548
