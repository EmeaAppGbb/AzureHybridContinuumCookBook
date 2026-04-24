# Architecture Decisions

## Introduction

This chapter documents the key Architecture Decision Records (ADRs) made during the design and migration of the Contoso Insurance Platform through the hybrid continuum. Each decision records the context, options considered, decision rationale, and consequences.

## Topics to Cover

- [ ] ADR template and process used
- [ ] Key architecture decisions:
  - **ADR-001**: Container orchestration — AKS → AKS Hybrid → K3s
  - **ADR-002**: Database strategy — Azure SQL → Arc-enabled SQL MI → SQL Server on VMs
  - **ADR-003**: Message broker — Azure Service Bus → RabbitMQ
  - **ADR-004**: Object storage — Azure Blob → MinIO
  - **ADR-005**: Identity provider — Azure AD → AD DS + ADFS
  - **ADR-006**: Monitoring stack — Azure Monitor → Prometheus + Grafana
  - **ADR-007**: Secret management — Azure Key Vault → HashiCorp Vault
  - **ADR-008**: Container registry — ACR → Harbor
  - **ADR-009**: CI/CD pipeline — GitHub Actions → Local GitLab CI
  - **ADR-010**: Network architecture — per-phase network topology decisions
- [ ] Trade-off analysis for each decision
- [ ] Decisions that would change if starting from scratch (lessons for greenfield)

<!-- DIAGRAM: Decision dependency graph showing which ADRs depend on or influence other ADRs — e.g., ADR-001 (container orchestration) influences ADR-008 (registry) and ADR-009 (CI/CD) -->

## References

- [Architecture Decision Records](https://adr.github.io/)
- [Azure Architecture Center — Design Principles](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/)

---

> **Next:** [Lessons Learned →](06-lessons-learned.md)
