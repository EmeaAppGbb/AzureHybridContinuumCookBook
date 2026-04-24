# Hybrid Connected Pattern

## Introduction

The hybrid connected pattern places workloads on Azure Local or on-premises infrastructure while maintaining persistent connectivity to Azure for management, monitoring, and access to cloud services. This pattern balances data residency requirements with the operational benefits of cloud management.

## Topics to Cover

- [ ] Pattern definition and when to use it
- [ ] Characteristics: persistent connectivity, Azure management plane, hybrid identity
- [ ] Reference architecture components:
  - Compute: AKS on Azure Local, Azure Arc-enabled VMs
  - Data: Azure Arc-enabled SQL Managed Instance, Azure Arc-enabled PostgreSQL
  - Messaging: self-hosted message brokers (RabbitMQ, NATS) or Azure Service Bus relay
  - Identity: Azure AD with hybrid join, Azure AD Application Proxy
  - Networking: ExpressRoute or site-to-site VPN, Azure Virtual WAN
- [ ] Data flows: what stays on-premises, what flows to Azure
- [ ] Management: Azure Portal, Azure Policy, Azure Monitor for hybrid
- [ ] Security: Microsoft Defender for Cloud with hybrid coverage
- [ ] Challenges: network latency, split-brain scenarios, partial service availability

<!-- DIAGRAM: Hybrid connected architecture showing Azure Local cluster on-premises running AKS and Arc-enabled data services, connected via ExpressRoute to Azure for management, monitoring, and select cloud services (Azure AD, Azure Monitor, Defender for Cloud) -->

## References

- [AKS on Azure Local](https://learn.microsoft.com/en-us/azure/aks/hybrid/)
- [Azure Arc-enabled Data Services](https://learn.microsoft.com/en-us/azure/azure-arc/data/)
- [Azure ExpressRoute](https://learn.microsoft.com/en-us/azure/expressroute/)
- [Hybrid Identity](https://learn.microsoft.com/en-us/entra/identity/hybrid/)

---

> **Next:** [Hybrid Disconnected Pattern →](03-hybrid-disconnected.md)
