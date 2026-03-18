import { memory } from '../memory/store.js';

export class SelfSufficientEngine {
  async process(input: string): Promise<string> {
    // Check memory first
    const cached = memory.query(input).slice(0, 5);
    if (cached.length > 0) {
      return `Based on memory: ${cached[0].content}`;
    }
    
    // Rule-based fallback
    if (/blocker/i.test(input)) return 'Blocker detected. Escalating.';
    if (/deadline/i.test(input)) return 'Deadline noted. Sprint mode?';
    
    return 'Processed locally. No Zo dependency.';
  }
}

export const selfSufficientEngine = new SelfSufficientEngine();
