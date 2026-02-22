import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Activity, LogOut, RefreshCw, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Login from './components/Login';
import { EquityBuyIn } from './components/EquityBuyIn';
import { InvestorLanding } from './components/InvestorLanding';
import { HQMilestones } from './components/HQMilestones';
import { NexusBreakroom } from './components/NexusBreakroom';
import { getApiKey, removeApiKey, api } from './services/api';

// Live Ticker Component for authentic Bloomberg feel
const LiveTicker = () => (
    <div className="w-full bg-slate-900 border-y border-emerald-500/20 py-1.5 overflow-hidden flex items-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
        <div className="flex animate-[ticker_20s_linear_infinite] whitespace-nowrap text-emerald-400 font-mono text-[10px] tracking-widest font-bold">
            <span className="mx-8 flex items-center gap-2"><Activity className="w-3 h-3" /> FSN-CARBON (CFS): $84.20 <span className="text-emerald-400">↑+1.2%</span></span>
            <span className="mx-8">FSN-WATER (WFS): $112.50 <span className="text-red-500">↓-0.4%</span></span>
            <span className="mx-8 border-l border-emerald-500/30 pl-8">ACTIVE NODES: 1,402 <span className="text-emerald-400">+12 TODAY</span></span>
            <span className="mx-8">TOTAL ACRES MONITORED: 42,500</span>
            <span className="mx-8 border-l border-emerald-500/30 pl-8 flex items-center gap-2"><Activity className="w-3 h-3" /> FSN-CARBON (CFS): $84.20 <span className="text-emerald-400">↑+1.2%</span></span>
            <span className="mx-8">FSN-WATER (WFS): $112.50 <span className="text-red-500">↓-0.4%</span></span>
            <span className="mx-8 border-l border-emerald-500/30 pl-8">ACTIVE NODES: 1,402 <span className="text-emerald-400">+12 TODAY</span></span>
            <span className="mx-8">TOTAL ACRES MONITORED: 42,500</span>
        </div>
    </div>
);

const mockRoiData = [
    { name: 'Q1 2024', value: 1.2 },
    { name: 'Q2 2024', value: 2.5 },
    { name: 'Q3 2024', value: 4.8 },
    { name: 'Q4 2024', value: 6.3 },
    { name: 'Q1 2025', value: 9.1 },
    { name: 'Q2 2025', value: 12.5 },
];

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [view, setView] = useState<'dashboard' | 'breakroom'>('dashboard');
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const auth = !!getApiKey();
        setIsAuthenticated(auth);
        if (auth) {
            fetchMetrics();
        }
    }, []);

    const fetchMetrics = async () => {
        setLoading(true);
        try {
            const data = await api.getMetrics();
            setMetrics(data);
        } catch (error) {
            console.error('Failed to fetch metrics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        removeApiKey();
        setIsAuthenticated(false);
        setShowLogin(false);
    };

    if (!isAuthenticated) {
        if (showLogin) {
            return <Login onLogin={() => {
                setIsAuthenticated(true);
                fetchMetrics();
            }} />;
        }
        return <InvestorLanding onExplore={() => setShowLogin(true)} />;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
            <style>{`
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
            <header className="bg-slate-950/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
                            <Zap className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tighter text-white">farmsenseOS<span className="text-emerald-400">.</span></h1>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">Investor Terminal</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <nav className="flex gap-6">
                            <button
                                onClick={() => setView('dashboard')}
                                className={`text-sm font-bold transition-all flex items-center gap-2 ${view === 'dashboard' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                            >
                                Intelligence
                            </button>
                            <button
                                onClick={() => setView('breakroom')}
                                className={`text-sm font-bold transition-all flex items-center gap-2 ${view === 'breakroom' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                            >
                                Nexus Breakroom
                            </button>
                        </nav>
                        <button
                            onClick={handleLogout}
                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Exit</span>
                        </button>
                    </div>
                </div>
                <LiveTicker />

                <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 overflow-hidden">
                    {view === 'breakroom' ? (
                        <div className="bg-black/40 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl h-[85vh]">
                            <NexusBreakroom />
                        </div>
                    ) : (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <HQMilestones />

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                <div className="lg:col-span-2">
                                    <EquityBuyIn />
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-white/10 shadow-2xl">
                                        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-emerald-400" /> Seed Projections
                                        </h3>
                                        <div className="h-48 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={mockRoiData}>
                                                    <defs>
                                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <p className="text-[10px] font-mono text-slate-500 uppercase mt-4">> SYSTEM.PREDICT(HQ_BUILDOUT_IMPACT)</p>
                                    </div>

                                    <div className="bg-emerald-500 p-8 rounded-xl text-slate-950 flex flex-col justify-between aspect-square lg:aspect-auto shadow-[0_0_40px_rgba(16,185,129,0.3)] border border-emerald-400">
                                        <div className="space-y-2">
                                            <div className="font-mono text-4xl font-black tracking-tighter leading-none">$26.8M</div>
                                            <div className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-80">> BASIS_VALUATION</div>
                                        </div>
                                        <div className="pt-8 flex justify-between items-end">
                                            <Activity className="w-10 h-10 opacity-30" />
                                            <div className="text-right font-mono">
                                                <div className="text-xs font-bold uppercase tracking-tighter">> SERIES_A_TARGET</div>
                                                <div className="text-2xl font-bold leading-none">$150M</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
        </div>
    );
}

export default App;
