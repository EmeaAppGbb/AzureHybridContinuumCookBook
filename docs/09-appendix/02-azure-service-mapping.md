# Azure Service Mapping

## Introduction

This reference maps Azure public cloud PaaS services to their equivalents across the hybrid continuum—from connected Azure Local deployments to fully disconnected on-premises alternatives. Use this when architecting solutions, planning migrations, or evaluating tradeoffs between cloud connectivity levels.

The mapping reflects real-world constraints: not every Azure service has a direct on-premises equivalent, and feature parity varies significantly. Understanding these gaps is critical for setting realistic expectations and making informed architecture decisions.

## How to Read These Tables

**Azure PaaS Service**
: The fully managed service available in Azure public cloud.

**Azure Local (Connected)**
: Services available on Azure Local infrastructure when connected to Azure. These typically run as Arc-enabled services requiring continuous or frequent Azure connectivity.

**Disconnected Alternative**
: Self-hosted or third-party alternatives suitable for air-gapped or intermittently connected environments. These require more operational overhead but provide maximum autonomy.

**Feature Parity Notes**
: Key differences in functionality, management experience, scalability, or integration. "Full" means near-equivalent capabilities; "Partial" means significant gaps; "Limited" means basic functionality only.

## Service Mappings by Category

### Compute Services

| Azure PaaS Service | Azure Local (Connected) | Disconnected Alternative | Feature Parity Notes |
|--------------------|------------------------|--------------------------|----------------------|
| **Azure Kubernetes Service (AKS)** | AKS enabled by Azure Arc<br/>Arc-enabled Kubernetes | Rancher (RKE2), K3s, OpenShift, Vanilla Kubernetes | **Full** - Azure Local provides managed K8s with Azure integration. Disconnected options require self-management of control plane, upgrades, and lifecycle. |
| **Azure Container Instances** | — | Kubernetes pods, Virtual Kubelet | **Limited** - No serverless container equivalent. Requires K8s cluster. |
| **Azure Container Apps** | Azure Container Apps on Arc (Preview) | Kubernetes + Knative, OpenShift Serverless | **Partial** - Arc version requires connectivity. Knative provides similar event-driven scaling but requires K8s expertise. |
| **Azure App Service** | App Service on Arc-enabled Kubernetes | — (Use containers instead) | **Partial** - Arc version requires connectivity to Azure. No true disconnected equivalent; migrate to containerized apps. |
| **Azure Functions** | Azure Functions on Arc-enabled Kubernetes | OpenFaaS, Fission, KEDA-scaled containers | **Partial** - Arc version requires connectivity. Open-source alternatives lack Azure Functions' deep integrations and language runtime parity. |
| **Azure Batch** | — | Kubernetes Jobs, SLURM, HTCondor | **Limited** - No managed batch equivalent. HPC workloads require specialized schedulers. |
| **Azure Virtual Machines** | Azure Local VMs (Azure Arc VM Management) | Hyper-V, VMware vSphere, KVM | **Full** - Azure Local provides full VM capabilities with Azure management. Disconnected requires traditional VM management tools. |

### Data & Storage Services

| Azure PaaS Service | Azure Local (Connected) | Disconnected Alternative | Feature Parity Notes |
|--------------------|------------------------|--------------------------|----------------------|
| **Azure SQL Database** | SQL Managed Instance enabled by Azure Arc | SQL Server on VMs (Standard/Enterprise) | **Full** - Arc SQL MI provides near-complete SQL Database compatibility. SQL Server on VMs lacks some PaaS management features but offers full RDBMS capabilities. |
| **Azure Database for PostgreSQL** | PostgreSQL enabled by Azure Arc | PostgreSQL on VMs or bare metal | **Full** - Arc PostgreSQL provides hyperscale and HA. Self-hosted PostgreSQL with Patroni/Stolon provides similar capabilities with more operational complexity. |
| **Azure Database for MySQL** | — | MySQL on VMs, Percona XtraDB Cluster, MariaDB | **Partial** - No Arc-enabled equivalent. Self-hosted MySQL requires manual HA setup, backup, and monitoring. |
| **Azure Cosmos DB** | — | MongoDB, Cassandra, CockroachDB, Couchbase | **Partial** - No on-premises Cosmos DB. NoSQL alternatives provide similar scale/multi-model capabilities but different APIs and consistency models. |
| **Azure Blob Storage** | Azure Local Blob Storage (via Azure Stack Hub) | MinIO, Ceph (RADOS), OpenStack Swift | **Partial** - Azure Stack Hub provides S3/Blob API compatibility. MinIO offers S3 API but lacks Azure Blob's tier management and deep service integration. |
| **Azure Files** | Azure Local SMB/NFS shares | Windows File Server, NFS (Linux), Samba | **Full** - Azure Local provides SMB 3.0 shares. Traditional file servers offer equivalent functionality with separate identity/access management. |
| **Azure Data Lake Storage** | — | HDFS, MinIO with Hive/Presto, Delta Lake | **Limited** - No direct equivalent. Requires assembling open-source big data stack. |
| **Azure Managed Disks** | Azure Local managed disks | SAN, NFS, iSCSI, Ceph RBD | **Full** - Azure Local provides block storage with replication. Traditional storage arrays offer similar performance/reliability. |

