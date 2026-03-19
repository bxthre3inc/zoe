# CRITICAL: valleyplayersclub Service Down

**Timestamp:** 2026-03-19 04:05:00 UTC
**Service:** valleyplayersclub (svc_e8ZjTEIhSIo)
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Port:** 5175

## Status
- HTTP Code: 403 (Forbidden)
- Response Time: < 5 seconds (timeout configured)

## Restart Attempts
1. First restart: Triggered, waited 10s, still returning 403
2. Second restart: Triggered, waited 10s, still returning 403

## Service Configuration
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- Protocol: HTTP
- Local Port: 5175

## Action Required
Service requires manual investigation. Automatic restarts failed to restore service.
