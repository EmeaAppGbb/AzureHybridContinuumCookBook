# Part 5: Sovereign Landing Zone — Implementation Guide

This section provides practical, step-by-step guidance for implementing a Sovereign Landing Zone on Azure. You'll learn how the SLZ design areas differ from standard Azure Landing Zones, and walk through each area with concrete implementation patterns, policy definitions, and infrastructure-as-code examples using Bicep and Terraform.

## What You'll Learn

- The eight SLZ design areas and how they extend standard Azure Landing Zones
- How to implement sovereign identity and access management patterns
- Network topology designs for data residency and isolation requirements
- Security and governance controls specific to sovereign scenarios
- Platform automation approaches using Bicep, Terraform, and CI/CD pipelines
- Deployment options and when to use Portal, Bicep, or Terraform

## Chapters

| Chapter | Description |
|---------|-------------|
| [Design Areas Overview](01-design-areas.md) | SLZ design areas and how they differ from standard ALZ |
| [Identity & Access Management](02-identity-and-access.md) | Sovereign identity architecture |
| [Network Topology](03-network-topology.md) | Network design for sovereign environments |
| [Security & Governance](04-security-governance.md) | Security controls and governance policies |
| [Platform Automation](05-platform-automation.md) | IaC and CI/CD for sovereign deployments |
| [Implementation Options](06-implementation-options.md) | Bicep, Terraform, and Portal deployment |

<!-- DIAGRAM: SLZ implementation journey showing the sequential steps: 1. Design Areas Assessment → 2. Management Group Hierarchy → 3. Identity Setup → 4. Network Deployment → 5. Policy Assignment → 6. Workload Landing Zones → 7. Workload Deployment -->

## Prerequisites

- Azure subscription with Owner or Contributor access
- Understanding of Azure Landing Zone concepts
- Familiarity with Infrastructure as Code (Bicep or Terraform)

## References

- [Sovereign Landing Zone Overview](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/overview-sovereign-landing-zone)
- [Azure Landing Zone Accelerator](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/implementation-options)
- [Azure Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/)

---

> **Next:** [Design Areas Overview →](01-design-areas.md)
