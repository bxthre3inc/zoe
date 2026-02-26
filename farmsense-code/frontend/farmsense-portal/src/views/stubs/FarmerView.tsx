import { Routes, Route } from 'react-router-dom';
import ARFieldVision from '../farmer/ARFieldVision';
import ForecastWidget from '../farmer/ForecastWidget';
import HardwareDiagnostics from '../farmer/HardwareDiagnostics';
import TelemetryOverlay from '../farmer/TelemetryOverlay';
import WeatherHUD from '../farmer/WeatherHUD';
import AgriMap from '../farmer/map/AgriMap';

export default function FarmerView() {
    return (
        <Routes>
            <Route index element={
                <div className="p-6 space-y-6">
                    <h1 className="text-xl font-black text-white">Field Operations</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <WeatherHUD />
                        <ForecastWidget />
                    </div>
                    <AgriMap />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <TelemetryOverlay />
                        <HardwareDiagnostics />
                    </div>
                </div>
            } />
            <Route path="ar" element={<ARFieldVision />} />
            <Route path="irrigation" element={<AgriMap />} />
        </Routes>
    );
}
