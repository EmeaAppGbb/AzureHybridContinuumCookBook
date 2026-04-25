# Azure Local: Cloud Infrastructure On-Premises

## Introduction

Azure Local is Microsoft's distributed infrastructure solution that extends Azure capabilities into customer-owned environments. It facilitates the local deployment of both modern and legacy applications across distributed or sovereign locations, bringing the Azure experience — management, security, services, and innovation — to datacenters, branch offices, edge locations, and regulated environments where workloads must remain on-premises.

As part of Microsoft's [adaptive cloud](https://azure.microsoft.com/solutions/adaptive-cloud) approach, Azure Local accelerates cloud and AI innovation by seamlessly delivering new applications, workloads, and services from cloud to edge, using Azure Arc as the unifying control plane. This chapter explores Azure Local's architecture, capabilities, deployment models, and positioning within the broader Azure hybrid portfolio.

## What is Azure Local?

**Azure Local** (formerly known as Azure Stack HCI) is a hyperconverged infrastructure (HCI) platform that combines compute, storage, and networking into validated hardware clusters running a specialized operating system optimized for hybrid cloud scenarios. Unlike traditional on-premises infrastructure, Azure Local is designed from the ground up to integrate with Azure, providing a cloud-native management experience for on-premises workloads.

Azure Local enables organizations to:

- **Run workloads on-premises with Azure consistency**: Deploy virtual machines, containers, and data services using the same Azure Resource Manager APIs, Azure portal, and Azure CLI used in the cloud
- **Maintain cloud connectivity or operate disconnected**: Support deployments that are connected, partially connected, or fully disconnected from Azure, adapting to network availability and regulatory requirements
- **Leverage a broad partner ecosystem**: Choose from a comprehensive catalog of validated hardware solutions across multiple vendors, with prescriptive Bills of Materials (BOMs) ensuring compatibility and support
- **Extend Azure services locally**: Run Azure Kubernetes Service (AKS), Azure Virtual Desktop, Azure Arc-enabled data services, and other Azure workloads on-premises with near-identical experiences to cloud deployment

Azure Local is priced per physical core on on-premises machines, plus consumption-based charges for additional Azure services, all rolling up to existing Azure subscriptions. This pricing model aligns on-premises infrastructure costs with cloud-native consumption models.

!!! note "Naming Evolution"
    Microsoft rebranded Azure Stack HCI to Azure Local in late 2024 to better reflect its role as an extension of Azure into local environments. Existing Azure Stack HCI deployments continue to function and receive support under the Azure Local brand.

## Key Business Use Cases and Benefits

Azure Local serves several critical business needs where compute must remain on-premises due to latency, resiliency, compliance, or connectivity constraints:

### Local AI Inferencing
Data must be processed at the source to meet real-time requirements or minimize bandwidth costs. Examples include:

- Retail stores implementing self-checkout systems with computer vision loss prevention
- Manufacturing facilities running predictive maintenance models on production line telemetry
- Energy sector pipeline leak detection systems analyzing sensor data in remote locations
- Healthcare providers running diagnostic AI models on medical imaging without cloud uploads

### Mission-Critical Business Continuity
Systems that must continue running through network outages or cloud unavailability. Examples include:

- Production line operations in factories and warehouses where downtime costs thousands of dollars per minute
- Ticketing and access control systems in stadiums, amusement parks, and transit stations
- Emergency services dispatch and communication systems
- Hospitality point-of-sale and property management systems

### Control Systems and Near Real-Time Operations
Workloads with extreme latency requirements measured in single-digit milliseconds. Examples include:

- Manufacturing execution systems (MES) coordinating robotics and assembly lines
- Industrial quality assurance systems with inline inspection cameras
- Financial infrastructure such as trading systems requiring sub-millisecond latency
- Autonomous vehicle coordination systems at distribution centers and ports

### Strict Sovereignty and Regulatory Requirements
Industries requiring data be kept and controlled locally due to regulations. Examples include:

- Defense and intelligence sectors with classified or sensitive data
- Energy infrastructure such as power grids, nuclear facilities, and oil/gas operations
- Healthcare organizations subject to strict HIPAA or regional privacy laws
- Financial services with data residency requirements in specific jurisdictions

These use cases share a common thread: the need to maintain cloud-like agility, management, and innovation velocity while keeping infrastructure and data under local control.

## Azure Local Architecture

