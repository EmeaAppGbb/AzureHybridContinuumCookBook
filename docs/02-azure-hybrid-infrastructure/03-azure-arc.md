# Azure Arc

## Introduction

Azure Arc is the management plane that extends Azure governance, security, and services to any infrastructure — on-premises, multi-cloud, or edge. It is the glue that makes the hybrid continuum possible, providing a single pane of glass for managing resources regardless of where they run.

## Topics to Cover

- [ ] What is Azure Arc — definition and core value proposition
- [ ] Azure Arc capabilities:
  - **Arc-enabled servers**: Manage Windows and Linux servers anywhere
  - **Arc-enabled Kubernetes**: Manage Kubernetes clusters anywhere
  - **Arc-enabled data services**: Run Azure SQL and PostgreSQL on any infrastructure
  - **Arc-enabled application services**: Run App Service, Functions, Logic Apps anywhere
- [ ] How Azure Arc works: the Connected Machine agent and resource projection into Azure
- [ ] Azure Arc and Azure Local — how they work together
- [ ] Governance at scale: Azure Policy, RBAC, and tags across hybrid resources
- [ ] Monitoring: Azure Monitor and Log Analytics for hybrid environments
- [ ] Security: Microsoft Defender for Cloud across hybrid resources
- [ ] Azure Arc in disconnected scenarios: limitations and workarounds

<!-- DIAGRAM: Azure Arc architecture showing the Arc control plane in Azure connected to on-premises servers, Kubernetes clusters, and Azure Local instances via the Arc agent — with Azure Policy, RBAC, and monitoring flowing down -->

## References

- [Azure Arc Overview](https://learn.microsoft.com/en-us/azure/azure-arc/overview)
- [Azure Arc-enabled Servers](https://learn.microsoft.com/en-us/azure/azure-arc/servers/overview)
- [Azure Arc-enabled Kubernetes](https://learn.microsoft.com/en-us/azure/azure-arc/kubernetes/overview)
- [Azure Arc-enabled Data Services](https://learn.microsoft.com/en-us/azure/azure-arc/data/overview)

---

> **Next:** [Azure Stack HCI →](04-azure-stack-hci.md)
