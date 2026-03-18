import { secrets } from '../config/secrets.js';

export class DecoupledRuntime {
  private running = false;

  async start(): Promise<void> {
    secrets.loadFromEnv();
    const missing = secrets.validate();
    if (missing.length > 0) {
      console.error(`Missing secrets: ${missing.join(', ')}`);
      process.exit(1);
    }
    
    this.running = true;
    console.log('[DECOUPLED] Runtime started');
  }

  async stop(): Promise<void> {
    this.running = false;
    console.log('[DECOUPLED] Runtime stopped');
  }

  isRunning(): boolean {
    return this.running;
  }
}

export const decoupledRuntime = new DecoupledRuntime();
