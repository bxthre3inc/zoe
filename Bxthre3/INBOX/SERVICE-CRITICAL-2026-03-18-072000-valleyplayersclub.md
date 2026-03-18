# 🚨 CRITICAL: valleyplayersclub Service Down

**Timestamp:** 2026-03-18 07:20:00 UTC
**Service:** valleyplayersclub
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Port:** 5175
**Service ID:** svc_e8ZjTEIhSIo

## Status
- **HTTP Response Code:** 403 (Forbidden)
- **Restart Attempts:** 2 (both failed)
- **Duration Down:** Unknown

## Restart History
1. Attempt 1 (07:20:00 UTC) - HTTP 403 after restart
2. Attempt 2 (07:20:00 UTC) - HTTP 403 after restart

## Service Configuration
- **Entrypoint:** bash -c 'bun run preview -- --port $PORT'
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
- **Protocol:** http
- **TCP Addr:** ts3.zocomputer.io:10548

## Required Action
Manual intervention needed. Possible causes:
- Preview server auth/configuration issue
- Missing/dist build files
- Environment variable issue
- Port binding or firewall issue

## Next Steps
1. Check service logs at `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
2. Verify build exists and preview can start locally
3. Check if preview server requires additional configuration
