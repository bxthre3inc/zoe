// AgentOS Daemon — Persistent Background Runner
// Runs 24/7, executes 12-hour cycles, never sleeps

import { AgentRuntime } from './agent-runtime';
import { EventBus } from '../events/bus';
import { memory } from '../memory/store';

interface DaemonConfig {
  cyclesPerDay: number;        // 2 (5:30 AM/PM)
  cycleTimes: string[];        // ['05:30', '17:30']
  timezone: string;            // 'America/Denver'
  enableWarRoom: boolean;      // true
  autoExecuteThreshold: number; // 4 (4/5 consensus)
  maxConcurrentAgents: number; // 10
}

export class AgentOSDaemon {
  private runtime: AgentRuntime;
  private eventBus: EventBus;
  private config: DaemonConfig;
  private nextCycleTimeout: NodeJS.Timeout | null = null;
  private isRunning = false;

  constructor(config: Partial<DaemonConfig> = {}) {
    this.runtime = new AgentRuntime();
    this.eventBus = new EventBus();
    this.config = {
      cyclesPerDay: 2,
      cycleTimes: ['05:30', '17:30'],
      timezone: 'America/Denver',
      enableWarRoom: true,
      autoExecuteThreshold: 4,
      maxConcurrentAgents: 10,
      ...config
    };
  }

  // Start the daemon
  async start(): Promise<void> {
    if (this.isRunning) {
      console.log('[Daemon] Already running');
      return;
    }

    this.isRunning = true;
    console.log('[Daemon] AgentOS Daemon started');
    console.log(`[Daemon] Cycles: ${this.config.cycleTimes.join(', ')} ${this.config.timezone}`);
    console.log(`[Daemon] War Room: ${this.config.enableWarRoom ? 'enabled' : 'disabled'}`);
    console.log(`[Daemon] Auto-execute threshold: ${this.config.autoExecuteThreshold}/5`);

    // Record startup in memory
    memory.remember('daemon_start', 'agentos_system', {
      timestamp: new Date().toISOString(),
      config: this.config
    }, ['system', 'daemon']);

    // Schedule first cycle
    this.scheduleNextCycle();

    // Also listen for immediate triggers (emails, alerts)
    this.setupRealtimeListeners();
  }

  // Stop the daemon
  stop(): void {
    this.isRunning = false;
    if (this.nextCycleTimeout) {
      clearTimeout(this.nextCycleTimeout);
    }
    console.log('[Daemon] Stopped');
  }

  // Calculate time until next cycle
  private scheduleNextCycle(): void {
    const now = new Date();
    const timezone = this.config.timezone;
    
    // Convert to target timezone
    const options: Intl.DateTimeTimeZoneOptions = { timeZone: timezone };
    const timeString = now.toLocaleTimeString('en-US', { ...options, hour12: false, hour: '2-digit', minute: '2-digit' });
    const [currentHour, currentMin] = timeString.split(':').map(Number);
    const currentMinutes = currentHour * 60 + currentMin;

    // Find next cycle time
    const cycleMinutes = this.config.cycleTimes.map(t => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    });

    let nextCycleMinutes = cycleMinutes.find(m => m > currentMinutes);
    let nextDay = 0;

    if (!nextCycleMinutes) {
      // All cycles passed today, take first tomorrow
      nextCycleMinutes = cycleMinutes[0];
      nextDay = 1;
    }

    const msUntil = (nextCycleMinutes - currentMinutes + nextDay * 24 * 60) * 60 * 1000;
    const nextTime = new Date(now.getTime() + msUntil);

    console.log(`[Daemon] Next cycle: ${nextTime.toLocaleString()} (${Math.round(msUntil / 1000 / 60)} minutes)`);

