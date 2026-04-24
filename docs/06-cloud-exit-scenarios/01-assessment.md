# Workload Assessment

## Introduction

Before moving any workload along the hybrid continuum, a thorough assessment is required. This chapter provides a structured framework for evaluating workloads and determining their cloud exit readiness, migration complexity, and target deployment model.

## Topics to Cover

- [ ] Assessment framework overview
- [ ] Workload inventory and classification:
  - Application components (frontend, backend, workers, databases)
  - Azure PaaS service dependencies
  - External service dependencies (SaaS, third-party APIs)
  - Data classification and volume
- [ ] Cloud exit readiness scoring:
  - PaaS coupling score: how tightly bound to Azure PaaS?
  - Data gravity score: how much data needs to move?
  - Operational complexity score: how complex is the deployment?
  - Business criticality: can the workload tolerate migration downtime?
- [ ] Dependency mapping:
  - Service-to-service dependencies
  - PaaS-to-self-hosted replacement mapping
  - Shared services and platform dependencies
- [ ] Migration strategy selection:
  - **Rehost** (lift and shift): move VMs/containers directly
  - **Replatform**: change PaaS to IaaS equivalent
  - **Rearchitect**: redesign for the target environment
- [ ] Risk assessment and mitigation planning
- [ ] Assessment tools: Azure Migrate, Azure Resource Graph, custom scripts

<!-- DIAGRAM: Assessment flowchart showing: Inventory → Classify → Score Readiness → Map Dependencies → Select Strategy → Risk Assessment → Migration Plan, with decision gates between each step -->

<!-- DIAGRAM: PaaS-to-self-hosted service mapping table showing Azure PaaS services (left column) and their self-hosted equivalents for connected and disconnected environments (right columns) -->

## References

- [Azure Migrate — Assessment](https://learn.microsoft.com/en-us/azure/migrate/concepts-assessment-calculation)
- [Azure Resource Graph](https://learn.microsoft.com/en-us/azure/governance/resource-graph/)
- [Cloud Adoption Framework — Assess](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/assess/)

---

> **Next:** [Public Cloud → Connected Azure Local →](02-public-to-connected.md)
