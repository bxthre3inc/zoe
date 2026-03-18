import { db } from '../db';
import { WalletProcessor } from '../engine/wallet';

export interface SecuredPartner {
  id: string;
  name: string;
  location: string;
  tier: number;
  securedBalance: number;
  securedRequired: number;
  maxCashCapacity: number;
  availableCapacity: number;
  pendingCash: number;
  totalDepositsProcessed: number;
  totalVolumeLifetime: number;
  currentMonthVolume: number;
  consecutiveActiveDays: number;
  lastActivityAt: string | null;
  status: 'active' | 'suspended' | 'review_required';
  createdAt: string;
}

export interface TierConfig {
  tier: number;
  securedRequired: number;
  maxCapacity: number;
  commissionRate: number;
  dailyLimit: number;
  monthlyCap: number;
}

// Tier configuration: exponential growth, linear commission
const TIER_CONFIGS: TierConfig[] = [
  { tier: 1, securedRequired: 100, maxCapacity: 100, commissionRate: 0.05, dailyLimit: 500, monthlyCap: 5000 },
  { tier: 2, securedRequired: 250, maxCapacity: 250, commissionRate: 0.06, dailyLimit: 750, monthlyCap: 10000 },
  { tier: 3, securedRequired: 500, maxCapacity: 500, commissionRate: 0.07, dailyLimit: 1000, monthlyCap: 15000 },
  { tier: 4, securedRequired: 1000, maxCapacity: 1000, commissionRate: 0.08, dailyLimit: 2000, monthlyCap: 25000 },
  { tier: 5, securedRequired: 2500, maxCapacity: 2500, commissionRate: 0.09, dailyLimit: 3000, monthlyCap: 50000 },
  { tier: 6, securedRequired: 5000, maxCapacity: 5000, commissionRate: 0.10, dailyLimit: 5000, monthlyCap: 100000 },
  { tier: 7, securedRequired: 10000, maxCapacity: 10000, commissionRate: 0.11, dailyLimit: 8000, monthlyCap: 200000 },
  { tier: 8, securedRequired: 20000, maxCapacity: 20000, commissionRate: 0.12, dailyLimit: 12000, monthlyCap: 350000 },
  { tier: 9, securedRequired: 35000, maxCapacity: 35000, commissionRate: 0.13, dailyLimit: 20000, monthlyCap: 500000 },
  { tier: 10, securedRequired: 50000, maxCapacity: 50000, commissionRate: 0.14, dailyLimit: 30000, monthlyCap: 750000 },
];

export class SecuredCashService {
  /**
   * Get tier configuration
   */
  static getTierConfig(tier: number): TierConfig {
    return TIER_CONFIGS[Math.min(Math.max(tier, 1), 10) - 1];
  }

  /**
   * Register new secured partner at Tier 1
   */
  static async registerPartner(partner: { id: string; name: string; location: string }): Promise<SecuredPartner> {
    const tier1 = TIER_CONFIGS[0];
    
    await db.execute({
      sql: `INSERT INTO secured_cash_partners 
            (id, name, location, tier, secured_required, max_cash_capacity, available_capacity, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [partner.id, partner.name, partner.location, 1, tier1.securedRequired, tier1.maxCapacity, 0, 'active']
    });

    return this.getPartner(partner.id);
  }

  /**
   * Get partner details
   */
  static async getPartner(partnerId: string): Promise<SecuredPartner | null> {
    const result = await db.execute({
      sql: 'SELECT * FROM secured_cash_partners WHERE id = ?',
      args: [partnerId]
    });

    if (result.rows.length === 0) return null;
    
    const row = result.rows[0];
    return {
      id: row.id as string,
      name: row.name as string,
      location: row.location as string,
      tier: row.tier as number,
      securedBalance: row.secured_balance as number,
      securedRequired: row.secured_required as number,
      maxCashCapacity: row.max_cash_capacity as number,
      availableCapacity: row.available_capacity as number,
      pendingCash: row.pending_cash as number,
      totalDepositsProcessed: row.total_deposits_processed as number,
      totalVolumeLifetime: row.total_volume_lifetime as number,
      currentMonthVolume: row.current_month_volume as number,
      consecutiveActiveDays: row.consecutive_active_days as number,
      lastActivityAt: row.last_activity_at as string | null,
      status: row.status as 'active' | 'suspended' | 'review_required',
      createdAt: row.created_at as string
    };
  }

  /**
   * Add digital collateral (secured balance)
   */
  static async addCollateral(partnerId: string, amount: number, method: string): Promise<{ success: boolean; newBalance: number }> {
    const partner = await this.getPartner(partnerId);
    if (!partner) throw new Error('Partner not found');

    // Record the collateral deposit
    const depositId = `COLL-${Date.now()}`;
    await db.execute({
      sql: 'INSERT INTO partner_collateral_deposits (id, partner_id, amount, method, status) VALUES (?, ?, ?, ?, ?)',
      args: [depositId, partnerId, amount, method, 'confirmed']
    });

    // Update partner secured balance
    const newBalance = partner.securedBalance + amount;
    const config = this.getTierConfig(partner.tier);
    const newCapacity = Math.min(newBalance, config.maxCapacity);

    await db.execute({
      sql: `UPDATE secured_cash_partners 
            SET secured_balance = ?, 
                available_capacity = ?,
                last_activity_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
      args: [newBalance, newCapacity, partnerId]
    });

    return { success: true, newBalance };
  }

