import React, { useState } from 'react';
import { Wrench, Plus, SlidersHorizontal, Star, AlertTriangle, CheckCircle2, Clock, ChevronRight, X } from 'lucide-react';

type IntegrationStatus = 'active' | 'flagged' | 'offline';
type WizardStep = 0 | 1 | 2 | 3;
type Tab = 'registry' | 'wizard' | 'calibration' | 'scoring';

interface Integration {
    id: string;
    name: string;
    type: string;
    lastSync: string;
    records: number;
    qualityScore: number;
    status: IntegrationStatus;
    drift: boolean;
}

const MOCK_INTEGRATIONS: Integration[] = [
    { id: 'INT-001', name: 'CSU Soil Spectrometer (LIBS)', type: 'Spectrometer', lastSync: '2h ago', records: 18241, qualityScore: 96, status: 'active', drift: false },
    { id: 'INT-002', name: 'LIMS — Colorado State Lab', type: 'LIMS', lastSync: '6h ago', records: 4012, qualityScore: 88, status: 'active', drift: false },
    { id: 'INT-003', name: 'NRCS Weather Grid (Station 41)', type: 'Weather Network', lastSync: '14h ago', records: 97301, qualityScore: 61, status: 'flagged', drift: true },
    { id: 'INT-004', name: 'Eddy Covariance Flux Tower — SLV-A', type: 'Flux Tower', lastSync: '3d ago', records: 2108, qualityScore: 43, status: 'offline', drift: false },
];

const INSTRUMENT_TYPES = ['Spectrometer (LIBS/XRF)', 'LIMS', 'Weather Station Network', 'Eddy Covariance Flux Tower', 'Custom IoT Sensor'];
const FORMATS = ['REST API (JSON)', 'REST API (CSV)', 'SFTP File Upload', 'MQTT Push'];
const FIELDS = [
    { id: 'FIELD-SLV-001', name: 'Field 1 — Center, CO' },
    { id: 'FIELD-SLV-002', name: 'Field 2 — Monte Vista, CO' },
];

function QScore({ score }: { score: number }) {
    const color = score >= 85 ? '#10b981' : score >= 65 ? '#fbbf24' : '#ef4444';
    return (
        <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
            </div>
            <span className="text-xs font-bold font-mono" style={{ color }}>{score}%</span>
        </div>
    );
}

