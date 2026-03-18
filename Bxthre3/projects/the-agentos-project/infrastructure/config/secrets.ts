import { existsSync, readFileSync } from 'fs';

export class SecretsManager {
  private secrets: Map<string, string> = new Map();

  loadFromEnv(): void {
    const required = [
      'GMAIL_CLIENT_EMAIL',
      'GMAIL_PRIVATE_KEY',
      'OPENAI_API_KEY',
      'GITHUB_TOKEN'
    ];
    
    for (const key of required) {
      const value = process.env[key];
      if (value) this.secrets.set(key, value);
    }
  }

  loadFromFile(path: string): void {
    if (!existsSync(path)) return;
    const content = readFileSync(path, 'utf-8');
    const lines = content.split('\n');
    for (const line of lines) {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) this.secrets.set(match[1], match[2]);
    }
  }

  get(key: string): string | undefined {
    return this.secrets.get(key) || process.env[key];
  }

  validate(): string[] {
    const required = ['OPENAI_API_KEY'];
    return required.filter(k => !this.get(k));
  }
}

export const secrets = new SecretsManager();
