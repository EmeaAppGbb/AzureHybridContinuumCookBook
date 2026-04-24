# Security & Governance

## Introduction

Security and governance are the design areas where the Sovereign Landing Zone differs most significantly from the standard Azure Landing Zone. This chapter details the additional security controls, policy initiatives, and governance structures required for sovereign workloads.

## Topics to Cover

- [ ] SLZ-specific Azure Policy initiatives:
  - Sovereign baseline policies
  - Confidential computing policies
  - Data residency enforcement policies
  - Approved services and SKU restrictions
- [ ] Microsoft Defender for Cloud configuration:
  - Enhanced security posture for sovereign workloads
  - Regulatory compliance dashboard configuration
  - Threat protection for hybrid environments
- [ ] Microsoft Sentinel for security operations:
  - SIEM/SOAR for sovereign environments
  - Data connectors for hybrid environments
  - Sovereign-specific detection rules
- [ ] Governance structure:
  - Management group hierarchy enforcement
  - Subscription vending with sovereign guardrails
  - Resource tagging strategy for sovereign classification
  - Cost management and budgets
- [ ] Azure Monitor for sovereign environments:
  - Diagnostic settings
  - Log Analytics workspace architecture
  - Data export and retention policies
- [ ] Compliance reporting and evidence collection

<!-- DIAGRAM: Governance structure for SLZ showing management group hierarchy with policies annotated at each level, showing which policies are inherited and which are specific to confidential landing zones -->

## References

- [SLZ Controls and Principles](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/overview-controls-principles)
- [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/)
- [Microsoft Sentinel](https://learn.microsoft.com/en-us/azure/sentinel/)
- [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/)

---

> **Next:** [Platform Automation →](05-platform-automation.md)
