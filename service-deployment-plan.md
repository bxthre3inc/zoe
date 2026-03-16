# Service Deployment Architecture Plan

## Current Understanding

| Component | Location | Status |
|-----------|----------|--------|
| bxthre3inc website | `brodiblanco.zo.space` | ✅ Keep as zo.space pages |
| FarmSense backend | ??? | Need to deploy |
| Valley Players Club backend | ??? | Need to deploy |
| Backend #3 | ??? | Need to identify |
| Backend #4 | ??? | Need to identify |
| Backend #5 | ??? | Need to identify |

## Key Questions to Resolve

### 1. Where Are We Deploying?

**Option A: Zo Computer (this environment) via `register_user_service`**
- Services run directly on `brodiblanco.zo.computer`
- Ports auto-assigned (3000+)
- Accessible via `https://brodiblanco.zo.computer` + custom domains
- Auto-restarts, HTTPS included
- **Best for:** MVP, testing, moderate traffic

**Option B: External VPS via GitHub Actions CI/CD**
- Services run on your own VPS/server
- Full control over environment
- You manage scaling, uptime, SSL
- **Best for:** High traffic, production, compliance requirements

**Option C: Hybrid**
- Zo Computer for dev/staging
- VPS for production

### 2. The 5 Services

| # | Service | Status | Stack |
|---|---------|--------|-------|
| 1 | FarmSense backend | Ready? | Python (Flask/FastAPI?) |
| 2 | Valley Players Club | Ready | Bun/TypeScript |
| 3 | ??? | Unknown | ??? |
| 4 | ??? | Unknown | ??? |
| 5 | ??? | Unknown | ??? |

### 3. Port & Domain Strategy

**If using Zo Computer services:**
- Each service gets a port (auto-assigned)
- Can add custom domains per service (Basic: 3, Pro: 5, Ultra: 10 domains)
- Or use sub-path routing

**If using VPS:**
- NGINX reverse proxy
- Subdomains: `api.farmsense.io`, `api.valleyplayers.club`, etc.

## Recommended Approach

**Short-term (MVP):** Deploy to Zo Computer via `register_user_service`
- Fastest to get running
- Built-in HTTPS, auto-restart
- Can migrate to VPS later

**Long-term (Production):** External VPS
- More control, better performance
- CI/CD pipeline we started building

## Next Steps

1. **Confirm deployment target:** Zo Computer or VPS?
2. **Identify backends #3, #4, #5:** What are they?
3. **Ports/Domains:** Do you have preferred port numbers or domains?
4. **Dependencies:** Postgres? Redis? External APIs?

---

**Tell me:**
- Where do you want these 5 services to run?
- What are the other 3 backends?
- Do you have a VPS already, or should we use Zo Computer services?
