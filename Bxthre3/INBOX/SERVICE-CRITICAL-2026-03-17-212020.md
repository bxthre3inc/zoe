# SERVICE CRITICAL: vpc-edge

**Timestamp:** 2026-03-17 21:20:20 UTC  
**Service:** vpc-edge  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  

## Status
- **HTTP Response:** 502 (Bad Gateway)
- **Port:** 3001
- **Entrypoint:** `bun run src/index.ts`
- **Workdir:** `/home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server`

## Restart Attempts
1. **Attempt 1:** 2026-03-17 21:20:10 UTC - Result: Still 502
2. **Attempt 2:** 2026-03-17 21:20:20 UTC - Result: Still 502

## Required Action
Service requires manual intervention. Automated restarts have failed to restore service.

## Environment
- PORT: 3001
- NODE_ENV: production
- JWT_SECRET: [REDACTED]
- DB_PATH: data/vpc.db
- WSS_DOMAIN: vpc-edge-brodiblanco.zocomputer.io
- ALLOWED_ORIGINS: https://brodiblanco.zo.computer,https://farmsense.io,http://localhost:5173
- OLLAMA_HOST: http://localhost:11434
