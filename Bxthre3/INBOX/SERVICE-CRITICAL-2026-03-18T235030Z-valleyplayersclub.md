# 🚨 CRITICAL: valleyplayersclub Service Down

**Timestamp:** 2026-03-18T23:50:30Z
**Service:** valleyplayersclub (svc_e8ZjTEIhSIo)
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Status:** DOWN after 2 restart attempts

## Failure History
- Initial check: HTTP 403
- Restart 1: Triggered, waited 10s → HTTP 403
- Restart 2: Triggered, waited 10s → HTTP 403 (current)

## Service Details
- Port: 5175
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- TCP Addr: ts3.zocomputer.io:10548

## Action Required
Manual investigation needed. Service failing with HTTP 403 after 2 automatic restarts.
HTTP 403 suggests authentication/permission issue or the preview server may be rejecting requests.
Check if the preview server is configured correctly and accessible.
