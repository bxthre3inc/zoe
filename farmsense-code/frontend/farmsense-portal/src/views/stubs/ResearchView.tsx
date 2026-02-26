import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FlaskConical, Globe, BookOpen, BarChart2, Cpu, Layers, Database, Beaker } from 'lucide-react';
import BasinAnalytics from '../research/BasinAnalytics';
import FederatedExperimentConsole from '../research/FederatedExperimentConsole';
import FieldTrialDesignEngine from '../research/FieldTrialDesignEngine';
import LabIntegrationBridge from '../research/LabIntegrationBridge';
import MatrixDataStream from '../research/MatrixDataStream';
import OpenDataRepository from '../research/OpenDataRepository';
import SatelliteCovariateExplorer from '../research/SatelliteCovariateExplorer';
import SPACModelSandbox from '../research/SPACModelSandbox';
import ZoKrigingWorksheetInspector from '../research/ZoKrigingWorksheetInspector';
import ParameterDial from '../research/ParameterDial';
import { useNavigate, useLocation } from 'react-router-dom';

const TABS = [
    { label: 'Kriging', path: '/research', icon: <Layers className="w-3.5 h-3.5" /> },
    { label: 'Satellite', path: '/research/satellite', icon: <Globe className="w-3.5 h-3.5" /> },
    { label: 'Federated', path: '/research/federated', icon: <Cpu className="w-3.5 h-3.5" /> },
    { label: 'Field Trials', path: '/research/trials', icon: <FlaskConical className="w-3.5 h-3.5" /> },
    { label: 'SPAC', path: '/research/spac', icon: <Beaker className="w-3.5 h-3.5" /> },
    { label: 'Open Data', path: '/research/opendata', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: 'Basin', path: '/research/basin', icon: <BarChart2 className="w-3.5 h-3.5" /> },
    { label: 'Lab Bridge', path: '/research/lab', icon: <Database className="w-3.5 h-3.5" /> },
];

function ResearchNav() {
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

export default function ResearchView() {
    return (
        <div className="flex flex-col h-full">
            <ResearchNav />
            <div className="flex-1 overflow-y-auto">
                <Routes>
                    <Route index element={<ZoKrigingWorksheetInspector />} />
                    <Route path="satellite" element={<SatelliteCovariateExplorer />} />
                    <Route path="federated" element={<FederatedExperimentConsole />} />
                    <Route path="trials" element={<FieldTrialDesignEngine />} />
                    <Route path="spac" element={<SPACModelSandbox />} />
                    <Route path="opendata" element={<OpenDataRepository />} />
                    <Route path="basin" element={<BasinAnalytics />} />
                    <Route path="lab" element={<LabIntegrationBridge />} />
                    <Route path="matrix" element={<MatrixDataStream />} />
                    <Route path="params" element={<ParameterDial />} />
                </Routes>
            </div>
        </div>
    );
}
