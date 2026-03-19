# CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-19T01:10:50Z  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001  
**Status:** DOWN

## Error Details
- HTTP Response Code: 502 (Bad Gateway)
- Response Time: Within 5 seconds

## Restart Attempts
1. **First Restart:** 2026-03-19T01:10:30Z - FAILED (still 502)
2. **Second Restart:** 2026-03-19T01:10:50Z - FAILED (still 502)

## Service Configuration
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- Protocol: HTTP
- TCP Address: ts3.zocomputer.io:10834

## Action Required
Manual intervention required. Service has failed to recover after 2 automatic restart attempts.

## Log Location
`/home/workspace/Bxthre3/agents/logs/service-restarts.log`
