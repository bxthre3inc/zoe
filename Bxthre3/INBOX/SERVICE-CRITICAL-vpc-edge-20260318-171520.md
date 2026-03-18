# SERVICE CRITICAL: vpc-edge

**Timestamp:** 2026-03-18 17:15:20 UTC
**Service:** vpc-edge
**Service ID:** svc_WaYPe4_lNN0
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Port:** 3001
**Status:** CRITICAL - Service down after 2 restart attempts

## Problem Details
- Initial check: HTTP 502 (Bad Gateway)
- Restart attempt 1: Failed - still HTTP 502
- Restart attempt 2: Failed - still HTTP 502

## Service Configuration
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- Protocol: http
- Created: 2026-03-15T20:47:37.331005Z

## Action Required
Manual investigation required. Service is not responding to automated restarts.
Possible causes:
- Application crash on startup
- Missing dependencies
- Configuration error
- Port conflict
- Code issue in src/index.ts

## Log Reference
See `/home/workspace/Bxthre3/agents/logs/service-restarts.log` for full restart history.
