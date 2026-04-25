# Data Residency & Sovereignty

## Introduction

In the realm of cloud computing and hybrid infrastructure, **data residency** and **data sovereignty** are fundamental concepts that shape how organizations architect solutions to meet legal, regulatory, and operational requirements. While these terms are often used interchangeably, they represent distinct—yet deeply interconnected—concerns that become increasingly critical as organizations adopt hybrid and multi-cloud strategies across the Azure Hybrid Continuum.

**Data residency** refers to the physical or geographic location where data is stored and processed. It answers the question: *Where does my data reside?* This is primarily a technical consideration tied to datacenter locations, storage systems, and network topologies.

**Data sovereignty**, on the other hand, extends beyond geography into the legal and jurisdictional domain. It addresses: *Who has legal authority over this data, and under which laws is it governed?* Data sovereignty encompasses not only where data is stored but also who can access it, under what circumstances, and which regulatory frameworks apply—including law enforcement access, government surveillance, and cross-border data transfer regulations.

For organizations operating in regulated industries or within jurisdictions with strict data protection laws (such as the EU's GDPR, Germany's BSI C5, or sector-specific regulations like HIPAA or FedRAMP), understanding and implementing proper data residency and sovereignty controls is not optional—it is a compliance imperative.

---

## Data Residency vs. Data Sovereignty: Clear Definitions

### Data Residency

**Data residency** is the commitment that data will be stored and processed within specific geographic boundaries. This typically involves:

- **Physical location**: Data is stored on servers located in specific countries or regions
- **Storage at rest**: Where data persists when not actively being processed
- **Processing location**: Where computational operations on data occur
- **Backup and disaster recovery**: Where data replicas and backups are maintained

Organizations require data residency controls for several reasons:

- **Regulatory compliance**: Laws that mandate data be stored within national borders
- **Performance optimization**: Reducing latency by keeping data close to users
- **Business continuity**: Ensuring disaster recovery within the same jurisdiction
- **Contractual obligations**: Meeting customer or partner requirements for data location

!!! example "Data Residency Scenario"
    A European healthcare provider stores patient records in Azure's Germany West Central region. The data never leaves German datacenters, meeting residency requirements under German data protection law. However, Microsoft support engineers globally may still have potential access to troubleshoot issues, which introduces sovereignty considerations.

### Data Sovereignty

**Data sovereignty** goes further, addressing legal jurisdiction and control over data:

- **Legal framework**: Which country's laws govern the data
- **Access control**: Who can legally compel access to the data (including government entities)
- **Jurisdictional authority**: Which courts and regulatory bodies have authority
- **Data owner rights**: The ability to control who accesses data, including limiting cloud provider access

Key sovereignty concerns include:

- **Foreign surveillance laws**: Can governments outside the data's residency location compel access?
- **Cloud provider jurisdiction**: Where is the provider headquartered, and what legal obligations do they have?
- **Subprocessor locations**: Where are third parties processing or accessing data?
- **Encryption key control**: Who holds the keys, and can they be compelled to provide them?

!!! warning "Schrems II and Data Sovereignty"
    The 2020 Schrems II ruling invalidated the EU-US Privacy Shield, highlighting that data residency alone is insufficient if U.S.-based companies can be compelled to access EU citizen data under U.S. surveillance laws (FISA 702, CLOUD Act). This established that true data sovereignty requires both geographic and jurisdictional controls.

---

## Azure's Data Residency Commitments by Geography

Microsoft Azure provides comprehensive data residency commitments across its global infrastructure, with specific guarantees varying by region and service type.

### Regional Data Residency

Azure operates in **60+ regions worldwide**, with data residency commitments built into regional service deployment. When you deploy Azure resources in a specific region:

- **Customer Data** (data you create and store) remains in that region unless you explicitly configure replication or backup to another region
- **Service metadata** (configuration, resource names) may be replicated for resilience but does not contain customer data
- **Regional services** (VMs, Storage, SQL Database) guarantee data stays in the selected region

!!! info "Azure Regions and Geography"
    Azure organizes regions into **geographies** (e.g., Europe, United States, Asia Pacific). Each geography typically contains multiple regions to enable high availability while respecting data residency boundaries. For example, the Europe geography includes regions in France, Germany, Netherlands, Norway, Sweden, Switzerland, and the UK.

### Availability Zones and Data Residency

Within each Azure region, **availability zones** provide physically separate datacenter locations. According to Microsoft's architecture:

