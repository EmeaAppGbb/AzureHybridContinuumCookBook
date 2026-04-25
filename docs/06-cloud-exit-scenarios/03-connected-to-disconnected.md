# Connected → Disconnected Azure Local

## Introduction

Transitioning from connected Azure Local to a fully disconnected, air-gapped deployment represents the final and most complex stage of cloud exit. Every dependency on Azure cloud services—identity, management, monitoring, container registries, secrets management, and DNS—must be severed and replaced with self-hosted alternatives. This chapter guides you through the systematic process of achieving true independence from cloud infrastructure.

The disconnection journey requires meticulous planning because there's no safety net once connectivity is removed. Unlike the connected-to-Azure Local migration where Azure management remains accessible, disconnected mode demands complete self-sufficiency. Organizations typically pursue this path for stringent regulatory requirements, data sovereignty mandates, defense and intelligence use cases, or operation in environments lacking reliable internet connectivity.

!!! danger "Point of No Return"
    Once disconnected, re-establishing Azure connectivity requires significant reconfiguration. Ensure all local infrastructure is stable, tested, and operational before severing cloud connections. Plan for a minimum 4-6 week validation period in isolated mode before true disconnection.

## The Disconnection Checklist

Before disconnecting, every Azure cloud dependency must be identified and replaced. This checklist provides a comprehensive inventory of services to address:

### Identity and Access Management

| Azure Service | Disconnected Replacement | Migration Complexity | Notes |
|--------------|--------------------------|---------------------|--------|
| **Azure AD (Entra ID)** | Active Directory Domain Services (AD DS) | High | User accounts, groups, authentication infrastructure |
| **Azure AD B2C** | Custom identity solution (Keycloak, IdentityServer) | Very High | Requires application code changes |
| **Managed Identities** | Service accounts with certificate-based auth | Medium | Reconfigure all services using managed identities |
| **Azure RBAC** | Local RBAC (Kubernetes RBAC, AD groups) | Medium | Role assignments must be recreated locally |

### Management and Orchestration

| Azure Service | Disconnected Replacement | Migration Complexity | Notes |
|--------------|--------------------------|---------------------|--------|
| **Azure Portal** | Local management tools (kubectl, PowerShell, Windows Admin Center) | Medium | Train teams on new tooling |
| **Azure Arc** | Native Kubernetes management | Low | Disconnect Arc agents |
| **Azure Resource Manager** | Infrastructure-as-Code (Terraform, Ansible) | Medium | Declarative infrastructure management |
| **Azure Policy** | Open Policy Agent (OPA) / Gatekeeper | Medium | Policy definitions must be converted |

### Monitoring and Observability

| Azure Service | Disconnected Replacement | Migration Complexity | Notes |
|--------------|--------------------------|---------------------|--------|
| **Azure Monitor** | Prometheus + Grafana + Loki | Medium | Metrics, dashboards, alerting |
| **Application Insights** | Jaeger + Zipkin (distributed tracing) | Medium | Application instrumentation changes |
| **Log Analytics** | Elasticsearch / Loki + Grafana | Medium | Log aggregation and search |
| **Alerts** | Prometheus Alertmanager | Low | Alert rules must be recreated |

### Security and Compliance

| Azure Service | Disconnected Replacement | Migration Complexity | Notes |
|--------------|--------------------------|---------------------|--------|
| **Azure Key Vault** | HashiCorp Vault | Medium | Secrets, certificates, keys migration |
| **Defender for Cloud** | Falco, Trivy, local vulnerability scanning | High | Security posture management |
| **Azure Firewall** | pfSense, FortiGate, or native OS firewalls | Low | Network security policies |
| **DDoS Protection** | On-premises DDoS appliances | Low | Typically not needed in disconnected environments |

### Container and Application Services

| Azure Service | Disconnected Replacement | Migration Complexity | Notes |
|--------------|--------------------------|---------------------|--------|
| **Azure Container Registry** | Harbor | Low | Mirror all images before disconnection |
| **Azure Service Bus** | RabbitMQ / NATS | Medium | Message queue migration |
| **Azure Event Hubs** | Apache Kafka | Medium | Event streaming platform |
| **Azure Functions** | KEDA on Kubernetes / Knative | High | Function runtime migration |

