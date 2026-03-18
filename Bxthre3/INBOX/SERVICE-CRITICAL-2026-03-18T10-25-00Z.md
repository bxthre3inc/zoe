# 🚨 CRITICAL: Service Failure - vpc-edge

**Service:** vpc-edge  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Service ID:** svc_WaYPe4_lNN0  
**Port:** 3001  
**Timestamp:** 2026-03-18T10:25:00Z  

## Status
- **HTTP Code:** 502 (Bad Gateway)
- **Response Time:** Within 5 seconds
- **Consecutive Failures:** 2 restart attempts failed

## Action History
1. First restart triggered - still returning 502
2. Second restart triggered - still returning 502

## Entrypoint
`bun run src/index.ts`

## Workdir
`/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`

## Required Action
Manual investigation required. Service may have:
- Application-level errors
- Dependency issues
- Configuration problems
- Resource constraints

Check service logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