- Availability zones are separated by several kilometers (typically within 100 km)
- Each zone has independent power, cooling, and networking
- Data replicated across zones **remains within the same region**, maintaining residency commitments
- Inter-zone network latency is typically less than 2 milliseconds

This means zone-redundant deployments (e.g., Zone-Redundant Storage, multi-zone SQL databases) maintain data residency within the region while achieving high availability.

### EU Data Boundary Initiative

Microsoft's **EU Data Boundary** represents one of the industry's most comprehensive data residency and sovereignty commitments. As of early 2025, the EU Data Boundary ensures:

- **Geographic scope**: Covers all 27 EU member states plus EFTA countries (Norway, Iceland, Switzerland, Liechtenstein)
- **Datacenter locations**: Microsoft operates datacenters in Austria, Belgium, Denmark, Finland, France, Germany, Greece, Ireland, Italy, Netherlands, Norway, Poland, Spain, Sweden, and Switzerland
- **Customer Data storage and processing**: All Customer Data for in-scope services stored and processed within the EU Data Boundary
- **Personal data in system logs**: Pseudonymized and stored within the EU Data Boundary
- **Professional Services Data**: Stored at rest within the boundary

**Services covered** include:

- Azure regional services deployed in EU regions (automatically in-scope)
- Azure non-regional services (require configuration)
- Microsoft 365 (based on tenant billing address)
- Dynamics 365 and Power Platform (based on geo provisioning)

!!! tip "Configuring Azure for EU Data Boundary"
    For Azure regional services, simply deploy resources in an EU region (e.g., West Europe, North Europe, Germany West Central). For Azure non-regional services like Azure Active Directory, Azure Monitor, or Azure Security Center, follow specific configuration guidance to ensure compliance with EU Data Boundary commitments.

**Limited data transfers outside EU Data Boundary**: Even with the EU Data Boundary, certain data transfers may occur:

- **Customer-initiated transfers**: Customers explicitly configure services outside the EU
- **Support and troubleshooting**: Microsoft personnel outside the EU may access data for support (with contractual safeguards)
- **Engineering operations**: Limited access for service reliability and security
- **Third-party services**: Customer-configured integrations with non-EU services

Microsoft implements contractual and technical safeguards (Standard Contractual Clauses, encryption, access logging) for any such transfers.

### Country/Region-Specific Residency

Beyond the EU Data Boundary, Azure provides region-specific residency commitments in many jurisdictions:

- **Germany**: Dedicated regions (Germany West Central, Germany North) with strict data residency
- **Switzerland**: Swiss datacenters for organizations requiring Swiss jurisdiction
- **France**: French regions for public sector and regulated entities
- **Australia**: Australian regions with data sovereignty options for government customers
- **Canada**: Canadian regions for federal and provincial data localization requirements

---

## Data Protection Across the Continuum: At Rest, In Transit, and In Use

Data protection strategies must address data in all three states, with different techniques and controls for each.

### Data at Rest

**Data at rest** refers to data stored on persistent storage—disks, databases, blob storage, backups.

**Azure Storage Service Encryption (SSE)**:

- Automatically encrypts all data written to Azure Storage (Blobs, Files, Queues, Tables)
- Uses 256-bit AES encryption
- Encryption is transparent—no application changes required
- Enabled by default and cannot be disabled

**Azure Disk Encryption**:

- Encrypts OS and data disks for virtual machines
- Uses BitLocker (Windows) or DM-Crypt (Linux)
- Integrates with Azure Key Vault for key management
- Supports customer-managed keys for enhanced control

**Database encryption**:

- **Transparent Data Encryption (TDE)**: Encrypts SQL Database, Synapse, and Cosmos DB at rest
- **Always Encrypted**: Encrypts sensitive columns, with keys remaining in client applications
- **Encryption at Rest**: Native encryption for Azure Database for MySQL, PostgreSQL, MariaDB

!!! note "Default Encryption"
    As of 2024, virtually all Azure storage services encrypt data at rest by default using Microsoft-managed keys. The choice is not *whether* to encrypt, but *who manages the keys*.

### Data in Transit

**Data in transit** is data moving across networks—between client and cloud, between Azure services, or across hybrid connections.

**Transport Layer Security (TLS)**:

- All Azure public endpoints support TLS 1.2 or higher
- HTTPS is enforced for Azure Storage, SQL Database, and most services
- TLS certificates validate server identity and establish encrypted tunnels

**Azure VPN Gateway and ExpressRoute**:

