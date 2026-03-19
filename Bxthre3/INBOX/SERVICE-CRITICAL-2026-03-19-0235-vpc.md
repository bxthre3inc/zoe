# 🚨 CRITICAL SERVICE ALERT: vpc (vpc-edge)

**Timestamp:** 2026-03-19 02:35:00 UTC  
**Service:** vpc (vpc-edge)  
**Service ID:** svc_WaYPe4_lNN0  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**Port:** 3001

## Status
**DOWN** - HTTP 502 (Bad Gateway)

## Restart History
- Attempt 1: 02:35 UTC - Failed (still 502)
- Attempt 2: 02:35 UTC - Failed (still 502)

## Impact
VPC Edge service for Valley Players Club is inaccessible.

## Action Required
Manual investigation needed. Possible causes:
- Server application crash or misconfiguration
- Upstream dependency unavailable
- Code deployment issue

Check service logs: `tail -f /dev/shm/vpc.log /dev/shm/vpc_err.log`
