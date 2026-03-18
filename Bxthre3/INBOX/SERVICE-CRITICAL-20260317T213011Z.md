# 🚨 CRITICAL: Service Down - vpc-edge

**Timestamp:** $(date -u '+%Y-%m-%dT%H:%M:%SZ')
**Service:** vpc-edge
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Port:** 3001
**Service ID:** svc_WaYPe4_lNN0

## Status
HTTP 502 (Bad Gateway) - Service unreachable

## Restart Attempts
- Restart 1: $(date -u '+%Y-%m-%dT%H:%M:%SZ') - Failed, still 502
- Restart 2: $(date -u '+%Y-%m-%dT%H:%M:%SZ') - Failed, still 502

## Service Config
- **Entrypoint:** bun run src/index.ts
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **Environment:** production
- **Domain:** vpc-edge-brodiblanco.zocomputer.io

## Required Action
Manual investigation needed. Service is not responding after automatic restarts.
Possible causes:
1. Application startup failure (check logs)
2. Database connectivity issues
3. Dependency problems
4. Port binding conflicts

## Check Logs
- Service stdout: /dev/shm/vpc-edge.log
- Service stderr: /dev/shm/vpc-edge_err.log
- Loki: http://localhost:3100

