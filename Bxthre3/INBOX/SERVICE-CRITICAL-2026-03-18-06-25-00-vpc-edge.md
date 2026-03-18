# CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-18 06:25:00 UTC  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001

## Status
- **Initial Check:** HTTP 502 (Bad Gateway)
- **Restart Attempt #1:** Failed - Still HTTP 502
- **Restart Attempt #2:** Failed - Still HTTP 502

## Service Configuration
- **Protocol:** http
- **Entrypoint:** bun run src/index.ts
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **TCP Address:** ts3.zocomputer.io:10834
- **Created:** 2026-03-15T20:47:37.331005Z

## Action Required
Service is down after 2 restart attempts. Manual investigation needed.

## Check Command
```bash
curl -s -o /dev/null -w "%{http_code}" --max-time 5 https://vpc-edge-brodiblanco.zocomputer.io
```
