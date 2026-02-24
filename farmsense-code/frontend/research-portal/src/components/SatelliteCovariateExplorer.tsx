import React, { useState, useRef } from 'react';
import { Satellite, Layers, Calendar, Crosshair, Grid, Cloud } from 'lucide-react';

type Layer = {
    id: string;
    label: string;
    source: string;
    color: string;
    unit: string;
    value: number;
};

const ALL_LAYERS: Layer[] = [
    { id: 's1_vv', label: 'S1 VV Backscatter', source: 'Sentinel-1', color: '#60a5fa', unit: 'dB', value: -12.4 },
    { id: 's1_vh', label: 'S1 VH Backscatter', source: 'Sentinel-1', color: '#93c5fd', unit: 'dB', value: -19.7 },
    { id: 's2_ndvi', label: 'S2 NDVI', source: 'Sentinel-2', color: '#4ade80', unit: 'index', value: 0.72 },
    { id: 's2_ndwi', label: 'S2 NDWI', source: 'Sentinel-2', color: '#38bdf8', unit: 'index', value: 0.18 },
    { id: 's2_false', label: 'S2 False-Color', source: 'Sentinel-2', color: '#f97316', unit: 'RGB', value: 0 },
    { id: 'l8_lst', label: 'L8 LST Surface Temp', source: 'Landsat-8', color: '#fb923c', unit: '°C', value: 34.1 },
    { id: 'dem_elev', label: 'DEM Elevation', source: 'DEM', color: '#a78bfa', unit: 'm', value: 2340 },
    { id: 'dem_slope', label: 'DEM Slope', source: 'DEM', color: '#c4b5fd', unit: '°', value: 2.1 },
    { id: 'dem_twi', label: 'DEM TWI', source: 'DEM', color: '#e879f9', unit: 'idx', value: 7.4 },
];

const GROUND_SENSORS = ['SMP (Bars)', 'SWC (%)', 'EC (dS/m)'];

// Simple mock correlation matrix values
const corrMatrix = [
    [1.00, 0.87, 0.63, 0.41, 0.29],
    [0.87, 1.00, 0.71, 0.55, 0.38],
    [0.63, 0.71, 1.00, 0.68, 0.44],
    [0.41, 0.55, 0.68, 1.00, 0.59],
    [0.29, 0.38, 0.44, 0.59, 1.00],
];

const corrLabels = ['NDVI', 'NDWI', 'LST', 'SMP', 'SWC'];

function corrColor(val: number): string {
    const abs = Math.abs(val);
    if (abs > 0.8) return 'bg-purple-600 text-white';
    if (abs > 0.6) return 'bg-purple-800/70 text-purple-100';
    if (abs > 0.4) return 'bg-purple-900/50 text-purple-300';
    return 'bg-black/40 text-slate-500';
}

function mockNdviTimeSeries() {
    return Array.from({ length: 12 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        ndvi: parseFloat((0.3 + Math.sin(i / 12 * Math.PI * 2) * 0.3 + Math.random() * 0.05).toFixed(3)),
        ssm: parseFloat((0.2 + Math.cos(i / 12 * Math.PI * 2) * 0.1 + Math.random() * 0.03).toFixed(3)),
    }));
}

type Tab = 'layers' | 'pixel' | 'correlation' | 'cloud';

