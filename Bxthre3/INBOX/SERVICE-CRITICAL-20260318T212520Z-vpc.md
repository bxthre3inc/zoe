# CRITICAL: VPC Service Down

**Timestamp:** 2026-03-18T21:25:20Z  
**Service:** vpc (svc_WaYPe4_lNN0)  
**URL:** https://vpc-brodiblanco.zocomputer.io  
**Port:** 3001  
**Status:** CRITICAL - Service unreachable after 2 restart attempts

## Error Details
- Initial check: HTTP 502 (Bad Gateway)
- After restart #1: HTTP 520 (Web Server Returned an Unknown Error)
- After restart #2: HTTP 520 (Web Server Returned an Unknown Error)

## Actions Taken
1. [21:25:00Z] Detected service down (HTTP 502)
2. [21:25:00Z] Restart attempt #1 triggered
3. [21:25:10Z] Verification #1 failed (HTTP 520)
4. [21:25:10Z] Restart attempt #2 triggered
5. [21:25:20Z] Verification #2 failed (HTTP 520)

## Service Configuration
- Entrypoint: `bun run src/index.ts`
- Workdir: `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- TCP: ts3.zocomputer.io:10834

## Next Steps Required
- Manual investigation needed
- Check server logs at `/dev/shm/vpc.log` and `/dev/shm/vpc_err.log`
- Verify workdir and entrypoint configuration
