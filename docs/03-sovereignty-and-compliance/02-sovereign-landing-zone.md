# Sovereign Landing Zone Deep Dive

## Introduction

The Sovereign Landing Zone (SLZ) is a variant of the Azure Landing Zone architecture, specifically tailored for organizations with sovereignty requirements. It builds on the Azure Cloud Adoption Framework's landing zone design but adds controls and resource organization patterns for sovereign workloads.

## Topics to Cover

- [ ] What is the Sovereign Landing Zone — relationship to Azure Landing Zone
- [ ] SLZ architecture: management group hierarchy
  - Root Management Group
  - Platform Management Groups (Identity, Management, Connectivity)
  - Landing Zone Management Groups (Public, Confidential Corp, Confidential Online)
  - Sandbox and Decommissioned groups
- [ ] Design area differences between SLZ and standard Azure Landing Zone:
  - Resource organization: additional management groups for confidential workloads
  - Security, Management & Governance: additional Azure Policies
  - No changes in: billing, identity, network, platform automation
- [ ] Network topology options:
  - Hub & Spoke
  - Virtual WAN
- [ ] Confidential computing integration within the SLZ
- [ ] Implementation options: Bicep, Terraform, Azure Portal
- [ ] SLZ and Azure Local — extending the SLZ to on-premises

<!-- DIAGRAM: SLZ management group hierarchy showing the full tree from Root → Platform + Landing Zones → sub-groups including Confidential Corp, Confidential Online, with Azure Policies annotated at each level -->

<!-- DIAGRAM: SLZ Hub & Spoke network topology showing the hub VNet with Firewall, VPN/ExpressRoute Gateway, connected to spoke VNets for each landing zone workload, with on-premises connectivity -->

## References

- [Sovereign Landing Zone Overview](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/overview-sovereign-landing-zone)
- [SLZ Controls and Principles](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/overview-controls-principles)
- [SLZ Implementation Options](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/implementation-options)
- [Azure Landing Zone Architecture](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/)
- [Azure Landing Zone Design Areas](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-areas)

---

> **Next:** [Controls & Principles →](03-controls-and-principles.md)