function StatusBadge({ status }: { status: IntegrationStatus }) {
    const cls = status === 'active' ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-400' :
        status === 'flagged' ? 'bg-amber-950/30 border-amber-800/50 text-amber-400' :
        'bg-slate-900/40 border-slate-700 text-slate-500';
    const label = status === 'active' ? '● Active' : status === 'flagged' ? '⚠ Flagged' : '○ Offline';
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${cls}`}>{label}</span>;
}

export const LabIntegrationBridge: React.FC = () => {
    const [tab, setTab] = useState<Tab>('registry');
    const [wizardStep, setWizardStep] = useState<WizardStep>(0);
    const [wizardData, setWizardData] = useState({ type: INSTRUMENT_TYPES[0], endpoint: '', format: FORMATS[0], field: FIELDS[0].id, frequency: '15' });
    const [selectedInt, setSelectedInt] = useState<Integration>(MOCK_INTEGRATIONS[0]);
    const [calibAccepted, setCalibAccepted] = useState<Set<string>>(new Set());

    const toggleCalibAccept = (id: string) => setCalibAccepted(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
    });

    return (
        <div className="bg-[#070511] rounded-xl border border-purple-900/30 overflow-hidden flex flex-col min-h-[680px]">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-purple-900/30 bg-black/30">
                <div className="bg-rose-600/20 p-2 rounded-lg"><Wrench className="w-5 h-5 text-rose-400" /></div>
                <div className="flex-1">
                    <h2 className="font-bold text-white text-sm tracking-wide">Instrument & Lab Integration Bridge</h2>
                    <p className="text-[10px] text-rose-500 font-mono uppercase tracking-widest">Connect external instruments and laboratory data sources</p>
                </div>
                <button onClick={() => { setTab('wizard'); setWizardStep(0); }}
                    className="flex items-center gap-1.5 bg-rose-700/30 hover:bg-rose-600/40 border border-rose-800/40 text-rose-300 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                    <Plus className="w-3.5 h-3.5" /> New Integration
                </button>
            </div>

            <div className="flex border-b border-purple-900/20 bg-black/20 px-6 overflow-x-auto">
                {([['registry', 'Registry', Wrench], ['wizard', 'Setup Wizard', Plus], ['calibration', 'Calibration', SlidersHorizontal], ['scoring', 'Quality Scores', Star]] as [Tab, string, any][]).map(([id, label, Icon]) => (
                    <button key={id} onClick={() => setTab(id)}
                        className={`py-3 px-3 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${tab === id ? 'border-rose-500 text-rose-300' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                        <Icon className="w-3.5 h-3.5" />{label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">

                {/* REGISTRY */}
                {tab === 'registry' && (
                    <div className="space-y-3">
                        {MOCK_INTEGRATIONS.map(int => (
                            <div key={int.id} onClick={() => { setSelectedInt(int); setTab('calibration'); }}
                                className="bg-black/40 border border-purple-900/20 rounded-xl p-4 hover:border-rose-800/40 cursor-pointer transition-colors group">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div>
                                        <p className="text-sm font-bold text-white">{int.name}</p>
                                        <p className="text-[10px] text-slate-500 font-mono">{int.id} · {int.type}</p>
                                    </div>
                                    <StatusBadge status={int.status} />
                                </div>
                                <div className="grid grid-cols-3 gap-3 text-[10px]">
                                    <div>
                                        <p className="text-slate-600 uppercase tracking-widest">Last Sync</p>
                                        <p className="text-slate-300 font-mono mt-0.5">{int.lastSync}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-600 uppercase tracking-widest">Records</p>
                                        <p className="text-slate-300 font-mono mt-0.5">{int.records.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-600 uppercase tracking-widest mb-0.5">Quality Score</p>
                                        <QScore score={int.qualityScore} />
                                    </div>
                                </div>
                                {int.drift && (
                                    <div className="flex items-center gap-1.5 mt-3 text-[10px] text-amber-400 bg-amber-950/20 border border-amber-800/30 rounded-lg px-3 py-2">
                                        <AlertTriangle className="w-3 h-3 shrink-0" /> Calibration drift detected — recalibration recommended
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* WIZARD */}
                {tab === 'wizard' && (
                    <div className="space-y-6">
                        {/* Step Progress */}
                        <div className="flex items-center gap-2">
                            {(['Instrument Type', 'API Config', 'Field Mapping', 'Confirm'].map((label, i) => (
                                <React.Fragment key={label}>
                                    <div className={`flex items-center gap-1.5 text-[10px] font-bold ${i === wizardStep ? 'text-rose-300' : i < wizardStep ? 'text-emerald-400' : 'text-slate-600'}`}>
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black border ${i === wizardStep ? 'border-rose-500 bg-rose-900/30 text-rose-300' : i < wizardStep ? 'border-emerald-700 bg-emerald-900/30 text-emerald-400' : 'border-slate-700 text-slate-600'}`}>
                                            {i < wizardStep ? '✓' : i + 1}
                                        </div>
                                        <span className="hidden sm:block">{label}</span>
                                    </div>
                                    {i < 3 && <div className="flex-1 h-px bg-slate-800" />}
                                </React.Fragment>
                            )))}
                        </div>

                        {wizardStep === 0 && (
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Select Instrument Type</p>
                                <div className="space-y-2">
                                    {INSTRUMENT_TYPES.map(t => (
                                        <button key={t} onClick={() => setWizardData(d => ({ ...d, type: t }))}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-sm text-left transition-all ${wizardData.type === t ? 'bg-rose-900/20 border-rose-700/50 text-rose-200' : 'bg-black/30 border-purple-900/30 text-slate-400 hover:border-rose-800/40'}`}>
                                            <div className={`w-2 h-2 rounded-full shrink-0 ${wizardData.type === t ? 'bg-rose-400' : 'bg-slate-700'}`} />
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setWizardStep(1)}
                                    className="flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors">
                                    Next <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {wizardStep === 1 && (
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">API / Connection Config</p>
                                <div>
                                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Endpoint URL</label>
                                    <input value={wizardData.endpoint} onChange={e => setWizardData(d => ({ ...d, endpoint: e.target.value }))}
                                        placeholder="https://lab-system.csu.edu/api/data"
                                        className="w-full mt-1 bg-black/40 border border-rose-900/40 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-rose-500/60" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Data Format</label>
                                    <select value={wizardData.format} onChange={e => setWizardData(d => ({ ...d, format: e.target.value }))}
                                        className="w-full mt-1 bg-black/40 border border-rose-900/40 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none">
                                        {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Contribution Frequency (min)</label>
                                    <input type="number" value={wizardData.frequency} onChange={e => setWizardData(d => ({ ...d, frequency: e.target.value }))} min={5}
                                        className="w-full mt-1 bg-black/40 border border-rose-900/40 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none" />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setWizardStep(0)} className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm font-bold hover:bg-slate-800 transition-colors">Back</button>
                                    <button onClick={() => setWizardStep(2)} className="flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors">Next <ChevronRight className="w-4 h-4" /></button>
                                </div>
                            </div>
                        )}

                        {wizardStep === 2 && (
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Field & Schema Mapping</p>
                                <div>
                                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Geographic Assignment (Ground Truth For)</label>
                                    <select value={wizardData.field} onChange={e => setWizardData(d => ({ ...d, field: e.target.value }))}
                                        className="w-full mt-1 bg-black/40 border border-rose-900/40 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none">
                                        {FIELDS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                    </select>
                                </div>
                                <div className="bg-black/40 border border-purple-900/30 rounded-xl p-4">
                                    <p className="text-[10px] text-slate-500 mb-3">Map instrument fields → FarmSense schema</p>
                                    {[['moisture_pct', 'SWC (%)'], ['conductivity', 'EC (dS/m)'], ['soil_tension', 'SMP (bars)']].map(([src, dest]) => (
                                        <div key={src} className="flex items-center gap-2 text-xs py-2 border-b border-purple-900/10 last:border-0">
                                            <span className="font-mono text-slate-400 w-32">{src}</span>
                                            <ChevronRight className="w-3 h-3 text-slate-600" />
                                            <span className="font-bold text-rose-400">{dest}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setWizardStep(1)} className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm font-bold hover:bg-slate-800 transition-colors">Back</button>
                                    <button onClick={() => setWizardStep(3)} className="flex items-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors">Next <ChevronRight className="w-4 h-4" /></button>
                                </div>
                            </div>
                        )}

                        {wizardStep === 3 && (
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Confirm & Activate</p>
                                <div className="bg-black/40 border border-rose-900/30 rounded-xl p-4 space-y-2 text-xs">
                                    {[['Type', wizardData.type], ['Format', wizardData.format], ['Frequency', `Every ${wizardData.frequency} min`], ['Field', FIELDS.find(f => f.id === wizardData.field)?.name ?? '—']].map(([k, v]) => (
                                        <div key={k} className="flex justify-between">
                                            <span className="text-slate-500">{k}</span>
                                            <span className="text-white font-medium">{v}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setWizardStep(2)} className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm font-bold hover:bg-slate-800 transition-colors">Back</button>
                                    <button onClick={() => { setTab('registry'); setWizardStep(0); }}
                                        className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors">
                                        <CheckCircle2 className="w-4 h-4" /> Activate Integration
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* CALIBRATION */}
                {tab === 'calibration' && (
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 mb-2">
                            <select value={selectedInt.id} onChange={e => setSelectedInt(MOCK_INTEGRATIONS.find(i => i.id === e.target.value) ?? MOCK_INTEGRATIONS[0])}
                                className="bg-black/40 border border-purple-900/40 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none">
                                {MOCK_INTEGRATIONS.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[{ label: 'Offset Applied', value: '+0.8%', color: 'text-amber-400' }, { label: 'MAE vs Primary', value: '1.24 dS/m', color: 'text-white' }, { label: 'Drift', value: selectedInt.drift ? 'Detected' : 'None', color: selectedInt.drift ? 'text-red-400' : 'text-emerald-400' }].map(m => (
                                <div key={m.label} className="bg-black/40 border border-purple-900/30 rounded-xl p-4 text-center">
                                    <p className={`text-2xl font-black font-mono ${m.color}`}>{m.value}</p>
                                    <p className="text-[9px] text-slate-600 uppercase tracking-widest mt-1">{m.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-black/40 border border-purple-900/30 rounded-xl p-5">
                            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-4">Auto-Calibration Proposals</p>
                            <div className="space-y-3">
                                {[
                                    { id: 'cal-1', var: 'EC (dS/m)', current: '1.14', corrected: '1.06', confidence: 'High' },
                                    { id: 'cal-2', var: 'SWC (%)', current: '28.4', corrected: '27.1', confidence: 'Medium' },
                                ].map(c => (
                                    <div key={c.id} className="flex items-center gap-4 px-3 py-3 bg-black/30 rounded-lg border border-purple-900/20">
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-white">{c.var}</p>
                                            <p className="text-[10px] text-slate-500">Raw: <span className="font-mono text-slate-300">{c.current}</span> → Corrected: <span className="font-mono text-emerald-400">{c.corrected}</span> <span className="text-purple-500">({c.confidence} confidence)</span></p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => toggleCalibAccept(c.id)}
                                                className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${calibAccepted.has(c.id) ? 'bg-emerald-600/20 border-emerald-600/50 text-emerald-300' : 'border-slate-700 text-slate-400 hover:border-emerald-700/50'}`}>
                                                {calibAccepted.has(c.id) ? '✓ Accepted' : 'Accept'}
                                            </button>
                                            <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-700 text-slate-500 hover:border-red-700/40 hover:text-red-400 transition-all">Reject</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* SCORING */}
                {tab === 'scoring' && (
                    <div className="space-y-4">
                        <p className="text-[10px] text-slate-500 mb-4">Instruments below 65% quality threshold are excluded from model training until recalibrated.</p>
                        {MOCK_INTEGRATIONS.map(int => (
                            <div key={int.id} className={`bg-black/40 border rounded-xl p-4 ${int.qualityScore < 65 ? 'border-red-900/40' : int.qualityScore < 85 ? 'border-amber-900/30' : 'border-emerald-900/30'}`}>
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="text-sm font-bold text-white">{int.name}</p>
                                        <p className="text-[10px] text-slate-500">{int.type}</p>
                                    </div>
                                    {int.qualityScore < 65 && (
                                        <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-950/30 border border-red-900/40 text-red-400">Excluded from training</span>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { dim: 'Timeliness', score: int.status === 'offline' ? 12 : int.qualityScore - 5 },
                                        { dim: 'Sensor Agreement (MAE)', score: int.qualityScore + 2 },
                                        { dim: 'Drift Detection', score: int.drift ? 48 : int.qualityScore - 1 },
                                    ].map(d => (
                                        <div key={d.dim}>
                                            <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                                                <span>{d.dim}</span>
                                                <span className="font-mono">{Math.min(100, Math.max(0, d.score))}%</span>
                                            </div>
                                            <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full transition-all"
                                                    style={{ width: `${Math.min(100, Math.max(0, d.score))}%`, backgroundColor: d.score < 65 ? '#ef4444' : d.score < 85 ? '#fbbf24' : '#10b981' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 pt-3 border-t border-purple-900/20 flex items-center justify-between">
                                    <span className="text-[10px] text-slate-500">Composite quality</span>
                                    <QScore score={int.qualityScore} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LabIntegrationBridge;
