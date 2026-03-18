# CRITICAL SERVICE ALERT

**Timestamp:** 2026-03-18 21:25:31 UTC

## Affected Service: vpc (svc_WaYPe4_lNN0)

| Property | Value |
|----------|-------|
| **Label** | vpc |
| **Port** | 3001 |
| **URL** | https://vpc-brodiblanco.zocomputer.io |
| **Entrypoint** | `bun run src/index.ts` |
| **Workdir** | /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server |

### Failure Details
- **Initial Status:** HTTP 502 (Bad Gateway)
- **After Restart 1:** HTTP 520 (Web Server Error)
- **After Restart 2:** HTTP 520 (Web Server Error)
- **Restart Attempts:** 2/2 failed

### Action Required
Service remains down after maximum restart attempts. Manual intervention required.

---

## Affected Service: valleyplayersclub (svc_e8ZjTEIhSIo)

| Property | Value |
|----------|-------|
| **Label** | valleyplayersclub |
| **Port** | 5175 |
| **URL** | https://valleyplayersclub-brodiblanco.zocomputer.io |
| **Entrypoint** | `bash -c 'bun run preview -- --port $PORT'` |
| **Workdir** | /home/workspace/Bxthre3/projects/the-valleyplayersclub-project |

### Failure Details
- **Initial Status:** HTTP 403 (Forbidden)
- **After Restart 1:** HTTP 403 (Forbidden)
- **After Restart 2:** HTTP 403 (Forbidden)
- **Restart Attempts:** 2/2 failed

### Action Required
Service returning 403 Forbidden - may be misconfigured or have authorization issues. Manual intervention required.

---

## Log Location
`/home/workspace/Bxthre3/agents/logs/service-restarts.log`

## Next Steps
1. Check service logs at `/dev/shm/vpc.log` and `/dev/shm/valleyplayersclub.log`
2. Verify service configurations in workdirs
3. Consider rebuilding/redeploying services
