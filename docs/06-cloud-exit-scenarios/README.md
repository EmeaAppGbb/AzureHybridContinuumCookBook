# Part 6: Cloud Exit Scenarios

This section provides comprehensive guidance on cloud exit—the journey of moving workloads from Azure public cloud to on-premises Azure Local infrastructure. You'll learn how to assess workload readiness, execute a phased migration through hybrid and local connected stages, then progress to fully disconnected sovereign operation. The section covers data migration strategies, operational continuity practices, and risk mitigation throughout the transition.

## What You'll Learn

- How to assess workloads for cloud exit readiness and complexity
- The migration paths: public cloud → hybrid → local connected → fully disconnected
- Data migration strategies including cutover timing and validation
- How to maintain operational continuity during transitions
- Risk management and rollback strategies

## Chapters

| Chapter | Description |
|---------|-------------|
| [Workload Assessment](01-assessment.md) | Evaluating workloads for cloud exit readiness |
| [Public Cloud → Connected Azure Local](02-public-to-connected.md) | Moving to hybrid or local connected stages |
| [Connected → Disconnected Azure Local](03-connected-to-disconnected.md) | Final stage: going fully sovereign |
| [Data Migration Strategies](04-data-migration.md) | Moving data across the continuum |
| [Operational Continuity](05-operational-continuity.md) | Maintaining operations during transition |

<!-- DIAGRAM: Cloud exit journey timeline showing the progression: Stage 1 (Public Cloud) → Assessment & Planning → Stage 3 (Hybrid) or Stage 4 (Local Connected) → Hardening & Testing → Stage 5 (Disconnected), with key milestones at each transition point -->

## References

- [Azure Migrate](https://learn.microsoft.com/en-us/azure/migrate/)
- [Cloud Adoption Framework — Migration](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/)
- [Azure Local Deployment](https://learn.microsoft.com/en-us/azure/azure-local/deploy/deployment-introduction)

---

> **Next:** [Workload Assessment →](01-assessment.md)