### Networking and DNS

| Azure Service | Disconnected Replacement | Migration Complexity | Notes |
|--------------|--------------------------|---------------------|--------|
| **Azure DNS** | BIND / Windows DNS Server | Low | Zone transfers and record migration |
| **Azure Load Balancer** | HAProxy / NGINX / MetalLB (Kubernetes) | Low | Already handled in connected mode |
| **Azure VPN Gateway** | pfSense, FortiGate, or Linux-based VPN | Low | Site-to-site VPN for branch connectivity only |

### Data Services

| Azure Service | Disconnected Replacement | Migration Complexity | Notes |
|--------------|--------------------------|---------------------|--------|
| **Azure SQL Database** | SQL Server on VMs/containers | Low | Already migrated in connected phase |
| **Cosmos DB** | MongoDB / PostgreSQL cluster | Medium | Already handled if migrated previously |
| **Azure Storage** | MinIO / Ceph | Low | Object storage migration |

## Infrastructure Preparation for Disconnected Mode

### Local Identity Infrastructure Deployment

**Active Directory Domain Services Setup:**

```powershell
# Deploy AD DS on Windows Server
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Promote server to domain controller
Install-ADDSForest `
  -DomainName "corp.azurelocal.local" `
  -DomainNetbiosName "CORP" `
  -ForestMode "WinThreshold" `
  -DomainMode "WinThreshold" `
  -InstallDns:$true `
  -SafeModeAdministratorPassword (ConvertTo-SecureString "ComplexP@ssw0rd!" -AsPlainText -Force) `
  -Force:$true
```

**Synchronize Users from Azure AD Before Disconnection:**

```powershell
# Install Azure AD Connect for final sync
# Configure writeback if needed
# Perform final synchronization run
Start-ADSyncSyncCycle -PolicyType Delta

# Export user list for validation
Get-ADUser -Filter * | Export-Csv -Path "C:\Migration\AD-Users.csv"
```

**DNS Configuration:**

```powershell
# Create forward lookup zone
Add-DnsServerPrimaryZone -Name "azurelocal.local" -ZoneFile "azurelocal.local.dns"

# Add A records for key services
Add-DnsServerResourceRecordA -Name "harbor" -ZoneName "azurelocal.local" -IPv4Address "192.168.10.50"
Add-DnsServerResourceRecordA -Name "vault" -ZoneName "azurelocal.local" -IPv4Address "192.168.10.51"
Add-DnsServerResourceRecordA -Name "prometheus" -ZoneName "azurelocal.local" -IPv4Address "192.168.10.52"
Add-DnsServerResourceRecordA -Name "grafana" -ZoneName "azurelocal.local" -IPv4Address "192.168.10.53"

# Configure forwarders for external resolution (if any external connectivity remains)
Add-DnsServerForwarder -IPAddress "8.8.8.8"
```

### Local Monitoring Stack Deployment

**Deploy Prometheus for Metrics:**

```yaml
# prometheus-values.yaml for Helm deployment
apiVersion: v1
kind: Namespace
metadata:
  name: monitoring
---
# Deploy using Helm
# helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
# helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring -f prometheus-values.yaml

alertmanager:
  enabled: true
  config:
    route:
      receiver: 'team-emails'
      group_by: ['alertname', 'cluster']
      group_wait: 30s
      group_interval: 5m
      repeat_interval: 12h
    receivers:
    - name: 'team-emails'
      email_configs:
      - to: 'ops-team@company.local'
        from: 'alertmanager@azurelocal.local'
        smarthost: 'smtp.company.local:25'

prometheus:
  prometheusSpec:
    retention: 30d
    storageSpec:
      volumeClaimTemplate:
        spec:
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 100Gi

grafana:
  adminPassword: "admin-changeme"
  ingress:
    enabled: true
    hosts:
      - grafana.azurelocal.local
  persistence:
    enabled: true
    size: 10Gi
```

**Deploy Loki for Log Aggregation:**

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm install loki grafana/loki-stack -n monitoring \
  --set loki.persistence.enabled=true \
  --set loki.persistence.size=50Gi \
  --set promtail.enabled=true
```

**Configure Applications to Send Logs and Metrics:**

