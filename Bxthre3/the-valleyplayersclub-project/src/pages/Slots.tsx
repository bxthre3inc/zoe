import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cherry, Gem, Flame } from 'lucide-react';
import GameCard from '../components/GameCard';

const Slots = () => {
  const navigate = useNavigate();
  const games = [
    { title: 'Neon Nights', category: 'Classic Slot', color: '#ff00ff' },
    { title: 'Cyber Jackpot', category: 'Progressive', color: '#00ffff' },
    { title: 'Mystic Fortune', category: 'Video Slot', color: '#8a2be2' },
    { title: 'Galaxy Spin', category: 'Megaways', color: '#ffb347' },
    { title: 'Dragon Treasury', category: 'Video Slot', color: '#ff4040' },
    { title: 'Quantum Reels', category: 'Classic Slot', color: '#bb86fc' },
  ];

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <div style={{
          display: 'inline-flex',
          background: 'rgba(255, 0, 255, 0.1)',
          padding: '12px',
          borderRadius: '50%',
          marginBottom: '16px',
          color: 'var(--accent-secondary)'
        }}>
          <Cherry size={48} />
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '16px' }}>
          Dynamic <span className="text-gradient">Slots</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Spin the reels on our provably fair, high-RTP slot machines. Featuring dynamic 
          multipliers, free spins, and massive progressive jackpots.
        </p>
      </motion.div>

      {/* Tabs / Filters placeholder */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
        <button className="btn btn-primary" style={{ padding: '8px 24px' }}>All Games</button>
        <button className="btn btn-secondary" style={{ padding: '8px 24px' }}><Flame size={16} /> Hot</button>
        <button className="btn btn-secondary" style={{ padding: '8px 24px' }}><Gem size={16} /> Jackpots</button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {/* Flagship Game [NEW] */}
        <GameCard 
          title="Cyber Slots" 
          category="VPC Originals" 
          imageColor="#00ffff" 
          delay={0}
          onClick={() => navigate('/slots/cyber')}
        />

        {games.slice(1).map((g, i) => (
          <GameCard 
            key={i} 
            title={g.title} 
            category={g.category} 
            imageColor={g.color} 
            delay={(i + 1) * 0.1} 
          />
        ))}
      </div>
    </div>
  );
};

export default Slots;