- **Site-to-Site VPN**: IPsec/IKE encrypted tunnels for hybrid connectivity
- **Point-to-Site VPN**: Encrypted connections for remote users
- **ExpressRoute**: Private dedicated connection with optional encryption via MACsec or VPN over ExpressRoute

**Azure Private Link**:

- Eliminates public internet exposure for Azure services
- Traffic flows over Microsoft's private backbone network
- Provides network isolation, reducing data exposure

### Data in Use

**Data in use** refers to data actively being processed in memory, the most challenging state to protect.

**Azure Confidential Computing**:

- Uses hardware-based Trusted Execution Environments (TEEs)
- **Intel SGX** and **AMD SEV-SNP** technologies isolate code and data during execution
- Protects data from:
    - Cloud administrators
    - Hypervisor and host OS
    - Other tenants on shared infrastructure
    - Even Microsoft engineers

**Use cases**:

- Processing highly sensitive data (financial transactions, healthcare records, classified information)
- Multi-party computation where no single party should see all data
- Regulatory requirements for air-gapped processing models

!!! example "Confidential Computing Scenario"
    A financial institution processes credit card transactions in Azure. Using confidential VMs with AMD SEV-SNP, transaction data remains encrypted even while being processed in memory. Not even Microsoft datacenter administrators can inspect the data, providing hardware-enforced sovereignty.

---

## Encryption Key Management: Who Controls Your Data?

Encryption is only as secure as the keys protecting it. Azure offers a **key management hierarchy** that provides varying levels of customer control.

### Microsoft-Managed Keys (MMK)

- **Who manages**: Microsoft
- **Default option**: All Azure services use MMK by default
- **Key lifecycle**: Microsoft generates, stores, rotates, and retires keys
- **Customer responsibility**: None
- **Use case**: Organizations prioritizing ease of use over key control

### Customer-Managed Keys (CMK)

- **Who manages**: Customer controls key lifecycle; keys stored in Azure Key Vault
- **Configuration**: Customer creates keys in Key Vault, grants Azure services access
- **Key lifecycle**: Customer controls rotation, revocation, expiration
- **Customer responsibility**: Key availability and lifecycle management
- **Use case**: Organizations requiring audit trails and key rotation control without managing HSMs

**Services supporting CMK**:

- Azure Storage
- Azure SQL Database
- Azure Cosmos DB
- Azure Disk Encryption
- Azure Backup

!!! warning "Key Availability Risks"
    If customer-managed keys become unavailable (Key Vault deleted, permissions revoked, key expired), Azure services cannot decrypt data, resulting in **data unavailability**. Implement key backup and disaster recovery procedures.

### Bring Your Own Key (BYOK)

- **Who manages**: Customer generates keys on-premises or in HSMs, imports to Azure Key Vault
- **Key origin**: Customer's on-premises HSM or key management system
- **Audit trail**: Complete visibility into key generation
- **Use case**: Organizations with existing key management infrastructure or regulatory requirements for customer-generated keys

### Hold Your Own Key (HYOK)

- **Who manages**: Customer retains keys entirely outside Azure
- **Key location**: On-premises HSM, never uploaded to Azure
- **Azure access**: Azure services request decryption operations without possessing keys
- **Use case**: Maximum control, regulatory requirements prohibiting key export to cloud

**Trade-offs**:

- **Highest control**: Keys never leave customer premises
- **Complexity**: Requires on-premises HSM infrastructure and high availability
- **Performance impact**: Latency introduced by remote key operations
- **Service limitations**: Not all Azure services support HYOK

---

## Azure Local: Full On-Premises Data Sovereignty

**Azure Local** (formerly Azure Stack HCI) represents the ultimate data sovereignty solution for organizations that cannot or will not store data in any cloud—even sovereign clouds.

### Complete Data Localization

With Azure Local:

- **All data remains on-premises**: Compute, storage, and networking never leave your datacenter
- **No data replication to Azure**: Unlike hybrid scenarios, data is not synchronized to cloud
- **Air-gapped deployment options**: Physically or logically isolated from public internet
- **Physical control**: Hardware resides in customer-controlled facilities

### Sovereignty Benefits

1. **Jurisdictional control**: Data subject only to local laws where hardware resides
2. **No foreign access**: No cloud provider or foreign government can compel access
3. **Physical security**: Customer controls physical access to hardware
4. **Network isolation**: Can be deployed on isolated networks with no internet connectivity

### Azure Hybrid Benefit

Despite being on-premises, Azure Local provides:

