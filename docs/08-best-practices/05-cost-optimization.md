# Cost Optimization

## Introduction

Cost models change dramatically as workloads move along the hybrid continuum. Public cloud offers OpEx flexibility, while on-premises introduces CapEx for hardware and increased operational costs. This chapter helps teams understand and optimize costs across deployment models.

## Topics to Cover

- [ ] Cost model comparison across the continuum:
  - **Public Cloud**: OpEx (pay-per-use), Azure reservations, savings plans
  - **Azure Local Connected**: Hardware CapEx + Azure subscription fees + operations
  - **Azure Local Disconnected**: Hardware CapEx + licensing + full operations team
- [ ] Total Cost of Ownership (TCO) framework:
  - Hardware costs (servers, networking, storage, facilities)
  - Software licensing (Azure Local, SQL Server, Windows Server)
  - Operational costs (staffing, training, on-call)
  - Network costs (ExpressRoute, VPN, bandwidth)
  - Opportunity cost (innovation velocity, time to market)
- [ ] Cost optimization strategies:
  - Right-sizing Azure Local clusters
  - Azure Hybrid Benefit for Windows Server and SQL Server
  - Reserved instances for predictable workloads
  - Container density optimization
- [ ] Hidden costs of cloud exit:
  - One-time migration costs
  - Dual running during transition
  - Skills acquisition and training
  - Tooling replacement (monitoring, CI/CD, security)
- [ ] When on-premises is cheaper vs. when cloud is cheaper — decision criteria

<!-- DIAGRAM: TCO comparison chart showing cost breakdown (hardware, software, operations, network) for the same workload running in public cloud, connected Azure Local, and disconnected Azure Local over a 3-year period -->

## References

- [Azure Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/)
- [Azure TCO Calculator](https://azure.microsoft.com/en-us/pricing/tco/calculator/)
- [Azure Hybrid Benefit](https://azure.microsoft.com/en-us/pricing/hybrid-benefit/)
- [Azure Well-Architected Framework — Cost Optimization](https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/)

---

> **Next:** [Part 9 — Appendix →](../09-appendix/README.md)
