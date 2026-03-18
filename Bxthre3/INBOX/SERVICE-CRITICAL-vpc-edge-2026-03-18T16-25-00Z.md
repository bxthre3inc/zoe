# CRITICAL: Service Down - vpc-edge

**Timestamp:** 2026-03-18T16:25:00Z  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001

## Status

**DOWN** - HTTP 502 Bad Gateway

## Restart Attempts

| Attempt | Time | Result |
|---------|------|--------|
| 1 | 2026-03-18T16:25:00Z | Failed - Still 502 |
| 2 | 2026-03-18T16:25:10Z | Failed - Still 502 |

## Service Configuration

- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **Protocol:** http
- **TCP Address:** ts3.zocomputer.io:10834

## Required Action

Manual investigation required. Service failed to recover after 2 automated restart attempts. Check:
1. Application logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
2. Code/configuration issues in the server directory
3. Dependencies and build status
