# Project Context

- **Owner:** Marco Antonio Silva
- **Project:** AzureHybridContinuumCookBook — A documentation repository for Azure Local and the full Azure Hybrid offering. Goal: a complete, structured place for best practices, patterns, and designs for building solid hybrid and sovereign cloud architectures.
- **Stack:** Markdown, Mermaid diagrams, Documentation
- **Grounding:** Microsoft Learn, Azure Architecture Center, Azure Local docs, Sovereign Landing Zone docs
- **Created:** 2026-04-24

## Core Context

Cloud Architect & Lead for the AzureHybridContinuumCookBook. Responsible for architecture decisions, Mermaid diagrams, solution design, and technical review gate. All documentation must be grounded in official Azure documentation from Microsoft Learn.

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->

### 2026-04-24 — Repository Scaffolding & Architecture Design

**Decision: 9-Part Whitepaper Structure**
Designed and implemented a 9-part documentation structure inspired by AWS Fault Isolation Boundaries whitepaper flow (Abstract → Infrastructure → Service Types → Best Practices → Conclusion), adapted for Azure Hybrid Continuum:
1. Introduction (concepts, continuum definition)
2. Azure Hybrid Infrastructure (Regions, Azure Local, Arc, Stack HCI, Connectivity)
3. Sovereignty & Compliance (sovereign cloud, SLZ, controls, data residency, frameworks)
4. Architecture Patterns (cloud-native, connected, disconnected, cloud exit, workload placement)
5. Sovereign Landing Zone Guide (design areas, identity, network, security, automation, implementation)
6. Cloud Exit Scenarios (assessment, public→connected, connected→disconnected, data migration, ops continuity)
7. Reference Scenario — Contoso Insurance (enterprise app through all 3 phases of continuum)
8. Best Practices (design principles, resilience, security, operations, cost)
9. Appendix (glossary, service mapping, resources)

**Key File Paths:**
- `docs/README.md` — Main entry point / TOC
- `docs/BACKLOG.md` — 100 prioritized work items across P0-P3
- `docs/07-reference-scenario/` — Contoso Insurance enterprise app (Frontend, API, Workers, DB, Files, Queue)
- `docs/09-appendix/02-azure-service-mapping.md` — Critical PaaS-to-self-hosted mapping table

**Architecture Decisions:**
- Structure follows a progressive deep-dive: concepts → building blocks → patterns → implementation → scenarios → practices
- Each MD file has: title, description, Topics to Cover checklist, diagram placeholders, official Azure doc links
- Reference scenario uses Contoso Insurance: React frontend, .NET 8 API/Workers, SQL Server, message broker — representative enterprise app
- Diagram placeholders use `<!-- DIAGRAM: description -->` comments for Seldon to fill
- The "hybrid continuum" is defined as 5 deployment models: Fully Public → Hybrid Connected → Azure Local Connected → Azure Local Intermittent → Azure Local Disconnected (Air-Gapped)
- Backlog uses 100 items: 49 writing (Hardin), 38 diagrams (Seldon), 13 reviews (Venabili)

**User Preferences:**
- Marco wants AWS whitepaper quality/structure applied to Azure content
- Cloud exit from public cloud to connected to disconnected is a key narrative arc
- All content must be grounded in official Microsoft Learn documentation
- Mermaid diagrams are required for all architecture explanations

### 2026-04-24 — GitHub Pages with MkDocs Material

**Decision: MkDocs Material for Documentation Portal**
Set up a complete GitHub Pages deployment using MkDocs with Material theme, Azure enterprise color scheme, and automated CI/CD.

**Key File Paths:**
- `mkdocs.yml` — MkDocs configuration with full navigation, Material theme, Azure palette
- `docs/stylesheets/extra.css` — Custom CSS: Azure gradients, Fluent UI colors, enterprise table/admonition styling
- `.github/workflows/deploy-pages.yml` — GitHub Actions: triggers on docs changes, builds MkDocs, deploys to gh-pages
- `requirements.txt` — Python deps: mkdocs-material, mkdocs-minify-plugin, pymdown-extensions
- `docs/index.md` — Homepage (renamed from `docs/README.md` for MkDocs convention)