```yaml
# Update application deployment to include Prometheus annotations
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-api
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "8080"
    prometheus.io/path: "/metrics"
spec:
  template:
    spec:
      containers:
      - name: api
        image: harbor.azurelocal.local/app/backend:v2.1
        env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: "http://jaeger-collector.monitoring.svc.cluster.local:4317"
```

### Local Container Registry Setup

**Deploy Harbor Registry:**

```bash
# Add Harbor Helm repository
helm repo add harbor https://helm.goharbor.io

# Deploy Harbor with persistent storage
helm install harbor harbor/harbor -n harbor --create-namespace \
  --set expose.type=loadBalancer \
  --set expose.tls.enabled=true \
  --set externalURL=https://harbor.azurelocal.local \
  --set persistence.enabled=true \
  --set persistence.persistentVolumeClaim.registry.size=500Gi \
  --set persistence.persistentVolumeClaim.database.size=20Gi \
  --set harborAdminPassword="HarborAdmin123!"
```

**Mirror All Container Images from Azure Container Registry:**

```bash
# Authenticate to both registries
az acr login --name myazureacr
docker login harbor.azurelocal.local -u admin -p HarborAdmin123!

# Create image mirror script
#!/bin/bash

SOURCE_REGISTRY="myazureacr.azurecr.io"
TARGET_REGISTRY="harbor.azurelocal.local"

IMAGES=$(az acr repository list --name myazureacr --output tsv)

for IMAGE in $IMAGES; do
  TAGS=$(az acr repository show-tags --name myazureacr --repository $IMAGE --output tsv)
  
  for TAG in $TAGS; do
    echo "Mirroring $IMAGE:$TAG"
    docker pull $SOURCE_REGISTRY/$IMAGE:$TAG
    docker tag $SOURCE_REGISTRY/$IMAGE:$TAG $TARGET_REGISTRY/$IMAGE:$TAG
    docker push $TARGET_REGISTRY/$IMAGE:$TAG
  done
done
```

**Configure Kubernetes to Use Local Registry:**

```yaml
# Create image pull secret
kubectl create secret docker-registry harbor-registry \
  --docker-server=harbor.azurelocal.local \
  --docker-username=admin \
  --docker-password=HarborAdmin123! \
  --docker-email=admin@azurelocal.local \
  -n default

# Update deployments to reference local registry
spec:
  imagePullSecrets:
  - name: harbor-registry
  containers:
  - name: backend
    image: harbor.azurelocal.local/app/backend:v2.1 # Changed from ACR
```

### Local PKI and Certificate Infrastructure

**Deploy Private Certificate Authority:**

```powershell
# Install AD Certificate Services
Install-WindowsFeature -Name ADCS-Cert-Authority -IncludeManagementTools

# Configure CA
Install-AdcsCertificationAuthority -CAType EnterpriseRootCa `
  -CryptoProviderName "RSA#Microsoft Software Key Storage Provider" `
  -KeyLength 4096 `
  -HashAlgorithmName SHA256 `
  -ValidityPeriod Years `
  -ValidityPeriodUnits 10
```

**Issue Certificates for Internal Services:**

```bash
# Install cert-manager in Kubernetes for automated certificate management
helm repo add jetstack https://charts.jetstack.io
helm install cert-manager jetstack/cert-manager -n cert-manager --create-namespace \
  --set installCRDs=true

# Configure ClusterIssuer for internal CA
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: internal-ca-issuer
spec:
  ca:
    secretName: internal-ca-key-pair
```

**Generate certificates for services:**

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: harbor-tls
  namespace: harbor
spec:
  secretName: harbor-tls-secret
  issuerRef:
    name: internal-ca-issuer
    kind: ClusterIssuer
  dnsNames:
  - harbor.azurelocal.local
  - "*.harbor.azurelocal.local"
```

### Local Secrets Management

**Deploy HashiCorp Vault:**

```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
helm install vault hashicorp/vault -n vault --create-namespace \
  --set server.ha.enabled=true \
  --set server.ha.replicas=3 \
  --set ui.enabled=true \
  --set server.dataStorage.size=10Gi

# Initialize Vault
kubectl exec -it vault-0 -n vault -- vault operator init

# Unseal Vault on all replicas
kubectl exec -it vault-0 -n vault -- vault operator unseal <key-1>
kubectl exec -it vault-0 -n vault -- vault operator unseal <key-2>
kubectl exec -it vault-0 -n vault -- vault operator unseal <key-3>
```

