# CRITICAL: valleyplayersclub Service Failure

## Service Details
- **Name:** valleyplayersclub
- **Service ID:** svc_e8ZjTEIhSIo
- **Port:** 5175
- **URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
- **Entrypoint:** bash -c 'bun run preview -- --port $PORT'

## Failure Report
- **Timestamp (UTC):** 2026-03-18 05:20:00
- **User Timezone:** America/Denver (2026-03-18 05:20:00 MDT)
- **HTTP Status:** 403 (Forbidden)
- **Status:** Service DOWN - requires manual intervention

## Restart History
1. Initial check: 403
2. Restart attempt 1: Triggered → Still 403 after 10s
3. Restart attempt 2: Triggered → Still 403 after 10s

## Action Required
Service failed to recover after 2 automatic restart attempts. Manual investigation needed:
- Check server logs at /dev/shm/valleyplayersclub.log and /dev/shm/valleyplayersclub_err.log
- Verify bun preview build and dependencies
- Investigate any recent code or configuration changes

---
Logged by Service Restarter Agent
