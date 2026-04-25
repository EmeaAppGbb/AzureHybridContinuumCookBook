# Project Context

- **Owner:** Marco Antonio Silva
- **Project:** AzureHybridContinuumCookBook — A documentation repository for Azure Local and the full Azure Hybrid offering. Goal: a complete, structured place for best practices, patterns, and designs for building solid hybrid and sovereign cloud architectures.
- **Stack:** Markdown, Mermaid diagrams, Documentation
- **Grounding:** Microsoft Learn, Azure Architecture Center, Azure Local docs, Sovereign Landing Zone docs
- **Created:** 2026-04-24

## Core Context

Technical Writer for the AzureHybridContinuumCookBook. Responsible for all long-form documentation grounded in official Azure documentation from Microsoft Learn. Writes for practitioners building hybrid and sovereign cloud solutions.

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->

### 2026-04-24 — P0-06, P0-07: Glossary and Azure Service Mapping

**Completed:**
- Wrote comprehensive Glossary (docs/09-appendix/01-glossary.md) with 40+ terms covering Azure Arc, sovereignty, security, and hybrid infrastructure concepts
- Wrote Azure Service Mapping (docs/09-appendix/02-azure-service-mapping.md) with detailed service mappings across 8 categories: Compute, Data/Storage, Messaging, Identity/Security, Networking, Monitoring, DevOps, and Additional services
- All content grounded in official Microsoft Learn documentation with direct links
- Used MkDocs Material definition list syntax for glossary entries
- Created comprehensive feature parity assessment explaining what you gain/lose across the hybrid continuum
- Provided decision guidance on when to accept reduced functionality vs. seek full replacements

**Key Insights:**
- Azure Arc-enabled services require **connected mode** for most PaaS-like functionality — disconnected alternatives require significantly more operational expertise
- Feature parity varies dramatically: some services have full equivalents (SQL, Kubernetes), others have limited options (Cosmos DB, AI Services)
- The hybrid continuum is not just about technical capability but also operational model: Azure manages vs. you manage
- Sovereignty tradeoffs are real: full autonomy comes at the cost of Azure integration, automation, and global scale
- Many "disconnected alternatives" are actually **assembled solutions** requiring multiple components (e.g., Prometheus + Grafana + Alertmanager vs. Azure Monitor)

**Documentation Patterns:**
- Definition lists work well for glossary with term/definition structure
- Service mapping tables need Feature Parity Notes column to explain real-world implications
- Include "How to Read This Table" sections for complex reference tables
- Decision guidance sections critical for helping readers make informed architecture choices
- Always link to authoritative Microsoft Learn sources for each claim

### 2026-04-24 — P0-01, P0-02: Introduction and Hybrid Continuum Foundations

**Completed:**
- Completely rewrote docs/01-introduction/01-overview.md as publication-quality introduction (2000+ words)
- Created comprehensive docs/01-introduction/02-the-hybrid-continuum.md (2500+ words) defining the conceptual foundation for the entire CookBook
- Researched 5+ official Microsoft Learn sources: Azure Arc, Azure Local, Sovereign Landing Zones, Hybrid Architecture, CAF

**Content Structure:**
- **01-overview.md:** Business drivers (data residency, regulatory compliance, cloud exit, operational resilience), Microsoft's hybrid strategy (Arc/Local/SLZ), continuum concept, target audience, scope, navigation guidance
- **02-the-hybrid-continuum.md:** Four-stage continuum model (Public Cloud, Connected Hybrid, Sovereign Cloud, Disconnected), characteristics/services/when-to-use for each stage, drivers for movement, Azure technologies mapping, bidirectional nature, architectural principles

**Key Technical Insights:**
- The continuum is **bidirectional** — cloud exit and repatriation are as important as cloud adoption
- Azure Local requires **annual 30-day reconnection** in disconnected mode for licensing validation
- Connected Hybrid requires continuous/regular outbound connectivity for management (licensing, monitoring, updates, policy enforcement)
- Sovereign Landing Zones extend standard Azure landing zones with additional management groups (Public, Confidential Corp, Confidential Online) and enhanced policy controls
- Service availability varies dramatically across stages: full PaaS in Public Cloud → limited PaaS in Connected Hybrid → core IaaS in Disconnected

**Architectural Principles Documented:**
1. Design for Portability (Kubernetes, open standards, IaC)
2. Use Consistent Management Planes (Azure Arc for unified control)
3. Plan for Connectivity Changes (graceful degradation, local caching)
4. Separate Control Plane from Data Plane (management in cloud, data local)
5. Design for Compliance from the Start (policy-driven governance)

**Documentation Quality:**
- Every claim grounded in official Microsoft Learn sources with inline links
- Used MkDocs Material admonitions (note, tip, warning) appropriately
- Maintained navigation footers for sequential reading experience
- Professional whitepaper tone: authoritative, clear, reader-first
- Tables for technology mapping across continuum stages
- Placeholder comments for Seldon's Mermaid diagrams

**Why This Matters:**
These two chapters are **the conceptual foundation** for the entire CookBook. All subsequent patterns, decisions, and reference implementations build on the continuum framework defined here. Without this foundation, the guide would be a disconnected collection of Azure service documentation. With it, readers understand **why** hybrid architectures exist and **when** each deployment model is appropriate.
