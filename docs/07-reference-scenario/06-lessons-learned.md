# Lessons Learned

## Introduction

This chapter captures the key lessons learned from taking the Contoso Insurance Platform through the entire hybrid continuum — from public cloud to disconnected sovereign operation. These lessons are broadly applicable to any enterprise considering a similar journey.

## Topics to Cover

- [ ] Top lessons:
  - **Design for portability from day one**: Applications designed with PaaS abstractions in mind are easier to migrate
  - **The database is always the hardest part**: Data gravity and schema dependencies make database migration the critical path
  - **Identity is the second hardest**: Moving away from cloud identity requires significant planning and application changes
  - **Operational maturity matters more than technology**: Teams must be trained for on-premises operations
  - **Testing in disconnected mode reveals hidden dependencies**: Always test the complete disconnection before committing
  - **Don't underestimate monitoring**: Losing Azure Monitor means building a replacement monitoring stack
  - **Secrets and certificates need a dedicated strategy**: Key rotation and certificate management are operationally intensive without cloud tools
- [ ] What worked well in the migration
- [ ] What was harder than expected
- [ ] Recommendations for teams planning a similar journey
- [ ] Cost comparison across the three phases
- [ ] Performance comparison across the three phases
- [ ] Team skills and training required for each phase

<!-- DIAGRAM: Effort/complexity heat map showing the relative difficulty of migrating each application component across the three phases — highlighting that database and identity are consistently the most complex -->

## References

- [Cloud Adoption Framework — Innovation](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/innovate/)
- [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/)

---

> **Next:** [Part 8 — Best Practices →](../08-best-practices/README.md)
