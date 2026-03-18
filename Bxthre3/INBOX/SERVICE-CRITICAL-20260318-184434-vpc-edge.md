# SERVICE CRITICAL: vpc-edge

**Status:** DOWN after 2 restart attempts
**Timestamp:** $(date -Iseconds)

## Service Details
- **Name:** vpc-edge
- **URL:** https://vpc-edge-brodiblanco.zocomputer.io
- **Port:** 3001
- **Service ID:** svc_WaYPe4_lNN0
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **Entrypoint:** bun run src/index.ts

## Failure History
1. Initial check: HTTP 502
2. Restart #1 attempted at $(date -Iseconds)
3. Post-restart check: HTTP 502
4. Restart #2 attempted at $(date -Iseconds)
5. Final check: HTTP 502

## Action Required
Manual investigation needed. Service may have code errors, missing dependencies, or configuration issues.
