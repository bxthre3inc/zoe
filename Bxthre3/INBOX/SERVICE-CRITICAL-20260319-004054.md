# SERVICE CRITICAL ALERT

**Timestamp:** $(date -u '+%Y-%m-%d %H:%M:%S UTC')
**Agent:** Service Restarter Agent
**Cycle:** 05fb4a8d-8444-461c-bbd8-5574b335d8f8

## Failed Services (2 restart attempts exhausted)

### vpc-edge (svc_WaYPe4_lNN0)
- URL: https://vpc-edge-brodiblanco.zocomputer.io
- Port: 3001
- Status: HTTP 502 Bad Gateway
- Restarts attempted: 2
- Entrypoint: bun run src/index.ts
- Workdir: /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server

### valleyplayersclub (svc_e8ZjTEIhSIo)
- URL: https://valleyplayersclub-brodiblanco.zocomputer.io
- Port: 5175
- Status: HTTP 403 Forbidden
- Restarts attempted: 2
- Entrypoint: bash -c 'bun run preview -- --port $PORT'
- Workdir: /home/workspace/Bxthre3/projects/the-valleyplayersclub-project

## Action Required
Manual intervention required. Services unresponsive after maximum restart attempts.
Check service logs and deployment status.