Azure Local implements a layered architecture stack integrating validated hardware, a specialized operating system, Azure management services, and workload hosting capabilities.

<!-- DIAGRAM: Azure Local architecture stack - will be added by Seldon -->

### Hardware Layer: Validated Solutions

Azure Local runs on validated hardware from Microsoft's partner ecosystem, ensuring compatibility, performance, and supportability. Partners include Dell Technologies, HPE, Lenovo, ASUS, DataON, Fujitsu, and others, offering:

- **Integrated systems**: Pre-configured, tested systems delivered as turnkey solutions
- **Validated nodes**: Individual servers certified for Azure Local that customers can assemble into clusters
- **Premier solutions**: High-performance systems optimized for specific workloads (e.g., GPU-accelerated for AI, high-density storage)
- **Ruggedized hardware**: Systems designed for harsh environments (dust, temperature extremes, vibration) suitable for industrial and military deployments

Hardware requirements typically include:

- **CPU**: x64 processors with Second Level Address Translation (SLAT) support
- **Memory**: Minimum 32 GB per node; production deployments typically 256 GB-1.5 TB
- **Storage**: NVMe or SSD drives for performance tier; optional HDD for capacity tier
- **Networking**: Minimum 10 Gbps for production; 25 Gbps or higher recommended for high-performance workloads
- **RDMA**: Remote Direct Memory Access (RDMA) support via iWARP or RoCE for low-latency storage networking

Azure Local supports **single-node** deployments for branch offices and edge locations, **two-node** clusters for small datacenters, and **multi-node** clusters scaling up to 16 nodes per cluster for large enterprise deployments.

### Operating System Layer: Azure Local OS

The Azure Local operating system is a specialized version of Windows Server optimized for hyperconverged infrastructure and hybrid cloud scenarios. Key characteristics include:

- **Subscription-based**: No traditional Windows Server license; included in Azure Local per-core pricing
- **Hyper-V hypervisor**: Enterprise-grade virtualization with nested virtualization support
- **Storage Spaces Direct**: Software-defined storage pooling local drives across cluster nodes
- **Software Defined Networking (SDN)**: Network virtualization, micro-segmentation, and network function virtualization capabilities
- **Cloud-first servicing**: Updates delivered through Windows Admin Center and Azure Update Manager

Unlike traditional Windows Server, Azure Local OS is purpose-built for cluster deployments and does not support roles beyond those required for hyperconverged infrastructure. General-purpose server workloads should run in VMs on Azure Local, not directly on the OS.

### Management Layer: Azure Arc Integration

Azure Local integrates deeply with **Azure Arc**, projecting the on-premises cluster and its resources into Azure Resource Manager. This integration enables:

- **Azure portal management**: View cluster health, manage VMs, configure networking, and monitor performance from the Azure portal
- **Azure CLI and PowerShell**: Script infrastructure deployments and management tasks using the same tools used for Azure cloud resources
- **Azure Resource Manager templates**: Deploy and configure resources using ARM templates, Bicep, or Terraform
- **Azure Policy**: Apply governance policies to Azure Local VMs and clusters, ensuring consistent security posture
- **Azure Monitor and Log Analytics**: Collect telemetry, metrics, and logs from clusters and workloads for centralized monitoring
- **Microsoft Defender for Cloud**: Extend cloud security posture management and threat protection to on-premises workloads
- **Azure Update Manager**: Orchestrate OS and firmware updates across Azure Local clusters

Azure Arc acts as the control plane bridge, enabling Azure Local to function as a logical extension of an Azure region while remaining physically on-premises.

### Workload Layer: Azure Services on Azure Local

Azure Local hosts multiple Azure service offerings, providing on-premises deployment options for cloud-native workloads:

**Azure Kubernetes Service (AKS) on Azure Local**: Fully supported Kubernetes clusters running on-premises with automated deployment, lifecycle management, and upgrade orchestration. AKS on Azure Local supports:

- Linux and Windows container workloads
- Azure Arc-enabled Kubernetes for policy enforcement and GitOps configuration management
- Azure Monitor Container Insights for observability
- GPU-accelerated node pools for AI/ML workloads

**Azure Arc-enabled Virtual Machines**: Create and manage VMs on Azure Local through the Azure portal, using Azure RBAC to delegate self-service access to developers and application teams. Features include:

