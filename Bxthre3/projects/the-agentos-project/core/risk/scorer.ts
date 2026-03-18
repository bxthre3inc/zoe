// Risk Scorer — Sub-Second Risk Assessment & Auto-Routing
// Evaluates events and routes to appropriate department or escalates

import { eventBus, EventTypes } from '../events/bus';

export interface RiskFactors {
  financial: number;      // 0-100
  legal: number;          // 0-100
  technical: number;      // 0-100
  reputational: number;   // 0-100
  operational: number;    // 0-100
}

export interface RiskAssessment {
  score: number;          // 0-100 overall
  factors: RiskFactors;
  confidence: number;     // 0-100
  category: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  autoRoute: string | null; // Department or 'escalate'
  requiresHuman: boolean;
  reasoning: string[];
  assessedAt: string;
}

export interface ScorableEvent {
  type: 'grant_posted' | 'investor_email' | 'competitor_move' | 'regulatory_change' | 'technical_alert' | 'market_shift' | 'team_conflict';
  source: string;
  content: string;
  metadata: {
    funding?: number;
    deadline?: string;
    competitor?: string;
    regulation?: string;
    severity?: string;
  };
}

export class RiskScorer {
  private assessments: Map<string, RiskAssessment> = new Map();
  private readonly AUTO_ROUTE_THRESHOLD = 15; // Risk below this = auto-route
  private readonly ESCALATION_THRESHOLD = 75; // Risk above this = human

  // Sub-second risk assessment
  async assess(event: ScorableEvent): Promise<RiskAssessment> {
    const startTime = Date.now();
    
    const factors = await this.calculateFactors(event);
    const score = this.calculateOverallScore(factors);
    const confidence = this.calculateConfidence(event);
    
    const assessment: RiskAssessment = {
      score,
      factors,
      confidence,
      category: this.categorize(score),
      autoRoute: this.determineRoute(score, event.type),
      requiresHuman: score >= this.ESCALATION_THRESHOLD || confidence < 60,
      reasoning: this.generateReasoning(factors, event),
      assessedAt: new Date().toISOString()
    };

    // Store assessment
    const eventId = `${event.type}-${Date.now()}`;
    this.assessments.set(eventId, assessment);

    // Sub-second check
    const elapsed = Date.now() - startTime;
    if (elapsed > 1000) {
      console.warn(`[RiskScorer] Assessment took ${elapsed}ms (target: <1000ms)`);
    }

    // Auto-route or escalate
    this.executeRouting(event, assessment);

    return assessment;
  }

  // Calculate individual risk factors
  private async calculateFactors(event: ScorableEvent): Promise<RiskFactors> {
    const content = event.content.toLowerCase();
    const metadata = event.metadata;

    // Financial risk
    let financial = 0;
    if (metadata.funding && metadata.funding > 1000000) financial += 30;
    if (metadata.funding && metadata.funding > 5000000) financial += 40;
    if (content.includes('investment') || content.includes('funding')) financial += 20;
    if (content.includes('series') || content.includes('round')) financial += 25;

    // Legal risk
    let legal = 0;
    if (content.includes('regulation') || content.includes('compliance')) legal += 40;
    if (content.includes('patent') || content.includes('ip')) legal += 30;
    if (content.includes('lawsuit') || content.includes('litigation')) legal += 80;
    if (metadata.regulation) legal += 35;

    // Technical risk
    let technical = 0;
    if (content.includes('security') || content.includes('vulnerability')) technical += 60;
    if (content.includes('outage') || content.includes('downtime')) technical += 70;
    if (content.includes('database') || content.includes('migration')) technical += 40;
    if (event.type === 'technical_alert') technical += 50;

    // Reputational risk
    let reputational = 0;
    if (content.includes('pr') || content.includes('press')) reputational += 35;
    if (content.includes('twitter') || content.includes('x.com')) reputational += 30;
    if (content.includes('crisis') || content.includes('scandal')) reputational += 80;
    if (event.type === 'market_shift') reputational += 25;

    // Operational risk
    let operational = 0;
    if (content.includes('deadline') && metadata.deadline) {
      const days = this.daysUntil(metadata.deadline);
      if (days < 3) operational += 60;
      else if (days < 7) operational += 40;
      else if (days < 14) operational += 20;
    }
    if (content.includes('team') || content.includes('resignation')) operational += 50;
    if (event.type === 'team_conflict') operational += 45;

    return {
      financial: Math.min(100, financial),
      legal: Math.min(100, legal),
      technical: Math.min(100, technical),
      reputational: Math.min(100, reputational),
      operational: Math.min(100, operational)
    };
  }

