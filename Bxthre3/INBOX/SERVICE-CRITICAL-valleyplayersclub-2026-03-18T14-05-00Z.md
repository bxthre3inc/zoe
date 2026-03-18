# CRITICAL: Service Failure - valleyplayersclub

**Timestamp:** 2026-03-18 14:05:00 UTC
**Service:** valleyplayersclub
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Service ID:** svc_e8ZjTEIhSIo
**Port:** 5175

## Status
- **HTTP Response:** 403 (Forbidden)
- **Restart Attempts:** 2 (both failed)
- **Current State:** DOWN

## Actions Taken
1. Initial check: HTTP 403
2. Restart attempt 1: Service restarted, waited 10s, still HTTP 403
3. Restart attempt 2: Service restarted, waited 10s, still HTTP 403

## Escalation Required
Service has not recovered after 2 restart attempts. Manual intervention required.

## Service Configuration
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- Protocol: http
- TCP Address: ts3.zocomputer.io:10548
