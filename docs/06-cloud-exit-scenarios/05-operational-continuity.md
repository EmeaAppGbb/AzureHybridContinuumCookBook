# Operational Continuity

## Introduction

Maintaining operational continuity during cloud exit is essential. This chapter covers the operational aspects of transitioning workloads — ensuring that monitoring, alerting, incident response, and business processes continue to function throughout the migration and in the target environment.

## Topics to Cover

- [ ] Operational continuity planning:
  - Runbook development for each transition stage
  - Team training for new tooling and procedures
  - Communication plan for stakeholders
- [ ] Monitoring during transition:
  - Dual monitoring: maintain cloud and local monitoring during migration
  - Dashboard migration: recreating dashboards in local tools
  - Alert routing: ensuring alerts reach the right teams
- [ ] Incident response across environments:
  - On-call procedures during transition
  - Escalation paths that span cloud and on-premises
  - War room procedures for migration events
- [ ] Backup and disaster recovery:
  - Pre-migration backups with verified restores
  - DR strategy for the target environment
  - Business continuity plan updates
- [ ] Change management:
  - Freeze periods during critical migrations
  - Rollback triggers and procedures
  - Post-migration hypercare period
- [ ] SLA management during transition:
  - Expected service degradation windows
  - Customer communication
  - SLA adjustments for the target environment

<!-- DIAGRAM: Operational continuity timeline overlaid with migration phases showing: dual monitoring period, team training milestones, DR validation checkpoints, and the transition from cloud-based operations to local operations -->

## References

- [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/)
- [Site Reliability Engineering](https://learn.microsoft.com/en-us/training/modules/intro-to-site-reliability-engineering/)
- [Cloud Adoption Framework — Manage](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/manage/)

---

> **Next:** [Part 7 — Reference Scenario →](../07-reference-scenario/README.md)
