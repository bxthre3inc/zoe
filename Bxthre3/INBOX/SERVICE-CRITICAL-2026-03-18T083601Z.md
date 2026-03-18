# CRITICAL: valleyplayersclub Service Down

**Timestamp:** 2026-03-18 08:36:00 UTC  
**Severity:** CRITICAL  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo

## Status
- **HTTP Status:** 403 (Forbidden)
- **URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
- **Port:** 5175
- **Entrypoint:** `bash -c 'bun run preview -- --port $PORT'`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`

## Restart Attempts
| Attempt | Time | Result |
|---------|------|--------|
| 1 | 2026-03-18T08:34:00Z | Failed (still 403) |
| 2 | 2026-03-18T08:35:00Z | Failed (still 403) |

## Diagnostics
- Service logs show repeated: `error: script "preview" exited with code 143`
- Exit code 143 = SIGTERM (process terminated by signal)
- Vite preview process is being killed immediately after starting
- Possible causes: missing build artifacts, incorrect port config, or resource constraints

## Action Required
Manual investigation needed. Check:
1. Build artifacts exist (dist/ folder)
2. Package.json scripts configuration
3. Port environment variable handling
4. Run `bun run preview` manually to see detailed error

## Log Location
`/home/workspace/Bxthre3/agents/logs/service-restarts.log`
