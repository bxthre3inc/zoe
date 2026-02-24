import React, { useState } from 'react';
import { Plus, FileText, Calendar, ChevronRight, X, Paperclip, DollarSign } from 'lucide-react';

type Stage = 'Identified' | 'Drafting' | 'Submitted' | 'Under Review' | 'Awarded' | 'Rejected';

interface Application {
    id: string;
    grant: string;
    agency: string;
    ask: number;
    deadline: string;
    stage: Stage;
    owner: string;
    completionPct: number;
    notes: string;
    docs: string[];
    contacts: { name: string; role: string; email: string }[];
}

const STAGES: Stage[] = ['Identified', 'Drafting', 'Submitted', 'Under Review', 'Awarded', 'Rejected'];

const STAGE_COLORS: Record<Stage, string> = {
    'Identified': 'border-slate-700 bg-slate-800/50',
    'Drafting': 'border-blue-800/50 bg-blue-900/10',
    'Submitted': 'border-purple-800/50 bg-purple-900/10',
    'Under Review': 'border-amber-800/40 bg-amber-900/10',
    'Awarded': 'border-emerald-800/40 bg-emerald-900/10',
    'Rejected': 'border-red-900/40 bg-red-900/10',
};

const STAGE_HEADER: Record<Stage, string> = {
    'Identified': 'text-slate-400',
    'Drafting': 'text-blue-400',
    'Submitted': 'text-purple-400',
    'Under Review': 'text-amber-400',
    'Awarded': 'text-emerald-400',
    'Rejected': 'text-red-400',
};

function daysUntil(d: string) { return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000); }
function fmtAsk(n: number) { return n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`; }

const SEED_APPS: Application[] = [
    { id: 'APP-001', grant: 'DoD ESTCP — Water Resilience', agency: 'DoD ESTCP', ask: 2400000, deadline: '2026-03-26', stage: 'Drafting', owner: 'Admin', completionPct: 62, notes: 'Pre-proposal drafted. Need Fort Carson POC for site access section.', docs: ['ESTCP_PreProposal_Draft.md', 'Budget_Narrative_v1.xlsx'], contacts: [{ name: 'Col. R. Martinez', role: 'ESTCP Program Manager', email: 'r.martinez@estcp.osd.mil' }] },
    { id: 'APP-002', grant: 'LOR Foundation — Initial Introduction', agency: 'LOR Foundation', ask: 0, deadline: '2026-02-26', stage: 'Under Review', owner: 'Admin', completionPct: 80, notes: 'First call Thursday Feb 26. Call brief prepared.', docs: ['LOR_Foundation_Call_Brief.md'], contacts: [{ name: 'Program Officer (TBD)', role: 'Water Program', email: '' }] },
    { id: 'APP-003', grant: 'USDA NRCS EQIP — Water Conservation', agency: 'USDA NRCS', ask: 300000, deadline: '2026-04-15', stage: 'Identified', owner: 'Admin', completionPct: 10, notes: 'Need to identify local NRCS office contact.', docs: [], contacts: [] },
];

function UrgencyDot({ deadline }: { deadline: string }) {
    const d = daysUntil(deadline);
    const color = d <= 14 ? 'bg-red-500' : d <= 30 ? 'bg-amber-400' : d <= 60 ? 'bg-blue-400' : 'bg-slate-600';
    return <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${color}`} title={`${d} days`} />;
}

