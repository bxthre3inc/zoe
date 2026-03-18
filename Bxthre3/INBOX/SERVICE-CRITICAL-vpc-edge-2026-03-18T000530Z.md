# CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-18T00:05:30Z  
**Service:** vpc-edge  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Service ID:** svc_WaYPe4_lNN0  
**Port:** 3001

## Issue
Service returning HTTP 502 after 2 restart attempts.

## Attempted Actions
1. First restart: 2026-03-18T00:05:20Z - Failed (still 502)
2. Second restart: 2026-03-18T00:05:30Z - Failed (still 502)

## Service Config
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- Protocol: http

## Required Action
Manual investigation needed. Check service logs at:
- /dev/shm/vpc-edge.log
- /dev/shm/vpc-edge_err.log
