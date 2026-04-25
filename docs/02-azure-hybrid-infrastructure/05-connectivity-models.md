# Connectivity Models

## Introduction

The **connectivity model** between on-premises infrastructure and the Azure cloud is arguably the most critical architectural decision in hybrid system design. It fundamentally shapes what services are available, how management and monitoring operate, how identity and authentication function, and what operational procedures are required for updates, patching, and incident response.

In the context of the **Azure hybrid continuum**, organizations don't face a binary choice between "cloud" and "on-premises." Instead, they operate along a spectrum of connectivity patterns ranging from always-connected environments with high-bandwidth ExpressRoute circuits to completely air-gapped installations with no network path to Azure whatsoever.

This chapter explores three primary connectivity models—**Fully Connected**, **Partially Connected**, and **Disconnected (Air-Gapped)**—examining the architectural implications, trade-offs, and operational considerations for each. Understanding these models is essential for designing hybrid solutions that meet regulatory requirements, security classifications, and business needs while maximizing the value of Azure services where connectivity permits.

## The Three Connectivity Models

### Fully Connected: Always-On Azure Integration

**Fully Connected** environments maintain persistent, high-bandwidth connectivity to Azure, enabling real-time management, monitoring, and service integration. This is the default model for most hybrid deployments and unlocks the full value of Azure hybrid services.

#### Network Connectivity Options

**Azure ExpressRoute: Private Connectivity**

Azure ExpressRoute provides dedicated private connectivity between on-premises networks and Azure without traversing the public internet. It offers predictable performance, lower latencies, and higher security compared to internet-based connections.

**ExpressRoute Peering Types:**

- **Private Peering**: Connects on-premises networks to Azure Virtual Networks (VNets) using private (RFC 1918) IP addresses. Used for IaaS workloads like VMs, databases, and storage accessible only via private IPs.

- **Microsoft Peering**: Provides connectivity to Azure PaaS services (Azure SQL, Storage, etc.) and Microsoft 365/Dynamics 365 using public IP addresses over the ExpressRoute circuit. Traffic stays off the public internet but accesses Microsoft services via their public endpoints.

- **ExpressRoute Global Reach**: Allows connecting multiple on-premises sites to each other through Microsoft's global backbone network by linking ExpressRoute circuits. For example, a US datacenter and EU datacenter, each with ExpressRoute to Azure, can communicate directly through Microsoft's network rather than routing over the internet or a third-party WAN.

!!! tip "ExpressRoute Benefits"
    ExpressRoute circuits provide bandwidth options from 50 Mbps to 100 Gbps with 99.95% SLA (standard) or 99.99% (with redundant circuits). For hybrid workloads requiring low-latency access to Azure storage or databases, ExpressRoute can reduce latency from 50-100ms (internet) to 5-20ms (private peering).

**Site-to-Site VPN: Internet-Based Alternative**

For scenarios where ExpressRoute cost or lead time is prohibitive, Azure VPN Gateway provides encrypted IPsec tunnels over the public internet:

- **Standard VPN Gateway**: Up to 650 Mbps aggregate throughput with 10-30 site-to-site tunnels
- **High Performance VPN Gateway**: Up to 1.25 Gbps throughput with up to 100 tunnels
- **Active-Active Configuration**: Redundant gateways for 99.95% SLA

VPN is ideal for branch offices, development environments, or initial hybrid deployments before ExpressRoute provisioning.

**Azure Virtual WAN: Branch Office and SD-WAN Integration**

Azure Virtual WAN simplifies large-scale branch connectivity by providing a hub-and-spoke architecture managed through Azure:

- Aggregates site-to-site VPN, point-to-site VPN, and ExpressRoute connectivity
- Integrates with SD-WAN partners (Cisco, Citrix, VMware VeloCloud) for automated branch provisioning
- Provides transitive routing between branches through Azure backbone
- Simplifies management of 50+ branch locations with centralized policy and monitoring

#### Available Services and Capabilities

In fully connected mode, the complete Azure hybrid service portfolio is available:

**Management and Monitoring:**

