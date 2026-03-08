#!/usr/bin/env python3
"""
Skill Manager - Manage Zo skills from the command line.

Commands:
    list       List all skills (enabled and disabled)
    info       Show detailed info about a skill
    disable    Disable a skill (move to .disabled/)
    enable     Enable a skill (move from .disabled/)
    delete     Permanently delete a skill
    create     Create a new skill template
    validate   Validate all skills for issues

Usage:
    python3 skillman.py list [--json]
    python3 skillman.py info <skill-name> [--json]
    python3 skillman.py disable <skill-name>
    python3 skillman.py enable <skill-name>
    python3 skillman.py delete <skill-name> [--force]
    python3 skillman.py create <skill-name>
    python3 skillman.py validate [--json]
"""

import argparse
import json
import os
import shutil
import sys
from datetime import datetime
from pathlib import Path

WORKSPACE = Path(os.environ.get("WORKSPACE", "/home/workspace"))
SKILLS_DIR = WORKSPACE / "Skills"
DISABLED_DIR = SKILLS_DIR / ".disabled"

SELF_NAME = "skill-manager"

SKILL_TEMPLATE = '''---
name: {skill_name}
description: |
  Describe what this skill does in 1-2 sentences.
  This description appears when listing skills.
compatibility: Created for Zo Computer
metadata:
  author: {author}
  category: Custom
---

# {skill_name}

Describe your skill here. Include:

- What problem it solves
- How to set it up
- How to run it (with examples)
- What the outputs mean

## Setup

1. Place this skill in `Skills/{skill_name}/`
2. Ensure scripts are executable: `chmod +x scripts/*.py`
3. [Additional setup steps...]

## Usage

### Command 1

```bash
python3 /home/workspace/Skills/{skill_name}/scripts/example.py
```

### Command 2

Describe what this does...

## Output Format

Describe what users can expect when running your skill...
'''


