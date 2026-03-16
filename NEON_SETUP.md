# Neon/Supabase Setup Guide

## The Issue

Your FarmSense schema requires **TimescaleDB** features:
- `create_hypertable()` for time-series partitioning
- `add_retention_policy()` for automatic data cleanup
- `add_continuous_aggregate_policy()` for materialized views

**Neon free tier = Standard Postgres only (no TimescaleDB)**

## Recommended: Supabase (Option B)

Supabase free tier includes TimescaleDB extension support.

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Sign in
3. Create new project: `farmsense-pilot`
4. Choose region: `us-west-1` (closest to your users)
5. Database password: Generate a secure one (save it)
6. Wait 2-3 minutes for provisioning

### Step 2: Enable TimescaleDB Extension

In the SQL Editor, run:

```sql
-- Enable TimescaleDB
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Verify
SELECT * FROM pg_extension WHERE extname = 'timescaledb';
```

### Step 3: Create Databases

Supabase gives you **one database per project**, but you can use **schemas** to separate concerns:

```sql
-- Create schemas instead of separate databases
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS timeseries;
CREATE SCHEMA IF NOT EXISTS map;
```

Or create **2-3 separate projects** for true isolation:
- Project 1: `farmsense-core` (~200MB)
- Project 2: `farmsense-timeseries` (~250MB)  
- Project 3: `farmsense-map` (~50MB)

### Step 4: Get Connection Strings

**Settings → Database → Connection string → URI**

Copy this format:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxxxxxxxxx.supabase.co:5432/postgres
```

## Connection String Update

Edit these files (I'll do this after you provide the strings):

1. `/home/workspace/Bxthre3/the-farmsense-project/farmsense-code/backend/start.sh`
2. Update Zo Computer service env vars

## Alternative: Timescale Cloud (Option A)

If you prefer pure TimescaleDB:

1. Go to https://console.timescale.com
2. Create service: `farmsense-timeseries`
3. Free tier: 30 days, then ~$30/mo for 10GB
4. Run the migration SQL
5. Note the connection string

## Next Steps

1. **Choose your option** (I recommend Supabase for cost)
2. **Create account & project**
3. **Share the connection string** (I'll update configs)
4. **Deploy VPC** (port 3001 ready)

---
*Generated for FarmSense June Pilot - 2026-03-15*
