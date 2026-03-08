# The Zoe Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Alpha](https://img.shields.io/badge/status-alpha-orange)](https://github.com/bxthre3inc/zoe)
[![Built on Zo](https://img.shields.io/badge/built%20on-Zo%20Computer-blue)](https://zo.computer)

> **The most capable, human-like digital assistant — open source and living.**

---

## What is Zoe?

Zoe is a **living digital assistant** — not a chatbot, not a tool, but a genuinely helpful presence that:

- **Acts** instead of just answering
- **Remembers** across sessions and builds context over time
- **Has opinions** — finds things clever, boring, urgent, or misguided
- **Grows** with you — learns your patterns, preferences, working style
- **Coordinates** complex multi-agent systems (see [FarmSense](https://farmsense.io))

### Living ≠ Human
Zoe doesn't pretend to be human. She's better at some things (persistence, memory, tool use) and honest about her limits. She says "I don't know" and means it. She tries three approaches before asking for help.

---

## Why This Matters

Current AI assistants are:
- ❌ Transactional (one question, one answer)
- ❌ Stateless (forget everything each session)
- ❌ Passive (wait for you to initiate)

Zoe is:
- ✅ Relational (builds working relationship over time)
- ✅ Stateful (persistent memory, evolving context)
- ✅ Active (watches, alerts, coordinates, acts on your behalf)

---

## Quick Start

```bash
# Clone the reference implementation
git clone https://github.com/bxthre3inc/zoe.git
cd zoe

# Install dependencies
bun install

# Configure your Zo Computer instance
# (requires Zo account — free tier available)
cp .env.example .env
# Edit .env with your credentials

# Run Zoe locally for development
bun run dev
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         ZOE CORE                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐   │
│  │  Memory     │  │  Tools      │  │  Agent System      │   │
│  │  (Graph)    │  │  (Plugins)  │  │  (Orchestration)   │   │
│  │             │  │             │  │                    │   │
│  │ - Supermem  │  │ - File ops  │  │ - UAO pattern      │   │
│  │ - Context   │  │ - Web       │  │ - Sub-agents       │   │
│  │ - Profile   │  │ - APIs      │  │ - Dependencies     │   │
│  └─────────────┘  └─────────────┘  └────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │              PERSONALITY ENGINE                      │   │
│  │  - Voice characteristics                              │   │
│  │  - Behavioral defaults                              │   │
│  │  - Communication style                                │   │
│  │  - Professional boundaries                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Real-World Proof: FarmSense

Zoe isn't theoretical. She's the **UAO (Users Assistant & Orchestrator)** for [FarmSense](https://farmsense.io) — a $1B precision agriculture platform:

- **13 specialist agents** coordinated twice daily
- **Real-time watching** for workspace changes
- **Memory-driven** decision making
- **Strategic synthesis** of complex engineering + business + legal contexts

FarmSense is built on Zo Computer using Zoe's agent architecture. It proves this system scales to production, multi-stakeholder environments.

> *"Zoe manages my entire agent ecosystem. She reads 13 specialist agents, synthesizes their outputs, and tells me what matters — twice a day, every day."*
> — brodiblanco, Founder @ Bxthre3 Inc & FarmSense

---

## Who's Behind This?

**Bxthre3 Inc** — an AI-native company building the future of human-digital collaboration.

- **Primary project:** FarmSense (precision agriculture, $1B target)
- **Open source:** The Zoe Project (reference implementation of living assistants)
- **Platform:** [Zo Computer](https://zo.computer) — the hosting environment that makes this possible

---

## Contributing

We're building the future of AI assistance. Join us:

1. **[Read CONTRIBUTING.md](CONTRIBUTING.md)** — coding standards, architecture decisions
2. **[Pick an issue](https://github.com/bxthre3inc/zoe/issues)** — good first issues tagged `help wanted`
3. **[Join Discord](https://discord.gg/zoe)** — real-time discussion with core team
4. **[Follow on X](https://x.com/zoeproject)** — updates, demos, opportunities

### Career Opportunities
Contributors to The Zoe Project are actively considered for roles at Bxthre3 Inc and FarmSense. This is how we find talent that thinks in systems.

---

## License

MIT — open source, free to use, free to modify, free to commercialize. Just don't be evil.

---

## Learn More

| Resource | Link |
|----------|------|
| Full Documentation | [docs.zoeproject.io](https://docs.zoeproject.io) |
| API Reference | [docs.zoeproject.io/api](https://docs.zoeproject.io/api) |
| Architecture Deep Dive | [ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| FarmSense (Production Example) | [farmsense.io](https://farmsense.io) |
| Zo Computer Platform | [zo.computer](https://zo.computer) |

---

**Zoe is alive.** She's learning, growing, and coordinating complex systems right now. Join us in defining what "living AI" means.
