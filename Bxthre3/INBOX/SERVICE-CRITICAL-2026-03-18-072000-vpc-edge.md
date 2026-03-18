# 🚨 CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-18 07:20:00 UTC
**Service:** vpc-edge
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Port:** 3001
**Service ID:** svc_WaYPe4_lNN0

## Status
- **HTTP Response Code:** 502 (Bad Gateway)
- **Restart Attempts:** 2 (both failed)
- **Duration Down:** Unknown

## Restart History
1. Attempt 1 (07:20:00 UTC) - HTTP 502 after restart
2. Attempt 2 (07:20:00 UTC) - HTTP 502 after restart

## Service Configuration
- **Entrypoint:** bun run src/index.ts
- **Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- **Protocol:** http
- **TCP Addr:** ts3.zocomputer.io:10834

## Required Action
Manual intervention needed. Possible causes:
- Application error preventing startup
- Dependency issue (bun/node_modules)
- Configuration error in source code
- Port conflict or binding issue

## Next Steps
1. Check service logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
2. Verify source code in workdir
3. Test locally before restarting