### Messaging & Eventing Services

| Azure PaaS Service | Azure Local (Connected) | Disconnected Alternative | Feature Parity Notes |
|--------------------|------------------------|--------------------------|----------------------|
| **Azure Service Bus** | — | RabbitMQ, Apache ActiveMQ, NATS | **Partial** - No on-premises Service Bus. RabbitMQ provides queues/topics with AMQP but lacks some Service Bus features (sessions, duplicate detection). |
| **Azure Event Hubs** | — | Apache Kafka, Confluent Platform, Redpanda | **Full** - Kafka provides equivalent event streaming with higher operational complexity. Kafka protocol is well-supported ecosystem-wide. |
| **Azure Event Grid** | — | NATS JetStream, CloudEvents with Knative Eventing | **Partial** - Event Grid's serverless model difficult to replicate. NATS provides pub/sub but requires custom event routing logic. |
| **Azure Queue Storage** | — | RabbitMQ, Redis Streams, Database queues | **Partial** - Simple queuing well-handled by multiple tools. Lacks Azure Storage integration and access tier management. |

### Identity & Security Services

| Azure PaaS Service | Azure Local (Connected) | Disconnected Alternative | Feature Parity Notes |
|--------------------|------------------------|--------------------------|----------------------|
| **Microsoft Entra ID (Azure AD)** | Entra ID (requires connectivity) | Active Directory Domain Services (AD DS) + ADFS | **Partial** - Entra ID requires cloud connectivity. AD DS provides traditional domain auth; lacks cloud-native OAuth2/OIDC integration without ADFS. |
| **Azure Key Vault** | Azure Key Vault (requires connectivity) | HashiCorp Vault, CyberArk Conjur | **Partial** - Key Vault requires connectivity for Arc scenarios. Vault offers secrets/encryption but requires self-management, HA setup, and unsealing procedures. |
| **Azure Key Vault Managed HSM** | — (Use on-premises HSM) | Thales/Entrust/Utimaco HSMs | **Full** - Traditional HSMs provide FIPS 140-3 cryptographic capabilities but require physical hardware and specialized expertise. |
| **Microsoft Defender for Cloud** | Defender for Cloud (via Arc agents) | Wazuh, Elastic Security, Tenable, Qualys | **Partial** - Defender requires connectivity. Open-source SIEM/XDR alternatives provide vulnerability scanning and threat detection with different rule sets. |
| **Microsoft Sentinel** | Microsoft Sentinel (cloud-based) | Splunk, Elastic SIEM, IBM QRadar | **Limited** - Sentinel is cloud-only. Enterprise SIEM platforms provide log aggregation, correlation, and threat intelligence with significant licensing costs. |
| **Azure Policy** | Azure Policy (via Arc) | Open Policy Agent (OPA), Kyverno (K8s) | **Partial** - Azure Policy extends to Arc resources with connectivity. OPA provides policy-as-code for Kubernetes; lacks Azure Resource Manager integration. |

### Networking Services

| Azure PaaS Service | Azure Local (Connected) | Disconnected Alternative | Feature Parity Notes |
|--------------------|------------------------|--------------------------|----------------------|
| **Azure Load Balancer** | Azure Local Software Load Balancer | MetalLB (K8s), HAProxy, NGINX, F5 | **Full** - Azure Local provides layer-4 load balancing. Open-source load balancers offer equivalent functionality; hardware load balancers exceed it. |
| **Azure Application Gateway** | — | NGINX Ingress, Traefik, HAProxy, Envoy | **Partial** - No on-premises App Gateway. Ingress controllers provide L7 load balancing and WAF capabilities with different configuration models. |
| **Azure Firewall** | — | pfSense, OPNsense, Fortinet, Palo Alto Networks | **Partial** - No on-premises Azure Firewall. Enterprise firewalls provide superior features; open-source options require expertise. |
| **Azure VPN Gateway** | — | WireGuard, OpenVPN, IPsec (StrongSwan), pfSense | **Full** - Traditional VPN solutions widely available. Require manual configuration and certificate management. |
| **Azure ExpressRoute** | ExpressRoute (physical circuits) | Dedicated MPLS, Dark fiber, SD-WAN | **Full** - ExpressRoute is hybrid-only. Equivalent private connectivity available via telecom providers. |
| **Azure DNS** | Azure DNS (requires connectivity) | BIND, PowerDNS, Windows DNS Server, CoreDNS | **Full** - Traditional DNS servers provide equivalent authoritative DNS. Lack Azure's global anycast network. |
| **Azure Private Link** | — | VPN, Private VLANs, Internal load balancers | **Limited** - Private Link's service-level isolation difficult to replicate. Traditional networking provides similar isolation through segmentation. |

