import { Sprout, ArrowUpRight, MapPin, Cpu, Droplets, Satellite, Zap, Shield, TrendingUp, Users, Calendar, Mail, ChevronLeft } from "lucide-react";

export default function FarmSenseProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-emerald-500/10 rounded-full blur-3xl" />
        
        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Bxthre3</span>
          </a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-lg">
              B3
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Building Hardware Prototypes
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Fund Raising
            </span>
          </div>
          
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
              <Sprout className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3">FarmSense Project</h1>
              <p className="text-xl text-zinc-400">Precision Agriculture Intelligence Platform</p>
            </div>
          </div>
          
          <p className="text-xl text-zinc-300 max-w-4xl leading-relaxed mb-10">
            Transform satellite imagery, IoT sensor networks, and real-time data into actionable insights 
            that maximize crop yields while minimizing resource waste. The most ambitious agricultural 
            technology platform ever attempted.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a
              href="https://farmsense.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Visit FarmSense
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@farmsense.io"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Team
            </a>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl font-bold text-emerald-400">20-30%</div>
            <div className="text-sm text-zinc-500 mt-1">Water Reduction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">18-22%</div>
            <div className="text-sm text-zinc-500 mt-1">ROI Increase</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">50m → 1m</div>
            <div className="text-sm text-zinc-500 mt-1">Grid Resolution</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">SLV 2026</div>
            <div className="text-sm text-zinc-500 mt-1">Pilot Deployment</div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-8">Project Overview</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5">
            <h3 className="text-xl font-semibold mb-4 text-emerald-400">The Problem</h3>
            <p className="text-zinc-300 leading-relaxed">
              Agriculture consumes 70% of global freshwater. Traditional irrigation methods waste 
              billions of gallons annually while farmers struggle with uncertain yields and regulatory 
              pressure. Water courts require legally defensible evidence that doesn't exist.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5">
            <h3 className="text-xl font-semibold mb-4 text-emerald-400">The Solution</h3>
            <p className="text-zinc-300 leading-relaxed">
              FarmSense creates a deterministic, judgment-based operating system for precision agriculture. 
              Satellite data, ground sensors, and real-time analytics combine to deliver actionable 
              irrigation intelligence with cryptographic chain of custody for legal admissibility.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-8">Core Capabilities</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-green-900/10 border border-emerald-500/10">
            <Satellite className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Satellite Integration</h3>
            <p className="text-sm text-zinc-400">Multi-spectral imagery from Sentinel, Landsat, and commercial providers processed into actionable field intelligence.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-green-900/10 border border-emerald-500/10">
            <Cpu className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">IoT Sensor Suite</h3>
            <p className="text-sm text-zinc-400">Custom hardware ecosystem: LRZ scouts, VFA anchors, PMT hubs, and DHU regional managers creating a 1-meter resolution grid.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-green-900/10 border border-emerald-500/10">
            <Droplets className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Water Ledger</h3>
            <p className="text-sm text-zinc-400">Cryptographically signed chain of custody for water usage data—legally admissible in state water courts.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-green-900/10 border border-emerald-500/10">
            <Zap className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Adaptive Recalculation</h3>
            <p className="text-sm text-zinc-400">Deterministic algorithms that respond to changing conditions in real-time—Dormant, Anticipatory, Ripple, and Collapse modes.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-green-900/10 border border-emerald-500/10">
            <Shield className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Regulatory Compliance</h3>
            <p className="text-sm text-zinc-400">Built for SLV 2026 water court requirements with audit trails, compliance dashboards, and automated reporting.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-green-900/10 border border-emerald-500/10">
            <TrendingUp className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Economic Intelligence</h3>
            <p className="text-sm text-zinc-400">Continuous cost-benefit analysis preventing water deployment when costs exceed yield revenue.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-8">Development Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="flex-1">
              <div className="font-semibold">Now — June 2026</div>
              <div className="text-sm text-zinc-400">CSU San Luis Valley 2-Field Pilot</div>
            </div>
            <span className="text-emerald-400 text-sm font-medium">Active</span>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-white/5">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="flex-1">
              <div className="font-semibold">March 26, 2026</div>
              <div className="text-sm text-zinc-400">Federal Federal ESG Pre-Proposal Deadline</div>
            </div>
            <span className="text-amber-400 text-sm font-medium">Fund Raising</span>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-white/5">
            <div className="w-3 h-3 rounded-full bg-zinc-600" />
            <div className="flex-1">
              <div className="font-semibold">June 2026</div>
              <div className="text-sm text-zinc-400">SLV Subdistrict 1 Water Court Evidence</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-white/5">
            <div className="w-3 h-3 rounded-full bg-zinc-600" />
            <div className="flex-1">
              <div className="font-semibold">Q3-Q4 2026</div>
              <div className="text-sm text-zinc-400">Regional Master — 100% SLV Subdistrict 1</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-white/5">
            <div className="w-3 h-3 rounded-full bg-zinc-600" />
            <div className="flex-1">
              <div className="font-semibold">2027</div>
              <div className="text-sm text-zinc-400">Colorado DWR Adoption — State Standard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-8">Hardware Ecosystem</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-zinc-800/50 border border-white/5">
            <div className="text-lg font-bold text-emerald-400 mb-1">LRZ</div>
            <div className="text-sm text-zinc-500 mb-2">Lateral Root-Zone Scout</div>
            <p className="text-xs text-zinc-400">Dumb spatial mapper, 1 per 15 acres</p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-800/50 border border-white/5">
            <div className="text-lg font-bold text-emerald-400 mb-1">VFA</div>
            <div className="text-sm text-zinc-500 mb-2">Vertical Field Anchor</div>
            <p className="text-xs text-zinc-400">48" deep-profile truth node</p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-800/50 border border-white/5">
            <div className="text-lg font-bold text-emerald-400 mb-1">PMT</div>
            <div className="text-sm text-zinc-500 mb-2">Pivot Motion Tracker</div>
            <p className="text-xs text-zinc-400">Field hub, edge-EBK engine</p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-800/50 border border-white/5">
            <div className="text-lg font-bold text-emerald-400 mb-1">DHU</div>
            <div className="text-sm text-zinc-500 mb-2">District Hub</div>
            <p className="text-xs text-zinc-400">Regional mesh manager, 10km radius</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-green-900/10 border border-emerald-500/20">
          <h2 className="text-3xl font-bold mb-4">Partner With FarmSense</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            We're seeking strategic partners, investors, and pilot participants to scale 
            precision agriculture infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://farmsense.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Visit FarmSense.io
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@farmsense.io"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Team
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-sm">
              B3
            </div>
            <span className="font-semibold">Bxthre3 Inc.</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <MapPin className="w-4 h-4" />
            <span>United States</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>© 2025 Bxthre3 Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
