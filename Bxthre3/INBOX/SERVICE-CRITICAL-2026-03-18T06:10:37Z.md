# CRITICAL: VPC Services Down After 2 Restarts

**Escalation Time:** 2026-03-18T06:10:37Z (UTC)

## Affected Services

### vpc-edge
- **URL:** https://vpc-edge-brodiblanco.zocomputer.io
- **Service ID:** svc_WaYPe4_lNN0
- **Port:** 3001
- **Status:** HTTP 502 (Bad Gateway)
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **Entrypoint:** bun run src/index.ts

**Recovery Attempts:**
- 1st restart: 06:10:07Z - Failed (still 502)
- 2nd restart: 06:10:27Z - Failed (still 502)

---

### valleyplayersclub
- **URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
- **Service ID:** svc_e8ZjTEIhSIo
- **Port:** 5175
- **Status:** HTTP 403 (Forbidden)
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project
- **Entrypoint:** bash -c 'bun run preview -- --port $PORT'

**Recovery Attempts:**
- 1st restart: 06:10:07Z - Failed (still 403)
- 2nd restart: 06:10:27Z - Failed (still 403)

---

## Required Action

Both VPC services require manual investigation. The services are not responding with 2xx status codes despite 2 restart attempts each.

**Check logs:** /dev/shm/vpc-edge.log, /dev/shm/vpc-edge_err.log
**Check logs:** /dev/shm/valleyplayersclub.log, /dev/shm/valleyplayersclub_err.log