  // Calculate overall score (weighted)
  private calculateOverallScore(factors: RiskFactors): number {
    // Weights based on Bxthre3 priorities
    const weights = {
      financial: 0.25,
      legal: 0.30,        // High priority due to patent strategy
      technical: 0.20,
      reputational: 0.10,
      operational: 0.15
    };

    const weighted = 
      factors.financial * weights.financial +
      factors.legal * weights.legal +
      factors.technical * weights.technical +
      factors.reputational * weights.reputational +
      factors.operational * weights.operational;

    return Math.round(weighted);
  }

  // Calculate confidence in assessment
  private calculateConfidence(event: ScorableEvent): number {
    let confidence = 70; // Base confidence

    // Higher confidence with more metadata
    if (event.metadata.funding) confidence += 10;
    if (event.metadata.deadline) confidence += 10;
    if (event.metadata.competitor) confidence += 5;
    if (event.metadata.regulation) confidence += 10;

    // Higher confidence with longer content (more signals)
    if (event.content.length > 200) confidence += 10;

    return Math.min(100, confidence);
  }

  // Categorize risk level
  private categorize(score: number): RiskAssessment['category'] {
    if (score < 10) return 'safe';
    if (score < 30) return 'low';
    if (score < 50) return 'medium';
    if (score < 75) return 'high';
    return 'critical';
  }

  // Determine routing based on risk and event type
  private determineRoute(score: number, type: ScorableEvent['type']): string | null {
    // High risk = escalate to human
    if (score >= this.ESCALATION_THRESHOLD) return 'escalate';
    
    // Critical events = escalate regardless of score
    if (type === 'team_conflict' || type === 'regulatory_change') return 'escalate';

    // Route to departments based on type and risk
    const routingMap: Record<typeof type, string> = {
      grant_posted: 'sales',      // Grant team handles
      investor_email: 'sales',    // Investor relations
      competitor_move: 'strategy', // Strategy department
      regulatory_change: 'legal', // Always legal
      technical_alert: 'engineering', // Engineering
      market_shift: 'strategy',   // Strategy
      team_conflict: 'escalate'   // Always escalate
    };

    return routingMap[type] || 'escalate';
  }

  // Generate reasoning for assessment
  private generateReasoning(factors: RiskFactors, event: ScorableEvent): string[] {
    const reasoning: string[] = [];
    
    const factorNames: (keyof RiskFactors)[] = ['financial', 'legal', 'technical', 'reputational', 'operational'];
    
    for (const factor of factorNames) {
      if (factors[factor] > 50) {
        reasoning.push(`${factor}: ${factors[factor]}/100 - elevated risk`);
      }
    }

    if (reasoning.length === 0) {
      reasoning.push('All factors within normal range');
    }

    return reasoning;
  }

  // Execute routing decision
  private executeRouting(event: ScorableEvent, assessment: RiskAssessment): void {
    if (assessment.requiresHuman || assessment.autoRoute === 'escalate') {
      eventBus.publish(EventTypes.HUMAN_ESCALATION, {
        event,
        assessment,
        reason: 'High risk or critical event type',
        suggestedAction: 'Review and decide'
      });
    } else if (assessment.autoRoute) {
      eventBus.publish(EventTypes.DEPARTMENT_ROUTED, {
        event,
        assessment,
        department: assessment.autoRoute,
        autoApproved: assessment.score < this.AUTO_ROUTE_THRESHOLD
      });
    }

    // Always log for audit
    eventBus.publish(EventTypes.RISK_ASSESSED, {
      eventType: event.type,
      score: assessment.score,
      category: assessment.category,
      routed: assessment.autoRoute,
      timestamp: assessment.assessedAt
    });
  }

  // Helper: Days until date
  private daysUntil(dateStr: string): number {
    const target = new Date(dateStr);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  // Get recent assessments
  getRecent(limit: number = 50): RiskAssessment[] {
    return Array.from(this.assessments.values())
      .sort((a, b) => new Date(b.assessedAt).getTime() - new Date(a.assessedAt).getTime())
      .slice(0, limit);
  }

  // Get stats
  getStats(): {
    total: number;
    byCategory: Record<string, number>;
    avgResponseTime: number;
    escalated: number;
    autoRouted: number;
  } {
    const all = Array.from(this.assessments.values());
    
    const byCategory: Record<string, number> = {};
    for (const a of all) {
      byCategory[a.category] = (byCategory[a.category] || 0) + 1;
    }

    return {
      total: all.length,
      byCategory,
      avgResponseTime: 0.5, // Placeholder: 500ms average
      escalated: all.filter(a => a.requiresHuman).length,
      autoRouted: all.filter(a => a.autoRoute && a.autoRoute !== 'escalate').length
    };
  }
}

export const riskScorer = new RiskScorer();
