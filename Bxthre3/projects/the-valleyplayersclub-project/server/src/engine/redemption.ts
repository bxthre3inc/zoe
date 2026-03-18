import { db } from '../db';
import { logger } from '../index';

export interface RedemptionRequest {
  userId: string;
  cAmount: number; // Amount in $C (Sweeps Credits)
  method: 'cash_partner' | 'crypto' | 'ach';
  destination: string; // Partner ID, wallet address, or bank account
}

export interface RedemptionResult {
  success: boolean;
  cAmount: number;
  feeAmount: number; // Fee in $C
  netAmount: number; // $C after fee
  usdPayout: number;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  redemptionId: string;
  etaHours: number;
  error?: string;
}

/**
 * $C Redemption Engine - Fee collection on cashouts
 * 
 * Business Model: Players get free $C (Sweeps Credits via AMOE).
 * When they win and want to redeem for real money, we charge 10% fee.
 * Rate: 10 $C = $0.01 USD (1 $C = $0.001 USD)
 */
export class RedemptionEngine {
  private static readonly REDEMPTION_FEE_RATE = 0.09999; // 9.999% fee
  private static readonly C_TO_USD_RATE = 0.001; // 1 $C = $0.001 USD (10 $C = $0.01)
  private static readonly MIN_REDEMPTION_C = 10000; // Min $10 USD (10000 $C = $10)
  private static readonly MAX_REDEMPTION_C = 10000000; // Max $10,000 USD per transaction
  private static readonly DAILY_LIMIT_C = 20000000; // $20,000 USD daily per user

  /**
   * Check if user has met play-through requirement (wagered at least redemption amount)
   */
  static async checkPlayThrough(userId: string, redemptionAmount: number): Promise<{ met: boolean; lifetimeWagered: number; remaining: number }> {
    const result = await db.execute({
      sql: `SELECT COALESCE(SUM(amount), 0) as total_wagered 
            FROM transactions 
            WHERE user_id = ? AND type = 'wager'`,
      args: [userId]
    });

    const lifetimeWagered = (result.rows[0]?.total_wagered as number) || 0;
    const met = lifetimeWagered >= redemptionAmount;
    
    return {
      met,
      lifetimeWagered,
      remaining: Math.max(0, redemptionAmount - lifetimeWagered)
    };
  }

