import { db } from '../db';
import { WalletProcessor } from '../engine/wallet';
import type { WagerResult } from '../engine/types';

export interface DailySpinResult {
  eligible: boolean;
  reward?: {
    type: 'cash' | 'bonus' | 'xp';
    amount: number;
    label: string;
  };
  nextSpinAt?: Date;
  error?: string;
}

export interface PlayerProgress {
  userId: string;
  level: number;
  xp: number;
  xpForNextLevel: number;
}

export class GamificationService {
  private static XP_PER_LEVEL = 1000;
  private static LEVEL_UP_REWARD = 500;

  /**
   * Check if user is eligible for a daily spin and execute it if requested.
   */
  static async processDailySpin(userId: string, execute: boolean = false): Promise<DailySpinResult> {
    const result = await db.execute({
      sql: 'SELECT last_spin_at, spin_count FROM daily_spins WHERE user_id = ?',
      args: [userId]
    });

    const now = new Date();
    let spinCount = 0;

    if (result && result.rows && result.rows.length > 0) {
      const row = result.rows[0];
      if (row) {
        spinCount = (row.spin_count as number) || 0;
        if (row.last_spin_at) {
          const lastSpin = new Date(row.last_spin_at as string);
          const diff = now.getTime() - lastSpin.getTime();
          const hours24 = 24 * 60 * 60 * 1000;

          if (diff < hours24) {
            return {
              eligible: false,
              nextSpinAt: new Date(lastSpin.getTime() + hours24)
            };
          }
        }
      }
    }

    if (!execute) return { eligible: true };

    // Execute Spin Logic
    const rewards = [
      { type: 'bonus', amount: 100, label: '100 Bonus VLY' },
      { type: 'bonus', amount: 500, label: '500 Bonus VLY' },
      { type: 'xp', amount: 200, label: '200 XP' },
      { type: 'cash', amount: 50, label: '50 Cash VLY' }
    ];
    
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    const newSpinCount = spinCount + 1;

    await db.execute({
      sql: 'INSERT OR REPLACE INTO daily_spins (user_id, last_spin_at, spin_count) VALUES (?, CURRENT_TIMESTAMP, ?)',
      args: [userId, newSpinCount]
    });

    if (reward && (reward.type === 'cash' || reward.type === 'bonus')) {
      await WalletProcessor.processTransaction(userId, reward.amount, 'bonus', 'daily_wheel');
    } else if (reward && reward.type === 'xp') {
      await this.addXP(userId, reward.amount);
    }

    // Trigger Daily Spinner Achievement
    if (newSpinCount >= 5) {
      await this.unlockAchievement(userId, 'daily_spinner');
    }

    return {
      eligible: true,
      reward: reward as DailySpinResult['reward'],
      nextSpinAt: new Date(now.getTime() + 24 * 60 * 60 * 1000)
    };
  }

  /**
   * Awards XP to a user and handles level-up rewards
   */
  static async addXP(userId: string, amount: number): Promise<{ xp: number, level: number, leveledUp: boolean }> {
    const wallet = await db.execute({
      sql: 'SELECT xp, level FROM wallets WHERE user_id = ?',
      args: [userId]
    });

    if (wallet.rows.length === 0) throw new Error('User not found');

    const row = wallet.rows[0] as unknown as { xp: number, level: number };
    if (!row) throw new Error('User data corrupted');
    
    const currentXP = ((row.xp as number) || 0) + amount;
    let currentLevel = (row.level as number) || 1;
    let leveledUp = false;

    // Level calculation (Example: 1000 XP per level)
    const newLevel = Math.floor(currentXP / 1000) + 1;
    if (newLevel > currentLevel) {
      leveledUp = true;
      currentLevel = newLevel;
      console.log(`[LEVEL UP] User ${userId} reached Level ${currentLevel}`);
      
      // Grant level up rewards (500 Bonus VLY per level)
      await WalletProcessor.processTransaction(userId, 500, 'bonus', 'system', 'level-up-reward');

      // Check level-based achievements
      if (currentLevel >= 50) await this.unlockAchievement(userId, 'level_up_50');
      else if (currentLevel >= 20) await this.unlockAchievement(userId, 'level_up_20');
      else if (currentLevel >= 10) await this.unlockAchievement(userId, 'level_up_10');
      else if (currentLevel >= 5) await this.unlockAchievement(userId, 'level_up_5');
    }

    await db.execute({
      sql: 'UPDATE wallets SET xp = ?, level = ? WHERE user_id = ?',
      args: [currentXP, currentLevel, userId]
    });

    return { xp: currentXP, level: currentLevel, leveledUp };
  }

