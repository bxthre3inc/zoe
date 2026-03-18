import { db } from '../db';
import { WalletProcessor } from '../engine/wallet';
import { logger } from '../index';

export interface Tournament {
  id: string;
  name: string;
  gameId: string;
  entryFee: number; // SC entry fee
  prizePool: number;
  maxPlayers: number;
  minPlayers: number;
  status: 'registering' | 'active' | 'completed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  houseFeePercent: number; // e.g., 10% of entry fees
}

export interface TournamentEntry {
  tournamentId: string;
  userId: string;
  score: number;
  rank: number;
  entryTime: Date;
}

/**
 * Tournament Engine - Entry fee revenue + prize pool distribution
 * 
 * Business Model: Players pay entry fee to join tournament.
 * House takes 10% of total entry fees.
 * Remaining 90% distributed to top 3 (or configurable) finishers.
 */
export class TournamentService {
  private static readonly DEFAULT_HOUSE_FEE = 0.10; // 10%
  private static readonly DEFAULT_PAYOUT_SPLIT = [0.50, 0.30, 0.20]; // 1st, 2nd, 3rd

  /**
   * Create new tournament
   */
  static async createTournament(
    name: string, 
    gameId: string, 
    entryFee: number,
    maxPlayers: number = 100,
    startTime: Date = new Date(Date.now() + 3600000) // 1 hour from now
  ): Promise<Tournament> {
    const tournamentId = `TRN-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    await db.execute({
      sql: `INSERT INTO tournaments 
            (id, name, game_id, entry_fee, prize_pool, max_players, min_players, 
             status, start_time, house_fee_percent) 
            VALUES (?, ?, ?, ?, 0, ?, 2, 'registering', ?, ?)`,
      args: [tournamentId, name, gameId, entryFee, maxPlayers, startTime.toISOString(), this.DEFAULT_HOUSE_FEE * 100]
    });

    logger.info({ tournamentId, name, entryFee, maxPlayers }, 'Tournament Created');

    return {
      id: tournamentId,
      name,
      gameId,
      entryFee,
      prizePool: 0,
      maxPlayers,
      minPlayers: 2,
      status: 'registering',
      startTime,
      houseFeePercent: this.DEFAULT_HOUSE_FEE
    };
  }

  /**
   * Enter tournament - pay entry fee
   */
  static async enterTournament(tournamentId: string, userId: string): Promise<{
    success: boolean;
    entryNumber: number;
    totalPrizePool: number;
    error?: string;
  }> {
    // 1. Check tournament exists and is open
    const tournamentResult = await db.execute({
      sql: 'SELECT * FROM tournaments WHERE id = ? AND status = ?',
      args: [tournamentId, 'registering']
    });

    if (tournamentResult.rows.length === 0) {
      return { success: false, entryNumber: 0, totalPrizePool: 0, error: 'Tournament not found or registration closed' };
    }

    const tournament = tournamentResult.rows[0] as unknown as {
      entry_fee: number;
      max_players: number;
      prize_pool: number;
    };

    // 2. Check not already entered
    const existingEntry = await db.execute({
      sql: 'SELECT 1 FROM tournament_entries WHERE tournament_id = ? AND user_id = ?',
      args: [tournamentId, userId]
    });

    if (existingEntry.rows.length > 0) {
      return { success: false, entryNumber: 0, totalPrizePool: 0, error: 'Already entered this tournament' };
    }

    // 3. Check capacity
    const entryCount = await db.execute({
      sql: 'SELECT COUNT(*) as count FROM tournament_entries WHERE tournament_id = ?',
      args: [tournamentId]
    });

    const currentEntries = (entryCount.rows[0]?.count as number) || 0;
    if (currentEntries >= tournament.max_players) {
      return { success: false, entryNumber: 0, totalPrizePool: 0, error: 'Tournament is full' };
    }

    // 4. Debit entry fee
    const entryFee = tournament.entry_fee;
    const debitResult = await WalletProcessor.processTransaction(userId, entryFee, 'wager', 'tournament_entry', tournamentId);

    if (!debitResult.success) {
      return { success: false, entryNumber: 0, totalPrizePool: 0, error: 'Insufficient funds for entry fee' };
    }

    // 5. Record entry
    await db.execute({
      sql: `INSERT INTO tournament_entries (tournament_id, user_id, entry_time) VALUES (?, ?, CURRENT_TIMESTAMP)`,
      args: [tournamentId, userId]
    });

    // 6. Update prize pool
    const newPrizePool = (tournament.prize_pool || 0) + entryFee;
    await db.execute({
      sql: 'UPDATE tournaments SET prize_pool = ? WHERE id = ?',
      args: [newPrizePool, tournamentId]
    });

    logger.info({ tournamentId, userId, entryFee, entryNumber: currentEntries + 1 }, 'Tournament Entry');

    return {
      success: true,
      entryNumber: currentEntries + 1,
      totalPrizePool: newPrizePool
    };
  }

  /**
   * Submit score for tournament
   */
  static async submitScore(tournamentId: string, userId: string, score: number): Promise<void> {
    await db.execute({
      sql: `UPDATE tournament_entries SET score = ? WHERE tournament_id = ? AND user_id = ?`,
      args: [score, tournamentId, userId]
    });
  }

  /**
   * Complete tournament - calculate ranks and distribute prizes
   */
  static async completeTournament(tournamentId: string): Promise<{
    success: boolean;
    totalEntries: number;
    prizePool: number;
    houseFee: number;
    winners: { userId: string; rank: number; prize: number }[];
  }> {
    // 1. Get tournament details
    const tournamentResult = await db.execute({
      sql: 'SELECT * FROM tournaments WHERE id = ?',
      args: [tournamentId]
    });

    if (tournamentResult.rows.length === 0) {
      return { success: false, totalEntries: 0, prizePool: 0, houseFee: 0, winners: [] };
    }

    const tournament = tournamentResult.rows[0] as unknown as {
      prize_pool: number;
      house_fee_percent: number;
      entry_fee: number;
    };

    // 2. Calculate house fee (revenue)
    const houseFeePercent = tournament.house_fee_percent / 100;
    const totalPrizePool = tournament.prize_pool;
    const houseFee = Math.floor(totalPrizePool * houseFeePercent);
    const distributablePrize = totalPrizePool - houseFee;

    // 3. Get ranked entries
    const entriesResult = await db.execute({
      sql: `SELECT user_id, score FROM tournament_entries 
            WHERE tournament_id = ? AND score > 0 
            ORDER BY score DESC LIMIT 3`,
      args: [tournamentId]
    });

    if (entriesResult.rows.length < 2) {
      // Refund all players if less than 2 finishers
      await this.refundAll(tournamentId);
      return { success: false, totalEntries: 0, prizePool: 0, houseFee: 0, winners: [] };
    }

    // 4. Distribute prizes
    const winners: { userId: string; rank: number; prize: number }[] = [];
    const numWinners = Math.min(entriesResult.rows.length, this.DEFAULT_PAYOUT_SPLIT.length);

    for (let i = 0; i < numWinners; i++) {
      const row = entriesResult.rows[i] as unknown as { user_id: string; score: number };
      const prize = Math.floor(distributablePrize * this.DEFAULT_PAYOUT_SPLIT[i]);
      
      await WalletProcessor.processTransaction(row.user_id, prize, 'win', 'tournament_prize', tournamentId);
      
      winners.push({ userId: row.user_id, rank: i + 1, prize });
    }

    // 5. Mark tournament complete
    await db.execute({
      sql: `UPDATE tournaments SET status = 'completed', end_time = CURRENT_TIMESTAMP WHERE id = ?`,
      args: [tournamentId]
    });

    // 6. Record house fee revenue
    await db.execute({
      sql: `INSERT INTO tournament_revenue (tournament_id, house_fee, total_entries) VALUES (?, ?, ?)`,
      args: [tournamentId, houseFee, entriesResult.rows.length]
    });

    logger.info({ 
      tournamentId, 
      totalEntries: entriesResult.rows.length, 
      prizePool: totalPrizePool,
      houseFee,
      winners: winners.length 
    }, 'Tournament Completed');

    return {
      success: true,
      totalEntries: entriesResult.rows.length,
      prizePool: totalPrizePool,
      houseFee,
      winners
    };
  }

  /**
   * Refund all entries (tournament cancelled)
   */
  private static async refundAll(tournamentId: string): Promise<void> {
    const entries = await db.execute({
      sql: 'SELECT user_id, tournament_id FROM tournament_entries WHERE tournament_id = ?',
      args: [tournamentId]
    });

    const tournament = await db.execute({
      sql: 'SELECT entry_fee FROM tournaments WHERE id = ?',
      args: [tournamentId]
    });

    const entryFee = (tournament.rows[0]?.entry_fee as number) || 0;

    for (const row of entries.rows) {
      const userId = row.user_id as string;
      await WalletProcessor.processTransaction(userId, entryFee, 'win', 'tournament_refund', tournamentId);
    }

    await db.execute({
      sql: `UPDATE tournaments SET status = 'cancelled' WHERE id = ?`,
      args: [tournamentId]
    });
  }

  /**
   * Get tournament revenue stats
   */
  static async getRevenueStats(period: 'daily' | 'weekly' | 'monthly'): Promise<{
    totalTournaments: number;
    totalEntries: number;
    totalEntryFees: number;
    totalHouseFees: number;
    totalRevenueUSD: number;
  }> {
    const timeFilter = period === 'daily' ? "DATE(created_at) = DATE('now')" :
                      period === 'weekly' ? "created_at >= DATE('now', '-7 days')" :
                      "created_at >= DATE('now', '-30 days')";

    const result = await db.execute({
      sql: `SELECT 
              COUNT(*) as total_tournaments,
              COALESCE(SUM(total_entries), 0) as total_entries,
              COALESCE(SUM(house_fee), 0) as total_house_fees
            FROM tournament_revenue 
            WHERE ${timeFilter}`
    });

    const row = result.rows[0] as unknown as {
      total_tournaments: number;
      total_entries: number;
      total_house_fees: number;
    };

    const SC_TO_USD = 0.01;

    return {
      totalTournaments: row.total_tournaments || 0,
      totalEntries: row.total_entries || 0,
      totalEntryFees: (row.total_house_fees || 0) * 10, // Approximate (house is 10%)
      totalHouseFees: row.total_house_fees || 0,
      totalRevenueUSD: (row.total_house_fees || 0) * SC_TO_USD
    };
  }

  /**
   * List active tournaments
   */
  static async listTournaments(status?: 'registering' | 'active' | 'completed'): Promise<Tournament[]> {
    let sql = 'SELECT * FROM tournaments';
    const args: any[] = [];

    if (status) {
      sql += ' WHERE status = ?';
      args.push(status);
    }

    sql += ' ORDER BY start_time DESC';

    const result = await db.execute({ sql, args });

    return result.rows.map(row => ({
      id: row.id as string,
      name: row.name as string,
      gameId: row.game_id as string,
      entryFee: row.entry_fee as number,
      prizePool: row.prize_pool as number,
      maxPlayers: row.max_players as number,
      minPlayers: row.min_players as number,
      status: row.status as Tournament['status'],
      startTime: new Date(row.start_time as string),
      endTime: row.end_time ? new Date(row.end_time as string) : undefined,
      houseFeePercent: (row.house_fee_percent as number) / 100
    }));
  }

  /**
   * Initialize tournament tables
   */
  static async initTables() {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tournaments (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        game_id TEXT NOT NULL,
        entry_fee INTEGER NOT NULL,
        prize_pool INTEGER DEFAULT 0,
        max_players INTEGER DEFAULT 100,
        min_players INTEGER DEFAULT 2,
        status TEXT DEFAULT 'registering',
        start_time DATETIME NOT NULL,
        end_time DATETIME,
        house_fee_percent INTEGER DEFAULT 10,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS tournament_entries (
        tournament_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        score INTEGER DEFAULT 0,
        rank INTEGER,
        entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (tournament_id, user_id)
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS tournament_revenue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tournament_id TEXT NOT NULL,
        house_fee INTEGER NOT NULL,
        total_entries INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(`CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments (status, start_time)`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_tournament_entries_tournament ON tournament_entries (tournament_id, score DESC)`);

    console.log('TournamentService tables initialized');
  }
}
