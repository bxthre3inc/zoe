export type LLMProviderType = 'openai' | 'anthropic' | 'local' | 'zo';

export class LLMProvider {
  private provider: LLMProviderType;
  private apiKey: string;

  constructor(provider: LLMProviderType = 'openai', apiKey: string) {
    this.provider = provider;
    this.apiKey = apiKey;
  }

  async complete(prompt: string): Promise<string> {
    switch (this.provider) {
      case 'openai':
        return this.callOpenAI(prompt);
      case 'local':
        return 'Local LLM response (placeholder)';
      case 'zo':
        return 'Zo API response (placeholder)';
      default:
        return 'Provider not implemented';
    }
  }

  private async callOpenAI(prompt: string): Promise<string> {
    // Placeholder for OpenAI API call
    return `[OpenAI] ${prompt.slice(0, 50)}...`;
  }
}

export const llmProvider = new LLMProvider('local', '');
