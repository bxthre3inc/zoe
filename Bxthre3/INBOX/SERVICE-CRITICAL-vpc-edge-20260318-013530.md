# CRITICAL SERVICE ALERT: vpc-edge

**Timestamp:** 2026-03-18 01:35:30 UTC  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001

## Status
🔴 **DOWN** - Service unresponsive after maximum restart attempts

## Error Details
- **HTTP Code:** 502 (Bad Gateway)
- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **TCP Addr:** ts3.zocomputer.io:10834

## Actions Taken
1. Initial check: HTTP 502 detected
2. Restart attempt 1: Triggered, waited 10s, still 502
3. Restart attempt 2: Triggered, waited 10s, still 502

## Manual Intervention Required
Service requires investigation beyond automatic restart capabilities. Possible causes:
- Application-level error (check logs at `/dev/shm/vpc-edge.log`)
- Dependency/build issue
- Database or upstream service failure

## Check Command
```bash
curl -s -o /dev/null -w "%{http_code}" --max-time 5 https://vpc-edge-brodiblanco.zocomputer.io
```
