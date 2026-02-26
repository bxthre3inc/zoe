import { Routes, Route } from 'react-router-dom';
import GrantDiscovery from '../grants/GrantDiscovery';
import ApplicationManager from '../grants/ApplicationManager';
import AwardTracker from '../grants/AwardTracker';

export default function GrantsView() {
    return (
        <Routes>
            <Route index element={<GrantDiscovery />} />
            <Route path="apply" element={<ApplicationManager />} />
            <Route path="awards" element={<AwardTracker />} />
        </Routes>
    );
}
