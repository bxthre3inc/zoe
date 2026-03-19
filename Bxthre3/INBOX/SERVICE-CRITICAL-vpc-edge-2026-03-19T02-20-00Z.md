# CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-19T02:20:00Z
**Service:** vpc-edge
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Service ID:** svc_WaYPe4_lNN0
**Port:** 3001

## Status
- HTTP Response: 502 (Bad Gateway)
- Restart Attempts: 2 (both failed)
- Service remains down after restarts

## Action Required
Manual intervention needed. The service is not recovering after automatic restarts.

## Service Details
- Label: vpc
- Protocol: http
- Local Port: 3001
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- TCP Address: ts3.zocomputer.io:10834

## Log Location
`/home/workspace/Bxthre3/agents/logs/service-restarts.log`
