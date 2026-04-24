# Phase 3: Disconnected

## Introduction

In this final phase, the Contoso Insurance Platform is fully disconnected from Azure — operating completely autonomously on Azure Local with no cloud dependencies. This represents the far end of the hybrid continuum and the highest level of sovereignty.

## Topics to Cover

- [ ] Disconnection planning and the dependency elimination checklist
- [ ] Architecture overview for Phase 3:
  - **Frontend**: NGINX container on K3s/RKE2 (local Kubernetes), local reverse proxy (Traefik/NGINX Ingress)
  - **API Backend**: .NET 8 containers on local Kubernetes
  - **Background Workers**: .NET 8 containers on local Kubernetes
  - **Database**: SQL Server on Azure Local VMs or Kubernetes (locally managed)
  - **File Storage**: MinIO (S3-compatible local object storage)
  - **Message Queue**: RabbitMQ or NATS (locally deployed)
  - **Identity**: Active Directory Domain Services + ADFS (fully on-premises)
- [ ] Cloud dependency replacements:
  | Cloud Service | Disconnected Replacement |
  |--------------|--------------------------|
  | Azure AD | AD DS + ADFS |
  | Azure Monitor | Prometheus + Grafana |
  | Azure Key Vault | HashiCorp Vault |
  | Azure Container Registry | Harbor |
  | Azure DevOps/GitHub | Local GitLab |
  | Defender for Cloud | Local security tooling |
  | Azure DNS | Local DNS (Windows DNS / CoreDNS) |
- [ ] Application code changes required for disconnected operation
- [ ] Local CI/CD pipeline setup
- [ ] Local monitoring and alerting configuration
- [ ] Local backup and disaster recovery
- [ ] Operational procedures for the disconnected environment:
  - Patch management via offline media
  - Image updates via Harbor
  - Certificate rotation via local PKI
  - Incident response without cloud tools

<!-- DIAGRAM: Phase 3 architecture showing a fully self-contained Azure Local environment with all components running locally: K3s cluster (frontend, backend, workers), SQL Server, MinIO, RabbitMQ, AD DS, ADFS, Prometheus/Grafana, Harbor, HashiCorp Vault — all behind an air-gap boundary -->

<!-- DIAGRAM: Side-by-side comparison of all three phases showing the same application components and how each maps across Phase 1 (Azure PaaS), Phase 2 (Azure Local + cloud services), Phase 3 (fully local) — a visual transformation table -->

## References

- [K3s — Lightweight Kubernetes](https://k3s.io/)
- [RKE2 — Security-focused Kubernetes](https://docs.rke2.io/)
- [MinIO Object Storage](https://min.io/)
- [Harbor Container Registry](https://goharbor.io/)
- [HashiCorp Vault](https://www.vaultproject.io/)
- [Active Directory Domain Services](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)

---

> **Next:** [Architecture Decisions →](05-architecture-decisions.md)
