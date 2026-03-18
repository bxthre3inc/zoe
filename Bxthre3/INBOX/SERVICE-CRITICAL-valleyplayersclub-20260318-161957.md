# 🚨 CRITICAL: valleyplayersclub Service Down

**Timestamp:** $(date -u +'%Y-%m-%d %H:%M:%S UTC')
**Service:** valleyplayersclub
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Port:** 5175
**Service ID:** svc_e8ZjTEIhSIo

## Status
- HTTP Response: 403 (Forbidden)
- Max restart attempts (2) exhausted
- Service remains DOWN after automated recovery

## Actions Taken
1. First restart attempt at $(date -u +'%Y-%m-%d %H:%M:%S UTC' -d '40 seconds ago') - FAILED
2. Second restart attempt at $(date -u +'%Y-%m-%d %H:%M:%S UTC' -d '20 seconds ago') - FAILED

## Entrypoint
`bash -c 'bun run preview -- --port $PORT'`

## Workdir
`/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`

## Required Action
Manual investigation required. Check:
- Application logs at /dev/shm/valleyplayersclub.log
- Source code for runtime errors
- Dependencies and build status
