# Azure Local

## Introduction

Azure Local is Microsoft's platform for running Azure services on-premises — bringing the same compute, storage, and management capabilities from the public cloud into customer data centers, colocation facilities, and edge locations. It is the cornerstone technology for the hybrid continuum.

## Topics to Cover

- [ ] What is Azure Local — definition and positioning
- [ ] Evolution: from Azure Stack HCI to Azure Local
- [ ] Azure Local architecture: hardware, software, and management layers
- [ ] Supported Azure services on Azure Local:
  - Azure Kubernetes Service (AKS)
  - Azure Virtual Machines
  - Azure Virtual Desktop
  - Azure Arc-enabled services
  - Azure data services
- [ ] Deployment models: single node, multi-node clusters
- [ ] Hardware partners and validated configurations (Dell, HPE, Lenovo)
- [ ] Connectivity requirements: connected vs. intermittently connected
- [ ] Licensing and billing: Azure subscription model for on-premises
- [ ] Management through Azure portal, Azure CLI, and PowerShell
- [ ] Comparison with other hybrid offerings (Azure Stack Hub, AWS Outposts, Google Distributed Cloud)

<!-- DIAGRAM: Azure Local architecture stack showing layers: Hardware (validated servers) → Azure Local OS → Azure services (VMs, AKS, data services) → Azure management plane (Azure portal, Azure Resource Manager) -->

<!-- DIAGRAM: Comparison matrix of Azure Local vs Azure Stack Hub vs Azure Stack Edge — use cases, connectivity, available services, management model -->

## References

- [Azure Local Overview](https://learn.microsoft.com/en-us/azure/azure-local/)
- [Azure Local — What's New](https://learn.microsoft.com/en-us/azure/azure-local/whats-new)
- [Azure Local Deployment Guide](https://learn.microsoft.com/en-us/azure/azure-local/deploy/deployment-introduction)
- [Azure Local Supported Workloads](https://learn.microsoft.com/en-us/azure/azure-local/overview#workloads-and-use-cases)
- [Azure Stack HCI Overview](https://learn.microsoft.com/en-us/azure-stack/hci/)

---

> **Next:** [Azure Arc →](03-azure-arc.md)
