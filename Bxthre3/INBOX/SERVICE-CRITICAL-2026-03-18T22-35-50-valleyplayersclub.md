# CRITICAL SERVICE FAILURE: valleyplayersclub

**Timestamp:** 2026-03-18 22:35:50 UTC
**Service:** valleyplayersclub (svc_e8ZjTEIhSIo)
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Port:** 5175
**Entrypoint:** bash -c 'bun run preview -- --port $PORT'
**Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project

## Status History
- Initial Check: HTTP 403 (Forbidden)
- Restart Attempt 1: Failed - HTTP 403
- Restart Attempt 2: Failed - HTTP 403 (Forbidden)

## Current Status
**DOWN** - Service did not recover after 2 restart attempts

## Action Required
Manual investigation needed. Check:
1. Application logs: /dev/shm/valleyplayersclub.log and /dev/shm/valleyplayersclub_err.log
2. Source code in workdir
3. Dependencies and preview configuration