- Azure Arc for centralized resource management and policy enforcement
- Azure Monitor with full telemetry streaming (metrics, logs, traces)
- Azure Security Center for threat detection and vulnerability assessment
- Azure Update Management for automated patching orchestration
- Azure Automation for runbook execution and configuration management

**Identity and Access:**

- Microsoft Entra ID (formerly Azure AD) for cloud-native authentication
- Azure AD Connect for hybrid identity synchronization
- Azure AD Application Proxy for secure remote access to on-premises apps
- Conditional Access policies enforced from cloud to on-premises resources

**Data Services:**

- Azure Backup for VM and file-level backup with cloud storage
- Azure Site Recovery for disaster recovery with automated failover
- Azure File Sync for multi-site file server synchronization
- Azure SQL Database Managed Instance hybrid connectivity

**Developer Services:**

- Azure DevOps pipelines with on-premises build agents
- Azure Container Registry replication to on-premises registries
- GitHub Actions with self-hosted runners
- Azure API Management hybrid gateway for on-premises APIs

#### Operational Characteristics

**Update Management:**

Updates and patches flow automatically from Azure:

- Azure Local (Stack HCI) receives monthly quality updates and feature updates via Arc
- Azure Arc-enabled servers pull configuration updates and extensions automatically
- Azure Kubernetes Service (AKS) hybrid receives cluster updates orchestrated from Azure

**Monitoring and Alerting:**

Telemetry streams continuously to Azure Monitor:

- Metrics every 1-5 minutes (configurable)
- Log Analytics agent forwards logs in near-real-time
- Azure Monitor alerts trigger based on cloud-defined rules
- Application Insights provides distributed tracing across hybrid workloads

**Security Posture:**

Continuous security assessment and enforcement:

- Microsoft Defender for Cloud scans for vulnerabilities and misconfigurations
- Azure Policy evaluates compliance against organizational standards
- Azure Sentinel (SIEM) ingests security logs for threat detection
- Just-In-Time VM access grants temporary admin privileges from Azure

!!! warning "Dependency on Connectivity"
    Fully connected mode means cloud services are critical dependencies. If connectivity to Azure is lost, management operations degrade, monitoring goes dark, and automated processes (backups, updates, policy enforcement) fail. Design for resilient connectivity with redundant circuits or failover to VPN.

### Partially Connected: Intermittent and Store-and-Forward

**Partially Connected** (also called **Intermittent Connectivity**) describes environments where network connectivity to Azure exists but is unreliable, bandwidth-constrained, or expensive—common in remote branch offices, maritime environments, field operations, or locations with satellite internet.

#### Connectivity Characteristics

- Network connectivity exists but is subject to interruptions (daily/weekly outages)
- Bandwidth is limited (sub-10 Mbps) or expensive (metered satellite links)
- Latency is high (500ms+) making real-time interactions impractical
- Connectivity windows may be scheduled (e.g., overnight sync windows)

#### Azure Arc Agent Behavior

Azure Arc is designed to handle intermittent connectivity through intelligent retry and buffering:

**Heartbeat and Reconnection:**

- Arc agents send heartbeats to Azure every 5 minutes when connected
- If connectivity is lost, agents enter exponential backoff retry (attempt every 1min, 2min, 5min, 15min, 30min, 1hr)
- When connectivity is restored, agents re-authenticate and resume normal operation
- Agents can operate disconnected for up to 30 days before resource status shows "Expired" in Azure portal

**Offline Operation:**

During disconnection periods:

- Local resources (VMs, containers, services) continue running normally
- Local management interfaces (Windows Admin Center, kubectl) remain functional
- Configuration changes made locally are not synchronized to Azure until reconnection
- Policy enforcement continues using last-known-good policies cached locally

**Synchronization on Reconnect:**

When connectivity resumes:

- Arc agents upload buffered telemetry data (metrics, logs, events) to Azure Monitor
- Configuration drift is detected and reconciled based on Azure-defined desired state
- Pending updates and extensions are downloaded and applied
- Policy compliance is re-evaluated and violations are reported