**Architecture Decisions:**
- MkDocs Material chosen over Jekyll/Hugo/Docusaurus for native Mermaid, admonitions, dark mode, and zero-JS-build simplicity
- `navigation.indexes` feature enables section README.md files to serve as section landing pages
- Azure color palette: Primary #0078D4, Accent #50e6ff, with gradient headers and Fluent UI neutrals
- Workflow uses `peaceiris/actions-gh-pages@v4` for atomic deploys to `gh-pages` branch
- Concurrency group prevents parallel deployments
- Homepage renamed to `index.md` (MkDocs convention) — `git mv` preserves history

**User Action Required:**
- Marco needs to enable GitHub Pages in repo settings: Source → `gh-pages` branch

### 2026-04-24 — Hybrid Continuum Spectrum Diagrams (P0-03)

**Task: Create comprehensive Mermaid diagrams for the Hybrid Continuum model**
Added two foundational diagrams to `docs/01-introduction/02-the-hybrid-continuum.md` to visually communicate the four-stage continuum model.

**Diagram 1: Main Spectrum Diagram (graph LR)**
- Shows four stages as a left-to-right progression with bidirectional arrows
- Stage 1 (Public Cloud): Full Azure connectivity, complete PaaS catalog (AKS, Functions, Cosmos DB, Azure ML)
- Stage 2 (Connected Hybrid): Azure Local + Arc with hybrid ARM management (AKS-HCI, Arc-enabled SQL MI)
- Stage 3 (Sovereign Cloud): Sovereign Landing Zones with enhanced controls (Customer Lockbox, Confidential Computing)
- Stage 4 (Disconnected): Air-gapped infrastructure with local-only operations (local K8s, Prometheus/Grafana)
- Uses subgraphs for each stage showing: connectivity model, control plane, available services
- Color-coded: Blue (#0078d4) → Cyan (#50e6ff) → Gold (#ffb900) → Red (#e74856) to show progression
- Bidirectional arrows show movement is not one-way: cloud adoption ←→ repatriation

**Diagram 2: Decision Factors Diagram (graph TD)**
- Decision tree showing key drivers that position organizations along the continuum
- Start node branches based on: regulatory requirements → latency needs → cost/workload characteristics
- Maps decision outcomes to appropriate continuum stages
- Shows common transition paths with dotted lines (e.g., "New regulations" → repatriation)
- Highlights drivers: data sovereignty laws, air-gap requirements, local processing needs, cost optimization, rapid innovation

**Design Choices:**
- Used `graph LR` for spectrum (horizontal continuum metaphor) and `graph TD` for decision tree (top-down flow)
- Subgraphs group related components within each stage for readability
- Emoji icons provide visual landmarks (🌐 connectivity, 🔒 sovereignty, ❌ disconnected)
- CSS classes apply consistent Azure color palette across both diagrams
- Dotted lines distinguish dynamic transitions from static structure

**Grounding:**
- Stage definitions align with official Azure Local docs (connected/disconnected modes)
- Service availability based on Azure Arc and Azure Local documentation from Microsoft Learn
- Sovereign Landing Zone model from Azure Sovereign Cloud documentation

**Learning:**
The Hybrid Continuum is fundamentally about the tension between three forces:
1. **Connectivity** (decreasing left→right): Full cloud → periodic sync → air-gap
2. **Service Richness** (decreasing left→right): Full PaaS → subset PaaS → self-hosted only
3. **Control & Sovereignty** (increasing left→right): Cloud provider managed → hybrid control → full customer control

All architecture patterns in this cookbook are variations on managing these trade-offs.
