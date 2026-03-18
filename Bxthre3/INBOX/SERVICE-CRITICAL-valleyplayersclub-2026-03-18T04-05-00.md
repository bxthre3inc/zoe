# 🚨 CRITICAL: valleyplayersclub Service Down

**Service:** valleyplayersclub  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Service ID:** svc_e8ZjTEIhSIo  
**Port:** 5175  
**Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project  
**Entrypoint:** bash -c 'bun run preview -- --port $PORT'

## Status
- **HTTP Code:** 403 (Forbidden)
- **Detected:** 2026-03-18 10:05:00 UTC
- **Attempts:** 2 restarts failed

## Restart History
1. Restart #1: 2026-03-18 10:05:00 UTC → Still returning HTTP 403
2. Restart #2: 2026-03-18 10:05:10 UTC → Still returning HTTP 403

## Action Required
Manual investigation needed. Check:
- Application logs: `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
- Loki logs for error patterns
- Preview server configuration (Vite/bun)
- Build artifacts exist in workdir
- Environment variables required

## Log Location
`/home/workspace/Bxthre3/agents/logs/service-restarts.log`
