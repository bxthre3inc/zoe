// Sub-Agent System — Parallel Task Execution
// Phase 7 of AgentOS 3.0 Implementation

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { memory } from '../memory/store';
import { org } from '../hierarchy/org';
import { Employee } from '../hierarchy/types';

const SUBAGENT_DIR = '/home/.z/agentos/subagents';
const ACTIVE_DIR = `${SUBAGENT_DIR}/active`;
const COMPLETED_DIR = `${SUBAGENT_DIR}/completed`;

if (!existsSync(SUBAGENT_DIR)) mkdirSync(SUBAGENT_DIR, { recursive: true });
if (!existsSync(ACTIVE_DIR)) mkdirSync(ACTIVE_DIR, { recursive: true });
if (!existsSync(COMPLETED_DIR)) mkdirSync(COMPLETED_DIR, { recursive: true });

export interface SubAgent {
  id: string;
  parentId: string; // employee that spawned this
  name: string;
  
  // Task definition
  task: string;
  scope: string;
  deliverables: string[];
  
  // Inheritance
  inheritedSkills: string[];
  inheritedTools: string[];
  
  // Status
  status: 'spawning' | 'running' | 'completed' | 'failed';
  spawnedAt: string;
  startedAt?: string;
  completedAt?: string;
  
  // Results
  results?: any;
  artifacts: string[]; // file paths produced
  
  // Error handling
  error?: string;
  retryCount: number;
  maxRetries: number;
}

export interface SpawnRequest {
  parentId: string;
  name: string;
  task: string;
  scope: string;
  deliverables: string[];
  count: number; // how many sub-agents to spawn
  maxRetries?: number;
}

class SubAgentSpawner {
  // Spawn multiple sub-agents for parallel execution
  spawn(request: SpawnRequest): SubAgent[] {
    const parent = org.get(request.parentId);
    if (!parent) throw new Error(`Parent agent ${request.parentId} not found`);

    const spawned: SubAgent[] = [];

    for (let i = 0; i < request.count; i++) {
      const subAgent: SubAgent = {
        id: `SUB-${Date.now()}-${i}`,
        parentId: request.parentId,
        name: `${request.name}-${i + 1}`,
        task: request.task,
        scope: this.scopeForIndex(request.scope, i, request.count),
        deliverables: request.deliverables,
        inheritedSkills: parent.skills,
        inheritedTools: parent.tools,
        status: 'spawning',
        spawnedAt: new Date().toISOString(),
        artifacts: [],
        retryCount: 0,
        maxRetries: request.maxRetries || 3
      };

      // Save to active
      writeFileSync(
        `${ACTIVE_DIR}/${subAgent.id}.json`,
        JSON.stringify(subAgent, null, 2)
      );

      spawned.push(subAgent);

      // Log
      memory.add({
        id: `spawn-${subAgent.id}`,
        content: `Sub-agent spawned: ${subAgent.name} by ${parent.name} for task: ${subAgent.task}`,
        timestamp: subAgent.spawnedAt,
        source: 'subagent_spawner',
        confidence: 1.0
      });

      // Connect to parent
      memory.connect({
        id: `parent-${subAgent.id}`,
        from: `agent-${request.parentId}`,
        to: `spawn-${subAgent.id}`,
        type: 'derives',
        strength: 1.0,
        timestamp: subAgent.spawnedAt
      });
    }

    return spawned;
  }

  // Mark sub-agent as running
  start(subAgentId: string): SubAgent | null {
    const subAgent = this.loadActive(subAgentId);
    if (!subAgent) return null;

    subAgent.status = 'running';
    subAgent.startedAt = new Date().toISOString();
    this.saveActive(subAgent);

    return subAgent;
  }

  // Complete a sub-agent with results
  complete(subAgentId: string, results: any, artifacts: string[]): SubAgent | null {
    const subAgent = this.loadActive(subAgentId);
    if (!subAgent) return null;

    subAgent.status = 'completed';
    subAgent.completedAt = new Date().toISOString();
    subAgent.results = results;
    subAgent.artifacts = artifacts;

    // Move to completed
    this.moveToCompleted(subAgent);

    // Log
    memory.add({
      id: `complete-${subAgentId}`,
      content: `Sub-agent completed: ${subAgent.name}. Produced ${artifacts.length} artifacts.`,
      timestamp: subAgent.completedAt,
      source: 'subagent_spawner',
      confidence: 1.0
    });

    // Connect results to parent
    memory.connect({
      id: `result-${subAgentId}`,
      from: `spawn-${subAgentId}`,
      to: `complete-${subAgentId}`,
      type: 'updates',
      strength: 1.0,
      timestamp: subAgent.completedAt
    });

    return subAgent;
  }

