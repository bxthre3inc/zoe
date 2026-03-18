# SERVICE CRITICAL: valleyplayersclub

**Timestamp:** 2026-03-18T09:25:00Z  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Status:** DOWN (HTTP 403 - Forbidden)

## Issue Summary
Service has been DOWN for multiple check cycles and failed to recover after 2 restart attempts.

## Restart History
- Attempt 1: Restarted at 09:25:00Z → Still DOWN (403)
- Attempt 2: Restarted at 09:25:10Z → Still DOWN (403)

## Service Configuration
- **Port:** 5175
- **Entrypoint:** `bash -c 'bun run preview -- --port $PORT'`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- **Protocol:** HTTP

## Action Required
Manual intervention needed. The service appears to have a configuration or runtime issue that automatic restarts cannot resolve. Check:
1. Service logs at `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
2. Workdir for missing build artifacts (preview requires dist/)
3. Environment variables and configuration
4. Port binding issues