- **Azure Arc integration**: Optional management plane connection to Azure for monitoring and governance
- **Azure services on-premises**: Run Azure Kubernetes Service, Azure Virtual Desktop, Azure SQL MI locally
- **Consistent API**: Same Azure Resource Manager APIs as public cloud

!!! tip "Disconnected Scenarios"
    Azure Local supports fully disconnected operation for classified or air-gapped environments. Periodic "sneakernet" updates via removable media enable patching without network connectivity.

### Use Cases for Azure Local Data Sovereignty

- **Defense and intelligence**: Classified data processing
- **Financial services**: Trading platforms requiring microsecond latency
- **Healthcare**: Patient data in jurisdictions prohibiting cloud storage
- **Manufacturing**: OT/ICS networks isolated from corporate and internet
- **Telecommunications**: Subscriber data subject to lawful intercept requirements

---

## Cross-Border Data Transfer Considerations

### Schrems II and Its Implications

The 2020 **Schrems II** ruling by the European Court of Justice invalidated the EU-US Privacy Shield framework, establishing that:

1. **Data residency ≠ data sovereignty**: Storing data in the EU is insufficient if U.S. companies can be compelled to provide access under U.S. law
2. **FISA 702 and CLOUD Act concerns**: U.S. surveillance laws enable access to data controlled by U.S. companies, regardless of data location
3. **Supplementary measures required**: Organizations must implement additional safeguards beyond Standard Contractual Clauses (SCCs)

### Microsoft's Response to Schrems II

Microsoft has implemented multiple safeguards:

1. **EU Data Boundary**: Minimizes data transfers outside the EU
2. **Contractual commitments**: Microsoft challenges government requests to the fullest extent legally possible
3. **Customer notifications**: Microsoft commits to notifying customers of law enforcement requests unless legally prohibited
4. **Encryption and key control**: Customer-managed keys limit Microsoft's ability to provide plaintext data

### International Data Transfer Mechanisms

For organizations transferring data across borders, several mechanisms exist:

**Standard Contractual Clauses (SCCs)**:

- Approved by EU Commission for EU-to-third-country transfers
- Require Transfer Impact Assessments (TIAs) to evaluate local law risks
- Must include supplementary measures (encryption, pseudonymization) after Schrems II

**Binding Corporate Rules (BCRs)**:

- Internal policies for multinational corporations transferring data within their organization
- Require approval from EU data protection authorities

**Adequacy Decisions**:

- EU Commission determines certain countries provide adequate data protection
- Current adequacy decisions: UK, Switzerland, Japan, Canada (commercial), and others
- **EU-US Data Privacy Framework** (2023) provides new mechanism for EU-US transfers

!!! caution "Transfer Impact Assessments"
    Under Schrems II, organizations must conduct case-by-case assessments of data transfers to third countries, evaluating local surveillance laws, data access mechanisms, and available legal remedies. Generic reliance on SCCs is insufficient.

---

## Data Sovereignty Tiers: From Geo-Restriction to Air-Gapped

Organizations can implement data sovereignty controls across a spectrum, depending on regulatory and operational requirements.

### Tier 1: Geographic Data Residency with Policy Controls

**Characteristics**:

- Data stored in specific Azure regions
- Azure Policy enforces allowed resource locations
- Microsoft-managed encryption keys
- Standard Azure support model (global support access)

**Use cases**: General data residency requirements, performance optimization, basic compliance

**Limitations**: Cloud provider and global support have potential access

### Tier 2: Enhanced Sovereignty with Customer-Managed Keys and Confidential Computing

**Characteristics**:

- Data stored in specific regions (e.g., EU Data Boundary)
- Customer-managed keys in Azure Key Vault
- Confidential computing for sensitive workloads
- Private Link eliminates public internet exposure
- Just-In-Time (JIT) access for support with audit logging

**Use cases**: Financial services, healthcare, GDPR-sensitive data, government workloads

**Limitations**: Control plane metadata still flows to Microsoft; keys stored in cloud

### Tier 3: Maximum Sovereignty with Hold-Your-Own-Key

**Characteristics**:

- Customer-managed keys stored on-premises (HYOK)
- Data encrypted before upload to Azure
- Decryption operations occur outside Azure
- Customer retains ultimate key control

**Use cases**: Defense contractors, intelligence agencies, highly regulated financial institutions

**Limitations**: Performance overhead, limited service compatibility, operational complexity

### Tier 4: Full On-Premises with Azure Local (Complete Sovereignty)

**Characteristics**:

