# 🚨 CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-18 12:15:20 UTC  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001  

## Status
- **Initial Check:** HTTP 502 (Bad Gateway)
- **Restart Attempt 1:** Failed - still HTTP 502
- **Restart Attempt 2:** Failed - still HTTP 502
- **Max Restart Attempts Reached:** YES

## Service Configuration
- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **Protocol:** http
- **TCP Address:** ts3.zocomputer.io:10834

## Action Required
Service restart attempts exhausted. Manual intervention required to diagnose and resolve root cause.

## Log Reference
`/home/workspace/Bxthre3/agents/logs/service-restarts.log`
