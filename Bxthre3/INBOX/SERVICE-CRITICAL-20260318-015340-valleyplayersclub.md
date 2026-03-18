# CRITICAL SERVICE ALERT: valleyplayersclub

**Status**: DOWN after 2 restart attempts
**Timestamp**: $(date -Iseconds)
**Service ID**: svc_e8ZjTEIhSIo
**URL**: https://valleyplayersclub-brodiblanco.zocomputer.io
**Port**: 5175
**HTTP Code**: 403

## Service Details
- **Entrypoint**: bash -c 'bun run preview -- --port $PORT'
- **Workdir**: /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
- **Protocol**: http
- **Local Port**: 5175

## Restart History
1. First restart attempted - service remained down (HTTP 403)
2. Second restart attempted - service remained down (HTTP 403)

## Action Required
Manual investigation required. Check service logs at:
- /dev/shm/valleyplayersclub.log (stdout)
- /dev/shm/valleyplayersclub_err.log (stderr)

Or query Loki logs for recent errors.

Note: HTTP 403 may indicate authentication/permissions issue rather than service being completely down.
