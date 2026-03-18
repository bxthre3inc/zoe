# 🚨 CRITICAL: vpc-edge Service Down

**Service:** vpc-edge  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Service ID:** svc_WaYPe4_lNN0  
**Port:** 3001  
**Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server  
**Entrypoint:** bun run src/index.ts

## Status
- **HTTP Code:** 502 (Bad Gateway)
- **Detected:** 2026-03-18 10:05:00 UTC
- **Attempts:** 2 restarts failed

## Restart History
1. Restart #1: 2026-03-18 10:05:00 UTC → Still returning HTTP 502
2. Restart #2: 2026-03-18 10:05:10 UTC → Still returning HTTP 502

## Action Required
Manual investigation needed. Check:
- Application logs: `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
- Loki logs for error patterns
- Service dependencies (database, external APIs)
- Recent code changes in workdir

## Log Location
`/home/workspace/Bxthre3/agents/logs/service-restarts.log`
