# Implementation Options

## Introduction

This chapter provides practical implementation guidance for deploying a Sovereign Landing Zone, with step-by-step instructions for the supported deployment methods. It connects the theoretical design areas to concrete deployment actions.

## Topics to Cover

- [ ] Implementation option comparison:
  - **Bicep**: Microsoft's recommended IaC for Azure — native, first-party support
  - **Terraform**: Multi-cloud IaC with Azure provider — strong community module
  - **Azure Portal**: Manual deployment — suitable for learning and small-scale
- [ ] Bicep implementation walkthrough:
  - Repository structure
  - Module organization
  - Parameter files for sovereign configuration
  - Deployment commands
- [ ] Terraform implementation walkthrough:
  - Module structure (CAF Enterprise Scale module)
  - Variable configuration for SLZ
  - State management (remote state with Azure Storage)
  - Deployment workflow
- [ ] Post-deployment validation:
  - Verify management group hierarchy
  - Verify policy assignments
  - Verify network topology
  - Run compliance checks
- [ ] Extending the SLZ to Azure Local:
  - Additional configuration for hybrid connectivity
  - Arc registration of Azure Local clusters
  - Policy extension for on-premises resources
- [ ] Day-2 operations: updates, policy additions, new landing zones

<!-- DIAGRAM: Implementation option decision tree: "Multi-cloud?" → Yes → Terraform / No → "Azure-native IaC experience?" → Yes → Bicep / No → "Learning/POC?" → Yes → Portal / No → Bicep -->

## References

- [SLZ Implementation Options](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/implementation-options)
- [ALZ Bicep Modules](https://github.com/Azure/ALZ-Bicep)
- [ALZ Terraform Module](https://github.com/Azure/terraform-azurerm-caf-enterprise-scale)
- [Azure Landing Zone Portal Accelerator](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/implementation-options#azure-landing-zone-portal-accelerator)

---

> **Next:** [Part 6 — Cloud Exit Scenarios →](../06-cloud-exit-scenarios/README.md)
