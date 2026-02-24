import React, { useState } from 'react';
import { Search, ExternalLink, Bookmark, BookmarkCheck, Zap, Calendar, DollarSign, ChevronRight } from 'lucide-react';

type Agency = 'All' | 'DoD' | 'USDA' | 'NSF' | 'Foundation' | 'International';
type SortKey = 'relevance' | 'deadline' | 'amount';

interface Opportunity {
    id: string;
    title: string;
    agency: string;
    agencyTag: Agency;
    program: string;
    deadline: string;
    awardMin: number;
    awardMax: number;
    relevance: number;
    tags: string[];
    description: string;
    url: string;
    saved: boolean;
}

const SEED_OPPORTUNITIES: Opportunity[] = [
    {
        id: 'ESTCP-FY26-IR',
        title: 'Water Resilience on DoD Installations',
        agency: 'DoD ESTCP',
        agencyTag: 'DoD',
        program: 'Installation Resilience',
        deadline: '2026-03-26',
        awardMin: 1500000,
        awardMax: 3000000,
        relevance: 97,
        tags: ['groundwater', 'resilience', 'sensing', 'aquifer'],
        description: 'Certifies technologies that reduce DoD installation dependence on stressed groundwater basins through real-time monitoring and AI-driven demand forecasting.',
        url: 'https://www.serdp-estcp.mil',
        saved: true,
    },
    {
        id: 'USDA-NRCS-EQIP-26',
        title: 'Environmental Quality Incentives Program — Water Conservation',
        agency: 'USDA NRCS',
        agencyTag: 'USDA',
        program: 'EQIP',
        deadline: '2026-04-15',
        awardMin: 50000,
        awardMax: 450000,
        relevance: 88,
        tags: ['water conservation', 'precision agriculture', 'soil health'],
        description: 'Technical and financial assistance to agricultural operations implementing conservation practices that address priority resource concerns, including water depletion.',
        url: 'https://www.nrcs.usda.gov/programs-initiatives/eqip-environmental-quality-incentives',
        saved: false,
    },
    {
        id: 'NSF-IUCRC-26',
        title: 'Industry-University Cooperative Research Centers — Water, Sustainability, Climate',
        agency: 'NSF',
        agencyTag: 'NSF',
        program: 'IUCRC',
        deadline: '2026-05-01',
        awardMin: 300000,
        awardMax: 1200000,
        relevance: 79,
        tags: ['university partnership', 'water', 'climate', 'federated data'],
        description: 'Establishes long-term partnerships between universities, industry, and government around shared water and climate research infrastructure.',
        url: 'https://new.nsf.gov/funding/opportunities/industry-university-cooperative-research-centers',
        saved: false,
    },
    {
        id: 'GATES-COP30-AI',
        title: 'COP30 Smallholder Climate Adaptation — AI & Digital Agriculture',
        agency: 'Bill & Melinda Gates Foundation',
        agencyTag: 'Foundation',
        program: 'Agricultural Development',
        deadline: '2026-06-30',
        awardMin: 500000,
        awardMax: 5000000,
        relevance: 74,
        tags: ['smallholder', 'climate adaptation', 'AI', 'irrigation'],
        description: 'Seeking scalable digital agriculture platforms that demonstrably reduce water use and improve yield resilience for smallholder farmers in climate-stressed regions. COP30 aligned.',
        url: 'https://www.gatesfoundation.org/our-work/programs/global-growth-opportunity',
        saved: false,
    },
    {
        id: 'EARTHSHOT-WATER',
        title: 'Earthshot Prize — Fix Our Climate / Revive Our Oceans',
        agency: 'The Earthshot Prize',
        agencyTag: 'International',
        program: 'Fix Our Climate',
        deadline: '2026-07-15',
        awardMin: 1000000,
        awardMax: 1000000,
        relevance: 68,
        tags: ['climate', 'water', 'conservation', 'impact'],
        description: 'Annual prize fund for the most innovative solutions that repair and regenerate the natural environment. Water stewardship and aquifer restoration are priority areas.',
        url: 'https://earthshotprize.org',
        saved: false,
    },
    {
        id: 'USDA-ARS-CRIS',
        title: 'USDA ARS — Precision Agriculture Water Use Efficiency',
        agency: 'USDA ARS',
        agencyTag: 'USDA',
        program: 'CRIS Cooperative Agreement',
        deadline: '2026-08-01',
        awardMin: 200000,
        awardMax: 800000,
        relevance: 83,
        tags: ['precision agriculture', 'water efficiency', 'sensor', 'kriging'],
        description: 'Cooperative agreements to develop and validate precision water management tools, including spatial interpolation methods and real-time soil moisture sensing networks.',
        url: 'https://www.ars.usda.gov',
        saved: false,
    },
    {
        id: 'WFP-PRIZE-2027',
        title: 'World Food Prize — Borlaug Field Award',
        agency: 'World Food Prize Foundation',
        agencyTag: 'International',
        program: 'Borlaug Field Award',
        deadline: '2026-12-01',
        awardMin: 10000,
        awardMax: 10000,
        relevance: 62,
        tags: ['food security', 'agriculture', 'impact', 'recognition'],
        description: 'Recognizes early-career individuals who have made exceptional contributions to improving food security through agricultural development, research, or humanitarian work.',
        url: 'https://www.worldfoodprize.org',
        saved: false,
    },
];

