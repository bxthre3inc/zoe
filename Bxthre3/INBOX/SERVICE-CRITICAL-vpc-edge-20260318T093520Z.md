# SERVICE CRITICAL: vpc-edge

**Status:** DOWN after 2 restart attempts  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001  
**HTTP Status:** 502 (Bad Gateway)

## Timeline

| Time | Action | Result |
|------|--------|--------|
| 2026-03-18T09:35:00Z | Initial Check | DOWN (HTTP 502) |
| 2026-03-18T09:35:00Z | Restart #1 | Triggered |
| 2026-03-18T09:35:10Z | Verify after restart #1 | Still DOWN (HTTP 502) |
| 2026-03-18T09:35:10Z | Restart #2 | Triggered |
| 2026-03-18T09:35:20Z | Verify after restart #2 | Still DOWN (HTTP 502) |
| 2026-03-18T09:35:20Z | **ESCALATION** | CRITICAL alert created |

## Service Configuration

- **Entrypoint:** `bun run src/index.ts`
- **Working Directory:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`
- **Protocol:** HTTP
- **TCP Address:** ts3.zocomputer.io:10834

## Action Required

Manual intervention needed. Service remains down after maximum restart attempts.

Check:
1. Application logs at `/dev/shm/vpc-edge.log` and `/dev/shm/vpc-edge_err.log`
2. Server code for runtime errors
3. Dependencies and environment configuration
