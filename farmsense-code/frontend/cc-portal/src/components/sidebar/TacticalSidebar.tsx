'use client';

import {
    LayoutDashboard,
    Map as MapIcon,
    Users,
    Activity,
    Database,
    Settings,
    LogOut,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
    { id: 'regional', label: 'Regional View', icon: LayoutDashboard, category: 'CORE' },
    { id: 'fleet', label: 'Fleet Ops', icon: Activity, category: 'OPERATIONS' },
    { id: 'deployment', label: 'Blitz Tracker', icon: MapIcon, category: 'OPERATIONS' },
    { id: 'ledger', label: 'Water Ledger', icon: Database, category: 'AUDIT' },
    { id: 'workforce', label: 'Workforce', icon: Users, category: 'AUDIT' },
];

export default function TacticalSidebar() {
    const [active, setActive] = useState('regional');

    return (
        <aside className="w-64 h-full glass-panel !rounded-none border-r border-slate-800/80 flex flex-col z-10 transition-all duration-300">
            <div className="p-6 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-tactical-blue/20 flex items-center justify-center border border-tactical-blue/40 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                        <span className="text-tactical-blue font-black text-xl">FS</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-white tracking-widest uppercase italic">Command & Control</h1>
                        <p className="text-[9px] font-bold text-slate-500 tracking-[0.2em]">SUBDISTRICT 1 <span className="text-tactical-blue opacity-50">•</span> ORACLE</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-8 overflow-y-auto overflow-x-hidden scrollbar-hide">
                {['CORE', 'OPERATIONS', 'AUDIT'].map((category) => (
                    <div key={category} className="space-y-1">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] px-3 mb-2">{category}</p>
                        {NAV_ITEMS.filter(item => item.category === category).map((item) => {
                            const Icon = item.icon;
                            const isActive = active === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActive(item.id)}
                                    className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-tactical-blue/10 text-tactical-blue border border-tactical-blue/20'
                                            : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                        <span className="text-xs font-bold tracking-tight">{item.label}</span>
                                    </div>
                                    {isActive && <div className="w-1 h-1 rounded-full bg-tactical-blue shadow-[0_0_8px_rgba(59,130,246,1)]" />}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800/50 bg-slate-950/20">
                <div className="flex items-center gap-3 p-3 glass-panel border-0 bg-slate-900/40 mb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                        <Users className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-white truncate uppercase tracking-tighter">B. Thre3</p>
                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Sovereign Admin</p>
                    </div>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                </div>

                <button className="flex items-center gap-3 w-full px-4 py-2 text-[10px] font-bold text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors">
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="uppercase tracking-[0.2em]">Terminate Session</span>
                </button>
            </div>
        </aside>
    );
}
