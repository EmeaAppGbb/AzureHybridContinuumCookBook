# Security

## Introduction

Security across the hybrid continuum requires adapting cloud security practices for environments with varying levels of connectivity and control. This chapter covers security best practices that apply across all deployment models.

## Topics to Cover

- [ ] Zero Trust across the continuum:
  - Identity verification in connected vs. disconnected environments
  - Network micro-segmentation everywhere
  - Continuous validation and monitoring
- [ ] Defense in depth for hybrid:
  - Physical security (on-premises facilities)
  - Network security (firewalls, NSGs, Private Link)
  - Identity security (MFA, Conditional Access, PIM)
  - Data security (encryption at rest/transit/use)
  - Application security (input validation, OWASP)
  - Operations security (logging, monitoring, incident response)
- [ ] Secret management across environments:
  - Azure Key Vault for connected environments
  - HashiCorp Vault for disconnected environments
  - Secret rotation automation
  - Certificate lifecycle management
- [ ] Supply chain security:
  - Container image signing and verification
  - Registry security (Harbor with Trivy/Notary)
  - Software Bill of Materials (SBOM)
  - Dependency scanning
- [ ] Security monitoring:
  - Connected: Microsoft Defender for Cloud, Sentinel
  - Disconnected: local SIEM (Wazuh, Elastic Security)
  - Unified security posture across environments

<!-- DIAGRAM: Defense-in-depth model for hybrid showing concentric security layers that adapt based on deployment model — cloud-native layers (Defender, Sentinel) in connected mode, local equivalents (Wazuh, local SIEM) in disconnected mode -->

## References

- [Zero Trust Security Model](https://learn.microsoft.com/en-us/security/zero-trust/)
- [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/)
- [Azure Security Best Practices](https://learn.microsoft.com/en-us/azure/security/fundamentals/best-practices-and-patterns)

---

> **Next:** [Operations →](04-operations.md)
