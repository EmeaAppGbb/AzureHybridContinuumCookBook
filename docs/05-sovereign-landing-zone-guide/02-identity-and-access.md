# Identity & Access Management

## Introduction

Identity is the primary security perimeter in sovereign architectures. This chapter covers how to design identity and access management for sovereign workloads, including scenarios that span cloud, hybrid, and disconnected environments.

## Topics to Cover

- [ ] Identity architecture options for sovereign environments:
  - Azure AD (Entra ID) only — cloud identity
  - Hybrid identity with Azure AD Connect
  - On-premises AD DS for disconnected scenarios
  - ADFS for federated identity
- [ ] Privileged Identity Management (PIM) for least-privilege access
- [ ] Conditional Access policies for sovereign workloads
- [ ] Emergency access accounts and break-glass procedures
- [ ] Managed identities for Azure resources
- [ ] Identity across the hybrid continuum:
  - Connected: Azure AD with hybrid join
  - Intermittent: Azure AD with sync and offline tokens
  - Disconnected: Local AD DS with no cloud dependency
- [ ] Service principal management and secret rotation
- [ ] Azure AD Customer Lockbox for sovereignty

<!-- DIAGRAM: Identity architecture across the hybrid continuum showing three columns: Connected (Azure AD + hybrid join), Intermittent (Azure AD Connect sync + offline capabilities), Disconnected (on-premises AD DS only) — with authentication flows for each -->

## References

- [Azure AD Overview](https://learn.microsoft.com/en-us/entra/fundamentals/whatis)
- [Hybrid Identity](https://learn.microsoft.com/en-us/entra/identity/hybrid/)
- [Privileged Identity Management](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/)
- [Customer Lockbox](https://learn.microsoft.com/en-us/azure/security/fundamentals/customer-lockbox-overview)

---

> **Next:** [Network Topology →](03-network-topology.md)
