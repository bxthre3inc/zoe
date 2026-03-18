# SERVICE CRITICAL: valleyplayersclub

**Timestamp:** 2026-03-18T11:40:29Z
**Service:** valleyplayersclub
**Service ID:** svc_e8ZjTEIhSIo
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Port:** 5175

## Status
- **HTTP Code:** 403 (Forbidden)
- **Max 2 restart attempts exhausted:** YES

## Restart History
1. First restart: 2026-03-18T11:40:05Z - Result: Still down (403)
2. Second restart: 2026-03-18T11:40:18Z - Result: Still down (403)

## Action Required
Manual intervention required. Service appears to have a deeper issue preventing startup.

## Service Config
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
