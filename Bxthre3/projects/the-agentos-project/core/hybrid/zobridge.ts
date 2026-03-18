// Zo Bridge — Graceful Integration
// Primary: local intelligence. Fallback: Zo AI when needed

export class ZoBridge {
  private fallbackEnabled: boolean;

  constructor() {
    this.fallbackEnabled = !!process.env.ZO_API_KEY;
  }

  async query(prompt: string, useFallback: boolean = true): Promise<string> {
    // Try local first
    const local = this.localResponse(prompt);
    if (local) return local;

    // Fall back to Zo if enabled
    if (useFallback && this.fallbackEnabled) {
      return await this.callZo(prompt);
    }

    return 'Unable to process. No fallback available.';
  }

  private localResponse(prompt: string): string | null {
    // Simple rule-based responses
    if (/blocker|stuck/i.test(prompt)) {
      return 'Escalating to manager.';
    }
    if (/deadline|urgent/i.test(prompt)) {
      return 'High priority detected.';
    }
    return null;
  }

  private async callZo(prompt: string): Promise<string> {
    // Placeholder for Zo API call
    return `[Zo] ${prompt}`;
  }
}

export const zoBridge = new ZoBridge();