### Monitoring & Operations Services

| Azure PaaS Service | Azure Local (Connected) | Disconnected Alternative | Feature Parity Notes |
|--------------------|------------------------|--------------------------|----------------------|
| **Azure Monitor** | Azure Monitor (via Arc agents) | Prometheus + Grafana, Datadog, New Relic | **Partial** - Azure Monitor works via Arc connectivity. Prometheus stack provides robust metrics/alerting but requires assembly and management. |
| **Azure Log Analytics** | Log Analytics (via Arc agents) | Elasticsearch + Kibana, Splunk, Graylog | **Partial** - Log Analytics requires connectivity. ELK stack provides log aggregation and search; Splunk offers enterprise features at higher cost. |
| **Application Insights** | Application Insights (requires connectivity) | Jaeger, Zipkin, OpenTelemetry + backends | **Partial** - App Insights cloud-only. Distributed tracing tools provide observability but require instrumentation and separate APM stack. |
| **Azure Update Management** | Azure Update Manager (via Arc) | WSUS, SCCM, Ansible, Spacewalk (Red Hat) | **Full** - Traditional update management tools fully functional. Azure Update Manager provides cross-platform unified experience via Arc. |
| **Azure Automation** | — | Ansible, Puppet, Chef, Jenkins, Rundeck | **Partial** - No on-premises Automation equivalent. Configuration management and orchestration tools provide automation but different paradigms. |

### DevOps & CI/CD Services

| Azure PaaS Service | Azure Local (Connected) | Disconnected Alternative | Feature Parity Notes |
|--------------------|------------------------|--------------------------|----------------------|
| **Azure DevOps Services** | Azure DevOps Server (on-premises) | GitLab (self-hosted), Jenkins, TeamCity | **Full** - Azure DevOps Server provides full on-premises DevOps lifecycle. GitLab offers similar integrated platform. |
| **GitHub Actions** | GitHub Enterprise Server (self-hosted runners) | GitLab CI, Jenkins, Drone CI, Tekton | **Partial** - GitHub requires connectivity for Actions. Self-hosted GitLab provides integrated CI/CD; Jenkins offers flexibility with complexity. |
| **Azure Container Registry** | Azure Container Registry (requires connectivity) | Harbor, JFrog Artifactory, Sonatype Nexus | **Full** - Harbor and Artifactory provide enterprise container registries with security scanning, replication, and RBAC. |
| **Azure Artifacts** | Azure DevOps Server Artifacts | JFrog Artifactory, Sonatype Nexus, Verdaccio | **Full** - Universal package managers handle NuGet, npm, Maven, etc. Enterprise versions offer extensive features. |
| **Azure Pipelines** | Azure DevOps Server Pipelines | Jenkins, GitLab CI, Tekton (K8s-native) | **Full** - Self-hosted CI/CD platforms provide equivalent build/deploy capabilities with varying YAML syntax and integrations. |

### Additional Azure Services

| Azure PaaS Service | Azure Local (Connected) | Disconnected Alternative | Feature Parity Notes |
|--------------------|------------------------|--------------------------|----------------------|
| **Azure AI Services (Cognitive Services)** | — | TensorFlow, PyTorch, ONNX Runtime, OpenVINO | **Limited** - No on-premises Cognitive Services. ML frameworks require model training, optimization, and deployment expertise. |
| **Azure Machine Learning** | — | Kubeflow, MLflow, Seldon Core, KServe | **Partial** - No on-premises AML. Open-source MLOps stacks provide training, serving, and lifecycle management with significant setup. |
| **Azure IoT Hub** | — | Eclipse Mosquitto (MQTT), RabbitMQ, ThingsBoard | **Partial** - No on-premises IoT Hub. MQTT brokers provide device connectivity; lack IoT Hub's device management and DPS features. |
| **Azure Backup** | Azure Backup (via Arc agents, requires connectivity) | Veeam, Commvault, Bacula, Duplicity | **Full** - Enterprise and open-source backup solutions mature and feature-rich. Lack cloud-tier automation. |
| **Azure Site Recovery** | — | Veeam, Zerto, VMware SRM | **Full** - Disaster recovery tools provide replication and failover. Require planning and regular DR testing. |

## Feature Parity Assessment