!!! tip "Intermittent Connectivity Best Practices"
    - Configure local log retention for at least 7-14 days to avoid data loss during extended outages
    - Use Azure Monitor query-time aggregation rather than real-time alerting for high-latency environments
    - Schedule maintenance windows during known connectivity periods
    - Implement local monitoring (Prometheus/Grafana) as fallback during Azure disconnection

#### What Works Offline vs. Requires Connectivity

**Works Without Azure Connectivity:**

- VM creation, deletion, and management (locally provisioned)
- Container deployment and orchestration (AKS hybrid, standalone Kubernetes)
- Storage operations (local Storage Spaces Direct, file shares)
- Networking (virtual switches, SDN when configured)
- Local authentication (AD DS, local accounts)
- Application workloads running on VMs or containers

**Requires Connectivity to Azure:**

- Azure Arc resource registration and initial onboarding
- Azure Policy evaluation and reporting (uses cached policies offline)
- Azure Monitor metric and log ingestion (buffered locally until reconnect)
- Azure Backup job execution (jobs queue until connectivity resumes)
- Azure Site Recovery replication (RPO extends during outage)
- Certificate renewal from Azure Key Vault (ensure local caching)
- Arc-enabled data services (SQL MI, PostgreSQL) sync to Azure

**Degraded During Disconnection:**

