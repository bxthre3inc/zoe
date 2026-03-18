// Conflict Resolution — Mediation Protocol for AgentOS
// Gap 3: When two agents disagree, no mediation exists

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { org } from '../hierarchy/org';
import { eventBus, EventTypes } from '../events/bus';
import { memory } from '../memory/store';

const CONFLICTS_DIR = '/home/.z/agentos/conflicts';

export interface Conflict {
  id: string;
  timestamp: string;
  type: 'proposal' | 'priority' | 'resource' | 'facts' | 'strategy';
  status: 'open' | 'escalating' | 'mediated' | 'resolved' | 'stale';
  
  // Participants
  agentA: string;
  agentB: string;
  commonManager?: string;
  
  // The conflict
  context: string;
  agentAPosition: string;
  agentBPosition: string;
  
  // Resolution tracking
  mediator?: string;
  mediationStarted?: string;
  resolution?: string;
  winner?: 'agentA' | 'agentB' | 'compromise' | 'both-rejected';
  resolvedAt?: string;
  
  // Stale detection
  lastActivity: string;
}

export interface MediationRequest {
  conflictId: string;
  to: string; // manager to mediate
  urgency: 'low' | 'normal' | 'high' | 'critical';
  context: string;
}

export class ConflictResolver {
  constructor() {
    this.ensureDirs();
  }

  private ensureDirs(): void {
    if (!existsSync(CONFLICTS_DIR)) mkdirSync(CONFLICTS_DIR, { recursive: true });
  }