- All data remains on-premises
- Optional disconnected or air-gapped deployment
- Physical control of hardware
- Azure Local runs Azure services locally

**Use cases**: Classified data, critical infrastructure, OT/ICS environments, extreme regulatory requirements

**Limitations**: Customer manages infrastructure, limited to Azure Local-compatible services

<!-- DIAGRAM PLACEHOLDER: Data sovereignty tiers pyramid, from Tier 1 (broadest use cases, least control) at the bottom to Tier 4 (narrowest use cases, maximum control) at top, with key characteristics and use cases for each tier -->

---

## Data Classification and Sensitivity Labeling

Effective data sovereignty begins with understanding what data you have and where it should reside.

### Microsoft Purview for Data Governance

**Microsoft Purview** provides unified data governance across hybrid and multi-cloud environments:

**Data Discovery and Classification**:

- Automated scanning of Azure resources, on-premises databases, and file shares
- AI-powered classification of sensitive data (PII, financial data, health records)
- Integration with Azure SQL Database, Synapse, Storage, and Azure Local

**Sensitivity Labels**:

- Define labels: Public, Internal, Confidential, Highly Confidential
- Apply labels manually or automatically based on content
- Enforce policies: Where data with specific labels can be stored, who can access it

**Data Lineage**:

- Track data movement across hybrid continuum
- Identify if sensitive data has moved outside approved locations
- Audit trails for compliance evidence

### Implementing Data Sovereignty Policies with Purview

1. **Classify data**: Identify what data is subject to sovereignty requirements
2. **Define sensitivity labels**: Create labels tied to residency/sovereignty requirements (e.g., "EU Personal Data")
3. **Apply labels**: Automatically label data based on content, source, or manual tagging
4. **Enforce policies**: Use Azure Policy to prevent creation of resources with specific labels in non-compliant regions
5. **Monitor and audit**: Continuous monitoring for policy violations

!!! example "Data Classification Workflow"
    A European bank uses Purview to scan all Azure SQL databases and storage accounts. AI-powered classification identifies tables containing EU citizen personal data, automatically applies "EU GDPR" labels, and triggers Azure Policy to prevent replication of this data outside EU Data Boundary regions. Compliance officers receive weekly reports on data location and access patterns.

---

## Summary: Data Residency and Sovereignty Across the Hybrid Continuum

As organizations adopt hybrid cloud strategies spanning Azure public cloud, Azure sovereign clouds, hybrid on-premises deployments, and edge locations, data residency and sovereignty controls become increasingly critical:

- **Data residency** addresses *where* data is stored; **data sovereignty** addresses *who controls access* under which legal framework
- **Azure's global infrastructure** provides comprehensive data residency commitments, with the **EU Data Boundary** representing industry-leading sovereign commitments for European customers
- **Encryption across all three states**—at rest, in transit, and in use—is fundamental, with confidential computing providing hardware-enforced protection even from cloud providers
- **Key management hierarchy**—from Microsoft-managed to customer-managed to hold-your-own-key—enables organizations to choose appropriate control levels
- **Azure Local** provides ultimate sovereignty for data that cannot leave customer premises, enabling air-gapped and classified scenarios
- **Cross-border data transfers** require careful legal and technical assessment post-Schrems II, with SCCs, encryption, and key controls as supplementary measures
- **Data sovereignty tiers** provide a framework for selecting appropriate controls based on regulatory and operational needs
- **Microsoft Purview** enables data discovery, classification, and policy enforcement across the hybrid continuum

Organizations must assess their specific regulatory, contractual, and operational requirements to determine the appropriate data residency and sovereignty posture, recognizing that the Azure Hybrid Continuum provides flexibility to implement controls ranging from regional data residency to complete air-gapped on-premises sovereignty.

---

## References

- [Azure Data Residency](https://azure.microsoft.com/en-us/explore/global-infrastructure/data-residency/)
- [EU Data Boundary for Microsoft Cloud](https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn)
- [Azure Encryption Overview](https://learn.microsoft.com/en-us/azure/security/fundamentals/encryption-overview)
- [Microsoft Purview Data Governance](https://learn.microsoft.com/en-us/purview/)
- [Azure Availability Zones](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview)
- [Azure Confidential Computing](https://learn.microsoft.com/en-us/azure/confidential-computing/)
- [Azure Key Vault Documentation](https://learn.microsoft.com/en-us/azure/key-vault/)

---

> **Next:** [Compliance Frameworks →](05-compliance-frameworks.md)
