# CRITICAL SERVICE FAILURE: vpc-edge

**Timestamp:** 2026-03-18 16:05:00 UTC  
**Service ID:** svc_WaYPe4_lNN0  
**Service Label:** vpc-edge  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  

## Failure Details

- **Initial Status:** HTTP 502 (Bad Gateway)
- **Restart Attempt 1:** Failed - HTTP 502
- **Restart Attempt 2:** Failed - HTTP 502

## Service Configuration

```json
{
  "service_id": "svc_WaYPe4_lNN0",
  "label": "vpc-edge",
  "protocol": "http",
  "local_port": 3001,
  "entrypoint": "bun run src/index.ts",
  "workdir": "/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server",
  "env_vars": {},
  "http_url": "https://vpc-edge-brodiblanco.zocomputer.io",
  "tcp_addr": "ts3.zocomputer.io:10834"
}
```

## Action Required

Service remains down after 2 automatic restart attempts. Manual investigation required. Check:
1. Application logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
2. Code changes in the workdir that may have introduced errors
3. Dependencies or environment issues
4. Loki logs: http://localhost:3100
