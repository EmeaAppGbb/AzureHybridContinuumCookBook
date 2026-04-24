# Platform Automation

## Introduction

Infrastructure as Code (IaC) and CI/CD pipelines are essential for deploying and maintaining sovereign landing zones consistently and repeatably. This chapter covers automation strategies for the SLZ across the hybrid continuum.

## Topics to Cover

- [ ] IaC for SLZ deployment:
  - Bicep modules for SLZ
  - Terraform modules for SLZ (ALZ Terraform module)
  - ARM templates (legacy, for reference)
- [ ] CI/CD pipeline design for sovereign environments:
  - Azure DevOps Pipelines
  - GitHub Actions
  - Pipeline security: service connections, managed identities, approval gates
- [ ] GitOps for hybrid environments:
  - Azure Arc-enabled Kubernetes with Flux
  - Configuration drift detection and remediation
- [ ] Automation for disconnected environments:
  - Offline IaC deployment patterns
  - USB/media-based update distribution
  - Local CI/CD tooling (GitLab, Jenkins)
- [ ] Testing and validation:
  - Policy compliance testing with Azure Policy
  - Infrastructure testing (Pester, Terratest)
  - Pre-deployment validation
- [ ] Secrets management in CI/CD: Azure Key Vault integration

<!-- DIAGRAM: CI/CD pipeline architecture for SLZ showing: Source Code (Git) → Build Pipeline (lint, validate, test) → Approval Gate → Deploy to Connected Environment → Verify Compliance. Parallel track: Offline Package Build → Secure Transfer → Deploy to Disconnected Environment -->

## References

- [SLZ Implementation Options](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/implementation-options)
- [Azure Landing Zone — Bicep](https://github.com/Azure/ALZ-Bicep)
- [Azure Landing Zone — Terraform](https://github.com/Azure/terraform-azurerm-caf-enterprise-scale)
- [Azure Arc GitOps](https://learn.microsoft.com/en-us/azure/azure-arc/kubernetes/conceptual-gitops-flux2)

---

> **Next:** [Implementation Options →](06-implementation-options.md)
