# Part 6: Cloud Exit Scenarios

This section provides comprehensive guidance on cloud exit—the journey of moving workloads from Azure public cloud to on-premises Azure Local infrastructure. You'll learn how to assess workload readiness, execute a phased migration through connected hybrid first, then progress to fully disconnected sovereign operation. The section covers data migration strategies, operational continuity practices, and risk mitigation throughout the transition.

## What You'll Learn

- How to assess workloads for cloud exit readiness and complexity
- The three-stage migration path: public cloud → hybrid connected → fully disconnected
- Data migration strategies including cutover timing and validation
- How to maintain operational continuity during transitions
- Risk management and rollback strategies

## Chapters

| Chapter | Description |
|---------|-------------|
| [Workload Assessment](01-assessment.md) | Evaluating workloads for cloud exit readiness |
| [Public Cloud → Connected Azure Local](02-public-to-connected.md) | First stage: moving to hybrid connected |
| [Connected → Disconnected Azure Local](03-connected-to-disconnected.md) | Second stage: going fully sovereign |
| [Data Migration Strategies](04-data-migration.md) | Moving data across the continuum |
| [Operational Continuity](05-operational-continuity.md) | Maintaining operations during transition |

<!-- DIAGRAM: Cloud exit journey timeline showing the three-stage progression: Stage 1 (Public Cloud) → Assessment & Planning → Stage 2 (Connected Azure Local) → Hardening & Testing → Stage 3 (Disconnected Azure Local), with key milestones at each transition point -->

## References

- [Azure Migrate](https://learn.microsoft.com/en-us/azure/migrate/)
- [Cloud Adoption Framework — Migration](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/)
- [Azure Local Deployment](https://learn.microsoft.com/en-us/azure/azure-local/deploy/deployment-introduction)

---

> **Next:** [Workload Assessment →](01-assessment.md)
