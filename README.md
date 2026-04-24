<p align="center">
  <img src="docs/diagrams/banner.svg" alt="Azure Hybrid Continuum CookBook" width="100%">
</p>

<p align="center">
  <a href="https://emeaappgbb.github.io/AzureHybridContinuumCookBook/"><img src="https://img.shields.io/badge/📖_Read_the_Docs-Live_Site-0078D4?style=for-the-badge" alt="Read the Docs"></a>
</p>

<p align="center">
  <a href="https://azure.microsoft.com"><img src="https://img.shields.io/badge/Azure-Hybrid-0078D4" alt="Azure"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="https://github.com/EmeaAppGbb/AzureHybridContinuumCookBook/actions/workflows/deploy-pages.yml"><img src="https://github.com/EmeaAppGbb/AzureHybridContinuumCookBook/actions/workflows/deploy-pages.yml/badge.svg" alt="Deploy Status"></a>
</p>

# Azure Hybrid Continuum CookBook

> Best practices, patterns, and architectures for building solid hybrid and sovereign cloud solutions with Microsoft Azure.

## 📖 Read Online

**👉 [emeaappgbb.github.io/AzureHybridContinuumCookBook](https://emeaappgbb.github.io/AzureHybridContinuumCookBook/)** — the full documentation rendered as a searchable, enterprise-grade portal with dark mode, Mermaid diagrams, and role-based navigation.

## What Is This?

This CookBook covers the full **Azure Hybrid Continuum** — from cloud-native workloads in Azure public cloud, through hybrid deployments on Azure Local, to fully disconnected and air-gapped sovereign environments. It's a practical, opinionated guide grounded entirely in official Microsoft documentation.

```
  ☁️ Public Cloud  ──▶  🔗 Connected (Azure Local)  ──▶  🛡️ Sovereign  ──▶  🏢 Disconnected
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Cloud-native PaaS      Azure Local + Arc          Sovereign Landing        Air-gapped
  Full Azure services     On-premises + cloud mgmt   Zone with compliance     No cloud dependency
```

## 🗂️ Documentation Structure

| Part | Section | What You'll Learn |
|------|---------|-------------------|
| **1 — Foundation** | [Introduction](docs/01-introduction/) | The Hybrid Continuum concept, how to use this guide |
| | [Azure Hybrid Infrastructure](docs/02-azure-hybrid-infrastructure/) | Azure Local, Azure Arc, Stack HCI, connectivity models |
| | [Sovereignty & Compliance](docs/03-sovereignty-and-compliance/) | Sovereign cloud, data residency, compliance frameworks |
| **2 — Architecture** | [Architecture Patterns](docs/04-architecture-patterns/) | Cloud-native, hybrid connected, disconnected, cloud exit |
| | [Sovereign Landing Zone Guide](docs/05-sovereign-landing-zone-guide/) | Identity, network, security, governance, automation |
| **3 — Scenarios** | [Cloud Exit Scenarios](docs/06-cloud-exit-scenarios/) | Migrating from public → connected → disconnected |
| | [Reference Scenario](docs/07-reference-scenario/) | Contoso Insurance app through the full continuum |
| **4 — Operations** | [Best Practices](docs/08-best-practices/) | Design principles, resilience, security, cost optimization |
| | [Appendix](docs/09-appendix/) | Glossary, Azure service mapping, additional resources |

## 🧭 Where Should I Start?

| Your Role | Recommended Path |
|-----------|-----------------|
| **Cloud Architect** | [Architecture Patterns](docs/04-architecture-patterns/) → [Sovereign Landing Zone](docs/05-sovereign-landing-zone-guide/) → [Reference Scenario](docs/07-reference-scenario/) |
| **Platform Engineer** | [Azure Hybrid Infrastructure](docs/02-azure-hybrid-infrastructure/) → [Sovereign Landing Zone](docs/05-sovereign-landing-zone-guide/) → [Best Practices](docs/08-best-practices/) |
| **Decision Maker** | [Introduction](docs/01-introduction/) → [Architecture Patterns](docs/04-architecture-patterns/) → [Cloud Exit](docs/06-cloud-exit-scenarios/) |
| **Developer** | [Reference Scenario](docs/07-reference-scenario/) → [Service Mapping](docs/09-appendix/02-azure-service-mapping.md) → [Best Practices](docs/08-best-practices/) |

## 📚 Grounding Sources

All content is grounded exclusively in official Microsoft documentation:

- [Microsoft Learn](https://learn.microsoft.com/) — Primary reference
- [Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/) — Reference architectures & patterns
- [Azure Local](https://learn.microsoft.com/en-us/azure/azure-local/) — On-premises Azure infrastructure
- [Sovereign Landing Zone](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/overview-sovereign-landing-zone) — Sovereign cloud guidance
- [Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/) — Adoption methodology
- [Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/) — Quality pillars

## 🏗️ Repository Layout

```
AzureHybridContinuumCookBook/
├── docs/                          # 📖 All documentation (MkDocs source)
│   ├── index.md                   #    Homepage
│   ├── 01-introduction/           #    Part 1: Foundation
│   ├── 02-azure-hybrid-infrastructure/
│   ├── 03-sovereignty-and-compliance/
│   ├── 04-architecture-patterns/  #    Part 2: Architecture & Design
│   ├── 05-sovereign-landing-zone-guide/
│   ├── 06-cloud-exit-scenarios/   #    Part 3: Practical Scenarios
│   ├── 07-reference-scenario/
│   ├── 08-best-practices/         #    Part 4: Cross-Cutting Concerns
│   ├── 09-appendix/
│   ├── diagrams/                  #    Shared SVG assets
│   ├── stylesheets/               #    Custom CSS (Azure theme)
│   └── BACKLOG.md                 #    Work items & priorities
├── mkdocs.yml                     # ⚙️ MkDocs Material configuration
├── requirements.txt               # 📦 Python dependencies (MkDocs)
├── CONTRIBUTING.md                # 🤝 Contribution guidelines
├── LICENSE                        # ⚖️ MIT License
└── .github/workflows/
    └── deploy-pages.yml           # 🚀 Auto-deploy to GitHub Pages
```

## 🤝 Contributing

We welcome contributions! Whether it's fixing a typo, improving a diagram, or writing a new section — every improvement helps.

1. Read the [Contributing Guide](CONTRIBUTING.md)
2. Check the [Backlog](docs/BACKLOG.md) for open work items
3. Submit a Pull Request

All contributions go through a structured review process to ensure technical accuracy against official Azure documentation.

## ⚖️ License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  <sub>Built with ❤️ by the Azure Hybrid Continuum team · Powered by <a href="https://squidfunk.github.io/mkdocs-material/">MkDocs Material</a></sub>
</p>
