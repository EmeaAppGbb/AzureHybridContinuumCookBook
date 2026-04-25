# Phase 2: Hybrid Connected

!!! abstract "Chapter Summary"
    Phase 2 represents Contoso Insurance's transition from Azure public cloud to Azure Local infrastructure while maintaining connectivity to Azure for management, identity, and monitoring. This hybrid connected model reduces costs and improves data sovereignty while preserving Azure's operational tools. This chapter details the migration planning, architecture changes, and operational implications of the hybrid transition.

## Migration Planning & Timeline

Contoso's CTO chartered a 6-month migration project with three key objectives:

1. **Migrate compute and data workloads** from Azure PaaS to Azure Local infrastructure  
2. **Maintain Azure connectivity** for identity, monitoring, and management services
3. **Achieve zero data loss and <4 hours downtime** during the cutover

### Project Phases

| Phase | Duration | Key Activities | Success Criteria |
|-------|----------|----------------|------------------|
| **Planning & Design** | 6 weeks | Architecture design, Azure Local sizing, procurement, dependency mapping | Approved architecture, hardware ordered |
| **Azure Local Setup** | 4 weeks | Rack installation, Azure Local deployment, Arc registration, network configuration | Azure Local cluster operational, Arc-connected |
| **Pilot Migration** | 4 weeks | Migrate dev/test environment, validate functionality, performance baseline | Dev/test environment fully operational |
| **Data Migration** | 6 weeks | Database migration, document migration, queue migration (parallel with pilot) | Data synchronized, validation passed |
| **Production Cutover** | 2 weeks | Blue/green cutover, DNS switchover, fallback planning, post-migration validation | Production on Azure Local, <4hr downtime |
| **Optimization & Closeout** | 4 weeks | Performance tuning, cost validation, documentation, lessons learned | Performance targets met, project closed |

!!! success "Migration Completed Q3 2023"
    Contoso successfully completed the Phase 2 migration in September 2023, achieving 3.5 hours of total downtime (during a planned Saturday maintenance window). Database migration was the critical path. Zero data loss confirmed via checksum validation.

## Architecture Overview — Hybrid Connected

Phase 2 architecture runs all application workloads on Azure Local while maintaining ExpressRoute connectivity to Azure for select services.

### Component Mapping — Hybrid Architecture

| Application Component | Phase 1 (Azure PaaS) | Phase 2 (Hybrid Connected) |
|-----------------------|----------------------|----------------------------|
| **Frontend (React SPA)** | AKS (Azure cloud) | AKS on Azure Local |
| **API Backend (.NET 8)** | AKS (Azure cloud) | AKS on Azure Local |
| **Background Workers (.NET 8)** | AKS (Azure cloud) | AKS on Azure Local |
| **Database (SQL Server)** | Azure SQL Database | Arc-enabled SQL Managed Instance (Azure Local) |
| **File Storage (Objects)** | Azure Blob Storage | MinIO on Azure Local / Azure Local Storage Volumes |
| **Message Queue** | Azure Service Bus | RabbitMQ on AKS (Azure Local) |
| **Identity (Customers)** | Azure AD B2C | Azure AD B2C (still cloud, via ExpressRoute) |
| **Identity (Employees)** | Microsoft Entra ID | Microsoft Entra ID (still cloud, via ExpressRoute) |
| **Secrets Management** | Azure Key Vault | Azure Key Vault (still cloud, via ExpressRoute) |
| **Container Registry** | Azure Container Registry | Azure Container Registry (still cloud) + Harbor (local mirror) |
| **Monitoring & Logging** | Azure Monitor + App Insights | Azure Monitor + App Insights (still cloud, via Arc) |
| **CI/CD Pipeline** | GitHub Actions → AKS (Azure) | GitHub Actions → AKS (Azure Local) |

!!! info "What Stayed in the Cloud"
    Phase 2 maintains cloud dependencies for identity (Azure AD B2C / Entra ID), monitoring (Azure Monitor via Arc), secrets (Azure Key Vault), and management (Azure Portal via Arc). These dependencies enable hybrid management but require continuous ExpressRoute connectivity.

