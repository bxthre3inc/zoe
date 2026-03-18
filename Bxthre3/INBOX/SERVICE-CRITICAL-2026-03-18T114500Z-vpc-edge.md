# CRITICAL: Service Down - vpc-edge

**Timestamp:** 2026-03-18T11:45:00Z  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Status:** DOWN

## Issue Details
- HTTP Response Code: 502 (Bad Gateway)
- Max restart attempts reached: 2
- Automatic restarts failed to resolve the issue

## Service Configuration
- Port: 3001
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- TCP Address: ts3.zocomputer.io:10834

## Action History
1. Initial check failed (HTTP 502) - 2026-03-18T11:45:00Z
2. Restart attempt 1 triggered
3. Check after restart 1 - still HTTP 502
4. Restart attempt 2 triggered
5. Check after restart 2 - still HTTP 502

## Required Action
Manual investigation required. Check:
- Application logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
- Server code for errors in `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- Service configuration and environment variables
