import { RNGService } from './rng';
import registry from '../games/registry';
import type { RuntimeConfig, GameCategory, ActionPayload, WagerResult } from './types';
import { GamificationService } from '../services/GamificationService';

// Processors (Category Level Physics)
import { SlotProcessor } from './processors/slotProcessor';
import { CrashProcessor } from './processors/crashProcessor';
import { DeckProcessor } from './processors/deckProcessor';
import { CoinProcessor } from './processors/coinProcessor';

// Evaluators (Feature Level Math)
import { SlotsLineEvaluator } from './evaluators/slotsLineEvaluator';
import { CrashEvaluator } from './evaluators/crashEvaluator';
import { ScatterEvaluator } from './evaluators/scatterEvaluator';
import { CoinEvaluator } from './evaluators/coinEvaluator';
import { BlackjackEvaluator } from './evaluators/blackjackEvaluator';

const PROCESSORS: Record<string, new (config: RuntimeConfig, rng: RNGService) => { execute: (payload: ActionPayload) => Promise<any> }> = {
    'slots': SlotProcessor as any,
    'crash': CrashProcessor as any,
    'cards': DeckProcessor as any,
    'skill': CoinProcessor as any,
};

const EVALUATORS: Record<string, new (config: RuntimeConfig) => { calculate: (state: any, wager: number, payload: ActionPayload) => any }> = {
    'slots-lines': SlotsLineEvaluator,
    'crash-standard': CrashEvaluator,
    'slots-scatter': ScatterEvaluator,
    'coin-toss': CoinEvaluator as any,
    'blackjack-single': BlackjackEvaluator as any,
};

/**
 * Universal Game Calculation Pipeline
 * 
 * @param userId - The user making the wager
 * @param gameId - e.g., 'cyberSlots' 
 * @param category - e.g., 'slots'
 * @param wager - Bet amount
 * @param actionPayload - Game specific inputs
 * @param userTier - Used to lookup Math Profile
 */
export async function processWager(
    userId: string, 
    gameId: string, 
    category: GameCategory, 
    wager: number, 
    actionPayload: ActionPayload, 
    userTier: string = 'standard'
): Promise<WagerResult> {
    // 1. Fetch Configuration Stack
    const config = await registry.getGameConfig(category, gameId, userTier);

    // 2. Validate Wager
    if (wager < config.minBet || wager > config.maxBet) {
        throw new Error(`Invalid wager amount: ${wager}. Allowed range: ${config.minBet} - ${config.maxBet}`);
    }

    // 3. Request Randomness
    const rng = new RNGService(undefined, `user-${userId}-seed`, Date.now());
    await rng.init();

    // 4. Run Category Physics Processor
    const ProcessorClass = PROCESSORS[category];
    if (!ProcessorClass) throw new Error(`Unknown Category Processor: ${category}`);
    
    // 5. Debit Wager from Wallet
    const WalletProcessor = (await import('./wallet')).WalletProcessor;
    const debitResult = await WalletProcessor.processTransaction(userId, wager, 'wager', gameId);
    if (!debitResult.success) {
        throw new Error(debitResult.error || 'Transaction Failed');
    }

    const processor = new ProcessorClass(config as any, rng);
    const gameResultState = await processor.execute(actionPayload);

    // 6. Run Math Feature Evaluator
    const EvaluatorClass = EVALUATORS[config.evaluatorType];
    if (!EvaluatorClass) throw new Error(`Unknown Evaluator: ${config.evaluatorType}`);
    
    const evaluator = new EvaluatorClass(config);
    const evaluation = evaluator.calculate(gameResultState, wager, actionPayload);

    // 7. Credit Win to Wallet (if applicable)
    let creditResult;
    if (evaluation.totalWin > 0) {
        creditResult = await WalletProcessor.processTransaction(userId, evaluation.totalWin, 'win', gameId, debitResult.transactionId);
    }

    // 8. Award XP (Gamification integration)
    await GamificationService.addXP(userId, Math.max(10, Math.floor(wager / 10)));

    // 9. Automated Achievement Check
    const unlockedAchievements = await GamificationService.checkAchievements(userId, {
        wager,
        payout: evaluation.totalWin,
        gameCategory: category
    });

    // 10. Return Final Payload
    return {
        userId,
        gameId,
        tierUsed: userTier,
        wager,
        payout: evaluation.totalWin,
        netResult: evaluation.totalWin - wager,
        gameCategory: category,
        state: gameResultState,
        winningCombinations: evaluation.winningCombinations,
        newBalance: creditResult?.newBalance ?? debitResult.newBalance,
        achievements: unlockedAchievements.length > 0 ? unlockedAchievements : undefined
    };
}
