# Cloud-Native Pattern

## Introduction

The cloud-native pattern represents the starting point of the hybrid continuum — workloads designed to run entirely in Azure public cloud, leveraging managed PaaS services and cloud-native design principles. Understanding this baseline is essential for planning how workloads can later move along the continuum.

## Topics to Cover

- [ ] Pattern definition and when to use it
- [ ] Characteristics: full connectivity, maximum service availability, Azure-managed operations
- [ ] Reference architecture components:
  - Compute: Azure Kubernetes Service, Azure Container Apps, Azure App Service
  - Data: Azure SQL, Azure Cosmos DB, Azure Storage
  - Messaging: Azure Service Bus, Azure Event Hubs, Azure Queue Storage
  - Identity: Azure AD / Entra ID
  - Networking: Azure Front Door, Application Gateway, Load Balancer
- [ ] Cloud-native design principles: stateless, event-driven, microservices, infrastructure as code
- [ ] Well-Architected Framework alignment for cloud-native
- [ ] Limitations: data must reside in Azure regions, requires connectivity, provider dependency
- [ ] Identifying components that could constrain future migration along the continuum

<!-- DIAGRAM: Cloud-native reference architecture showing a containerized application running in AKS with Azure SQL, Azure Storage, Service Bus, all within an Azure region, managed via Azure DevOps CI/CD pipeline -->

## References

- [Azure Architecture Center — Microservices](https://learn.microsoft.com/en-us/azure/architecture/microservices/)
- [Azure Kubernetes Service](https://learn.microsoft.com/en-us/azure/aks/)
- [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/)
- [Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/)

---

> **Next:** [Hybrid Connected Pattern →](02-hybrid-connected.md)
