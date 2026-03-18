# CRITICAL: Service Down - valleyplayersclub

**Timestamp:** 2026-03-18T16:25:00Z  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Port:** 5175

## Status

**DOWN** - HTTP 403 Forbidden

## Restart Attempts

| Attempt | Time | Result |
|---------|------|--------|
| 1 | 2026-03-18T16:25:00Z | Failed - Still 403 |
| 2 | 2026-03-18T16:25:10Z | Failed - Still 403 |

## Service Configuration

- **Entrypoint:** `bash -c 'bun run preview -- --port $PORT'`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- **Protocol:** http
- **TCP Address:** ts3.zocomputer.io:10548

## Required Action

Manual investigation required. Service failed to recover after 2 automated restart attempts. Check:
1. Application logs at `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
2. Vite preview configuration and build status
3. Verify project has been built (`dist` folder exists)