  /**
   * Automated Achievement Automated Check
   */
  static async checkAchievements(userId: string, gameResult: Partial<WagerResult>): Promise<string[]> {
    const unlocked: string[] = [];
    
    // 1. Fetch current player stats
    const walletResult = await db.execute({
      sql: 'SELECT total_wagered, total_wins, total_spins, current_win_streak, current_loss_streak, last_play_at, login_streak FROM wallets WHERE user_id = ?',
      args: [userId]
    });
    
    if (walletResult.rows.length === 0) return [];
    const wallet = walletResult.rows[0] as unknown as { 
      total_wagered: number, 
      total_wins: number, 
      total_spins: number,
      current_win_streak: number,
      current_loss_streak: number,
      last_play_at: string,
      login_streak: number
    };
    
    // 2. Update Stats
    const wager = gameResult.wager || 0;
    const payout = gameResult.payout || 0;
    const isWin = payout > 0;
    const isSlot = gameResult.gameCategory === 'slots';
    
    const newTotalWagered = (wallet.total_wagered || 0) + wager;
    const newTotalWins = (wallet.total_wins || 0) + (isWin ? 1 : 0);
    const newTotalSpins = (wallet.total_spins || 0) + (isSlot ? 1 : 0);
    
    const newWinStreak = isWin ? (wallet.current_win_streak || 0) + 1 : 0;
    const newLossStreak = !isWin ? (wallet.current_loss_streak || 0) + 1 : 0;
    
    // Login / Daily Streak Logic
    const now = new Date();
    const lastPlay = wallet.last_play_at ? new Date(wallet.last_play_at) : null;
    let newLoginStreak = wallet.login_streak || 1;
    
    if (lastPlay) {
      const diffDays = Math.floor((now.getTime() - lastPlay.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        newLoginStreak += 1;
      } else if (diffDays > 1) {
        newLoginStreak = 1;
      }
    }

    await db.execute({
      sql: `UPDATE wallets SET 
            total_wagered = ?, 
            total_wins = ?, 
            total_spins = ?, 
            current_win_streak = ?, 
            current_loss_streak = ?, 
            last_play_at = CURRENT_TIMESTAMP, 
            login_streak = ? 
            WHERE user_id = ?`,
      args: [newTotalWagered, newTotalWins, newTotalSpins, newWinStreak, newLossStreak, newLoginStreak, userId]
    });
    
    // 3. Evaluate Rules
    const multiplier = wager > 0 ? payout / wager : 0;

    // --- Progression & Basics ---
    if (isWin && await this.unlockAchievement(userId, 'first_win')) unlocked.push('first_win');
    if (newLoginStreak >= 7 && await this.unlockAchievement(userId, 'daily_warrior')) unlocked.push('daily_warrior');

    // --- Slot Prodigy ---
    if (multiplier >= 100 && await this.unlockAchievement(userId, 'big_win_100x')) unlocked.push('big_win_100x');
    if (multiplier >= 50 && await this.unlockAchievement(userId, 'big_win_50x')) unlocked.push('big_win_50x');
    if (multiplier >= 10 && await this.unlockAchievement(userId, 'big_win_10x')) unlocked.push('big_win_10x');
    
    if (newTotalSpins >= 10000 && await this.unlockAchievement(userId, 'slot_legend')) unlocked.push('slot_legend');
    else if (newTotalSpins >= 1000 && await this.unlockAchievement(userId, 'slot_master')) unlocked.push('slot_master');
    else if (newTotalSpins >= 100 && await this.unlockAchievement(userId, 'slot_enthusiast')) unlocked.push('slot_enthusiast');
    
    // --- Skill & Precision ---
    if (newWinStreak >= 10 && await this.unlockAchievement(userId, 'skill_streak_10')) unlocked.push('skill_streak_10');
    else if (newWinStreak >= 3 && await this.unlockAchievement(userId, 'skill_streak_3')) unlocked.push('skill_streak_3');
    
    // --- Volume & Grinding ---
    if (newTotalWagered >= 1000000 && await this.unlockAchievement(userId, 'whale_watcher')) unlocked.push('whale_watcher');
    else if (newTotalWagered >= 100000 && await this.unlockAchievement(userId, 'millennial')) unlocked.push('millennial');
    else if (newTotalWagered >= 10000 && await this.unlockAchievement(userId, 'century_club')) unlocked.push('century_club');
    else if (newTotalWagered >= 1000 && await this.unlockAchievement(userId, 'grinder_1')) unlocked.push('grinder_1');
    
    // --- Casual & Fun ---
    if (newLossStreak >= 10 && await this.unlockAchievement(userId, 'comeback_kid')) unlocked.push('comeback_kid');
    else if (newLossStreak >= 5 && await this.unlockAchievement(userId, 'lucky_loser')) unlocked.push('lucky_loser');
    if (wager > 500 && !isWin && await this.unlockAchievement(userId, 'high_stakes_loss')) unlocked.push('high_stakes_loss');
    
    // --- Temporal Checks ---
    const hour = now.getHours();
    if (hour >= 2 && hour < 5 && await this.unlockAchievement(userId, 'insomniac')) unlocked.push('insomniac');
    if (hour >= 5 && hour < 8 && await this.unlockAchievement(userId, 'early_bird')) unlocked.push('early_bird');
    
    // --- High Roller ---
    if (wager > 50 && await this.unlockAchievement(userId, 'high_roller')) unlocked.push('high_roller');

    return unlocked;
  }

  /**
   * Unlock an achievement for a player.
   */
  static async unlockAchievement(userId: string, achievementId: string): Promise<boolean> {
    try {
      // Check if already unlocked
      const existing = await db.execute({
        sql: 'SELECT 1 FROM player_achievements WHERE user_id = ? AND achievement_id = ?',
        args: [userId, achievementId]
      });

      if (existing.rows.length > 0) return false;

      // Fetch achievement details
      const achievement = await db.execute({
        sql: 'SELECT name, xp_reward, reward_amount FROM achievements WHERE id = ?',
        args: [achievementId]
      });

      if (achievement.rows.length === 0) return false;

      const achievementRow = achievement.rows[0] as unknown as { name: string, xp_reward: number, reward_amount: number };
      const xp_reward = achievementRow.xp_reward || 0;
      const reward_amount = achievementRow.reward_amount || 0;

      await db.execute({
        sql: 'INSERT INTO player_achievements (user_id, achievement_id) VALUES (?, ?)',
        args: [userId, achievementId]
      });

      console.log(`[🏆 ACHIEVEMENT] User ${userId} unlocked: ${achievementRow.name}`);

      if (xp_reward > 0) await this.addXP(userId, xp_reward);
      if (reward_amount > 0) {
        await WalletProcessor.processTransaction(userId, reward_amount, 'bonus', `achievement_${achievementId}`);
      }

      return true;
    } catch (e) {
      console.error('Achievement Unlock Error:', e);
      return false;
    }
  }

  /**
   * Get player progress and achievements.
   */
  static async getPlayerStats(userId: string) {
    const progress = await db.execute({
      sql: 'SELECT xp, level, total_wagered, total_wins, total_spins, current_win_streak, current_loss_streak, login_streak, last_play_at FROM wallets WHERE user_id = ?',
      args: [userId]
    });

    const achievements = await db.execute({
        sql: `
            SELECT a.*, pa.unlocked_at 
            FROM achievements a
            LEFT JOIN player_achievements pa ON a.id = pa.achievement_id AND pa.user_id = ?
        `,
        args: [userId]
    });

    return {
      progress: progress.rows[0],
      achievements: achievements.rows
    };
  }
}
