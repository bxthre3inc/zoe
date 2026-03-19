# CRITICAL SERVICE ALERT: vpc (vpc-edge)

**Timestamp:** 2026-03-19 01:50:00 UTC
**Severity:** CRITICAL
**Service:** vpc (port 3001)
**Service ID:** svc_WaYPe4_lNN0
**Expected URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Actual URL:** https://vpc-brodiblanco.zocomputer.io
**Workdir:** /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server

## Issue
Service is returning HTTP 502 (Bad Gateway) consistently.

## Actions Taken
1. Initial check: HTTP 502
2. Restart attempt #1: Triggered - still returning HTTP 502 after 10s
3. Restart attempt #2: Triggered - still returning HTTP 502 after 10s

## Manual Intervention Required
Automatic restarts failed to restore service. Manual investigation needed:
- Check application logs at `/dev/shm/vpc.log` and `/dev/shm/vpc_err.log`
- Verify bun/node dependencies in workdir
- Check for upstream service dependencies
- Review recent code changes

## Service Config
```json
{
  "label": "vpc",
  "protocol": "http",
  "local_port": 3001,
  "entrypoint": "bun run src/index.ts",
  "workdir": "/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server"
}
```