### Azure Local Infrastructure

Contoso procured a 4-node Azure Local cluster for the production environment:

**Hardware Specifications** (per node)
: Dell PowerEdge R750 servers — 2x Intel Xeon Gold 6338 (64 cores total), 512 GB RAM, 8x 1.92 TB NVMe SSDs (cluster storage pool), 2x 25 GbE NICs (RDMA-capable), 2x 1 GbE NICs (management).

**Cluster Configuration**
: 4-node cluster providing ~256 cores, 2 TB RAM, 30 TB usable storage (after RAID and overhead). Storage Spaces Direct with 3-way mirror for resiliency. Supports 2-node failure tolerance.

**Networking**  
: Converged network design — storage (SMB Direct over RDMA), VM traffic, and management traffic share physical NICs with VLAN separation. SDN (Software Defined Networking) configured for tenant isolation.

**Azure Arc Integration**  
: Cluster registered with Azure Arc immediately after deployment. Enables Azure Portal visibility, Azure Monitor integration, Azure Policy enforcement, and cloud-based management.

### AKS on Azure Local

Contoso deployed AKS on Azure Local to maintain Kubernetes orchestration consistency:

**Kubernetes Version**: 1.27 (upgraded from 1.28 in Azure AKS)  
**Cluster Configuration**: 3-node control plane (HA), 12 worker nodes (Linux VMs on Azure Local)  
**Node Specifications**: Each worker node is a Linux VM with 8 vCPU, 16 GB RAM, 200 GB disk  
**Networking**: Calico CNI with network policies, MetalLB for LoadBalancer services  
**Storage**: Azure Local CSI driver provisioning PersistentVolumes from cluster storage pool

### Application Deployments — Migration Details

#### Frontend Migration

The React SPA frontend requires minimal changes — container images are identical:

**Migration Steps**
1. Promote frontend image from Azure Container Registry to Harbor (local registry)
2. Update Helm chart to reference Harbor image repository  
3. Deploy to AKS on Azure Local using same Helm charts
4. Expose via NGINX Ingress Controller with MetalLB LoadBalancer IP
5. Update DNS records to point to new LoadBalancer IP (A record: `customer.contosoinsurance.eu`)
6. Validate all pages load correctly, API calls succeed

**Configuration Changes**  
: Environment variable updates — API endpoint URL, authentication authority URL (still Azure AD B2C), Application Insights connection string (still Azure).

#### API Backend Migration

The .NET 8 API backend requires connection string updates but no code changes:

**Migration Steps**
1. Promote API image from ACR to Harbor
2. Update Helm chart environment variables:
   - Database connection string → Arc-enabled SQL MI endpoint
   - Blob Storage connection string → MinIO endpoint  
   - Service Bus connection string → RabbitMQ connection
   - Key Vault URI → still Azure Key Vault (via ExpressRoute)
3. Deploy to AKS on Azure Local  
4. Run smoke tests (health endpoints, database connectivity, queue connectivity)
5. Run integration tests (claim submission end-to-end flow)

**Performance Validation**  
: Post-migration API response time p95 improved from 420ms to 280ms due to local database latency reduction (Azure SQL: ~8ms, Arc SQL MI: ~2ms).

#### Background Workers Migration

Workers migrate similarly to the API backend:

**Migration Steps**
1. Promote worker images from ACR to Harbor  
2. Update connection strings for SQL MI, MinIO, RabbitMQ
3. Deploy to AKS on Azure Local
4. Validate message consumption (workers process messages from RabbitMQ queues)
5. End-to-end test: Submit claim → document uploaded → worker processes → OCR results stored

**Scaling Changes**  
: Workers now scale based on RabbitMQ queue depth (using KEDA with RabbitMQ scaler) instead of Azure Service Bus queue depth.

### Arc-Enabled SQL Managed Instance