### What You Gain with Azure PaaS

- **Zero infrastructure management**: Microsoft handles patching, scaling, HA, backups
- **Deep service integration**: Services connect seamlessly with managed identities, private endpoints, unified RBAC
- **Global scale**: Auto-scaling, geo-distribution, CDN integration
- **Advanced features**: Serverless compute, AI/ML integration, fully managed data platforms
- **Compliance & certifications**: Pre-certified for most regulatory frameworks

### What You Gain with Azure Local (Connected)

- **Data locality**: Workloads run on-premises while Azure integration remains
- **Lower latency**: Local compute/storage for latency-sensitive workloads
- **Hybrid management**: Single control plane (Azure portal) for cloud and on-premises
- **Sovereignty**: Data remains on-premises; meets some data residency requirements
- **Cloud services on-premises**: Arc-enabled services provide near-PaaS experience locally

### What You Gain with Disconnected Alternatives

- **Complete autonomy**: No dependency on Azure connectivity or Microsoft services
- **Air-gapped security**: No external network exposure; suitable for classified environments
- **Avoid cloud costs**: No egress fees, data transfer costs, or per-hour consumption charges
- **Vendor independence**: Open-source or multi-vendor solutions reduce lock-in
- **Full operational control**: You control update schedules, configurations, and security policies

### What You Lose Moving Down the Continuum

| Moving from... | To... | What You Lose |
|----------------|-------|---------------|
| **Azure PaaS** | **Azure Local (Connected)** | Global scale, serverless compute, some advanced AI/ML services, automatic regional failover, zero-infrastructure management |
| **Azure Local (Connected)** | **Disconnected** | Azure portal management, automatic updates from Azure, managed identity integration, Azure Policy enforcement, unified billing and monitoring |
| **Any Azure Integration** | **Fully Disconnected** | All Azure integrations, Entra ID authentication, Azure RBAC, Azure Monitor, Defender for Cloud, automatic compliance scanning |

## Decision Guidance

### When to Accept Reduced Functionality

**Choose disconnected alternatives when:**

- **Regulatory mandates require air-gapping** (classified systems, defense, intelligence)
- **Data sovereignty laws prohibit cloud connectivity** (specific national regulations)
- **Operational sovereignty is paramount** (critical infrastructure, utilities)
- **Cost models favor CapEx over OpEx** (long-term workloads, predictable capacity)
- **Network connectivity is unreliable or unavailable** (remote sites, maritime, field operations)

**Accept reduced functionality by:**

- Investing in operational expertise for self-managed services
- Implementing compensating controls (manual compliance checks, offline updates)
- Building internal automation and IaC for consistency
- Planning for higher operational overhead and longer deployment cycles

### When to Seek Full Replacements

**Avoid compromises when:**

- **Workload criticality demands feature parity** (e.g., financial transactions requiring ACID guarantees)
- **Compliance frameworks mandate specific capabilities** (e.g., FIPS 140-3 HSMs for encryption)
- **Operational teams lack expertise for partial solutions** (e.g., can't manage Kafka vs. Event Hubs)
- **Integration points are non-negotiable** (e.g., API compatibility for vendor systems)

**Seek full replacements through:**

- Commercial equivalents (e.g., Splunk vs. Azure Sentinel, Datadog vs. Azure Monitor)
- Enterprise open-source support (e.g., Red Hat OpenShift vs. AKS, Percona vs. Azure Database)
- Hybrid architectures maintaining Azure integration where possible via ExpressRoute or Arc

### Hybrid Patterns to Consider

1. **Cloud-first with on-premises data tier**: Use Azure for compute/orchestration; keep sensitive data on Azure Local or on-premises databases
2. **Replicate for sovereignty**: Run identical workloads in Azure and on-premises; route traffic based on data residency requirements
3. **Burst to cloud**: Primary workloads on Azure Local; burst to Azure for capacity or dev/test
4. **Arc-managed disconnected**: Use Arc when connectivity is available to push updates/policies; workloads run autonomously when disconnected

## References

- [Azure Arc-enabled services](https://learn.microsoft.com/en-us/azure/azure-arc/)
- [Azure Local documentation](https://learn.microsoft.com/en-us/azure/azure-local/)
- [Azure Stack Hub PaaS services](https://learn.microsoft.com/en-us/azure/azure-stack/operator/)
- [Azure Arc-enabled data services connectivity modes](https://learn.microsoft.com/en-us/azure/azure-arc/data/connectivity)
- [CNCF Cloud Native Landscape](https://landscape.cncf.io/)
- [Azure hybrid and multicloud patterns](https://learn.microsoft.com/en-us/azure/architecture/hybrid/hybrid-start-here)

---

> **Next:** [Additional Resources →](03-additional-resources.md)
