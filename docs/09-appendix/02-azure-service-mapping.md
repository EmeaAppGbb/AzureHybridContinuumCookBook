# Azure Service Mapping

## Introduction

This reference maps Azure public cloud PaaS services to their equivalents available on Azure Local (connected) and self-hosted alternatives for disconnected environments. Use this when planning workload migration along the hybrid continuum.

## Topics to Cover

- [ ] Comprehensive service mapping table:

  | Category | Azure PaaS Service | Azure Local (Connected) | Disconnected Alternative |
  |----------|-------------------|------------------------|-------------------------|
  | **Compute** | Azure Kubernetes Service | AKS on Azure Local | K3s, RKE2 |
  | **Compute** | Azure Container Apps | — | Kubernetes + Knative |
  | **Compute** | Azure App Service | Arc-enabled App Service | — |
  | **Compute** | Azure Functions | Arc-enabled Functions | OpenFaaS, KEDA |
  | **Database** | Azure SQL Database | Arc-enabled SQL MI | SQL Server on VMs |
  | **Database** | Azure Cosmos DB | — | MongoDB, CockroachDB |
  | **Database** | Azure Database for PostgreSQL | Arc-enabled PostgreSQL | PostgreSQL |
  | **Storage** | Azure Blob Storage | Azure Local Storage | MinIO |
  | **Storage** | Azure Files | Azure Local Storage | NFS/SMB file shares |
  | **Messaging** | Azure Service Bus | — | RabbitMQ, NATS |
  | **Messaging** | Azure Event Hubs | — | Apache Kafka |
  | **Messaging** | Azure Event Grid | — | NATS JetStream |
  | **Caching** | Azure Cache for Redis | — | Redis (self-hosted) |
  | **Identity** | Azure AD / Entra ID | Azure AD (via connectivity) | AD DS + ADFS |
  | **Secrets** | Azure Key Vault | Azure Key Vault (via connectivity) | HashiCorp Vault |
  | **Monitoring** | Azure Monitor | Azure Monitor (via connectivity) | Prometheus + Grafana |
  | **Security** | Defender for Cloud | Defender for Cloud (via Arc) | Wazuh, Elastic Security |
  | **CI/CD** | Azure DevOps / GitHub Actions | Azure DevOps / GitHub (via connectivity) | GitLab CI, Jenkins |
  | **Registry** | Azure Container Registry | ACR (via connectivity) | Harbor |
  | **DNS** | Azure DNS | Azure DNS (via connectivity) | CoreDNS, Windows DNS |
  | **Load Balancing** | Azure Load Balancer | Azure Local LB | MetalLB, HAProxy |

- [ ] Compatibility notes and limitations for each mapping
- [ ] Feature parity assessment — what you gain and lose with each replacement
- [ ] Guidance on when to accept reduced functionality vs. when to find full replacements

## References

- [Azure Local Supported Workloads](https://learn.microsoft.com/en-us/azure/azure-local/)
- [Azure Arc-enabled Services](https://learn.microsoft.com/en-us/azure/azure-arc/)
- [CNCF Landscape](https://landscape.cncf.io/)

---

> **Next:** [Additional Resources →](03-additional-resources.md)
