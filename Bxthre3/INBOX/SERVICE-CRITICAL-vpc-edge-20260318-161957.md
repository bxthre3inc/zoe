# 🚨 CRITICAL: vpc-edge Service Down

**Timestamp:** $(date -u +'%Y-%m-%d %H:%M:%S UTC')
**Service:** vpc-edge
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Port:** 3001
**Service ID:** svc_WaYPe4_lNN0

## Status
- HTTP Response: 502 (Bad Gateway)
- Max restart attempts (2) exhausted
- Service remains DOWN after automated recovery

## Actions Taken
1. First restart attempt at $(date -u +'%Y-%m-%d %H:%M:%S UTC' -d '40 seconds ago') - FAILED
2. Second restart attempt at $(date -u +'%Y-%m-%d %H:%M:%S UTC' -d '20 seconds ago') - FAILED

## Entrypoint
`bun run src/index.ts`

## Workdir
`/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`

## Required Action
Manual investigation required. Check:
- Application logs at /dev/shm/vpc-edge.log
- Source code for runtime errors
- Dependencies and build status
