# 🚨 SERVICE CRITICAL ALERT: vpc-edge

**Timestamp:** 2026-03-18 04:35:45 UTC  
**Service:** vpc-edge  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Service ID:** svc_WaYPe4_lNN0  
**Port:** 3001  
**Status:** DOWN AFTER 2 RESTART ATTEMPTS

## Failure Details

- **Initial Check:** HTTP 502 (Bad Gateway)
- **Restart Attempt 1:** Failed - HTTP 502
- **Restart Attempt 2:** Failed - HTTP 502

## Service Configuration

```
Entrypoint: bun run src/index.ts
Workdir: /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
Protocol: http
Local Port: 3001
```

## Action Required

Manual investigation needed. Service has failed 2 automatic restart attempts.
- Check server logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
- Verify workdir and entrypoint configuration
- Check for port conflicts or dependency issues