**Migrate Secrets from Azure Key Vault:**

```bash
# Export secrets from Azure Key Vault before disconnection
az keyvault secret list --vault-name my-keyvault --query "[].name" -o tsv > secret-names.txt

# Download each secret
while read SECRET_NAME; do
  az keyvault secret show --vault-name my-keyvault --name $SECRET_NAME \
    --query "value" -o tsv > "secrets/${SECRET_NAME}.txt"
done < secret-names.txt

# Import into Vault
export VAULT_ADDR='http://vault.azurelocal.local:8200'
export VAULT_TOKEN='<root-token>'

while read SECRET_NAME; do
  vault kv put secret/$SECRET_NAME value=@secrets/${SECRET_NAME}.txt
done < secret-names.txt
```

**Configure Applications to Use Vault:**

```yaml
# Vault Agent Injector for Kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-api
spec:
  template:
    metadata:
      annotations:
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/role: "backend-role"
        vault.hashicorp.com/agent-inject-secret-db-password: "secret/data/database/password"
    spec:
      serviceAccountName: backend
      containers:
      - name: api
        image: harbor.azurelocal.local/app/backend:v2.1
```

### Local Backup and Disaster Recovery

**Deploy Backup Solution (Velero for Kubernetes):**

```bash
# Install Velero CLI
# Configure backup storage location (NFS, MinIO, or SAN)

velero install \
  --provider aws \
  --plugins velero/velero-plugin-for-aws:v1.7.0 \
  --bucket velero-backups \
  --secret-file ./credentials-velero \
  --use-volume-snapshots=true \
  --backup-location-config region=minio,s3ForcePathStyle="true",s3Url=http://minio.azurelocal.local:9000

# Create backup schedule
velero schedule create daily-backup --schedule="0 2 * * *"
```

**Database Backup Strategy:**

```sql
-- SQL Server automated backups to local storage
BACKUP DATABASE ProductionDB
TO DISK = '\\nas.azurelocal.local\sqlbackups\ProductionDB_Full.bak'
WITH COMPRESSION, CHECKSUM, STATS = 10;

-- Configure automated backup jobs via SQL Agent
```

## Application Changes Required

### Remove Azure SDK Dependencies

**Before (Azure-specific):**

```csharp
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Azure.Storage.Blobs;

// Using Managed Identity
var credential = new DefaultAzureCredential();
var secretClient = new SecretClient(new Uri("https://my-keyvault.vault.azure.net/"), credential);
var secret = await secretClient.GetSecretAsync("DatabasePassword");
```

**After (Disconnected-compatible):**

```csharp
using VaultSharp;
using VaultSharp.V1.AuthMethods.Token;
using VaultSharp.V1.AuthMethods;

// Using Vault with token authentication
var vaultUri = "http://vault.azurelocal.local:8200";
var authMethod = new TokenAuthMethodInfo(Environment.GetEnvironmentVariable("VAULT_TOKEN"));
var vaultClientSettings = new VaultClientSettings(vaultUri, authMethod);
var vaultClient = new VaultClient(vaultClientSettings);

var secret = await vaultClient.V1.Secrets.KeyValue.V2.ReadSecretAsync("database/password");
var password = secret.Data.Data["value"].ToString();
```

### Replace Azure PaaS Client Libraries

**Service Bus → RabbitMQ:**

```csharp
// Before: Azure Service Bus
using Azure.Messaging.ServiceBus;

ServiceBusClient client = new ServiceBusClient(connectionString);
ServiceBusSender sender = client.CreateSender(queueName);
await sender.SendMessageAsync(new ServiceBusMessage("Hello"));

// After: RabbitMQ with MassTransit
using MassTransit;

var busControl = Bus.Factory.CreateUsingRabbitMq(cfg =>
{
    cfg.Host("rabbitmq.azurelocal.local", "/", h =>
    {
        h.Username("admin");
        h.Password(vaultPassword);
    });
});

await busControl.Publish(new MessageContract { Text = "Hello" });
```

