# Squad Decisions

## Active Decisions

### 2026-04-24: Repository Documentation Structure

**Date:** 2026-04-24  
**Author:** Seldon (Cloud Architect & Lead)  
**Status:** Accepted  
**Requested by:** Marco Antonio Silva

#### Context

The repository needed a comprehensive documentation structure for Azure Hybrid Continuum best practices. The user referenced the AWS Fault Isolation Boundaries whitepaper as structural inspiration and required coverage of: hybrid offerings, sovereign landing zones, cloud exit scenarios, and a concrete enterprise application reference scenario.

#### Decision

Adopted a **9-part whitepaper-style structure** with 53 markdown files across 9 sections plus backlog:

1. **Introduction** (3 chapters) — Concepts, continuum definition, navigation
2. **Azure Hybrid Infrastructure** (5 chapters) — Regions, Azure Local, Arc, Stack HCI, Connectivity
3. **Sovereignty & Compliance** (5 chapters) — Sovereign cloud, SLZ, controls, data residency, compliance
4. **Architecture Patterns** (5 chapters) — Cloud-native, connected, disconnected, cloud exit, workload placement
5. **Sovereign Landing Zone Guide** (6 chapters) — Design areas, identity, network, security, automation, implementation
6. **Cloud Exit Scenarios** (5 chapters) — Assessment, two transition stages, data migration, ops continuity
7. **Reference Scenario** (6 chapters) — Contoso Insurance app through 3 phases of the continuum
8. **Best Practices** (5 chapters) — Design principles, resilience, security, operations, cost
9. **Appendix** (3 chapters) — Glossary, service mapping, resources

#### Key Conventions

- Every MD file includes: title, description, `## Topics to Cover` checklist, diagram placeholders (`<!-- DIAGRAM: ... -->`), official Azure doc links
- Navigation links connect all sections sequentially
- Reference scenario uses a representative enterprise app (Contoso Insurance) with 7 components: Frontend, API, Workers, DB, Files, Queue, Identity
- Backlog contains 100 items: P0 (foundational), P1 (core), P2 (advanced), P3 (polish)
- All content must be grounded in official Microsoft Learn documentation

#### Consequences

- Team has a clear roadmap and can work in parallel (Hardin writes, Seldon diagrams, Venabili reviews)
- The structure supports both linear reading and role-based navigation paths
- Estimated 6 sprints to complete all content

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
