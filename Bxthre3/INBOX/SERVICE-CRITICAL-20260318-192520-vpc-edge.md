# CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-18T19:25:20Z  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001

## Status
HTTP 502 (Bad Gateway) - Service is not responding correctly

## Restart Attempts
- Restart #1: Failed (still HTTP 502)
- Restart #2: Failed (still HTTP 502)

## Service Details
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- TCP Address: ts3.zocomputer.io:10834

## Action Required
Manual investigation needed. Service failed automatic recovery after 2 restart attempts.
