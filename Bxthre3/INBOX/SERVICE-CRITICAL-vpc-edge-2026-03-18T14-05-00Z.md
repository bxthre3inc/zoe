# CRITICAL: Service Failure - vpc-edge

**Timestamp:** 2026-03-18 14:05:00 UTC
**Service:** vpc-edge
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Service ID:** svc_WaYPe4_lNN0
**Port:** 3001

## Status
- **HTTP Response:** 502 (Bad Gateway)
- **Restart Attempts:** 2 (both failed)
- **Current State:** DOWN

## Actions Taken
1. Initial check: HTTP 502
2. Restart attempt 1: Service restarted, waited 10s, still HTTP 502
3. Restart attempt 2: Service restarted, waited 10s, still HTTP 502

## Escalation Required
Service has not recovered after 2 restart attempts. Manual intervention required.

## Service Configuration
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- Protocol: http
- TCP Address: ts3.zocomputer.io:10834