    this.nextCycleTimeout = setTimeout(() => {
      this.executeCycle();
    }, msUntil);
  }

  // Execute one 12-hour cycle
  private async executeCycle(): Promise<void> {
    const cycleStart = Date.now();
    console.log(`\n[${new Date().toISOString()}] === 12-HOUR CYCLE STARTING ===`);

    try {
      // 1. Pre-cycle: Check if brodiblanco is available
      const availability = await this.checkExecutiveAvailability();
      if (!availability.available && !availability.urgentOverride) {
        console.log('[Daemon] Executive unavailable, delaying cycle...');
        // Reschedule for 30 min later
        this.nextCycleTimeout = setTimeout(() => this.executeCycle(), 30 * 60 * 1000);
        return;
      }

      // 2. Execute all 20 employees in parallel
      console.log('[Daemon] Executing 20 employees in parallel...');
      const results = await this.runtime.executeParallel(
        this.getAllEmployeeTasks()
      );

      // 3. Store results
      for (const result of results) {
        memory.remember(
          `cycle_${new Date().toISOString().split('T')[0]}`,
          result.agentId,
          {
            status: result.status,
            actions: result.actions.length,
            duration: result.durationMs,
            output: result.output.substring(0, 1000) // Truncate
          },
          ['cycle', 'employee', result.agentId]
        );
      }

      // 4. Detect conflicts and run WAR ROOM
      if (this.config.enableWarRoom) {
        console.log('[Daemon] Running WAR ROOM...');
        await this.runWarRoomConsensus(results);
      }

      // 5. Handle escalations
      const escalations = results.filter(r => 
        r.actions.some(a => a.type === 'escalation')
      );
      if (escalations.length > 0) {
        await this.handleEscalations(escalations);
      }

      // 6. Generate Erica briefing
      console.log('[Daemon] Generating Erica briefing...');
      await this.generateAndSendBriefing(results);

      // 7. Execute autonomous actions (4/5 consensus)
      await this.executeAutonomousActions(results);

      const cycleDuration = (Date.now() - cycleStart) / 1000 / 60;
      console.log(`[${new Date().toISOString()}] === CYCLE COMPLETE: ${cycleDuration.toFixed(1)} minutes ===\n`);

    } catch (error) {
      console.error('[Daemon] Cycle failed:', error);
      // Escalate to brodiblanco immediately
      await this.emergencyNotify(error);
    }

    // Schedule next cycle
    this.scheduleNextCycle();
  }

  // Check if brodiblanco is in meetings
  private async checkExecutiveAvailability(): Promise<{ available: boolean; urgentOverride: boolean }> {
    // Would check Google Calendar via integration
    // For now, assume available
    return { available: true, urgentOverride: false };
  }

  // Get tasks for all 20 employees
  private getAllEmployeeTasks(): any[] {
    // Returns 20 AgentTask objects
    return []; // Populated from org
  }

  // Run WAR ROOM consensus
  private async runWarRoomConsensus(results: any[]): Promise<void> {
    // Detect conflicts between agents
    // Run 4/5 voting
    // Auto-execute if threshold met
  }

  // Handle escalations to brodiblanco
  private async handleEscalations(escalations: any[]): Promise<void> {
    for (const escalation of escalations) {
      // Send SMS/email via Zo
      // Include context from employee
      // Set 24h timer for auto-escalation if no response
    }
  }

  // Generate and send Erica briefing
  private async generateAndSendBriefing(results: any[]): Promise<void> {
    // Erica synthesizes
    // Send via Zo notification system
    // SMS for critical, email for full briefing
  }

  // Execute actions that got 4/5 WAR ROOM consensus
  private async executeAutonomousActions(results: any[]): Promise<void> {
    // These happen without brodiblanco input
    // File writes, API calls, deployments
    // Logged for review
  }

  // Emergency notification
  private async emergencyNotify(error: Error): Promise<void> {
    // Immediate SMS to brodiblanco
    // Include error details
  }

  // Real-time listeners (emails, webhooks, etc.)
  private setupRealtimeListeners(): void {
    // Gmail webhook
    // GitHub webhook  
    // Discord alerts
    // Immediate trigger if critical event
  }

  // Public status
  getStatus(): {
    isRunning: boolean;
    nextCycle: string | null;
    lastCycle: string | null;
    totalCycles: number;
  } {
    return {
      isRunning: this.isRunning,
      nextCycle: this.nextCycleTimeout ? 'scheduled' : null,
      lastCycle: null, // Would track
      totalCycles: 0   // Would track
    };
  }
}

// Singleton instance
export const daemon = new AgentOSDaemon();

// CLI entry point
if (require.main === module) {
  const cmd = process.argv[2];
  
  if (cmd === 'start') {
    daemon.start().catch(console.error);
  } else if (cmd === 'stop') {
    daemon.stop();
  } else if (cmd === 'status') {
    console.log(daemon.getStatus());
  } else {
    console.log('Usage: ts-node daemon.ts [start|stop|status]');
  }
}
