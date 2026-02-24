import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthUser, UserRole, UserOrgType } from './types';
import { ROLE_HOME } from './types';

interface AuthContextValue {
    user: AuthUser | null;
    activeRole: UserRole | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    switchRole: (role: UserRole) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue>({
    user: null, activeRole: null,
    login: async () => { }, logout: () => { }, switchRole: () => { },
    isAuthenticated: false,
});

const STORAGE_KEY = 'farmsense_auth';

/* ── Demo Accounts — Internal and External variants per role ────────────────
   Every role supports both org_type values.
   Replace login() with a real POST /api/v1/auth/login for production.        */
const DEMO_USERS: Record<string, AuthUser> = {
    // ── ADMIN ────────────────────────────────────────────────────────────────
    'admin@farmsense.io':
        { id: 'u1', name: 'System Admin', email: 'admin@farmsense.io', org: 'FarmSense', org_type: 'internal', role: 'ADMIN', token: 'demo-admin', expires_at: 9999999999 },
    'sysadmin@partner.org':
        { id: 'u2', name: 'Partner IT Admin', email: 'sysadmin@partner.org', org: 'AgriConsult LLC', org_type: 'external', role: 'ADMIN', token: 'demo-ext-admin', expires_at: 9999999999 },

    // ── GRANT MANAGER ────────────────────────────────────────────────────────
    'grants@farmsense.io':
        { id: 'u3', name: 'Grant Manager', email: 'grants@farmsense.io', org: 'FarmSense', org_type: 'internal', role: 'GRANT_MANAGER', token: 'demo-gm-int', expires_at: 9999999999 },
    'grantconsult@wmgrants.com':
        { id: 'u4', name: 'Grant Consultant', email: 'grantconsult@wmgrants.com', org: 'WM Grant Advisors', org_type: 'external', role: 'GRANT_MANAGER', token: 'demo-gm-ext', expires_at: 9999999999 },

    // ── GRANT REVIEWER ───────────────────────────────────────────────────────
    'reviewer@farmsense.io':
        { id: 'u5', name: 'Internal Reviewer', email: 'reviewer@farmsense.io', org: 'FarmSense', org_type: 'internal', role: 'GRANT_REVIEWER', token: 'demo-gr-int', expires_at: 9999999999 },
    'officer@doestcp.osd.mil':
        { id: 'u6', name: 'DoD Program Officer', email: 'officer@doestcp.osd.mil', org: 'DoD ESTCP', org_type: 'external', role: 'GRANT_REVIEWER', token: 'demo-gr-ext', expires_at: 9999999999 },
    'programs@lorfoundation.org':
        { id: 'u7', name: 'LOR Program Officer', email: 'programs@lorfoundation.org', org: 'LOR Foundation', org_type: 'external', role: 'GRANT_REVIEWER', token: 'demo-gr-lor', expires_at: 9999999999 },

    // ── FARMER ───────────────────────────────────────────────────────────────
    'farmer@farmsense.io':
        { id: 'u8', name: 'Field Operator', email: 'farmer@farmsense.io', org: 'FarmSense', org_type: 'internal', role: 'FARMER', token: 'demo-f-int', expires_at: 9999999999 },
    'grower@slvfarms.com':
        { id: 'u9', name: 'SLV Grower', email: 'grower@slvfarms.com', org: 'SLV Farms', org_type: 'external', role: 'FARMER', token: 'demo-f-ext', expires_at: 9999999999 },

    // ── RESEARCHER ───────────────────────────────────────────────────────────
    'researcher@farmsense.io':
        { id: 'u10', name: 'Data Scientist', email: 'researcher@farmsense.io', org: 'FarmSense', org_type: 'internal', role: 'RESEARCHER', token: 'demo-r-int', expires_at: 9999999999 },
    'pi@colarado.edu':
        { id: 'u11', name: 'University PI', email: 'pi@colorado.edu', org: 'CU Boulder', org_type: 'external', role: 'RESEARCHER', token: 'demo-r-ext', expires_at: 9999999999 },

    // ── AUDITOR ──────────────────────────────────────────────────────────────
    'auditor@farmsense.io':
        { id: 'u12', name: 'Compliance Officer', email: 'auditor@farmsense.io', org: 'FarmSense', org_type: 'internal', role: 'AUDITOR', token: 'demo-a-int', expires_at: 9999999999 },
    'auditor@certbody.org':
        { id: 'u13', name: 'Certification Auditor', email: 'auditor@certbody.org', org: 'GlobalG.A.P. CB', org_type: 'external', role: 'AUDITOR', token: 'demo-a-ext', expires_at: 9999999999 },

    // ── REGULATOR ────────────────────────────────────────────────────────────
    'regulator@farmsense.io':
        { id: 'u15', name: 'Internal Water Counsel', email: 'regulator@farmsense.io', org: 'FarmSense', org_type: 'internal', role: 'REGULATOR', token: 'demo-reg-int', expires_at: 9999999999 },
    'engineer@dwr.state.co.us':
        { id: 'u16', name: 'State Water Engineer', email: 'engineer@dwr.state.co.us', org: 'CO Div. of Water Resources', org_type: 'external', role: 'REGULATOR', token: 'demo-reg-ext', expires_at: 9999999999 },
    'manager@subdistrict1.org':
        { id: 'u17', name: 'SD1 Basin Manager', email: 'manager@subdistrict1.org', org: 'SLV Subdistrict 1', org_type: 'external', role: 'REGULATOR', token: 'demo-reg-sd1', expires_at: 9999999999 },

    // ── INVESTOR ─────────────────────────────────────────────────────────────
    'ir@farmsense.io':
        { id: 'u18', name: 'Investor Relations', email: 'ir@farmsense.io', org: 'FarmSense', org_type: 'internal', role: 'INVESTOR', token: 'demo-inv-int', expires_at: 9999999999 },
    'partner@climatevc.com':
        { id: 'u19', name: 'Climate VC Partner', email: 'partner@climatevc.com', org: 'Climate Ventures', org_type: 'external', role: 'INVESTOR', token: 'demo-inv-ext', expires_at: 9999999999 },
    'analyst@sustainfund.org':
        { id: 'u20', name: 'Sustainability Analyst', email: 'analyst@sustainfund.org', org: 'Sustain Fund', org_type: 'external', role: 'INVESTOR', token: 'demo-inv-sf', expires_at: 9999999999 },

    // ── MULTI-ROLE ───────────────────────────────────────────────────────────
    'tech@farmsense.io':
        { id: 'u14', name: 'Tech Lead', email: 'tech@farmsense.io', org: 'FarmSense', org_type: 'internal', role: ['RESEARCHER', 'GRANT_MANAGER'], token: 'demo-multi', expires_at: 9999999999 },
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(() => {
        try {
            const s = sessionStorage.getItem(STORAGE_KEY);
            return s ? JSON.parse(s) : null;
        } catch { return null; }
    });

    const [activeRole, setActiveRole] = useState<UserRole | null>(() => {
        try {
            const s = sessionStorage.getItem(STORAGE_KEY);
            if (!s) return null;
            const u: AuthUser = JSON.parse(s);
            return Array.isArray(u.role) ? u.role[0] : u.role;
        } catch { return null; }
    });

    const login = useCallback(async (email: string, _password: string) => {
        // TODO: swap with POST /api/v1/auth/login → returns JWT
        const found = DEMO_USERS[email.toLowerCase().trim()];
        if (!found) throw new Error('No account found for that email. Check with your FarmSense administrator.');
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
        setUser(found);
        setActiveRole(Array.isArray(found.role) ? found.role[0] : found.role);
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(STORAGE_KEY);
        setUser(null);
        setActiveRole(null);
    }, []);

    const switchRole = useCallback((role: UserRole) => {
        if (!user) return;
        const roles = Array.isArray(user.role) ? user.role : [user.role];
        if (roles.includes(role)) setActiveRole(role);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, activeRole, login, logout, switchRole, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() { return useContext(AuthContext); }
export { ROLE_HOME };
export type { UserOrgType };