export const ApplicationManager: React.FC = () => {
    const [apps, setApps] = useState<Application[]>(SEED_APPS);
    const [selected, setSelected] = useState<Application | null>(null);
    const [showNew, setShowNew] = useState(false);
    const [newForm, setNewForm] = useState({ grant: '', agency: '', ask: '', deadline: '', owner: 'Admin' });

    const moveApp = (id: string, direction: 1 | -1) => {
        setApps(prev => prev.map(a => {
            if (a.id !== id) return a;
            const idx = STAGES.indexOf(a.stage);
            const next = STAGES[Math.max(0, Math.min(STAGES.length - 1, idx + direction))];
            return { ...a, stage: next };
        }));
    };

    const handleCreate = () => {
        const app: Application = {
            id: `APP-${String(apps.length + 1).padStart(3, '0')}`,
            grant: newForm.grant,
            agency: newForm.agency,
            ask: Number(newForm.ask.replace(/[^0-9]/g, '')),
            deadline: newForm.deadline,
            stage: 'Identified',
            owner: newForm.owner,
            completionPct: 0,
            notes: '',
            docs: [],
            contacts: [],
        };
        setApps(prev => [...prev, app]);
        setShowNew(false);
        setNewForm({ grant: '', agency: '', ask: '', deadline: '', owner: 'Admin' });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">{apps.length} applications tracked</p>
                <button onClick={() => setShowNew(true)}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add Application
                </button>
            </div>

            {/* New Application Modal */}
            {showNew && (
                <div className="bg-slate-900 border border-indigo-800/40 rounded-xl p-5 space-y-3">
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">New Application</p>
                    <div className="grid grid-cols-2 gap-3">
                        <input placeholder="Grant title" value={newForm.grant} onChange={e => setNewForm(f => ({ ...f, grant: e.target.value }))}
                            className="col-span-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none" />
                        <input placeholder="Agency" value={newForm.agency} onChange={e => setNewForm(f => ({ ...f, agency: e.target.value }))}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none" />
                        <input placeholder="Ask amount (e.g. $2.4M)" value={newForm.ask} onChange={e => setNewForm(f => ({ ...f, ask: e.target.value }))}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none" />
                        <input type="date" value={newForm.deadline} onChange={e => setNewForm(f => ({ ...f, deadline: e.target.value }))}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none" />
                        <input placeholder="Owner" value={newForm.owner} onChange={e => setNewForm(f => ({ ...f, owner: e.target.value }))}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none" />
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">Create</button>
                        <button onClick={() => setShowNew(false)} className="text-slate-400 border border-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">Cancel</button>
                    </div>
                </div>
            )}

            {/* Kanban Columns */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                {STAGES.filter(s => s !== 'Rejected').map(stage => {
                    const stageApps = apps.filter(a => a.stage === stage);
                    return (
                        <div key={stage} className={`rounded-xl border p-3 min-h-[120px] ${STAGE_COLORS[stage]}`}>
                            <div className="flex items-center justify-between mb-3">
                                <p className={`text-[10px] font-black uppercase tracking-widest ${STAGE_HEADER[stage]}`}>{stage}</p>
                                <span className="text-[9px] font-bold text-slate-600 bg-slate-800 rounded-full px-1.5 py-0.5">{stageApps.length}</span>
                            </div>
                            <div className="space-y-2">
                                {stageApps.map(app => (
                                    <div key={app.id} onClick={() => setSelected(app)}
                                        className="bg-slate-950/60 border border-slate-700/40 rounded-lg p-3 cursor-pointer hover:border-slate-600/60 transition-all group">
                                        <div className="flex items-start gap-1.5 mb-1.5">
                                            <UrgencyDot deadline={app.deadline} />
                                            <p className="text-xs font-bold text-slate-200 leading-tight flex-1">{app.grant}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-slate-500">
                                            {app.ask > 0 && <span><DollarSign className="w-2.5 h-2.5 inline" />{fmtAsk(app.ask)}</span>}
                                            <span><Calendar className="w-2.5 h-2.5 inline" />{daysUntil(app.deadline)}d</span>
                                            <span><Paperclip className="w-2.5 h-2.5 inline" />{app.docs.length}</span>
                                        </div>
                                        <div className="mt-2 w-full bg-slate-800 rounded-full h-0.5">
                                            <div className="h-0.5 rounded-full bg-indigo-500 transition-all" style={{ width: `${app.completionPct}%` }} />
                                        </div>
                                        <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={e => { e.stopPropagation(); moveApp(app.id, -1); }} className="text-[8px] font-bold text-slate-500 hover:text-white border border-slate-700 px-1.5 py-0.5 rounded transition-colors">← Back</button>
                                            <button onClick={e => { e.stopPropagation(); moveApp(app.id, 1); }} className="text-[8px] font-bold text-slate-500 hover:text-white border border-slate-700 px-1.5 py-0.5 rounded transition-colors">Advance →</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Rejected row */}
            {apps.filter(a => a.stage === 'Rejected').length > 0 && (
                <div className={`rounded-xl border p-3 ${STAGE_COLORS['Rejected']}`}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">Rejected</p>
                    <div className="flex flex-wrap gap-2">
                        {apps.filter(a => a.stage === 'Rejected').map(app => (
                            <div key={app.id} className="bg-slate-950/60 border border-slate-700/40 rounded-lg px-3 py-2 text-xs text-slate-500">{app.grant}</div>
                        ))}
                    </div>
                </div>
            )}

            {/* Detail Drawer */}
            {selected && (
                <div className="fixed inset-y-0 right-0 w-full max-w-md bg-slate-950 border-l border-slate-800 z-50 overflow-y-auto shadow-2xl">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                        <p className="font-bold text-white text-sm">{selected.grant}</p>
                        <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="p-5 space-y-5">
                        <div className="grid grid-cols-2 gap-3">
                            {[['Agency', selected.agency], ['Stage', selected.stage], ['Ask', selected.ask > 0 ? fmtAsk(selected.ask) : 'TBD'], ['Deadline', `${daysUntil(selected.deadline)}d left`]].map(([k, v]) => (
                                <div key={k} className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">{k}</p>
                                    <p className="text-sm font-bold text-white mt-0.5">{v}</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Completion</p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-slate-800 rounded-full h-1.5">
                                    <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${selected.completionPct}%` }} />
                                </div>
                                <span className="text-xs font-mono text-white">{selected.completionPct}%</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Notes</p>
                            <p className="text-sm text-slate-400">{selected.notes || '—'}</p>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Documents ({selected.docs.length})</p>
                            {selected.docs.length === 0 ? <p className="text-xs text-slate-600">No documents attached.</p> : (
                                <ul className="space-y-1">
                                    {selected.docs.map(d => (
                                        <li key={d} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
                                            <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />{d}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Contacts</p>
                            {selected.contacts.length === 0 ? <p className="text-xs text-slate-600">No contacts logged.</p> : (
                                selected.contacts.map(c => (
                                    <div key={c.name} className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs">
                                        <p className="font-bold text-white">{c.name}</p>
                                        <p className="text-slate-500">{c.role}</p>
                                        {c.email && <p className="text-indigo-400 font-mono mt-0.5">{c.email}</p>}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex gap-2 flex-wrap pt-2">
                            <button onClick={() => moveApp(selected.id, 1)}
                                className="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors">
                                Advance Stage <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => { setApps(prev => prev.map(a => a.id === selected.id ? { ...a, stage: 'Rejected' } : a)); setSelected(null); }}
                                className="text-xs font-bold text-red-400 border border-red-900/40 px-3 py-2 rounded-lg hover:bg-red-950/20 transition-colors">
                                Mark Rejected
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationManager;
