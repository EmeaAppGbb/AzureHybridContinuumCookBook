# Phase 1: Public Cloud

!!! abstract "Chapter Summary"
    Phase 1 represents Contoso Insurance's initial cloud-native deployment on Azure public cloud. This architecture maximizes operational simplicity by leveraging fully managed Azure PaaS services. This chapter details the architecture, deployment approach, operational model, and cost profile of the Azure public cloud implementation.

## Architecture Overview

The Phase 1 architecture fully embraces Azure's managed services philosophy. Every component runs on Azure PaaS offerings, minimizing operational overhead while maximizing scalability, reliability, and integration with Azure's ecosystem.

### Component Mapping — Azure PaaS Services

| Application Component | Azure Service | Configuration |
|-----------------------|---------------|---------------|
| **Frontend (React SPA)** | Azure Kubernetes Service (AKS) | NGINX ingress controller, 3-10 replicas, autoscaling |
| **API Backend (.NET 8)** | Azure Kubernetes Service (AKS) | 5-20 replicas, autoscaling on CPU/latency |
| **Background Workers (.NET 8)** | Azure Kubernetes Service (AKS) | Separate node pool, 2-8 replicas per worker type |
| **Database (SQL Server)** | Azure SQL Database | Business Critical tier, 8 vCores, zone-redundant |
| **File Storage (Objects)** | Azure Blob Storage | Hot tier, geo-redundant storage (GRS), lifecycle policies |
| **Message Queue** | Azure Service Bus | Standard tier, 3 queues, partitioning enabled |
| **Identity (Customers)** | Azure AD B2C | Custom policies, social identity providers |
| **Identity (Employees)** | Microsoft Entra ID | Conditional access, MFA enforcement |
| **Secrets Management** | Azure Key Vault | Premium tier (HSM-backed), RBAC-based access |
| **Container Registry** | Azure Container Registry | Premium tier, geo-replication, Defender scanning |
| **Ingress & CDN** | Azure Front Door | Premium tier, WAF enabled, SSL/TLS termination |
| **Monitoring & Logging** | Azure Monitor + App Insights | Distributed tracing, custom metrics, log analytics |
| **CI/CD Pipeline** | GitHub Actions | Infrastructure as Code (Bicep), Helm chart deployments |

### Infrastructure Architecture

The Phase 1 deployment uses a hub-spoke network topology with Azure as the central hub:

**Hub Virtual Network** (`10.0.0.0/16`)
: Shared services including Azure Firewall, Azure Bastion for secure VM access, VPN Gateway for administrative access. This VNet hosts management and monitoring infrastructure.

**Spoke Virtual Network** (`10.1.0.0/16`)  
: Application workloads running on AKS. Subnets include:
- `aks-system` (10.1.0.0/24) — System pods, ingress controllers, cluster monitoring
- `aks-frontend` (10.1.1.0/24) — Frontend NGINX pods  
- `aks-backend` (10.1.2.0/24) — API backend pods
- `aks-workers` (10.1.3.0/24) — Background worker pods

**Private Endpoints**
: Azure SQL Database, Azure Blob Storage, and Azure Service Bus are accessed via private endpoints injected into the spoke VNet. This ensures all data plane traffic remains within the Azure backbone network, never traversing the public internet.

**Azure Front Door**  
: Sits at the internet edge, provides global load balancing, SSL/TLS termination, and Web Application Firewall (WAF) protection. Routes traffic to the AKS ingress controller via private link.

<!-- DIAGRAM: Phase 1 architecture for Seldon - Hub-spoke network topology with Azure Front Door at the edge → AKS cluster (frontend, backend, workers) in spoke VNet → Private Endpoints connecting to Azure SQL Database, Blob Storage, and Service Bus. Include Azure AD B2C for customer auth, Entra ID for employee auth, Key Vault for secrets, ACR for images, Azure Monitor for observability, and GitHub Actions for CI/CD. Show network boundaries (VNets, subnets, NSGs) and data flows -->

<!-- DIAGRAM: AKS cluster internal architecture for Seldon - Show node pools (system, frontend, backend, workers), pod deployments, ingress controller, Azure CNI networking, Azure Monitor agent, and connectivity to Azure services via private endpoints -->

## Azure Kubernetes Service (AKS) Configuration

Contoso chose AKS as the container orchestration platform for all application workloads. While alternatives like Azure App Service or Azure Container Apps were considered, AKS provided the portability needed for future hybrid scenarios.

### Cluster Specifications

**Kubernetes Version**: 1.28 (automatically upgraded via maintenance windows)  
**Node Pools**:

- **System Node Pool**: 3 nodes, Standard_D4s_v5 (4 vCPU, 16 GB RAM), Ubuntu 22.04
- **Frontend Node Pool**: 2-8 nodes, Standard_D2s_v5 (2 vCPU, 8 GB RAM), autoscaling  
- **Backend Node Pool**: 3-12 nodes, Standard_D4s_v5 (4 vCPU, 16 GB RAM), autoscaling
- **Worker Node Pool**: 2-6 nodes, Standard_D4s_v5 (4 vCPU, 16 GB RAM), autoscaling

**Networking**: Azure CNI with Calico network policies for pod-level segmentation  
**Monitoring**: Azure Monitor Container Insights with Log Analytics integration  
**Security**: Azure AD workload identity for pod authentication, Azure Policy for governance

### Application Deployment Model

All application components deploy as Kubernetes Deployments with accompanying Services and Ingresses:

**Frontend Deployment** (`web-frontend`)
: 3 replicas minimum, horizontal pod autoscaler (HPA) targets 70% CPU utilization, maxes at 10 replicas. NGINX serves static React assets. Liveness probe checks HTTP 200 on `/health`. Readiness probe checks `/ready`.

**Backend Deployment** (`api-backend`)  
: 5 replicas minimum, HPA targets 70% CPU and p95 latency <500ms, maxes at 20 replicas. .NET 8 Web API with Entity Framework Core. Connection pooling to Azure SQL Database. Managed identity for Key Vault and Blob Storage access.

**Worker Deployments** (3 separate deployments)
: Each worker type (`document-processor`, `premium-calculator`, `notification-sender`) runs 2-4 replicas with HPA based on Azure Service Bus queue depth. Managed identities for queue access.

All deployments use rolling update strategy with `maxUnavailable: 1` and `maxSurge: 1` to ensure zero-downtime deployments.

## Azure SQL Database Configuration

Contoso uses Azure SQL Database in the **Business Critical tier** to ensure high availability and performance:

**Service Tier**: Business Critical (Gen5, 8 vCores)  
**Storage**: 500 GB allocated, auto-growth enabled, max 1 TB  
**High Availability**: Zone-redundant configuration with automatic failover  
**Backup**: Automated backups with 35-day retention, point-in-time restore  
**Security**: Private endpoint access only, TDE (Transparent Data Encryption) enabled, Azure AD authentication

**Connection Model**  
: API backend and workers connect using managed identities (no passwords). Connection strings retrieved from Azure Key Vault at startup. Connection pooling with max pool size of 100 per replica.

**Performance Profile**
: DTU consumption averages 60-70% during business hours, spiking to 85% during end-of-month reporting. Query Performance Insight identifies slow queries for optimization.

## Azure Blob Storage Configuration

Document storage uses Azure Blob Storage with lifecycle management policies:

**Storage Account**: `contosoclaimsstorage` (General Purpose v2)  
**Redundancy**: Geo-redundant storage (GRS) with read access (RA-GRS)  
**Access Tier Strategy**:

- **Hot tier**: Documents from active claims (last 90 days) — ~200 GB
- **Cool tier**: Documents from closed claims (90 days - 3 years) — ~2 TB  
- **Archive tier**: Documents from claims older than 3 years — ~6 TB

**Lifecycle Policies**  
: Automated transitions from Hot → Cool after 90 days, Cool → Archive after 3 years. Documents retained for 10 years per regulatory requirements, then deleted.

**Access Model**
: API backend generates SAS (Shared Access Signature) tokens with 15-minute expiration for direct client uploads. Eliminates API bandwidth consumption for document uploads.

## Azure Service Bus Configuration

Azure Service Bus provides reliable message queuing with at-least-once delivery guarantees:

**Namespace**: `contosoinsurance-servicebus` (Standard tier)  
**Queues**:

- `document-processing`: Max delivery count 5, message TTL 24 hours, dead-letter queue enabled
- `premium-calculation`: Max delivery count 3, message TTL 12 hours, sessions enabled for ordered processing  
- `notification-sender`: Max delivery count 10, message TTL 1 hour, partitioning enabled for scale

**Access Control**  
: Managed identities for all consumers and producers. No shared access keys used. Azure RBAC assignments grant `Azure Service Bus Data Sender` and `Azure Service Bus Data Receiver` roles.

**Monitoring**
: Azure Monitor tracks queue depth, message count, dead-letter count. Alerts trigger when queue depth exceeds thresholds (500 messages for document-processing, 1000 for notifications).

## Identity & Access Management

### Customer Identity — Azure AD B2C

Contoso uses Azure AD B2C for customer authentication with custom branding and policies:

**Sign-Up/Sign-In Flow**  
: Email verification required, password complexity enforced (12+ characters, mixed case, numbers, symbols). Optional social identity providers (Google, Facebook, Microsoft Account).

**MFA Configuration**  
: SMS-based MFA recommended but not required for customers. Required for sensitive operations (claim submission above €10,000, bank account changes).

