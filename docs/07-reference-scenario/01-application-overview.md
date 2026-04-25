# Application Overview — Contoso Insurance Platform

!!! abstract "Chapter Summary"
    The Contoso Insurance Platform is a real-world-inspired enterprise application that demonstrates how complex business systems transition through the Azure Hybrid Continuum. This chapter introduces the application domain, technical architecture, and business requirements that drive the migration journey from public cloud to sovereign computing.

## Company Profile

**Contoso Insurance** is a regional insurance provider operating across the European Union with approximately 1.2 million policyholders and 1,500 employees. Founded in 1983, Contoso grew from a traditional paper-based insurer to a modern digital operation between 2018-2022, when they undertook a comprehensive cloud transformation.

The company offers three primary insurance product lines:

- **Personal Lines**: Auto, home, and personal liability insurance for individual consumers
- **Commercial Lines**: Business property, liability, and workers' compensation for SME clients  
- **Life & Health**: Term life insurance and supplemental health coverage

### The Cloud Exit Decision

In early 2023, Contoso's Board of Directors initiated a strategic review of their technology architecture driven by three factors:

1. **Regulatory Requirements**: Evolving EU data sovereignty regulations requiring customer data to remain within national boundaries, with strict limitations on data transfers to third-party processors
2. **Cost Optimization**: Monthly Azure spending had reached €45,000 per month, with significant portions attributed to data egress, managed PaaS services, and cross-region replication
3. **Operational Control**: Dependency on cloud provider SLAs created unacceptable risk during a major Azure outage in Q4 2022 that disrupted claims processing for 6 hours

The CTO's mandate was clear: design a transition path that maintains operational excellence while achieving data sovereignty, cost reduction, and operational independence. The solution was a phased migration through the hybrid continuum.

## Application Domain: Claims Processing Platform

The core of Contoso's digital operations is the **Claims Processing Platform** — a modern web application that handles the entire claims lifecycle from first notice of loss (FNOL) through settlement and payment.

### Core Business Processes

**Claim Submission** (Customer-Initiated)
: A customer reports a claim via the web portal or mobile app, uploading supporting documents (photos, police reports, medical records). The system validates the submission, checks policy coverage, and routes to the appropriate adjuster.

**Claim Adjudication** (Agent-Performed)  
: Insurance adjusters review submitted claims, request additional documentation, assess damage/liability, and determine settlement amounts. This process involves extensive document review and complex business rules.

**Claim Settlement** (Automated + Manual)
: Once approved, settlements under €5,000 are processed automatically via direct deposit. Larger claims require management approval and follow specialized workflows.

**Regulatory Reporting** (Automated)
: Weekly and monthly reports are generated for insurance regulators, including loss ratios, claim frequencies, and reserve adequacy metrics.

## Technical Architecture

The Contoso Insurance Platform follows a modern microservices-inspired architecture with clear separation of concerns. While not a pure microservices system (the API is a modular monolith, not decomposed services), it exhibits the key characteristics that enable hybrid continuum migration: containerization, stateless design, and asynchronous processing.

### Component Catalog

#### Frontend — Customer & Agent Portals

**Technology Stack**: React 18 SPA with TypeScript, Material-UI component library, deployed as static assets served by NGINX

The frontend comprises two distinct applications:

- **Customer Portal** (`customer.contosoinsurance.eu`): Policy viewing, claim submission, document upload, claim status tracking, payment history
- **Agent Dashboard** (`agents.contosoinsurance.eu`): Claim queues, policy management, customer search, regulatory report generation, analytics dashboards

Both frontends are single-page applications (SPAs) built with React. Static assets (HTML, CSS, JS bundles) are built during CI/CD and served by NGINX containers. The frontends communicate with the backend API exclusively via REST/JSON over HTTPS.

**Container Image**: `contosoinsurance/web-frontend:1.2.4` (~150 MB)  
**Resource Requirements**: 0.5 CPU, 512 MB RAM per replica  
**Scaling Profile**: 3 replicas minimum, autoscale to 10 based on HTTP request rate

#### API Backend — Core Business Logic

