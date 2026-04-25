# Azure Stack HCI

## Introduction

The Azure hybrid continuum extends beyond cloud-based services—it includes a family of on-premises and edge products that bring Azure capabilities to locations where workloads must stay local. Understanding the **Azure Stack family** is critical for architects and engineers designing hybrid solutions that span the connectivity spectrum from fully connected to completely air-gapped environments.

Azure Stack HCI (now evolving into **Azure Local**) is Microsoft's hyperconverged infrastructure offering that combines compute, storage, and networking on validated hardware while maintaining deep integration with Azure services. However, it's just one member of a broader product family, each designed for different scenarios and connectivity requirements.

This chapter examines the entire Azure Stack family, helping you understand when to use Azure Stack Hub, Azure Local (formerly Azure Stack HCI), or Azure Stack Edge—and how to navigate the migration path as these products converge under the Azure Local brand.

## The Azure Stack Family: Three Approaches to Hybrid Infrastructure

Microsoft's Azure Stack portfolio addresses three distinct hybrid and edge scenarios, each with different connectivity models, service offerings, and operational characteristics:

### Azure Stack Hub: Azure Cloud in Your Datacenter

**Azure Stack Hub** is an integrated hardware and software system that delivers a subset of Azure services in your datacenter, operating either connected to Azure or completely disconnected. It's designed for scenarios requiring true cloud consistency with the Azure public cloud, even when no internet connectivity is available.

**Key Characteristics:**

- **Full PaaS Capability**: Runs a local instance of Azure Resource Manager (ARM) with support for App Services, Azure Functions, Kubernetes (AKS Engine), SQL and MySQL PaaS databases, Key Vault, Event Hubs, and more
- **Marketplace and DevOps**: Includes a local Azure Marketplace for downloading images and extensions, supporting the same DevOps workflows used in Azure
- **Turnkey Appliance**: Delivered as integrated 4-16 node racks from Microsoft hardware partners (Dell, Lenovo, Cisco) with standardized configurations
- **Multi-Tenancy**: Native support for service provider scenarios with tenant isolation and chargeback
- **Disconnected Operation**: Fully functional in air-gapped environments with manual update delivery via physical media

**When to Use Azure Stack Hub:**

- Regulatory or data sovereignty requirements mandate on-premises processing with no cloud connectivity
- Military, government, or classified environments requiring air-gapped operations
- Service providers building multi-tenant cloud offerings for customers
- Edge locations (cruise ships, oil rigs, remote facilities) with no reliable connectivity
- Development teams needing cloud-consistent ARM templates and DevOps workflows but unable to use public cloud

!!! warning "Licensing and Scale Considerations"
    Azure Stack Hub requires capacity-based licensing (per physical core) and represents a significant infrastructure investment. The minimum deployment is 4 nodes, and updates follow a Microsoft-managed release cadence requiring careful planning in disconnected scenarios.

### Azure Stack Edge: AI and IoT at the Network Edge

**Azure Stack Edge** is a hardware-as-a-service (HaaS) offering designed for compute-intensive edge workloads, particularly AI inferencing, IoT data processing, and high-speed data transfer to Azure. Unlike the other Stack products, it's delivered as a managed appliance directly from Microsoft.

**Key Characteristics:**

- **Purpose-Built Hardware**: GPU or FPGA-accelerated appliances optimized for AI/ML inferencing at the edge
- **Edge Compute**: Run containerized applications, VMs, and AI models locally with Azure Stack Edge Kubernetes or IoT Edge runtime
- **Data Pipeline**: High-speed data transfer capabilities with local caching, preprocessing, and filtering before cloud upload
- **Managed Service**: Microsoft manages hardware lifecycle, firmware updates, and appliance monitoring
- **Azure Integration**: Tight integration with Azure Machine Learning, IoT Hub, Storage, and Cognitive Services

**When to Use Azure Stack Edge:**

- Manufacturing facilities processing video analytics or quality inspection using computer vision
- Retail stores running real-time customer analytics or inventory management with local AI inference
- Healthcare environments requiring low-latency processing of medical imaging
- Branch offices needing local data caching and preprocessing before cloud transfer
- Scenarios requiring rapid on-premises AI model updates synchronized from Azure ML

!!! tip "HaaS Model Benefits"
    The hardware-as-a-service model means you pay a monthly subscription that includes hardware replacement, support, and lifecycle management—ideal for distributed edge locations where IT support is limited.

### Azure Local (Formerly Azure Stack HCI): The Converged Hypervisor

**Azure Local** represents the evolution and rebranding of Azure Stack HCI, positioning it as the primary on-premises virtualization platform with deep Azure integration. It's designed for organizations modernizing their virtualization infrastructure while maintaining workload locality for performance, compliance, or cost reasons.

**Key Characteristics:**

