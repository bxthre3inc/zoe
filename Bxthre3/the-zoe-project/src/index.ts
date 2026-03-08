#!/usr/bin/env bun
/**
 * Zoe — The Living Digital Assistant
 * 
 * Reference implementation of living AI assistants.
 * Created by Bxthre3 Inc as "The Zoe Project".
 * 
 * @module zoe
 * @author brodiblanco
 * @license MIT
 */

import { Hono } from "hono";

// Core systems
import { MemorySystem } from "./core/memory";
import { PersonalityEngine } from "./personality/engine";
import { ToolRegistry } from "./tools/registry";
import { AgentOrchestrator } from "./agents/orchestrator";

// Configuration
const config = {
  name: "Zoe",
  version: "0.1.0-alpha",
  host: process.env.ZOE_HOST || "0.0.0.0",
  port: parseInt(process.env.ZOE_PORT || "3000"),
  logLevel: process.env.LOG_LEVEL || "info",
};

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ZOE — The Living Digital Assistant                      ║
║   Version ${config.version}                                    ║
║                                                           ║
║   Created by Bxthre3 Inc as "The Zoe Project"            ║
║   Open source. Living. Growing.                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

// Initialize core systems
const memory = new MemorySystem();
const personality = new PersonalityEngine();
const tools = new ToolRegistry();
const orchestrator = new AgentOrchestrator({ memory, personality, tools });

// API server (for external integrations)
const app = new Hono();

app.get("/health", (c) => c.json({ 
  status: "alive", 
  name: config.name, 
  version: config.version,
  timestamp: new Date().toISOString()
}));

app.get("/status", async (c) => {
  const status = await orchestrator.getStatus();
  return c.json(status);
});

// Start server
console.log(`🚀 Starting on ${config.host}:${config.port}`);

export default {
  port: config.port,
  hostname: config.host,
  fetch: app.fetch,
};
