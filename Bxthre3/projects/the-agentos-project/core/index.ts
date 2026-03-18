// AgentOS 3.0 — Core Integration
// Phase 8 of AgentOS 3.0 Implementation
// This is the unified export of all AgentOS capabilities

// Phase 1: Supermemory Foundation
export { memory, userProfile } from './memory/store';
export type { MemoryNode, MemoryEdge, QueryResult, UserProfile } from './memory/types';

// Phase 2: Employee Hierarchy
export { org } from './hierarchy/org';
export type { 
  Employee, 
  Manager, 
  Executive, 
  EmployeeRole, 
  Department, 
  Shift,
  Blocker 
} from './hierarchy/types';

// Phase 3: Standup Protocol
export { router } from './protocol/messaging';
export type { 
  StandupMessage, 
  StandupReport, 
  Accomplishment, 
  BlockerReport, 
  Request,
  Envelope 
} from './protocol/types';

// Phase 4: Escalation Clock
export { escalationClock } from './escalation/clock';

// Phase 5: 12-Hour Reporting
export { synthesizer } from './reporting/synthesizer';
export type { DailyDigest, AgentSummary, DepartmentSummary } from './reporting/synthesizer';

// Phase 6: Sprint Mode
export { sprintMode } from './sprint/mode';
export type { Sprint, SprintObjection, Reassignment } from './sprint/mode';

// Phase 7: Sub-Agent System
export { spawner } from './subagent/spawner';
export type { SubAgent, SpawnRequest, MergedResult } from './subagent/spawner';

// Legacy Phase: Proposal System (from AgentOS 2.0)
export { 
  loadConfig, 
  saveConfig, 
  enableTrainingWheels, 
  disableTrainingWheels,
  getCriticalityForFile,
  shouldRequireApproval,
  canAutoExecute
} from './config-loader';
export type { Config } from './config-loader';

export {
  createProposal,
  loadProposal,
  listProposals,
  approveProposal,
  rejectProposal,
  executeProposal,
  generateDiff
} from './proposal-system';
export type { Proposal, FileChange } from './proposal-system';

// Live
export { EventBus } from './events/bus';

export { agentRuntime } from './runtime/agent-runtime';
export { daemon } from './runtime/daemon';

// Decoupled Infrastructure
export { llmProvider } from '../infrastructure/llm/provider';
export { storage } from '../infrastructure/storage/manager';
export { secrets } from '../infrastructure/config/secrets';
export { decoupledRuntime } from '../infrastructure/runtime/decoupled';

// Live Integrations
export { gmailIntegration } from '../integrations/gmail';
export { calendarIntegration } from '../integrations/calendar';
export { githubIntegration } from '../integrations/github';

// Hybrid Architecture
export { zoBridge } from './hybrid/zobridge';
export { engine } from './hybrid/engine';
export { localIntelligence } from './hybrid/local-intelligence';

// AgentOS 3.0 Main Interface
export class AgentOS {
  // Core systems
  static memory = memory;
  static org = org;
  static router = router;
  static escalation = escalationClock;
  static synthesizer = synthesizer;
  static sprint = sprintMode;
  static spawner = spawner;

  // Architecture Components
  static warRoom = warRoom;
  static monitors = monitors;
  static riskScorer = riskScorer;
  static departments = departmentRouter;
  static erica = erica;

  // Scheduler
  static scheduler = scheduler;

  // Runtime
  static runtime = agentRuntime;
  static daemon = daemon;

  // Decoupled mode
  static llm = llmProvider;
  static storage = storage;
  static secrets = secrets;

  // Hybrid Architecture
  static zo = zoBridge;
  static engine = engine;
  static localAI = localIntelligence;

  static async start(): Promise<void> {
    return daemon.start();
  }

  static async startDecoupled(): Promise<void> {
    return decoupledRuntime.start();
  }

  static async startHybrid(): Promise<void> {
    return engine.start();
  }

  static stop(): void {
    daemon.stop();
  }

  static getSchedulerStatus() {
    return scheduler.getStatus();
  }

  // Convenience methods
  static async dailyDigest() {
    const digest = synthesizer.generate();
    return {
      data: digest,
      formatted: synthesizer.format(digest)
    };
  }

  static async checkEscalations() {
    return escalationClock.check();
  }

  static async checkSprint() {
    return sprintMode.check();
  }

  static getStatus(): AgentOSStatus {
    const employees = org.listAll();
    const activeBlockers = escalationClock.getActive();
    const sprint = sprintMode.getActive();
    const now = new Date();

    return {
      timestamp: now.toISOString(),
      employees: {
        total: employees.length,
        byRole: {
          executive: employees.filter(e => e.role === 'executive').length,
          manager: employees.filter(e => e.role === 'manager').length,
          employee: employees.filter(e => e.role === 'employee').length
        },
        active: employees.filter(e => e.status === 'working').length,
        blocked: employees.filter(e => e.status === 'blocked').length
      },
      blockers: {
        active: activeBlockers.length,
        escalatedToHuman: activeBlockers.filter(b => b.humanEscalationPending).length,
        bySeverity: {
          p0: activeBlockers.filter(b => b.severity === 'p0').length,
          p1: activeBlockers.filter(b => b.severity === 'p1').length,
          p2: activeBlockers.filter(b => b.severity === 'p2').length,
          p3: activeBlockers.filter(b => b.severity === 'p3').length
        }
      },
      sprint: sprint ? {
        active: true,
        name: sprint.name,
        project: sprint.project,
        deadline: sprint.deadline,
        status: sprint.status
      } : { active: false }
    };
  }

