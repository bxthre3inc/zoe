---
name: skill-manager
description: |
  Manage Zo skills from the command line. List, inspect, enable, disable, delete,
  and create skills. The Skill Manager helps you keep your skills organized,
  discover what's available, and manage skill lifecycle without manual file operations.
compatibility: Created for Zo Computer
metadata:
  author: brodiblanco.zo.computer
  category: Core, Skills
---
# Skill Manager

Central command station for managing Zo skills. Install this once, then use it
to handle all skill operations.

## Installation

Place this skill in `/home/workspace/Skills/skill-manager/` and ensure the
script is executable:

```bash
chmod +x /home/workspace/Skills/skill-manager/scripts/skillman.py
```

## Usage

### List All Skills

```bash
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py list
```

Shows enabled and disabled skills with descriptions.

### Show Skill Details

```bash
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py info <skill-name>
```

Example:
```bash
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py info supermemory
```

### Disable a Skill

Disabling moves a skill to the `.disabled/` folder (it won't be discovered by Zo).

```bash
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py disable <skill-name>
```

### Enable a Skill

Enabling moves a skill back from `.disabled/` to active.

```bash
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py enable <skill-name>
```

### Delete a Skill

**Warning**: Permanent deletion. Use `disable` first if you're unsure.

```bash
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py delete <skill-name>
```

Requires confirmation unless using `--force`.

### Create a New Skill

Scaffolds a new skill with proper structure:

```bash
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py create <skill-name>
```

Example:
```bash
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py create my-new-skill
```

This creates:
- `Skills/my-new-skill/SKILL.md` with template frontmatter
- `Skills/my-new-skill/scripts/` folder
- `Skills/my-new-skill/references/` folder
- `Skills/my-new-skill/assets/` folder

### Validate All Skills

Checks for common issues:

```bash
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py validate
```

Flags:
- Missing or malformed SKILL.md
- Missing required frontmatter fields
- Empty skills (no scripts/references/assets)
- Skills with broken script permissions

## How It Works

### Enable/Disable Mechanism

Skills are stored in two locations:
- **Enabled**: `/home/workspace/Skills/<skill-name>/`
- **Disabled**: `/home/workspace/Skills/.disabled/<skill-name>/`

When you disable a skill, it's moved to `.disabled/`. When you enable it, it's
moved back. Disabled skills are not discovered or loaded by Zo during skill
lookup.

### Discovery

The skill manager scans both locations to show you the complete inventory.
This helps you understand what's available vs. what's active.

### Safety

- Deletion requires confirmation (use `--force` to bypass)
- Disabled skills are preserved (not deleted)
- The skill-manager itself cannot disable itself (to prevent lockout)

## Integration with Zo

When the user says things like:
- "Show me my skills"
- "What skills do I have?"
- "Disable the midday-checkin skill"
- "Create a new skill for X"

Use this skill manager to handle those requests:

```python
# List skills
result = run_bash_command(
    cmd="python3 /home/workspace/Skills/skill-manager/scripts/skillman.py list"
)

# Disable a skill
result = run_bash_command(
    cmd="python3 /home/workspace/Skills/skill-manager/scripts/skillman.py disable midday-checkin"
)

# Get skill info
result = run_bash_command(
    cmd="python3 /home/workspace/Skills/skill-manager/scripts/skillman.py info supermemory"
)
```

## Output Format

All commands output structured text (or JSON with `--json` flag for scripting):

```bash
# Machine-readable output
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py list --json
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py info supermemory --json
```

## Best Practices

1. **Validate before committing**: Run `validate` after major changes
2. **Disable before delete**: Try disabling first to ensure you don't break workflows
3. **Use descriptive names**: Skill names should be kebab-case (e.g., `github-sync`, not `githubSync`)
4. **Document in SKILL.md**: The frontmatter `description` is what users see in listings

## Troubleshooting

### Skill not showing up after enable

Check that the SKILL.md file exists and is valid:

```bash
python3 /home/workspace/Skills/skill-manager/scripts/skillman.py validate
```

### Can't disable a skill

The skill-manager prevents self-disabling to avoid lockout. Use manual file
operations if you really need to disable it.

### Script permission errors

Ensure scripts are executable:

```bash
chmod +x /home/workspace/Skills/<skill-name>/scripts/*.py
```
