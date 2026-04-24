# Public Cloud → Connected Azure Local

## Introduction

The first stage of cloud exit moves workloads from Azure public cloud to Azure Local infrastructure while maintaining cloud connectivity. This is often the easiest transition because Azure management and many services remain available through the Azure Arc connection.

## Topics to Cover

- [ ] Prerequisites: Azure Local cluster deployed and registered with Azure
- [ ] Infrastructure preparation:
  - Azure Local cluster sizing (compute, storage, networking)
  - Network connectivity setup (ExpressRoute/VPN)
  - Azure Arc registration and policy extension
- [ ] Migration approach by workload type:
  - **Containerized workloads**: AKS on Azure → AKS on Azure Local
  - **Virtual machine workloads**: Azure VMs → Azure Local VMs
  - **Database workloads**: Azure SQL → Arc-enabled SQL Managed Instance
  - **Storage**: Azure Blob → local storage or Azure Local storage
- [ ] PaaS service replacement for connected mode:
  - Azure Service Bus → keep via cloud connection or deploy NATS/RabbitMQ locally
  - Azure Key Vault → maintain cloud Key Vault via connectivity
  - Azure Container Registry → keep cloud ACR accessible via network
- [ ] Data migration execution:
  - Online migration for minimal downtime
  - Offline migration for large datasets
  - Database replication and cutover
- [ ] Validation and testing post-migration
- [ ] Rollback procedures

<!-- DIAGRAM: Migration architecture showing the source environment (Azure public cloud with AKS, Azure SQL, Service Bus) and target environment (Azure Local with AKS hybrid, Arc-enabled SQL MI) connected via ExpressRoute, with migration arrows showing the movement path for each component -->

## References

- [AKS on Azure Local](https://learn.microsoft.com/en-us/azure/aks/hybrid/)
- [Azure Arc-enabled SQL Managed Instance](https://learn.microsoft.com/en-us/azure/azure-arc/data/managed-instance-overview)
- [Azure Local VM Management](https://learn.microsoft.com/en-us/azure/azure-local/manage/manage-virtual-machines-in-azure-portal)
- [Azure Migrate — Server Migration](https://learn.microsoft.com/en-us/azure/migrate/tutorial-migrate-physical-virtual-machines)

---

> **Next:** [Connected → Disconnected Azure Local →](03-connected-to-disconnected.md)
