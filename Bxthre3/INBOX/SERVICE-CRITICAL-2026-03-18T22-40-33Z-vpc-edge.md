# SERVICE CRITICAL: vpc-edge (NO MATCHING SERVICE FOUND)

**Timestamp:** 2026-03-18T22:40:33Z  
**Service:** vpc-edge  
**URL:** https://vpc-edge-brodiblanco.zocomputer.io  
**HTTP Status:** 502 (Bad Gateway)

## Issue
Service URL returns HTTP 502 but no matching service found in `list_user_services`.

## Available Services
The following services are registered but none match "vpc-edge":

1. **vpc** (svc_WaYPe4_lNN0)
   - URL: https://vpc-brodiblanco.zocomputer.io
   - Port: 3001
   - Workdir: /home/workspace/Bxthre3/projects/the-valleyplayersclub-project/server

2. **valleyplayersclub** (svc_e8ZjTEIhSIo)  
   - URL: https://valleyplayersclub-brodiblanco.zocomputer.io
   - Port: 5175

## Possible Causes
- Service was renamed from "vpc-edge" to "vpc" but documentation not updated
- Service was deleted but URL still proxied
- URL mismatch in configuration

## Action Required
Verify if "vpc-edge" and "vpc" are the same service, or register the vpc-edge service if it's missing.

## Log Location
`/home/workspace/Bxthre3/agents/logs/service-restarts.log`