  /**
   * Process $C redemption request
   */
  static async requestRedemption(request: RedemptionRequest): Promise<RedemptionResult> {
    const { userId, cAmount, method, destination } = request;

    // 1. Validate amount
    if (cAmount < this.MIN_REDEMPTION_C) {
      return { 
        success: false, 
        cAmount, 
        feeAmount: 0, 
        netAmount: 0, 
        usdPayout: 0,
        status: 'rejected',
        redemptionId: '',
        etaHours: 0,
        error: `Minimum redemption is ${this.MIN_REDEMPTION_C} $C ($${(this.MIN_REDEMPTION_C * this.C_TO_USD_RATE).toFixed(2)})` 
      };
    }

    // 2. Check play-through requirement
    const playThrough = await this.checkPlayThrough(userId, cAmount);
    if (!playThrough.met) {
      return { 
        success: false, 
        cAmount, 
        feeAmount: 0, 
        netAmount: 0, 
        usdPayout: 0,
        status: 'rejected',
        redemptionId: '',
        etaHours: 0,
        error: `Play-through requirement not met. You must wager $C at least once before redemption. Wagered: ${playThrough.lifetimeWagered} $C, Need: ${cAmount} $C, Remaining: ${playThrough.remaining} $C` 
      };
    }

    if (cAmount > this.MAX_REDEMPTION_C) {
      return { 
        success: false, 
        cAmount, 
        feeAmount: 0, 
        netAmount: 0, 
        usdPayout: 0,
        status: 'rejected',
        redemptionId: '',
        etaHours: 0,
        error: `Maximum redemption per transaction is ${this.MAX_REDEMPTION_C} $C` 
      };
    }

    // 2. Check daily limits
    const dailyRedeemed = await this.getDailyRedemptionTotal(userId);
    if (dailyRedeemed + cAmount > this.DAILY_LIMIT_C) {
      return { 
        success: false, 
        cAmount, 
        feeAmount: 0, 
        netAmount: 0, 
        usdPayout: 0,
        status: 'rejected',
        redemptionId: '',
        etaHours: 0,
        error: `Daily redemption limit exceeded. Remaining: ${this.DAILY_LIMIT_C - dailyRedeemed} $C` 
      };
    }

    // 3. Check user balance
    const { WalletProcessor } = await import('./wallet');
    const wallet = await WalletProcessor.getWallet(userId);
    if (wallet.balances.cash < cAmount) {
      return { 
        success: false, 
        cAmount, 
        feeAmount: 0, 
        netAmount: 0, 
        usdPayout: 0,
        status: 'rejected',
        redemptionId: '',
        etaHours: 0,
        error: 'Insufficient $C balance' 
      };
    }

    // 4. Calculate fees
    const feeAmount = Math.floor(cAmount * this.REDEMPTION_FEE_RATE);
    const netAmount = cAmount - feeAmount;
    const usdPayout = netAmount * this.C_TO_USD_RATE;

    // 5. Debit wallet
    const debitResult = await WalletProcessor.processTransaction(
      userId, 
      cAmount, 
      'withdrawal', 
      'redemption', 
      `REDEMPTION-${Date.now()}`
    );

    if (!debitResult.success) {
      return { 
        success: false, 
        cAmount, 
        feeAmount, 
        netAmount, 
        usdPayout,
        status: 'rejected',
        redemptionId: '',
        etaHours: 0,
        error: 'Failed to debit wallet' 
      };
    }

    // 6. Create redemption record
    const redemptionId = `RDM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const etaHours = method === 'cash_partner' ? 1 : (method === 'crypto' ? 0.5 : 72);

    await db.execute({
      sql: `INSERT INTO redemptions 
            (id, user_id, c_amount, fee_amount, net_amount, usd_payout, 
             method, destination, status, eta_hours, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, CURRENT_TIMESTAMP)`,
      args: [redemptionId, userId, cAmount, feeAmount, netAmount, usdPayout, method, destination, etaHours]
    });

    // 7. Log revenue event
    logger.info({ 
      redemptionId, 
      userId, 
      cAmount, 
      feeAmount, 
      usdPayout,
      method,
      revenue: feeAmount * this.C_TO_USD_RATE
    }, 'Redemption Requested - Fee Collected');

    return {
      success: true,
      cAmount,
      feeAmount,
      netAmount,
      usdPayout,
      status: 'pending',
      redemptionId,
      etaHours
    };
  }

  /**
   * Get daily redemption total for a user
   */
  static async getDailyRedemptionTotal(userId: string): Promise<number> {
    const result = await db.execute({
      sql: `SELECT COALESCE(SUM(c_amount), 0) as total 
            FROM redemptions 
            WHERE user_id = ? 
            AND DATE(created_at) = DATE('now') 
            AND status IN ('pending', 'processing', 'completed')`,
      args: [userId]
    });

    return (result.rows[0]?.total as number) || 0;
  }

  /**
   * Process redemption (admin/cash partner verifies)
   */
  static async processRedemption(redemptionId: string, verifiedBy: string, approved: boolean): Promise<boolean> {
    const newStatus = approved ? 'completed' : 'rejected';
    
    await db.execute({
      sql: `UPDATE redemptions 
            SET status = ?, verified_by = ?, verified_at = CURRENT_TIMESTAMP 
            WHERE id = ?`,
      args: [newStatus, verifiedBy, redemptionId]
    });

    logger.info({ redemptionId, verifiedBy, approved, status: newStatus }, 'Redemption Processed');
    return true;
  }

  /**
   * Get revenue analytics
   */
  static async getRevenueStats(period: 'daily' | 'weekly' | 'monthly'): Promise<{
    totalRedemptions: number;
    totalVolumeC: number;
    totalFeesC: number;
    totalRevenueUSD: number;
    averageRedemption: number;
  }> {
    const timeFilter = period === 'daily' ? "DATE(created_at) = DATE('now')" :
                      period === 'weekly' ? "created_at >= DATE('now', '-7 days')" :
                      "created_at >= DATE('now', '-30 days')";

    const result = await db.execute({
      sql: `SELECT 
              COUNT(*) as total_redemptions,
              COALESCE(SUM(c_amount), 0) as total_volume,
              COALESCE(SUM(fee_amount), 0) as total_fees,
              COALESCE(AVG(c_amount), 0) as avg_redemption
            FROM redemptions 
            WHERE ${timeFilter} 
            AND status IN ('pending', 'processing', 'completed')`
    });

    const row = result.rows[0] as unknown as {
      total_redemptions: number;
      total_volume: number;
      total_fees: number;
      avg_redemption: number;
    };

    return {
      totalRedemptions: row.total_redemptions || 0,
      totalVolumeC: row.total_volume || 0,
      totalFeesC: row.total_fees || 0,
      totalRevenueUSD: (row.total_fees || 0) * this.C_TO_USD_RATE,
      averageRedemption: row.avg_redemption || 0
    };
  }

  /**
   * Initialize redemption tables
   */
  static async initTables() {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS redemptions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        c_amount INTEGER NOT NULL,
        fee_amount INTEGER NOT NULL,
        net_amount INTEGER NOT NULL,
        usd_payout REAL NOT NULL,
        method TEXT NOT NULL,
        destination TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        eta_hours INTEGER NOT NULL,
        verified_by TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        verified_at DATETIME,
        FOREIGN KEY(user_id) REFERENCES wallets(user_id)
      )
    `);

    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_redemptions_user ON redemptions (user_id, created_at)
    `);

    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_redemptions_status ON redemptions (status, created_at)
    `);

    console.log('$C RedemptionEngine tables initialized');
  }
}
