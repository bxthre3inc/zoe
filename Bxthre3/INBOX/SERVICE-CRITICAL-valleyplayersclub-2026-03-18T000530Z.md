# CRITICAL: valleyplayersclub Service Missing

**Timestamp:** 2026-03-18T00:05:30Z  
**Service:** valleyplayersclub  
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io  
**Expected Port:** 5175

## Issue
Service is returning HTTP 502 but **not found in service registry**. The service appears to be either:
1. Not registered with `register_user_service`
2. Was deleted/deregistered
3. Has a different service_id

## Attempted Actions
- Service check: HTTP 502
- Service list query: Service not found in registry
- Cannot restart: No service_id available

## Required Action
Re-register the service using `register_user_service` with:
- label: valleyplayersclub
- protocol: http
- local_port: 5175
- entrypoint: (determine from project files)
- workdir: (determine from project files)
