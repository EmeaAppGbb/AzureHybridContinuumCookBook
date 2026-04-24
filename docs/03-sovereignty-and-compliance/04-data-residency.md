# Data Residency & Sovereignty

## Introduction

Data residency and data sovereignty are often conflated but represent distinct concerns. Data residency is about *where* data is physically stored. Data sovereignty extends further — it's about *who* has legal authority over that data and *how* it can be accessed, even by the cloud provider.

## Topics to Cover

- [ ] Data residency vs. data sovereignty — clear definitions
- [ ] Azure data residency commitments by region
- [ ] Data residency in the Sovereign Landing Zone
- [ ] How Azure Local enables full data sovereignty — data never leaves your premises
- [ ] Encryption strategies:
  - At rest (Azure Storage Service Encryption, Azure Disk Encryption)
  - In transit (TLS, VPN, ExpressRoute encryption)
  - In use (Confidential Computing)
- [ ] Key management: Microsoft-managed vs. customer-managed vs. customer-held keys
- [ ] Cross-border data transfer considerations (Schrems II, EU Data Boundary)
- [ ] Data classification and sensitivity labeling (Microsoft Purview)

<!-- DIAGRAM: Data sovereignty model showing three tiers: Tier 1 — Data residency in Azure region with policies, Tier 2 — Data residency with SLZ + Confidential Computing + CMK, Tier 3 — Data on-premises with Azure Local (full sovereignty) -->

## References

- [Azure Data Residency](https://azure.microsoft.com/en-us/explore/global-infrastructure/data-residency/)
- [EU Data Boundary for Microsoft Cloud](https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn)
- [Azure Encryption Overview](https://learn.microsoft.com/en-us/azure/security/fundamentals/encryption-overview)
- [Microsoft Purview Data Governance](https://learn.microsoft.com/en-us/purview/)

---

> **Next:** [Compliance Frameworks →](05-compliance-frameworks.md)
