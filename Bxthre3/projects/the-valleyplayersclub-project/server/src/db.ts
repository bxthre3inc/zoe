import { createClient } from '@libsql/client';
import { resolve } from 'path';

const dbPath = resolve(process.env.DB_PATH || 'vpc.db');

export const db = createClient({
  url: `file:${dbPath}`,
});

export async function initDatabase() {
  console.log('Initializing VPC Database...');
  
  // Create Games table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      manifest TEXT NOT NULL,
      theme TEXT NOT NULL,
      status TEXT DEFAULT 'draft',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create Users/Wallet table (updated with XP and Level)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS wallets (
      user_id TEXT PRIMARY KEY,
      balance INTEGER DEFAULT 10000,
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      total_wagered INTEGER DEFAULT 0,
      total_wins INTEGER DEFAULT 0,
      total_spins INTEGER DEFAULT 0,
      current_win_streak INTEGER DEFAULT 0,
      current_loss_streak INTEGER DEFAULT 0,
      login_streak INTEGER DEFAULT 0,
      last_play_at DATETIME,
      currency TEXT DEFAULT 'VLY',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration: Add XP and Level columns if they don't exist
  try { await db.execute('ALTER TABLE wallets ADD COLUMN xp INTEGER DEFAULT 0'); } catch { /* ignore */ }
  try { await db.execute('ALTER TABLE wallets ADD COLUMN level INTEGER DEFAULT 1'); } catch { /* ignore */ }
  try { await db.execute('ALTER TABLE wallets ADD COLUMN total_wagered INTEGER DEFAULT 0'); } catch { /* ignore */ }
  try { await db.execute('ALTER TABLE wallets ADD COLUMN total_wins INTEGER DEFAULT 0'); } catch { /* ignore */ }
  try { await db.execute('ALTER TABLE wallets ADD COLUMN total_spins INTEGER DEFAULT 0'); } catch { /* ignore */ }
  try { await db.execute('ALTER TABLE wallets ADD COLUMN current_win_streak INTEGER DEFAULT 0'); } catch { /* ignore */ }
  try { await db.execute('ALTER TABLE wallets ADD COLUMN current_loss_streak INTEGER DEFAULT 0'); } catch { /* ignore */ }
  try { await db.execute('ALTER TABLE wallets ADD COLUMN last_play_at DATETIME'); } catch { /* ignore */ }
  try { await db.execute('ALTER TABLE wallets ADD COLUMN login_streak INTEGER DEFAULT 0'); } catch { /* ignore */ }

  // Create Transactions Ledger
  await db.execute(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      amount INTEGER NOT NULL,
      game_id TEXT,
      reference_id TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES wallets(user_id)
    )
  `);

  // Create Daily Spins table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS daily_spins (
      user_id TEXT PRIMARY KEY,
      last_spin_at DATETIME NOT NULL,
      spin_count INTEGER DEFAULT 0,
      FOREIGN KEY(user_id) REFERENCES wallets(user_id)
    )
  `);

  // Create Achievements table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS achievements (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      xp_reward INTEGER DEFAULT 0,
      reward_amount INTEGER DEFAULT 0
    )
  `);

  // Create Player Achievements table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS player_achievements (
      user_id TEXT NOT NULL,
      achievement_id TEXT NOT NULL,
      unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, achievement_id),
      FOREIGN KEY(user_id) REFERENCES wallets(user_id),
      FOREIGN KEY(achievement_id) REFERENCES achievements(id)
    )
  `);

  // Create Sessions table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      last_active DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Telemetry Events Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS telemetry_events (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      session_id TEXT,
      payload TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Player Insights Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS player_insights (
      user_id TEXT PRIMARY KEY,
      payday_score REAL DEFAULT 0,
      rage_click_count INTEGER DEFAULT 0,
      avg_tap_speed REAL DEFAULT 0,
      behavioral_archetype TEXT DEFAULT 'Unknown',
      preferred_game TEXT,
      last_device_stats TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  try { await db.execute(`ALTER TABLE player_insights ADD COLUMN behavioral_archetype TEXT DEFAULT 'Unknown'`); } catch { /* ignore */ }
  try { await db.execute(`ALTER TABLE player_insights ADD COLUMN avg_tap_speed REAL DEFAULT 0`); } catch { /* ignore */ }

  // --- Indexes for Production Performance ---
  const indexes = [
    { name: 'idx_telemetry_user_time', sql: 'CREATE INDEX IF NOT EXISTS idx_telemetry_user_time ON telemetry_events (user_id, timestamp)' },
    { name: 'idx_transactions_user', sql: 'CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions (user_id)' },
    { name: 'idx_player_insights_user', sql: 'CREATE INDEX IF NOT EXISTS idx_player_insights_user ON player_insights (user_id)' },
    { name: 'idx_player_achievements_user', sql: 'CREATE INDEX IF NOT EXISTS idx_player_achievements_user ON player_achievements (user_id)' },
    { name: 'idx_games_category', sql: 'CREATE INDEX IF NOT EXISTS idx_games_category ON games (category)' }
  ];

  for (const idx of indexes) {
    try {
      await db.execute(idx.sql);
    } catch (e) {
      console.error(`Failed to create index ${idx.name}:`, e);
    }
  }

  console.log('Database initialized successfully with indexes.');

  // Seed Mega Achievements
  await db.execute(`
    INSERT OR IGNORE INTO achievements (id, name, description, xp_reward, reward_amount) VALUES 
    ('first_win', 'First Blood', 'Win your very first game', 100, 50),
    ('level_up_5', 'Growing Fast', 'Reach Level 5', 250, 100),
    ('level_up_10', 'Bronze Tier', 'Reach Level 10', 500, 250),
    ('level_up_20', 'Silver Contender', 'Reach Level 20', 1000, 500),
    ('level_up_50', 'Gold Veteran', 'Reach Level 50', 5000, 2500),
    ('high_roller', 'High Roller', 'Wager more than 50 VLY in a single spin', 500, 0),
    ('slot_enthusiast', 'Spin Doctor', 'Spin 100 total times on slots', 200, 100),
    ('slot_master', 'Reel Master', 'Spin 1,000 total times on slots', 1000, 500),
    ('slot_legend', 'Slot Overlord', 'Spin 10,000 total times on slots', 5000, 2500),
    ('big_win_10x', 'Deca-Win', 'Win 10x your wager in one spin', 300, 150),
    ('big_win_50x', 'Mega-Win', 'Win 50x your wager in one spin', 1000, 500),
    ('big_win_100x', 'Jackpot Sighter', 'Win 100x your wager in one spin', 2500, 1000),
    ('near_miss', 'Close Call', 'Almost hit a jackpot (Visual Near Miss)', 50, 25),
    ('lucky_seven', 'Seventh Heaven', 'Land a winning line of 7s', 777, 77),
    ('cherry_picker', 'Cherry Picker', 'Win with only Fruit symbols', 150, 50),
    ('scatter_brain', 'Scatter Brain', 'Trigger a Free Spins bonus', 400, 200),
    ('bonus_hunter', 'Bonus Hunter', 'Trigger 10 bonus rounds', 800, 400),
    ('precision_strike', 'Bullseye', 'Win a skill game with a perfect score', 500, 250),
    ('skill_streak_3', 'Triple Threat', 'Win 3 skill games in a row', 300, 100),
    ('skill_streak_10', 'Unstoppable', 'Win 10 skill games in a row', 2000, 1000),
    ('reaction_god', 'Lightning Reflexes', 'React in under 0.2 seconds in a skill game', 1000, 500),
    ('strategic_master', 'Grandmaster', 'Win a strategy-based game without losing a life', 1500, 750),
    ('challenger', 'The Challenger', 'Send your first PvP challenge', 100, 50),
    ('rivalry', 'Nemesis', 'Play against the same person 5 times', 200, 100),
    ('lobby_legend', 'Chatterbox', 'Send 50 messages in the lobby chat', 100, 50),
    ('sportsman', 'Good Game', 'Send a GG after a loss', 50, 10),
    ('social_butterfly', 'Social Butterfly', 'Have 10 different opponents', 500, 250),
    ('daily_spinner', 'Daily Spinner', 'Spin the daily wheel 5 times', 200, 100),
    ('grinder_1', 'The Appetizer', 'Wager a total of 1,000 VLY', 500, 250),
    ('century_club', 'Century Club', 'Wager a total of 10,000 VLY', 2000, 1000),
    ('millennial', 'Millennial', 'Wager a total of 100,000 VLY', 10000, 5000),
    ('whale_watcher', 'Whale Watcher', 'Wager 1,000,000 VLY lifetime', 50000, 25000),
    ('daily_warrior', '7 Day Streak', 'Play at least one game every day for a week', 1000, 500),
    ('insomniac', 'Night Owl', 'Play between 2 AM and 5 AM', 300, 150),
    ('early_bird', 'Early Bird', 'Play between 5 AM and 8 AM', 300, 150),
    ('lucky_loser', 'Silver Lining', 'Lose 5 games in a row but gain 500 XP', 200, 0),
    ('pennies_from_heaven', 'Small Fry', 'Win with a minimum bet', 50, 10),
    ('high_stakes_loss', 'Heartbreak', 'Lose a wager larger than 500 VLY', 500, 0),
    ('comeback_kid', 'Comeback Kid', 'Win a game after 10 consecutive losses', 1000, 500),
    ('fortune_teller', 'Fortune Teller', 'Predict your win in chat before it happens', 1000, 1000),
    ('cyber_punk', 'Neon Dreams', 'Play CyberSlots for 1 hour total', 400, 200),
    ('pirate_booty', 'Davy Jones Locker', 'Win on a Pirate themed game', 200, 100),
    ('space_odyssey', 'Space Explorer', 'Win on an Interstellar themed game', 200, 100),
    ('ancient_riches', 'Pharaohs Curse', 'Unlock the hidden chamber in Ancient Riches', 1500, 750),
    ('hidden_gem', 'Secret Seeker', 'Click the logo 10 times in one session', 100, 50),
    ('bug_hunter', 'Tektite', 'Report a bug (or find an intentional one)', 1000, 500),
    ('developer_friend', 'Dev Buddy', 'Play against a developer account', 5000, 2500)
  `);

  // --- Secured Cash Partner Tables ---
  await db.execute(`
    CREATE TABLE IF NOT EXISTS secured_cash_partners (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      tier INTEGER DEFAULT 1,
      secured_balance INTEGER DEFAULT 0,
      secured_required INTEGER DEFAULT 100,
      max_cash_capacity INTEGER DEFAULT 100,
      available_capacity INTEGER DEFAULT 100,
      pending_cash INTEGER DEFAULT 0,
      total_deposits_processed INTEGER DEFAULT 0,
      total_volume_lifetime INTEGER DEFAULT 0,
      current_month_volume INTEGER DEFAULT 0,
      consecutive_active_days INTEGER DEFAULT 0,
      last_activity_at DATETIME,
      tier_achieved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      tier_reviewed_at DATETIME,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS cash_drops (
      id TEXT PRIMARY KEY,
      partner_id TEXT NOT NULL,
      amount INTEGER NOT NULL,
      drop_type TEXT,
      verification_method TEXT,
      verified_by TEXT,
      secured_balance_before INTEGER,
      secured_balance_after INTEGER,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      verified_at DATETIME
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS partner_collateral_deposits (
      id TEXT PRIMARY KEY,
      partner_id TEXT NOT NULL,
      amount INTEGER NOT NULL,
      method TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      confirmed_at DATETIME
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS partner_tier_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      partner_id TEXT NOT NULL,
      old_tier INTEGER,
      new_tier INTEGER,
      reason TEXT,
      triggered_by_volume INTEGER,
      triggered_by_streak INTEGER,
      triggered_by_days_inactive INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // --- Indexes for Secured Cash Tables ---
  const securedIndexes = [
    { name: 'idx_secured_partners_status', sql: 'CREATE INDEX IF NOT EXISTS idx_secured_partners_status ON secured_cash_partners (status)' },
    { name: 'idx_secured_partners_tier', sql: 'CREATE INDEX IF NOT EXISTS idx_secured_partners_tier ON secured_cash_partners (tier)' },
    { name: 'idx_cash_drops_partner', sql: 'CREATE INDEX IF NOT EXISTS idx_cash_drops_partner ON cash_drops (partner_id)' },
    { name: 'idx_tier_history_partner', sql: 'CREATE INDEX IF NOT EXISTS idx_tier_history_partner ON partner_tier_history (partner_id)' }
  ];

  for (const idx of securedIndexes) {
    try { await db.execute(idx.sql); } catch (e) { console.error(`Failed to create index ${idx.name}:`, e); }
  }

  console.log('Database initialized successfully with secured cash tables.');
}
