# CRITICAL: Service Down - vpc-edge

**Timestamp:** 2026-03-18T02:30:00Z
**Severity:** CRITICAL
**Service:** vpc-edge
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Service ID:** svc_WaYPe4_lNN0

## Status
Service is DOWN after 2 restart attempts.

## HTTP Response
- Initial check: HTTP 502 (Bad Gateway)
- After restart 1: HTTP 502
- After restart 2: HTTP 502

## Actions Taken
1. Detected failure at 2026-03-18T02:30:00Z
2. Restart attempt 1 - FAILED
3. Restart attempt 2 - FAILED

## Service Configuration
- Protocol: HTTP
- Port: 3001
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`

## Next Steps
Manual intervention required. Check:
- Application logs at `/dev/shm/vpc-edge.log`
- Application errors at `/dev/shm/vpc-edge_err.log`
- Server code for startup errors
- Dependencies and build status