**Technology Stack**: .NET 8 (C#), ASP.NET Core Web API, Entity Framework Core, containerized Linux application

The API backend is a modular monolith organized into logical modules:

- **PolicyService**: CRUD operations for insurance policies, premium calculations, renewal processing
- **ClaimService**: Claim submission, validation, status updates, settlement processing  
- **DocumentService**: Document metadata management, presigned URL generation for direct-to-storage uploads
- **NotificationService**: Enqueues notification requests to message queue
- **ReportingService**: Ad-hoc queries and scheduled report generation

All endpoints follow RESTful conventions. The API is stateless — session data and user identity come from JWT tokens issued by the identity provider. Database connections are pooled and managed by Entity Framework Core.

**Container Image**: `contosoinsurance/api-backend:2.1.8` (~220 MB)  
**Resource Requirements**: 1 CPU, 1 GB RAM per replica  
**Scaling Profile**: 5 replicas minimum, autoscale to 20 based on CPU and request latency

#### Background Workers — Asynchronous Processing

**Technology Stack**: .NET 8 (C#), containerized Linux console applications, message queue consumers

Three distinct worker types run as separate container deployments:

**Document Processing Worker**
: Consumes `document.uploaded` events from the message queue. Performs OCR on scanned claim forms using Tesseract OCR, extracts structured data, and updates the database. Handles ~5,000 documents per day.

**Premium Recalculation Worker**
: Consumes `policy.modified` events. Recalculates insurance premiums based on updated risk factors (customer age, claim history, coverage changes). Runs pricing rules engine and updates policy records.

**Notification Worker**  
: Consumes `notification.requested` events. Sends emails (via SMTP) and SMS messages (via third-party API) for claim status updates, payment confirmations, policy renewals, and regulatory notices.

All workers follow competing consumer patterns — multiple instances process messages concurrently with at-least-once delivery semantics.

**Container Images**:  
- `contosoinsurance/worker-documents:1.5.2` (~180 MB)
- `contosoinsurance/worker-premium:1.3.1` (~160 MB)  
- `contosoinsurance/worker-notifications:1.4.6` (~170 MB)

**Resource Requirements**: 0.5-1 CPU, 512 MB-1 GB RAM per replica

#### Database — Transactional Data Store

**Technology Stack**: SQL Server (initially Azure SQL Database, migrates to SQL Server 2022 Standard Edition in disconnected phase)

The database stores all transactional data:

- **Customers Table**: ~1.2M rows (customer records, contact info, preferences)
- **Policies Table**: ~1.5M rows (active and historical insurance policies)  
- **Claims Table**: ~400K rows (claim records from 2018-present)
- **Documents Table**: ~2M rows (metadata for stored documents)
- **AuditLog Table**: ~50M rows (compliance audit trail)

The schema uses normalized relational design with referential integrity constraints. Complex queries involving multi-table joins are common, particularly for reporting. Database size is approximately 180 GB with 20 GB growth per year.

**Performance Profile**:  
- ~500 transactions/sec peak (9am-5pm weekdays)  
- Read-heavy workload (80% reads, 20% writes)
- Requires ACID guarantees for claim settlement transactions

#### File Storage — Document Repository

**Technology Stack**: Object storage (initially Azure Blob Storage, migrates to MinIO in hybrid phases)

The document repository stores scanned claim forms, policy PDFs, photos of damaged property, medical records, and regulatory filings. Documents are immutable after upload and retained for 10 years per regulatory requirements.

**Storage Profile**:  
- Total storage: ~8 TB  
- Document count: ~2 million  
- Average document size: 4 MB  
- Growth rate: 800 GB/year  
- Access pattern: Write-once, read-occasionally (except active claims)

#### Message Queue — Asynchronous Communication

**Technology Stack**: Message broker (initially Azure Service Bus, migrates to RabbitMQ in hybrid phases)

The message queue decouples the API backend from background workers, enabling asynchronous processing with durability guarantees. Three primary queues:

- **document-processing-queue**: ~2,000 messages/day, peak 500 messages/hour  
- **premium-calculation-queue**: ~1,500 messages/day, batch processing during off-hours
- **notification-queue**: ~10,000 messages/day, high priority for customer communications

All queues use at-least-once delivery with message TTL of 24 hours and dead-letter queues for failed processing attempts.

#### Identity Provider — Authentication & Authorization

**Technology Stack**: Initially Azure AD B2C for customers and Azure AD for employees; migrates to AD DS + ADFS in disconnected phase

The identity system authenticates three user types:

- **Customers**: ~15,000 active users, username/password with optional MFA
- **Agents**: ~400 users, integrated Windows authentication or federated SSO, MFA required  
- **Administrators**: ~20 users, privileged access with hardware MFA tokens

Role-based access control (RBAC) enforces authorization at the API level. JWT tokens carry user identity and role claims.

## Data Flow: Claim Submission Example

To understand how these components interact, consider the end-to-end flow when a customer submits a new insurance claim:

1. **Customer submits claim** via React SPA (Customer Portal)
2. **SPA calls API** `POST /api/claims` with claim details (policy ID, incident date, description)
3. **API validates** policy coverage, incident date within policy period, required fields present
4. **API generates presigned upload URL** for document storage (photos, police report)
5. **Customer uploads documents** directly to object storage using presigned URL
6. **API writes claim record** to database (status: "Submitted"), wraps in DB transaction
7. **API publishes `document.uploaded` event** to message queue with claim ID and document IDs
8. **API publishes `notification.requested` event** to message queue for claim confirmation email
9. **API returns** claim ID and status to customer SPA
10. **Document Worker consumes** `document.uploaded` event, performs OCR on uploaded files
11. **Document Worker updates** database with extracted text, updates claim status to "Under Review"
12. **Notification Worker consumes** `notification.requested` event, sends email to customer
13. **Agent views claim** in Agent Dashboard, reviews OCR results, requests additional info or approves
14. **Settlement processed** (if approved), generates payment, updates claim status to "Settled"
15. **Notification Worker sends** settlement confirmation email to customer

<!-- DIAGRAM: Component architecture diagram for Seldon - shows Frontend (React SPA) → API Backend (.NET 8) → Database (SQL Server), with bidirectional arrows to Object Storage and Message Queue. Background Workers consume from Message Queue and update Database. Identity Provider authenticates all users. Include technology labels and port numbers (443, 5432, 5672, etc.) -->

<!-- DIAGRAM: Data flow sequence diagram for Seldon - shows the 15-step claim submission process as a sequence diagram with Customer, Frontend, API, Database, Object Storage, Message Queue, Document Worker, Notification Worker, and Agent as participants -->

## Non-Functional Requirements

The Contoso Insurance Platform must meet strict operational requirements to satisfy both business and regulatory obligations.

### Availability & Reliability

| Requirement | Target | Rationale |
|------------|--------|-----------|
| **Uptime (Customer Portal)** | 99.9% (8.76 hours downtime/year) | Customers expect 24/7 access for claim submission |
| **Uptime (Agent Dashboard)** | 99.5% (43.8 hours downtime/year) | Agents work business hours; maintenance windows acceptable |
| **RPO (Recovery Point Objective)** | 1 hour | Maximum acceptable data loss in disaster scenarios |
| **RTO (Recovery Time Objective)** | 4 hours | Maximum acceptable downtime for full service restoration |

### Performance & Scalability

| Metric | Target | Notes |
|--------|--------|-------|
| **API Response Time (p95)** | < 500ms | Excludes document upload operations |
| **Page Load Time (p95)** | < 2 seconds | Fully interactive customer portal |
| **Concurrent Users** | 10,000 | Peak load during business hours |
| **Database Transactions/Sec** | 500 TPS | Peak load with 80/20 read/write ratio |

### Security & Compliance

**Data Classification**
: Customer PII (names, addresses, national ID numbers), financial data (bank accounts, premiums, claim amounts), and health information (medical claims) are classified as sensitive data requiring encryption at rest and in transit.

**Regulatory Compliance**  
: GDPR (EU data protection), Solvency II (insurance capital requirements), local insurance regulations requiring data residency and audit trails.

**Security Controls**
: TLS 1.3 for all network traffic, encryption at rest for databases and object storage, MFA for privileged access, quarterly penetration testing, annual security audits.

## Technology Choices & Rationale

| Decision | Rationale |
|----------|-----------|
| **.NET 8 for Backend** | Enterprise-grade framework with excellent Linux container support, Entity Framework Core for database access, strong typing reduces runtime errors |
| **React for Frontend** | Component-based architecture enables code reuse, large ecosystem, excellent developer experience, separates frontend/backend deployment |
| **SQL Server for Database** | ACID compliance, complex query support, familiar to operations team, enterprise support available |
| **Containerization (Docker)** | Enables consistent deployment across cloud and on-premises, simplifies dependency management, foundation for Kubernetes orchestration |
| **Message Queue Pattern** | Decouples API from long-running operations, improves API response times, enables independent scaling of workers |

## Challenges Driving Cloud Exit

Contoso's journey through the hybrid continuum is driven by real business challenges:

!!! warning "Cost Escalation"
    Monthly Azure spending reached €45,000 with significant portions attributed to data egress (€8,000/mo), managed PaaS services (€15,000/mo), and cross-region replication (€6,000/mo). TCO analysis showed 3-year savings of €420,000 by moving to Azure Local.

!!! danger "Regulatory Pressure"
    New EU regulations require customer data to remain within national boundaries with strict limitations on data transfers. Azure's multi-region architecture and shared responsibility model created compliance risks.

!!! failure "Cloud Dependency Risk"  
    The Q4 2022 Azure outage disrupted claims processing for 6 hours, causing reputational damage and regulatory scrutiny. Executive leadership demanded greater operational control and independence from cloud provider SLAs.

These challenges set the stage for Contoso's hybrid continuum journey — a carefully planned migration from Azure public cloud through hybrid connected operation to fully disconnected sovereign computing.

## References

- [.NET 8 Documentation](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8)
- [Azure Kubernetes Service](https://learn.microsoft.com/en-us/azure/aks/)
- [SQL Server on Linux](https://learn.microsoft.com/en-us/sql/linux/sql-server-linux-overview)
- [GDPR Compliance for Insurance](https://www.insurance-europe.eu/data-protection)
- [React Documentation](https://react.dev/)

---

> **Next:** [Phase 1: Public Cloud →](02-phase1-public-cloud.md)
