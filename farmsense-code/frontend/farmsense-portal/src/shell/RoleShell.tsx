import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ROLE_LABEL } from '../auth/types';
import type { UserRole } from '../auth/types';
import {
    Leaf, LayoutDashboard, Users, BarChart2, Search, FileText,
    Trophy, FlaskConical, BookOpen, ShieldCheck, Settings,
    ChevronDown, LogOut, Globe, Repeat, Building2, Menu, X
} from 'lucide-react';

interface NavItem {
    label: string;
    icon: React.ReactNode;
    path: string;
    roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
    // Admin
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/admin', roles: ['ADMIN'] },
    { label: 'Users', icon: <Users className="w-4 h-4" />, path: '/admin/users', roles: ['ADMIN'] },
    { label: 'Metrics', icon: <BarChart2 className="w-4 h-4" />, path: '/admin/metrics', roles: ['ADMIN'] },
    { label: 'Settings', icon: <Settings className="w-4 h-4" />, path: '/admin/settings', roles: ['ADMIN'] },

    // Grant Manager
    { label: 'Discover', icon: <Search className="w-4 h-4" />, path: '/grants', roles: ['ADMIN', 'GRANT_MANAGER'] },
    { label: 'Applications', icon: <FileText className="w-4 h-4" />, path: '/grants/apply', roles: ['ADMIN', 'GRANT_MANAGER'] },
    { label: 'Awards', icon: <Trophy className="w-4 h-4" />, path: '/grants/awards', roles: ['ADMIN', 'GRANT_MANAGER'] },

    // Grant Reviewer
    { label: 'Review Queue', icon: <BookOpen className="w-4 h-4" />, path: '/grants/review', roles: ['ADMIN', 'GRANT_REVIEWER'] },

    // Farmer
    { label: 'Field Analytics', icon: <LayoutDashboard className="w-4 h-4" />, path: '/farmer', roles: ['ADMIN', 'FARMER'] },
    { label: 'Irrigation', icon: <Globe className="w-4 h-4" />, path: '/farmer/irrigation', roles: ['ADMIN', 'FARMER'] },

    // Researcher
    { label: 'Experiments', icon: <FlaskConical className="w-4 h-4" />, path: '/research', roles: ['ADMIN', 'RESEARCHER'] },
    { label: 'Open Data', icon: <BookOpen className="w-4 h-4" />, path: '/research/data', roles: ['ADMIN', 'RESEARCHER'] },

    // Auditor
    { label: 'Compliance', icon: <ShieldCheck className="w-4 h-4" />, path: '/compliance', roles: ['ADMIN', 'AUDITOR'] },
    { label: 'GLOBALG.A.P.', icon: <ShieldCheck className="w-4 h-4" />, path: '/compliance/gap', roles: ['ADMIN', 'AUDITOR'] },

    // Regulator
    { label: 'Ledger', icon: <ShieldCheck className="w-4 h-4" />, path: '/regulatory', roles: ['ADMIN', 'REGULATOR'] },
    { label: 'Basin Analytics', icon: <BarChart2 className="w-4 h-4" />, path: '/regulatory/basin', roles: ['ADMIN', 'REGULATOR'] },
    { label: 'SLV Reporting', icon: <FileText className="w-4 h-4" />, path: '/regulatory/report', roles: ['ADMIN', 'REGULATOR'] },

    // Investor
    { label: 'Impact', icon: <BarChart2 className="w-4 h-4" />, path: '/investor', roles: ['ADMIN', 'INVESTOR'] },
    { label: 'Fleet Coverage', icon: <Globe className="w-4 h-4" />, path: '/investor/fleet', roles: ['ADMIN', 'INVESTOR'] },
];

const SECTION_LABELS: Partial<Record<UserRole, string>> = {
    ADMIN: 'Administration',
    GRANT_MANAGER: 'Grant Management',
    GRANT_REVIEWER: 'Review Queue',
    FARMER: 'Field Operations',
    RESEARCHER: 'Research Tools',
    AUDITOR: 'Compliance',
    REGULATOR: 'Regulatory Ledger',
    INVESTOR: 'Investor Dashboard',
};

