# CRITICAL: ValleyPlayersClub Service Down

**Timestamp:** 2026-03-18T20:40:30Z
**Service:** valleyplayersclub
**Service ID:** svc_e8ZjTEIhSIo
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Port:** 5175

## Issue
Service returning HTTP 403 (Forbidden) after 2 restart attempts.

## Actions Taken
1. Initial check: 403
2. Restart attempt 1: No change (still 403)
3. Restart attempt 2: No change (still 403)

## Service Details
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- Protocol: http
- TCP Addr: ts3.zocomputer.io:10548

## Required Action
Manual investigation needed. Check server logs at:
- `/dev/shm/valleyplayersclub.log`
- `/dev/shm/valleyplayersclub_err.log`
