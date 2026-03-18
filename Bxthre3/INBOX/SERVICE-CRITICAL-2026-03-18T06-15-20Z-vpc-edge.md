# CRITICAL SERVICE ALERT: vpc-edge

**Timestamp:** 2026-03-18T06:15:20Z  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001

## Issue Summary
Service is returning HTTP 502 (Bad Gateway) after 2 restart attempts.

## Restart Attempts
- Attempt #1: 06:15:00Z - Restart triggered, still 502 after 10s
- Attempt #2: 06:15:10Z - Restart triggered, still 502 after 10s

## Action Required
Manual investigation needed. Check:
- Server logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
- Loki logs at `http://localhost:3100`
- Service configuration and code in `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`

## Service Configuration
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- TCP Address: ts3.zocomputer.io:10834
