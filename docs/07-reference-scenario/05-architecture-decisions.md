# Architecture Decisions

!!! abstract "Chapter Summary"
    This chapter documents the key Architecture Decision Records (ADRs) made during Contoso Insurance's journey through the hybrid continuum. Each ADR captures the context, alternatives considered, decision rationale, and consequences. These decisions shaped the migration path from Azure public cloud to fully disconnected sovereign operation.

## ADR Process & Template

Contoso adopted the Architecture Decision Record format to document significant architectural choices. Each ADR follows a consistent structure ensuring decisions are traceable and reversible.

### ADR Template Structure

```markdown
# ADR-XXX: [Decision Title]

**Status**: [Proposed | Accepted | Superseded | Deprecated]
**Date**: YYYY-MM-DD
**Deciders**: [List of people involved in decision]
**Context**: [What is the issue we're facing?]

## Decision

[The decision that was made]

## Alternatives Considered

1. **Option 1**: Description, pros/cons
2. **Option 2**: Description, pros/cons
3. **Option 3**: Description, pros/cons

## Rationale

[Why we chose this option]

## Consequences

**Positive**: Benefits of this decision
**Negative**: Drawbacks and risks
**Mitigation**: How we address the negatives

## Related Decisions

[Links to related ADRs]
```

## ADR-001: Container Orchestration Platform Selection

**Status**: Accepted  
**Date**: 2023-01-15  
**Deciders**: CTO, Platform Architecture Team, DevOps Lead

### Context

Contoso Insurance needed to select a container orchestration platform for Phase 1 (Azure cloud) that would enable portability through Phase 2 (hybrid) and Phase 3 (disconnected). The platform must support high availability, autoscaling, and integrate with Azure services.

### Decision

**Use Azure Kubernetes Service (AKS) in Phase 1, transition to AKS on Azure Local in Phase 2, and RKE2 in Phase 3.**

### Alternatives Considered

**Option 1: Azure App Service / Container Apps**
: Azure-native PaaS compute services with excellent Azure integration.

- ✅ **Pros**: Simplest operational model, deep Azure integration, automatic scaling, no cluster management
- ❌ **Cons**: Azure-only, no portability to on-premises, vendor lock-in, limited control over infrastructure

**Option 2: Azure Kubernetes Service (AKS) → AKS on Azure Local → RKE2**
: Kubernetes orchestration with migration path to on-premises.

- ✅ **Pros**: Portable workloads (Kubernetes is industry standard), consistent API across phases, on-premises capable
- ❌ **Cons**: Cluster management complexity, requires Kubernetes expertise

**Option 3: Azure Service Fabric**
: Azure-native microservices orchestrator.

- ✅ **Pros**: Azure-optimized, supports .NET applications natively, stateful services
- ❌ **Cons**: Limited on-premises support, smaller ecosystem than Kubernetes, declining community momentum

### Rationale

Kubernetes provides the best balance of Azure integration (Phase 1) and on-premises portability (Phase 2-3). While AKS requires more operational investment than App Service, the ability to run identical workloads on Azure and on-premises is essential for Contoso's cloud exit strategy. Kubernetes is an industry standard with deep ecosystem support and multi-cloud portability.

### Consequences

**Positive**
: Application workloads containerized from day one, enabling seamless migration across phases. Helm charts used consistently from Phase 1 through Phase 3. Team developed Kubernetes expertise applicable across environments.

**Negative**  
: Higher Phase 1 complexity vs. PaaS alternatives (App Service, Functions). Required investment in Kubernetes training and operations. Cluster management overhead in Phase 3 (no Azure-managed control plane).

**Mitigation**
: Engaged Azure FastTrack consultants for AKS best practices training in Phase 1. Used managed AKS in Phase 1-2 to minimize operational burden. Partnered with Rancher for RKE2 deployment assistance in Phase 3.

**Related Decisions**: ADR-008 (Container Registry), ADR-009 (CI/CD Pipeline)

---

## ADR-002: Database Migration Strategy

**Status**: Accepted  
**Date**: 2023-02-10  
**Deciders**: CTO, Database Administrator, Platform Architecture Team

### Context

Contoso's SQL Server database contains 180 GB of transactional data requiring ACID compliance. Migration from Azure SQL Database (Phase 1) to on-premises (Phase 2-3) must achieve <4 hour RTO and <1 hour RPO requirements while maintaining zero data loss.

