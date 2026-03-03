
import React, { useState, useEffect } from 'react';
import {
    Microscope, Database, Download, LogOut, RefreshCw, Sliders,
    FlaskConical, Satellite, GitBranch, TestTube2, Cpu, BookOpen, Globe, Wrench,
    LayoutGrid, ChevronRight, Menu, X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Login from './components/Login';
import { ParameterDial } from './components/ParameterDial';
import { MatrixDataStream } from './components/MatrixDataStream';
import { FederatedExperimentConsole } from './components/FederatedExperimentConsole';
import { SatelliteCovariateExplorer } from './components/SatelliteCovariateExplorer';
import { CSEKrigingWorksheetInspector } from './components/CSEKrigingWorksheetInspector';
import { FieldTrialDesignEngine } from './components/FieldTrialDesignEngine';
import { SPACModelSandbox } from './components/SPACModelSandbox';
import { OpenDataRepository } from './components/OpenDataRepository';
import { BasinAnalytics } from './components/BasinAnalytics';
import { LabIntegrationBridge } from './components/LabIntegrationBridge';
import { getApiKey, removeApiKey, api } from './services/api';

const mockChartData = [
    { name: 'Jan', nutrientA: 4000, nutrientB: 2400 },
    { name: 'Feb', nutrientA: 3000, nutrientB: 1398 },
    { name: 'Mar', nutrientA: 2000, nutrientB: 9800 },
    { name: 'Apr', nutrientA: 2780, nutrientB: 3908 },
    { name: 'May', nutrientA: 1890, nutrientB: 4800 },
    { name: 'Jun', nutrientA: 2390, nutrientB: 3800 },
    { name: 'Jul', nutrientA: 3490, nutrientB: 4300 },
];

type ViewId =
    | 'raw-feed'
    | 'federated'
    | 'satellite'
    | 'kriging'
    | 'field-trial'
    | 'spac'
    | 'open-data'
    | 'basin'
    | 'lab-bridge';

interface NavItem {
    id: ViewId;
    label: string;
    icon: React.ElementType;
    badge?: string;
    group: 'v1' | 'v175';
}

const NAV_ITEMS: NavItem[] = [
    { id: 'raw-feed', label: 'Raw Data Feed', icon: LayoutGrid, group: 'v1' },
    { id: 'federated', label: 'Federated Experiments', icon: FlaskConical, badge: 'NEW', group: 'v175' },
    { id: 'satellite', label: 'Satellite Suite', icon: Satellite, badge: 'NEW', group: 'v175' },
    { id: 'kriging', label: 'CSE Worksheet Inspector', icon: GitBranch, badge: 'NEW', group: 'v175' },
    { id: 'field-trial', label: 'Field Trial Engine', icon: TestTube2, badge: 'NEW', group: 'v175' },
    { id: 'spac', label: 'SPAC Model Sandbox', icon: Cpu, badge: 'NEW', group: 'v175' },
    { id: 'open-data', label: 'Open Data Repository', icon: BookOpen, badge: 'NEW', group: 'v175' },
    { id: 'basin', label: 'Basin Analytics', icon: Globe, badge: 'NEW', group: 'v175' },
    { id: 'lab-bridge', label: 'Lab Integration Bridge', icon: Wrench, badge: 'NEW', group: 'v175' },
];

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeView, setActiveView] = useState<ViewId>('raw-feed');
    const [datasets, setDatasets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [dials, setDials] = useState({ depth: 15, moisture: 45, ph: 6 });
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const auth = !!getApiKey();
        setIsAuthenticated(auth);
        if (auth) fetchDatasets();
    }, []);

    const fetchDatasets = async () => {
        setLoading(true);
        try {
            const data = await api.getDatasets();
            setDatasets(data);
        } catch {
            // backend may not be running — graceful degradation
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => { removeApiKey(); setIsAuthenticated(false); };
    const handleExport = () => { setIsExporting(true); setTimeout(() => setIsExporting(false), 3000); };

    if (!isAuthenticated) {
        return <Login onLogin={() => { setIsAuthenticated(true); fetchDatasets(); }} />;
    }

    const activeNav = NAV_ITEMS.find(n => n.id === activeView)!;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            {/* Top Bar */}
            <header className="bg-slate-950/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                <div className="px-4 sm:px-6">
                    <div className="flex justify-between items-center h-14">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSidebarOpen(o => !o)} className="text-slate-500 hover:text-white transition-colors p-1">
                                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                            <div className="bg-emerald-500 p-1.5 rounded-lg shadow-lg shadow-emerald-500/20">
                                <Microscope className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black tracking-tighter text-white leading-none">FarmSense<span className="text-emerald-400">.</span></h1>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Research Portal</p>
                            </div>
                            <div className="hidden sm:flex items-center gap-1 text-slate-600 text-xs ml-2">
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-slate-400 font-medium">{activeNav.label}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {activeView === 'raw-feed' && (
                                <>
                                    <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest transition-colors">
                                        <Database className="w-3.5 h-3.5" /> Lab Connect
                                    </button>
                                    <button onClick={handleExport}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:from-emerald-500 hover:to-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
                                        <Download className="w-3.5 h-3.5" /> Export All
                                    </button>
                                </>
                            )}
                            <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {sidebarOpen && (
                    <nav className="w-56 shrink-0 bg-black/30 border-r border-white/5 overflow-y-auto flex flex-col">
                        <div className="p-3 space-y-0.5">
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] px-3 pt-4 pb-2">V1 — Core</p>
                            {NAV_ITEMS.filter(n => n.group === 'v1').map(item => {
                                const Icon = item.icon;
                                return (
                                    <button key={item.id} onClick={() => setActiveView(item.id)}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeView === item.id ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-800/40' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}>
                                        <Icon className="w-3.5 h-3.5 shrink-0" />
                                        <span className="truncate">{item.label}</span>
                                    </button>
                                );
                            })}

                            <p className="text-[9px] font-black text-purple-700 uppercase tracking-[0.2em] px-3 pt-5 pb-2">V1.75 — New</p>
                            {NAV_ITEMS.filter(n => n.group === 'v175').map(item => {
                                const Icon = item.icon;
                                return (
                                    <button key={item.id} onClick={() => setActiveView(item.id)}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeView === item.id ? 'bg-purple-600/20 text-purple-300 border border-purple-800/40' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}>
                                        <Icon className="w-3.5 h-3.5 shrink-0" />
                                        <span className="truncate flex-1">{item.label}</span>
                                        {item.badge && activeView !== item.id && (
                                            <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-purple-800/40 text-purple-400 border border-purple-700/30 uppercase tracking-wider shrink-0">{item.badge}</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-auto p-4 border-t border-white/5">
                            <p className="text-[9px] font-mono text-slate-700">Portal v1.75</p>
                        </div>
                    </nav>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">

                        {/* V1 RAW FEED */}
                        {activeView === 'raw-feed' && (
                            <>
                                <MatrixDataStream isStreaming={isExporting} />
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
                                    <div className="lg:col-span-1">
                                        <div className="bg-[#0A0713] p-5 rounded-xl shadow-lg border border-purple-900/30">
                                            <div className="flex items-center gap-2 mb-5 text-purple-400 border-b border-purple-900/50 pb-3">
                                                <Sliders className="w-4 h-4" />
                                                <h3 className="text-xs font-mono font-bold uppercase tracking-widest">Query Parameters</h3>
                                            </div>
                                            <div className="flex flex-col gap-8 py-2">
                                                <ParameterDial label="Depth Range" value={dials.depth} min={0} max={50} unit="cm" onChange={v => setDials(d => ({ ...d, depth: v }))} />
                                                <ParameterDial label="Moisture Idx" value={dials.moisture} min={0} max={100} unit="%" onChange={v => setDials(d => ({ ...d, moisture: v }))} />
                                                <ParameterDial label="Base pH" value={dials.ph} min={3} max={10} unit="lvl" onChange={v => setDials(d => ({ ...d, ph: v }))} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2">
                                            <div className="bg-[#0A0713] p-5 rounded-xl shadow-lg border border-purple-900/30 overflow-hidden relative group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full" />
                                                <h3 className="text-xs font-mono font-bold text-purple-400 mb-5 uppercase tracking-widest flex items-center gap-2">
                                                    <Microscope className="w-4 h-4" /> Soil Nutrient Trends
                                                </h3>
                                                <div className="h-72 w-full relative z-10">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <LineChart data={mockChartData}>
                                                            <CartesianGrid strokeDasharray="3 3" stroke="#2D1B4E" vertical={false} />
                                                            <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                                            <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
                                                            <Tooltip contentStyle={{ backgroundColor: '#0A0713', borderColor: '#3b0764', color: '#e9d5ff', borderRadius: '8px' }} itemStyle={{ color: '#d8b4fe' }} />
                                                            <Legend wrapperStyle={{ paddingTop: '16px' }} />
                                                            <Line type="monotone" dataKey="nutrientA" stroke="#a855f7" strokeWidth={3} dot={false} />
                                                            <Line type="monotone" dataKey="nutrientB" stroke="#3b82f6" strokeWidth={3} dot={false} />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="bg-[#0A0713] p-5 rounded-xl shadow-lg border border-purple-900/30">
                                                <div className="flex justify-between items-center mb-5 pb-3 border-b border-purple-900/50">
                                                    <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2"><Database className="w-4 h-4" /> Datasets</h3>
                                                    <button onClick={fetchDatasets} className="text-purple-500 hover:text-purple-300 transition-colors">
                                                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                                    </button>
                                                </div>
                                                <ul className="space-y-2">
                                                    {datasets.map(ds => (
                                                        <li key={ds.id} className="flex items-center justify-between p-2.5 bg-black/40 rounded-lg border border-purple-900/30 hover:border-purple-500/40 transition-all group cursor-pointer">
                                                            <div className="flex items-center gap-2">
                                                                <Database className={`w-3.5 h-3.5 ${ds.type === 'satellite' ? 'text-blue-500' : 'text-purple-500'}`} />
                                                                <div>
                                                                    <span className="text-xs font-medium text-slate-300 block">{ds.name}</span>
                                                                    <span className="text-[9px] text-slate-500 font-mono uppercase">{ds.type} · {ds.size_mb}MB</span>
                                                                </div>
                                                            </div>
                                                            <Download className="w-3.5 h-3.5 text-purple-800 group-hover:text-purple-400 transition-colors" />
                                                        </li>
                                                    ))}
                                                    {!loading && datasets.length === 0 && (
                                                        <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest text-center py-6 border border-dashed border-purple-900/30 rounded-lg">No datasets available.</p>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* V1.75 VIEWS */}
                        {activeView === 'federated' && <FederatedExperimentConsole />}
                        {activeView === 'satellite' && <SatelliteCovariateExplorer />}
                        {activeView === 'kriging' && <CSEKrigingWorksheetInspector />}
                        {activeView === 'field-trial' && <FieldTrialDesignEngine />}
                        {activeView === 'spac' && <SPACModelSandbox />}
                        {activeView === 'open-data' && <OpenDataRepository />}
                        {activeView === 'basin' && <BasinAnalytics />}
                        {activeView === 'lab-bridge' && <LabIntegrationBridge />}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
