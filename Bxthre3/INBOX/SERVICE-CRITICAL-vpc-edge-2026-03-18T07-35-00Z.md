# CRITICAL: vpc-edge Service Down

**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001  

## Status
- **HTTP Response:** 502 (Bad Gateway)
- **First Detected:** 2026-03-18T07:35:00Z
- **Restart Attempts:** 2 (both failed)
- **Escalation Level:** CRITICAL

## Actions Taken
1. Initial health check failed (HTTP 502)
2. Restart Attempt 1 - service restarted, still returning 502 after 10s
3. Restart Attempt 2 - service restarted, still returning 502 after 10s

## Service Details
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **Entrypoint:** bun run src/index.ts
- **TCP Addr:** ts3.zocomputer.io:10834

## Required Action
Manual intervention required. Check application logs and service configuration.
