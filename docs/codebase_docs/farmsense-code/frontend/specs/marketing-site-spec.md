# Marketing Site Specification

## Overview

The Marketing Site is the primary public-facing portal for FarmSense. It acts as the "top of funnel" landing environment designed to communicate the dense, highly-technical value proposition of the Deterministic Farming Operating System to a broad audience of farmers, water district managers, foundations, and Federal acquisition officers.

## 1. Value Proposition Messaging

* **The "Deterministic" Philosophy:** Focuses the core messaging on the shift from "Estimated Agriculture" (guessing based on sparse soil probes) to "Deterministic Agriculture" (calculating the exact status of the field using Empirical Bayesian Kriging and massive sensor redundancy).
* **San Luis Valley Crisis Context:** Explicitly grounds the technology in the existential reality of the SLV unconfined aquifer depletion, demonstrating the immediate, non-theoretical need for the system.
* **Return on Investment (ROI):** Clear, interactive calculators allowing prospective farmers to estimate their precise savings regarding the $500/acre-foot groundwater pumping fees versus the cost of a FarmSense rollout.

## 2. Technical Architecture Showcase

* **Node Teardowns:** High-fidelity 3D renders and exploded views of the PMT ($1,090), PFA ($603), VFA ($319), and LRZ ($50) hardware, emphasizing their ruggedized (IP68 Polycarbonate, Li-SOCl2 primary cells, ARM MCU) engineering.
* **The "CSE" Engine:** Simplifying the concept of spatial interpolation (1m Regression Kriging) and the decentralized edge computing capabilities (PMT Edge-EBK) for non-technical stakeholders.

## 3. Dual-Use & Federal Applicability

* **Federal ESG & Inter-agency Relevance:** A dedicated silo highlighting the military applications of the technology. This section emphasizes the Low Probability of Intercept/Detection (LPI/LPD) features of the LRZ chirps, the 128-bit AES FHSS protocols, and the potential for the Regional Superstations (RSS) to utilize Fully Homomorphic Encryption (FHE).

## 4. Architectural Integration

* **Frontend Stack:** React, Next.js (for optimal SEO and server-side rendering). TailwindCSS for rapid layout iteration, and Framer Motion for complex scroll-driven animations of the hardware nodes.
* **Lead Generation Engine:** Integration with in-Admin portal CRM (open sourced) to capture interest from prospect farmers and government entities.

---
*Return to [Master Software Index](../../SOFTWARE_INDEX.md)*
