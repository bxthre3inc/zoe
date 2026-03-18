import { db } from '../db';
import { WalletProcessor } from '../engine/wallet';

export interface VIPLevel {
  name: string;
  minXP: number;
  multiplier: number;
  color: string;
}

export const VIP_LEVELS: VIPLevel[] = [
  { name: 'Bronze', minXP: 0, multiplier: 1.0, color: '#cd7f32' },
  { name: 'Silver', minXP: 5000, multiplier: 1.1, color: '#c0c0c0' },
  { name: 'Gold', minXP: 25000, multiplier: 1.25, color: '#ffd700' },
  { name: 'Platinum', minXP: 100000, multiplier: 1.5, color: '#e5e4e2' }
];

export class PromotionService {
  /**
   * Get Daily Wheel Status for User
   */
  static async getDailyWheelStatus(userId: string) {
    const result = await db.execute({
      sql: 'SELECT last_spin FROM user_promos WHERE user_id = ?',
      args: [userId]
    });

    if (result.rows.length === 0) {
      return { canSpin: true };
    }

    const row = result.rows[0] as { last_spin: string };
    const lastSpin = new Date(row.last_spin);
    const now = new Date();
    const diffHours = (now.getTime() - lastSpin.getTime()) / (1000 * 60 * 60);

    return {
      canSpin: diffHours >= 24,
      nextSpinHours: Math.max(0, 24 - diffHours)
    };
  }

  /**
   * Spin the Daily Wheel
   */
  static async spinDailyWheel(userId: string) {
    const status = await this.getDailyWheelStatus(userId);
    const nextSpinHours = status.nextSpinHours || 0;
    if (!status.canSpin) throw new Error(`Next spin in ${nextSpinHours.toFixed(1)} hours`);

    // Weighted rewards: 0 to 1000 credits
    const rewards = [10, 25, 50, 100, 250, 500, 1000];
    const prize = rewards[Math.floor(Math.random() * rewards.length)];

    await WalletProcessor.processTransaction(userId, prize, 'bonus', 'daily-wheel');

    await db.execute({
      sql: 'INSERT INTO user_promos (user_id, last_spin) VALUES (?, CURRENT_TIMESTAMP) ON CONFLICT(user_id) DO UPDATE SET last_spin = CURRENT_TIMESTAMP',
      args: [userId]
    });

    return { prize };
  }

  /**
   * Calculate VIP Level and Multiplier
   */
  static getVIPLevel(xp: number): VIPLevel {
    const level = [...VIP_LEVELS].reverse().find(l => xp >= l.minXP);
    return level || VIP_LEVELS[0];
  }

  /**
   * Initialize Promotion Tables
   */
  static async initTables() {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS user_promos (
        user_id TEXT PRIMARY KEY,
        last_spin DATETIME,
        daily_streak INTEGER DEFAULT 0,
        total_prizes INTEGER DEFAULT 0
      )
    `);
  }
}
