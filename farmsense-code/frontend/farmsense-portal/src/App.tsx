import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ROLE_HOME } from './auth/types';
import { PrivateRoute, RoleRoute } from './shell/RouteGuards';
import RoleShell from './shell/RoleShell';
import LoginPage from './shell/LoginPage';

// Views — Grant
import GrantReviewerView from './views/grants/GrantReviewerView';

// Lazy stubs — replaced with real components as migration progresses
import AdminView from './views/stubs/AdminView';
import FarmerView from './views/stubs/FarmerView';
import ResearchView from './views/stubs/ResearchView';
import GrantsView from './views/stubs/GrantsView';
import ComplianceView from './views/stubs/ComplianceView';
import RegulatoryView from './views/stubs/RegulatoryView';
import InvestorView from './views/stubs/InvestorView';
import DocsView from './views/stubs/DocsView';
import MarketingView from './views/stubs/MarketingView';

function RootRedirect() {
  const { isAuthenticated, activeRole } = useAuth();
  if (!isAuthenticated) return <Navigate to="/marketing" replace />;
  if (activeRole) return <Navigate to={ROLE_HOME[activeRole]} replace />;
  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes — no shell */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/marketing" element={<MarketingView />} />
          <Route path="/docs" element={<DocsView />} />

          {/* Protected routes — inside RoleShell */}
          <Route path="/admin/*" element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ADMIN']}>
                <RoleShell><AdminView /></RoleShell>
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/grants/review*" element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ADMIN', 'GRANT_REVIEWER']}>
                <RoleShell><GrantReviewerView /></RoleShell>
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/grants/*" element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ADMIN', 'GRANT_MANAGER']}>
                <RoleShell><GrantsView /></RoleShell>
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/farmer/*" element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ADMIN', 'FARMER']}>
                <RoleShell><FarmerView /></RoleShell>
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/research/*" element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ADMIN', 'RESEARCHER']}>
                <RoleShell><ResearchView /></RoleShell>
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/compliance/*" element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ADMIN', 'AUDITOR']}>
                <RoleShell><ComplianceView /></RoleShell>
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/regulatory/*" element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ADMIN', 'REGULATOR']}>
                <RoleShell><RegulatoryView /></RoleShell>
              </RoleRoute>
            </PrivateRoute>
          } />

          <Route path="/investor/*" element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['ADMIN', 'INVESTOR']}>
                <RoleShell><InvestorView /></RoleShell>
              </RoleRoute>
            </PrivateRoute>
          } />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