- VM lifecycle operations (create, start, stop, delete) through Azure portal and APIs
- Integration with Azure Migrate for VM migration from on-premises VMware or Hyper-V
- Support for Windows Server, Linux distributions, and nested virtualization

**Azure Virtual Desktop (AVD) on Azure Local**: Deploy virtual desktop infrastructure (VDI) on-premises for scenarios requiring low latency, high graphics performance, or data locality, while managing through Azure Virtual Desktop control plane.

**Azure Arc-enabled Data Services**: Run Azure SQL Managed Instance and Azure Arc-enabled PostgreSQL on Azure Local with:

- Elastic scaling without downtime
- Automated backups and point-in-time restore
- Azure Data Studio and familiar Azure SQL tools
- Disconnected or connected operational modes

**Azure Stack HCI Storage**: Leverage Azure Local as a storage target for Azure Backup, Azure Site Recovery, and Azure File Sync, providing on-premises endpoints for Azure storage services.

## Deployment Models and Connectivity Scenarios

Azure Local supports flexible connectivity models to adapt to network availability, security requirements, and regulatory constraints:

### Connected Mode
The cluster maintains constant connectivity to Azure, enabling:

- Real-time telemetry streaming to Azure Monitor
- Immediate enforcement of Azure Policy changes
- Azure Active Directory authentication and conditional access
- Automatic updates and hotfixes delivered from Azure

Connected mode provides the richest management experience and is recommended for most deployments.

### Partially Connected (Intermittent) Mode
The cluster connects to Azure periodically (e.g., daily or weekly) to:

- Synchronize billing and usage data
- Download updates and policy changes
- Upload diagnostic logs

Partially connected mode suits locations with limited or expensive bandwidth, such as maritime vessels, remote research stations, or developing regions.

### Disconnected Mode
The cluster operates independently from Azure for extended periods (30+ days), suitable for:

- Air-gapped environments in defense or intelligence sectors
- Regulated industries prohibiting internet connectivity
- Disaster recovery scenarios where internet connectivity is unavailable

Disconnected mode requires manual processes for updates, license validation, and compliance reporting. Microsoft provides tools to transfer data via removable media.

!!! warning "Disconnected Mode Limitations"
    Disconnected mode limits access to Azure Arc-dependent features such as real-time policy enforcement, cloud-based monitoring, and automated updates. Plan for manual operational procedures when selecting disconnected deployments.

## Licensing, Billing, and Support

Azure Local uses a subscription-based licensing model integrated with Azure:

### Licensing Model
- **Per-core pricing**: Charged per physical CPU core in the Azure Local cluster, billed monthly to an Azure subscription
- **No separate Windows Server license required**: Included in Azure Local pricing
- **Guest OS licensing**: VMs running Windows Server guest OSs are covered by Azure Hybrid Benefit or existing licenses
- **Azure services consumption**: Additional charges for AKS, Azure Virtual Desktop, Azure Arc-enabled data services based on usage

### Billing Integration
All Azure Local charges roll up to an existing Azure subscription, appearing alongside cloud resource costs in Azure Cost Management. This unified billing simplifies budgeting and chargebacks for hybrid environments.

### Support
Azure Local is supported through the same Azure support plans (Developer, Standard, Professional Direct, Premier) used for Azure cloud services. Support includes:

- 24/7 access to Azure support engineers
- Hardware support coordinated through OEM partners
- Software updates and security patches
- Access to Azure architecture and best practices guidance

## Hardware Requirements and Validated Partners

