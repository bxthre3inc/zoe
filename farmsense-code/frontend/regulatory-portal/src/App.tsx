import React, { useState, useEffect } from 'react';
import { ComplianceList } from './components/ComplianceList';
import { ScientificValidation } from './components/ScientificValidation';
import Login from './components/Login';
import { FileBadge, Search, Bell, LogOut, ShieldCheck, ClipboardList, TrendingUp, AlertTriangle, Video } from 'lucide-react';
import { EconomicImpact } from './components/EconomicImpact';
import { IntegrityChainVisualizer } from './components/IntegrityChainVisualizer';
import { DroneARFeed } from './components/DroneARFeed';
import { getApiKey, removeApiKey, api } from './services/api';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [metrics, setMetrics] = useState<any>(null);
    const [activeView, setActiveView] = useState<'reports' | 'science' | 'economy' | 'drone'>('reports');

    useEffect(() => {
        const auth = !!getApiKey();
        setIsAuthenticated(auth);
        if (auth) {
            fetchMetrics();
        }
    }, []);

    const fetchMetrics = async () => {
        try {
            const data = await api.getMetrics();
            setMetrics(data);
        } catch (error) {
            console.error('Failed to fetch metrics:', error);
        }
    };

    const handleLogout = () => {
        removeApiKey();
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return <Login onLogin={() => {
            setIsAuthenticated(true);
            fetchMetrics();
        }} />;
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-300 selection:bg-cyan-500 selection:text-white">
            {/* Header */}
            <header className="bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
                                <FileBadge className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tighter text-white">FarmSense<span className="text-emerald-400">.</span></h1>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">Regulatory Portal</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="relative border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search immutable ledgers..."
                                    className="pl-9 pr-4 py-2 bg-transparent text-sm focus:outline-none w-64 text-white placeholder:text-slate-500"
                                />
                            </div>
                            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                            </button>
                            <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
                                <div className="text-right">
                                    <p className="text-sm font-bold text-white tracking-wider uppercase">Officer Demo</p>
                                    <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest"><span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse mr-1"></span> Session Active</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-slate-500 hover:text-red-500 transition-colors ml-2"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sub-header Navigation */}
            <div className="bg-slate-900 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-8 h-12">
                        <button
                            onClick={() => setActiveView('reports')}
                            className={`flex items-center gap-2 px-1 border-b-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeView === 'reports' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                        >
                            <ClipboardList className="w-4 h-4" /> Compliance Reports
                        </button>
                        <button
                            onClick={() => setActiveView('science')}
                            className={`flex items-center gap-2 px-1 border-b-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeView === 'science' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-600 hover:text-slate-300'}`}
                        >
                            <ShieldCheck className="w-4 h-4" /> Scientific Validation
                        </button>
                        <button
                            onClick={() => setActiveView('economy')}
                            className={`flex items-center gap-2 px-1 border-b-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeView === 'economy' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-600 hover:text-slate-300'}`}
                        >
                            <TrendingUp className="w-4 h-4" /> Economic Impact & IP
                        </button>
                        <button
                            onClick={() => setActiveView('drone')}
                            className={`flex items-center gap-2 px-1 border-b-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeView === 'drone' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-600 hover:text-slate-300'}`}
                        >
                            <Video className="w-4 h-4" /> Drone AR Feed
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Automated Anomaly Detection Alert */}
                <div className="bg-red-950/30 border border-red-500/50 p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
                    <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-1">Automated Anomaly Detected: Zone 4B</h4>
                        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">Cryptographic hash mismatch identified in manual water log entry #8492. Flow meter telemetry reports 0 gallons pumped, but multi-spectral satellite moisture index jumped by 22% in a 4-hour window. This indicates unmetered agricultural water extraction.</p>
                        <button className="mt-3 text-[10px] bg-red-500 text-white font-bold uppercase tracking-widest px-4 py-2 hover:bg-red-400 transition-colors">Issue State Citation</button>
                    </div>
                </div>

                <IntegrityChainVisualizer />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-[#0A1120] border border-blue-900/30 p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Compliance Rate</p>
                        <p className="text-4xl font-black text-white mt-3 font-mono">{metrics ? metrics.compliance_rate_pct + '%' : '--.-%'}</p>
                    </div>
                    <div className="bg-red-950/20 border border-red-900/50 p-6 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 blur-2xl group-hover:bg-red-500/20 transition-all"></div>
                        <p className="text-[10px] text-red-500/70 font-bold uppercase tracking-widest">Critical Violations</p>
                        <p className="text-4xl font-black text-red-500 mt-3 font-mono">{metrics ? metrics.critical_violations : '--'}</p>
                    </div>
                    <div className="bg-[#0A1120] border border-blue-900/30 p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Audits This Month</p>
                        <p className="text-4xl font-black text-white mt-3 font-mono">{metrics ? metrics.audits_this_month : '---'}</p>
                    </div>
                    <div className="bg-[#0A1120] border border-blue-900/30 p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Fields Monitored</p>
                        <p className="text-4xl font-black text-white mt-3 font-mono">{metrics ? metrics.total_fields_monitored : '----'}</p>
                    </div>
                </div>

                {activeView === 'reports' ? (
                    <ComplianceList />
                ) : activeView === 'science' ? (
                    <ScientificValidation />
                ) : activeView === 'drone' ? (
                    <DroneARFeed />
                ) : (
                    <EconomicImpact />
                )}
            </main>
        </div>
    );
}

export default App;
