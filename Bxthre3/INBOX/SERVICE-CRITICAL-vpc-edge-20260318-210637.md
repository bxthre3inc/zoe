# 🚨 CRITICAL: vpc-edge Service Down

**Timestamp:** $(date '+%Y-%m-%d %H:%M:%S UTC')
**Service:** vpc-edge
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Service ID:** svc_WaYPe4_lNN0

## Status
- **HTTP Code:** 502 (Bad Gateway)
- **Status:** DOWN - Not responding with 200-299

## Restart Attempts
1. First restart attempted - Service still returned 502
2. Second restart attempted - Service still returned 502

## Service Configuration
- **Port:** 3001
- **Entrypoint:** bun run src/index.ts
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **Protocol:** http

## Required Action
Service failed automatic recovery after 2 restart attempts. Manual investigation required.

Check service logs at: /dev/shm/vpc.log and /dev/shm/vpc_err.log
