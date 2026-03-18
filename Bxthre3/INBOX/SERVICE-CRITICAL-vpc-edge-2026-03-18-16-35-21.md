# CRITICAL: Service Down - vpc-edge

**Service:** vpc-edge  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001  
**Service ID:** svc_WaYPe4_lNN0  
**Detected:** 2026-03-18 16:35:21 UTC

## Status
- **HTTP Code:** 502 (Bad Gateway)
- **Check Status:** FAILED
- **Max Restart Attempts:** 2 (both failed)

## Actions Taken
1. 16:35:00 - Initial check: HTTP 502
2. 16:35:00 - Restart attempt 1
3. 16:35:10 - Verification: Still HTTP 502
4. 16:35:11 - Restart attempt 2 (final)
5. 16:35:21 - Verification: Still HTTP 502

## Service Configuration
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- Protocol: HTTP

## Required Action
Manual investigation required. Service restart attempts exhausted.
