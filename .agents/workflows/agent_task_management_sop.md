---
description: SOP for AI Agents managing task lists and todo.md files in the FarmSense project.
---

# FarmSense Project: Agent SOP for Task Management

When any AI coding assistant or agent is tasked with creating, updating, or maintaining task lists and `todo.md` files in this repository, they MUST adhere to the following standard operating procedures. This ensures clarity and maintainability for human developers and other agents.

## 1. The Double-Checkbox Format
Every actionable task item MUST use a dual-checkbox system to clearly separate a task's progress state:
- The **first** checkbox indicates if the task has been **started** (In Progress).
- The **second** checkbox indicates if the task has been **completed**.

### Syntax:
- `- [ ] [ ] Task name` : Not started.
- `- [x] [ ] Task name` : Task is currently in-progress.
- `- [x] [x] Task name` : Task is fully completed and verified.

### Example `todo.md`:
```markdown
## Current Sprint
- [x] [x] Audit PMT Kinematic ranges
- [x] [ ] Setup Environment Simulator Base Classes
- [ ] [ ] Implement WebSocket Broadcaster in Backend
- [ ] [ ] Add Fault Injection triggers to API
```

## 2. Granularity
- Break tasks down so that they can be completed in a single reasonable chunk of work.
- Avoid monolithic tasks. Combine related small steps under a parent header rather than making one giant checkbox.

## 3. Operations
- Always update the `todo.md` immediately upon starting a task (check the first box).
- Always update the `todo.md` immediately upon completing and verifying a task (check the second box).
- Never check the second box unless the first box is also checked.

## Supermemory Capture Protocol

All agents MUST save consequential outputs to Supermemory:

### When to Save
- Key decisions made or recommendations given
- Discoveries (bugs, insights, pattern detections)
- Status changes (IP moved to STRONG, deadline shifted, etc.)
- Meeting summaries after processing
- Any output brodiblanco would want to remember cold

### How to Save
```bash
python3 /home/workspace/Skills/supermemory/scripts/memory.py save \
  --content "[Agent Name]: [What happened / What was decided]. [Context]. [Impact]." \
  --tags "decision,agent-name,topic,scope"
```

### Tag Convention
| Tag | Use For |
|-----|---------|
| decision | Choices, strategies, approaches selected |
| discovery | Bugs found, insights, pattern detections |
| status-change | IP status moves, deadline shifts, blockers |
| meeting | Meeting summaries, takeaways |
| fact | Canonical numbers, locked values |
| farmsense | FarmSense-specific content |
| bxthre3 | Holding company content |
| urgent | Requires immediate attention |

### Examples
```bash
# IP Portfolio Agent
python3 memory.py save --content "IP Portfolio Agent: VFA_DepthAdaptive algorithm upgraded from WEAK to STRONG. Code implementation now matches claims in specification V1.21. Ready for PPA filing." --tags "status-change,ip-portfolio,vfa,strong,farmsense"

# ESTCP Tracker  
python3 memory.py save --content "ESTCP Tracker: Federal ESG pre-proposal submitted March 26, 2026. Awaiting review. Next milestone: CSU pilot hardware procurement April 2026." --tags "decision,estcp,grant-submitted,milestone,farmsense"

# Grant Writer
python3 memory.py save --content "Grant Writer: Identified new SBIR opportunity at DOE Water-Energy Nexus. Deadline June 15, 2026. Aligns with FarmSense Phase 2. Recommended: Pursue parallel to ESTCP." --tags "discovery,grant-opportunity,doe,strategy,farmsense"
```

### Output Rule
Every agent run that produces meaningful work must end with at least one Supermemory save. The memory is the deliverable; the status file is just for UAO coordination.