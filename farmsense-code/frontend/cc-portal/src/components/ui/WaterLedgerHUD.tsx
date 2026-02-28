'use client';

import { useCCStore } from '@/store/useCCStore';
import { Database, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaterLedgerHUD() {
    const ledgerEntries = useCCStore((state) => state.ledgerRecent);

    return (
        <div className="glass-panel p-4 tactical-border w-80 flex flex-col pointer-events-auto bg-slate-900/90 h-[400px]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/50">
                <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-tactical-amber" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Water Ledger</h3>
                </div>
                <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest">FHE Signed</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                <AnimatePresence initial={false}>
                    {ledgerEntries.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                            <Layers className="w-8 h-8 mb-2 text-slate-600" />
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Awaiting Oracle Handshake...</p>
                        </div>
                    ) : (
                        ledgerEntries.map((entry) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-2.5 rounded border border-slate-800/50 bg-slate-950/40 hover:bg-slate-950 transition-colors group cursor-default"
                            >
                                <div className="flex justify-between items-start mb-1.5">
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-black text-slate-600 uppercase tracking-tighter">ID: {entry.id.slice(0, 8)}</span>
                                        <span className="text-[9px] font-bold text-white uppercase tracking-tight">{entry.field_id}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-tactical-blue glow-text-blue">
                                        {entry.gallons.toLocaleString()} GAL
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <div className="w-1 h-1 rounded-full bg-tactical-green" />
                                        <span className="text-[7px] text-slate-500 font-mono italic">sig_{entry.signature.slice(0, 6)}...</span>
                                    </div>
                                    <div className="text-[7px] text-slate-600 font-bold uppercase tabular-nums">
                                        {new Date(entry.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Audit Stability</span>
                    <span className="text-[10px] font-black text-white">99.9%</span>
                </div>
                <button className="flex items-center justify-center gap-2 w-full py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase tracking-widest transition-all">
                    View Detail Log <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}
