# CRITICAL: valleyplayersclub Service Down

**Timestamp:** 2026-03-18 04:10:21 UTC
**Service:** valleyplayersclub
**Service ID:** svc_e8ZjTEIhSIo
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Port:** 5175

## Status

- **HTTP Code:** 403 (Forbidden)
- **Restart Attempts:** 2
- **Result:** FAILED - Service did not recover after 2 restart attempts

## Service Configuration

- **Entrypoint:** `bash -c 'bun run preview -- --port $PORT'`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- **Protocol:** http
- **TCP Address:** ts3.zocomputer.io:10548

## Actions Taken

1. [04:10:00Z] Detected service down (HTTP 403)
2. [04:10:00Z] Logged failure, initiated restart attempt 1
3. [04:10:10Z] Verified - still down (HTTP 403), initiated restart attempt 2
4. [04:10:20Z] Verified - still down (HTTP 403), escalating to critical

## Required Action

Manual investigation required. The service may have:
- Application-level errors preventing startup
- Missing dependencies or configuration issues
- Authentication/middleware issues causing 403 responses
- Code issues requiring developer intervention

Check service logs: `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