- Azure portal visibility (resources show as "offline" or "disconnected")
- Azure Update Management (updates queue but don't apply)
- Microsoft Defender for Cloud (vulnerability scans don't run)
- Azure Automation runbook execution (queued until reconnection)

#### Designing for Intermittent Connectivity

**Local Caching and Buffering:**

- Deploy Azure File Sync with cloud tiering disabled to maintain full local file copies
- Configure Log Analytics agent with local buffering (up to 6GB per agent)
- Use Azure Backup with local cache sizing (10-15% of protected data)
- Cache container images locally in on-premises registries

**Scheduled Synchronization:**

- Align backup windows with connectivity windows (e.g., overnight sync via satellite)
- Schedule Arc agent sync during maintenance windows
- Use Azure Data Box for initial large data transfer, incremental sync thereafter

**Hybrid Monitoring:**

- Deploy Prometheus and Grafana locally for real-time monitoring
- Forward Prometheus metrics to Azure Monitor during connectivity windows
- Use local alerting for critical issues, cloud alerting for trend analysis

### Disconnected (Air-Gapped): Zero Azure Connectivity

**Disconnected** or **Air-Gapped** environments have no network connectivity to Azure or the public internet—either physically (no network path) or logically (isolated networks with no external routing). These scenarios are driven by security classification, regulatory requirements, or operational necessity.

#### Use Cases and Requirements

**Classified Government and Military:**

- Secret, Top Secret, or special access program (SAP) workloads
- Defense installations with physical network separation requirements
- Intelligence community environments with SCIF (Sensitive Compartmented Information Facility) constraints

**Critical Infrastructure:**

- Industrial control systems (SCADA/ICS) requiring isolated networks
- Nuclear facilities with regulatory prohibition on internet connectivity
- Financial trading systems with microsecond latency requirements (co-location)

**Regulatory Compliance:**

- ITAR (International Traffic in Arms Regulations) controlled environments
- Healthcare systems in jurisdictions prohibiting cloud data transmission
- Sovereign nations requiring complete data residency with no external communication

#### Azure Stack Hub: The Disconnected Solution

**Azure Stack Hub** is the only Azure Stack product designed for fully disconnected operation. Unlike Azure Local or Azure Stack Edge (which require periodic connectivity), Stack Hub can operate indefinitely without any network path to Azure.

**Disconnected Capabilities:**

- Full Azure Resource Manager (ARM) locally, supporting infrastructure-as-code templates
- Local Azure Marketplace with manually imported VM images, extensions, and services
- PaaS services: App Services, Functions, SQL/MySQL databases, Event Hubs, Key Vault
- Local identity via Active Directory Federation Services (ADFS) or disconnected Azure AD
- Local role-based access control (RBAC) and subscriptions

**What Doesn't Work:**

- Azure portal access (use local Stack Hub portal at `https://portal.local.azurestack.external`)
- Azure Monitor integration (use local monitoring solutions)
- Azure Backup to cloud (local backup solutions required)
- Azure Marketplace browsing (content must be downloaded on connected system and imported via removable media)

#### Operational Model for Air-Gapped Environments

**Update and Patch Management:**

Updates are delivered manually via physical media:

1. **Download Updates**: On a connected system with internet access, download Azure Stack Hub update packages (monthly quality updates, quarterly feature updates)
2. **Transfer**: Copy update packages to removable media (USB drives, DVDs) or transfer via secure network to a bastion system
3. **Import**: Import update packages into Azure Stack Hub via privileged endpoint or administrator portal
4. **Apply**: Schedule maintenance window and apply updates (typically 2-6 hours depending on update type)

!!! warning "Update Cadence"
    Azure Stack Hub requires updates to be applied within 6 months of release to maintain support. Disconnected environments must plan regular update cycles with adequate testing to avoid falling out of support.

**Marketplace Management:**

Marketplace items (VM images, extensions, solutions) are synchronized offline:

1. **Marketplace Syndication Tool**: Run tool on connected system with Azure subscription
2. **Download Items**: Select desired marketplace items (Windows Server, Linux, SQL Server, etc.)
3. **Package Export**: Tool creates compressed packages for transfer
4. **Import to Stack Hub**: Upload packages to Stack Hub storage account and publish to local marketplace
5. **User Consumption**: Tenants deploy from local marketplace as if connected to Azure

**Identity and Authentication:**

Disconnected environments use local identity providers:

- **Active Directory Federation Services (ADFS)**: Federated authentication using on-premises AD DS, recommended for air-gapped environments
- **Disconnected Azure AD**: A special mode of Azure AD that authenticates locally without cloud synchronization (limited availability, requires Microsoft approval)
- **Local Accounts**: Service accounts and break-glass administrative accounts for emergency access

**Monitoring Without Cloud:**

Deploy local monitoring and logging infrastructure:

**Prometheus + Grafana Stack:**

- Deploy Prometheus for metrics collection from VMs, containers, and infrastructure
- Use Grafana for dashboards and visualization
- Alert using Alertmanager with email, PagerDuty, or local notification systems

**Elastic Stack (ELK):**

- Elasticsearch for log aggregation and search
- Logstash or Fluentd for log forwarding from systems
- Kibana for log visualization and analysis

**Local SIEM:**

- Splunk Enterprise for security information and event management
- QRadar, ArcSight, or other air-gapped SIEM solutions for threat detection

**Syslog and Event Collection:**

- Forward Windows Event Logs and Linux syslog to central collectors
- Use PowerShell Desired State Configuration (DSC) pull servers for configuration management

#### Azure Local in Disconnected Mode: Not Recommended

While technically possible to deploy Azure Local without Arc registration, it's not a supported or recommended configuration:

- Loses access to Azure-managed updates (must use WSUS or local update infrastructure)
- No Azure portal management (Windows Admin Center only)
- No Azure Backup, Site Recovery, or cloud-integrated services
- No Azure Policy, Security Center, or Defender for Cloud integration
- Essentially operates as standalone Windows Server Hyper-V cluster

For disconnected scenarios, **choose Azure Stack Hub** rather than attempting to use Azure Local offline.

<!-- DIAGRAM: Connectivity models comparison - will be added by Seldon -->

## Choosing a Connectivity Model: Decision Factors

The connectivity model choice is driven by a combination of regulatory, technical, and business factors:

### Regulatory and Compliance Requirements

| Requirement | Recommended Model |
|------------|-------------------|
| Data must not leave sovereign borders | Disconnected (if cloud region not available) or Fully Connected to in-country region |
| Classified workloads (Secret/Top Secret) | Disconnected (Azure Stack Hub) |
| ITAR-controlled data | Disconnected or Fully Connected with Azure Government |
| HIPAA/healthcare data residency | Fully Connected with BAA compliance or Partially Connected with local processing |
| Financial services data residency | Fully Connected with compliance certifications or Disconnected for trading systems |
| PCI-DSS cardholder data | Fully Connected with network segmentation or Partially Connected with local tokenization |

### Security Classification and Threat Model

**High Security Environments:**

- **Defense in Depth**: Use disconnected mode for most sensitive workloads, fully connected for dev/test
- **Zero Trust Networks**: Fully connected with microsegmentation, encrypted traffic, and continuous verification
- **Insider Threat Mitigation**: Disconnected mode reduces external attack surface but requires stronger internal controls

**Standard Enterprise Security:**

- Fully connected is appropriate with standard security controls (firewalls, IDS/IPS, MFA)
- Use Private Link/ExpressRoute to avoid public internet exposure
- Implement Azure Policy for continuous compliance validation

### Network Characteristics and Cost

| Network Characteristic | Recommended Model |
|------------------------|-------------------|
| High-bandwidth fiber (1Gbps+) | Fully Connected (ExpressRoute preferred) |
| Standard business internet (50-100Mbps) | Fully Connected (VPN acceptable) |
| Satellite internet (<10Mbps, high latency) | Partially Connected with scheduled sync |
| Metered/expensive bandwidth | Partially Connected with data optimization |
| Unreliable connectivity (daily outages) | Partially Connected with local caching |
| No network path (isolated facility) | Disconnected (Azure Stack Hub) |

### Operational Maturity and Expertise

**Cloud-First Organizations:**

- Fully connected maximizes Azure service value
- Centralized management from Azure portal
- Lower on-premises expertise requirements

**Traditional Datacenter Operations:**

- Partially or fully connected with local management tools (Windows Admin Center)
- Gradual adoption of cloud management
- Retain local expertise during transition

**High-Security/Defense Sectors:**

- Disconnected requires significant on-premises expertise
- Manual update and patch processes demand rigorous change management
- Local monitoring and incident response capabilities essential

## Transitioning Between Connectivity Models

Organizations may need to transition between connectivity models over time as requirements, regulations, or technologies change.

### Connected to Partially Connected

**Scenario**: Cost reduction initiative moves from ExpressRoute to VPN, or branch office loses reliable connectivity.

**Transition Steps:**

1. **Enable Local Caching**: Deploy Azure File Sync with cloud tiering disabled, configure backup local cache
2. **Implement Local Monitoring**: Deploy Prometheus/Grafana alongside Azure Monitor
3. **Schedule Sync Windows**: Configure backup and update jobs during connectivity windows
4. **Test Offline Operation**: Simulate connectivity loss and verify workloads continue operating
5. **Update Runbooks**: Document procedures for manual intervention during extended outages

**Risk Mitigation:**

- Increase local storage capacity for log retention and caching
- Implement local alerting for critical issues
- Train operations team on local management tools

### Connected to Disconnected

**Scenario**: Workload reclassified to higher security level requiring air-gap, or regulatory change prohibits cloud connectivity.

**Transition Steps:**

1. **Deploy Azure Stack Hub**: Procure and install disconnected Stack Hub environment
2. **Export Workloads**: Export VMs, containers, and data from Azure or Azure Local
3. **Rebuild Identity**: Implement ADFS with local AD DS for authentication
4. **Establish Update Process**: Create procedure for downloading and importing updates via physical media
5. **Deploy Local Monitoring**: Implement Prometheus, ELK, or Splunk for observability
6. **Migrate Applications**: Redeploy applications using ARM templates in Stack Hub
7. **Decommission Connected Infrastructure**: After validation, remove Azure connectivity

**Risk Mitigation:**

- Pilot with non-production workloads first
- Run parallel environments during transition (6-12 months)
- Thoroughly document all manual processes (updates, marketplace sync, backup)

### Partially Connected to Fully Connected

**Scenario**: Infrastructure upgrade provides reliable connectivity, or business priority shifts to cloud-first.

**Transition Steps:**

1. **Upgrade Connectivity**: Replace VPN with ExpressRoute or upgrade bandwidth
2. **Enable Real-Time Services**: Activate Azure Site Recovery, continuous backup, real-time monitoring
3. **Migrate to Azure Monitor**: Replace local Prometheus/Grafana with full Azure Monitor integration
4. **Enable Automated Updates**: Switch from scheduled to automatic Azure-managed updates
5. **Adopt Cloud Services**: Integrate Azure DevOps, Security Center, Sentinel, and other cloud services

**Risk Mitigation:**

- Maintain local monitoring as backup during initial transition
- Gradually increase dependency on cloud services
- Monitor connectivity SLA for 90 days before full cutover

### Disconnected to Connected

**Scenario**: Security declassification, regulatory change, or business need for cloud integration.

**Transition Steps:**

1. **Obtain Network Connectivity**: Provision ExpressRoute or VPN with appropriate security controls
2. **Security Review**: Conduct security assessment of exposing previously air-gapped environment
3. **Deploy Azure Local**: Replace Azure Stack Hub with Azure Local for Arc-based management
4. **Migrate Workloads**: Export from Stack Hub, import to Azure Local or Azure VMs
5. **Register with Arc**: Onboard servers and clusters to Azure Arc
6. **Enable Hybrid Services**: Activate backup, monitoring, security, and update management
7. **Decommission Stack Hub**: After validation, retire disconnected infrastructure

**Risk Mitigation:**

- Implement network segmentation and microsegmentation
- Deploy intrusion detection and prevention systems
- Maintain local identity and authentication capabilities as fallback
- Comprehensive penetration testing before production cutover

## Network Architecture Examples

### Fully Connected: ExpressRoute with Redundancy

```
On-Premises Datacenters                     Azure Regions
┌──────────────────────┐                    ┌─────────────────┐
│  Primary Datacenter  │                    │   East US 2     │
│                      │                    │                 │
│  ┌────────────────┐  │                    │  ┌───────────┐  │
│  │ Azure Local    │  │  ExpressRoute      │  │  VNet     │  │
│  │ Cluster (Arc)  │──┼────Primary─────────┼──│  Hub      │  │
│  └────────────────┘  │  (10 Gbps)         │  └───────────┘  │
│                      │                    │        │        │
│  ┌────────────────┐  │                    │  ┌───────────┐  │
│  │ VPN Gateway    │──┼────Backup VPN──────┼──│  VPN GW   │  │
│  │ (Failover)     │  │                    │  └───────────┘  │
│  └────────────────┘  │                    │                 │
└──────────────────────┘                    └─────────────────┘
         │                                           │
         │                                           │
┌──────────────────────┐                    ┌─────────────────┐
│  DR Datacenter       │                    │   West US 2     │
│                      │                    │                 │
│  ┌────────────────┐  │  ExpressRoute      │  ┌───────────┐  │
│  │ Azure Local    │──┼────Secondary───────┼──│  VNet     │  │
│  │ Cluster (Arc)  │  │  (10 Gbps)         │  │  DR Site  │  │
│  └────────────────┘  │                    │  └───────────┘  │
└──────────────────────┘                    └─────────────────┘
```

**Characteristics:**

- ExpressRoute Global Reach connects on-premises sites through Azure backbone
- VPN provides failover if ExpressRoute circuit fails
- Azure Virtual WAN hub in each region for transitive routing
- Site Recovery replicates between on-premises sites via Azure

### Partially Connected: Scheduled Synchronization

```
Remote Branch Office              Azure
┌─────────────────────┐          ┌──────────────────┐
│ Azure Local (1-node)│          │  Azure Monitor   │
│                     │          │  (Buffered Logs) │
│  Workloads run      │   ┌──────│                  │
│  locally always     │   │      │  Arc Management  │
│                     │   │      │  (Cached Policy) │
└─────────────────────┘   │      └──────────────────┘
        │                 │
        │  Satellite      │ Sync Window:
        │  Internet       │ • 2AM-6AM daily
        │  (512 Kbps)     │ • Metrics upload
        │                 │ • Log forwarding
        └─────────────────┘ • Update checks
                          │ • Backup (incremental)
                          │
    Rest of Day:          
    • Local operation only
    • No Azure portal visibility
    • Local monitoring/alerting
```

**Characteristics:**

- Azure Arc agent operates in intermittent mode with local buffering
- Scheduled sync during overnight satellite connectivity window
- Local Prometheus/Grafana for real-time monitoring
- Azure Monitor for long-term trend analysis and compliance

### Disconnected: Air-Gapped with Manual Update

```
Isolated Network (No External Connectivity)

┌────────────────────────────────────────────────┐
│  Secure Facility (Classified Network)         │
│                                                │
│  ┌──────────────────┐    ┌──────────────────┐ │
│  │ Azure Stack Hub  │    │ Update Staging   │ │
│  │ (Disconnected)   │    │ Server           │ │
│  │                  │    │                  │ │
│  │ • Local ARM      │    │ Downloads from   │ │
│  │ • Local Portal   │    │ connected system │ │
│  │ • ADFS Auth      │◄───┤ transferred via  │ │
│  │ • Local Services │    │ removable media  │ │
│  └──────────────────┘    └──────────────────┘ │
│         │                         │            │
│         │                         │            │
│  ┌──────────────────┐    ┌──────────────────┐ │
│  │ Local Monitoring │    │ Local Backup     │ │
│  │ (Prometheus/     │    │ (Veeam/NetBackup)│ │
│  │  Grafana)        │    │                  │ │
│  └──────────────────┘    └──────────────────┘ │
│                                                │
└────────────────────────────────────────────────┘

External Process (Manual):
1. Download updates on connected system
2. Security scan removable media
3. Physical transfer through secure perimeter
4. Import to update staging server
5. Apply updates during maintenance window
```

**Characteristics:**

- No network path to Azure or internet
- Manual update process via physical media (monthly cadence)
- Local identity (ADFS), monitoring (Prometheus), backup (on-premises solutions)
- Completely autonomous operation

## Summary: Connectivity Model Selection

| Decision Factor | Fully Connected | Partially Connected | Disconnected |
|----------------|----------------|---------------------|--------------|
| **Connectivity** | ExpressRoute or reliable VPN | Intermittent internet/satellite | No network path |
| **Azure Services** | Full hybrid portfolio | Limited to sync windows | None (Stack Hub only) |
| **Management** | Azure portal + Arc | Arc with buffering + local tools | Local portal only |
| **Identity** | Entra ID or hybrid | Entra ID or hybrid | ADFS or disconnected AAD |
| **Updates** | Azure-managed automatic | Scheduled during connectivity | Manual via physical media |
| **Monitoring** | Azure Monitor real-time | Azure Monitor buffered + local | Local monitoring only |
| **Backup** | Azure Backup continuous | Azure Backup scheduled | Local backup solutions |
| **Best For** | Modern hybrid workloads | Remote/branch offices | Classified/air-gapped |
| **Complexity** | Low (cloud-managed) | Medium (hybrid management) | High (manual processes) |
| **Azure Product** | Azure Local preferred | Azure Local with caching | Azure Stack Hub only |

**Key Principle**: Choose the most connected model that compliance and security requirements permit. Greater connectivity enables more Azure service value, simpler operations, and lower total cost of ownership. However, never compromise regulatory compliance or security requirements to achieve connectivity—design for the connectivity model your workload demands.

## References

- [Azure Local Network Requirements](https://learn.microsoft.com/en-us/azure/azure-local/concepts/firewall-requirements)
- [Azure ExpressRoute Overview](https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction)
- [Azure VPN Gateway](https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways)
- [Azure Virtual WAN](https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about)
- [Azure Stack Hub Disconnected Deployment](https://learn.microsoft.com/en-us/azure-stack/operator/azure-stack-disconnected-deployment)
- [Azure Arc Agent Connectivity](https://learn.microsoft.com/en-us/azure/azure-arc/servers/network-requirements)
- [ExpressRoute Peering](https://learn.microsoft.com/en-us/azure/expressroute/expressroute-circuit-peerings)

---

> **Next:** [Part 3 — Sovereignty & Compliance →](../03-sovereignty-and-compliance/README.md)