export default function RoleShell({ children }: { children: React.ReactNode }) {
    const { user, activeRole, logout, switchRole } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showRolePicker, setShowRolePicker] = useState(false);

    if (!user || !activeRole) return null;

    const userRoles = Array.isArray(user.role) ? user.role : [user.role];
    const isMultiRole = userRoles.length > 1;

    const visibleNav = NAV_ITEMS.filter(item => item.roles.includes(activeRole));

    const handleLogout = () => { logout(); navigate('/login'); };

    const orgBadge = user.org_type === 'external'
        ? <span className="text-[9px] font-black text-amber-400 bg-amber-900/20 border border-amber-800/40 px-2 py-0.5 rounded-full">EXT</span>
        : <span className="text-[9px] font-black text-emerald-400 bg-emerald-900/20 border border-emerald-800/40 px-2 py-0.5 rounded-full">INT</span>;

    return (
        <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-56' : 'w-14'} flex flex-col shrink-0 border-r border-slate-800 bg-slate-950 transition-all duration-200`}>
                {/* Branding */}
                <div className="flex items-center gap-2.5 px-4 py-4 border-b border-slate-800">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500/30 to-indigo-500/30 border border-slate-700 flex items-center justify-center shrink-0">
                        <Leaf className="w-4 h-4 text-emerald-400" />
                    </div>
                    {sidebarOpen && <span className="text-sm font-black text-white">FarmSense</span>}
                    <button onClick={() => setSidebarOpen(v => !v)} className="ml-auto text-slate-600 hover:text-slate-300 transition-colors">
                        {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </button>
                </div>

                {/* Role label */}
                {sidebarOpen && (
                    <div className="px-4 py-3 border-b border-slate-800">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
                            {SECTION_LABELS[activeRole] ?? 'Portal'}
                        </p>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-indigo-300">{ROLE_LABEL[activeRole]}</span>
                            {orgBadge}
                        </div>
                    </div>
                )}

                {/* Nav items */}
                <nav className="flex-1 overflow-y-auto py-2">
                    {visibleNav.map(item => {
                        const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                        return (
                            <button key={item.path} onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-bold transition-all ${active ? 'text-white bg-indigo-600/20 border-l-2 border-indigo-500' : 'text-slate-500 hover:text-slate-200 border-l-2 border-transparent'}`}>
                                {item.icon}
                                {sidebarOpen && <span>{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                {/* User footer */}
                <div className="border-t border-slate-800 p-3 space-y-2">
                    {/* Multi-role switcher */}
                    {isMultiRole && sidebarOpen && (
                        <div className="relative">
                            <button onClick={() => setShowRolePicker(v => !v)}
                                className="w-full flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 hover:border-indigo-600/50 transition-colors">
                                <Repeat className="w-3 h-3" />
                                Switch Role
                                <ChevronDown className={`w-3 h-3 ml-auto transition-transform ${showRolePicker ? 'rotate-180' : ''}`} />
                            </button>
                            {showRolePicker && (
                                <div className="absolute bottom-full mb-1 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl py-1 shadow-2xl z-50">
                                    {userRoles.map(r => (
                                        <button key={r} onClick={() => { switchRole(r); setShowRolePicker(false); navigate('/'); }}
                                            className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors ${r === activeRole ? 'text-indigo-300' : 'text-slate-400 hover:text-white'}`}>
                                            {ROLE_LABEL[r]}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* User card */}
                    {sidebarOpen && (
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5">
                            <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                <p className="text-[10px] text-slate-500 truncate">{user.org}</p>
                                {orgBadge}
                            </div>
                            <p className="text-xs font-bold text-white truncate">{user.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                        </div>
                    )}

                    <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-red-400 px-1 py-1 transition-colors">
                        <LogOut className="w-3.5 h-3.5" />
                        {sidebarOpen && 'Sign Out'}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
