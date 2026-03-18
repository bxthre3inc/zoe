# CRITICAL SERVICE ALERT: vpc-edge

**Status**: DOWN after 2 restart attempts
**Timestamp**: $(date -Iseconds)
**Service ID**: svc_WaYPe4_lNN0
**URL**: https://vpc-edge-brodiblanco.zocomputer.io
**Port**: 3001
**HTTP Code**: 502

## Service Details
- **Entrypoint**: bun run src/index.ts
- **Workdir**: /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **Protocol**: http
- **Local Port**: 3001

## Restart History
1. First restart attempted - service remained down (HTTP 502)
2. Second restart attempted - service remained down (HTTP 502)

## Action Required
Manual investigation required. Check service logs at:
- /dev/shm/vpc-edge.log (stdout)
- /dev/shm/vpc-edge_err.log (stderr)

Or query Loki logs for recent errors.
