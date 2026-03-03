# Docs Portal Specification

## Overview

The Docs Portal is the central repository for all FarmSense technical documentation, API references, architecture diagrams, and hardware deployment manuals. It serves both internal engineering teams and external partners utilizing the platform.

## 1. Developer Guidelines

* **API Reference:** Automatically generated (Swagger/OpenAPI) documentation detailing all available REST endpoints for sensor ingestion, grid querying, and compliance reporting.
* **Architecture & Codebase Overview:** In-depth explanations of the decentralized cloud layer (CSE), District Hubs (DHU), and edge-processing mechanics.
* **Deployment Manuals:** Step-by-step instructions for deploying the backend infrastructure (Docker Compose, Kubernetes) and flashing firmware to physical nodes.

## 2. Hardware Deployment & Calibration

* **Field Installation Guides:** Standard Operating Procedures (SOPs) for agronomists and electricians installing VFAs, LRZs, PFAs, and PMTs. Includes antenna positioning guidelines, power integration, and weatherproofing standards.
* **"Master Meter" Calibration Protocols:** The strict, legally mandated procedures for calibrating the PMT/PFA systems against third-party master meters to ensure the required +/- 1% flow accuracy for Regulatory Court submission.

## 3. Platform Policies & Standards

* **Spatial Privacy Policy:** Clear, public-facing documentation on how the system implements Contextual Obfuscation and federated learning to protect farmer data from public exposure or FOIA requests.
* **Security Architecture:** Detailed overviews of the 128-bit AES encryption schemas, FHSS protocols, and LoRaWAN backhauls utilized to meet DoD ESTCP and JADC2 standards.

## 4. Architectural Integration

* **Frontend Stack:** Static Site Generator (e.g., Docusaurus, Nextra, or MkDocs) optimized for ultra-fast text rendering and Markdown ingestion.
* **CI/CD Pipeline:** Fully automated deployment linked directly to the `farmsense-code` repository. Any changes to markdown specifications (like this file) instantly trigger a rebuild and redeployment of the Docs Portal.

---
*Return to [Master Software Index](../SOFTWARE_INDEX.md)*