**Token Lifetime**  
: Access tokens valid for 1 hour, refresh tokens valid for 14 days. Silent token renewal via refresh token rotation.

### Employee Identity — Microsoft Entra ID

Insurance agents and administrators authenticate via corporate Entra ID:

**Conditional Access Policies**
: MFA required for all users, block access from unmanaged devices, require compliant devices for privileged access (administrators).

**Privileged Identity Management (PIM)**  
: Just-in-time access for administrative roles. Database administrators request time-limited access to Azure SQL Database with approval workflow.

## Secrets Management — Azure Key Vault

All application secrets, connection strings, and certificates are stored in Azure Key Vault:

**Key Vault**: `contoso-insurance-kv` (Premium tier with HSM-backed keys)  
**Stored Secrets**:

- Azure SQL Database connection strings  
- Azure Service Bus connection strings (backup for managed identity failures)
- SMTP server credentials for email notifications
- SMS API keys for notification worker  
- Encryption keys for sensitive data at rest

**Access Model**
: AKS pods use Azure workload identity to access secrets. Secrets loaded at pod startup and cached in memory. No secrets in environment variables or ConfigMaps.

## Monitoring & Observability

### Azure Monitor & Application Insights

Comprehensive observability powered by Azure's native monitoring stack:

**Application Insights**
: Distributed tracing across frontend → API → workers → external services. Custom metrics for business KPIs (claims submitted/hour, average processing time, settlement amounts). Dependency tracking for Azure SQL, Service Bus, and Blob Storage calls.

**Log Analytics Workspace**  
: Centralized log aggregation from AKS (container logs), Azure SQL (audit logs), Application Insights (application logs). Retention: 90 days for query performance, 1 year in cold storage.

**Alerts & Action Groups**
: Alerts configured for critical scenarios — API p95 latency >1s, Service Bus queue depth >1000, Azure SQL DTU >90%, pod crash loops, certificate expiration <30 days. Action groups trigger PagerDuty for on-call engineers.

**Dashboards**  
: Custom Azure Dashboard showing real-time metrics — claims submitted today, average claim processing time, system health (green/yellow/red), cost trends.

## CI/CD Pipeline — GitHub Actions

Contoso's deployment pipeline leverages GitHub Actions with GitOps principles:

### Pipeline Stages

**1. Build & Test** (triggered on pull request)
: Compile .NET projects, run unit tests, run integration tests (Testcontainers for SQL Server), build Docker images, scan images with Trivy for vulnerabilities.

**2. Publish Images** (triggered on merge to main)  
: Tag images with git commit SHA and `latest`, push to Azure Container Registry, sign images with Notation (CNCF supply chain security).

**3. Deploy to Staging** (automatic after publish)
: Deploy to AKS staging namespace using Helm charts, run smoke tests, run end-to-end tests with Playwright.

**4. Deploy to Production** (manual approval)  
: Requires approval from two engineers, deploy to AKS production namespace using Helm charts with blue/green deployment strategy, automated rollback on health check failures.

### Infrastructure as Code

All Azure resources defined in Bicep templates stored in `infrastructure/` directory:

```plaintext
infrastructure/
├── main.bicep                 # Root template orchestrating all resources
├── modules/
│   ├── aks.bicep              # AKS cluster configuration
│   ├── sql.bicep              # Azure SQL Database
│   ├── storage.bicep          # Blob Storage account  
│   ├── servicebus.bicep       # Service Bus namespace
│   ├── keyvault.bicep         # Key Vault
│   └── monitoring.bicep       # Azure Monitor, App Insights
└── parameters/
    ├── dev.bicepparam         # Development environment
    ├── staging.bicepparam     # Staging environment
    └── production.bicepparam  # Production environment
```

Bicep deployments run via GitHub Actions using Azure CLI (`az deployment group create`). Deployment state stored in Azure (Resource Manager tracks state).

## Cost Profile — Phase 1

Monthly Azure costs for the production environment (as of Q1 2023):

| Service | Configuration | Monthly Cost (EUR) |
|---------|---------------|---------------------|
| **Azure Kubernetes Service** | 4 node pools, avg 20 nodes | €12,000 |
| **Azure SQL Database** | Business Critical, 8 vCores | €8,500 |
| **Azure Blob Storage** | 8 TB (hot/cool/archive mix) | €1,200 |
| **Azure Service Bus** | Standard tier, 3 queues | €800 |
| **Azure Front Door** | Premium tier, ~50 TB egress | €6,500 |
| **Azure Container Registry** | Premium tier, geo-replication | €600 |
| **Azure Key Vault** | Premium tier, HSM operations | €400 |
| **Azure Monitor & App Insights** | Log Analytics ingestion (~500 GB/mo) | €3,200 |
| **Azure AD B2C** | 50K MAU (Monthly Active Users) | €200 |
| **Azure Firewall** | Premium tier for hub VNet | €1,600 |
| **Data Egress** | Cross-region, internet egress | €8,000 |
| **Support Plan** | Premier support | €2,000 |
| **Total** | | **€45,000/month** |

