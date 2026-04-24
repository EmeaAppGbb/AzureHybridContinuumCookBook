# Phase 2: Hybrid Connected

## Introduction

In this phase, the Contoso Insurance Platform migrates from Azure public cloud to Azure Local infrastructure, while maintaining connectivity to Azure for management, identity, and select cloud services. This represents the first stage of cloud exit.

## Topics to Cover

- [ ] Migration planning and timeline for Phase 2
- [ ] Architecture overview for Phase 2:
  - **Frontend**: NGINX container on AKS hybrid (Azure Local), local load balancer
  - **API Backend**: .NET 8 containers on AKS hybrid (Azure Local)
  - **Background Workers**: .NET 8 containers on AKS hybrid (Azure Local)
  - **Database**: Azure Arc-enabled SQL Managed Instance (on Azure Local)
  - **File Storage**: Local storage (MinIO or Azure Local storage)
  - **Message Queue**: RabbitMQ deployed on Kubernetes (or maintained Azure Service Bus via network)
  - **Identity**: Azure AD / Entra ID via ExpressRoute (cloud-dependent)
- [ ] What stayed in the cloud: Azure AD, Azure Monitor, Defender for Cloud, Azure Key Vault
- [ ] What moved on-premises: compute, database, file storage, message queue
- [ ] Migration execution for each component:
  - Container image promotion: ACR → AKS hybrid
  - Database migration: Azure SQL → Arc-enabled SQL MI
  - Storage migration: Azure Blob → MinIO
  - Queue migration: Service Bus → RabbitMQ
- [ ] Configuration changes required per component
- [ ] Testing and validation plan
- [ ] Performance comparison: Azure public vs. Azure Local connected

<!-- DIAGRAM: Phase 2 architecture showing Azure Local cluster running AKS hybrid with all application components, connected via ExpressRoute to Azure for identity (Azure AD), monitoring (Azure Monitor), and management (Azure Portal/Arc). Show what runs locally vs. what remains in cloud -->

<!-- DIAGRAM: Migration execution flow for Phase 2 showing the sequence of component migrations with parallel tracks where possible, validation gates, and rollback points -->

## References

- [AKS on Azure Local](https://learn.microsoft.com/en-us/azure/aks/hybrid/)
- [Azure Arc-enabled SQL MI](https://learn.microsoft.com/en-us/azure/azure-arc/data/managed-instance-overview)
- [Azure Local Storage](https://learn.microsoft.com/en-us/azure/azure-local/concepts/storage)
- [RabbitMQ on Kubernetes](https://www.rabbitmq.com/kubernetes/operator/operator-overview)

---

> **Next:** [Phase 3: Disconnected →](04-phase3-disconnected.md)