export const SatelliteCovariateExplorer: React.FC = () => {
    const [tab, setTab] = useState<Tab>('layers');
    const [enabledLayers, setEnabledLayers] = useState<Set<string>>(new Set(['s2_ndvi', 'l8_lst']));
    const [dateA, setDateA] = useState('2025-06-15');
    const [dateB, setDateB] = useState('2025-09-15');
    const [blend, setBlend] = useState(50);
    const [inspectedPixel, setInspectedPixel] = useState<{ lat: string; lon: string } | null>(null);
    const [pixelLat, setPixelLat] = useState('37.485');
    const [pixelLon, setPixelLon] = useState('-106.132');
    const [showCloudMask, setShowCloudMask] = useState(false);
    const timeSeries = useRef(mockNdviTimeSeries());

    const toggleLayer = (id: string) => setEnabledLayers(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
    });

    const activeLayers = ALL_LAYERS.filter(l => enabledLayers.has(l.id));

    return (
        <div className="bg-[#070511] rounded-xl border border-purple-900/30 overflow-hidden flex flex-col min-h-[680px]">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-purple-900/30 bg-black/30">
                <div className="bg-blue-600/20 p-2 rounded-lg"><Satellite className="w-5 h-5 text-blue-400" /></div>
                <div>
                    <h2 className="font-bold text-white text-sm tracking-wide">Satellite Covariate Science Suite</h2>
                    <p className="text-[10px] text-blue-500 font-mono uppercase tracking-widest">Multi-layer spectral analysis explorer</p>
                </div>
            </div>

            <div className="flex border-b border-purple-900/20 bg-black/20 px-6">
                {([['layers', 'Layers', Layers], ['pixel', 'Pixel Inspector', Crosshair], ['correlation', 'Correlation', Grid], ['cloud', 'Cloud Mask', Cloud]] as [Tab, string, any][]).map(([id, label, Icon]) => (
                    <button key={id} onClick={() => setTab(id)}
                        className={`py-3 px-3 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 flex items-center gap-1.5 ${tab === id ? 'border-blue-500 text-blue-300' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                        <Icon className="w-3.5 h-3.5" />{label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {/* LAYERS TAB */}
                {tab === 'layers' && (
                    <div className="space-y-5">
                        <div>
                            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Available Layers</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {ALL_LAYERS.map(l => (
                                    <button key={l.id} onClick={() => toggleLayer(l.id)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-xs text-left transition-all ${enabledLayers.has(l.id) ? 'border-opacity-60 bg-opacity-20' : 'bg-black/30 border-purple-900/30 text-slate-400 hover:border-purple-700/40'}`}
                                        style={enabledLayers.has(l.id) ? { borderColor: l.color + '90', backgroundColor: l.color + '18', color: '#e2e8f0' } : {}}>
                                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: enabledLayers.has(l.id) ? l.color : '#374151' }} />
                                        <div>
                                            <span className="font-semibold block">{l.label}</span>
                                            <span className="text-[10px] opacity-60">{l.source}</span>
                                        </div>
                                        {enabledLayers.has(l.id) && <span className="ml-auto font-mono text-[10px]" style={{ color: l.color }}>{l.value} {l.unit}</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-xl border border-blue-900/30 p-5">
                            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Date-Range Comparison</p>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Date A</label>
                                    <input type="date" value={dateA} onChange={e => setDateA(e.target.value)} className="w-full mt-1 bg-black/40 border border-blue-900/40 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/60" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Date B</label>
                                    <input type="date" value={dateB} onChange={e => setDateB(e.target.value)} className="w-full mt-1 bg-black/40 border border-blue-900/40 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/60" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>← Date A ({dateA})</span><span>Date B ({dateB}) →</span></div>
                                <input type="range" min={0} max={100} value={blend} onChange={e => setBlend(Number(e.target.value))} className="w-full accent-blue-500" />
                                <div className="mt-3 h-32 rounded-lg border border-blue-900/30 flex overflow-hidden">
                                    <div className="bg-gradient-to-r from-emerald-900/60 to-sky-900/60 flex items-center justify-center text-[10px] text-slate-400 transition-all" style={{ width: `${blend}%` }}>A: {dateA}</div>
                                    <div className="bg-gradient-to-r from-sky-900/60 to-amber-900/60 flex items-center justify-center text-[10px] text-slate-400 transition-all" style={{ width: `${100 - blend}%` }}>B: {dateB}</div>
                                </div>
                            </div>
                        </div>

                        {activeLayers.length > 0 && (
                            <div className="bg-black/40 rounded-xl border border-purple-900/30 p-4">
                                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-3">Active Layer Pixel Values (Simulated)</p>
                                <div className="space-y-1.5">
                                    {activeLayers.map(l => (
                                        <div key={l.id} className="flex items-center justify-between text-xs">
                                            <span className="text-slate-400 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: l.color }} />{l.label}</span>
                                            <span className="font-mono" style={{ color: l.color }}>{l.value} <span className="text-slate-600">{l.unit}</span></span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* PIXEL INSPECTOR TAB */}
                {tab === 'pixel' && (
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Latitude</label>
                                <input value={pixelLat} onChange={e => setPixelLat(e.target.value)} className="w-full mt-1 bg-black/40 border border-blue-900/40 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-blue-500/60" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Longitude</label>
                                <input value={pixelLon} onChange={e => setPixelLon(e.target.value)} className="w-full mt-1 bg-black/40 border border-blue-900/40 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-blue-500/60" />
                            </div>
                        </div>
                        <button onClick={() => setInspectedPixel({ lat: pixelLat, lon: pixelLon })}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors">
                            <Crosshair className="w-4 h-4" /> Inspect Pixel
                        </button>

                        {inspectedPixel && (
                            <>
                                <div className="bg-black/40 border border-blue-900/30 rounded-xl p-4">
                                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">Full Spectral Profile — {inspectedPixel.lat}°N, {Math.abs(Number(inspectedPixel.lon))}°W</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {ALL_LAYERS.filter(l => l.id !== 's2_false').map(l => (
                                            <div key={l.id} className="flex justify-between text-xs px-3 py-1.5 bg-black/30 rounded-lg">
                                                <span className="text-slate-400">{l.label}</span>
                                                <span className="font-mono" style={{ color: l.color }}>{l.value} {l.unit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-black/40 border border-blue-900/30 rounded-xl p-4">
                                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">12-Month NDVI & SSM Time Series</p>
                                    <div className="h-48">
                                        <div className="space-y-3">
                                            {timeSeries.current.map(m => (
                                                <div key={m.month} className="flex items-center gap-2 text-[10px]">
                                                    <span className="font-mono text-slate-500 w-6">{m.month}</span>
                                                    <div className="flex-1 h-2 bg-black/30 rounded-full overflow-hidden relative">
                                                        <div className="absolute left-0 top-0 h-full bg-emerald-500/60 rounded-full" style={{ width: `${m.ndvi * 100}%` }} />
                                                    </div>
                                                    <span className="font-mono text-emerald-400 w-10">{m.ndvi}</span>
                                                    <span className="font-mono text-blue-400 w-10">{m.ssm}</span>
                                                </div>
                                            ))}
                                            <div className="flex gap-4 text-[10px] text-slate-500 mt-1">
                                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />NDVI</span>
                                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />SSM</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* CORRELATION TAB */}
                {tab === 'correlation' && (
                    <div className="space-y-5">
                        <div className="bg-black/40 border border-purple-900/30 rounded-xl p-5">
                            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Pearson Correlation Matrix</p>
                            <p className="text-[10px] text-slate-500 mb-5">Satellite layers vs. ground sensor types within drawn polygon</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-center text-[11px] font-mono">
                                    <thead>
                                        <tr>
                                            <th className="pb-3 text-slate-600 text-left w-16"></th>
                                            {corrLabels.map(l => <th key={l} className="pb-3 text-purple-400 font-bold">{l}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {corrLabels.map((row, i) => (
                                            <tr key={row}>
                                                <td className="py-1 text-left text-purple-400 font-bold pr-3">{row}</td>
                                                {corrLabels.map((_, j) => (
                                                    <td key={j} className="py-1 px-1">
                                                        <div className={`rounded-md py-1.5 px-2 font-bold ${corrColor(corrMatrix[i][j])}`}>
                                                            {corrMatrix[i][j].toFixed(2)}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 pt-4 border-t border-purple-900/30 flex gap-4 text-[10px] text-slate-500">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-purple-600 inline-block" />Strong (≥0.8)</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-purple-800/70 inline-block" />Moderate (≥0.6)</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-purple-900/50 inline-block" />Weak (≥0.4)</span>
                            </div>
                        </div>

                        <div className="bg-black/40 border border-purple-900/30 rounded-xl p-5">
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Polygon AOI</p>
                            <div className="h-28 rounded-lg border border-dashed border-blue-900/40 flex items-center justify-center text-slate-600 text-xs">
                                [ Map polygon drawing — connects to MapLibre GL layer ]
                            </div>
                        </div>
                    </div>
                )}

                {/* CLOUD MASK TAB */}
                {tab === 'cloud' && (
                    <div className="space-y-5">
                        <div className="flex items-center justify-between bg-black/40 border border-blue-900/30 rounded-xl p-5">
                            <div>
                                <p className="text-sm font-bold text-white">Cloud / Shadow Mask Overlay</p>
                                <p className="text-xs text-slate-500 mt-1">Sentinel-2 cloud mask applied to current overpass</p>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <span className="text-xs text-slate-400">{showCloudMask ? 'On' : 'Off'}</span>
                                <div className={`w-10 h-5 rounded-full transition-colors relative ${showCloudMask ? 'bg-blue-500' : 'bg-slate-700'}`} onClick={() => setShowCloudMask(!showCloudMask)}>
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${showCloudMask ? 'left-5' : 'left-0.5'}`} />
                                </div>
                            </label>
                        </div>

                        <div className="bg-black/40 border border-blue-900/30 rounded-xl p-5">
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">S2 Overpass — 2025-09-15</p>
                            <div className="grid grid-cols-3 gap-2 text-xs text-center">
                                {[{ label: 'Cloud Coverage', value: '12.4%', color: 'text-amber-400' }, { label: 'Shadow Coverage', value: '4.1%', color: 'text-slate-400' }, { label: 'Clear Pixels', value: '83.5%', color: 'text-emerald-400' }].map(m => (
                                    <div key={m.label} className="bg-black/30 rounded-lg p-3">
                                        <p className={`text-xl font-black font-mono ${m.color}`}>{m.value}</p>
                                        <p className="text-[10px] text-slate-600 mt-1">{m.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-black/40 border border-blue-900/30 rounded-xl p-5 space-y-3">
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Alternate SAR Passes (Cloud-Penetrating)</p>
                            {['2025-09-14 06:21 UTC — Ascending', '2025-09-12 18:09 UTC — Descending', '2025-09-09 06:20 UTC — Ascending'].map(pass => (
                                <div key={pass} className="flex items-center justify-between px-3 py-2.5 bg-black/30 rounded-lg border border-purple-900/30 hover:border-purple-500/40 cursor-pointer transition-colors">
                                    <span className="text-xs font-mono text-slate-400">{pass}</span>
                                    <span className="text-[10px] font-bold text-blue-400 border border-blue-900/50 rounded px-2 py-0.5">Select</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SatelliteCovariateExplorer;