The database migration was the most complex component of Phase 2.

**Deployment Configuration**
: Arc-enabled SQL Managed Instance (Business Critical tier equivalent) — 8 vCores, 32 GB RAM, 500 GB storage. Deployed as a StatefulSet on AKS on Azure Local. Uses 3-replica Always On Availability Group for high availability.

**Data Migration Approach — Minimizing Downtime**

Contoso used a hybrid migration strategy combining backup/restore with log shipping:

1. **Baseline Migration** (T-7 days): Full backup of Azure SQL Database → restore to Arc SQL MI, application continues running on Azure
2. **Differential Sync** (T-3 days): Transaction log backup → restore to Arc SQL MI (no recovery), application still on Azure  
3. **Final Sync** (T-Day, 10pm): Final transaction log backup → restore to Arc SQL MI (with recovery), application downtime begins
4. **Validation** (T-Day, 11pm): Checksum validation, row count comparison, test queries, smoke tests
5. **Cutover** (T-Day, 11:30pm): Update API connection strings, restart API pods, validate functionality
6. **Downtime End** (T-Day, 1:30am): DNS updated, traffic flowing to Azure Local, 3.5 hours total downtime

!!! danger "Database Migration Risk Mitigation"
    Contoso maintained Azure SQL Database as a hot standby for 72 hours post-cutover. If critical issues emerged, DNS could be reverted to Azure-hosted API within 15 minutes. This rollback plan was not needed — migration succeeded.

**Performance Comparison**

| Metric | Azure SQL Database | Arc SQL MI (Azure Local) |
|--------|-------------------|--------------------------|
| **Latency (avg)** | 8ms | 2ms |
| **Throughput** | 500 TPS sustained | 550 TPS sustained |
| **Query Performance** | Baseline | 5-10% faster (local NVMe) |
| **Backup Duration** | 15 min (managed) | 25 min (Velero) |

### File Storage Migration — Azure Blob to MinIO

Document storage migrated from Azure Blob Storage to MinIO (S3-compatible object storage) running on Azure Local.

**MinIO Deployment**
: MinIO deployed as a StatefulSet on AKS on Azure Local with 4 replicas (distributed mode). Each replica uses 2 TB PersistentVolumes from Azure Local storage pool. Provides S3 API compatibility.

**Data Migration Strategy**
: Azure Blob Storage and MinIO coexisted during migration using a phased approach:

1. **New uploads go to MinIO** (T-14 days): API updated to write new documents to MinIO, reads check MinIO first then fallback to Blob Storage
2. **Background migration** (T-14 to T-Day): Custom .NET worker iterates through Blob Storage containers, copies objects to MinIO, validates checksums, marks as migrated in database
3. **Cutover** (T-Day): Remove Blob Storage fallback code, API reads exclusively from MinIO

**Migration Performance**  
: 8 TB of documents migrated over 14 days using 8 parallel worker threads with throttling (max 100 Mbps to avoid impacting production). Average transfer rate: 65 Mbps sustained.

!!! warning "S3 API Compatibility"
    MinIO provides excellent S3 API compatibility. Contoso used the Azure Blob Storage SDK's S3-compatible endpoint feature, requiring only connection string changes (no code changes). Presigned URL generation, multipart uploads, and lifecycle policies all worked identically.

### Message Queue Migration — Azure Service Bus to RabbitMQ

Azure Service Bus migrated to RabbitMQ running on AKS on Azure Local.

**RabbitMQ Deployment**
: RabbitMQ deployed using the RabbitMQ Cluster Operator for Kubernetes. 3-node cluster with quorum queues for high availability. Each node uses 2 vCPU, 4 GB RAM, 50 GB PersistentVolume for queue storage.

**Queue Configuration** (matching Azure Service Bus semantics)
: Queues: `document-processing`, `premium-calculation`, `notification-sender`. All configured with durable queues, at-least-once delivery, dead-letter exchanges for failed messages.

