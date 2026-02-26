import SupportLetters from '../grantportal/SupportLetters';
import TrustBadge from '../grantportal/TrustBadge';

export default function MarketingView() {
    return (
        <div className="min-h-screen bg-slate-950">
            <header className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/30 to-indigo-500/30 border border-slate-700 flex items-center justify-center">
                        <span className="text-emerald-400 text-xs font-black">FS</span>
                    </div>
                    <span className="text-white font-black text-lg">FarmSense</span>
                    <TrustBadge />
                </div>
                <a href="/login" className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors">
                    Sign In
                </a>
            </header>
            <main className="px-8 py-12 max-w-5xl mx-auto space-y-12">
                <section className="text-center space-y-4">
                    <h1 className="text-4xl font-black text-white">Deterministic Agriculture</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        FarmSense replaces guessing with mathematics — 1m Empirical Bayesian Kriging grids, real-time soil telemetry, and deterministic VRI plans for every pivot, every day.
                    </p>
                </section>
                <SupportLetters />
            </main>
        </div>
    );
}
