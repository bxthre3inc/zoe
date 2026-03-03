# Phase 5: Frontend Deep Dive - Audit Log

## Executive Summary

Phase 5 focused on the UI layers, located within `farmsense-code/frontend/`. The project employs a monorepo-style structure containing multiple distinct frontend applications.

## 1. CC Portal (Command & Control)

- **Stack**: Next.js 14/15 (App Router), TypeScript, TailwindCSS.
- **3D Engine**: Uses `@react-three/fiber` and `@react-three/drei` extensively for 3D spatial rendering.
- **Components**: Example `SpatialOpsOverlay.tsx` accurately maps geographic lat/lon to 3D terrain grids, parsing elevation arrays to simulate asset movement over topology in real-time.
- **State Management**: Zustand is utilized for lightweight, global state management (`useCCStore`).

## 2. FarmSense Portal

- **Stack**: React 19, Vite, React Router DOM, MapLibre-GL.
- **Routing & RBAC**: `App.tsx` establishes a strict Role-Based Access Control (RBAC) architecture using `PrivateRoute` and `RoleRoute` components. Depending on the authenticated JWT, users are redirected to specific siloed views (Admin, Farmer, Grant Reviewer, Regulatory, etc.).
- **Stubs**: The codebase currently utilizes several "lazy stubs" (e.g., `AdminView.tsx`, `FarmerView.tsx`), indicating an ongoing migration to unify the distinct micro-frontends into this single, role-gated master portal.

## Next Steps

Phase 5 is complete. All codebase surfaces have been audited. Proceeding to Phase 6 to finalize the `assessment_report.md` and conclude the third-party assessment.
