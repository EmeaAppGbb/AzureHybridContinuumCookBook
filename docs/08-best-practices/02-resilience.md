# Resilience

## Introduction

Resilience in hybrid architectures requires thinking about failure modes that don't exist in purely cloud-native or purely on-premises environments. Network partitions, split-brain scenarios, and connectivity-dependent features all present unique challenges.

## Topics to Cover

- [ ] Fault domains across the hybrid continuum:
  - Cloud region failures
  - Connectivity failures (ExpressRoute/VPN outage)
  - Azure Local node/cluster failures
  - Power and facility failures for on-premises
- [ ] Resilience patterns for hybrid:
  - **Static Stability**: Systems continue functioning without cloud management plane
  - **Bulkhead Isolation**: Separate cloud-dependent and locally autonomous components
  - **Circuit Breaker**: Graceful degradation when cloud services are unavailable
  - **Retry with Exponential Backoff**: For intermittent connectivity scenarios
  - **Queue-Based Load Leveling**: Buffer work during connectivity disruptions
- [ ] High availability design:
  - Multi-node Azure Local clusters
  - Database replication and failover
  - Container orchestrator self-healing
  - Storage redundancy (Storage Spaces Direct)
- [ ] Disaster recovery across the continuum:
  - Backup strategies per deployment model
  - RTO/RPO targets and how to achieve them
  - DR testing procedures
- [ ] Chaos engineering for hybrid environments

<!-- DIAGRAM: Fault domain hierarchy for hybrid environments showing nested failure boundaries: Azure Global → Azure Region → Availability Zone → Azure Local Cluster → Azure Local Node → Application Pod — with blast radius visualization at each level -->

## References

- [Azure Well-Architected Framework — Reliability](https://learn.microsoft.com/en-us/azure/well-architected/reliability/)
- [Resilience Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/category/resiliency)
- [Azure Local High Availability](https://learn.microsoft.com/en-us/azure/azure-local/concepts/high-availability)

---

> **Next:** [Security →](03-security.md)
