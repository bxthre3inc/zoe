import { Routes, Route } from 'react-router-dom';
import ComplianceList from '../regulatory/ComplianceList';
import IntegrityChainVisualizer from '../regulatory/IntegrityChainVisualizer';
import EconomicImpact from '../regulatory/EconomicImpact';
import ScientificValidation from '../regulatory/ScientificValidation';
import DroneARFeed from '../regulatory/DroneARFeed';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Link, BarChart2, Microscope, Video } from 'lucide-react';

const TABS = [
    { label: 'Ledger', path: '/regulatory', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { label: 'Chain', path: '/regulatory/chain', icon: <Link className="w-3.5 h-3.5" /> },
    { label: 'Basin', path: '/regulatory/basin', icon: <BarChart2 className="w-3.5 h-3.5" /> },
    { label: 'Science', path: '/regulatory/science', icon: <Microscope className="w-3.5 h-3.5" /> },
    { label: 'Drone Feed', path: '/regulatory/drone', icon: <Video className="w-3.5 h-3.5" /> },
];

function RegNav() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    return (
        <div className="flex gap-1 px-6 pt-5 pb-0 overflow-x-auto border-b border-slate-800">
            {TABS.map(t => (
                <button key={t.path} onClick={() => navigate(t.path)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold whitespace-nowrap border-b-2 transition-all -mb-px ${pathname === t.path ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    {t.icon}{t.label}
                </button>
            ))}
        </div>
    );
}

export default function RegulatoryView() {
    return (
        <div className="flex flex-col h-full">
            <RegNav />
            <div className="flex-1 overflow-y-auto">
                <Routes>
                    <Route index element={<ComplianceList />} />
                    <Route path="chain" element={<IntegrityChainVisualizer />} />
                    <Route path="basin" element={<EconomicImpact />} />
                    <Route path="science" element={<ScientificValidation />} />
                    <Route path="drone" element={<DroneARFeed />} />
                    <Route path="report" element={<ComplianceList />} />
                </Routes>
            </div>
        </div>
    );
}
