# CRITICAL: Service Down - valleyplayersclub

**Timestamp:** 2026-03-17 23:10:21 UTC  
**Severity:** CRITICAL  
**Service:** valleyplayersclub  
**Port:** 5175  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io

## Status
Service is DOWN - Not registered as a Zo user service.

## Investigation Results
- HTTP check returns 502 Bad Gateway
- No registered user service found with label "valleyplayersclub"
- No running process found on port 5175
- Project exists at `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/`

## Project Details
- **Server Path:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server/src/index.ts`
- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **Note:** This appears to be the same codebase as vpc-edge, but expecting port 5175

## Required Action
Service needs to be registered as a Zo user service.

## Next Steps
1. Determine if valleyplayersclub should be a separate service or same as vpc-edge
2. If separate, register with `register_user_service` on port 5175
3. Verify no port conflict with vpc-edge (port 3001)
4. Check if separate entrypoint or environment config needed
