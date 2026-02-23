
import React, { useState, useEffect } from 'react';
import { Microscope, Database, Download, LogOut, RefreshCw, Settings, Sliders } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Login from './components/Login';
import { ParameterDial } from './components/ParameterDial';
import { MatrixDataStream } from './components/MatrixDataStream';
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

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [datasets, setDatasets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [dials, setDials] = useState({ depth: 15, moisture: 45, ph: 6 });

    useEffect(() => {
        const auth = !!getApiKey();
        setIsAuthenticated(auth);
        if (auth) {
            fetchDatasets();
        }
    }, []);

    const fetchDatasets = async () => {
        setLoading(true);
        try {
            const data = await api.getDatasets();
            setDatasets(data);
        } catch (error) {
            console.error('Failed to fetch datasets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        removeApiKey();
        setIsAuthenticated(false);
    };

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => setIsExporting(false), 3000);
    };

    if (!isAuthenticated) {
        return <Login onLogin={() => {
            setIsAuthenticated(true);
            fetchDatasets();
        }} />;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            <header className="bg-slate-950/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
                                <Microscope className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tighter text-white">FarmSense<span className="text-emerald-400">.</span></h1>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">Research Portal</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-widest transition-colors shadow-sm">
                                    <Database className="w-4 h-4" /> Lab Connect
                                </button>
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:from-emerald-500 hover:to-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    <Download className="w-4 h-4 relative z-10" /> <span className="relative z-10">Export All</span>
                                </button>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative">
                <MatrixDataStream isStreaming={isExporting} />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column: Dials & Parameters */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#0A0713] p-6 rounded-xl shadow-lg border border-purple-900/30">
                            <div className="flex items-center gap-2 mb-6 text-purple-400 border-b border-purple-900/50 pb-4">
                                <Sliders className="w-5 h-5" />
                                <h3 className="text-sm font-mono font-bold uppercase tracking-widest">Query Parameters</h3>
                            </div>

                            <div className="flex flex-col gap-10 py-4">
                                <ParameterDial
                                    label="Depth Range"
                                    value={dials.depth}
                                    min={0} max={50} unit="cm"
                                    onChange={(v) => setDials(d => ({ ...d, depth: v }))}
                                />
                                <ParameterDial
                                    label="Moisture Idx"
                                    value={dials.moisture}
                                    min={0} max={100} unit="%"
                                    onChange={(v) => setDials(d => ({ ...d, moisture: v }))}
                                />
                                <ParameterDial
                                    label="Base pH"
                                    value={dials.ph}
                                    min={3} max={10} unit="lvl"
                                    onChange={(v) => setDials(d => ({ ...d, ph: v }))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-[#0A0713] p-6 rounded-xl shadow-lg border border-purple-900/30 overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full group-hover:bg-purple-500/10 transition-colors"></div>
                                <h3 className="text-sm font-mono font-bold text-purple-400 mb-6 uppercase tracking-widest flex items-center gap-2"><Microscope className="w-4 h-4" /> Soil Nutrient Trends</h3>
                                <div className="h-80 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={mockChartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#2D1B4E" vertical={false} />
                                            <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                            <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0A0713', borderColor: '#3b0764', color: '#e9d5ff', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                                                itemStyle={{ color: '#d8b4fe' }}
                                            />
                                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                            <Line type="monotone" dataKey="nutrientA" stroke="#a855f7" strokeWidth={3} activeDot={{ r: 8, fill: '#a855f7', stroke: '#fff', strokeWidth: 2 }} dot={{ fill: '#0A0713', stroke: '#a855f7', strokeWidth: 2 }} />
                                            <Line type="monotone" dataKey="nutrientB" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} dot={{ fill: '#0A0713', stroke: '#3b82f6', strokeWidth: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-[#0A0713] p-6 rounded-xl shadow-lg border border-purple-900/30">
                                <div className="flex justify-between items-center mb-6 pb-4 border-b border-purple-900/50">
                                    <h3 className="text-sm font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2"><Database className="w-4 h-4" /> Latest Datasets</h3>
                                    <button onClick={fetchDatasets} className="text-purple-500 hover:text-purple-300 transition-colors">
                                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                    </button>
                                </div>
                                <ul className="space-y-3">
                                    {datasets.map(ds => (
                                        <li key={ds.id} className="flex items-center justify-between p-3 bg-black/40 rounded-lg hover:bg-purple-900/20 cursor-pointer border border-purple-900/30 hover:border-purple-500/50 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <Database className={`w-4 h-4 ${ds.type === 'satellite' ? 'text-blue-500' : 'text-purple-500'}`} />
                                                <div>
                                                    <span className="text-sm font-medium text-slate-300 block group-hover:text-purple-200 transition-colors">{ds.name}</span>
                                                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{ds.type} • {ds.size_mb}MB</span>
                                                </div>
                                            </div>
                                            <Download className="w-4 h-4 text-purple-900 group-hover:text-purple-400 transition-colors" />
                                        </li>
                                    ))}
                                    {!loading && datasets.length === 0 && (
                                        <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest text-center py-8 border border-dashed border-purple-900/30 rounded-lg">No datasets available.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
