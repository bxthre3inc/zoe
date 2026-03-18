# 🚨 CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-18T17:20:20Z  
**Service:** vpc-edge  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Status:** DOWN (HTTP 502 - Bad Gateway)

## Service Details
- **Service ID:** svc_WaYPe4_lNN0
- **Port:** 3001
- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **Protocol:** http

## Restart Attempts
| Attempt | Time | Result |
|---------|------|--------|
| 1 | 17:20:00Z | HTTP 502 |
| 2 | 17:20:10Z | HTTP 502 |

## Required Action
Service has failed automatic recovery. Manual investigation required.

Possible causes:
- Application crash or error in `src/index.ts`
- Missing dependencies or build issues
- Port binding issues
- Resource constraints

## Log Location
`/home/workspace/Bxthre3/agents/logs/service-restarts.log`
