# 🚨 CRITICAL: valleyplayersclub Service Down

**Timestamp:** $(date '+%Y-%m-%d %H:%M:%S UTC')
**Service:** valleyplayersclub (port 5175)
**Service ID:** svc_e8ZjTEIhSIo
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**HTTP Code:** 403 (Forbidden)

## Issue
Service is returning HTTP 403 and did not recover after 2 restart attempts.

## Actions Taken
1. Initial check: Service down (HTTP 403)
2. Restart attempt 1: Failed
3. Restart attempt 2: Failed

## Required Action
Manual investigation needed. Check:
- Server logs: /dev/shm/valleyplayersclub.log and /dev/shm/valleyplayersclub_err.log
- Service configuration
- Preview server health (bun run preview)
- Port binding issues

## Next Steps
- [ ] Review server logs for errors
- [ ] Check if preview server is binding correctly
- [ ] Verify the dist folder exists for preview
- [ ] Consider build step if application files are missing
