# CRITICAL: vpc-edge Service Down

**Timestamp:** 2026-03-18 03:05:00 UTC
**Service:** vpc-edge
**Service ID:** svc_WaYPe4_lNN0
**URL:** https://vpc-edge-brodiblanco.zocomputer.io
**Status:** DOWN

## Details
- Initial check: HTTP 502 (Bad Gateway)
- Restart attempt 1: Failed (still 502)
- Restart attempt 2: Failed (still 502)
- Max restart attempts exceeded

## Configuration
- Port: 3001
- Entrypoint: bun run src/index.ts
- Workdir: /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server
- Protocol: http

## Required Action
Manual investigation required. Service not recovering after automated restarts.
