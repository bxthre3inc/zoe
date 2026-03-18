# SERVICE CRITICAL: valleyplayersclub

**Status:** DOWN after 2 restart attempts  
**Service:** valleyplayersclub  
**Service ID:** svc_e8ZjTEIhSIo  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Port:** 5175  
**HTTP Status:** 403 (Forbidden)

## Timeline

| Time | Action | Result |
|------|--------|--------|
| 2026-03-18T09:35:00Z | Initial Check | DOWN (HTTP 403) |
| 2026-03-18T09:35:00Z | Restart #1 | Triggered |
| 2026-03-18T09:35:10Z | Verify after restart #1 | Still DOWN (HTTP 403) |
| 2026-03-18T09:35:10Z | Restart #2 | Triggered |
| 2026-03-18T09:35:20Z | Verify after restart #2 | Still DOWN (HTTP 403) |
| 2026-03-18T09:35:20Z | **ESCALATION** | CRITICAL alert created |

## Service Configuration

- **Entrypoint:** `bash -c 'bun run preview -- --port $PORT'`
- **Working Directory:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
- **Protocol:** HTTP
- **TCP Address:** ts3.zocomputer.io:10548

## Action Required

Manual intervention needed. Service remains down after maximum restart attempts.

Check:
1. Application logs at `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
2. Server code for runtime errors
3. Dependencies and environment configuration
4. Note: 403 Forbidden may indicate authentication/configuration issue
