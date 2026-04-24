# Azure Regions & Availability Zones

## Introduction

Azure's global infrastructure forms the foundation of the hybrid continuum. Understanding how Azure organizes its cloud resources — into regions, availability zones, and edge locations — is essential for designing architectures that extend beyond the public cloud.

## Topics to Cover

- [ ] Azure global infrastructure overview: 60+ regions, 300+ data centers
- [ ] What is an Azure Region and how regions are selected
- [ ] Availability Zones: physically separate data centers within a region
- [ ] Region pairs and cross-region replication
- [ ] Sovereign regions (Azure Government, Azure China, Azure Germany)
- [ ] How Azure regions relate to Azure Local — extending the region concept to your data center
- [ ] Fault isolation in Azure: region-level, zone-level, and rack-level boundaries
- [ ] Service availability by region — not all services are available everywhere

<!-- DIAGRAM: Azure global infrastructure map showing regions, availability zones, and how Azure Local extends the region boundary into customer premises -->

<!-- DIAGRAM: Fault isolation hierarchy in Azure — from global (DNS, CDN) through regional (compute, storage) to zonal (individual data centers) to local (Azure Local instances) -->

## References

- [Azure Regions](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview)
- [Azure Global Infrastructure](https://azure.microsoft.com/en-us/explore/global-infrastructure/)
- [Azure Geographies](https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/)
- [Products Available by Region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/)

---

> **Next:** [Azure Local →](02-azure-local.md)
