# Application Overview — Contoso Insurance Platform

## Introduction

The Contoso Insurance Platform is a representative enterprise application designed to illustrate how a real-world system moves through the Azure Hybrid Continuum. It includes all the typical components found in enterprise applications: web frontend, API backend, background processing, relational database, file storage, and asynchronous messaging.

## Topics to Cover

- [ ] Application domain: insurance policy management, claims processing, customer portal
- [ ] Component deep dive:
  - **Frontend (React SPA)**: Customer self-service portal and insurance agent dashboard. Served via NGINX container. Communicates with API backend via REST/JSON.
  - **API Backend (.NET 8)**: Core business logic — policy CRUD, claims submission, premium queries. Containerized, stateless, horizontally scalable.
  - **Background Workers (.NET 8)**: Asynchronous processing — document OCR, premium recalculation, email/SMS notifications, regulatory report generation. Consume from message queue.
  - **Database (SQL Server)**: Relational store for policies, customers, claims, agents. Requires ACID transactions and complex queries.
  - **File Storage**: Document management — scanned claim forms, policy PDFs, regulatory filings. Requires durable, accessible storage.
  - **Message Queue**: Decouples API from workers. Handles claim submission events, notification triggers, batch job scheduling.
  - **Identity Provider**: Authenticates customers, agents, and admins. Supports MFA and role-based access.
- [ ] Non-functional requirements:
  - Availability: 99.9% for customer portal
  - RPO/RTO: RPO 1 hour, RTO 4 hours
  - Data classification: PII (customer data), financial (premiums, claims)
  - Compliance: GDPR, local insurance regulations
  - Scale: ~10,000 concurrent users, ~1M policies, ~100K claims/year
- [ ] Technology choices and rationale

<!-- DIAGRAM: Detailed component architecture diagram showing all services, their ports/protocols, data flows, and external dependencies. Include container boundaries, database schemas (high level), and queue topics -->

<!-- DIAGRAM: Data flow diagram showing how a claim submission flows through the system: Customer Portal → API → Validate & Store in DB → Publish to Queue → Worker picks up → OCR document → Update claim status → Notify customer -->

## References

- [.NET 8 Documentation](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8)
- [Azure Kubernetes Service](https://learn.microsoft.com/en-us/azure/aks/)
- [SQL Server on Linux](https://learn.microsoft.com/en-us/sql/linux/sql-server-linux-overview)

---

> **Next:** [Phase 1: Public Cloud →](02-phase1-public-cloud.md)
