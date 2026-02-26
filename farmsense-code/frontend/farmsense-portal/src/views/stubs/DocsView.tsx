import { useAuth } from '../../auth/AuthContext';
import { DOCS_SECTIONS } from '../../auth/types';
import { BookOpen, Lock } from 'lucide-react';

const ALL_SECTIONS = [
    'Overview', 'Hardware Overview', 'Privacy Policy', 'Security Architecture',
    'API Reference', 'Deployment Guide', 'Architecture Deep Dive', 'Firmware OTA',
    'Calibration Protocols', 'Internal SOPs', 'Grant Portal Guide',
    'Impact Metrics Methodology', 'Farmer Dashboard Guide', 'VRI Worksheet Guide',
    'Hardware Field SOPs', 'Kriging Engine Docs', 'Federated Learning Docs',
    'Data Export Guide', 'GLOBALG.A.P. Control Points', 'Compliance Report Guide',
    'Regulatory Portal Guide', 'Master Meter Calibration Protocols',
    'Water Court Reporting Procedures', 'Tamper Detection Methodology',
    'Investor Dashboard Guide', 'Spatial Privacy Guarantee', 'Data Validation Methods',
];

export default function DocsView() {
    const { user, activeRole } = useAuth();

    const allowed = user && activeRole
        ? new Set(DOCS_SECTIONS[activeRole])
        : new Set(DOCS_SECTIONS['PUBLIC']);

    return (
        <div className="min-h-screen bg-slate-950 px-8 py-10 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-white">FarmSense Documentation</h1>
                <p className="text-slate-500 text-sm mt-1">
                    {user ? `Showing sections available to ${activeRole} role` : 'Showing public sections — sign in for more'}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {ALL_SECTIONS.map(section => {
                    const accessible = allowed.has(section);
                    return (
                        <div key={section}
                            className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-all ${accessible ? 'bg-slate-900 border-slate-700 hover:border-indigo-600/50 cursor-pointer' : 'bg-slate-950 border-slate-800 opacity-40 cursor-not-allowed'}`}>
                            {accessible
                                ? <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                                : <Lock className="w-4 h-4 text-slate-600 shrink-0" />}
                            <span className={`text-sm font-bold ${accessible ? 'text-white' : 'text-slate-600'}`}>{section}</span>
                            {!accessible && (
                                <span className="ml-auto text-[10px] font-bold text-slate-700">Requires elevated role</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
