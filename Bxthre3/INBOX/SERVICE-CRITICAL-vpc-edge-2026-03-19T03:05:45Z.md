# CRITICAL SERVICE ALERT: vpc-edge

**Timestamp:** 2026-03-19T03:05:45Z
**Severity:** CRITICAL
**Service:** vpc-edge (svc_WaYPe4_lNN0)
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Port:** 3001

## Status
Service is DOWN after 2 restart attempts.

## HTTP Check Results
- Initial check: HTTP 502 (Bad Gateway)
- After restart attempt 1: HTTP 502 (Bad Gateway)
- After restart attempt 2: HTTP 502 (Bad Gateway)

## Actions Taken
1. First restart triggered at ~03:05:15Z
2. Second restart triggered at ~03:05:35Z
3. Both restarts failed to restore service

## Service Configuration
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- Protocol: http
- Port: 3001

## Required Action
Manual investigation required. Check:
- Application logs at `/dev/shm/vpc.log` and `/dev/shm/vpc_err.log`
- Source code in workdir for startup errors
- Dependencies and environment issues
