# Workload Placement Framework

## Introduction

Not every workload should be in the cloud, and not every workload should be on-premises. The Workload Placement Framework provides a structured approach to deciding where each workload should run based on its specific requirements and constraints.

## Topics to Cover

- [ ] The workload placement decision — balancing competing concerns
- [ ] Decision criteria:
  - **Data residency requirements**: Where must data physically reside?
  - **Connectivity requirements**: Can the workload tolerate disconnection?
  - **Latency requirements**: How close must compute be to users/data?
  - **Service dependencies**: What Azure PaaS services does the workload need?
  - **Regulatory requirements**: What frameworks must be satisfied?
  - **Operational maturity**: Can the team manage on-premises infrastructure?
  - **Cost model**: CapEx vs. OpEx trade-offs
  - **Scale requirements**: Does the workload need elastic scaling?
- [ ] Workload classification matrix with recommended placement
- [ ] Examples of workload placement decisions across industries
- [ ] Reassessing placement over time — the continuum is not static

<!-- DIAGRAM: Workload placement decision matrix as a radar/spider chart showing how different workload profiles map to different continuum positions, with axes for: data sensitivity, latency needs, scale needs, regulatory pressure, connectivity tolerance, operational maturity -->

<!-- DIAGRAM: Workload placement flowchart guiding users through a series of yes/no questions to arrive at a recommended deployment model -->

## References

- [Azure Well-Architected Framework — Workload](https://learn.microsoft.com/en-us/azure/well-architected/workloads)
- [Cloud Adoption Framework — Strategy](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/strategy/)
- [Azure Local Use Cases](https://learn.microsoft.com/en-us/azure/azure-local/)

---

> **Next:** [Part 5 — Sovereign Landing Zone Guide →](../05-sovereign-landing-zone-guide/README.md)
