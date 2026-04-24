# Phase 1: Public Cloud

## Introduction

In this phase, the Contoso Insurance Platform runs entirely on Azure public cloud, leveraging managed PaaS services for maximum operational simplicity and scalability. This is the starting point of the hybrid continuum journey.

## Topics to Cover

- [ ] Architecture overview for Phase 1:
  - **Frontend**: NGINX container on Azure Kubernetes Service (AKS), behind Azure Front Door
  - **API Backend**: .NET 8 containers on AKS, with Azure API Management
  - **Background Workers**: .NET 8 containers on AKS (separate node pool)
  - **Database**: Azure SQL Database (Business Critical tier)
  - **File Storage**: Azure Blob Storage with lifecycle management
  - **Message Queue**: Azure Service Bus (Standard tier)
  - **Identity**: Azure AD / Entra ID with B2C for customers
- [ ] Infrastructure as Code: Bicep/Terraform for all resources
- [ ] CI/CD: GitHub Actions deploying to AKS via Helm charts
- [ ] Monitoring: Azure Monitor, Application Insights, Log Analytics
- [ ] Security: Azure Key Vault for secrets, managed identities, network policies
- [ ] Cost profile estimation for this architecture
- [ ] Identifying "continuum constraints": which PaaS dependencies will need replacement?

<!-- DIAGRAM: Phase 1 architecture diagram showing the full Azure public cloud deployment: Azure Front Door → AKS (frontend + backend + workers) → Azure SQL + Azure Blob Storage + Azure Service Bus. Include Azure AD, Key Vault, Azure Monitor, and CI/CD pipeline -->

<!-- DIAGRAM: Network topology for Phase 1 showing VNets, subnets, NSGs, and connectivity between AKS, Azure SQL (Private Endpoint), Blob Storage (Private Endpoint), and Service Bus -->

## References

- [AKS Best Practices](https://learn.microsoft.com/en-us/azure/aks/best-practices)
- [Azure SQL Database](https://learn.microsoft.com/en-us/azure/azure-sql/database/)
- [Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/)
- [Azure Front Door](https://learn.microsoft.com/en-us/azure/frontdoor/)
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/)

---

> **Next:** [Phase 2: Hybrid Connected →](03-phase2-hybrid-connected.md)