**Application Insights → OpenTelemetry:**

```csharp
// Before: Application Insights
using Microsoft.ApplicationInsights;

TelemetryClient telemetryClient = new TelemetryClient();
telemetryClient.TrackEvent("OrderPlaced");

// After: OpenTelemetry to Jaeger/Prometheus
using OpenTelemetry;
using OpenTelemetry.Trace;

var tracerProvider = Sdk.CreateTracerProviderBuilder()
    .AddSource("OrderService")
    .AddJaegerExporter(options =>
    {
        options.AgentHost = "jaeger.azurelocal.local";
        options.AgentPort = 6831;
    })
    .Build();

using var activity = ActivitySource.StartActivity("OrderPlaced");
```

### Update Configuration for Local Endpoints

**Configuration File Updates:**

```json
// appsettings.json - Before (Azure)
{
  "ConnectionStrings": {
    "Database": "Server=myserver.database.windows.net;Database=ProductionDB;Authentication=Active Directory Default;"
  },
  "KeyVault": {
    "Url": "https://my-keyvault.vault.azure.net/"
  },
  "ServiceBus": {
    "ConnectionString": "Endpoint=sb://my-servicebus.servicebus.windows.net/..."
  },
  "Storage": {
    "AccountName": "mystorageaccount",
    "Endpoint": "https://mystorageaccount.blob.core.windows.net/"
  }
}

// appsettings.json - After (Disconnected)
{
  "ConnectionStrings": {
    "Database": "Server=sql-mi.azurelocal.local,1433;Database=ProductionDB;User Id=sa;Password=FromVault;"
  },
  "Vault": {
    "Url": "http://vault.azurelocal.local:8200",
    "Token": "FromEnvironment"
  },
  "MessageQueue": {
    "Host": "rabbitmq.azurelocal.local",
    "Username": "admin",
    "Password": "FromVault"
  },
  "Storage": {
    "Endpoint": "http://minio.azurelocal.local:9000",
    "AccessKey": "FromVault",
    "SecretKey": "FromVault"
  }
}
```

### Implement Offline-Capable Health Checks

**Remove Cloud Dependency Checks:**

```csharp
// Before: Health check includes Azure dependencies
public class HealthCheck : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context)
    {
        // This will fail in disconnected mode
        var azureHealth = await CheckAzureKeyVaultConnection();
        return azureHealth ? HealthCheckResult.Healthy() : HealthCheckResult.Unhealthy();
    }
}

// After: Health check only validates local dependencies
public class HealthCheck : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context)
    {
        var dbHealth = await CheckDatabaseConnection();
        var vaultHealth = await CheckVaultConnection();
        var queueHealth = await CheckRabbitMQConnection();
        
        return (dbHealth && vaultHealth && queueHealth) 
            ? HealthCheckResult.Healthy() 
            : HealthCheckResult.Unhealthy();
    }
}
```

## Testing in Disconnected Mode

### Network Isolation Testing

**Create Isolated Test Environment:**

```bash
# Simulate network disconnection by blocking Azure endpoints
# Add firewall rules to block *.azure.com, *.microsoft.com

# Linux/pfSense firewall rules
iptables -A OUTPUT -d management.azure.com -j DROP
iptables -A OUTPUT -d login.microsoftonline.com -j DROP
iptables -A OUTPUT -d *.azurecr.io -j DROP

# Validate applications continue to function
kubectl get pods -A # Should show all pods running
curl -k https://app.azurelocal.local/health # Should return 200 OK
```

**Test Scenarios:**

1. **Application startup without Azure connectivity**: All services start successfully
2. **User authentication**: Login works using local AD
3. **Database operations**: CRUD operations function normally
4. **Message queue operations**: Messages publish and consume successfully
5. **Monitoring and alerting**: Metrics collected, dashboards display data, alerts fire correctly
6. **Certificate validation**: TLS connections establish with internal CA certificates
7. **Backup operations**: Automated backups execute successfully

### Failover and Recovery Testing

**Simulate Node Failure:**

```bash
# Stop a Kubernetes node
kubectl drain node-02 --ignore-daemonsets --delete-emptydir-data

# Verify pods reschedule to other nodes
kubectl get pods -o wide

# Bring node back online
kubectl uncordon node-02
```

