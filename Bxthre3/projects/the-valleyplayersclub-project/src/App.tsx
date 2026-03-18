import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Layout
import Navbar from './components/Navbar';
import { FriendsSidebar } from './components/FriendsSidebar';
import { ChallengeModal } from './components/ChallengeModal';

// Pages
import Home from './pages/Home';
import Slots from './pages/Slots';
import CyberSlotsGame from './pages/CyberSlotsGame';
import AdminGameArchitect from './pages/AdminGameArchitect';
import AdminAnalytics from './pages/AdminAnalytics';
import Skills from './pages/Skills';
import Lobby from './pages/Lobby';
import Profile from './pages/Profile';
import Leaderboards from './pages/Leaderboards';
import PartnerDashboard from './pages/PartnerDashboard';

// Context
import { SocketProvider, useSocket } from './contexts/SocketContext';
import { useTelemetry } from './hooks/useTelemetry';

// App content wrapped so we can use SocketContext
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  
  // Placeholder for real user session - in production this would come from an Auth Provider
  const [currentUser] = useState<{ id: string; username: string; role?: 'player' | 'partner' | 'admin' } | null>({
    id: 'user-' + Math.floor(Math.random() * 1000),
    username: 'GuestPlayer',
    role: 'player' // Change to 'partner' to test partner view
  });
  
  // Psychological Analytics Hook
  useTelemetry(currentUser?.id || null);
  
  // Incoming challenge state
  const [incomingChallenge, setIncomingChallenge] = useState<any>(null);

  const { send, lastMessage } = useSocket();

  useEffect(() => {
    if (!lastMessage) return;

    const { type, data } = lastMessage;

    switch (type) {
      case 'challenge:received':
        setIncomingChallenge(data);
        break;
      case 'lobby:joined':
        setIncomingChallenge(null);
        navigate('/lobby', { state: data });
        break;
    }
  }, [lastMessage, navigate]);

  // Redirect partners to partner dashboard
  useEffect(() => {
    if (currentUser?.role === 'partner' && location.pathname !== '/partner') {
      navigate('/partner');
    }
  }, [currentUser, location.pathname, navigate]);

  const handleChallenge = (wager: number, game: string) => {
    setIsChallengeOpen(false);
    send('challenge:create', { game, wager });
    
    // For now, let's also navigate to the lobby for demo purposes
    navigate('/lobby', {
      state: {
        game,
        wager,
        opponent: {
          name: 'CyberShark',
          avatar: 'C',
          elo: 1450,
          isReady: false
        }
      }
    });
  };

  return (
    <>
      <Navbar onOpenFriends={() => setIsFriendsOpen(true)} />
      <div className="page-wrapper">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/slots" element={<Slots />} />
            <Route path="/slots/cyber" element={<CyberSlotsGame />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/partner" element={<PartnerDashboard />} />
            <Route path="/admin/architect" element={<AdminGameArchitect />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
          </Routes>
        </AnimatePresence>
      </div>

      <FriendsSidebar isOpen={isFriendsOpen} onClose={() => setIsFriendsOpen(false)} />
      <ChallengeModal 
        isOpen={isChallengeOpen} 
        onClose={() => setIsChallengeOpen(false)} 
        opponentName="CyberShark"
        onChallenge={handleChallenge} 
      />


      {/* Incoming Challenge Popup */}
      <AnimatePresence>
        {incomingChallenge && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            style={{
              position: 'fixed',
              bottom: '40px',
              left: '50%',
              zIndex: 2000,
              background: 'rgba(20, 10, 40, 0.95)',
              border: '1px solid var(--accent-secondary)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minWidth: '300px'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--accent-secondary)', fontWeight: 'bold', marginBottom: '8px' }}>
                INCOMING CHALLENGE!
              </div>
              <div style={{ fontSize: '1.2rem' }}>
                <strong>{incomingChallenge.from.username}</strong> wants to play <strong>{incomingChallenge.game}</strong>
              </div>
              <div style={{ color: '#00e676', fontWeight: 800, fontSize: '1.5rem', marginTop: '8px' }}>
                Wager: ${incomingChallenge.wager} VLY
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn"
                style={{ flex: 1, background: 'rgba(255,255,255,0.1)' }}
                onClick={() => setIncomingChallenge(null)}
              >
                Decline
              </button>
              <button 
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  send('challenge:accept', {
                    challengerId: incomingChallenge.from.id,
                    game: incomingChallenge.game,
                    wager: incomingChallenge.wager
                  });
                }}
              >
                Accept
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [user] = useState({ id: 'user-' + Math.floor(Math.random() * 1000), token: 'demo-token' });

  return (
    <SocketProvider>
       <AppContent />
    </SocketProvider>
  )
}

