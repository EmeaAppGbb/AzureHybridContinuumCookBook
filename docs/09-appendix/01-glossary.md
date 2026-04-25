# Glossary

## Introduction

This glossary provides clear, concise definitions of key terms and concepts used throughout the Azure Hybrid Continuum CookBook. Each term is grounded in official Microsoft documentation and includes links to authoritative sources. Use this reference to ensure consistent understanding of concepts spanning the continuum from public cloud to disconnected environments.

## Definitions

Air-Gapped Environment
: An isolated environment with no network connectivity to external systems, including the internet or other networks. Air-gapped deployments require all software, updates, and data to be physically transferred via approved media. Common in high-security scenarios such as classified government systems, critical infrastructure, and facilities requiring complete network isolation.
: [Learn more about disconnected scenarios](https://learn.microsoft.com/en-us/azure/azure-arc/data/connectivity)

Azure Arc
: A management plane that extends Azure governance, security, and services to any infrastructure—on-premises, multicloud, and edge. Azure Arc enables you to manage servers, Kubernetes clusters, databases, and applications consistently using Azure Resource Manager APIs, Azure Policy, and Azure Monitor, regardless of where they run.
: [Azure Arc documentation](https://learn.microsoft.com/en-us/azure/azure-arc/overview)

Azure Arc-enabled Data Services
: Azure data services (SQL Managed Instance, PostgreSQL) that run on Azure Arc-enabled Kubernetes clusters, providing cloud-like provisioning, scaling, and updates on-premises or in other clouds. Supports both directly connected and indirectly connected modes for varying levels of Azure integration.
: [Azure Arc-enabled data services documentation](https://learn.microsoft.com/en-us/azure/azure-arc/data/overview)

Azure Arc-enabled Kubernetes
: Kubernetes clusters running anywhere—on-premises, edge, or multicloud—that are connected to Azure for centralized configuration management using GitOps, Azure Policy enforcement, and monitoring via Azure Monitor. Enables consistent application of governance and operational practices across heterogeneous environments.
: [Azure Arc-enabled Kubernetes documentation](https://learn.microsoft.com/en-us/azure/azure-arc/kubernetes/overview)

Azure Confidential Computing
: Azure services and infrastructure that protect data while it is being processed using hardware-based Trusted Execution Environments (TEEs). Confidential computing ensures that data remains encrypted in memory during computation, protecting against unauthorized access even from privileged system administrators and hypervisor-level threats.
: [Azure Confidential Computing documentation](https://learn.microsoft.com/en-us/azure/confidential-computing/)

Azure ExpressRoute
: A dedicated private network connection from on-premises infrastructure to Microsoft Azure that does not traverse the public internet. ExpressRoute provides higher security, reliability, faster speeds, consistent latencies, and predictable performance compared to internet-based connections, with support for Layer 3 connectivity via BGP.
: [Azure ExpressRoute documentation](https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction)

Azure Key Vault Managed HSM
: A fully managed, highly available, single-tenant Hardware Security Module (HSM) service that safeguards cryptographic keys for cloud applications using FIPS 140-3 Level 3 validated HSMs. Provides isolated access control, private endpoints, and dedicated security domains ensuring cryptographic isolation between customers.
: [Azure Key Vault Managed HSM documentation](https://learn.microsoft.com/en-us/azure/key-vault/managed-hsm/overview)

Azure Kubernetes Service (AKS)
: A managed Kubernetes service that simplifies deploying, managing, and scaling containerized applications. Azure manages the Kubernetes control plane at no cost, while you maintain control over worker nodes. AKS reduces operational overhead through automated health monitoring, maintenance, and integration with Azure services.
: [Azure Kubernetes Service documentation](https://learn.microsoft.com/en-us/azure/aks/intro-kubernetes)

Azure Local (formerly Azure Stack HCI)
: A hyperconverged infrastructure platform that runs on validated hardware in your datacenter, providing virtualized compute, storage, and networking with Azure hybrid services integration. Azure Local enables you to run workloads on-premises while benefiting from Azure management, security, and innovation through Arc integration.
: [Azure Local documentation](https://learn.microsoft.com/en-us/azure/azure-local/)

Azure Managed HSM
: See Azure Key Vault Managed HSM.

Azure Policy
: A service that enables you to enforce organizational standards and assess compliance at scale by defining, assigning, and managing policy rules. Azure Policy evaluates Azure resources (and Arc-enabled resources outside Azure) against business rules, enabling consistent governance for resource deployment, configuration, and ongoing compliance.
: [Azure Policy documentation](https://learn.microsoft.com/en-us/azure/governance/policy/overview)

Azure Private Link
: A service that enables private access to Azure PaaS services and customer-owned services over a private endpoint within your virtual network. Traffic between your network and Azure services travels exclusively over the Microsoft backbone network, eliminating exposure to the public internet and providing protection against data leakage.
: [Azure Private Link documentation](https://learn.microsoft.com/en-us/azure/private-link/private-link-overview)

Azure Stack Edge
: An Azure-managed edge computing appliance that brings compute, storage, and machine learning capabilities to edge locations. Provides hardware-accelerated AI inference, data transfer, and local processing with integration to Azure cloud services for centralized management and orchestration.
: [Azure Stack Edge documentation](https://learn.microsoft.com/en-us/azure/databox-online/)

Azure Stack Hub
: An integrated hardware and software system that delivers Azure services from your datacenter, designed primarily for disconnected or intermittently connected environments. Unlike Azure Local, Azure Stack Hub provides Azure-consistent PaaS capabilities (App Service, Functions, etc.) for scenarios requiring cloud services in isolated locations.
: [Azure Stack Hub documentation](https://learn.microsoft.com/en-us/azure/azure-stack/operator/)

Cloud Adoption Framework (CAF)
: Microsoft's proven guidance and best practices to help organizations create and implement business and technology strategies for cloud adoption. CAF provides methodologies spanning strategy, planning, readiness, migration, modernization, governance, and management to ensure successful Azure adoption aligned with business outcomes.
: [Cloud Adoption Framework documentation](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/)

Cloud Exit / Cloud Repatriation
: The process of moving workloads from public cloud back to on-premises or private cloud infrastructure. Motivations include cost optimization, data sovereignty requirements, regulatory compliance, performance needs, or reduced dependency on cloud providers. Requires careful planning around data migration, architecture changes, and operational model shifts.

Confidential Computing
: See Azure Confidential Computing.

Connected Mode
: An operational mode for Azure Arc-enabled services where continuous network connectivity to Azure enables real-time management via Azure portal, Azure Resource Manager APIs, Microsoft Entra ID authentication, and Azure RBAC. Provides the fullest Azure integration experience with automatic telemetry, billing, and monitoring data transmission.
: [Azure Arc connectivity modes](https://learn.microsoft.com/en-us/azure/azure-arc/data/connectivity)

Customer Lockbox
: An Azure service that provides an interface for customers to review and approve (or reject) Microsoft support engineer access requests to customer data. Used in rare circumstances when a Microsoft engineer requires access to customer data for troubleshooting, ensuring customers maintain explicit control over data access with audit trails.
: [Customer Lockbox documentation](https://learn.microsoft.com/en-us/azure/security/fundamentals/customer-lockbox-overview)

Data Residency
: The physical or geographic location where data is stored and processed. Data residency requirements specify that data must remain within certain geographic boundaries (countries, regions, or specific datacenters) to meet legal, regulatory, or business requirements. Distinct from data sovereignty, which addresses legal jurisdiction.

Data Sovereignty
: The principle that data is subject to the laws and governance of the country or region where it is located. Data sovereignty encompasses who can access data, under what conditions, legal frameworks governing data protection, and the rights of data subjects. Critical for regulated industries and government entities.

Defense in Depth
: A layered security strategy that employs multiple defensive mechanisms across different levels—physical, network, perimeter, identity, compute, application, and data. If one layer is compromised, additional layers continue to provide protection, reducing the attack surface and impact of security breaches.
: [Azure security best practices](https://learn.microsoft.com/en-us/azure/security/fundamentals/best-practices-and-patterns)

Digital Sovereignty
: A broader concept encompassing data sovereignty, software sovereignty, and operational sovereignty. Digital sovereignty represents an organization's or nation's ability to control their digital assets, infrastructure, and operations independently, including technology choices, data location, access controls, and freedom from foreign jurisdiction.

Disconnected Mode
: An operational mode for Azure Arc-enabled services where periodic (rather than continuous) connectivity to Azure is used to exchange billing, inventory, and monitoring data. Requires local management tools and credentials, with limited Azure portal functionality. Formerly called "indirectly connected mode," now retired in favor of direct-only connectivity.
: [Azure Arc connectivity modes](https://learn.microsoft.com/en-us/azure/azure-arc/data/connectivity)

ExpressRoute
: See Azure ExpressRoute.

Fault Domain
: A logical grouping of hardware that shares a common power source and network switch, representing a single point of failure. Distributing virtual machines across multiple fault domains in Azure Local or Azure ensures that hardware failures affect only a subset of workloads, improving overall availability.
: [Azure availability zones and fault domains](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview)

Hybrid Cloud
: An IT architecture that combines on-premises infrastructure, private cloud services, and public cloud services with orchestration and management across environments. Hybrid cloud enables workload portability, consistent security and governance, and flexibility to place workloads based on performance, cost, compliance, and sovereignty requirements.

Hybrid Continuum
: The spectrum of deployment options ranging from fully public cloud (Azure), through connected hybrid (Azure Local with Arc), to fully disconnected on-premises infrastructure. The continuum reflects varying degrees of connectivity, cloud service availability, and operational models, enabling organizations to choose placement strategies matching their sovereignty, security, and operational needs.

Infrastructure as Code (IaC)
: The practice of managing and provisioning infrastructure through machine-readable definition files rather than manual processes. IaC enables version control, automated deployment, consistency, repeatability, and disaster recovery. Azure supports IaC through ARM templates, Bicep, Terraform, and other declarative tools.
: [Infrastructure as Code on Azure](https://learn.microsoft.com/en-us/devops/deliver/what-is-infrastructure-as-code)

Landing Zone
: A pre-configured Azure environment that provides governance, security, networking, identity, and management capabilities aligned with the Cloud Adoption Framework. Landing zones serve as the foundational platform for workload deployment, ensuring compliance with organizational policies and best practices from day one.
: [Azure landing zones](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/)

Management Group
: A container that helps manage access, policy, and compliance across multiple Azure subscriptions. Management groups provide hierarchical organization, enabling efficient application of governance controls at scale. Policies and RBAC assignments applied to a management group are inherited by all child subscriptions and resources.
: [Azure management groups](https://learn.microsoft.com/en-us/azure/governance/management-groups/overview)

Operational Sovereignty
: The ability to independently operate, manage, and maintain IT infrastructure and services without dependency on external entities. Includes control over updates, maintenance schedules, access to infrastructure, incident response, and operational procedures—critical for organizations requiring operational autonomy for security or regulatory reasons.

Private Cloud
: Cloud computing resources dedicated to a single organization, deployed either on-premises or hosted by a third party. Private clouds provide greater control over infrastructure, security, and compliance compared to public cloud, while still offering cloud characteristics like self-service, scalability, and resource pooling.

Regulated Industry
: Industries subject to strict regulatory frameworks governing data protection, security, operational practices, and compliance. Examples include financial services (PCI DSS, SOX), healthcare (HIPAA, GDPR), government (FedRAMP, ITAR), and critical infrastructure. Regulated industries often require enhanced sovereignty, audit trails, and data residency controls.

Sovereign Cloud
: Cloud infrastructure and services designed to meet specific sovereignty requirements for governments and regulated industries. Microsoft provides sovereign cloud offerings (Azure Government, Azure China) with physical and logical separation, data residency guarantees, local operations, and restricted access to meet national security and compliance mandates.
: [Azure sovereign clouds](https://learn.microsoft.com/en-us/azure/azure-government/)

Sovereign Landing Zone (SLZ)
: A specialized Azure landing zone architecture that incorporates enhanced sovereignty controls including data residency, encryption, access restrictions, and compliance frameworks required by governments and highly regulated organizations. SLZ extends standard landing zone patterns with additional guardrails and sovereign-specific policies.
: [Sovereign Landing Zone](https://learn.microsoft.com/en-us/industry/sovereignty/slz-overview)

Software Sovereignty
: The ability to control software supply chains, understand and audit source code, avoid vendor lock-in, and maintain independence from foreign technology dependencies. Software sovereignty concerns include open-source vs. proprietary software choices, hosting location of software providers, and ability to modify or replace components as needed.

Trusted Execution Environment (TEE)
: A secure, isolated area within a processor that guarantees code and data loaded inside are protected with respect to confidentiality and integrity. TEEs use hardware-based security mechanisms (Intel SGX, AMD SEV, ARM TrustZone) to create encrypted enclaves where sensitive computations occur, protected even from privileged system software.
: [Azure confidential computing TEE](https://learn.microsoft.com/en-us/azure/confidential-computing/)

Trusted Launch
: An Azure VM security feature that protects against boot kits, rootkits, and kernel-level malware using secure boot, virtual Trusted Platform Module (vTPM), and measured boot capabilities. Trusted Launch provides foundational security for virtual machines, establishing a hardware-rooted chain of trust from firmware through operating system boot.
: [Trusted Launch for Azure VMs](https://learn.microsoft.com/en-us/azure/virtual-machines/trusted-launch)

Update Domain
: A logical grouping of hardware in Azure Local or Azure that can be updated and rebooted simultaneously during maintenance. Distributing virtual machines across multiple update domains ensures that not all instances are unavailable during planned maintenance, maintaining application availability during platform updates.
: [Update domains](https://learn.microsoft.com/en-us/azure/virtual-machines/availability)

Well-Architected Framework (WAF)
: Microsoft's set of guiding principles and best practices for designing and operating reliable, secure, efficient, and cost-effective workloads in Azure. WAF is organized around five pillars: Reliability, Security, Cost Optimization, Operational Excellence, and Performance Efficiency, with architecture patterns and assessment tools.
: [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/)

Zero Trust
: A security strategy based on the principle "never trust, always verify," which assumes breach and verifies every access request regardless of origin. Zero Trust is built on three core principles: verify explicitly using all available data points, use least privilege access with just-in-time and just-enough-access policies, and assume breach with end-to-end encryption and analytics.
: [Zero Trust security](https://learn.microsoft.com/en-us/security/zero-trust/)

## References

- [Azure Glossary](https://learn.microsoft.com/en-us/azure/azure-glossary-cloud-terminology)
- [Cloud Adoption Framework Glossary](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/resources/glossary)
- [Azure Arc Documentation](https://learn.microsoft.com/en-us/azure/azure-arc/)
- [Azure Security Documentation](https://learn.microsoft.com/en-us/azure/security/)

---

> **Next:** [Azure Service Mapping →](02-azure-service-mapping.md)