Microsoft maintains an [Azure Local Catalog](https://azurelocal.microsoft.com/) listing validated hardware solutions across categories:

### Integrated Systems
Pre-configured turnkey solutions from partners:

- **Dell PowerEdge**: Multiple configurations from 2-node to 16-node clusters
- **HPE ProLiant**: Integrated systems with HPE GreenLake for flexible financing
- **Lenovo ThinkAgile**: Enterprise-grade clusters with Lenovo services
- **DataON**: Storage-optimized configurations for large-scale capacity

### Validated Nodes
Customers can assemble clusters from certified individual servers:

- Intel or AMD processors with SLAT support
- UEFI and TPM 2.0 for secure boot and encryption
- 10 Gbps or faster networking (25 Gbps recommended)
- NVMe or SSD storage for performance

### Premier Solutions
Specialized configurations for targeted workloads:

- **GPU-accelerated nodes**: NVIDIA GPUs for AI inferencing and graphics workloads
- **Storage-optimized nodes**: High-capacity HDD configurations for large datasets
- **Compute-optimized nodes**: High core count CPUs for virtualization density

Working with validated hardware ensures compatibility, Microsoft support, and access to firmware and driver updates tested specifically for Azure Local.

## Comparison with Azure Stack Hub and Azure Stack Edge

Microsoft offers multiple hybrid infrastructure products, each targeting different scenarios:

| Feature | Azure Local | Azure Stack Hub | Azure Stack Edge |
|---------|-------------|-----------------|------------------|
| **Deployment** | Customer-assembled or partner-integrated clusters | Microsoft-engineered appliance | Microsoft-engineered appliance |
| **Workloads** | VMs, AKS, Azure Arc services | Azure App Services, Azure Functions, VMs | Edge compute, AI inferencing |
| **Connectivity** | Connected, partially connected, disconnected | Connected or disconnected | Always connected |
| **Management** | Azure portal via Azure Arc | Azure portal (subset of Azure services) | Azure portal |
| **Hardware** | Multiple vendors, customizable | Single Microsoft-validated configuration | Single Microsoft configuration |
| **Use Cases** | General-purpose on-premises cloud | PaaS services in disconnected environments | Edge AI, data preprocessing |
| **Scaling** | 1-16 nodes per cluster | Fixed appliance (varies by model) | Single appliance |
| **Pricing** | Per-core subscription | Integrated appliance pricing | Appliance purchase + subscription |

**Choose Azure Local** for general-purpose virtualization, storage, and modern application deployments requiring flexible hardware choices and maximum control.

**Choose Azure Stack Hub** for running Azure PaaS services (App Services, Functions, Event Hubs) in disconnected or sovereignty scenarios where Azure Local's IaaS-focused model is insufficient.

**Choose Azure Stack Edge** for edge locations requiring AI acceleration, data preprocessing before cloud upload, or IoT gateway capabilities in a compact form factor.

## Comparing Azure Local to Competitive Solutions

Azure Local competes with hyperconverged infrastructure offerings from VMware, Nutanix, and public cloud edge solutions from AWS and Google:

### vs. AWS Outposts
- **Hardware flexibility**: Azure Local supports multiple OEM partners; AWS Outposts is single-vendor (AWS-manufactured)
- **Service breadth**: AWS Outposts provides deeper access to AWS PaaS services; Azure Local focuses on IaaS with Arc-enabled services
- **Pricing model**: Azure Local uses per-core subscription; AWS Outposts uses instance-based pricing like EC2

### vs. Google Distributed Cloud
- **Maturity**: Azure Local has broader enterprise deployment base; Google Distributed Cloud is newer
- **Integration depth**: Azure Arc provides deeper integration with Azure services than Anthos provides with Google Cloud
- **Partner ecosystem**: Azure Local's OEM ecosystem is more extensive than Google's limited hardware partners

### vs. VMware vSAN/vSphere
- **Cloud integration**: Azure Local provides native Azure management; VMware requires VMware Cloud Foundation or Tanzu for cloud integration
- **Licensing**: Azure Local includes OS and hypervisor in per-core pricing; VMware requires separate vSphere and vSAN licenses
- **Modernization path**: Azure Local emphasizes cloud-native workloads (AKS, Arc services); VMware focuses on traditional virtualization

Organizations already invested in VMware can use Azure Arc to extend Azure management to existing vSphere environments without replacing VMware infrastructure, providing a migration path toward Azure Local over time.

## Management Through Azure Portal, CLI, and PowerShell

Azure Local management uses the same tools and interfaces as Azure cloud resources:

### Azure Portal
- **Cluster registration and monitoring**: Register clusters, view health status, and monitor capacity
- **VM lifecycle management**: Create, configure, and manage VMs through familiar Azure VM experiences
- **Networking configuration**: Define virtual networks, subnets, and network security groups
- **Storage management**: Configure storage pools, volumes, and resilience settings
- **Update orchestration**: Schedule and deploy OS, firmware, and driver updates

### Azure CLI
All Azure Local operations are scriptable via Azure CLI extensions:

```bash
# Register an Azure Local cluster
az stack-hci cluster create --name MyCluster --resource-group MyRG

# Create a VM on Azure Local
az stack-hci vm create --name MyVM --resource-group MyRG --location "eastus" --custom-location MyCustomLocation
```

### Azure PowerShell
PowerShell modules provide deep configuration and automation capabilities:

```powershell
# Deploy AKS on Azure Local
New-AksHciCluster -Name MyAKS -NodeCount 3 -NodeVMSize Standard_D4s_v3
```

### Windows Admin Center
For initial cluster deployment and deep troubleshooting, Windows Admin Center provides a locally hosted web UI for:

- Cluster creation wizard
- Storage and networking configuration
- Performance monitoring and diagnostics
- Integration with Azure portal for hybrid management

The hybrid management model allows infrastructure teams to use familiar on-premises tools (Windows Admin Center, PowerShell) while enabling developers and application teams to self-serve through Azure portal and APIs, bridging traditional IT operations and cloud-native DevOps practices.

## Deployment Scalability and Multi-Rack Configurations

Azure Local supports scaling from single-node edge deployments to enterprise-scale multi-rack configurations:

### Single-Node Deployments
For branch offices, retail stores, and small remote sites:

- Minimum footprint: 1U or 2U server
- No shared storage requirement
- Limited VM density (typically 10-30 VMs depending on hardware)
- Local resilience through Azure Backup and Azure Site Recovery

### Hyperconverged Clusters (2-16 nodes)
For datacenters and larger facilities:

- Storage Spaces Direct pools drives across nodes for resiliency
- Support for two-way, three-way, and mirror-accelerated parity resilience
- Scale-out architecture adding capacity and performance by adding nodes
- Support for heterogeneous nodes (different CPU/memory/storage configurations)

### Multi-Rack Deployments
For large-scale enterprise datacenters:

- Scale beyond 16 nodes by deploying multiple clusters
- Manage multiple clusters as a unified resource pool through Azure portal
- Cross-cluster workload migration and disaster recovery
- Rack-level fault isolation

Azure Local's scalability model enables organizations to start small at the edge and scale up in the datacenter using the same management tools and operational practices.

## Why Azure Local Matters for the Hybrid Continuum

Azure Local is the **cornerstone technology** enabling the hybrid continuum by:

1. **Extending Azure Resource Manager everywhere**: On-premises resources become first-class Azure resources with Azure IDs, RBAC, and policy
2. **Enabling consistent developer experiences**: Developers deploy to Azure Local using the same APIs, CLI commands, and portal workflows as Azure cloud
3. **Bridging traditional IT and cloud operations**: Infrastructure teams manage physical hardware while application teams self-serve through Azure abstractions
4. **Supporting workloads that cannot move to the cloud**: Meeting latency, sovereignty, and compliance requirements without sacrificing cloud innovation
5. **Providing a cloud migration path**: Organizations can modernize on-premises workloads using Azure services before eventually migrating to Azure cloud

Without Azure Local, the hybrid continuum would be limited to Azure Arc's management capabilities over existing infrastructure. Azure Local provides the **platform layer** — compute, storage, networking, and Azure service hosting — that makes truly seamless cloud-to-edge architectures possible.

<!-- DIAGRAM: Azure Local architecture stack showing layers: Hardware (validated servers) → Azure Local OS → Azure services (VMs, AKS, data services) → Azure management plane (Azure portal, Azure Resource Manager) — will be added by Seldon -->

## References

- [Azure Local Overview](https://learn.microsoft.com/en-us/azure/azure-local/)
- [Azure Local Documentation](https://learn.microsoft.com/en-us/azure/azure-local/overview)
- [Azure Local Catalog (Hardware Solutions)](https://azurelocal.microsoft.com/)
- [Azure Local Pricing](https://azure.microsoft.com/en-us/pricing/details/azure-stack/hci/)
- [What's New in Azure Local](https://learn.microsoft.com/en-us/azure/azure-local/whats-new)
- [Azure Local Deployment Guide](https://learn.microsoft.com/en-us/azure/azure-local/deploy/deployment-introduction)
- [Azure Local Scalability and Deployments](https://learn.microsoft.com/en-us/azure/azure-local/scalability-deployments)
- [Hyperconverged Deployments Overview](https://learn.microsoft.com/en-us/azure/azure-local/overview/hyperconverged-overview)
- [Multi-Rack Deployments Overview](https://learn.microsoft.com/en-us/azure/azure-local/multi-rack/multi-rack-overview)

---

> **Next:** [Azure Arc →](03-azure-arc.md)