**Cost Drivers**  
: The largest cost components are compute (AKS nodes), database (Azure SQL Business Critical tier), and data egress (Front Door and cross-region traffic). Data egress alone accounts for 18% of monthly costs.

!!! info "3-Year TCO Projection"
    At €45,000/month, the 3-year total cost of ownership for Phase 1 is €1,620,000. This baseline drives the business case for hybrid/on-premises alternatives.

## Identifying Continuum Constraints

While Phase 1 provides operational simplicity, certain Azure PaaS services create dependencies that must be addressed in later phases:

| Azure Service | Continuum Constraint | Future Replacement |
|---------------|---------------------|-------------------|
| **Azure SQL Database** | Managed service, no on-premises equivalent | Arc-enabled SQL MI → SQL Server on VMs |
| **Azure Service Bus** | Cloud-only messaging | RabbitMQ or NATS on Kubernetes |
| **Azure AD B2C / Entra ID** | Cloud-dependent identity | AD DS + ADFS for on-premises |
| **Azure Key Vault** | Cloud-only secrets management | HashiCorp Vault or similar |
| **Azure Monitor / App Insights** | Cloud-based observability | Prometheus + Grafana + Loki |
| **Azure Front Door** | Cloud CDN and WAF | NGINX or Traefik ingress + local CDN |
| **Azure Container Registry** | Cloud registry | Harbor on-premises |

!!! warning "Design for Portability"
    To enable future hybrid scenarios, Contoso made key architectural decisions in Phase 1:
    
    - **Containerize everything** — All workloads run in containers, not on VMs or PaaS compute (App Service, Functions)
    - **Use Kubernetes** — AKS provides a portable orchestration layer vs. Azure-specific services like Container Apps
    - **Abstract cloud services** — Database access via Entity Framework Core, queue access via abstraction interfaces, storage access via Azure SDK with interface wrappers
    - **Avoid Azure-specific code** — No Azure Functions bindings, no Azure-specific queue message formats, no Azure Cosmos DB Change Feed

These decisions slightly increase complexity in Phase 1 but dramatically simplify migrations in Phase 2 and Phase 3.

## Operational Model — Phase 1

Day-to-day operations in Phase 1 leverage Azure's managed services:

**Routine Tasks Automated by Azure**
: OS patching on AKS nodes, Kubernetes version upgrades, Azure SQL Database backups, certificate rotation for Azure services, security updates for Azure PaaS components.

**Contoso Operations Team Responsibilities**  
: Application deployments via CI/CD, monitoring alert response, incident management, cost optimization, capacity planning, disaster recovery testing (quarterly).

**Team Structure** (Phase 1)
: 2 DevOps engineers, 1 Database administrator, 1 Security engineer, 1 SRE (Site Reliability Engineer). Team works standard business hours with on-call rotation for P1 incidents.

**Skills Required**
: Azure platform knowledge, Kubernetes administration, .NET development (for troubleshooting), SQL Server performance tuning, GitHub Actions, Bicep/Terraform.

## Phase 1 Summary — Baseline Established

Phase 1 successfully establishes Contoso Insurance Platform on Azure public cloud with:

✅ **High availability** — 99.95% uptime over 12 months, exceeding 99.9% SLA  
✅ **Scalability** — Handles 10,000 concurrent users with autoscaling, headroom to 20,000  
✅ **Security** — Zero security incidents, passed Q4 penetration test with no critical findings  
✅ **Operational simplicity** — Small team manages enterprise platform with Azure's managed services  
❌ **Cost concerns** — €45,000/month exceeds budget, driving cost optimization initiatives  
❌ **Regulatory risk** — Azure's multi-region architecture creates data residency concerns  
❌ **Cloud dependency** — Complete reliance on Azure SLAs and service availability  

These challenges set the stage for Phase 2 — migration to Azure Local with hybrid connectivity.

## References

- [AKS Best Practices](https://learn.microsoft.com/en-us/azure/aks/best-practices)
- [Azure SQL Database](https://learn.microsoft.com/en-us/azure/azure-sql/database/)
- [Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/)
- [Azure Front Door](https://learn.microsoft.com/en-us/azure/frontdoor/)
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/)
- [Azure AD B2C](https://learn.microsoft.com/en-us/azure/active-directory-b2c/)
- [Azure Monitor Container Insights](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/container-insights-overview)
- [GitHub Actions for Azure](https://learn.microsoft.com/en-us/azure/developer/github/github-actions)

---

> **Next:** [Phase 2: Hybrid Connected →](03-phase2-hybrid-connected.md)
