import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../../contexts/SocketContext';
import { Star, Coins } from 'lucide-react';
import SlotReel from './SlotReel';
import { SlotThemeRegistry } from './SlotThemeRegistry';

interface SlotMachineProps {
  gameId: string;
  category: string;
  themeId: string;
  manifest: {
    reels: string[][];
    rows: number;
    name: string;
  };
}

const UniversalSlotMachine: React.FC<SlotMachineProps> = ({ 
  gameId, 
  category, 
  themeId, 
  manifest 
}) => {
  const { send, lastMessage, balance, isConnected } = useSocket();
  const [isSpinning, setIsSpinning] = useState(false);
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [wager, setWager] = useState(10);
  const [lastWin, setLastWin] = useState(0);
  const [winningCombinations, setWinningCombinations] = useState<any[]>([]);

  const theme = SlotThemeRegistry.getTheme(themeId);

  // Initialize empty matrix based on manifest if not set
  useEffect(() => {
    if (matrix.length === 0) {
      const initialMatrix = Array(manifest.rows).fill(null).map(() => 
        Array(manifest.reels.length).fill('BLANK')
      );
      setMatrix(initialMatrix);
    }
  }, [manifest, matrix]);

  const handleResult = useCallback((data: any) => {
    const { state, payout, winningCombinations } = data;
    
    setMatrix(state.matrix);
    setLastWin(payout);
    setWinningCombinations(winningCombinations);
    
    setTimeout(() => {
      setIsSpinning(false);
    }, 600);
  }, []);

  useEffect(() => {
    if (lastMessage?.type === 'game:result' && lastMessage.data.gameId === gameId) {
      handleResult(lastMessage.data);
    }
  }, [lastMessage, handleResult, gameId]);

  const spin = () => {
    if (isSpinning || balance < wager || !isConnected) return;
    
    setIsSpinning(true);
    setLastWin(0);
    setWinningCombinations([]);
    
    send('game:action', {
      gameId,
      category,
      wager,
      actionPayload: {},
      userTier: 'standard'
    });
  };

  const getWinningRowsForCol = (colIndex: number) => {
    const winningRows: number[] = [];
    winningCombinations.forEach(win => {
      // In our line engine, we need to map the logic back to the visual
      // For now, this is a placeholder check
      if (win.lineId !== undefined) {
         // This is where we'd lookup the payline mapping from manifest
         // Mock logic for demo:
         if (win.lineId === 0) winningRows.push(1);
         if (win.lineId === 1) winningRows.push(0);
         if (win.lineId === 2) winningRows.push(2);
      }
    });
    return winningRows;
  };

  if (matrix.length === 0) return null;

  return (
    <div className="universal-slot-machine" style={{ background: theme.reelBg }}>
      <div className="slot-machine-header">
        <div className="stat-pill neon-blue">
          <Coins size={18} />
          <span>${balance.toLocaleString()}</span>
        </div>
        <div className="game-title">
          <h2 className="text-gradient">{manifest.name.toUpperCase()}</h2>
        </div>
        <div className="stat-pill neon-yellow">
          <Star size={18} />
          <span>WIN: ${lastWin.toLocaleString()}</span>
        </div>
      </div>

      <div className="reels-viewport neon-border" style={{ borderColor: theme.border, background: theme.reelBg }}>
        {manifest.reels.map((_, colIndex) => (
          <SlotReel
            key={colIndex}
            reelIndex={colIndex}
            visibleSymbols={matrix.map(row => row[colIndex])}
            isSpinning={isSpinning}
            themeId={themeId}
            rows={manifest.rows}
            delay={colIndex * 0.1}
            highlightedRows={getWinningRowsForCol(colIndex)}
          />
        ))}

        <AnimatePresence>
          {lastWin > 0 && !isSpinning && (
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="win-overlay"
            >
              BIG WIN
              <div className="win-amount">${lastWin}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="slot-machine-controls">
        <div className="bet-control">
          <label>WAGER</label>
          <div className="control-inner">
            <button onClick={() => setWager(Math.max(10, wager - 10))}>-</button>
            <span className="value">${wager}</span>
            <button onClick={() => setWager(wager + 10)}>+</button>
          </div>
        </div>

        <button 
          className={`spin-trigger ${isSpinning ? 'spinning' : ''}`}
          onClick={spin}
          disabled={isSpinning || balance < wager || !isConnected}
        >
          {isSpinning ? 'SPINNING' : isConnected ? 'SPIN' : 'OFFLINE'}
        </button>

        <div className="auto-control">
          <label>AUTO</label>
          <button className="auto-btn">OFF</button>
        </div>
      </div>

      <style>{`
        .universal-slot-machine {
          padding: 32px;
          border-radius: 24px;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 50px rgba(0,0,0,0.5);
        }
        .slot-machine-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 32px;
        }
        .stat-pill {
          background: rgba(0,0,0,0.4);
          padding: 8px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .reels-viewport {
          display: flex;
          gap: 12px;
          padding: 16px;
          border-radius: 16px;
          min-height: 400px;
          position: relative;
          border: 2px solid transparent;
        }
        .slot-machine-controls {
          margin-top: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .bet-control label, .auto-control label {
           font-size: 0.7rem;
           letter-spacing: 2px;
           color: var(--text-secondary);
           margin-bottom: 4px;
           display: block;
        }
        .control-inner {
          background: #000;
          padding: 4px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .control-inner button {
          background: #111;
          color: #fff;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          cursor: pointer;
        }
        .value { color: var(--accent-secondary); font-weight: 800; }
        .spin-trigger {
          background: var(--grad-primary);
          border: none;
          color: #fff;
          padding: 16px 64px;
          border-radius: 12px;
          font-size: 1.5rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.4);
        }
        .win-overlay {
          position: absolute;
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          text-align: center; color: #ffd700; font-size: 3rem; font-weight: 900;
          z-index: 100; text-shadow: 0 0 20px rgba(0,0,0,0.8);
        }
        .winning-highlight { box-shadow: 0 0 20px var(--accent-primary); }
      `}</style>
    </div>
  );
};

export default UniversalSlotMachine;
