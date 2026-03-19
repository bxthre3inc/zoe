# 🚨 CRITICAL: vpc Service Down

**Timestamp:** 2026-03-18T23:50:30Z
**Service:** vpc (svc_WaYPe4_lNN0)
**URL:** https://vpc-brodiblanco.zocomputer.io
**Status:** DOWN after 2 restart attempts

## Failure History
- Initial check: HTTP 502
- Restart 1: Triggered, waited 10s → HTTP 520
- Restart 2: Triggered, waited 10s → HTTP 520 (current)

## Service Details
- Port: 3001
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- TCP Addr: ts3.zocomputer.io:10834

## Action Required
Manual investigation needed. Service failing to respond after 2 automatic restarts.
Possible causes: application crash, dependency failure, port conflict, or code error.
