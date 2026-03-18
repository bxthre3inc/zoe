# CRITICAL: valleyplayersclub Service Down

**Timestamp:** 2026-03-18 22:15:00 UTC  
**Service:** valleyplayersclub (port 5175)  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Service ID:** svc_e8ZjTEIhSIo

## Status
- **HTTP Code:** 403 (Forbidden)
- **Response Time:** < 5 seconds
- **Restart Attempts:** 2/2 (both failed)

## Actions Taken
1. Initial check at 22:15:00Z - HTTP 403 detected
2. Restart attempt 1 at 22:15:00Z - Service restarted
3. Verification after 10s - Still HTTP 403
4. Restart attempt 2 at 22:15:10Z - Service restarted
5. Final verification after 10s - Still HTTP 403

## Required Action
Manual investigation required. Check service logs at:
- `/dev/shm/valleyplayersclub.log`
- `/dev/shm/valleyplayersclub_err.log`

## Service Config
- **Entrypoint:** `bash -c 'bun run preview -- --port $PORT'`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- **Local Port:** 5175
