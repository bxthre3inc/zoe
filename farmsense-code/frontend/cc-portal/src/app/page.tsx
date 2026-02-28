'use client';

import DigitalTwin from '@/components/map/DigitalTwin';
import TacticalSidebar from '@/components/sidebar/TacticalSidebar';
import WaterLedgerHUD from '@/components/ui/WaterLedgerHUD';
import SpatialOpsFilterHUD from '@/components/ui/SpatialOpsFilterHUD';
import DataSimulator from '@/components/services/DataSimulator';
import { useCCStore } from '@/store/useCCStore';
import {
  ShieldAlert,
  Wifi,
  Satellite,
  Clock,
  Crosshair,
  BarChart3,
  Waves
} from 'lucide-react';

export default function MissionControlPage() {
  const rss = useCCStore((state) => state.rss);
  const dhus = useCCStore((state) => state.dhus);

  // Take first 3 DHUs for the status strip
  const activeDHUs = Object.values(dhus).slice(0, 3);

  return (
    <main className="flex h-screen w-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Simulation Engine */}
      <DataSimulator />

      {/* 1. Tactical Sidebar */}
      <TacticalSidebar />

      {/* 2. Main High-Fidelity Content Area */}
      <div className="relative flex-1 h-full overflow-hidden">
        {/* Dynamic 3D Background */}
        <DigitalTwin />

        {/* Tactical HUD Overlay (Top Bar) */}
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-none z-20">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 glass-panel !bg-slate-900/40 px-3 py-1 tactical-border w-fit">
              <Crosshair className="w-3.5 h-3.5 text-tactical-blue" />
              <span className="text-[10px] font-black tracking-widest uppercase">Target: Subdistrict 1 Regional Grid</span>
              <div className="w-1.5 h-1.5 rounded-full bg-tactical-blue animate-pulse ml-2" />
            </div>
            <div className="text-[10px] text-slate-500 font-bold px-1 uppercase tracking-tighter">
              Coordinates: <span className="text-white">37.5851° N, 106.1478° W</span> <span className="text-slate-700 mx-1">|</span> Elevation: <span className="text-white">7,664 FT</span>
            </div>
          </div>

          <div className="flex gap-4 items-start pointer-events-auto">
            {/* System Status Pill */}
            <div className="glass-panel p-3 tactical-border flex items-center gap-4 bg-slate-900/60 transition-all hover:bg-slate-900/80">
              <div className="flex items-center gap-2">
                <Satellite className="w-4 h-4 text-tactical-blue" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Backhaul</span>
                  <span className="text-[10px] font-bold text-white tracking-tight">{rss?.starlink_backup_status ? 'STARLINK-081' : 'FIBER_BACKHAUL'}</span>
                </div>
              </div>
              <div className="w-px h-6 bg-slate-800" />
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-tactical-green" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Mesh Sync</span>
                  <span className="text-[10px] font-bold text-tactical-green tracking-tight">ACTIVE 25/25</span>
                </div>
              </div>
            </div>

            {/* Emergency Halt (Admin Only) */}
            <button className="glass-panel px-4 py-3 bg-red-950/20 hover:bg-red-500/10 border-red-500/20 hover:border-red-500/40 transition-all flex items-center gap-3 active:scale-95 group">
              <div className="p-1 px-2 rounded bg-red-500/20 text-red-500 border border-red-500/30 group-hover:animate-pulse">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-red-500 uppercase tracking-widest leading-none">Full Grid Stop</p>
                <p className="text-[7px] text-red-700 font-bold uppercase tracking-tighter">Emergency Protocol</p>
              </div>
            </button>
          </div>
        </header>

        {/* Bottom Real-time Telemetry Strips */}
        <footer className="absolute bottom-6 left-6 right-6 flex flex-col justify-end items-start pointer-events-none z-20">
          <SpatialOpsFilterHUD />

          <div className="flex w-full justify-between items-end">
            <div className="flex gap-4 items-end">
              {/* Real-time Water Ledger HUD */}
              <WaterLedgerHUD />

              {/* Active Pumping Hubs Strip */}
              <div className="glass-panel p-4 tactical-border w-64 pointer-events-auto bg-slate-900/90 h-fit">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-tactical-blue" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">Hydraulic Feed</span>
                  </div>
                  <Clock className="w-3 h-3 text-slate-600" />
                </div>
                <div className="space-y-2">
                  {activeDHUs.map((dhu) => (
                    <div key={dhu.id} className="flex items-center justify-between text-[10px]">
                      <span className="font-mono text-slate-500">{dhu.id}</span>
                      <span className="font-black text-white">{dhu.total_field_flow.toFixed(0)} GPM</span>
                      <span className={dhu.status === 'ONLINE' ? 'text-tactical-green font-bold uppercase text-[8px]' : 'text-tactical-amber font-bold uppercase text-[8px]'}>
                        {dhu.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Twin Spatial Status */}
              <div className="glass-panel p-4 tactical-border w-64 pointer-events-auto bg-slate-900/90 h-fit">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">Spatial Logic</span>
                  </div>
                  <div className="px-1.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[7px] text-indigo-400 font-black tracking-widest uppercase">RTK LOCK</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 uppercase tracking-tighter font-bold">Oracle Fidelity</div>
                  <div className="text-xl font-black text-white flex items-baseline gap-1">
                    {rss?.current_spatial_fidelity || '---'} <span className="text-[10px] text-slate-600">RESOLUTION</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-1 text-[2px]">
                    <div className="h-full bg-indigo-500 w-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel px-6 py-4 tactical-border flex flex-col items-center justify-center bg-slate-900/90 text-center">
              <div className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1">Grid Operational Baseline</div>
              <div className="text-2xl font-black text-white tracking-widest text-shadow-glow">99.98%</div>
              <div className="text-[9px] text-tactical-green font-black tracking-tighter uppercase mt-1">Decentralized Indigenous Ops</div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