**Simulate Database Failure:**

```sql
-- Stop SQL instance
SHUTDOWN;

-- Verify application connection failover to replica
-- Restart SQL instance
-- Verify replication catches up
```

### Operational Procedure Testing

**Validate Day 2 Operations:**

- [ ] Deploy application update using Harbor registry
- [ ] Rotate TLS certificate using internal CA
- [ ] Update secrets in Vault
- [ ] Scale application deployment up/down
- [ ] Restore from backup
- [ ] Review monitoring dashboards and validate metrics
- [ ] Trigger alert and validate notification delivery
- [ ] Add new user to AD and validate application access
- [ ] Execute database maintenance tasks

## The Disconnection Event: Execution Plan

### Pre-Disconnection Preparation (Days 1-14)

**Week 1: Final Infrastructure Validation**
- [ ] Validate all local services operational (AD, DNS, PKI, Vault, Harbor, Prometheus, Grafana)
- [ ] Perform final image mirror from Azure Container Registry
- [ ] Export final secrets from Azure Key Vault
- [ ] Backup all Azure resources for rollback capability
- [ ] Document network topology and configurations
- [ ] Train operations team on local management tools

**Week 2: Application Validation**
- [ ] Deploy applications in isolated test environment
- [ ] Run full integration test suite
- [ ] Perform load testing
- [ ] Validate all health checks pass without Azure connectivity
- [ ] Review and update runbooks for disconnected operations
- [ ] Brief stakeholders on disconnection timeline

### Infrastructure Hardening (Days 15-21)

- [ ] Enable high availability for all critical services (AD, DNS, Vault, Harbor)
- [ ] Configure automated backups with verified restore procedures
- [ ] Implement monitoring alerting thresholds
- [ ] Deploy redundant network connections
- [ ] Establish break-glass access procedures
- [ ] Create offline installation media for critical software

### Service Migration (Days 22-28)

- [ ] Migrate monitoring from Azure Monitor to Prometheus/Grafana
- [ ] Migrate authentication from Azure AD to local AD (phased user migration)
- [ ] Switch secrets management from Key Vault to Vault
- [ ] Update DNS to resolve to local services
- [ ] Configure applications to use local endpoints
- [ ] Test application functionality after each migration step

### Validation Testing (Days 29-35)

- [ ] Execute full regression test suite
- [ ] Perform user acceptance testing
- [ ] Load test with production-like traffic
- [ ] Chaos engineering tests (kill nodes, services, network)
- [ ] Disaster recovery drill
- [ ] Documentation review and updates
- [ ] Final go/no-go decision

### Disconnection Event (Day 36)

**Execution Timeline:**

```
Hour 0 (00:00): Maintenance window begins
  - Notify users of planned maintenance
  - Enable read-only mode on Azure resources

Hour 1 (01:00): Final synchronization
  - Sync AD users/groups (if incremental sync still active)
  - Verify no data replication lag
  - Export final monitoring dashboards

Hour 2 (02:00): Disconnect Azure Arc agents
  - Remove Arc agents from Kubernetes cluster
  - Disable Azure Policy integrations
  - Deactivate Azure Monitor extensions

Hour 3 (03:00): Sever network connectivity
  - Disconnect ExpressRoute or VPN connection
  - Validate no Azure endpoints accessible
  - Confirm all applications continue running

Hour 4 (04:00): Validation phase
  - Run smoke tests on all applications
  - Verify authentication via local AD
  - Confirm monitoring dashboards show metrics
  - Test alert delivery

Hour 5 (05:00): User validation
  - Enable small user group for testing
  - Collect feedback and resolve issues

Hour 6 (06:00): Full cutover
  - Enable all users
  - Monitor for issues
  - Stand by for rapid response

Hour 12 (12:00): Maintenance window ends
  - Declare disconnection complete
  - Enter hypercare period (24/7 monitoring for 72 hours)
```

### Post-Disconnect Validation (Days 37-42)

**Daily Validation Activities:**

- Monitor application performance and error rates
- Review backup execution logs
- Validate certificate expiration tracking
- Check storage capacity and growth trends
- Review security logs for anomalies
- User feedback collection and issue resolution