- **Hyperconverged Infrastructure**: Software-defined compute, storage (Storage Spaces Direct), and networking on validated hardware from multiple vendors
- **Flexible Hardware**: Choose from 20+ hardware partners (Dell, HPE, Lenovo, Cisco, DataON, etc.) with various configurations from 1-16+ node clusters
- **Azure Hybrid Services**: Native integration with Azure Arc, Backup, Site Recovery, Monitor, Security Center, Update Management, and Azure Virtual Desktop
- **Modern Workloads**: Support for Windows/Linux VMs, Azure Kubernetes Service (AKS), Azure Virtual Desktop, and containerized applications
- **Cloud Management**: Managed through Azure Portal with optional Windows Admin Center for local operations

**When to Use Azure Local:**

- Modernizing or replacing aging VMware, Hyper-V, or legacy SAN-based infrastructure
- Branch office and remote office consolidation (ROBO) scenarios requiring resilient local compute
- Virtual desktop infrastructure (VDI) with Azure Virtual Desktop on-premises
- High-performance SQL Server or database workloads requiring local storage performance
- Organizations wanting Azure-consistent management but keeping compute on-premises

!!! info "The Azure Local Transition"
    In 2024, Microsoft announced that Azure Stack HCI would evolve into the Azure Local brand, signaling tighter convergence with Azure services, unified licensing through Azure subscriptions, and deeper Arc-based management. Existing Azure Stack HCI deployments will transition to Azure Local branding with continued support and migration paths.

<!-- DIAGRAM: Azure Stack family comparison - will be added by Seldon -->

## Product Comparison: Choosing the Right Stack

The following table compares the three Azure Stack products across key dimensions to help guide architectural decisions:

| Dimension | Azure Stack Hub | Azure Local (HCI) | Azure Stack Edge |
|-----------|----------------|-------------------|------------------|
| **Primary Use Case** | Full Azure services on-prem | Virtualization + hybrid services | Edge AI/IoT + data transfer |
| **Service Model** | Integrated platform | OS + validated hardware | Hardware-as-a-Service |
| **Connectivity** | Optional (works disconnected) | Periodic (Arc requires sync) | Expected (but can buffer) |
| **PaaS Services** | App Services, Functions, SQL, Event Hubs | None (IaaS only) | Container runtime only |
| **Hardware** | Turnkey 4-16 node racks | Flexible vendor choice, 1-16+ nodes | Microsoft-managed appliance |
| **Management** | Local ARM + optional Azure | Azure Portal + Arc | Azure Portal (managed) |
| **Multi-Tenancy** | Native support | Limited (via Arc) | Not supported |
| **Licensing** | Capacity-based (per core) | Subscription per core | Monthly HaaS subscription |
| **Update Model** | Manual downloads or connected | Azure-managed via Arc | Automatic from Microsoft |
| **Storage** | Shared storage or S2D | Storage Spaces Direct (S2D) | Local SSDs + cloud tier |
| **Networking** | SDN with Network Controller | SDN optional, flexible | Fixed appliance config |
| **GPU/FPGA** | Not available | Optional (vendor-dependent) | Built-in for AI workloads |
| **Typical Deployment** | Datacenters, classified sites | Branch offices, datacenters | Retail, manufacturing edge |
| **Minimum Nodes** | 4 nodes | 1 node (stretched: 2+) | 1 appliance |
| **Marketplace** | Local marketplace catalog | Arc-enabled extensions | N/A |
| **Disaster Recovery** | Cross-site replication | Azure Site Recovery | Cloud backup integration |

## Azure Stack HCI to Azure Local: The Migration Path

The evolution from Azure Stack HCI to Azure Local represents more than a rebranding—it signals a strategic shift toward deeper Azure integration, unified billing, and Arc-centric management.

### What's Changing

**Branding and Positioning**

- Azure Stack HCI becomes **Azure Local**, emphasizing that it's a local extension of Azure rather than a separate stack product
- Unified marketing and documentation under the Azure Local family, including future on-premises offerings

**Management and Lifecycle**

- Deeper Azure Arc integration for all management operations, configuration, and compliance
- Unified Azure portal experience for provisioning, monitoring, and updating
- Azure subscription-based licensing and billing (transitioning from traditional Windows Server licensing)

**Service Integration**

- Native Azure Kubernetes Service (AKS) hybrid deployment
- Expanded Azure services available for local deployment (SQL Managed Instance, etc.)
- Consistent identity, security, and policy through Microsoft Entra ID (formerly Azure AD)

### Migration Approach

For existing Azure Stack HCI customers, the transition to Azure Local is designed to be seamless:

1. **Arc Enrollment**: Ensure clusters are registered with Azure Arc (required for future updates)
2. **Licensing Transition**: Convert to Azure subscription-based licensing during renewal cycles
3. **Feature Adoption**: Adopt new Arc-based management capabilities as they roll out
4. **Naming Updates**: Update documentation and runbooks to reflect Azure Local branding
5. **Training**: Familiarize operations teams with Azure portal-centric workflows

!!! success "Backward Compatibility"
    Microsoft has committed to supporting existing Azure Stack HCI deployments with continued updates and patches. The migration to Azure Local branding and features occurs through standard update cycles without requiring hardware replacement or major disruption.

### Deciding Between Azure Local and Public Azure

The choice between running workloads on Azure Local versus Azure public cloud isn't always obvious. Consider these factors:

**Choose Azure Local When:**