  // Mark failure (with auto-retry)
  fail(subAgentId: string, error: string): SubAgent | null {
    const subAgent = this.loadActive(subAgentId);
    if (!subAgent) return null;

    subAgent.error = error;
    subAgent.retryCount++;

    if (subAgent.retryCount >= subAgent.maxRetries) {
      subAgent.status = 'failed';
      this.moveToCompleted(subAgent);

      // Escalate to parent
      console.log(`[SUBAGENT] ${subAgent.name} failed after ${subAgent.retryCount} retries: ${error}`);
    } else {
      // Retry: reset to spawning
      subAgent.status = 'spawning';
      subAgent.spawnedAt = new Date().toISOString();
      this.saveActive(subAgent);

      console.log(`[SUBAGENT] ${subAgent.name} retry ${subAgent.retryCount}/${subAgent.maxRetries}`);
    }

    return subAgent;
  }

  // Merge results from all sub-agents back to parent
  mergeResults(parentId: string, subAgentIds: string[]): MergedResult {
    const completed: SubAgent[] = [];
    const failed: SubAgent[] = [];
    const pending: string[] = [];

    for (const id of subAgentIds) {
      const sub = this.loadCompleted(id) || this.loadActive(id);
      if (!sub) {
        pending.push(id);
        continue;
      }

      if (sub.status === 'completed') completed.push(sub);
      else if (sub.status === 'failed') failed.push(sub);
      else pending.push(id);
    }

    // Merge artifacts
    const allArtifacts = completed.flatMap(s => s.artifacts);

    // Build merged result
    const merged: MergedResult = {
      parentId,
      completed: completed.length,
      failed: failed.length,
      pending: pending.length,
      total: subAgentIds.length,
      success: failed.length === 0 && pending.length === 0,
      artifacts: allArtifacts,
      results: completed.map(s => ({
        subAgentId: s.id,
        name: s.name,
        scope: s.scope,
        results: s.results,
        artifacts: s.artifacts
      })),
      errors: failed.map(s => ({
        subAgentId: s.id,
        name: s.name,
        error: s.error
      }))
    };

    // Log merge
    memory.add({
      id: `merge-${parentId}-${Date.now()}`,
      content: `Sub-agent results merged for ${parentId}: ${merged.completed} completed, ${merged.failed} failed, ${merged.pending} pending`,
      timestamp: new Date().toISOString(),
      source: 'subagent_spawner',
      confidence: 1.0
    });

    return merged;
  }

  // List active sub-agents for a parent
  getActiveForParent(parentId: string): SubAgent[] {
    const files = readdirSync(ACTIVE_DIR).filter(f => f.endsWith('.json'));
    const active: SubAgent[] = [];

    for (const file of files) {
      const sub = this.loadActive(file.replace('.json', ''));
      if (sub && sub.parentId === parentId) {
        active.push(sub);
      }
    }

    return active;
  }

  // Check if all sub-agents of a parent are done
  areAllDone(parentId: string, subAgentIds: string[]): boolean {
    for (const id of subAgentIds) {
      const active = this.loadActive(id);
      if (active) return false; // still active
    }
    return true;
  }

  private scopeForIndex(baseScope: string, index: number, total: number): string {
    // Distribute scope evenly
    // e.g., "audit patents 1-50" → "audit patents 1-10", "audit patents 11-20", etc.
    return `${baseScope} (batch ${index + 1}/${total})`;
  }

  private loadActive(id: string): SubAgent | null {
    const path = `${ACTIVE_DIR}/${id}.json`;
    if (!existsSync(path)) return null;
    try {
      return JSON.parse(readFileSync(path, 'utf-8'));
    } catch {
      return null;
    }
  }

  private loadCompleted(id: string): SubAgent | null {
    const path = `${COMPLETED_DIR}/${id}.json`;
    if (!existsSync(path)) return null;
    try {
      return JSON.parse(readFileSync(path, 'utf-8'));
    } catch {
      return null;
    }
  }

  private saveActive(subAgent: SubAgent): void {
    writeFileSync(
      `${ACTIVE_DIR}/${subAgent.id}.json`,
      JSON.stringify(subAgent, null, 2)
    );
  }

  private moveToCompleted(subAgent: SubAgent): void {
    // Remove from active
    try {
      const fs = require('fs');
      fs.unlinkSync(`${ACTIVE_DIR}/${subAgent.id}.json`);
    } catch {}

    // Save to completed
    writeFileSync(
      `${COMPLETED_DIR}/${subAgent.id}.json`,
      JSON.stringify(subAgent, null, 2)
    );
  }
}

interface MergedResult {
  parentId: string;
  completed: number;
  failed: number;
  pending: number;
  total: number;
  success: boolean;
  artifacts: string[];
  results: {
    subAgentId: string;
    name: string;
    scope: string;
    results: any;
    artifacts: string[];
  }[];
  errors: {
    subAgentId: string;
    name: string;
    error?: string;
  }[];
}

export const spawner = new SubAgentSpawner();