### Decision

**Use Azure SQL Database (Phase 1) → Arc-enabled SQL Managed Instance (Phase 2) → SQL Server 2022 on VMs (Phase 3) with log shipping for migration.**

### Alternatives Considered

**Option 1: Azure SQL Database → SQL Server on VMs (skip Arc MI)**
: Direct migration from Azure SQL to traditional SQL Server.

- ✅ **Pros**: Simpler architecture (no intermediate Arc MI step), lower Phase 2 cost
- ❌ **Cons**: Larger gap between Azure SQL and SQL Server features, no Arc management benefits in Phase 2

**Option 2: Azure SQL Database → Arc SQL MI → SQL Server 2022 on VMs**
: Phased migration with Arc-enabled SQL MI as intermediate state.

- ✅ **Pros**: Gradual migration, Arc SQL MI provides Azure Portal management in Phase 2, easier rollback
- ❌ **Cons**: Additional migration step, Arc SQL MI licensing costs

**Option 3: Azure SQL Database → Azure SQL MI (fully managed) → SQL Server on VMs**
: Use fully managed Azure SQL MI instead of Arc SQL MI.

- ✅ **Pros**: Fully managed in Phase 2, high availability built-in
- ❌ **Cons**: Still cloud-hosted (doesn't achieve on-premises goal), higher cost than Arc SQL MI

### Rationale

Arc-enabled SQL Managed Instance provides the best migration path by offering Azure SQL compatibility with on-premises hosting. The two-phase migration (Azure SQL → Arc SQL MI → SQL Server VMs) reduces risk by allowing incremental changes. Arc SQL MI in Phase 2 enables continued use of Azure Portal for database management while achieving data sovereignty. The final transition to SQL Server VMs in Phase 3 is straightforward (both run SQL Server engine).

### Consequences

**Positive**
: Zero data loss achieved during Phase 1 → Phase 2 migration using transaction log shipping. Arc SQL MI provided familiar Azure management experience during Phase 2. Database performance improved in Phase 2-3 due to local NVMe storage (2ms vs 8ms latency).

**Negative**  
: Database migration was critical path for both Phase 2 and Phase 3 (longest downtime component). Arc SQL MI licensing added €3,000/month cost in Phase 2. SQL Server VMs require manual backup configuration and Always On Availability Group management in Phase 3.

**Mitigation**
: Practiced migration in dev/test environments 3 times before production cutover. Maintained Azure SQL Database as hot standby for 72 hours post-migration. Implemented automated backup validation checks (checksum verification).

**Related Decisions**: ADR-007 (Secret Management for connection strings)

---

## ADR-003: Message Broker Selection

**Status**: Accepted  
**Date**: 2023-03-01  
**Deciders**: Platform Architecture Team, Backend Development Team

### Context

Azure Service Bus provided reliable message queuing in Phase 1 but is cloud-only. Phase 2-3 require on-premises message broker supporting at-least-once delivery, dead-letter queues, and durable message storage.

### Decision

**Use Azure Service Bus (Phase 1) → RabbitMQ (Phase 2-3).**

### Alternatives Considered

**Option 1: RabbitMQ**
: Open-source AMQP message broker with excellent Kubernetes support.

- ✅ **Pros**: Battle-tested (15+ years), excellent .NET support (MassTransit, EasyNetQ), quorum queues for HA, active community
- ❌ **Cons**: Requires operational expertise, no managed offering on-premises

**Option 2: Apache Kafka**
: Distributed event streaming platform.

- ✅ **Pros**: Highest throughput, excellent for event sourcing, strong consistency guarantees
- ❌ **Cons**: Overkill for Contoso's workload (not event streaming), operational complexity, higher resource requirements

**Option 3: NATS**
: Lightweight cloud-native messaging system.

- ✅ **Pros**: Extremely lightweight, low latency, Kubernetes-native
- ❌ **Cons**: Less mature than RabbitMQ, limited .NET ecosystem, fewer enterprise features (no built-in DLQ)

### Rationale

RabbitMQ offers the best balance of enterprise features (dead-letter queues, message persistence, at-least-once delivery) and operational simplicity. The .NET ecosystem support via MassTransit simplifies application integration. RabbitMQ's quorum queues provide high availability without complex Kafka clusters. Contoso's workload (3 queues, ~15,000 messages/day) fits RabbitMQ's strengths.

### Consequences

**Positive**
: RabbitMQ Cluster Operator simplified Kubernetes deployment. MassTransit abstraction layer minimized code changes (only configuration updates). RabbitMQ Management UI provided excellent operational visibility. Message processing latency unchanged vs. Azure Service Bus.

**Negative**  
: Team required RabbitMQ training (queue configuration, memory/disk management). Monitoring integration required custom Prometheus exporters. Quorum queue configuration subtly different from Azure Service Bus (message TTL, prefetch count tuning).

**Mitigation**
: Engaged RabbitMQ consultants for best practices training. Migrated dev/test environments first to identify configuration gaps. Implemented comprehensive monitoring (queue depth, consumer lag, memory usage).

**Related Decisions**: ADR-001 (Kubernetes as RabbitMQ host)

---

## ADR-004: Object Storage Selection

**Status**: Accepted  
**Date**: 2023-03-15  
**Deciders**: Platform Architecture Team, Storage Administrator

### Context

Azure Blob Storage provided scalable document storage in Phase 1. Phase 2-3 require on-premises object storage for 8 TB of insurance documents with S3 API compatibility for minimal application changes.

### Decision

**Use Azure Blob Storage (Phase 1) → MinIO (Phase 2-3).**

### Alternatives Considered

**Option 1: MinIO**
: Open-source S3-compatible object storage.

- ✅ **Pros**: Excellent S3 API compatibility, Kubernetes-native, erasure coding for durability, active development
- ❌ **Cons**: Requires operational expertise, manual scaling management

**Option 2: Ceph Object Gateway (RGW)**
: Enterprise-grade distributed storage system.

- ✅ **Pros**: Battle-tested at scale, strong consistency, multi-protocol support (S3, Swift)
- ❌ **Cons**: Complex deployment, heavy resource requirements, steep learning curve

**Option 3: Azure Local Native Storage (CSV)**
: Use Cluster Shared Volumes directly for file storage.

- ✅ **Pros**: Integrated with Azure Local, no additional software
- ❌ **Cons**: No object storage API (requires file share protocol), significant application changes

### Rationale

MinIO's S3 API compatibility enabled nearly zero application code changes — only connection string updates. The Azure Blob Storage SDK includes S3-compatible endpoint support, making migration seamless. MinIO's Kubernetes-native design aligns with Contoso's orchestration strategy. Erasure coding provides durability without full replication overhead.

### Consequences

**Positive**
: Migration required only configuration changes (no code changes). Presigned URL generation, multipart uploads, and lifecycle policies worked identically. MinIO's performance exceeded Azure Blob (local NVMe vs. network storage). MinIO Console provided excellent operational UI.

**Negative**  
: Manual capacity management (no auto-scaling like Azure Blob). Erasure coding configuration (data shards, parity shards) required planning for storage efficiency. Initial misconfiguration caused intermittent upload failures (corrected by increasing I/O buffer sizes).

**Mitigation**
: Allocated 2x current storage capacity (16 TB) for growth headroom. Implemented Prometheus monitoring for storage utilization alerts (trigger at 70% full). Staged migration over 14 days to identify issues incrementally.

**Related Decisions**: ADR-001 (Kubernetes as MinIO host)

---

## ADR-005: Identity Provider Migration

**Status**: Accepted  
**Date**: 2023-04-01  
**Deciders**: CTO, Security Team, Platform Architecture Team

### Context

Azure AD B2C (customers) and Microsoft Entra ID (employees) provided cloud-based identity in Phase 1-2. Phase 3 requires on-premises identity for full disconnection while maintaining SSO, MFA, and RBAC capabilities.

### Decision

**Use Azure AD B2C + Entra ID (Phase 1-2) → Active Directory Domain Services + ADFS (Phase 3).**

### Alternatives Considered

**Option 1: Active Directory Domain Services + ADFS**
: Traditional Windows-based identity stack.

- ✅ **Pros**: Enterprise-proven, deep Windows integration, full control over identity infrastructure
- ❌ **Cons**: Requires significant application changes, complex certificate management, limited modern auth features (vs. Azure AD)

**Option 2: Keycloak (Open Source IdP)**
: Modern open-source identity provider with OIDC/SAML support.

- ✅ **Pros**: Modern protocol support, Kubernetes-native, extensible, REST API for management
- ❌ **Cons**: Less mature than Azure AD/ADFS, smaller ecosystem, requires custom UI development

**Option 3: Okta (SaaS IdP)**
: Cloud-based identity service with on-premises connector.

- ✅ **Pros**: Modern features, excellent UX, hybrid model supported
- ❌ **Cons**: Still cloud-dependent (defeats disconnection goal), recurring SaaS cost, vendor lock-in

### Rationale

AD DS + ADFS is the only option providing fully on-premises identity without cloud dependencies. While Keycloak is attractive, the team's existing Windows expertise and ADFS's maturity reduced implementation risk. The investment in custom authentication UI (matching Azure AD B2C's experience) was justified by full sovereign control.

### Consequences

**Positive**
: Complete identity sovereignty achieved. No external dependencies for authentication. Integrated with existing corporate AD infrastructure (agents use domain accounts). Certificate management via internal PKI.

**Negative**  
: Significant application code changes required (authentication logic, token validation, logout flows). Custom UI development for customer-facing login pages (~80 hours effort). Certificate rotation operational burden (vs. Azure-managed). User account migration required password resets for all customers.

**Mitigation**
: Phased migration — agents migrated first (internal users, easier rollback), customers migrated in batches of 2,000. Extensive testing with Playwright end-to-end tests (login, logout, MFA flows). Certificate monitoring via Prometheus x509 exporter.

**Related Decisions**: ADR-010 (Network architecture for ADFS high availability)

---

## ADR-006: Monitoring & Observability Stack

**Status**: Accepted  
**Date**: 2023-04-15  
**Deciders**: SRE Team, Platform Architecture Team

### Context

Azure Monitor and Application Insights provided comprehensive observability in Phase 1-2 but require cloud connectivity. Phase 3 requires fully on-premises monitoring with similar capabilities (metrics, logs, traces, dashboards, alerting).

### Decision

**Use Azure Monitor + App Insights (Phase 1-2) → Prometheus + Grafana + Loki + Jaeger (Phase 3).**

### Alternatives Considered

**Option 1: Prometheus + Grafana + Loki + Jaeger (PGLJ Stack)**
: Open-source observability stack with Kubernetes-native components.

- ✅ **Pros**: Industry standard, Kubernetes-native, excellent Grafana dashboards, active community
- ❌ **Cons**: Requires operational expertise, manual integration work, no single-pane-of-glass (4 separate tools)

**Option 2: Elastic Stack (Elasticsearch, Logstash, Kibana)**
: All-in-one log analytics platform.

- ✅ **Pros**: Unified platform for logs/metrics/traces, powerful search, mature ecosystem
- ❌ **Cons**: Heavy resource requirements (Elasticsearch clusters), licensing complexity (Elastic License vs. open source), less Kubernetes-native than PGLJ

**Option 3: Datadog Agent (on-premises)**
: SaaS monitoring with on-premises agent support.

- ✅ **Pros**: Excellent UX, unified platform, APM included
- ❌ **Cons**: Still sends data to cloud (defeats disconnection goal), recurring SaaS cost, vendor lock-in

### Rationale

The PGLJ stack (Prometheus, Grafana, Loki, Jaeger) is the de-facto standard for Kubernetes observability. Each component is Kubernetes-native and integrates seamlessly. While managing four tools is more complex than Azure Monitor, the stack provides equivalent capabilities without cloud dependencies. OpenTelemetry adoption future-proofs instrumentation (vendor-neutral).

### Consequences

**Positive**
: Successfully replicated Azure Monitor dashboards in Grafana (metrics + logs + traces in single pane). OpenTelemetry instrumentation portable across environments. Prometheus + Alertmanager replicated all Azure Monitor alerts. On-premises data retention (90 days) vs. Azure Monitor (30 days default).

**Negative**  
: Significant application instrumentation changes (Azure SDK → OpenTelemetry). Prometheus maintenance (storage management, retention policies). Grafana dashboard migration required manual recreation (no automated export from Azure Monitor). Initial Loki query language learning curve for log analysis.

**Mitigation**
: Ran PGLJ stack in parallel with Azure Monitor during Phase 2-3 transition (validated metric parity). Engaged Grafana consultants for dashboard design best practices. Implemented automated Prometheus backup to MinIO (hourly snapshots).

**Related Decisions**: ADR-001 (Kubernetes as monitoring stack host)

---

## ADR-007: Secrets Management

**Status**: Accepted  
**Date**: 2023-05-01  
**Deciders**: Security Team, Platform Architecture Team

### Context

Azure Key Vault provided secrets management in Phase 1-2 with managed identities for authentication. Phase 3 requires on-premises secrets management with similar capabilities (encryption, access control, audit logging, rotation).

### Decision

**Use Azure Key Vault (Phase 1-2) → HashiCorp Vault (Phase 3).**

### Alternatives Considered

**Option 1: HashiCorp Vault**
: Enterprise secrets management platform with Kubernetes integration.

- ✅ **Pros**: Industry standard, excellent Kubernetes integration (Vault Agent Injector), auto-unseal, audit logging, secrets rotation
- ❌ **Cons**: Operational complexity, requires HA cluster, unsealing procedures

**Option 2: Sealed Secrets (Kubernetes-native)**
: Encrypted secrets stored in Git, decrypted by controller in cluster.

- ✅ **Pros**: GitOps-friendly, simple concept, low operational overhead
- ❌ **Cons**: No secrets rotation, no access audit logs, limited to Kubernetes, no external secret sources

**Option 3: CyberArk Conjur**
: Enterprise secrets management for cloud and on-premises.

- ✅ **Pros**: Enterprise-grade, strong security features, audit compliance
- ❌ **Cons**: Commercial licensing, heavier than Vault, smaller open-source community

### Rationale

HashiCorp Vault strikes the best balance of enterprise features (encryption, audit logging, access control, rotation) and Kubernetes-native integration. The Vault Agent Injector simplifies secret injection into pods (similar to Azure Key Vault CSI driver). Vault's active open-source community and extensive documentation reduce operational risk.

### Consequences

**Positive**
: Successful secret migration from Azure Key Vault with zero secrets exposure. Kubernetes ServiceAccount authentication via Vault's native auth method. Secrets rotation policies implemented (database passwords rotate every 90 days). Comprehensive audit logs for compliance.

**Negative**  
: Vault unsealing operational burden (automated unseal using Shamir secret sharing, but manual backup required). External Secrets Operator configuration more complex than Azure Key Vault CSI driver. Initial Vault deployment required security review (TLS certificates, access policies).

**Mitigation**
: Implemented automated Vault backup (Raft snapshots to MinIO hourly). Documented unseal procedures for disaster recovery (laminated cards in secure safe). Used Terraform to manage Vault policies as code (version control, peer review).

**Related Decisions**: ADR-002 (Database connection string storage), ADR-005 (ADFS certificate storage)

---

## ADR-008: Container Registry

**Status**: Accepted  
**Date**: 2023-05-15  
**Deciders**: DevOps Team, Security Team

### Context

Azure Container Registry provided image storage and vulnerability scanning in Phase 1-2. Phase 3 requires fully on-premises container registry with image signing, replication, and vulnerability scanning capabilities.

### Decision

**Use Azure Container Registry (Phase 1-2) → Harbor (Phase 3).**

### Alternatives Considered

**Option 1: Harbor**
: Open-source CNCF registry with enterprise features.

- ✅ **Pros**: Enterprise features (RBAC, replication, signing, scanning), excellent UI, Kubernetes-native, Notary integration
- ❌ **Cons**: Requires PostgreSQL backend, operational complexity for HA

**Option 2: GitLab Container Registry**
: Integrated container registry with GitLab.

- ✅ **Pros**: Integrated with CI/CD pipeline, single platform, simple management
- ❌ **Cons**: Tightly coupled to GitLab (less flexible), smaller feature set than Harbor

**Option 3: Docker Distribution (Open Source Registry)**
: Lightweight Docker registry.

- ✅ **Pros**: Minimal resource requirements, simple deployment
- ❌ **Cons**: No UI, no vulnerability scanning, no RBAC, no signing

### Rationale

Harbor provides the enterprise features Contoso requires (vulnerability scanning via Trivy, image signing via Notary, RBAC, replication) while remaining fully open-source. The excellent web UI simplifies operations vs. command-line-only alternatives. Harbor's CNCF graduated status indicates maturity and community support.

### Consequences

**Positive**
: Image vulnerability scanning caught 3 critical CVEs during Phase 3 migration (images blocked from production). Image signing enforcement via admission controller prevented unsigned images from deploying. Harbor replication to DR site ensures image availability during disasters. Excellent UI reduced operational burden vs. command-line registry tools.

**Negative**  
: PostgreSQL backend required for Harbor (additional operational component). Initial image promotion from ACR to Harbor took 8 hours (60 GB of images). Harbor upgrade procedures require careful sequencing (database migrations, UI downtime).

**Mitigation**
: PostgreSQL deployed with Zalando Postgres Operator (automated backups, HA). Implemented image promotion automation (Azure CLI + Harbor API scripts). Documented Harbor upgrade runbook with rollback procedures.

**Related Decisions**: ADR-001 (Kubernetes as Harbor host), ADR-009 (CI/CD pipeline integration)

---

## ADR-009: CI/CD Pipeline Platform

**Status**: Accepted  
**Date**: 2023-06-01  
**Deciders**: DevOps Team, Development Team

### Context

GitHub Actions provided CI/CD automation in Phase 1-2 with seamless Azure integration. Phase 3 requires fully on-premises CI/CD pipeline for builds, tests, and deployments without cloud dependencies.

### Decision

**Use GitHub Actions (Phase 1-2) → GitLab Community Edition (Phase 3).**

### Alternatives Considered

**Option 1: GitLab Community Edition (Self-Hosted)**
: Open-source DevOps platform with integrated CI/CD.

- ✅ **Pros**: All-in-one platform (Git + CI/CD), excellent Kubernetes integration, LDAP/AD authentication, Auto DevOps features
- ❌ **Cons**: Heavier resource requirements than Jenkins, migration effort from GitHub

**Option 2: Jenkins**
: Traditional CI/CD automation server.

- ✅ **Pros**: Most mature CI/CD platform, enormous plugin ecosystem, highly customizable
- ❌ **Cons**: Dated UI, plugin maintenance burden, less Kubernetes-native than GitLab

**Option 3: Tekton (Kubernetes-Native CI/CD)**
: Cloud-native CI/CD built on Kubernetes primitives.

- ✅ **Pros**: Kubernetes-native, pipelines as CRDs, lightweight
- ❌ **Cons**: Requires separate Git repository (no integrated VCS), immature UI, steep learning curve

### Rationale

GitLab provides the most complete DevOps platform, integrating source control and CI/CD in a single tool. The integrated experience simplifies operations vs. separate Git + Jenkins. GitLab's Kubernetes-native CI/CD runners align with Contoso's orchestration strategy. LDAP authentication integrates seamlessly with AD DS.

### Consequences

**Positive**
: Single platform for Git repositories and CI/CD simplified operations (no Jenkins maintenance). GitLab Auto DevOps accelerated pipeline creation for new projects. Kubernetes executor runners provided consistent build environment. Git repository migration completed in single weekend (minimal disruption).

**Negative**  
: Pipeline syntax migration from GitHub Actions to GitLab CI required effort (~40 hours for 15 pipelines). GitLab CE resource requirements higher than GitHub Actions (8 vCPU, 32 GB RAM vs. zero operational overhead). Initial runner configuration issues caused failed builds (misconfigured image pull secrets).

**Mitigation**
: Created GitLab pipeline templates for common patterns (backend API, workers, frontend). Documented migration guide for development teams. Allocated dedicated VMs for GitLab runners (isolated from application workloads).

**Related Decisions**: ADR-008 (Harbor integration for image publishing), ADR-001 (Kubernetes deployment targets)

---

## ADR-010: Network Architecture

**Status**: Accepted  
**Date**: 2023-02-20  
**Deciders**: Network Team, Security Team, Platform Architecture Team

### Context

Network architecture must support application workloads across three phases with different connectivity requirements: Azure (Phase 1), hybrid cloud-to-on-premises (Phase 2), fully disconnected (Phase 3). Security zones must isolate customer-facing, internal, and management traffic.

### Decision

**Use hub-spoke topology in Azure (Phase 1), ExpressRoute for hybrid connectivity (Phase 2), and isolated network zones for disconnected operation (Phase 3).**

### Alternatives Considered

**Option 1: Flat Network (Single Subnet)**
: All components in single network segment.

- ✅ **Pros**: Simplest configuration, no routing complexity, lowest latency
- ❌ **Cons**: No security segmentation, blast radius for security incidents, fails compliance requirements

**Option 2: Three-Tier Architecture (DMZ, Application, Data)**
: Traditional enterprise network design with security zones.

- ✅ **Pros**: Strong security isolation, clear trust boundaries, well-understood model
- ❌ **Cons**: Kubernetes workloads don't map cleanly to tiers (pods communicate across tiers), complex firewall rules

**Option 3: Kubernetes Network Policies (Micro-Segmentation)**
: Leverage Kubernetes-native network policies for pod-level isolation.

- ✅ **Pros**: Kubernetes-native, fine-grained control, dynamic policy updates
- ❌ **Cons**: Doesn't isolate infrastructure components (domain controllers, monitoring), complex policy debugging

### Rationale

The hybrid approach (VLAN-based zones + Kubernetes network policies) provides defense-in-depth. VLAN segmentation isolates infrastructure components (domain controllers, ADFS, monitoring) from Kubernetes workloads. Within Kubernetes, network policies enforce pod-level segmentation (frontend → backend → database flows). This model works consistently across all three phases.

### Consequences

**Positive**
: Security zones enforced via Azure NSGs (Phase 1), VLAN ACLs (Phase 2-3), and Kubernetes network policies (all phases). Achieved zero lateral movement during red team penetration test. Clear network diagrams simplified troubleshooting.

**Negative**  
: Network policy debugging challenging (logs scattered across components). ExpressRoute outage in Phase 2 caused cascading failures (identity, monitoring). Initial network policy misconfiguration blocked legitimate traffic (workers → database).

**Mitigation**
: Implemented Cilium Hubble for network policy observability (visualize allowed/denied flows). Cached Azure AD tokens for ExpressRoute outage resilience. Network policy changes require peer review and smoke tests before production deployment.

**Related Decisions**: ADR-005 (ADFS network placement), ADR-006 (Monitoring traffic flows)

---

## Cross-Cutting Decision Themes

Several themes emerge across these ADRs:

!!! success "Portability Over Convenience"
    Contoso consistently chose portable solutions (Kubernetes, RabbitMQ, MinIO) over Azure-specific services (App Service, Service Bus, Blob Storage) even when Azure services offered better integration. This prioritization enabled the Phase 1 → Phase 2 → Phase 3 migration path.

!!! warning "Operational Complexity Trade-Off"
    Each phase increased operational complexity: Phase 1 (minimal ops, Azure-managed) → Phase 2 (hybrid ops, some on-premises) → Phase 3 (full ops, all on-premises). The trade-off was deliberate — sovereignty requires operational investment.

!!! info "Open Source Preference"
    Phase 3 exclusively uses open-source tooling (RKE2, RabbitMQ, MinIO, Harbor, GitLab CE, Prometheus, Grafana). This decision reduces vendor lock-in and licensing costs but increases operational burden (no commercial support contracts).

## Decisions That Would Change (Lessons for Greenfield)

If starting from scratch, Contoso would make different decisions:

| Decision | Original Choice | Greenfield Alternative | Reason |
|----------|----------------|------------------------|--------|
| **Kubernetes Distro** | AKS → AKS Hybrid → RKE2 | Start with RKE2 on-premises | Avoid AKS migration cost, optimize for disconnected from day one |
| **Database** | Azure SQL → Arc SQL MI → SQL Server VMs | Start with SQL Server on VMs | Simpler migration path, no Arc licensing cost |
| **Identity** | Azure AD → ADFS | Start with ADFS or Keycloak | Avoid large identity migration effort |
| **Monitoring** | Azure Monitor → PGLJ Stack | Start with PGLJ Stack | Avoid instrumentation rewrite, consistent observability |

**However**: The phased approach was essential for risk management. Greenfield disconnected systems are rare — most organizations start in cloud and migrate outward through the continuum.

## References

- [Architecture Decision Records](https://adr.github.io/)
- [Azure Architecture Center — Design Principles](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/)
- [CNCF Graduated Projects](https://www.cncf.io/projects/)
- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

---

> **Next:** [Lessons Learned →](06-lessons-learned.md)
