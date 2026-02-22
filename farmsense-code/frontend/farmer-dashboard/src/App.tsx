
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Map as MapIcon,
  Cpu,
  Database,
  Settings,
  Bell,
  Search,
  User,
  Activity,
  Droplets,
  Thermometer,
  CloudRain,
  Zap,
  Navigation,
  Satellite,
  Camera,
  Shield,
  BarChart3,
  Users,
  TrendingUp
} from 'lucide-react';
import AgriMap from './components/AgriMap';
import TelemetryOverlay from './components/TelemetryOverlay';
import Login from './components/Login';
import ForecastWidget from './components/ForecastWidget';
import { getApiKey, removeApiKey } from './services/api';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSilasMode, setIsSilasMode] = useState(false);
  const [showProfit, setShowProfit] = useState(true); // Default to showing Profit/ROI
  const [showAgent, setShowAgent] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [agentResponse, setAgentResponse] = useState<string | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial hardware-sync simulation
    if (!navigator.onLine) {
      console.log("Offline mode: Loading grid data from local Edge-Cache.");
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  useEffect(() => {
    setIsAuthenticated(!!getApiKey());
  }, []);

  const handleLogout = () => {
    removeApiKey();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className={`flex h-screen overflow-hidden text-slate-200 transition-colors duration-500 ${isSilasMode ? 'bg-black' : ''}`}>
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-950 border-r border-white/5 flex flex-col p-6 space-y-8 z-20">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">farmsenseOS<span className="text-emerald-400">.</span></h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">Farmer Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full nav-item ${activeTab === 'dashboard' ? 'nav-item-active' : ''}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`w-full nav-item ${activeTab === 'map' ? 'nav-item-active' : ''}`}
          >
            <MapIcon className="w-5 h-5" /> AgriMap Explorer
          </button>
          <button className="w-full nav-item">
            <Satellite className="w-5 h-5" /> Satellite Insights
          </button>
          <button className="w-full nav-item">
            <Navigation className="w-5 h-5" /> Robotics Fleet
          </button>
          <button className="w-full nav-item" onClick={() => setActiveTab('settings')}>
            <Settings className="w-5 h-5" /> Privacy & Data
          </button>
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setIsSilasMode(!isSilasMode);
            }}
            className={`w-full nav-item ${isSilasMode ? 'bg-orange-600 text-white shadow-lg glow-orange border-none' : ''}`}
          >
            <Activity className={`w-5 h-5 ${isSilasMode ? 'animate-pulse' : ''}`} /> {isSilasMode ? 'ADVANCED MODE' : 'SILAS MODE (SIMPLE)'}
          </button>
        </nav>

        <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
          {/* Community Wealth Card */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 shadow-xl">
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Community Equity
            </p>
            <p className="text-xl font-black text-white font-mono">$21.2M</p>
            <p className="text-[9px] text-slate-400 mt-1">Platform Value Created</p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 space-y-4">
          <button className="w-full nav-item"><Settings className="w-5 h-5" /> System Config</button>
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer" onClick={handleLogout}>
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-bold text-white">Enterprise User</p>
              <p className="text-[10px] text-slate-500">Log Out</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Global Header */}
        <header className="h-20 bg-slate-950/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 z-10">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10 w-96">
            <Search className="w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search fields, sensors, or alerts..." className="bg-transparent text-sm border-none focus:outline-none w-full" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Grant Subsidized (100%)</span>
                <div className="w-[1px] h-4 bg-white/10 mx-2"></div>
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 glow-active' : 'bg-orange-500'}`}></div>
                {isOnline ? 'System Operational' : 'Offline Mode (Local Edge Cache Active)'}
              </div>
            </div>
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-slate-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Global HUDs */}
        <WeatherHUD />
        {showDiagnostics && <HardwareDiagnostics onClose={() => setShowDiagnostics(false)} />}

        {/* Dashboard / Map View */}
        <div className="flex-1 relative">
          {isSilasMode ? (
            <div className="p-10 h-full bg-[#070b14] overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="farmsense-headings text-6xl font-black text-white">SILAS VIEW</h2>
                <button
                  onClick={() => setIsSilasMode(false)}
                  className="glass-button-secondary border-emerald-500/20 text-emerald-400"
                >
                  Switch to Advanced Mode
                </button>
              </div>

              {/* Voice Operations Menu */}
              <div className="absolute bottom-10 right-10 z-50">
                <button
                  onClick={() => {
                    setIsListening(true);
                    setTimeout(() => {
                      setIsListening(false);
                      setAgentResponse("Field 01: Moisture is 22.0% vWC — LOW. Below the 22% threshold. Irrigation recommended within 24h. [RULE: moisture < low (0.22 vWC)]");
                      setShowAgent(true);
                    }, 2000);
                  }}
                  className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all group"
                >
                  <Mic className={`w-12 h-12 text-white ${isListening ? 'animate-pulse' : ''}`} />
                  <div className="absolute -inset-4 bg-emerald-500/20 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Big Water Status */}
                <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-6">
                  <Droplets className="w-32 h-32 text-emerald-400" />
                  <h3 className="text-4xl font-bold text-white">WATER STATUS</h3>
                  <div className="px-10 py-4 bg-emerald-500 rounded-full text-slate-950 text-3xl font-black tracking-widest">NORMAL</div>
                  <p className="text-slate-500 text-xl italic">"Dirt's plenty wet today, Silas."</p>
                </div>

                {/* Big Pump Control */}
                <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-6">
                  <Zap className="w-32 h-32 text-orange-400" />
                  <h3 className="text-4xl font-bold text-white">PFA PUMP CONTROL</h3>
                  <button className="w-full py-8 bg-red-500 hover:bg-red-600 text-white text-4xl font-black rounded-3xl shadow-2xl shadow-red-500/20 transition-all border-b-8 border-red-700 active:border-b-0 active:translate-y-2">
                    STOP PUMP
                  </button>
                  <p className="text-slate-500 font-bold uppercase tracking-widest mt-4">PFA Pressure: 68.2 PSI | 850 GPM</p>
                </div>

                {/* Simple Map */}
                <div className="md:col-span-2 glass-card h-[400px] overflow-hidden relative">
                  <div className="absolute top-6 left-6 z-10 bg-slate-950/80 p-4 rounded-xl border border-white/10">
                    <h4 className="text-2xl font-bold text-white uppercase">Field Map</h4>
                  </div>
                  <AgriMap />
                </div>
              </div>
            </div>
          ) : activeTab === 'dashboard' ? (
            <div className="p-10 space-y-8 overflow-y-auto h-full pb-32 relative">
              {/* Fixed Conversation Bubble */}
              {showAgent && (
                <div className="fixed bottom-10 right-10 w-96 glass-card p-6 border-emerald-500 animate-in slide-in-from-bottom duration-300 z-50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-tighter">Field Decision Engine</span>
                    </div>
                    <button onClick={() => setShowAgent(false)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed mb-4">
                    "{agentResponse || "Waiting for query. All decisions are threshold-based and fully auditable."}"
                  </p>

                  {/* Show Me The Math - Rule Inspector */}
                  <div className="bg-slate-900/50 rounded-lg p-3 mb-4 border border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Shield className="w-3 h-3" /> Rule Provenance
                    </p>
                    <div className="space-y-1 font-mono text-[9px] text-emerald-400/80">
                      <p>RULE: moisture &lt; low (0.22 vWC)</p>
                      <p>DATA: sensor_node_01_primary: 0.22</p>
                      <p>SOURCE: CSU SLV RC Thresholds v2026.1</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-emerald-600 text-white text-[10px] font-bold rounded-lg uppercase">Start Pump</button>
                    <button className="flex-1 py-2 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg uppercase">Thanks</button>
                  </div>
                </div>
              )}

              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tight mb-2">OPERATIONS COMMAND</h2>
                  <p className="text-slate-400">Holistic overview of all field ecosystems and autonomous assets.</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setIsListening(true);
                      setTimeout(() => {
                        setIsListening(false);
                        setAgentResponse("Field 01: Cumulative savings this season: $4,280. Calculated from: (baseline_water_cost - actual_water_cost) + fuel_savings. [RULE: financial_summary]");
                        setShowAgent(true);
                      }, 1500);
                    }}
                    className={`glass-button-primary border-blue-500/50 flex items-center gap-2 ${isListening ? 'bg-blue-600' : ''}`}
                  >
                    <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} /> Ask Decision Engine
                  </button>
                  <button
                    onClick={() => setShowDiagnostics(true)}
                    className="glass-button-secondary flex items-center gap-2 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all font-bold"
                  >
                    <Activity className="w-4 h-4 text-emerald-400" /> Node Diagnostics
                  </button>
                </div>
              </div>

              {/* Hero Stat Grid */}
              <div className="grid grid-cols-4 gap-6">
                <div className="glass-card p-6 border-l-4 border-emerald-500 transition-all duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <Droplets className="text-emerald-400 w-6 h-6" />
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">Optimal</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {showProfit ? 'Estimated Savings' : 'VFA Truth Node'}
                  </p>
                  <p className="text-3xl font-black text-white mt-1 font-mono">
                    {showProfit ? '$4,280' : '32.4%'}
                    {showProfit && <span className="text-sm font-normal text-emerald-400 ml-1 font-sans">/ season</span>}
                  </p>
                </div>
                <div className="glass-card p-6 border-l-4 border-orange-500">
                  <div className="flex justify-between items-start mb-4">
                    <Thermometer className="text-orange-400 w-6 h-6" />
                    <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full uppercase">Active</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {showProfit ? 'Fuel/Yield Offset' : 'LRZ Scout Network'}
                  </p>
                  <p className="text-3xl font-black text-white mt-1 font-mono">
                    {showProfit ? '+$1,120' : '12 Nodes'}
                  </p>
                </div>
                <div className="glass-card p-6 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start mb-4">
                    <Activity className="text-blue-400 w-6 h-6" />
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full uppercase">Nominal</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {showProfit ? 'Labor Efficiency' : 'PFA Well Flow'}
                  </p>
                  <p className="text-3xl font-black text-white mt-1 font-mono">
                    {showProfit ? '22%' : '850 GPM'}
                    {showProfit && <span className="text-sm font-normal text-blue-400 ml-1 font-sans">Gain</span>}
                  </p>
                </div>
                <div className="glass-card p-6 border-l-4 border-slate-500">
                  <div className="flex justify-between items-start mb-4">
                    <Zap className="text-slate-400 w-6 h-6" />
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-500/10 px-2 py-0.5 rounded-full uppercase">Tracking</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {showProfit ? 'Water Credit (SLV)' : 'PMT Kinematics'}
                  </p>
                  <p className="text-3xl font-black text-white mt-1 font-mono">
                    {showProfit ? '140' : '2.4 MPH'}
                    {showProfit && <span className="text-sm font-normal text-slate-500 ml-1 font-sans">Units Earned</span>}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 glass-card overflow-hidden h-96 relative group">
                  <div className="absolute top-6 left-6 z-10">
                    <h3 className="text-lg font-bold text-white shadow-sm">Real-time Field Dynamics</h3>
                    <p className="text-xs text-slate-400 font-sans tracking-tight">Sentinel-2 Overlay - LV Model 1m Grid</p>
                  </div>
                  <AgriMap />
                  <div className="absolute bottom-6 right-6 z-10">
                    <button className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold border border-white/10 hover:bg-slate-800 transition-all" onClick={() => setActiveTab('map')}>
                      Expand Map View
                    </button>
                  </div>
                </div>

                <div className="glass-card p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Live Telemetry</h3>
                    <p className="text-xs text-slate-400 mb-6">Aggregated from IoT sensor array and machinery telematics.</p>
                    <TelemetryOverlay />
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Recent Alerts</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <p className="text-[11px] font-medium text-orange-200">Moisture drop detected in Quad C4</p>
                      </div>
                      <div className="flex items-center gap-3 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <p className="text-[11px] font-medium text-emerald-200">Robotic Unit 07 Mission Complete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Predictive AI Forecasting Row */}
              <div className="grid grid-cols-1 mt-8">
                <ForecastWidget fieldId="field_01" />
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            <div className="p-10 space-y-12 overflow-y-auto h-full pb-32 max-w-4xl">
              <div className="space-y-4">
                <h2 className="farmsense-headings text-4xl font-black text-white">DATA OWNERSHIP</h2>
                <p className="text-slate-400">You are the sole owner of your field data. Use these settings to control transparent access for your stakeholders.</p>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-10 flex items-center justify-between border-l-4 border-blue-500">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">Share Raw Telemetry with Auditors</h3>
                    <p className="text-sm text-slate-500 italic">"Allows Regulatory Portal to see exact moisture percentages."</p>
                  </div>
                  <div className="w-16 h-8 bg-slate-800 rounded-full relative p-1 cursor-pointer">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full shadow-lg ml-auto"></div>
                  </div>
                </div>

                <div className="glass-card p-10 flex items-center justify-between border-l-4 border-slate-700">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">Share Financial Trends with Investors</h3>
                    <p className="text-sm text-slate-500 italic">"Anonymizes everything except yield forecasts."</p>
                  </div>
                  <div className="w-16 h-8 bg-slate-800 rounded-full relative p-1 cursor-pointer">
                    <div className="w-6 h-6 bg-slate-600 rounded-full shadow-lg"></div>
                  </div>
                </div>

                <div className="glass-card p-10 flex items-center justify-between border-l-4 border-emerald-500 bg-emerald-500/5">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">Contribute to Anonymized Research Pool</h3>
                    <p className="text-sm text-slate-500 italic">"Shares raw sensor trends with FarmSense HQ with NO trace back to you."</p>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-2">Default: OPTED IN for all accounts</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded">No Trace Policy</span>
                    {/* Free tier: locked, cannot opt out */}
                    <div className="w-16 h-8 bg-slate-800 rounded-full relative p-1 cursor-not-allowed opacity-60" title="Free accounts contribute to the research pool. Upgrade to Command or Enterprise to manage this setting.">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full shadow-lg ml-auto"></div>
                    </div>
                    <span className="text-[9px] text-slate-600 italic">Free Tier: Always contributed</span>
                  </div>
                </div>

                <div className="glass-card p-6 border-l-4 border-slate-700 bg-slate-800/30">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                      <Database className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest">Opt-Out Policy (Command & Enterprise Only)</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Paid accounts may opt out of the anonymized research pool at any time via this panel.
                        Opting out requires a <strong className="text-orange-400">two-step confirmation</strong> to prevent accidental changes.
                        Free (Silas Tier) accounts contribute to the research pool as a condition of the free service —
                        all data is irreversibly anonymized before submission.
                      </p>
                      <button className="mt-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all border border-slate-600">
                        Request Opt-Out (Requires Confirmation)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-10 border-l-4 border-orange-500 bg-orange-500/5">
                  <h4 className="text-orange-400 font-bold mb-4 flex items-center gap-2 underline underline-offset-4">
                    GUARANTEED DATA RECALL
                  </h4>
                  <p className="text-sm text-orange-200/80 leading-relaxed">
                    Under SLV 2026 guidelines, you have the right to revoke all shared access immediately. Recalling access will automatically scrub your raw data from all stakeholder dashboards while keeping your hashed compliance reports valid.
                  </p>
                </div>
              </div>
            </div>
          ) : (activeTab === 'map' && (
            <div className="w-full h-full">
              <AgriMap />
              <div className="absolute top-10 right-10 z-10">
                <TelemetryOverlay />
              </div>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="absolute top-10 left-10 z-10 glass-card px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" /> Back to Operations
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
