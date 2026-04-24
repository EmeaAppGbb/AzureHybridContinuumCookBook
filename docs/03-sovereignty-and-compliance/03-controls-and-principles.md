# Controls & Principles

## Introduction

The Sovereign Landing Zone enforces sovereignty through a layered set of controls and principles that build on Azure's native governance capabilities. This chapter examines each control category and how they work together to protect sovereign workloads.

## Topics to Cover

- [ ] Zero Trust as the foundational principle for sovereign architectures
- [ ] Azure Policy enforcement in the SLZ:
  - Data residency policies
  - Encryption requirements
  - Network isolation policies
  - Service restrictions
- [ ] Confidential Computing:
  - What is Confidential Computing — protecting data in use
  - Intel SGX and AMD SEV-SNP Trusted Execution Environments
  - Confidential VMs on Azure
  - Confidential Containers
  - Attestation services
- [ ] Customer-managed keys and Azure Key Vault integration
- [ ] Network security: Private Link, Private DNS, service endpoints
- [ ] Identity: Azure AD Conditional Access, Privileged Identity Management
- [ ] Monitoring and auditing: Azure Monitor, Microsoft Defender for Cloud, Microsoft Sentinel
- [ ] Custom policy initiatives for specific regulatory requirements

<!-- DIAGRAM: Defense-in-depth diagram for sovereign workloads showing layers: Physical Security → Network Isolation (Private Link) → Identity (Conditional Access, PIM) → Data Protection (Encryption at rest/transit/use) → Confidential Computing (TEE) → Application Security → Monitoring & Audit -->

## References

- [SLZ Controls and Principles](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/overview-controls-principles)
- [Azure Confidential Computing](https://learn.microsoft.com/en-us/azure/confidential-computing/overview)
- [Azure Policy Overview](https://learn.microsoft.com/en-us/azure/governance/policy/overview)
- [Zero Trust Security](https://learn.microsoft.com/en-us/security/zero-trust/)
- [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview)

---

> **Next:** [Data Residency & Sovereignty →](04-data-residency.md)