**Go-Live Checklist:**

- [ ] All applications accessible and functional
- [ ] User authentication working via local AD
- [ ] Monitoring dashboards displaying accurate data
- [ ] Alerts configured and delivering notifications
- [ ] Backups running successfully
- [ ] No critical errors in logs
- [ ] Operations team comfortable with new tools
- [ ] Stakeholders satisfied with performance

## Post-Disconnection Operations and Maintenance

### Update Management Without Cloud Connectivity

**Operating System Updates:**

- Establish local WSUS (Windows Server Update Services) for Windows updates
- Configure local repository mirrors for Linux (YUM/APT mirrors)
- Schedule maintenance windows for update application
- Test updates in non-production before deploying to production

**Application Updates:**

```bash
# Build container images locally or on connected build server
docker build -t harbor.azurelocal.local/app/backend:v2.2 .
docker push harbor.azurelocal.local/app/backend:v2.2

# Deploy via GitOps (Flux/ArgoCD) pulling from local Harbor
kubectl set image deployment/backend backend=harbor.azurelocal.local/app/backend:v2.2
```

**Kubernetes Cluster Updates:**

- Maintain local repository of Kubernetes binaries
- Test cluster upgrades in dev environment first
- Perform rolling upgrades during maintenance windows
- Document upgrade procedures and rollback steps

### Monitoring and Incident Response

**24/7 Operations:**

- On-call rotation using local paging system (PagerDuty self-hosted or similar)
- Runbooks for common issues readily accessible
- War room procedures for critical incidents
- Escalation paths clearly documented

**Capacity Planning:**

- Weekly capacity reviews: CPU, memory, storage, network
- Growth trend analysis and forecasting
- Procurement lead times accounted for (hardware orders can take weeks/months)
- Capacity alerts configured at 70% and 85% thresholds

### Break-Glass Procedures

**Emergency Access:**

- Root/Administrator passwords stored in physical safe
- Break-glass accounts not connected to AD for emergency access
- Physical console access available for infrastructure
- Out-of-band management network independent of production

### Long-Term Operational Considerations

**Skill Development:**

- Team training on Kubernetes, Prometheus, Grafana, Vault, Harbor
- Cross-training to reduce single points of failure
- Documentation of tribal knowledge
- Regular tabletop exercises and DR drills

**Vendor Support:**

- Establish support contracts with hardware vendors
- Maintain relationships with software vendors (Red Hat, SUSE, etc.)
- Consider Microsoft support for Windows/SQL Server if applicable
- Plan for vendor site visits for major issues

**Hardware Lifecycle:**

- Track warranty expiration dates
- Maintain spare parts inventory (drives, RAM, NICs, power supplies)
- Plan hardware refresh cycles (typically 5 years for servers)
- Budget for periodic infrastructure upgrades

<!-- DIAGRAM: Before/After architecture showing the connected state (with cloud dependencies highlighted) and the disconnected state (with all cloud dependencies replaced by local alternatives), connected by transition arrows showing the replacement mapping -->

<!-- DIAGRAM: Disconnection execution timeline showing: Pre-staging (days 1-14) → Infrastructure hardening (days 15-21) → Service migration (days 22-28) → Validation testing (days 29-35) → Disconnection event (day 36) → Post-disconnect validation (days 37-42) -->

## Conclusion

Transitioning to fully disconnected Azure Local is a significant undertaking requiring meticulous planning, comprehensive testing, and skilled operations teams. The reward is complete independence from cloud infrastructure, meeting the most stringent regulatory, security, and operational requirements.

Organizations that successfully complete this journey achieve true sovereignty over their technology stack, but must also accept the responsibility of self-sufficiency—there's no cloud provider to call for support, no automatic updates, and no elastic scalability. Success depends on disciplined operational practices, proactive monitoring, and continuous investment in infrastructure and team skills.

## References

- [Azure Stack Hub Disconnected Deployment](https://learn.microsoft.com/en-us/azure-stack/operator/azure-stack-disconnected-deployment)
- [Active Directory Domain Services](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview)
- [HashiCorp Vault](https://www.vaultproject.io/)
- [Harbor Registry](https://goharbor.io/)

---

> **Next:** [Data Migration Strategies →](04-data-migration.md)
