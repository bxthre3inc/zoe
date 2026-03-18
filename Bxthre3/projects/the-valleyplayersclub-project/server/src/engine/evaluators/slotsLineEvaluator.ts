import type { RuntimeConfig, GameResultState, WinningCombination } from '../types';

interface EvaluationResult {
    totalWin: number;
    winningCombinations: WinningCombination[];
}

/**
 * Math/Feature Profile Evaluator for Line-based Slots
 * Responsible for logic: Analyzing the generated 2D Symbol Matrix against 
 * predefined paylines and the current Tier's paytable.
 */
export class SlotsLineEvaluator {
    private config: RuntimeConfig;

    /**
     * @param config The compiled Game Config (including Paytable and Features)
     */
    constructor(config: RuntimeConfig) {
        this.config = config;
    }

    /**
     * Evaluates the matrix for winning line combinations
     * @param resultState { matrix, stops } from SlotProcessor
     * @param wager Total wager
     */
    calculate(resultState: GameResultState, wager: number): EvaluationResult {
        const matrix = resultState.matrix;
        if (!matrix) throw new Error('Result state missing matrix');

        const { paytable, paylines } = this.config;
        
        // This is a simplified 1-coin per line engine. 
        // Wager is spread across all active paylines.
        const lineBet = wager / paylines.length;
        
        let totalWin = 0;
        const winningCombinations: WinningCombination[] = [];

        // Check each defined payline in the Game Config
        paylines.forEach((linePositions: any[], lineIndex: number) => {
            // Extract the symbols from the matrix that land on this payline
            const lineSymbols = linePositions.map(pos => matrix[pos.row][pos.col]);
            
            // Evaluate from left-to-right
            const evalResult = this._evaluateLine(lineSymbols, paytable);
            
            if (evalResult.winMultiplier > 0) {
                const lineWinAmt = lineBet * evalResult.winMultiplier;
                totalWin += lineWinAmt;
                
                winningCombinations.push({
                    lineId: lineIndex,
                    symbols: lineSymbols,
                    matchCount: evalResult.matchCount,
                    winAmount: lineWinAmt
                });
            }
        });

        return {
            totalWin,
            winningCombinations
        };
    }

    /**
     * Checks a pure array of symbols (e.g., [Cherry, Cherry, Cherry, Blank, Blank])
     * against the paytable rules.
     * @private
     */
    private _evaluateLine(lineSymbols: string[], paytable: any) {
        let firstSymbol = lineSymbols[0];
        let matchCount = 1;

        // Count consecutive matching symbols from the left
        for (let i = 1; i < lineSymbols.length; i++) {
            if (lineSymbols[i] === firstSymbol || lineSymbols[i] === 'WILD') {
                matchCount++;
            } else {
                break; // Stop counting on the first mismatch
            }
        }

        // Look up the payout multiplier for this symbol and match length
        const symbolPayouts = paytable[firstSymbol] || {};
        const winMultiplier = symbolPayouts[matchCount.toString()] || 0;

        return {
            matchCount,
            winMultiplier
        };
    }
}
