# Part 7: Reference Scenario — Insurance Enterprise Application

This section brings everything together through a concrete, end-to-end reference scenario. You'll follow the Contoso Insurance platform—a realistic enterprise application with microservices, databases, message queues, and file storage—as it transitions through all three deployment models: public cloud, hybrid connected, and fully disconnected. This hands-on scenario demonstrates exactly how the architectural patterns and migration strategies apply to a real application.

## What You'll Learn

- How to decompose a real enterprise application for hybrid deployment
- Concrete technology choices for databases, storage, messaging, and identity at each stage
- What changes between public cloud, hybrid connected, and disconnected deployments
- How to document architecture decisions and their rationale
- Key lessons learned and recommendations for your own cloud exit journeys

## The Application: Contoso Insurance Platform

**Contoso Insurance** is an enterprise insurance platform with the following components:

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | React SPA in NGINX container | Customer portal and agent dashboard |
| **API Backend** | .NET 8 Web API in containers | Business logic, policy management, claims processing |
| **Background Workers** | .NET 8 Worker Services | Document processing, premium calculation, notifications |
| **Database** | SQL Server | Policy data, customer records, claims |
| **File Storage** | Object/Blob storage | Documents, scanned forms, policy PDFs |
| **Message Queue** | Message broker | Async communication between services |
| **Identity** | OAuth 2.0 / OIDC | Authentication and authorization |

## Chapters

| Chapter | Description |
|---------|-------------|
| [Application Overview](01-application-overview.md) | The insurance app architecture and components |
| [Phase 1: Public Cloud](02-phase1-public-cloud.md) | Running fully on Azure public cloud |
| [Phase 2: Hybrid Connected](03-phase2-hybrid-connected.md) | Migration to Azure Local (connected) |
| [Phase 3: Disconnected](04-phase3-disconnected.md) | Fully disconnected sovereign operation |
| [Architecture Decisions](05-architecture-decisions.md) | ADRs for each transition |
| [Lessons Learned](06-lessons-learned.md) | Key takeaways and recommendations |

<!-- DIAGRAM: The Contoso Insurance application high-level component diagram showing all 7 components and their interactions: Frontend → API Backend → Database, API Backend → Message Queue → Background Workers, Background Workers → File Storage, Frontend ← Identity Provider -->

<!-- DIAGRAM: The three-phase journey overview showing the same application deployed in three environments: Phase 1 (Azure Public Cloud), Phase 2 (Azure Local Connected), Phase 3 (Azure Local Disconnected), with arrows showing the migration path between phases -->

## References

- [Azure Architecture Center — Insurance](https://learn.microsoft.com/en-us/azure/architecture/industries/finance)
- [Microservices Architecture](https://learn.microsoft.com/en-us/azure/architecture/microservices/)
- [Azure Local](https://learn.microsoft.com/en-us/azure/azure-local/)

---

> **Next:** [Application Overview →](01-application-overview.md)
