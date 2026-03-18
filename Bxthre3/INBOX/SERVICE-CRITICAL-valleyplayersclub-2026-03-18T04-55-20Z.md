# SERVICE CRITICAL: valleyplayersclub

**Timestamp:** 2026-03-18T04:55:20Z
**Service:** valleyplayersclub
**Service ID:** svc_e8ZjTEIhSIo
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Status:** DOWN after 2 restart attempts

## Failure Details
- HTTP Status Code: 403 (Forbidden)
- Port: 5175
- Entrypoint: `bash -c 'bun run preview -- --port $PORT'`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`

## Restart Attempts
- Attempt 1 (04:55:00Z): Restart initiated, HTTP 403 after 10s
- Attempt 2 (04:55:10Z): Restart initiated, HTTP 403 after 10s

## Action Required
Service remains down after maximum restart attempts. Manual investigation required:
- Check server logs at `/dev/shm/valleyplayersclub.log`
- Verify Vite preview configuration
- Review recent code changes or permission issues
