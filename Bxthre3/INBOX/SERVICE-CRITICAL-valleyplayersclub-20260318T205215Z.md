# CRITICAL: ValleyPlayersClub Service Down

**Timestamp:** $(date -u '+%Y-%m-%dT%H:%M:%SZ')
**Service:** valleyplayersclub
**Service ID:** svc_e8ZjTEIhSIo
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Port:** 5175
**Status:** DOWN

## Failure Details
- HTTP Code: 403 (Forbidden)
- Max Response Time: 5 seconds
- Restart Attempts: 2

## Actions Taken
1. Initial check failed with HTTP 403
2. Restart attempt 1 executed at $(date -u '+%Y-%m-%dT%H:%M:%SZ')
3. Restart attempt 2 executed at $(date -u '+%Y-%m-%dT%H:%M:%SZ')
4. Service remains down after maximum restart attempts

## Required Action
Manual investigation needed. Check:
- Service logs: /dev/shm/valleyplayersclub.log
- Error logs: /dev/shm/valleyplayersclub_err.log
- Workdir: /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
- Entrypoint: bash -c 'bun run preview -- --port $PORT'