const AGENCIES: Agency[] = ['All', 'DoD', 'USDA', 'NSF', 'Foundation', 'International'];

function daysUntil(dateStr: string) {
    const d = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
    return d;
}

function fmtAmount(min: number, max: number) {
    const fmt = (n: number) => n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`;
    return min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`;
}

function RelevanceBadge({ score }: { score: number }) {
    const color = score >= 85 ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800/50' :
        score >= 70 ? 'bg-amber-900/30 text-amber-400 border-amber-800/40' :
            'bg-slate-800 text-slate-400 border-slate-700';
    return (
        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded border ${color}`}>
            <Zap className="w-2.5 h-2.5" />{score}% match
        </div>
    );
}

function DeadlineBadge({ dateStr }: { dateStr: string }) {
    const d = daysUntil(dateStr);
    const color = d <= 30 ? 'text-red-400' : d <= 60 ? 'text-amber-400' : 'text-slate-400';
    return <span className={`text-[10px] font-bold ${color}`}>{d}d left · {new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>;
}

export const GrantDiscovery: React.FC = () => {
    const [search, setSearch] = useState('');
    const [agency, setAgency] = useState<Agency>('All');
    const [sort, setSort] = useState<SortKey>('relevance');
    const [opportunities, setOpportunities] = useState(SEED_OPPORTUNITIES);
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleSave = (id: string) => {
        setOpportunities(prev => prev.map(o => o.id === id ? { ...o, saved: !o.saved } : o));
    };

    const filtered = opportunities
        .filter(o => (agency === 'All' || o.agencyTag === agency))
        .filter(o => !search || o.title.toLowerCase().includes(search.toLowerCase()) || o.tags.some(t => t.includes(search.toLowerCase())))
        .sort((a, b) => sort === 'relevance' ? b.relevance - a.relevance : sort === 'deadline' ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime() : b.awardMax - a.awardMax);

    return (
        <div className="space-y-4">
            {/* Search + Filters */}
            <div className="flex flex-wrap gap-3 items-center">
                <div className="flex-1 relative min-w-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search grants, keywords, agencies…"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50" />
                </div>
                <select value={sort} onChange={e => setSort(e.target.value as SortKey)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none">
                    <option value="relevance">Sort: Relevance</option>
                    <option value="deadline">Sort: Deadline</option>
                    <option value="amount">Sort: Award Size</option>
                </select>
            </div>

            {/* Agency Tabs */}
            <div className="flex gap-1 flex-wrap">
                {AGENCIES.map(a => (
                    <button key={a} onClick={() => setAgency(a)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${agency === a ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
                        {a}
                    </button>
                ))}
                <span className="ml-auto text-[10px] text-slate-600 self-center">{filtered.length} results</span>
            </div>

            {/* Results */}
            <div className="space-y-2">
                {filtered.map(opp => (
                    <div key={opp.id} className={`bg-slate-900 border rounded-xl overflow-hidden transition-all ${opp.saved ? 'border-indigo-800/50' : 'border-slate-800 hover:border-slate-700'}`}>
                        <div className="flex items-start gap-3 p-4 cursor-pointer" onClick={() => setExpanded(expanded === opp.id ? null : opp.id)}>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{opp.agency}</span>
                                    <span className="text-slate-700">·</span>
                                    <span className="text-[9px] font-bold text-slate-500">{opp.program}</span>
                                </div>
                                <p className="text-sm font-bold text-white leading-snug">{opp.title}</p>
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                    <RelevanceBadge score={opp.relevance} />
                                    <div className="flex items-center gap-1 text-[10px] text-slate-500"><Calendar className="w-2.5 h-2.5" /><DeadlineBadge dateStr={opp.deadline} /></div>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-500"><DollarSign className="w-2.5 h-2.5" />{fmtAmount(opp.awardMin, opp.awardMax)}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 pt-0.5">
                                <button onClick={e => { e.stopPropagation(); toggleSave(opp.id); }}
                                    className={`transition-colors ${opp.saved ? 'text-indigo-400' : 'text-slate-600 hover:text-indigo-400'}`}>
                                    {opp.saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                                </button>
                                <ChevronRight className={`w-4 h-4 text-slate-600 transition-transform ${expanded === opp.id ? 'rotate-90' : ''}`} />
                            </div>
                        </div>
                        {expanded === opp.id && (
                            <div className="border-t border-slate-800 px-4 pb-4 pt-3 space-y-3">
                                <p className="text-sm text-slate-400">{opp.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {opp.tags.map(t => <span key={t} className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">{t}</span>)}
                                </div>
                                <div className="flex gap-2 pt-1">
                                    <a href={opp.url} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 border border-slate-700 px-3 py-1.5 rounded-lg hover:border-slate-500 transition-colors">
                                        <ExternalLink className="w-3 h-3" /> Program Page
                                    </a>
                                    <button className="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg transition-colors">
                                        Start Application <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GrantDiscovery;
