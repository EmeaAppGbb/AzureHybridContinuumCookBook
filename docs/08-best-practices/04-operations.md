# Operations

## Introduction

Operating hybrid environments is fundamentally more complex than operating in a single cloud or a single data center. This chapter covers operational practices that help teams manage workloads across the continuum effectively.

## Topics to Cover

- [ ] Operational model differences across the continuum:
  - Public cloud: Azure-managed infrastructure, focus on application operations
  - Connected hybrid: shared responsibility — Azure manages cloud, team manages local
  - Disconnected: team manages everything — infrastructure, platform, and application
- [ ] Monitoring and observability:
  - Azure Monitor for connected environments
  - Prometheus + Grafana for local/disconnected
  - OpenTelemetry as a consistent instrumentation layer
  - Centralized vs. federated logging
- [ ] Patch management:
  - Connected: Azure Update Manager, automated patching
  - Disconnected: offline update packages, manual application
  - OS, platform, and application update coordination
- [ ] Capacity management:
  - Cloud: elastic scaling, consumption-based
  - Azure Local: capacity planning, hardware procurement cycles
  - Monitoring utilization and predicting growth
- [ ] Incident management:
  - Unified incident process across environments
  - On-call rotation that covers both cloud and on-premises
  - Post-incident review (PIR) practices
- [ ] Configuration management:
  - GitOps for Kubernetes workloads
  - Azure Policy for connected resources
  - Ansible/Chef/Puppet for on-premises infrastructure

<!-- DIAGRAM: Operations responsibility matrix showing what Azure manages vs. what the team manages across each position on the continuum — from public cloud (Azure manages most) to disconnected (team manages all) -->

## References

- [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/)
- [OpenTelemetry](https://opentelemetry.io/)
- [Azure Update Manager](https://learn.microsoft.com/en-us/azure/update-manager/)
- [Site Reliability Engineering](https://learn.microsoft.com/en-us/training/modules/intro-to-site-reliability-engineering/)

---

> **Next:** [Cost Optimization →](05-cost-optimization.md)