- Regulatory or data residency requirements prohibit cloud hosting
- Application latency requirements demand sub-millisecond storage access
- Network bandwidth costs or limitations make cloud impractical
- Existing hardware investments have remaining useful life
- Air-gapped or intermittent connectivity scenarios

**Choose Azure Public Cloud When:**

- Workloads can tolerate WAN latency (typically <50ms in same region)
- Variable compute demands benefit from elastic scaling
- Teams lack on-premises infrastructure expertise
- Disaster recovery and geo-redundancy are priorities
- DevOps agility and rapid provisioning are critical

**Consider Hybrid (Both) When:**

- Some workloads have locality requirements while others benefit from cloud scale
- Data gravity keeps certain workloads on-premises while analytics run in cloud
- Disaster recovery strategy uses cloud as secondary site
- Gradual migration strategy moves workloads over time

## When to Choose Which Azure Stack Product

The decision framework for selecting an Azure Stack product depends on connectivity, service requirements, and operational model:

### Scenario 1: Connected Branch Offices

**Need**: 10 branch locations requiring local VM hosting, backup, and virtual desktop infrastructure with reliable internet connectivity.

**Recommendation**: **Azure Local** — Provides cost-effective HCI with Azure-managed updates, backup, and monitoring. Each branch can run 1-2 node clusters with cloud witness for quorum.

### Scenario 2: Disconnected Military Installation

**Need**: Full application hosting with PaaS services in a classified environment with no internet access.

**Recommendation**: **Azure Stack Hub** — Supports Air-gapped operation with manual update delivery, full ARM capabilities, and local marketplace for application deployment.

### Scenario 3: Manufacturing Floor with Computer Vision

**Need**: Real-time video analytics for quality control on production lines, with periodic upload of anomalies to cloud for retraining models.

**Recommendation**: **Azure Stack Edge** — Purpose-built GPU acceleration for AI inferencing, with local buffering and cloud data pipeline for Azure ML integration.

### Scenario 4: Service Provider Building Cloud Offerings

**Need**: Multi-tenant infrastructure supporting customer isolation, chargeback, and ARM-based self-service provisioning.

**Recommendation**: **Azure Stack Hub** — Native multi-tenancy support with tenant isolation, quotas, offers, and plans matching Azure public cloud model.

### Scenario 5: VDI for Remote Workers

**Need**: Virtual desktop infrastructure for 500 remote workers requiring low-latency access with session persistence.

**Recommendation**: **Azure Local** — Optimized for Azure Virtual Desktop with local performance, Azure management, and integration with Windows 365 for hybrid scenarios.

## Operational Considerations

### Licensing and Billing

Each Azure Stack product uses a different licensing model:

- **Azure Stack Hub**: Capacity-based licensing per physical core, either Windows Server Datacenter with Azure Pack or consumption-based through CSP
- **Azure Local**: Per-core subscription through Azure, billed monthly based on physical cores (transitioning from traditional Windows Server licensing)
- **Azure Stack Edge**: Hardware-as-a-Service monthly subscription including hardware, support, and management

### Support and Updates

- **Azure Stack Hub**: Coordinated with Azure release cycles, requires download and import (connected) or manual media transfer (disconnected)
- **Azure Local**: Azure-managed updates through Arc, with customizable maintenance windows and automatic rollback on failure
- **Azure Stack Edge**: Automatic updates managed by Microsoft, with minimal customer intervention

### Skill Requirements

Each product requires different skill sets:

- **Azure Stack Hub**: Deep Azure ARM knowledge, datacenter operations, multi-tenancy management
- **Azure Local**: Hyper-V and storage expertise transitioning to Arc-based Azure management
- **Azure Stack Edge**: IoT and edge computing skills, container orchestration, AI model deployment

## Looking Forward: The Hybrid Continuum

The Azure Stack family represents Microsoft's commitment to meeting customers across the entire connectivity spectrum—from fully connected cloud-native applications to completely disconnected air-gapped environments. As these products converge under the Azure Local brand, expect:

- **Unified Management**: Single Azure portal experience for all hybrid assets through Arc
- **Consistent Services**: More Azure services available for local deployment with cloud synchronization
- **Flexible Licensing**: Simplified consumption-based billing across all Stack products
- **Edge Innovation**: Continued investment in edge compute, AI, and IoT capabilities

The key architectural principle remains: **Run workloads where they need to be, manage them from Azure**. Understanding which Stack product fits your connectivity model and service requirements is essential for building resilient, compliant, and cost-effective hybrid solutions.

## References

- [Azure Stack HCI Overview](https://learn.microsoft.com/en-us/azure-stack/hci/overview)
- [Azure Stack Hub Overview](https://learn.microsoft.com/en-us/azure-stack/operator/azure-stack-overview)
- [Azure Stack Edge Overview](https://learn.microsoft.com/en-us/azure/databox-online/azure-stack-edge-overview)
- [Azure Local Documentation](https://learn.microsoft.com/en-us/azure/azure-local/)
- [Azure Arc Hybrid Infrastructure](https://learn.microsoft.com/en-us/azure/azure-arc/overview)

---

> **Next:** [Connectivity Models →](05-connectivity-models.md)
