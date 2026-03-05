# 🌾 FarmSense Precision Agriculture Platform

## 📦 Split Deployment Guide

> ⚠️ **Naming Note:** This document references **`CSE.computer`** — the legacy server name. The server is now **`Zo.computer`** (`brodiblanco.zo.computer`). Steps remain valid; substitute `Zo.computer` for `CSE.computer`. See [`Zo_Computer_Deployment_Architecture.md`](../../reference/Zo_Computer_Deployment_Architecture.md) for current routing config.

This project is configured for a **Hybrid Cloud Deployment**:

- **Core Platform (CSE.computer)**: Hosts the API, processing, and frontend applications.
- **Map Stack (RDC Cloud)**: Hosts the geospatial database and map tile services.

### 1. RDC Cloud (Map Stack) Setup

Deploy this FIRST to ensure the database is available for the core platform.

```bash
# On your RDC Instance
cd deployment/docker
docker-compose -f docker-compose.rdc.yml up -d
```

**Services Started:**

- `postgis-map`: Review `docker-compose.rdc.yml` for credentials (Default: `map_user`/`changeme`).
- `map-service`: Tile serving endpoint (Port 8001).

**Network Config:**

- Ensure Port `5432` is accessible from your CSE.computer IP (configure RDC Security List / VCN).

### 2. CSE.computer (Core Platform) Setup

```bash
# On your CSE Instance
cd deployment/docker

# Set the connection string to your RDC instance
export MAP_DATABASE_URL="postgresql://map_user:changeme@<rdc_IP>:5432/farmsense_map"

docker-compose -f docker-compose.cse.yml up -d
```

**Services Started:**

- `backend-api`: Main API (Port 8000).
- `frontend-dashboard`: Farmer Dashboard (Port 3000).
- Core DBs: Postgres, Timescale, Redis.

### 3. Verification

1. Access the Dashboard at `http://<cse_IP>:3000`.
2. The map tiles will be served from `http://<cse_IP>:8000/api/v1/tiles/...` which internally queries the RDC DB.

---

## 🏗️ Development Setup

For local development (single machine), use the standard compose file:

```bash
docker-compose up -d
```
