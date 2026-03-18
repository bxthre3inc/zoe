# INBOX - Pulse Health Monitor

## 2026-03-18 18:00 UTC

### 🔴 P0 Issues

1. **PostgreSQL DOWN** - `TASK-PULSE-202603180600-PGSQL`
   - Service: PostgreSQL (localhost:5432)
   - Status: Connection refused - service not running
   - Previous state: UP
   - Action: Task created for recovery

### Previous P0 (Still Active)

2. **FarmSense API DOWN** - `TASK-PULSE-202603172305-API`
   - Service: API (localhost:8001)
   - Status: Not responding
   - Action: Existing task

3. **FarmSense Frontend DOWN** - `TASK-PULSE-202603172305-FRONTEND`
   - Service: Frontend (localhost:5174)
   - Status: Not responding
   - Action: Existing task

### 📊 Service Status Summary

| Service | Status | Port |
|---------|--------|------|
| VPC Edge | ✅ UP | 3001 |
| FarmSense API | ❌ DOWN | 8001 |
| FarmSense Frontend | ❌ DOWN | 5174 |
| PostgreSQL | ❌ DOWN | 5432 |
| Oracle (external) | ❌ DOWN | 443 |

### 📈 Resource Status

- Disk: 1% ✅
- Memory: 4% ✅
