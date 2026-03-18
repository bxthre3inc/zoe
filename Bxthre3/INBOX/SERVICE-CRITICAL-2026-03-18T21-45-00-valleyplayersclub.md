# 🚨 SERVICE CRITICAL: valleyplayersclub

**Timestamp:** 2026-03-18 21:45:00 UTC  
**Service:** valleyplayersclub (port 5175)  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Service ID:** svc_e8ZjTEIhSIo

## Status
- **HTTP Response:** 403 Forbidden
- **Response Time:** < 5 seconds
- **Consecutive Failures:** 2 restart attempts failed

## Actions Taken
1. Initial health check - FAILED (HTTP 403)
2. Restart attempt 1 - Service restarted, still returning 403 after 10s
3. Restart attempt 2 - Service restarted, still returning 403 after 10s

## Escalation Required
Automatic restarts failed. Manual intervention needed.

## Service Details
- **Entrypoint:** `bash -c 'bun run preview -- --port $PORT'`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- **Protocol:** HTTP
- **Registered URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
