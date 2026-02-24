
import { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import Login from './components/Login';
import { GrantDiscovery } from './components/grants/GrantDiscovery';
import { ApplicationManager } from './components/grants/ApplicationManager';
import { AwardTracker } from './components/grants/AwardTracker';
import {
    LayoutDashboard, Settings, LogOut,
    Search, Kanban, Trophy
} from 'lucide-react';
import { getApiKey, removeApiKey, api } from './services/api';

type View = 'dashboard' | 'discovery' | 'pipeline' | 'awards' | 'settings';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [metrics, setMetrics] = useState<any>(null);
    const [view, setView] = useState<View>('dashboard');

    useEffect(() => {
        const auth = !!getApiKey();
        setIsAuthenticated(auth);
        if (auth) fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const data = await api.getMetrics();
            setMetrics(data);
        } catch {
            // graceful degradation when backend offline
        }
    };

    const handleLogout = () => { removeApiKey(); setIsAuthenticated(false); };

    if (!isAuthenticated) {
        return <Login onLogin={() => { setIsAuthenticated(true); fetchMetrics(); }} />;
    }

    const NAV = [
        { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard, group: 'core' },
        { id: 'discovery' as View, label: 'Grant Discovery', icon: Search, group: 'grants' },
        { id: 'pipeline' as View, label: 'Applications', icon: Kanban, group: 'grants' },
        { id: 'awards' as View, label: 'Award Tracker', icon: Trophy, group: 'grants' },
        { id: 'settings' as View, label: 'Settings', icon: Settings, group: 'core' },
    ];

    const viewTitle: Record<View, string> = {
        dashboard: 'System Overview',
        discovery: 'Grant Discovery',
        pipeline: 'Application Pipeline',
        awards: 'Award Tracker',
        settings: 'Settings',
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex font-sans">
            {/* Sidebar */}
            <aside className="w-60 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col">
                <div className="p-5 border-b border-slate-800">
                    <h1 className="text-lg font-black text-white tracking-tight">FarmSense<span className="text-indigo-400">.</span></h1>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Admin Dashboard</p>
                </div>

                <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] px-3 pt-3 pb-2">Core</p>
                    {NAV.filter(n => n.group === 'core').map(item => {
                        const Icon = item.icon;
                        return (
                            <button key={item.id} onClick={() => setView(item.id)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${view === item.id ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-800/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
                                <Icon className="w-3.5 h-3.5 shrink-0" />{item.label}
                            </button>
                        );
                    })}

                    <p className="text-[9px] font-black text-emerald-700 uppercase tracking-[0.2em] px-3 pt-4 pb-2">Grant Management</p>
                    {NAV.filter(n => n.group === 'grants').map(item => {
                        const Icon = item.icon;
                        return (
                            <button key={item.id} onClick={() => setView(item.id)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${view === item.id ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-800/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
                                <Icon className="w-3.5 h-3.5 shrink-0" />{item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-slate-800">
                    <button onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-sm font-bold text-white">{viewTitle[view]}</h2>
                    <div className="text-[10px] text-slate-600 font-mono">Role: ADMIN</div>
                </header>

                <div className="p-6 max-w-7xl mx-auto">
                    {/* DASHBOARD */}
                    {view === 'dashboard' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Users</h3>
                                    <p className="text-3xl font-black text-white mt-2">{metrics ? metrics.active_users.toLocaleString() : '---'}</p>
                                    <span className="text-emerald-500 text-xs font-bold">{metrics ? `+${metrics.user_growth_pct}%` : '---'} from last month</span>
                                </div>
                                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">System Health</h3>
                                    <p className="text-3xl font-black text-emerald-400 mt-2">{metrics ? `${metrics.system_health_pct}%` : '---%'}</p>
                                    <span className="text-slate-500 text-xs">Uptime valid</span>
                                </div>
                                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pending Audits</h3>
                                    <p className="text-3xl font-black text-amber-400 mt-2">{metrics ? metrics.pending_audits : '--'}</p>
                                    <span className="text-amber-500 text-xs font-bold">Action required</span>
                                </div>
                            </div>
                            <UserList />
                        </>
                    )}

                    {/* GRANT VIEWS */}
                    {view === 'discovery' && <GrantDiscovery />}
                    {view === 'pipeline' && <ApplicationManager />}
                    {view === 'awards' && <AwardTracker />}

                    {/* SETTINGS */}
                    {view === 'settings' && (
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <p className="text-sm text-slate-400">Settings panel — coming soon.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
