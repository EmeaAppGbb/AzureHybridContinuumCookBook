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
