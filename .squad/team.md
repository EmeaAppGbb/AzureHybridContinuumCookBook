# Squad Team

> AzureHybridContinuumCookBook — Best practices, patterns, and designs for building solid hybrid and sovereign cloud architectures on Azure.

## Coordinator

| Name | Role | Notes |
|------|------|-------|
| Squad | Coordinator | Routes work, enforces handoffs and reviewer gates. |

## Members

| Name | Role | Charter | Status |
|------|------|---------|--------|
| Seldon | Cloud Architect & Lead | `.squad/agents/seldon/charter.md` | 🏗️ Active |
| Hardin | Technical Writer | `.squad/agents/hardin/charter.md` | 📝 Active |
| Venabili | Technical Reviewer | `.squad/agents/venabili/charter.md` | 🔍 Active |
| Mallow | DevRel & Issue Triage | `.squad/agents/mallow/charter.md` | 💬 Active |
| Scribe | Session Logger & Memory | `.squad/agents/scribe/charter.md` | 📋 Active |
| Ralph | Work Monitor | `.squad/agents/ralph/charter.md` | 🔄 Active |

## Project Context

- **Owner:** Marco Antonio Silva
- **Project:** AzureHybridContinuumCookBook — Documentation repository for Azure Local and the full Azure Hybrid offering
- **Stack:** Markdown, Mermaid diagrams, Documentation
- **Created:** 2026-04-24

## Grounding Sources

All team members MUST ground their work in official Microsoft documentation:
- **Microsoft Learn:** https://learn.microsoft.com/
- **Azure Architecture Center:** https://learn.microsoft.com/en-us/azure/architecture/
- **Azure Local:** https://learn.microsoft.com/en-us/azure/azure-local/
- **Sovereign Landing Zone:** https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/overview-sovereign-landing-zone

## Review Process

1. Hardin writes documentation → Seldon reviews for architecture & diagrams → Venabili validates against official Azure docs
2. Humans review PRs before merging to main
3. On rejection, a different agent revises (never the original author)
