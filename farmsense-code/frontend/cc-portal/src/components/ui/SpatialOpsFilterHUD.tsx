'use client';

import { useCCStore } from '@/store/useCCStore';
import { AssetFilterType, CCStoreState } from '@/types/cc';
import { Filter, User, Cpu, Tractor, Wifi, LayoutGrid, LucideIcon } from 'lucide-react';

const filterOptions: { label: string, value: AssetFilterType, icon: LucideIcon }[] = [
    { label: 'All Assets', value: 'ALL', icon: LayoutGrid },
    { label: 'Human Techs', value: 'HUMAN', icon: User },
    { label: 'Robotic', value: 'ROBOTIC', icon: Cpu },
    { label: 'Tractors', value: 'TRACTOR', icon: Tractor },
    { label: 'Data Grid', value: 'DATA_GRID', icon: Wifi },
];

export default function SpatialOpsFilterHUD() {
    const assetFilter = useCCStore((state: CCStoreState) => state.assetFilter);
    const setAssetFilter = useCCStore((state: CCStoreState) => state.setAssetFilter);

    return (
        <div className="glass-panel p-3 tactical-border w-fit pointer-events-auto bg-slate-900/90 mb-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800/50">
                <Filter className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Spatial Overlay Filters</span>
            </div>
            <div className="flex gap-2">
                {filterOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isActive = assetFilter === opt.value;
                    return (
                        <button
                            key={opt.value}
                            onClick={() => setAssetFilter(opt.value)}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all ${isActive
                                ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                                : 'bg-slate-800/40 border border-slate-700/50 text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            <Icon className="w-3 h-3" />
                            <span className="text-[8px] font-black uppercase tracking-wider">{opt.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