**Application Changes**  
: Contoso abstracted queue operations behind interfaces (`IMessagePublisher`, `IMessageConsumer`). Created RabbitMQ implementations using MassTransit library. API and workers updated to use RabbitMQ implementations via dependency injection.

**Code Changes Example**

```csharp
// Before (Azure Service Bus)
services.AddAzureClients(builder => {
    builder.AddServiceBusClient(configuration["ServiceBus:ConnectionString"]);
});
services.AddScoped<IMessagePublisher, ServiceBusMessagePublisher>();

// After (RabbitMQ)
services.AddMassTransit(x => {
    x.UsingRabbitMq((context, cfg) => {
        cfg.Host(configuration["RabbitMQ:Hostname"], "/", h => {
            h.Username(configuration["RabbitMQ:Username"]);
            h.Password(configuration["RabbitMQ:Password"]);
        });
    });
});
services.AddScoped<IMessagePublisher, RabbitMQMessagePublisher>();
```

**Migration Cutover**  
: Dual-write pattern used during migration — API published messages to both Azure Service Bus and RabbitMQ for 24 hours. Workers consumed from RabbitMQ only (Service Bus messages drained during cutover window).

### Identity — Still Azure AD (Hybrid Model)

Phase 2 maintains cloud dependencies for identity:

**Customer Identity** — Azure AD B2C  
: No changes. Customers authenticate via Azure AD B2C (cloud service). API validates JWT tokens issued by B2C. Requires ExpressRoute connectivity for token validation (public key retrieval from B2C OpenID Connect metadata endpoint).

**Employee Identity** — Microsoft Entra ID
: No changes. Insurance agents authenticate via corporate Entra ID with conditional access policies. AKS workload identities use Entra ID for Azure service authentication (Arc SQL MI, Key Vault).

!!! info "Why Keep Identity in the Cloud?"
    Contoso chose to maintain Azure AD / Entra ID in Phase 2 for operational simplicity and security. Migrating to on-premises AD DS + ADFS requires significant application changes, certificate management, and introduces identity infrastructure operational burden. Phase 2 prioritizes workload migration; identity migration deferred to Phase 3.

### Networking — ExpressRoute Connectivity

Contoso deployed Azure ExpressRoute to connect Azure Local infrastructure to Azure:

**ExpressRoute Circuit**  
: 1 Gbps ExpressRoute circuit via local telco provider. Private peering to Azure hub VNet. BGP routing exchanges routes between on-premises (Azure Local) and Azure.

**Connectivity Requirements**
: Azure AD token validation, Azure Monitor telemetry upload, Azure Arc control plane communication, Azure Key Vault secret retrieval, Azure Container Registry image pulls (until Harbor fully populated).

**Latency Profile**  
: On-premises to Azure: ~15ms (single-region connectivity). Acceptable for infrequent API calls (token validation cached, secrets cached, monitoring batched).

**Failover Planning**  
: If ExpressRoute fails, API can continue operating with cached tokens (1-hour validity) and cached secrets. New customer logins fail (Azure AD B2C unreachable). Agents can use cached credentials (15-minute grace period). Alert triggers for ExpressRoute outage.

### Monitoring & Management — Azure Arc Integration

Azure Local cluster and AKS workloads remain fully visible in Azure Portal via Arc:

**Azure Arc for Azure Local**  
: Cluster registered with Azure Arc immediately after deployment. Azure Portal shows cluster health, resource utilization, VM inventory, storage capacity.

**Azure Arc for Kubernetes**  
: AKS cluster (on Azure Local) registered with Azure Arc. Azure Portal shows namespace inventory, pod status, workload metrics, deployments.

**Azure Monitor Integration**  
: Log Analytics agent deployed to all Azure Local nodes and AKS pods. Logs and metrics uploaded to Azure Log Analytics workspace (same workspace as Phase 1). Container Insights provides pod-level monitoring.

**Application Insights**  
: No changes. Frontend, API, and workers continue sending telemetry to Application Insights. Distributed tracing spans hybrid boundary (frontend on-premises, identity validation in cloud).

