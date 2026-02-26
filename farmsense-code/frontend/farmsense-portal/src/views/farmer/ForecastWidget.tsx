import React, { useEffect, useState } from 'react';
import { TrendingUp, CloudRain, ThermometerSun, AlertTriangle, Loader2 } from 'lucide-react';
import { getApiKey } from '../services/api';

interface DailyForecast {
    day: number;
    date: string;
    avg_moisture: number;
    avg_temperature: number;
    stress_index: number;
}

interface ForecastData {
    field_id: string;
    forecast_days: number;
    predictions: DailyForecast[];
}

const ForecastWidget: React.FC<{ fieldId?: string }> = ({ fieldId = 'field_01' }) => {
    const [data, setData] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                setLoading(true);
                // Using local proxy or direct API URL depending on setup. Assuming standard port 8000 for backend API
                const token = getApiKey();
                const headers: HeadersInit = {
                    'Content-Type': 'application/json',
                };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`; // Just in case, though the API doesn't strictly check
                }
                const res = await fetch(`http://localhost:8000/api/v1/analytics/forecast?field_id=${fieldId}`, { headers });
                if (!res.ok) throw new Error('Failed to fetch forecast');
                const json = await res.json();
                setData(json);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchForecast();
    }, [fieldId]);

    if (loading) {
        return (
            <div className="glass-card p-6 h-64 flex flex-col items-center justify-center border-l-4 border-indigo-500">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-4" />
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Initialising ML Forecast Engine...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="glass-card p-6 h-64 flex flex-col items-center justify-center border-l-4 border-red-500 bg-red-500/5">
                <AlertTriangle className="w-8 h-8 text-red-400 mb-4" />
                <p className="text-sm text-red-200">{error || 'Forecast unavailable'}</p>
            </div>
        );
    }

    // Find max values to scale the bars
    const maxMoisture = Math.max(...data.predictions.map(d => d.avg_moisture), 0.5); // Ensure scale goes to at least 0.5 vWC
    const maxTemp = Math.max(...data.predictions.map(d => d.avg_temperature), 40);

    return (
        <div className="glass-card p-6 flex flex-col h-full border-l-4 border-indigo-500 bg-indigo-500/5 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                        {data.forecast_days}-Day Predictive Forecast
                    </h3>
                    <p className="text-xs text-indigo-200/60 font-medium tracking-tight mt-1">Random Forest / Kriging Ensembles - Field {data.field_id}</p>
                </div>
                <div className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    Live Model
                </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-2 relative z-10 h-48 mt-4 border-b border-indigo-500/20 pb-2">
                {/* Y-axis labels for Moisture */}
                <div className="absolute -left-2 top-0 bottom-2 w-8 hidden md:flex flex-col justify-between text-[8px] text-slate-500 font-bold items-end pr-2">
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                </div>

                {data.predictions.map((day, idx) => {
                    const moistureHeight = `${(day.avg_moisture / maxMoisture) * 100}%`;
                    const dayDate = new Date(day.date);
                    const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
                    const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;

                    return (
                        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group/bar relative">
                            {/* Tooltip */}
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-900 border border-indigo-500/50 rounded-lg p-2 opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-20 min-w-24 shadow-xl whitespace-nowrap">
                                <p className="text-[10px] font-bold text-white mb-1 border-b border-white/10 pb-1">{day.date}</p>
                                <p className="text-[9px] text-blue-400 flex items-center gap-1"><CloudRain className="w-3 h-3" /> {(day.avg_moisture * 100).toFixed(1)}% vWC</p>
                                <p className="text-[9px] text-orange-400 flex items-center gap-1 mt-0.5"><ThermometerSun className="w-3 h-3" /> {day.avg_temperature.toFixed(1)}°C</p>
                                <p className="text-[9px] text-rose-400 flex items-center gap-1 mt-0.5"><AlertTriangle className="w-3 h-3" /> Stress: {(day.stress_index * 100).toFixed(0)}%</p>
                            </div>

                            {/* Stress Indicator Line (Top) */}
                            <div
                                className="w-full bg-rose-500/50 mb-1 rounded-t-sm"
                                style={{ height: `${day.stress_index * 10}px` }}
                            ></div>

                            {/* Temp/Moisture Stacked Bar */}
                            <div
                                className={`w-full max-w-[24px] rounded-t-sm transition-all duration-500 relative flex flex-col justify-end overflow-hidden
                  ${isWeekend ? 'bg-indigo-500/20 border-t border-indigo-400/50' : 'bg-blue-500/20 border-t border-blue-400/50'} 
                  group-hover/bar:bg-indigo-400/40`}
                                style={{ height: moistureHeight }}
                            >
                                <div className="absolute bottom-0 w-full bg-blue-500/40" style={{ height: '100%' }}></div>
                            </div>

                            {/* X-axis Label */}
                            <div className="mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                {idx === 0 ? 'Tdy' : dayName}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5 relative z-10 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-blue-500/50 border border-blue-400"></span> Moisture (vWC)</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-rose-500/50"></span> Stress Index</div>
                </div>
            </div>
        </div>
    );
};

export default ForecastWidget;
