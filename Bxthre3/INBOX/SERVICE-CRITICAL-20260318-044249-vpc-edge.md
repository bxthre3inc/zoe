# CRITICAL: Service vpc-edge Down

**Detected:** $(date -u '+%Y-%m-%d %H:%M:%S UTC')
**Service:** vpc-edge
**Service ID:** svc_WaYPe4_lNN0
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Port:** 3001
**Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
**Entrypoint:** bun run src/index.ts

## Status
- HTTP Response: 502 (Bad Gateway)
- Restart Attempts: 2 (failed)

## Actions Taken
1. Initial check: HTTP 502 detected
2. Restart attempt 1: Service restarted, still returning 502 after 10s
3. Restart attempt 2: Service restarted, still returning 502 after 10s

## Required Action
Manual investigation needed. Service may have:
- Application-level error preventing startup
- Dependency issue
- Configuration error
- Resource exhaustion

Check service logs at: /dev/shm/vpc-edge.log and /dev/shm/vpc-edge_err.log
