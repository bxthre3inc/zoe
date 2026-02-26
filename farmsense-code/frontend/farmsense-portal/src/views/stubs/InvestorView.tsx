import { Routes, Route } from 'react-router-dom';
import { InvestorLanding } from '../investor/InvestorLanding';
import { HolographicGlobe } from '../investor/HolographicGlobe';
import { HQMilestones } from '../investor/HQMilestones';
import { EquityBuyIn } from '../investor/EquityBuyIn';
import { SeedAgreementPortal } from '../investor/SeedAgreementPortal';

export default function InvestorView() {
    return (
        <Routes>
            <Route index element={<InvestorLanding onExplore={() => { }} />} />
            <Route path="fleet" element={<HolographicGlobe />} />
            <Route path="milestones" element={<HQMilestones />} />
            <Route path="equity" element={<EquityBuyIn />} />
            <Route path="seed" element={<SeedAgreementPortal />} />
        </Routes>
    );
}
