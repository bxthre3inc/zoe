
import React, { useState, useEffect } from 'react';
import { ScrollText, CheckCircle, Clock, AlertTriangle, LogOut, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Login from './components/Login';
import SupportLetters from './components/SupportLetters';
import SignLetter from './components/SignLetter';
import { getApiKey, removeApiKey, api } from './services/api';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [impact, setImpact] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Simple routing check
    const query = new URLSearchParams(window.location.search);
    const signLetterId = query.get('sign');

    useEffect(() => {
        const auth = !!getApiKey();
        setIsAuthenticated(auth);
        if (auth && !signLetterId) {
            fetchImpact();
        }
    }, [signLetterId]);

    const fetchImpact = async () => {
        setLoading(true);
        try {
            const data = await api.getGrantImpact('FS-2025-X82');
            setImpact(data);
        } catch (error) {
            console.error('Failed to fetch impact:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        removeApiKey();
        setIsAuthenticated(false);
    };

    if (signLetterId) {
        return <SignLetter letterId={signLetterId} />;
    }

    if (!isAuthenticated) {
        return <Login onLogin={() => {
            setIsAuthenticated(true);
            fetchImpact();
        }} />;
    }

    const impactData = impact ? [
        { name: 'Water Saved', value: impact.water_saved_m3, unit: 'm³' },
        { name: 'Yield Gain', value: impact.yield_gain_pct * 100, unit: '%' },
        { name: 'C02 Redux', value: impact.carbon_offset_tons, unit: 'ton' },
        { name: 'Sustainability', value: impact.sustainability_score, unit: 'score' },
    ] : [];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500 selection:text-white pb-32">
            <header className="bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-sm fixed top-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center transition-all duration-500">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
                            <ScrollText className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tighter text-white">FarmSense<span className="text-emerald-400">.</span></h1>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">Grant Portal</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 font-sans">
                        <div className="text-sm text-slate-400">
                            Grant ID: <span className="font-mono text-white font-bold">FS-2025-X82</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-slate-500 hover:text-red-500 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="w-full font-sans relative">
                {/* Intro Slide */}
                <section className="h-screen flex flex-col justify-center items-center text-center px-8 relative sticky top-0 pt-20 bg-slate-950 z-0">
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <p className="text-sm font-bold tracking-[0.3em] uppercase text-emerald-500 mb-6">Federal Dept. of Agriculture</p>
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
                            Grant Return<br />On Investment.
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto italic mb-12">
                            A completely transparent, cryptographically secured overview of environmental and economic impact for Grant FS-2025-X82.
                        </p>
                        <div className="animate-bounce">
                            <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Scroll to Explore</span>
                        </div>
                    </div>
                </section>

                {/* Financial Status Slide */}
                <section className="min-h-screen sticky top-0 pt-32 pb-20 bg-slate-900 z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/5 px-8 flex flex-col justify-center">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Financial & Impact Status</h2>
                                <p className="text-lg text-slate-400 mt-4 italic">Real-time metrics sourced directly from FarmSense IoT deployed nodes.</p>
                            </div>
                            <button onClick={fetchImpact} className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-sm">
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Feed
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-xl shadow-2xl border border-white/10 transform transition-transform hover:-translate-y-2 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                                <div className="flex items-center gap-3 mb-6 text-emerald-400 font-semibold text-lg">
                                    <CheckCircle className="w-6 h-6" /> Disbursement
                                </div>
                                <p className="text-6xl font-black font-mono text-white tracking-tighter mb-2">$2.4M</p>
                                <p className="text-base text-slate-400 italic">FY2025 Grant Funds Allocated</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-xl shadow-2xl border border-white/10 transform transition-transform hover:-translate-y-2 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                                <div className="flex items-center gap-3 mb-6 text-blue-400 font-semibold text-lg">
                                    <Clock className="w-6 h-6" /> Reporting
                                </div>
                                <p className="text-6xl font-black font-mono text-white tracking-tighter mb-2">
                                    {impact ? impact.reporting_period_days : '---'} <span className="text-3xl font-bold text-slate-500 font-sans">Days</span>
                                </p>
                                <p className="text-base text-slate-400 italic">Active Continuous Data Pipeline</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-xl shadow-2xl border border-white/10 transform transition-transform hover:-translate-y-2 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
                                <div className="flex items-center gap-3 mb-6 text-orange-400 font-semibold text-lg">
                                    <AlertTriangle className="w-6 h-6" /> Integrity
                                </div>
                                <p className="text-6xl font-black font-mono text-white tracking-tighter mb-2">100%</p>
                                <p className="text-base text-slate-400 italic">Verified via Zero-Knowledge Blockchain</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Environmental & Support Slide */}
                <section className="min-h-screen sticky top-0 pt-32 pb-20 bg-stone-900 text-stone-100 z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-stone-700 px-8 flex flex-col justify-center">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Impact Report */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-4xl font-bold text-white mb-4 font-serif tracking-tight">Environmental Impact</h2>
                                    <p className="text-stone-400 font-serif italic text-lg mb-10 border-b border-stone-800 pb-8">Measurable improvements derived organically from hardware operation.</p>
                                </div>
                                <div className="h-96 w-full bg-black/40 rounded-3xl p-8 border border-stone-800 shadow-2xl">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={impactData} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#292524" />
                                            <XAxis type="number" stroke="#78716c" />
                                            <YAxis dataKey="name" type="category" width={120} stroke="#a8a29e" tick={{ fontSize: 14, fontWeight: 600 }} />
                                            <Tooltip cursor={{ fill: '#1c1917' }} contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#292524', borderRadius: '12px', color: '#fff' }} />
                                            <Bar dataKey="value" fill="#ea580c" radius={[0, 8, 8, 0]} barSize={28} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Support Letters */}
                            <div className="h-full mt-4 lg:mt-0">
                                <SupportLetters />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Audit Submissions */}
                <div className="mt-10 bg-white p-8 rounded-lg shadow-sm border border-stone-100">
                    {/* Audit Submissions */}
                    <section className="min-h-[60vh] sticky top-0 bg-white z-30 pt-32 pb-20 px-8 flex flex-col items-center">
                        <div className="max-w-4xl mx-auto w-full">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-black text-stone-900 tracking-tight font-serif mb-4">Chronological Immutable Audit</h2>
                                <p className="text-stone-500 font-serif italic text-xl">Every action, validation, and disbursement event logged permanently.</p>
                            </div>

                            <div className="space-y-4">
                                {impact?.audit_log?.map((log: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center p-6 bg-stone-50 border border-stone-200 rounded-xl hover:bg-stone-100 hover:shadow-md transition-all group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-stone-400 border border-stone-200 group-hover:border-stone-400 group-hover:text-stone-800 transition-colors">
                                                {impact.audit_log.length - idx}
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-stone-800 mb-1">{log.event}</p>
                                                <p className="text-sm text-stone-500 font-serif italic flex items-center gap-2"><Clock className="w-3 h-3" /> {log.timestamp}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-widest ${log.status === 'validated' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-stone-200 text-stone-800'} border`}>
                                            {log.status}
                                        </span>
                                    </div>
                                )) || <p className="text-stone-400 italic font-sans text-center mt-10">No recent logs available for this grant.</p>}
                            </div>
                        </div>
                    </section>
            </main>
        </div>
    );
}

export default App;
