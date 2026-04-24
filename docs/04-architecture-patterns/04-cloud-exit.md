# Cloud Exit Pattern

## Introduction

Cloud exit (sometimes called "cloud repatriation") is the process of moving workloads from public cloud services to on-premises or sovereign infrastructure. This pattern provides a structured approach to planning and executing cloud exit while maintaining application availability and operational continuity.

## Topics to Cover

- [ ] What is cloud exit and why organizations pursue it:
  - Regulatory mandates (data sovereignty requirements)
  - Cost optimization (workloads that are cheaper on-premises)
  - Strategic autonomy (reducing cloud provider dependency)
  - Latency requirements
- [ ] The cloud exit spectrum — not always a complete exit:
  - Selective exit: move specific workloads
  - Gradual migration: phased approach
  - Full exit: complete disconnection
- [ ] Cloud exit planning framework:
  - Workload assessment and classification
  - Dependency mapping (PaaS service dependencies)
  - Target architecture selection
  - Migration strategy (rehost, replatform, rearchitect)
  - Data migration planning
  - Cutover and rollback strategies
- [ ] PaaS-to-IaaS mapping: replacing cloud services with self-hosted alternatives
- [ ] Risk mitigation: testing, parallel running, gradual cutover
- [ ] Post-exit operations: sustaining operations without cloud management

<!-- DIAGRAM: Cloud exit decision framework as a flowchart: starting from "Assess Workload" through decision points (PaaS dependencies? Data volume? Latency needs? Regulatory requirement?) leading to recommended migration strategy (Rehost, Replatform, Rearchitect) -->

<!-- DIAGRAM: Cloud exit migration timeline showing phases: Assessment (weeks 1-4) → Architecture Design (weeks 5-8) → Infrastructure Preparation (weeks 9-12) → Migration & Testing (weeks 13-20) → Cutover (week 21) → Post-Migration Validation (weeks 22-24) -->

## References

- [Azure Migrate](https://learn.microsoft.com/en-us/azure/migrate/migrate-services-overview)
- [Cloud Adoption Framework — Migration](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/)
- [Azure Local Deployment](https://learn.microsoft.com/en-us/azure/azure-local/deploy/deployment-introduction)

---

> **Next:** [Workload Placement Framework →](05-workload-placement.md)
