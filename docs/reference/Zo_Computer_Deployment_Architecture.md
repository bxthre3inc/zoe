# Temporary Zo.computer Deployment Strategy (Production Testing & Demos)

This document establishes the **temporary** architectural routing and deployment guidelines. This unified strategy is intended strictly for rapid production testing and demonstrating the Bxthre3 Inc. corporate site alongside its umbrella platforms (e.g., FarmSense) on a single Zo.computer domain before eventual domain separation.

## 1. Unified Routing Architecture

To prevent namespace collisions and ensure clean separation of concerns between marketing pages and functional applications, the domain will enforce the following strict routing boundaries:

### **Bxthre3 Inc. Corporate Namespace (Root)**

The root level routing belongs exclusively to the Bxthre3 Inc. corporate entity.

* `/` : Bxthre3 Inc. Landing Page
* `/about` : Corporate Information
* `/patents` : IP and Patent Portfolio
* `/career` : Open Roles
* `/projects/[project_name]` : Marketing and promotional pages for platforms (e.g., `/projects/farmsense`). *These pages strictly market the platforms; they do not host the application logic.*

### **Platform Application Namespace (Sub-routes)**

Functional platforms and applications operate strictly within their dedicated top-level route.

* `/[platform_name]` : The functional entry point for the specific application (e.g., `/farmsense`).
* `/[platform_name]/*` : All recursive routes belonging to that application (e.g., `/farmsense/dashboard`, `/farmsense/login`).

## 2. Multi-Agent & Multi-IDE Cohesion Plan

Because the Bxthre3 Inc. site and the FarmSense application may be developed asynchronously using different agents or IDE instances, strict enforcement of this architecture is required to avoid deployment conflicts.

### **A. Next.js / React Router Configuration (Base Paths)**

If the FarmSense application is a distinct Next.js or React application being merged into the main Zo.computer host router, it must be configured with a **Base Path** of `/farmsense`.

* All internal links within the FarmSense application must use relative routing resolving under `/farmsense`.
* All static assets (images, CSS) for FarmSense must be prefixed or served from `/farmsense/assets/` to avoid overwriting corporate assets at `/assets/`.

### **B. Reverse Proxy / Next.js Rewrites (Zo.computer Server)**

To serve both projects seamlessly to the end-user on a single URL, the main Zo.computer server (or Next.js instance) will utilize URL rewrites or a lightweight reverse proxy mechanism:

1. Requests to `/`, `/about`, `/projects/*` are routed to the Bxthre3 Inc. frontend architecture.
2. Requests matching `/farmsense` or `/farmsense/*` are cleanly delegated to the FarmSense application build or server block without interfering with the parent site's router.

### **C. Unified Repository Management (Monorepo vs. Independent Builds)**

To ensure this cohesive deployment, Bxthre3 Inc. will utilize one of two architectures on Zo.computer:

* **Option 1 (Recommended): Monorepo Structure.** Using turborepo or Nx, both the Bxthre3 Inc. site (`apps/corporate`) and the FarmSense site (`apps/farmsense`) live in the same repository. This guarantees that shared UI components are synchronized and the deployment script handles both simultaneously.
* **Option 2: Micro-Frontends (Independent Repos).** FarmSense builds to a standalone static export output that is copied into a `/public/farmsense` directory of the main Bxthre3 Inc. server, or proxied via Zo.computer's custom edge routing rules.

## 3. Zo Agent Autonomy & Interaction Boundaries

To ensure rapid development and parallel work streams, **Zo agents are granted full autonomous behavior** equivalent to the engineering agents working on the FarmSense backend.

### **Zo Agent Autonomy Scope**

1. **Full Control of the Root Namespace:** Zo agents have autonomous authority to create, modify, and deploy code within the Bxthre3 Inc. root routing structure (`/`, `/about`, `/projects/*`, etc.).
2. **Autonomous Deployment:** Zo agents are trusted to autonomously manage build scripts, static exports, and edge routing configurations for the Zo.computer deployment environment without requiring manual user micro-management for every file change.
3. **Boundary Respect:** While fully autonomous, Zo agents must strictly respect the `/farmsense` application boundary. They should configure the host router (e.g., Next.js rewrites) to seamlessly proxy traffic to the independent FarmSense build, but they should **not** modify the internal `/farmsense/*` application logic or components.

## 4. Immediate Action Items for Agent Handoff

When instructing Zo agents on the Bxthre3 Inc. site or FarmSense application, cleanly hand off this artifact to enforce the following rules:

1. **Zo Agents:** Operate autonomously to build the main site and configure the proxy for `/farmsense`.
2. **Never** use `/farmsense` for marketing; always use `/projects/farmsense`.
3. Ensure the FarmSense web application is fully contained within the `FARMSENSE_BASE_PATH=/farmsense` environment variable so routing never leaks into the root.
