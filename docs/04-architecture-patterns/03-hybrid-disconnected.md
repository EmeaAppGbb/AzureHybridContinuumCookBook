# Hybrid Disconnected Pattern

## Introduction

The hybrid disconnected pattern addresses the most constrained deployment model — environments with no connectivity to Azure, either by design (air-gapped security requirements) or by circumstance (remote locations, military operations, shipboard deployments). This pattern requires complete operational autonomy.

## Topics to Cover

- [ ] Pattern definition and when to use it
- [ ] Characteristics: no cloud connectivity, full local management, offline operations
- [ ] Reference architecture components:
  - Compute: Azure Local VMs, locally managed Kubernetes (k3s, RKE2)
  - Data: SQL Server, PostgreSQL — locally managed instances
  - Messaging: self-hosted message brokers (RabbitMQ, NATS, Apache Kafka)
  - Identity: Active Directory Domain Services (on-premises), ADFS
  - Networking: local networking, no cloud dependencies
  - Storage: local Storage Spaces Direct, local object storage (MinIO)
- [ ] Operations in disconnected mode:
  - Patch management: offline update packages
  - Monitoring: local monitoring stack (Prometheus, Grafana)
  - Backup and disaster recovery: local backup solutions
  - Certificate management: local PKI
- [ ] Security considerations: no cloud-based threat intelligence, local security operations
- [ ] Container registry: local registry (Harbor) for container image distribution
- [ ] Preparing for reconnection: sync patterns when connectivity is restored

<!-- DIAGRAM: Disconnected architecture showing a fully self-contained Azure Local environment with local Kubernetes, local databases, local identity (AD DS), local monitoring (Prometheus/Grafana), local container registry (Harbor), all behind an air-gap boundary with no external connections -->

<!-- DIAGRAM: Offline operations workflow showing how updates, patches, and new container images are prepared in a connected staging environment, transferred via secure media, and applied in the disconnected environment -->

## References

- [Azure Stack Hub Disconnected Deployment](https://learn.microsoft.com/en-us/azure-stack/operator/azure-stack-disconnected-deployment)
- [Azure Local Overview](https://learn.microsoft.com/en-us/azure/azure-local/)
- [Harbor Container Registry](https://goharbor.io/)
- [K3s — Lightweight Kubernetes](https://k3s.io/)

---

> **Next:** [Cloud Exit Pattern →](04-cloud-exit.md)
