import { db } from '../db';

export interface JackpotState {
  currentValue: number;
  lastWinner?: string;
  lastWinAmount?: number;
}

export class SocialEngine {
  private static jackpotValue: number = 50000; // Starting value
  private static incrementRate: number = 0.01; // 1% of wagers go to jackpot

  /**
   * Get Current Global Jackpot State
   */
  static getJackpotState(): JackpotState {
    return {
      currentValue: Math.floor(this.jackpotValue),
    };
  }

  /**
   * Contribute to Jackpot
   */
  static contribute(amount: number) {
    this.jackpotValue += amount * this.incrementRate;
  }

  /**
   * Log a "Big Win" for the Live Feed
   */
  static async logBigWin(userId: string, gameId: string, winAmount: number) {
    if (winAmount < 1000) return; // Only log "Big Wins"

    await db.execute({
      sql: 'INSERT INTO live_events (user_id, type, amount, metadata) VALUES (?, ?, ?, ?)',
      args: [userId, 'big_win', winAmount, JSON.stringify({ gameId })]
    });
    
    return { userId, winAmount, gameId };
  }

  /**
   * Get Recent Live Feed Events
   */
  static async getLiveFeed(limit: number = 10) {
    const result = await db.execute({
      sql: 'SELECT user_id, type, amount, metadata, timestamp FROM live_events ORDER BY timestamp DESC LIMIT ?',
      args: [limit]
    });
    return result.rows;
  }

  /**
   * Trigger a Jackpot Win (Mock/Event based)
   */
  static async triggerJackpotWin(userId: string) {
    const winAmount = Math.floor(this.jackpotValue);
    this.jackpotValue = 50000; // Reset

    await db.execute({
      sql: 'INSERT INTO live_events (user_id, type, amount, metadata) VALUES (?, ?, ?, ?)',
      args: [userId, 'jackpot_win', winAmount, JSON.stringify({ isJackpot: true })]
    });

    return { userId, winAmount };
  }

  /**
   * Get Leaderboards
   */
  static async getLeaderboards(type: 'wins' | 'wagers' = 'wins', limit: number = 20) {
    const table = type === 'wins' ? 'lifetime_wins' : 'lifetime_wagered';
    const result = await db.execute({
      sql: `SELECT user_id, ${table} as score FROM user_profiles ORDER BY ${table} DESC LIMIT ?`,
      args: [limit]
    });
    return result.rows;
  }

  /**
   * Initialize Social Tables
   */
  static async initTables() {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS live_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL, -- big_win, jackpot_win, achievement
        amount INTEGER,
        metadata TEXT, -- JSON string for extra data
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Ensure user_profiles has columns for leaderboards
    await db.execute(`
      ALTER TABLE user_profiles ADD COLUMN lifetime_wins INTEGER DEFAULT 0
    `).catch(() => {}); // Ignore if exists
    
    await db.execute(`
      ALTER TABLE user_profiles ADD COLUMN lifetime_wagered INTEGER DEFAULT 0
    `).catch(() => {}); // Ignore if exists
  }
}
