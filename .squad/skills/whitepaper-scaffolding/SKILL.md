---
name: "whitepaper-scaffolding"
description: "Scaffold a whitepaper-style documentation repository with progressive deep-dive structure"
domain: "documentation, architecture"
confidence: "high"
source: "earned — built from AWS Fault Isolation Boundaries whitepaper structure adapted for Azure"
---

## Context
When building a comprehensive technical documentation repository (CookBook, whitepaper, or guide) that needs to cover a complex technical domain from concepts through implementation to practical scenarios.

## Patterns
1. **Progressive Deep-Dive Flow**: Concepts → Building Blocks → Patterns → Implementation Guide → Practical Scenarios → Best Practices → Appendix
2. **Numbered Sections with README.md**: Each section gets a numbered folder (01-name, 02-name) with a README.md as the section landing page and numbered chapter files inside
3. **Chapter Template**: Every file gets: Title, Introduction paragraph, `## Topics to Cover` checklist, `<!-- DIAGRAM: description -->` placeholders, `## References` with official doc links, navigation footer
4. **Backlog Structure**: P0 (foundational) → P1 (core content) → P2 (advanced/scenarios) → P3 (polish). Each item has: ID, Title, Owner, Dependencies, Status
5. **Role-Based Navigation**: Main README includes quick navigation by role (Architect, Engineer, Decision Maker, Developer) with recommended reading paths
6. **Reference Scenario**: Include a concrete, representative enterprise application that demonstrates all patterns and phases

## Examples
- Structure: `docs/{01-introduction, 02-building-blocks, 03-patterns, ..., 09-appendix}/README.md`
- Diagram placeholder: `<!-- DIAGRAM: High-level architecture showing component X connected to Y -->`
- Backlog item: `| P1-03 | Write Azure Local deep dive | Hardin (Writer) | P0-02 | 🔲 Todo |`

## Anti-Patterns
- Don't create flat file structures — use numbered folders for reading order
- Don't create empty files — every file should have scaffolding content with topics and references
- Don't skip the reference scenario — abstract patterns without a concrete example are harder to understand
- Don't hardcode content inline — use checklist-style topics that can be expanded later
