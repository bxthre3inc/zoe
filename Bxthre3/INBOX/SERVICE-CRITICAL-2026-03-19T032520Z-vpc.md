# SERVICE CRITICAL ALERT: vpc

**Timestamp:** 2026-03-19T03:25:20Z
**Severity:** CRITICAL
**Status:** DOWN AFTER 2 RESTART ATTEMPTS

## Service Details
- **Service ID:** svc_WaYPe4_lNN0
- **Label:** vpc
- **URL:** https://vpc-edge-brodiblanco.zocomputer.io
- **Port:** 3001
- **Protocol:** HTTP
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **Entrypoint:** bun run src/index.ts

## Failure History
1. Initial check: HTTP 502 (Bad Gateway)
2. Restart attempt 1: HTTP 502 (after restart)
3. Restart attempt 2: HTTP 502 (after restart)

## Action Required
Service requires manual intervention. Automatic restarts failed to restore service.

## Logs
Check: /home/workspace/Bxthre3/agents/logs/service-restarts.log
Service logs: /dev/shm/vpc.log, /dev/shm/vpc_err.log
