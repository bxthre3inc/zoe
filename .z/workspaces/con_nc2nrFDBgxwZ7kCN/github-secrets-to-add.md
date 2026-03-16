# VPC GitHub Secrets - Ready to Copy

## ✅ Secrets I Can Provide:

### JWT_SECRET (NEW - replace the compromised one)
```
DLuGcFjjZofC0922A+KquK/9cceEaTWjB3Q/PVaNEZY=
```
⚠️ **Generate your own with:** `openssl rand -base64 32`

### CASHAPP_CASHTAG
```
$ValleyPlayersClub
```

### BTC_MASTER_ADDRESS (placeholder - update with yours)
```
bc1q_placeholder_address_here
```

---

## ⚠️ Secrets YOU Need to Add (I don't have these):

### Required for Deploy:
| Secret | Where to Get | Value |
|----------|--------------|-------|
| `ZO_HOST` | Your server IP/domain | `YOUR_SERVER_IP` |
| `ZO_USER` | SSH user | `root` or `deploy` |
| `ZO_SSH_KEY` | Server SSH key | See setup below |

### Required for Payments:
| Secret | Where to Get | Value |
|----------|--------------|-------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → API Keys | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks | `whsec_...` |

### Required for Compliance:
| Secret | Where to Get | Value |
|----------|--------------|-------|
| `PERSONA_API_KEY` | Persona Dashboard | `...` |
| `PERSONA_TEMPLATE_ID` | Persona Dashboard | `...` |
| `MAXMIND_ACCOUNT_ID` | MaxMind Account | `...` |
| `MAXMIND_LICENSE_KEY` | MaxMind License | `...` |

---

## 🚀 Quick Setup

### Step 1: SSH Key for GitHub Actions

On your **Zo server**, run:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy
# Copy the output (private key)
```

Then:
1. Go to GitHub → Repo → Settings → Secrets → Actions
2. Click "New repository secret"
3. Name: `ZO_SSH_KEY`
4. Paste the entire private key (including `-----BEGIN/END` lines)

### Step 2: Add These Secrets to GitHub

Click "New repository secret" for each:

**Name:** `JWT_SECRET`  
**Value:** `DLuGcFjjZofC0922A+KquK/9cceEaTWjB3Q/PVaNEZY=`

**Name:** `ZO_HOST`  
**Value:** `[YOUR SERVER IP OR DOMAIN]`

**Name:** `ZO_USER`  
**Value:** `[YOUR SSH USERNAME]`

**Name:** `CASHAPP_CASHTAG`  
**Value:** `$ValleyPlayersClub`

**Name:** `BTC_MASTER_ADDRESS`  
**Value:** `[YOUR BTC ADDRESS]`

**Name:** `STRIPE_SECRET_KEY`  
**Value:** `[FROM STRIPE DASHBOARD]`

...and the rest as listed above.
