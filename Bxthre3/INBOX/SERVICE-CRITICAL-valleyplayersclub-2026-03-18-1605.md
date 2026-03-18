# CRITICAL SERVICE FAILURE: valleyplayersclub

**Timestamp:** 2026-03-18 16:05:00 UTC  
**Service ID:** svc_e8ZjTEIhSIo  
**Service Label:** valleyplayersclub  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  

## Failure Details

- **Initial Status:** HTTP 403 (Forbidden)
- **Restart Attempt 1:** Failed - HTTP 521
- **Restart Attempt 2:** Failed - HTTP 403

## Service Configuration

```json
{
  "service_id": "svc_e8ZjTEIhSIo",
  "label": "valleyplayersclub",
  "protocol": "http",
  "local_port": 5175,
  "entrypoint": "bash -c 'bun run preview -- --port $PORT'",
  "workdir": "/home/workspace/Bxthre3/projects/the-valleyplayersclub-project",
  "env_vars": {},
  "http_url": "https://valleyplayersclub-brodiblanco.zocomputer.io",
  "tcp_addr": "ts3.zocomputer.io:10548"
}
```

## Action Required

Service remains down after 2 automatic restart attempts. Manual investigation required. Check:
1. Application logs at `/dev/shm/valleyplayersclub.log` and `/dev/shm/valleyplayersclub_err.log`
2. Build/preview configuration issues
3. Port binding or access control issues
4. Loki logs: http://localhost:3100
