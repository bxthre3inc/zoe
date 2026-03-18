# SERVICE CRITICAL ALERT - vpc-edge

**Timestamp:** 2026-03-18 05:35:20 UTC  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001

## Status
**DOWN** - HTTP 502 (Bad Gateway)

## Restart Attempts
- Attempt 1/2: 2026-03-18 05:35:00 UTC - Failed (still 502)
- Attempt 2/2: 2026-03-18 05:35:10 UTC - Failed (still 502)

## Service Configuration
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- Protocol: HTTP
- TCP Address: ts3.zocomputer.io:10834

## Action Required
Service requires manual investigation. Automatic restarts failed to restore service.