  /**
   * Check if partner can accept deposit amount
   */
  static async canAcceptDeposit(partnerId: string, amount: number): Promise<{ canAccept: boolean; reason?: string }> {
    const partner = await this.getPartner(partnerId);
    if (!partner) return { canAccept: false, reason: 'Partner not found' };
    
    if (partner.status !== 'active') return { canAccept: false, reason: `Partner status: ${partner.status}` };
    if (amount > partner.availableCapacity) return { canAccept: false, reason: `Insufficient capacity. Available: $${partner.availableCapacity}, Requested: $${amount}` };
    
    return { canAccept: true };
  }

  /**
   * Create deposit request (reduces available capacity)
   */
  static async createDepositRequest(userId: string, amount: number, partnerId: string): Promise<{ token: string; expiresAt: string }> {
    const check = await this.canAcceptDeposit(partnerId, amount);
    if (!check.canAccept) throw new Error(check.reason);

    const token = `VPC-${partnerId}-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 min expiry

    // Reduce available capacity immediately (reserve it)
    await db.execute({
      sql: `UPDATE secured_cash_partners 
            SET available_capacity = available_capacity - ?,
                pending_cash = pending_cash + ?,
                last_activity_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
      args: [amount, amount, partnerId]
    });

    // Store deposit request
    await db.execute({
      sql: 'INSERT INTO cash_deposit_requests (token, user_id, amount, partner_id, status, expires_at) VALUES (?, ?, ?, ?, ?, ?)',
      args: [token, userId, amount, partnerId, 'pending', expiresAt]
    });

    return { token, expiresAt };
  }

  /**
   * Confirm deposit and credit player (called when partner hands over cash)
   */
  static async confirmDeposit(partnerId: string, token: string): Promise<{ 
    success: boolean; 
    userId: string; 
    amount: number; 
    commission: number;
    newPartnerTier?: number;
  }> {
    const partner = await this.getPartner(partnerId);
    if (!partner) throw new Error('Partner not found');

    // Get deposit request
    const requestResult = await db.execute({
      sql: 'SELECT * FROM cash_deposit_requests WHERE token = ? AND partner_id = ? AND status = ?',
      args: [token, partnerId, 'pending']
    });

    if (requestResult.rows.length === 0) throw new Error('Invalid or expired deposit token');
    const request = requestResult.rows[0];
    const userId = request.user_id as string;
    const amount = request.amount as number;

    const config = this.getTierConfig(partner.tier);
    const commission = Math.round(amount * config.commissionRate);

    // Credit player wallet
    await WalletProcessor.processTransaction(userId, amount, 'cash_deposit', 'secured_partner', token);

    // Update partner stats
    const newVolume = partner.currentMonthVolume + amount;
    const newTotalDeposits = partner.totalDepositsProcessed + 1;
    const newPending = partner.pendingCash; // Still pending until drop

    await db.execute({
      sql: `UPDATE secured_cash_partners 
            SET total_deposits_processed = ?,
                total_volume_lifetime = total_volume_lifetime + ?,
                current_month_volume = ?,
                last_activity_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
      args: [newTotalDeposits, amount, newVolume, partnerId]
    });

    // Mark request completed
    await db.execute({
      sql: 'UPDATE cash_deposit_requests SET status = ?, processed_at = CURRENT_TIMESTAMP WHERE token = ?',
      args: ['completed', token]
    });

    // Credit commission to partner's wallet (if they have one)
    await WalletProcessor.processTransaction(partnerId, commission, 'commission', 'platform', `COMM-${token}`);

    // Check for tier promotion
    const newTier = await this.evaluateTierPromotion(partnerId);

    return { success: true, userId, amount, commission, newPartnerTier: newTier };
  }

  /**
   * Log a cash drop (partner deposits physical cash at bank)
   */
  static async logCashDrop(partnerId: string, amount: number, dropType: string, verificationMethod: string): Promise<{ dropId: string; status: string }> {
    const partner = await this.getPartner(partnerId);
    if (!partner) throw new Error('Partner not found');

    if (amount > partner.pendingCash) throw new Error(`Cannot drop more than pending cash: $${partner.pendingCash}`);

    const dropId = `DROP-${Date.now()}`;
    const balanceBefore = partner.securedBalance;
    const balanceAfter = balanceBefore; // Secured balance stays same, pending moves

    await db.execute({
      sql: `INSERT INTO cash_drops 
            (id, partner_id, amount, drop_type, verification_method, secured_balance_before, secured_balance_after, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [dropId, partnerId, amount, dropType, verificationMethod, balanceBefore, balanceAfter, 'pending']
    });

    return { dropId, status: 'pending' };
  }

  /**
   * Verify cash drop (admin/AI verifies receipt photo)
   */
  static async verifyCashDrop(dropId: string, verifiedBy: string, approved: boolean): Promise<{ success: boolean }> {
    const dropResult = await db.execute({
      sql: 'SELECT * FROM cash_drops WHERE id = ?',
      args: [dropId]
    });

    if (dropResult.rows.length === 0) throw new Error('Drop not found');
    const drop = dropResult.rows[0];
    const partnerId = drop.partner_id as string;
    const amount = drop.amount as number;

    const status = approved ? 'verified' : 'rejected';
    
    await db.execute({
      sql: 'UPDATE cash_drops SET status = ?, verified_by = ?, verified_at = CURRENT_TIMESTAMP WHERE id = ?',
      args: [status, verifiedBy, dropId]
    });

    if (approved) {
      // Restore capacity: pending_cash decreases, available_capacity increases
      await db.execute({
        sql: `UPDATE secured_cash_partners 
              SET pending_cash = pending_cash - ?,
                  available_capacity = available_capacity + ?,
                  last_activity_at = CURRENT_TIMESTAMP
              WHERE id = ?`,
        args: [amount, amount, partnerId]
      });
    }

    return { success: true };
  }

  /**
   * Evaluate and apply tier promotion
   */
  static async evaluateTierPromotion(partnerId: string): Promise<number | null> {
    const partner = await this.getPartner(partnerId);
    if (!partner) return null;

    const currentTier = partner.tier;
    if (currentTier >= 10) return null;

    const nextTier = this.getTierConfig(currentTier + 1);
    
    // Promotion criteria:
    // 1. Volume: 2x the next tier's secured requirement in current month
    // 2. Active streak: 7+ consecutive active days
    const volumeThreshold = nextTier.securedRequired * 2;
    const meetsVolume = partner.currentMonthVolume >= volumeThreshold;
    const meetsActivity = partner.consecutiveActiveDays >= 7;

    if (meetsVolume && meetsActivity) {
      // Promote
      await db.execute({
        sql: `UPDATE secured_cash_partners 
              SET tier = ?, 
                  secured_required = ?,
                  max_cash_capacity = ?,
                  tier_achieved_at = CURRENT_TIMESTAMP,
                  tier_reviewed_at = CURRENT_TIMESTAMP
              WHERE id = ?`,
        args: [currentTier + 1, nextTier.securedRequired, nextTier.maxCapacity, partnerId]
      });

      // Log tier history
      await db.execute({
        sql: `INSERT INTO partner_tier_history 
              (partner_id, old_tier, new_tier, reason, triggered_by_volume, triggered_by_streak)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [partnerId, currentTier, currentTier + 1, 'promotion', partner.currentMonthVolume, partner.consecutiveActiveDays]
      });

      return currentTier + 1;
    }

    return null;
  }

  /**
   * Evaluate demotion/stagnancy (call daily via cron)
   */
  static async evaluateStagnancy(partnerId: string): Promise<{ action: 'none' | 'demote' | 'suspend'; newTier?: number }> {
    const partner = await this.getPartner(partnerId);
    if (!partner || partner.status !== 'active') return { action: 'none' };

    const daysSinceActivity = partner.lastActivityAt 
      ? Math.floor((Date.now() - new Date(partner.lastActivityAt).getTime()) / (1000 * 60 * 60 * 24))
      : 999;

    // Stagnancy: 30+ days inactive = demote 2 tiers + review
    if (daysSinceActivity >= 30 && partner.tier > 1) {
      const newTier = Math.max(1, partner.tier - 2);
      
      await db.execute({
        sql: `UPDATE secured_cash_partners 
              SET tier = ?, status = 'review_required', tier_reviewed_at = CURRENT_TIMESTAMP
              WHERE id = ?`,
        args: [newTier, partnerId]
      });

      await db.execute({
        sql: `INSERT INTO partner_tier_history 
              (partner_id, old_tier, new_tier, reason, triggered_by_days_inactive)
              VALUES (?, ?, ?, ?, ?)`,
        args: [partnerId, partner.tier, newTier, 'stagnancy_demotion', daysSinceActivity]
      });

      return { action: 'demote', newTier };
    }

    // Standard demotion: 14+ days = demote 1 tier
    if (daysSinceActivity >= 14 && partner.tier > 1) {
      const newTier = partner.tier - 1;
      const config = this.getTierConfig(newTier);

      await db.execute({
        sql: `UPDATE secured_cash_partners 
              SET tier = ?, 
                  secured_required = ?,
                  max_cash_capacity = ?,
                  tier_reviewed_at = CURRENT_TIMESTAMP
              WHERE id = ?`,
        args: [newTier, config.securedRequired, config.maxCapacity, partnerId]
      });

      await db.execute({
        sql: `INSERT INTO partner_tier_history 
              (partner_id, old_tier, new_tier, reason, triggered_by_days_inactive)
              VALUES (?, ?, ?, ?, ?)`,
        args: [partnerId, partner.tier, newTier, 'inactivity_demotion', daysSinceActivity]
      });

      return { action: 'demote', newTier };
    }

    return { action: 'none' };
  }

  /**
   * Get all partners (admin view)
   */
  static async getAllPartners(): Promise<SecuredPartner[]> {
    const result = await db.execute('SELECT * FROM secured_cash_partners ORDER BY tier DESC, current_month_volume DESC');
    return result.rows.map(row => ({
      id: row.id as string,
      name: row.name as string,
      location: row.location as string,
      tier: row.tier as number,
      securedBalance: row.secured_balance as number,
      securedRequired: row.secured_required as number,
      maxCashCapacity: row.max_cash_capacity as number,
      availableCapacity: row.available_capacity as number,
      pendingCash: row.pending_cash as number,
      totalDepositsProcessed: row.total_deposits_processed as number,
      totalVolumeLifetime: row.total_volume_lifetime as number,
      currentMonthVolume: row.current_month_volume as number,
      consecutiveActiveDays: row.consecutive_active_days as number,
      lastActivityAt: row.last_activity_at as string | null,
      status: row.status as 'active' | 'suspended' | 'review_required',
      createdAt: row.created_at as string
    }));
  }

  /**
   * Initialize tables (migrations)
   */
  static async initTables() {
    // Tables created in db.ts initDatabase
    console.log('SecuredCashService tables initialized');
  }
}
