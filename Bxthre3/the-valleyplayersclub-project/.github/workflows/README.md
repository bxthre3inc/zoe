# VPC CI/CD Pipeline

## Overview

Automated deployment pipeline that builds and deploys Valley Players Club to your Zo production server on every push to `main`.

## Required GitHub Secrets

Add these in: **Repo Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `ZO_HOST` | Your server IP or domain | `203.0.113.1` or `vpc.bxthre3.io` |
| `ZO_USER` | SSH username | `root` or `deploy` |
| `ZO_SSH_KEY` | Private SSH key (full content) | `-----BEGIN OPENSSH PRIVATE KEY-----\n...` |
| `JWT_SECRET` | Auth signing secret | Generate: `openssl rand -base64 32` |
| `STRIPE_SECRET_KEY` | Stripe live key | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...` |
| `BTC_MASTER_ADDRESS` | Bitcoin deposit address | `bc1q...` |
| `CASHAPP_CASHTAG` | Cash App identifier | `$ValleyPlayersClub` |
| `PERSONA_API_KEY` | Identity verification API | From Persona dashboard |
| `PERSONA_TEMPLATE_ID` | KYC flow template ID | `...` |
| `MAXMIND_ACCOUNT_ID` | Geo-fraud detection | `...` |
| `MAXMIND_LICENSE_KEY` | MaxMind license | `...` |

## Setup Steps

### 1. Generate SSH Key on Server

On your Zo server:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_deploy
```

Copy the **private key** (`github_deploy`) to GitHub Secrets as `ZO_SSH_KEY`.

### 2. Configure Server Prerequisites

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Install PM2 globally
bun add -g pm2

# Setup PM2 startup
pm2 startup
```

### 3. Push to Deploy

```bash
git add .
git commit -m "feat: production ready with CI/CD"
git push origin main
```

The pipeline will automatically:
- Build the frontend
- Install server dependencies with Bun
- Deploy to `~/vpc-app/` on your server
- Restart the server with PM2

## Manual Deployment

If needed, trigger manually:
- Go to **Actions** tab → **Deploy VPC to Production** → **Run workflow**

## Troubleshooting

### Check deployment status:
```bash
ssh your-server
pm2 logs vpc-server
cd ~/vpc-app/server && cat .env | grep NODE_ENV
```

### Rollback:
```bash
ssh your-server
cd ~/vpc-app
# Git reset to previous commit
git log --oneline -5
git reset --hard HEAD~1
pm2 restart vpc-server
```

## Architecture

```
GitHub Push → Build Frontend → Build Server → SSH Deploy → PM2 Restart
```

- Frontend served via nginx
- Backend via PM2 + Bun
- WebSocket on port 3001
- Database at `~/vpc-app/server/data/vpc.db`