!!! success "Unified Monitoring Experience"
    Operators see no difference in Azure Portal between Phase 1 (full cloud) and Phase 2 (hybrid). All dashboards, alerts, and workbooks continue functioning. Azure Arc successfully projects on-premises resources into Azure's control plane.

## Cost Profile — Phase 2 Hybrid

Monthly costs reduced significantly in Phase 2 compared to Phase 1:

| Cost Category | Phase 1 (Azure) | Phase 2 (Hybrid) | Savings |
|---------------|-----------------|------------------|---------|
| **Compute (AKS Nodes)** | €12,000 | €0 (on-premises) | €12,000 |
| **Database (SQL)** | €8,500 | €0 (on-premises) | €8,500 |
| **Storage (Blob/MinIO)** | €1,200 | €0 (on-premises) | €1,200 |
| **Message Queue** | €800 | €0 (on-premises) | €800 |
| **Azure Front Door** | €6,500 | €0 (local ingress) | €6,500 |
| **Azure Arc (Azure Local + AKS)** | €0 | €200 | -€200 |
| **ExpressRoute (1 Gbps)** | €0 | €1,500 | -€1,500 |
| **Azure Monitor (Log Analytics)** | €3,200 | €2,800 (reduced ingestion) | €400 |
| **Azure AD B2C** | €200 | €200 | €0 |
| **Azure Key Vault** | €400 | €400 | €0 |
| **Azure Container Registry** | €600 | €300 (reduced usage) | €300 |
| **Support Plan** | €2,000 | €2,000 | €0 |
| **Data Egress** | €8,000 | €1,200 (monitoring only) | €6,800 |
| **Total Monthly** | **€45,000** | **€8,600** | **€36,400** |

**Azure Local Capital Expense**
: 4-node cluster hardware cost: €180,000. Annual support & maintenance: €25,000. Depreciation over 5 years: €36,000/year (€3,000/month).

**Total Cost of Ownership (Phase 2)**  
: Monthly operational cost (€8,600) + monthly depreciation (€3,000) = **€11,600/month**. Compared to Phase 1 (€45,000/month), Phase 2 achieves **74% cost reduction**.

!!! success "ROI Analysis"
    At €33,400/month savings, the €180,000 capital investment in Azure Local pays for itself in 5.4 months. Over 3 years, total savings exceed €1 million compared to remaining on Azure public cloud.

## Performance Comparison — Azure vs. Azure Local

Contoso measured performance before and after migration:

| Metric | Phase 1 (Azure) | Phase 2 (Hybrid) | Change |
|--------|----------------|------------------|--------|
| **API Latency (p50)** | 180ms | 120ms | -33% (improved) |
| **API Latency (p95)** | 420ms | 280ms | -33% (improved) |
| **Database Query Latency** | 8ms | 2ms | -75% (improved) |
| **Document Upload Time** | 2.5s (presigned URL) | 1.8s (local MinIO) | -28% (improved) |
| **Worker Processing Time** | 12s/document (avg) | 11s/document (avg) | -8% (improved) |
| **Page Load Time (p95)** | 1.8s | 1.4s | -22% (improved) |

!!! info "Why Performance Improved"
    Reduced network latency between application tiers (all on-premises vs. distributed across Azure regions), faster local NVMe storage vs. cloud storage, reduced data egress throttling, dedicated hardware (no "noisy neighbor" effects from multi-tenant cloud).

## Configuration Management Changes

### Helm Chart Updates

All Helm charts required environment-specific value files:

```yaml
# values-phase1-azure.yaml
database:
  host: "contosoinsurance.database.windows.net"
  type: "azure-sql"
storage:
  endpoint: "https://contosoclaimsstorage.blob.core.windows.net"
  type: "azure-blob"
queue:
  connectionString: "Endpoint=sb://contosoinsurance.servicebus.windows.net"
  type: "azure-servicebus"

# values-phase2-hybrid.yaml  
database:
  host: "sql-mi-contoso.azurelocal.local"
  type: "arc-sql-mi"
storage:
  endpoint: "http://minio-service.storage.svc.cluster.local:9000"
  type: "minio"
queue:
  connectionString: "amqp://rabbitmq-service.messaging.svc.cluster.local:5672"
  type: "rabbitmq"
```

