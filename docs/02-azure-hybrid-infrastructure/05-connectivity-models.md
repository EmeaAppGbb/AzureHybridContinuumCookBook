# Connectivity Models

## Introduction

The connectivity model between on-premises infrastructure and Azure cloud is one of the most critical architectural decisions in hybrid design. It determines what services are available, how management works, and what operational procedures are needed.

## Topics to Cover

- [ ] The three connectivity models:
  - **Fully Connected**: Persistent, high-bandwidth connection to Azure
  - **Intermittently Connected**: Periodic connectivity for management, updates, and sync
  - **Disconnected (Air-Gapped)**: No connectivity — fully autonomous operation
- [ ] Network requirements for each model
- [ ] Available Azure services and management capabilities per connectivity model
- [ ] Identity and authentication in each model (Azure AD, AD DS, ADFS)
- [ ] Update and patch management across connectivity models
- [ ] Monitoring and telemetry: what data flows where
- [ ] Security considerations per connectivity model
- [ ] Hybrid networking: VPN, ExpressRoute, Azure Virtual WAN
- [ ] Data synchronization patterns across connectivity boundaries

<!-- DIAGRAM: Three-column comparison of connectivity models showing: network topology, available services, management plane, identity provider, update mechanism, and monitoring capabilities for each -->

<!-- DIAGRAM: Network topology diagram showing Azure cloud connected via ExpressRoute/VPN to Azure Local (connected mode), with a separate air-gapped Azure Local environment showing offline management -->

## References

- [Azure Local Network Requirements](https://learn.microsoft.com/en-us/azure/azure-local/concepts/firewall-requirements)
- [Azure ExpressRoute](https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction)
- [Azure VPN Gateway](https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways)
- [Azure Virtual WAN](https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about)
- [Azure Stack Hub Disconnected Deployment](https://learn.microsoft.com/en-us/azure-stack/operator/azure-stack-disconnected-deployment)

---

> **Next:** [Part 3 — Sovereignty & Compliance →](../03-sovereignty-and-compliance/README.md)
