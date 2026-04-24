# Connected → Disconnected Azure Local

## Introduction

The second stage of cloud exit transitions from a connected hybrid environment to a fully disconnected, air-gapped deployment. This is the most complex transition because every cloud dependency must be eliminated and replaced with local alternatives.

## Topics to Cover

- [ ] The disconnection checklist — every cloud dependency that must be severed:
  - Identity: Azure AD → on-premises AD DS
  - Management: Azure Portal → local management tools
  - Monitoring: Azure Monitor → local Prometheus/Grafana
  - Security: Defender for Cloud → local security tools
  - Container images: Azure Container Registry → Harbor (local registry)
  - DNS: Azure DNS → local DNS servers
  - Certificate management: Azure-integrated CA → local PKI
  - Secrets management: Azure Key Vault → HashiCorp Vault or local secrets
- [ ] Infrastructure preparation for disconnected mode:
  - Local identity infrastructure (AD DS, DNS, DHCP)
  - Local monitoring stack deployment
  - Local container registry setup and image mirroring
  - Local PKI and certificate infrastructure
  - Local backup and disaster recovery
- [ ] Application changes required:
  - Remove Azure SDK dependencies
  - Replace Azure PaaS client libraries with local service clients
  - Update configuration for local endpoints
  - Implement offline-capable health checks
- [ ] Testing in disconnected mode:
  - Network isolation testing
  - Failover and recovery testing
  - Operational procedure testing
- [ ] The disconnection event: execution plan and verification
- [ ] Post-disconnection operations and maintenance procedures

<!-- DIAGRAM: Before/After architecture showing the connected state (with cloud dependencies highlighted) and the disconnected state (with all cloud dependencies replaced by local alternatives), connected by transition arrows showing the replacement mapping -->

<!-- DIAGRAM: Disconnection execution timeline showing: Pre-staging (days 1-14) → Infrastructure hardening (days 15-21) → Service migration (days 22-28) → Validation testing (days 29-35) → Disconnection event (day 36) → Post-disconnect validation (days 37-42) -->

## References

- [Azure Stack Hub Disconnected Deployment](https://learn.microsoft.com/en-us/azure-stack/operator/azure-stack-disconnected-deployment)
- [Active Directory Domain Services](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
- [HashiCorp Vault](https://www.vaultproject.io/)
- [Harbor Registry](https://goharbor.io/)

---

> **Next:** [Data Migration Strategies →](04-data-migration.md)