  // Gap 1: Event Bus
  static publishEvent(type: string, source: string, payload: Record<string, unknown>, priority?: 'low' | 'normal' | 'high' | 'critical') {
    return eventBus.publish(type, source, payload, priority);
  }

  static subscribeToEvents(agentId: string, eventTypes: string[]) {
    return eventBus.subscribe(agentId, eventTypes);
  }

  // Gap 2: Snapshots
  static createSnapshot(label: string, description: string) {
    return snapshotManager.create(label, description);
  }

  static rollbackTo(snapshotId: string) {
    return snapshotManager.rollback(snapshotId);
  }

  static listSnapshots() {
    return snapshotManager.list();
  }

  // Gap 3: Conflict Resolution
  static detectConflict(type: 'proposal' | 'priority' | 'resource' | 'facts' | 'strategy', agentA: string, agentB: string, context: string, posA: string, posB: string) {
    return conflictResolver.detectConflict(type, agentA, agentB, context, posA, posB);
  }

  static mediateConflict(conflictId: string, mediatorId: string, resolution: string, winner: 'agentA' | 'agentB' | 'compromise' | 'both-rejected') {
    return conflictResolver.mediate(conflictId, mediatorId, resolution, winner);
  }

  // Gap 4: Knowledge Transfer
  static initiateTransfer(fromAgentId: string, toAgentId: string | undefined, reason: 'departure' | 'reassignment' | 'scale-up' | 'restructure', urgency: 'low' | 'normal' | 'high' | 'critical') {
    return knowledgeTransfer.initiateTransfer({ fromAgentId, toAgentId, reason, urgency });
  }

  static offboardAgent(agentId: string, reason: string) {
    return knowledgeTransfer.offboard(agentId, reason);
  }

  // 3.1: Subsidiary-Aware
  static subsidiary = subsidiaryManager;

  // 3.2: Project-Centric
  static projects = projectManager;

  // 3.3: Grant Lifecycle
  static grants = grantManager;

  // 3.4: IP Portfolio
  static ip = ipManager;

  // 3.5: Capacity Intelligence
  static capacity = {
    detectConflicts: () => projectManager.detectResourceConflicts(),
    getOverallocation: () => {
      const conflicts = projectManager.detectResourceConflicts();
      return conflicts.filter(c => c.severity === 'critical');
    }
  };

  // 3.6: Executive Briefing (Erica enhanced)
  static getBriefing(): string {
    const grantBriefing = grantManager.getCriticalBriefing();
    const ipBriefing = ipManager.getCriticalBriefing();
    const portfolio = projectManager.getPortfolioSummary();
    const conflicts = projectManager.detectResourceConflicts();

    return `
=== Bxthre3 Executive Briefing ===
${new Date().toLocaleString()}

🎯 PROJECTS: ${portfolio.active} active, ${portfolio.criticalDeadlines.length} critical deadlines

💰 GRANTS:
${grantBriefing}

🔒 IP:
${ipBriefing}

⚠️ CAPACITY:
${conflicts.length > 0 ? conflicts.map(c => `- ${c.agent}: ${c.suggestedAction}`).join('\n') : 'No overallocation detected'}

📊 NEXT ACTIONS:
${portfolio.criticalDeadlines.map(d => `- ${d.name}: due ${d.deadline}`).join('\n') || 'No immediate deadlines'}
`;
  }
}

interface AgentOSStatus {
  timestamp: string;
  employees: {
    total: number;
    byRole: Record<string, number>;
    active: number;
    blocked: number;
  };
  blockers: {
    active: number;
    escalatedToHuman: number;
    bySeverity: Record<string, number>;
  };
  sprint: {
    active: boolean;
    name?: string;
    project?: string;
    deadline?: string;
    status?: string;
  };
}

export default AgentOS;

// Bxthre3-specific optimizations
export { deadlineTracker, ipPortfolio, fundraisingManager, subsidiaryManager, dashboardManager, boardReportManager } from ./bxthre3/index.js;

// Orchestration exports
export { contextSharder, ContextShard } from './orchestrator/context.js';
export { personaEngine, AgentPersona } from './personas/engine.js';
export { hiringRecruiter, HiringRequest } from './hiring/recruiter.js';
export { performanceTracker, PerformanceMetrics } from './performance/tracker.js';
export { masterOrchestrator, Dimension, ShardConfig } from './orchestrator/master.js';

// Orchestration exports
export { contextSharder, ContextShard } from './orchestrator/context.js';
export { personaEngine, AgentPersona } from './personas/engine.js';
export { hiringRecruiter, HiringRequest } from './hiring/recruiter.js';
export { performanceTracker, PerformanceMetrics } from './performance/tracker.js';
export { masterOrchestrator, Dimension, ShardConfig } from './orchestrator/master.js';

// Human-readable improvements
export { notifications } from './notifications/manager.js';
export { auditor } from './audit/trail.js';
export { budget } from './budget/tracker.js';
export { emergency } from './emergency/override.js';
export { training } from './training/onboard.js';
export { chat } from './collaboration/chat.js';
export { compliance } from './compliance/logger.js';
export { analytics } from './analytics/predictive.js';

// Onboarding, Goals, Drift
export { onboarding } from './onboarding/system.js';
export { strategy } from './goals/strategy.js';
export { driftGuardian } from './drift/guardian.js';

// Security & Monitoring
export { secretRotation, SecretRotation } from "./security/rotation.js";
export { rateLimiter, RateLimiter } from "./security/rate-limiter.js";
export { backupManager, BackupManager } from "./snapshot/backup.js";
export { abTesting, ABTestingFramework } from "./analytics/ab-testing.js";
export { costDashboard, CostDashboard } from "./analytics/cost-dashboard.js";
export { voiceInterface, VoiceInterface } from "./voice/interface.js";