  // Detect conflict between two agents
  detectConflict(
    type: Conflict['type'],
    agentA: string,
    agentB: string,
    context: string,
    agentAPosition: string,
    agentBPosition: string
  ): Conflict {
    const conflict: Conflict = {
      id: `conflict-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      type,
      status: 'open',
      agentA,
      agentB,
      commonManager: this.findCommonManager(agentA, agentB),
      context,
      agentAPosition,
      agentBPosition,
      lastActivity: new Date().toISOString()
    };

    this.saveConflict(conflict);

    // Log in memory
    memory.add({
      id: `conflict-${conflict.id}`,
      content: `Conflict detected: ${agentA} vs ${agentB} on ${context}`,
      tags: ['conflict', type, agentA, agentB, 'open'],
      source: 'conflict-resolver'
    });

    // Emit event
    eventBus.publish('conflict.detected', 'conflict-resolver', {
      conflictId: conflict.id,
      type,
      agentA,
      agentB,
      context: context.slice(0, 100)
    }, 'high');

    return conflict;
  }

  private findCommonManager(agentA: string, agentB: string): string | undefined {
    const aManagers = this.getManagerChain(agentA);
    const bManagers = this.getManagerChain(agentB);
    
    // Find first common manager
    for (const manager of aManagers) {
      if (bManagers.includes(manager)) return manager;
    }
    
    return undefined;
  }

  private getManagerChain(agentId: string): string[] {
    const chain: string[] = [];
    let current = org.getEmployee(agentId)?.primaryManager;
    
    while (current) {
      chain.push(current);
      const manager = org.getEmployee(current);
      current = manager?.primaryManager;
    }
    
    return chain;
  }

  private saveConflict(conflict: Conflict): void {
    writeFileSync(
      `${CONFLICTS_DIR}/${conflict.id}.json`,
      JSON.stringify(conflict, null, 2)
    );
  }

  // Load conflict by ID
  getConflict(id: string): Conflict | null {
    const path = `${CONFLICTS_DIR}/${id}.json`;
    if (!existsSync(path)) return null;

    try {
      return JSON.parse(readFileSync(path, 'utf-8'));
    } catch {
      return null;
    }
  }

  // List all conflicts
  list(status?: Conflict['status']): Conflict[] {
    if (!existsSync(CONFLICTS_DIR)) return [];

    const conflicts: Conflict[] = [];
    for (const file of readdirSync(CONFLICTS_DIR)) {
      if (!file.endsWith('.json')) continue;
      try {
        const conflict = JSON.parse(readFileSync(`${CONFLICTS_DIR}/${file}`, 'utf-8'));
        if (!status || conflict.status === status) {
          conflicts.push(conflict);
        }
      } catch {}
    }

    return conflicts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // Get open conflicts requiring mediation
  getPendingMediation(): Conflict[] {
    return this.list('open').filter(c => {
      const hoursOpen = (Date.now() - new Date(c.timestamp).getTime()) / (1000 * 60 * 60);
      return hoursOpen > 4; // Escalate if open > 4 hours
    });
  }

  // Mediate a conflict (manager makes decision)
  mediate(
    conflictId: string,
    mediatorId: string,
    resolution: string,
    winner: Conflict['winner']
  ): Conflict | null {
    const conflict = this.getConflict(conflictId);
    if (!conflict) return null;
    if (conflict.status !== 'open' && conflict.status !== 'escalating') return null;

    conflict.mediator = mediatorId;
    conflict.mediationStarted = conflict.mediationStarted || new Date().toISOString();
    conflict.resolution = resolution;
    conflict.winner = winner;
    conflict.status = 'mediated';
    conflict.resolvedAt = new Date().toISOString();
    conflict.lastActivity = conflict.resolvedAt;

    this.saveConflict(conflict);

    // Notify participants
    eventBus.publish('conflict.resolved', 'conflict-resolver', {
      conflictId: conflict.id,
      mediator: mediatorId,
      winner,
      resolution: resolution.slice(0, 100)
    }, 'normal');

    // Log resolution in memory
    memory.add({
      id: `conflict-resolution-${conflict.id}`,
      content: `Conflict ${conflict.id} resolved by ${mediatorId}: ${resolution}`,
      tags: ['conflict', 'resolved', winner || 'compromise'],
      source: 'conflict-resolver',
      relatedTo: [`conflict-${conflict.id}`]
    });

    return conflict;
  }

  // Agents reach compromise without manager
  resolveByCompromise(
    conflictId: string,
    agentA: string,
    agentB: string,
    compromise: string
  ): Conflict | null {
    const conflict = this.getConflict(conflictId);
    if (!conflict) return null;
    if (conflict.agentA !== agentA || conflict.agentB !== agentB) return null;

    conflict.resolution = compromise;
    conflict.winner = 'compromise';
    conflict.status = 'resolved';
    conflict.resolvedAt = new Date().toISOString();
    conflict.lastActivity = conflict.resolvedAt;

    this.saveConflict(conflict);

    eventBus.publish('conflict.compromise', 'conflict-resolver', {
      conflictId: conflict.id,
      compromise: compromise.slice(0, 100)
    }, 'normal');

    return conflict;
  }

  // Check for stale conflicts (no activity in 24h)
  checkStale(): Conflict[] {
    const stale: Conflict[] = [];
    const cutoff = Date.now() - (24 * 60 * 60 * 1000);

    for (const conflict of this.list('open')) {
      if (new Date(conflict.lastActivity).getTime() < cutoff) {
        conflict.status = 'stale';
        this.saveConflict(conflict);
        stale.push(conflict);

        // Escalate to common manager's manager
        const escalateTo = this.findEscalationManager(conflict);
        if (escalateTo) {
          eventBus.publish('conflict.stale-escalated', 'conflict-resolver', {
            conflictId: conflict.id,
            staleSince: conflict.lastActivity,
            escalatedTo: escalateTo
          }, 'critical');
        }
      }
    }

    return stale;
  }

  private findEscalationManager(conflict: Conflict): string | undefined {
    if (!conflict.commonManager) return 'brodiblanco';
    
    const manager = org.getEmployee(conflict.commonManager);
    return manager?.primaryManager || 'brodiblanco';
  }

  // Auto-mediate using rules (for simple conflicts)
  autoMediate(conflictId: string): Conflict | null {
    const conflict = this.getConflict(conflictId);
    if (!conflict) return null;

    // Rule-based auto-mediation
    const resolution = this.applyMediationRules(conflict);
    if (!resolution) return null;

    conflict.mediator = 'system-auto';
    conflict.resolution = resolution.text;
    conflict.winner = resolution.winner;
    conflict.status = 'mediated';
    conflict.resolvedAt = new Date().toISOString();
    conflict.lastActivity = conflict.resolvedAt;

    this.saveConflict(conflict);

    return conflict;
  }

  private applyMediationRules(conflict: Conflict): { text: string; winner: Conflict['winner'] } | null {
    // Rule 1: Grant deadlines override routine work
    if (conflict.type === 'priority') {
      if (conflict.agentAPosition.includes('grant') && conflict.agentBPosition.includes('routine')) {
        return { text: 'Grant deadline priority. Agent A task proceeds.', winner: 'agentA' };
      }
      if (conflict.agentBPosition.includes('grant') && conflict.agentAPosition.includes('routine')) {
        return { text: 'Grant deadline priority. Agent B task proceeds.', winner: 'agentB' };
      }
    }

    // Rule 2: Safety/criticality wins
    if (conflict.type === 'proposal') {
      if (conflict.agentAPosition.includes('safety') || conflict.agentAPosition.includes('critical')) {
        return { text: 'Safety-critical concerns take precedence.', winner: 'agentA' };
      }
      if (conflict.agentBPosition.includes('safety') || conflict.agentBPosition.includes('critical')) {
        return { text: 'Safety-critical concerns take precedence.', winner: 'agentB' };
      }
    }

    // Rule 3: No auto-mediation possible
    return null;
  }

  // Get conflict statistics
  getStats(): {
    total: number;
    open: number;
    resolved: number;
    byType: Record<string, number>;
    avgResolutionHours?: number;
  } {
    const all = this.list();
    const resolved = all.filter(c => c.status === 'resolved' || c.status === 'mediated');
    
    const byType: Record<string, number> = {};
    for (const c of all) {
      byType[c.type] = (byType[c.type] || 0) + 1;
    }

    let totalHours = 0;
    for (const c of resolved) {
      if (c.resolvedAt && c.timestamp) {
        totalHours += (new Date(c.resolvedAt).getTime() - new Date(c.timestamp).getTime()) / (1000 * 60 * 60);
      }
    }

    return {
      total: all.length,
      open: all.filter(c => c.status === 'open' || c.status === 'escalating').length,
      resolved: resolved.length,
      byType,
      avgResolutionHours: resolved.length > 0 ? totalHours / resolved.length : undefined
    };
  }
}

export const conflictResolver = new ConflictResolver();
