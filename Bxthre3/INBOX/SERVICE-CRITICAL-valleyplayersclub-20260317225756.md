# CRITICAL: valleyplayersclub Service Down

**Timestamp:** 2026-03-17 22:57:56 UTC
**Service:** valleyplayersclub
**URL:** https://valleyplayersclub-brodiblanco.zocomputer.io
**Status:** DOWN (HTTP 502)
**Severity:** CRITICAL

## Service Details
- **Port:** 5175 (as per monitoring spec)
- **Status:** NOT REGISTERED as user service

## Action History
1. Initial check: HTTP 502 - Service DOWN
2. Service not found in user services list - likely a zo.site or unregistered service
3. Unable to restart via update_user_service (no service_id)

## Required Action
- Manual investigation needed
- Check if this is a zo.site or needs user service registration
- If zo.site: Check build status and logs at /dev/shm/zosite-5175.log
- If needs registration: Register as user service with proper entrypoint
- Verify application code and dependencies
