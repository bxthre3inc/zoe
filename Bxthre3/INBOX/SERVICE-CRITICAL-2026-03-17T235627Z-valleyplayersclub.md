# CRITICAL: Service valleyplayersclub NOT REGISTERED

**Timestamp:** 2026-03-17T23:56:27Z  
**Service:** valleyplayersclub  
**Expected URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Expected Port:** 5175

## Status
- **Registration Status:** NOT FOUND in service registry
- **HTTP Check:** 502 Bad Gateway (no backend)

## Analysis
The valleyplayersclub service is not registered with Zo Computer's service hosting system. 

The project at `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project` contains:
- A Vite React frontend (port 5175 with `npm run dev`)
- An Express/Socket.io backend server (port 3001, already registered as vpc-edge)

The vpc-edge service (svc_WaYPe4_lNN0) is configured to serve static files from the built `dist/` folder, which should serve the valleyplayersclub frontend.

## Recommended Actions
1. **Option A:** Register valleyplayersclub as a separate service on port 5175:
   - Entrypoint: `npm run preview` (to serve built dist/ folder)
   - Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project`
   
2. **Option B:** Configure reverse proxy for valleyplayersclub-brodiblanco.zocomputer.io to route to the existing vpc-edge service (port 3001), which already serves the static frontend.

## Related Issue
See `SERVICE-CRITICAL-2026-03-17T235010Z.md` for vpc-edge reverse proxy issues.
