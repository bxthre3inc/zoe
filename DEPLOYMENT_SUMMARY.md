# Deployment Strategy Summary

## ✅ Current Status

| Service | Status | URL |
|---------|--------|-----|
| FarmSense API | ✅ Running | https://farmsense-api-brodiblanco.zocomputer.io |
| FarmSense Portal | ✅ Running | https://farmsense-portal-brodiblanco.zocomputer.io |
| FarmSense Frontend | ✅ Running | https://farmsense-frontend-brodiblanco.zocomputer.io |
| **VPC Edge Server** | 🔄 Ready to deploy | _Pending_ |

## ⚠️ Critical Issue: No Database Layer

Your FarmSense API is running but **cannot process requests** because:
- PostgreSQL (port 5432) ❌ not running
- TimescaleDB (port 5433) ❌ not running
- Redis (port 6379) ❌ not running

Docker Compose stack = 20+ containers → requires external VPS

## 🎯 Recommended Path: June Pilot

### 1. Database: Supabase (Chosen per your instruction)

**Why:** Best free tier with TimescaleDB support.

**Setup Guide:** See `NEON_SETUP.md` (Supabase instructions included)

**Next Steps:**
1. Sign up at https://supabase.com
2. Create project: `farmsense-pilot`
3. Enable TimescaleDB extension
4. Share connection string
5. I update `start.sh` and service env vars

### 2. VPC Edge Server Deployment

**Service Definition:**

```json
{
  "label": "vpc-edge",
  "protocol": "http",
  "entrypoint": "bun run /home/workspace/Bxthre3/the-valleyplayersclub-project/server/src/index.ts",
  "workdir": "/home/workspace/Bxthre3/the-valleyplayersclub-project/server",
  "env_vars": {
    "PORT": "3001",
    "NODE_ENV": "production",
    "JWT_SECRET": "[GENERATE]",
    "DB_PATH": "/home/workspace/Bxthre3/the-valleyplayersclub-project/server/data/vpc.db",
    "OLLAMA_HOST": "http://localhost:11434",
    "WSS_DOMAIN": "vpc-brodiblanco.zocomputer.io"
  }
}
```

**Required Secrets (Settings → Advanced):**
- `JWT_SECRET` — Generate: `openssl rand -hex 32`
- `STRIPE_SECRET_KEY` — From Stripe Dashboard
- `STRIPE_WEBHOOK_SECRET` — From Stripe Dashboard
- `PERSONA_API_KEY` — If using Persona
- `MAXMIND_LICENSE_KEY` — For GeoIP

**Port Check:** 3001 is available ✅

### 3. Post-Deployment URLs

| Service | Public URL |
|---------|-----------|
| FarmSense API | https://farmsense-api-brodiblanco.zocomputer.io |
| VPC Edge Server | https://vpc-edge-brodiblanco.zocomputer.io |

## 🚀 Next Actions Required

### Your Tasks:

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Note: Free tier = 500MB per project
   - You may need 3 projects for full isolation:
     - `farmsense-core`
     - `farmsense-timeseries`
     - `farmsense-map`

2. **Add Secrets to Zo Computer**
   - Go to [Settings → Advanced](/?t=settings&s=advanced)
   - Add: `JWT_SECRET`, `STRIPE_SECRET_KEY`, etc.

3. **Send Me:**
   - Supabase connection string(s)
   - Confirmation that secrets are set

### My Tasks (after you provide connection strings):

1. Update `start.sh` with new database URLs
2. Update FarmSense service env vars via `update_user_service`
3. Register VPC Edge Server via `register_user_service`
4. Verify endpoints: `/health`, `/api/v1/auth/login`

## 📋 Cost Summary

| Service | Cost |
|---------|------|
| Zo Computer | $18/mo (already paying) |
| Supabase | $0 (free tier) |
| VPC (on Zo) | $0 (included) |
| **Total** | **$18/mo** |

## 🔄 Alternative: Full VPS Migration

If you want to run the full 20-container stack instead:

1. **DigitalOcean** ($18-40/mo droplet)
2. **Hetzner** (€5/mo) — EU-based
3. **AWS EC2** ($13/mo t3.small)

The Docker Compose files are ready. Just need to:
1. Create VM
2. Clone repo
3. Run `docker-compose up -d`
4. Point `zo_deploy.sh` to new server

---

**Decision:** Use Supabase for June pilot, migrate to VPS for production.

*Generated: 2026-03-15*
