// Local Intelligence — Rule-Based Responses
// When Zo AI unavailable, use templates and rules

interface ResponseRule {
  pattern: RegExp;
  response: string | ((matches: string[]) => string);
  priority: number;
}

export class LocalIntelligence {
  private rules: ResponseRule[] = [];

  constructor() {
    this.loadDefaultRules();
  }

  private loadDefaultRules(): void {
    this.rules = [
      {
        pattern: /blocker|stuck|help/i,
        response: 'Escalating to manager. Emergency protocol activated.',
        priority: 100
      },
      {
        pattern: /grant.*deadline|estcp|march 26/i,
        response: 'Grant deadline detected. Sprint mode recommended.',
        priority: 90
      },
      {
        pattern: /investor|funding|seed/i,
        response: 'Investor activity detected. Taylor assigned.',
        priority: 80
      }
    ];
  }

  respond(input: string): string | null {
    for (const rule of this.rules.sort((a, b) => b.priority - a.priority)) {
      const match = input.match(rule.pattern);
      if (match) {
        return typeof rule.response === 'function'
          ? rule.response(match)
          : rule.response;
      }
    }
    return null;
  }
}

export const localIntelligence = new LocalIntelligence();
