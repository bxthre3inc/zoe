import { BasePartnerIntegration } from './types';
import type { PartnerConfig, PartnerSession, IntegrationType } from './types';

export class PartnerIntegrationManager {
  private static instance: PartnerIntegrationManager;
  private partners: Map<string, BasePartnerIntegration> = new Map();

  private constructor() {}

  static getInstance(): PartnerIntegrationManager {
    if (!PartnerIntegrationManager.instance) {
      PartnerIntegrationManager.instance = new PartnerIntegrationManager();
    }
    return PartnerIntegrationManager.instance;
  }

  registerPartner(id: string, integration: BasePartnerIntegration) {
    this.partners.set(id, integration);
  }

  getPartner(id: string): BasePartnerIntegration | undefined {
    return this.partners.get(id);
  }

  async createPartnerSession(partnerId: string, playerId: string): Promise<PartnerSession> {
    const partner = this.partners.get(partnerId);
    if (!partner) {
      throw new Error(`Partner ${partnerId} not found`);
    }
    return await partner.createSession(playerId);
  }

  getAllPartners(): string[] {
    return Array.from(this.partners.keys());
  }

  /**
   * Record partner Gross Gaming Revenue (GGR)
   * Partners report their player losses to us
   */
  async recordPartnerRevenue(partnerId: string, ggrAmount: number, period: string): Promise<{
    partnerGGR: number;
    revSharePercent: number;
    revShareAmount: number;
  }> {
    const revSharePercent = 0.15; // 15% of partner GGR
    const revShareAmount = Math.floor(ggrAmount * revSharePercent);

    await db.execute({
      sql: `INSERT INTO partner_revenue (partner_id, period, ggr_amount, rev_share_amount, rev_share_percent) 
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(partner_id, period) DO UPDATE SET 
            ggr_amount = ggr_amount + ?, rev_share_amount = rev_share_amount + ?`,
      args: [partnerId, period, ggrAmount, revShareAmount, revSharePercent * 100, ggrAmount, revShareAmount]
    });

    return {
      partnerGGR: ggrAmount,
      revSharePercent,
      revShareAmount
    };
  }

  /**
   * Get partner revenue share stats
   */
  async getPartnerRevShareStats(period?: string): Promise<{
    totalPartnerGGR: number;
    totalRevShare: number;
    partnerBreakdown: { partnerId: string; ggr: number; revShare: number }[];
  }> {
    const timeFilter = period ? "period = ?" : "period = strftime('%Y-%m', 'now')";
    const args = period ? [period] : [];

    const result = await db.execute({
      sql: `SELECT partner_id, SUM(ggr_amount) as ggr, SUM(rev_share_amount) as rev_share 
            FROM partner_revenue 
            WHERE ${timeFilter}
            GROUP BY partner_id`,
      args
    });

    const breakdown = result.rows.map(row => ({
      partnerId: row.partner_id as string,
      ggr: (row.ggr as number) || 0,
      revShare: (row.rev_share as number) || 0
    }));

    const totalPartnerGGR = breakdown.reduce((sum, p) => sum + p.ggr, 0);
    const totalRevShare = breakdown.reduce((sum, p) => sum + p.revShare, 0);

    return { totalPartnerGGR, totalRevShare, partnerBreakdown: breakdown };
  }

  /**
   * Initialize revenue share tables
   */
  async initRevShareTables() {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS partner_revenue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        partner_id TEXT NOT NULL,
        period TEXT NOT NULL, -- '2026-03' format
        ggr_amount INTEGER NOT NULL DEFAULT 0,
        rev_share_amount INTEGER NOT NULL DEFAULT 0,
        rev_share_percent INTEGER NOT NULL DEFAULT 15,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(partner_id, period)
      )
    `);

    await db.execute(`CREATE INDEX IF NOT EXISTS idx_partner_revenue_period ON partner_revenue (period)`);
    console.log('Partner revenue share tables initialized');
  }
}

/**
 * Mock Integration for Phase 1 Demo
 */
export class MockPartnerIntegration extends BasePartnerIntegration {
  async createSession(playerId: string): Promise<PartnerSession> {
    return {
      sessionId: `SESSION-${Math.random().toString(36).substring(7).toUpperCase()}`,
      playerId,
      partnerId: this.config.id,
      token: `MOCK-TOKEN-${Date.now()}`,
      expiresAt: new Date(Date.now() + 3600 * 1000)
    };
  }

  async syncBalance(playerId: string): Promise<number> {
    // In a real deep integration, this would call the partner API
    return 1000;
  }

  async logEvent(playerId: string, eventType: string, payload: any): Promise<void> {
    console.log(`[Mock Integration ${this.config.id}] Player ${playerId} event: ${eventType}`, payload);
  }
}
