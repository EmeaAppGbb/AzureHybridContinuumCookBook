# The Hybrid Continuum

## Introduction

The Azure Hybrid Continuum is not a binary choice between "cloud" and "on-premises." It is a spectrum of deployment models, each with different characteristics for connectivity, management, data residency, and operational autonomy.

Understanding this spectrum is essential for making informed architectural decisions about where workloads should run and how they should be managed.

## Topics to Cover

- [ ] Definition of the Hybrid Continuum and its stages
- [ ] The five deployment models:
  - **Fully Public Cloud** — All workloads in Azure public regions
  - **Hybrid Connected** — On-premises infrastructure managed through Azure Arc with full cloud connectivity
  - **Azure Local Connected** — Azure Local instances with persistent cloud connection
  - **Azure Local Intermittently Connected** — Azure Local with periodic connectivity for management and updates
  - **Azure Local Disconnected (Air-Gapped)** — Fully isolated infrastructure with no cloud connectivity
- [ ] Characteristics matrix: connectivity, management, available services, latency, compliance
- [ ] When to use each model — decision drivers
- [ ] How workloads can move between stages (the "continuum" aspect)

<!-- DIAGRAM: Horizontal spectrum diagram showing the 5 deployment models from left (Public Cloud) to right (Air-Gapped), with key characteristics listed below each stage: connectivity level, management model, available services, data sovereignty level -->

<!-- DIAGRAM: Decision tree for selecting the appropriate deployment model based on connectivity requirements, data residency needs, latency requirements, and regulatory constraints -->

## References

- [Azure Local Overview](https://learn.microsoft.com/en-us/azure/azure-local/)
- [Azure Arc Overview](https://learn.microsoft.com/en-us/azure/azure-arc/overview)
- [Azure Stack HCI Overview](https://learn.microsoft.com/en-us/azure-stack/hci/)
- [Azure Sovereign Landing Zone](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/overview-sovereign-landing-zone)
- [Hybrid and Multicloud Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/category/hybrid-multicloud)

---

> **Next:** [How to Use This Guide →](03-how-to-use-this-guide.md)
