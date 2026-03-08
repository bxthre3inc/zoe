# Contributing to The Zoe Project

Thank you for your interest in building the future of living AI assistants. This document will get you oriented and productive quickly.

---

## Why Contribute?

1. **Shape the future** — Living AI assistants don't exist yet. You get to define the patterns.
2. **Real impact** — Your work powers systems like FarmSense ($1B precision agriculture platform).
3. **Career growth** — Top contributors are fast-tracked for roles at Bxthre3 Inc and FarmSense.
4. **Learn systems** — Agent orchestration, memory architectures, personality engines — cutting edge.

---

## Development Setup

### Prerequisites

- [Zo Computer](https://zo.computer) account (free tier works)
- Bun runtime (`curl -fsSL https://bun.sh/install | bash`)
- GitHub account
- Basic TypeScript knowledge

### Local Development

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/zoe.git
cd zoe

# Install dependencies
bun install

# Run tests
bun test

# Start dev server
bun run dev
```

---

## Code Standards

### Philosophy

- **Actions over abstractions** — Working code beats perfect architecture
- **Readability counts** — Code is read 10x more than written
- **Living documentation** — Docs that rot are worse than no docs
- **Test what matters** — Unit tests for logic, integration tests for flows

### Style Guide

We use [Biome](https://biomejs.dev/) for formatting and linting:

```bash
# Check style
bun run lint

# Fix auto-fixable issues
bun run lint:fix

# Format code
bun run format
```

---

## Architecture Overview

```
zoe/
├── src/
│   ├── core/           # Memory, context, state management
│   ├── personality/    # Voice, behavior, communication style
│   ├── tools/          # Plugin system for external integrations
│   ├── agents/         # Agent orchestration and coordination
│   └── api/            # External API surface
├── examples/           # Working implementations
├── tests/              # Test suites
└── docs/               # Documentation
```

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Memory Graph** | Persistent knowledge graph (via Supermemory) |
| **Persona** | Behavioral identity + voice characteristics |
| **Tool System** | Plugin architecture for external integrations |
| **Agent UAO** | Orchestrator pattern for multi-agent systems |
| **Sub-Agents** | Task-specific helpers spawned by main agents |

---

## How to Contribute

### 1. Find an Issue

Browse [GitHub Issues](https://github.com/bxthre3inc/zoe/issues):

| Label | For |
|-------|-----|
| `good first issue` | New contributors |
| `help wanted` | Ready for pickup |
| `architecture` | Design decisions needing input |
| `bug` | Something's broken |
| `enhancement` | New feature ideas |

### 2. Start a Discussion

For big changes, open a [GitHub Discussion](https://github.com/bxthre3inc/zoe/discussions) first:

- New architectural patterns
- Breaking changes
- Major feature additions
- API surface changes

### 3. Submit a PR

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# ... edit files ...

# Run tests
bun test

# Commit with clear message
git commit -m "feat: add sub-agent spawning capability

- Implements personality inheritance
- Adds task delegation patterns
- Includes tests and documentation"

# Push and PR
git push origin feature/your-feature-name
# Open PR on GitHub
```

### PR Template

```markdown
## What
Brief description of changes

## Why
Problem this solves or opportunity it creates

## How to Test
Steps to verify it works

## Related
Fixes #123, addresses #456
```

---

## Areas We Need Help

### High Priority

- [ ] **Sub-agent system** — Agents that can spawn helpers with inherited personality
- [ ] **Memory optimization** — Query performance, garbage collection, compression
- [ ] **Tool plugins** — More integrations (GitHub, Linear, Notion, etc.)
- [ ] **Testing framework** — Better patterns for agent testing

### Medium Priority

- [ ] **Documentation** — More examples, tutorials, video guides
- [ ] **CLI improvements** — Developer experience enhancements
- [ ] **Monitoring** — Observability for production deployments
- [ ] **Security** — Hardening patterns for sensitive operations

### Exploration

- [ ] **Multi-user support** — Shared assistants with permission models
- [ ] **Voice interface** — Speech-to-text and text-to-speech integration
- [ ] **Mobile client** — Native app experience
- [ ] **Federation** — Multi-instance coordination

---

## Getting Unstuck

### Questions?

- [GitHub Discussions](https://github.com/bxthre3inc/zoe/discussions) — async, permanent
- [Discord](https://discord.gg/zoe) — real-time, ephemeral
- Tag `@brodiblanco` on GitHub for architecture questions

### Code of Conduct

Be kind. Be honest. Be helpful. Disagree respectfully. Focus on the work, not the person.

---

## Recognition

Top contributors are:
- Listed in [CONTRIBUTORS.md](CONTRIBUTORS.md)
- Fast-tracked for Bxthre3 Inc / FarmSense roles
- Invited to private contributor channels
- Credited in release notes

---

**Ready to build the future?** Pick an issue and let's go.