### Secret Management

Azure Key Vault remains authoritative for secrets in Phase 2. Secrets synced to Kubernetes via External Secrets Operator:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: api-backend-secrets
spec:
  secretStoreRef:
    name: azure-keyvault-store
    kind: SecretStore
  target:
    name: api-backend-secrets
  data:
    - secretKey: DATABASE_PASSWORD
      remoteRef:
        key: sql-mi-admin-password
    - secretKey: RABBITMQ_PASSWORD
      remoteRef:
        key: rabbitmq-admin-password
```

Requires ExpressRoute connectivity for External Secrets Operator to reach Azure Key Vault.

## Testing & Validation

Contoso's validation plan ensured functional equivalence between Phase 1 and Phase 2:

### Functional Testing

- ✅ Customer can submit claim via portal  
- ✅ Documents upload successfully to MinIO
- ✅ Workers process uploaded documents (OCR)  
- ✅ Email notifications sent to customers
- ✅ Agents can view claims in dashboard
- ✅ Database queries return correct results  
- ✅ Reports generate successfully

### Performance Testing

- ✅ Load test: 10,000 concurrent users sustained for 1 hour  
- ✅ Latency targets: p95 API latency <500ms (achieved 280ms)
- ✅ Throughput: 500 TPS database writes sustained
- ✅ Worker processing: 5,000 documents/day processed successfully

### Disaster Recovery Testing

- ✅ Azure Local node failure: AKS pods rescheduled to healthy nodes within 60 seconds
- ✅ SQL MI failover: Availability Group failover completed in 15 seconds, zero data loss  
- ✅ RabbitMQ node failure: Quorum queue maintained, message processing continued
- ✅ ExpressRoute failure: Cached tokens/secrets sustained operations for 1 hour, alerts triggered

## Phase 2 Summary — Hybrid Success

Phase 2 successfully migrated Contoso Insurance Platform to Azure Local with hybrid connectivity:

✅ **Cost reduction** — 74% monthly cost savings (€45,000 → €11,600)  
✅ **Performance improvement** — 33% API latency reduction, 75% database latency reduction  
✅ **Data sovereignty** — Customer data physically hosted on-premises in EU  
✅ **Operational continuity** — Azure Portal, Azure Monitor, Azure AD maintained  
✅ **High availability** — 99.95% uptime maintained post-migration  
❌ **Cloud dependency remains** — Requires ExpressRoute for identity, monitoring, management  
❌ **Complexity increased** — Hybrid architecture requires managing both cloud and on-premises

Phase 2 delivers significant cost and sovereignty benefits but maintains dependencies on Azure services. Phase 3 eliminates these dependencies for full disconnected operation.

## References

- [AKS on Azure Local](https://learn.microsoft.com/en-us/azure/aks/hybrid/)
- [Azure Arc-enabled SQL Managed Instance](https://learn.microsoft.com/en-us/azure/azure-arc/data/managed-instance-overview)
- [Azure Arc-enabled Data Services](https://learn.microsoft.com/en-us/azure/azure-arc/data/overview)
- [Azure Local Storage](https://learn.microsoft.com/en-us/azure/azure-local/concepts/storage)
- [RabbitMQ Cluster Operator](https://www.rabbitmq.com/kubernetes/operator/operator-overview)
- [MinIO Object Storage](https://min.io/docs/)
- [Azure ExpressRoute](https://learn.microsoft.com/en-us/azure/expressroute/)
- [Azure Arc Overview](https://learn.microsoft.com/en-us/azure/azure-arc/overview)

---

> **Next:** [Phase 3: Disconnected →](04-phase3-disconnected.md)