def get_author():
    """Try to determine the user/author."""
    # Try to get from git config
    try:
        import subprocess
        result = subprocess.run(
            ["git", "config", "user.email"],
            capture_output=True, text=True
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
    except:
        pass
    
    # Try environment variables
    for env_var in ["USER", "USERNAME", "ZO_USER"]:
        if os.environ.get(env_var):
            return os.environ.get(env_var)
    
    return "user@zo.computer"


def parse_skill_md(skill_md_path):
    """Parse a SKILL.md file and extract frontmatter + stats."""
    if not skill_md_path.exists():
        return None
    
    content = skill_md_path.read_text()
    lines = content.splitlines()
    
    result = {
        "name": skill_md_path.parent.name,
        "description": "",
        "compatibility": "",
        "metadata": {},
        "has_body": False,
        "line_count": len(lines),
        "char_count": len(content),
    }
    
    in_frontmatter = False
    frontmatter_end = 0
    
    for i, line in enumerate(lines):
        if line.strip() == "---":
            if not in_frontmatter:
                in_frontmatter = True
                frontmatter_end = i
            else:
                frontmatter_end = i
                # Check if there's body content after frontmatter
                remaining = lines[i+1:]
                result["has_body"] = any(l.strip() for l in remaining)
                break
        elif in_frontmatter:
            if line.startswith("name:"):
                result["name"] = line.split(":", 1)[1].strip().strip("'\"")
            elif line.startswith("description:"):
                result["description"] = line.split(":", 1)[1].strip().strip("'\"")
            elif line.startswith("compatibility:"):
                result["compatibility"] = line.split(":", 1)[1].strip()
            elif line.startswith("metadata:"):
                # Handle simple metadata parsing
                pass
            elif line.strip().startswith("author:") and "metadata" in line.lower():
                # Try to get author from metadata section
                pass
    
    return result


def get_skill_stats(skill_dir):
    """Get filesystem stats for a skill directory."""
    stats = {
        "file_count": 0,
        "has_scripts": False,
        "has_references": False,
        "has_assets": False,
        "script_count": 0,
        "total_size": 0,
    }
    
    if not skill_dir.exists():
        return stats
    
    for root, dirs, files in os.walk(skill_dir):
        for f in files:
            fpath = Path(root) / f
            stats["file_count"] += 1
            try:
                stats["total_size"] += fpath.stat().st_size
            except:
                pass
        
        root_path = Path(root)
        if root_path.name == "scripts":
            stats["has_scripts"] = True
            stats["script_count"] = len([f for f in files if not f.startswith(".")])
        elif root_path.name == "references":
            stats["has_references"] = True
        elif root_path.name == "assets":
            stats["has_assets"] = True
    
    return stats


def discover_skills():
    """Discover all skills (enabled and disabled)."""
    enabled = []
    disabled = []
    
    # Discover enabled skills
    if SKILLS_DIR.exists():
        for item in sorted(SKILLS_DIR.iterdir()):
            if item.is_dir() and not item.name.startswith("."):
                skill_md = item / "SKILL.md"
                meta = parse_skill_md(skill_md) or {"name": item.name}
                stats = get_skill_stats(item)
                enabled.append({
                    "name": meta.get("name", item.name),
                    "dir": item.name,
                    "description": meta.get("description", ""),
                    "status": "enabled",
                    **stats
                })
    
    # Discover disabled skills
    if DISABLED_DIR.exists():
        for item in sorted(DISABLED_DIR.iterdir()):
            if item.is_dir() and not item.name.startswith("."):
                skill_md = item / "SKILL.md"
                meta = parse_skill_md(skill_md) or {"name": item.name}
                stats = get_skill_stats(item)
                disabled.append({
                    "name": meta.get("name", item.name),
                    "dir": item.name,
                    "description": meta.get("description", ""),
                    "status": "disabled",
                    **stats
                })
    
    return enabled, disabled


def cmd_list(args):
    """List all skills."""
    enabled, disabled = discover_skills()
    
    if args.json:
        print(json.dumps({"enabled": enabled, "disabled": disabled}, indent=2))
        return
    
    print("=" * 60)
    print("SKILL MANAGER - Inventory")
    print("=" * 60)
    print()
    
    if enabled:
        print(f"📦 ENABLED SKILLS ({len(enabled)})")
        print("-" * 40)
        for skill in enabled:
            scripts_icon = "🐍" if skill["has_scripts"] else "  "
            refs_icon = "📚" if skill["has_references"] else "  "
            assets_icon = "🎨" if skill["has_assets"] else "  "
            desc = skill["description"][:50] + "..." if len(skill["description"]) > 50 else skill["description"]
            print(f"  {scripts_icon}{refs_icon}{assets_icon} {skill['name']}")
            if desc:
                print(f"      └─ {desc}")
    else:
        print("📦 ENABLED SKILLS: None")
    
    print()
    
    if disabled:
        print(f"🚫 DISABLED SKILLS ({len(disabled)})")
        print("-" * 40)
        for skill in disabled:
            print(f"     {skill['name']}")
            if skill["description"]:
                desc = skill["description"][:40] + "..." if len(skill["description"]) > 40 else skill["description"]
                print(f"      └─ {desc}")
    else:
        print("🚫 DISABLED SKILLS: None")
    
    print()
    print(f"Total: {len(enabled)} enabled, {len(disabled)} disabled")


def cmd_info(args):
    """Show detailed info about a skill."""
    skill_name = args.skill_name
    
    # Check enabled first
    skill_dir = SKILLS_DIR / skill_name
    disabled = False
    
    if not skill_dir.exists():
        # Check disabled
        skill_dir = DISABLED_DIR / skill_name
        disabled = True
        if not skill_dir.exists():
            print(f"❌ Skill not found: {skill_name}")
            sys.exit(1)
    
    skill_md = skill_dir / "SKILL.md"
    meta = parse_skill_md(skill_md)
    stats = get_skill_stats(skill_dir)
    
    if args.json:
        result = {
            "name": meta.get("name", skill_name) if meta else skill_name,
            "dir": skill_name,
            "status": "disabled" if disabled else "enabled",
            "description": meta.get("description", "") if meta else "",
            "compatibility": meta.get("compatibility", "") if meta else "",
            "has_body": meta.get("has_body", False) if meta else False,
            **stats
        }
        print(json.dumps(result, indent=2))
        return
    
    print("=" * 60)
    print(f"SKILL INFO: {meta.get('name', skill_name) if meta else skill_name}")
    print("=" * 60)
    print()
    print(f"Directory:    {skill_dir.relative_to(WORKSPACE)}")
    print(f"Status:       {'🚫 DISABLED' if disabled else '✅ ENABLED'}")
    print()
    
    if meta:
        print(f"Description:  {meta.get('description', 'N/A')}")
        print(f"Compatibility: {meta.get('compatibility', 'N/A')}")
        print()
        print(f"Documentation: {'✅ Has body content' if meta.get('has_body') else '⚠️  Only frontmatter (no usage docs)'}")
        print(f"SKILL.md:     {meta.get('line_count', 0)} lines, {meta.get('char_count', 0)} chars")
    else:
        print("⚠️  No SKILL.md found or it's malformed!")
    
    print()
    print("CONTENTS:")
    print(f"  Files:      {stats['file_count']}")
    print(f"  Scripts:    {stats['script_count']} ({'✅' if stats['has_scripts'] else '❌'})")
    print(f"  References: {'✅' if stats['has_references'] else '❌'}")
    print(f"  Assets:     {'✅' if stats['has_assets'] else '❌'}")
    print(f"  Total size: {stats['total_size']:,} bytes")
    print()
    
    # List scripts
    scripts_dir = skill_dir / "scripts"
    if scripts_dir.exists():
        print("SCRIPTS:")
        for script in sorted(scripts_dir.iterdir()):
            if script.is_file() and not script.name.startswith("."):
                perms = "🔒" if not os.access(script, os.X_OK) else "⚡"
                print(f"  {perms} {script.name}")
        print()


def cmd_disable(args):
    """Disable a skill (move to .disabled/)."""
    skill_name = args.skill_name
    
    if skill_name == SELF_NAME:
        print("❌ Cannot disable skill-manager (self-protection)")
        sys.exit(1)
    
    src = SKILLS_DIR / skill_name
    dst = DISABLED_DIR / skill_name
    
    if not src.exists():
        print(f"❌ Skill not found: {skill_name}")
        sys.exit(1)
    
    if dst.exists():
        print(f"❌ Already disabled (or name collision in .disabled/): {skill_name}")
        sys.exit(1)
    
    # Create .disabled if needed
    DISABLED_DIR.mkdir(exist_ok=True)
    
    # Move the skill
    shutil.move(str(src), str(dst))
    print(f"✅ Disabled: {skill_name}")
    print(f"   Moved to: {dst.relative_to(WORKSPACE)}")


def cmd_enable(args):
    """Enable a skill (move from .disabled/)."""
    skill_name = args.skill_name
    
    src = DISABLED_DIR / skill_name
    dst = SKILLS_DIR / skill_name
    
    if not src.exists():
        print(f"❌ Skill not found in disabled: {skill_name}")
        print(f"   (Looking in: {DISABLED_DIR.relative_to(WORKSPACE)})")
        sys.exit(1)
    
    if dst.exists():
        print(f"❌ Name collision (skill already enabled): {skill_name}")
        sys.exit(1)
    
    # Move the skill
    shutil.move(str(src), str(dst))
    print(f"✅ Enabled: {skill_name}")
    print(f"   Moved to: {dst.relative_to(WORKSPACE)}")


def cmd_delete(args):
    """Delete a skill permanently."""
    skill_name = args.skill_name
    
    if skill_name == SELF_NAME:
        print("❌ Cannot delete skill-manager (self-protection)")
        sys.exit(1)
    
    # Look in both locations
    skill_dir = SKILLS_DIR / skill_name
    if not skill_dir.exists():
        skill_dir = DISABLED_DIR / skill_name
        if not skill_dir.exists():
            print(f"❌ Skill not found: {skill_name}")
            sys.exit(1)
    
    # Confirm
    if not args.force:
        print(f"⚠️  About to PERMANENTLY DELETE: {skill_name}")
        print(f"   Location: {skill_dir.relative_to(WORKSPACE)}")
        print(f"   Files: {get_skill_stats(skill_dir)['file_count']}")
        response = input("   Type 'yes' to confirm: ")
        if response.lower() != "yes":
            print("Cancelled.")
            sys.exit(0)
    
    # Delete
    shutil.rmtree(skill_dir)
    print(f"🗑️  Deleted: {skill_name}")


def cmd_create(args):
    """Create a new skill template."""
    skill_name = args.skill_name
    
    # Validate name
    if not skill_name.replace("-", "").replace("_", "").isalnum():
        print("❌ Invalid skill name. Use kebab-case (e.g., 'my-new-skill')")
        sys.exit(1)
    
    skill_dir = SKILLS_DIR / skill_name
    
    if skill_dir.exists():
        print(f"❌ Skill already exists: {skill_name}")
        sys.exit(1)
    
    # Create directories
    (skill_dir / "scripts").mkdir(parents=True)
    (skill_dir / "references").mkdir(parents=True)
    (skill_dir / "assets").mkdir(parents=True)
    
    # Write SKILL.md
    skill_md = skill_dir / "SKILL.md"
    author = get_author()
    skill_md.write_text(SKILL_TEMPLATE.format(skill_name=skill_name, author=author))
    
    print(f"✅ Created skill: {skill_name}")
    print(f"   Location: {skill_dir.relative_to(WORKSPACE)}")
    print()
    print("Structure:")
    print(f"  {skill_dir.relative_to(WORKSPACE)}/SKILL.md")
    print(f"  {skill_dir.relative_to(WORKSPACE)}/scripts/")
    print(f"  {skill_dir.relative_to(WORKSPACE)}/references/")
    print(f"  {skill_dir.relative_to(WORKSPACE)}/assets/")
    print()
    print("Next steps:")
    print("  1. Edit SKILL.md to add your skill's description and usage")
    print("  2. Add scripts to the scripts/ folder")
    print("  3. Make scripts executable: chmod +x scripts/*.py")


def cmd_validate(args):
    """Validate all skills for common issues."""
    enabled, disabled = discover_skills()
    all_skills = enabled + disabled
    
    issues = []
    warnings = []
    
    for skill in all_skills:
        skill_dir = SKILLS_DIR / skill["dir"]
        if skill["status"] == "disabled":
            skill_dir = DISABLED_DIR / skill["dir"]
        
        skill_md = skill_dir / "SKILL.md"
        
        # Check 1: SKILL.md exists
        if not skill_md.exists():
            issues.append({
                "skill": skill["name"],
                "severity": "error",
                "message": "Missing SKILL.md"
            })
            continue
        
        # Check 2: Parse frontmatter
        meta = parse_skill_md(skill_md)
        if meta is None:
            issues.append({
                "skill": skill["name"],
                "severity": "error",
                "message": "Malformed SKILL.md (cannot parse frontmatter)"
            })
            continue
        
        # Check 3: Required fields
        if not meta.get("name"):
            issues.append({
                "skill": skill["name"],
                "severity": "error",
                "message": "Missing 'name' in frontmatter"
            })
        
        if not meta.get("description"):
            issues.append({
                "skill": skill["name"],
                "severity": "warning",
                "message": "Missing 'description' in frontmatter"
            })
        
        # Check 4: Empty skill (no content beyond frontmatter)
        if not meta.get("has_body"):
            warnings.append({
                "skill": skill["name"],
                "severity": "warning",
                "message": "SKILL.md has no body content (usage documentation)"
            })
        
        # Check 5: No scripts/references/assets
        stats = get_skill_stats(skill_dir)
        if not stats["has_scripts"] and not stats["has_references"] and not stats["has_assets"]:
            warnings.append({
                "skill": skill["name"],
                "severity": "warning",
                "message": "Skill has no scripts, references, or assets (just SKILL.md)"
            })
        
        # Check 6: Scripts not executable
        if stats["has_scripts"]:
            scripts_dir = skill_dir / "scripts"
            for script in scripts_dir.iterdir():
                if script.is_file() and not script.name.startswith("."):
                    if script.suffix in [".py", ".sh", ".js", ".ts"]:
                        if not os.access(script, os.X_OK):
                            warnings.append({
                                "skill": skill["name"],
                                "severity": "warning",
                                "message": f"Script not executable: {script.name}"
                            })
    
    if args.json:
        print(json.dumps({
            "issues": issues,
            "warnings": warnings,
            "total_skills": len(all_skills),
            "issue_count": len(issues),
            "warning_count": len(warnings)
        }, indent=2))
        return
    
    print("=" * 60)
    print("SKILL VALIDATION REPORT")
    print("=" * 60)
    print()
    print(f"Scanned: {len(all_skills)} skills ({len(enabled)} enabled, {len(disabled)} disabled)")
    print()
    
    if issues:
        print(f"❌ ERRORS ({len(issues)}):")
        for issue in issues:
            print(f"   [{issue['skill']}] {issue['message']}")
        print()
    
    if warnings:
        print(f"⚠️  WARNINGS ({len(warnings)}):")
        for warning in warnings:
            print(f"   [{warning['skill']}] {warning['message']}")
        print()
    
    if not issues and not warnings:
        print("✅ All skills look good!")
    elif not issues:
        print("✅ No errors (warnings only)")
    else:
        print(f"❌ Found {len(issues)} error(s) that should be fixed")


def main():
    parser = argparse.ArgumentParser(
        description="Skill Manager - Manage Zo skills",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    %(prog)s list
    %(prog)s info supermemory
    %(prog)s disable midday-checkin
    %(prog)s enable midday-checkin
    %(prog)s create my-new-skill
    %(prog)s delete old-skill --force
    %(prog)s validate
        """
    )
    
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    # list
    list_parser = subparsers.add_parser("list", help="List all skills")
    list_parser.add_argument("--json", action="store_true", help="Output as JSON")
    
    # info
    info_parser = subparsers.add_parser("info", help="Show skill details")
    info_parser.add_argument("skill_name", help="Name of the skill")
    info_parser.add_argument("--json", action="store_true", help="Output as JSON")
    
    # disable
    disable_parser = subparsers.add_parser("disable", help="Disable a skill")
    disable_parser.add_argument("skill_name", help="Name of the skill")
    
    # enable
    enable_parser = subparsers.add_parser("enable", help="Enable a skill")
    enable_parser.add_argument("skill_name", help="Name of the skill")
    
    # delete
    delete_parser = subparsers.add_parser("delete", help="Delete a skill")
    delete_parser.add_argument("skill_name", help="Name of the skill")
    delete_parser.add_argument("--force", action="store_true", help="Skip confirmation")
    
    # create
    create_parser = subparsers.add_parser("create", help="Create a new skill")
    create_parser.add_argument("skill_name", help="Name for the new skill (kebab-case)")
    
    # validate
    validate_parser = subparsers.add_parser("validate", help="Validate all skills")
    validate_parser.add_argument("--json", action="store_true", help="Output as JSON")
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        sys.exit(1)
    
    # Route to command
    commands = {
        "list": cmd_list,
        "info": cmd_info,
        "disable": cmd_disable,
        "enable": cmd_enable,
        "delete": cmd_delete,
        "create": cmd_create,
        "validate": cmd_validate,
    }
    
    commands[args.command](args)


if __name__ == "__main__":
    main()
