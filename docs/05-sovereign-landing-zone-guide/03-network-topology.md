# Network Topology

## Introduction

Network topology is a critical design area for sovereign architectures. The network design must support secure connectivity between cloud and on-premises resources, enforce isolation requirements, and provide a path for workloads to move along the hybrid continuum.

## Topics to Cover

- [ ] Hub & Spoke topology for SLZ:
  - Hub VNet: Azure Firewall, VPN/ExpressRoute Gateway, Bastion
  - Spoke VNets: one per workload landing zone
  - Network segmentation and micro-segmentation
- [ ] Virtual WAN topology as an alternative
- [ ] Hybrid connectivity options:
  - ExpressRoute: private, dedicated connectivity
  - Site-to-Site VPN: encrypted tunnel over internet
  - Point-to-Site VPN: individual client connectivity
- [ ] DNS architecture: Azure Private DNS Zones, conditional forwarding
- [ ] Network security:
  - Azure Firewall policies for SLZ
  - Network Security Groups (NSGs)
  - Private Link for PaaS services
  - DDoS Protection
- [ ] Network topology for Azure Local integration:
  - Extending the hub-spoke to on-premises
  - Azure Local network requirements
  - BGP and routing considerations
- [ ] Disconnected network architecture: fully isolated network design

<!-- DIAGRAM: Hub & Spoke network topology for SLZ showing: Azure Hub VNet (Firewall, ExpressRoute Gateway, Bastion) connected to Spoke VNets (Confidential Corp, Confidential Online, Public workloads) and via ExpressRoute to on-premises Azure Local cluster -->

<!-- DIAGRAM: DNS architecture for hybrid SLZ showing Azure Private DNS Zones, on-premises DNS forwarding, and resolution flow for both connected and disconnected scenarios -->

## References

- [Hub-Spoke Topology](https://learn.microsoft.com/en-us/azure/architecture/networking/architecture/hub-spoke)
- [Azure Virtual WAN](https://learn.microsoft.com/en-us/azure/virtual-wan/)
- [Azure Firewall](https://learn.microsoft.com/en-us/azure/firewall/)
- [Azure Private Link](https://learn.microsoft.com/en-us/azure/private-link/)

---

> **Next:** [Security & Governance →](04-security-governance.md)
