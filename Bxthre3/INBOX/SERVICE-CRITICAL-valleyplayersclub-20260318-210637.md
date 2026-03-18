# 🚨 CRITICAL: valleyplayersclub Service Down

**Timestamp:** $(date '+%Y-%m-%d %H:%M:%S UTC')
**Service:** valleyplayersclub
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Service ID:** svc_e8ZjTEIhSIo

## Status
- **HTTP Code:** 403 (Forbidden)
- **Status:** DOWN - Not responding with 200-299

## Restart Attempts
1. First restart attempted - Service still returned 403
2. Second restart attempted - Service still returned 403

## Service Configuration
- **Port:** 5175
- **Entrypoint:** bash -c 'bun run preview -- --port $PORT'
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
- **Protocol:** http

## Required Action
Service failed automatic recovery after 2 restart attempts. Manual investigation required.

Check service logs at: /dev/shm/valleyplayersclub.log and /dev/shm/valleyplayersclub_err.log
