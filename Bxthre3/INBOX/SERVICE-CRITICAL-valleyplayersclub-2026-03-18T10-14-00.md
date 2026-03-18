# SERVICE CRITICAL: valleyplayersclub

**Timestamp:** 2026-03-18T10:14:00Z
**Service:** valleyplayersclub
**Service ID:** svc_e8ZjTEIhSIo
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Status:** DOWN (HTTP 403 Forbidden)

## Restart Attempts
- Attempt 1: 2026-03-18T10:09:00Z - No effect, still 403
- Attempt 2: 2026-03-18T10:13:00Z - No effect, still 403

## Service Details
- Port: 5175
- Entrypoint: bash -c 'bun run preview -- --port $PORT'
- Workdir: /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
- TCP: ts3.zocomputer.io:10548

## Log Analysis
Service logs show repeated cycles:
- Vite preview server starts on localhost:5175
- Suggests "use --host to expose" (network exposure issue)
- Process exits with code 143 (SIGTERM - graceful shutdown)
- Immediately restarts

## Issue
Vite preview server is likely blocking external access with its default security settings. The 403 Forbidden suggests the server is rejecting requests from non-localhost origins. The service may need:
1. `--host` flag to expose to network
2. CORS configuration
3. Vite preview security settings adjustment

## Action Required
Manual investigation needed. Check:
1. Vite preview configuration (vite.config.ts)
2. Add --host flag to preview command
3. Consider using proper server mode instead of preview for production
