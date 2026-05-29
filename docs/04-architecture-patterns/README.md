# Part 4: Architecture Patterns

This section presents proven, reusable architecture patterns for deploying workloads across the Azure Hybrid Continuum. Each pattern addresses a specific deployment model—from fully cloud-native to completely disconnected—with guidance on when to apply it and what trade-offs to consider. You'll also learn a decision framework for workload placement.

## What You'll Learn

- When to use cloud-native vs. hybrid architectures
- How to design hybrid connected solutions with Azure Local and Arc
- Architecture considerations for air-gapped, disconnected environments
- The cloud exit pattern: when and how to move from cloud to on-premises
- A structured framework for deciding where to run each workload

## Chapters

| Chapter | Description |
|---------|-------------|
| [Cloud-Native Pattern](01-cloud-native.md) | Fully public cloud architecture |
| [Hybrid Connected Pattern](02-hybrid-connected.md) | On-premises with cloud management |
| [Hybrid Disconnected Pattern](03-hybrid-disconnected.md) | Air-gapped and isolated environments |
| [Cloud Exit Pattern](04-cloud-exit.md) | Migrating from public cloud to on-premises |
| [Workload Placement Framework](05-workload-placement.md) | Decision framework for where to run what |
| [Multi-Cluster AKS and Fleet Manager](06-multi-cluster-fleet.md) | Multi-datacenter orchestration with Azure Kubernetes Fleet Manager |

## The Azure Hybrid Continuum at a Glance

The following diagram illustrates how workloads move across the five stages of the continuum, the enabling technologies at each stage, and the key trade-offs between connectivity, sovereignty, and operational complexity.

```mermaid
graph TB
    %% Title
    direction TB

    %% Continuum Stages
    subgraph Continuum["Azure Hybrid Continuum"]
        direction LR

        subgraph S1["☁️ Stage 1: Public Cloud"]
            S1_DESC["Full PaaS/SaaS<br/>AKS · App Service · SQL DB<br/>Azure AI Services"]
        end

        subgraph S2["🛡️ Stage 2: Sovereign Cloud"]
            S2_DESC["Sovereign Landing Zones<br/>In-jurisdiction controls<br/>Confidential Computing"]
        end

        subgraph S3["🔄 Stage 3: Hybrid"]
            S3_DESC["Cloud + Local Split<br/>PaaS in Cloud<br/>Azure Local On-Premises"]
        end

        subgraph S4["🔗 Stage 4: Local Connected"]
            S4_DESC["Azure Local + Arc<br/>AKS on Azure Local<br/>Arc-enabled Data Services"]
        end

        subgraph S5["🔒 Stage 5: Disconnected"]
            S5_DESC["Air-gapped · No connectivity<br/>Local K8s · Local Registry<br/>On-premises management"]
        end

        S1 --- S2
        S1 --- S3 --- S4 --- S5
    end

    %% Technology Enablers
    subgraph Enablers["Enabling Technologies"]
        direction LR
        ARC["Azure Arc<br/>Unified management"]
        LOCAL["Azure Local<br/>HCI infrastructure"]
        SLZ["Sovereign Landing Zones<br/>Policy & compliance"]
        GITOPS["GitOps & IaC<br/>Consistent deployment"]
    end

    %% Trade-off Axes
    subgraph Tradeoffs["Key Trade-offs"]
        direction LR
        CONN["Connectivity<br/>High ◀━━━━━━━▶ None"]
        SOV["Sovereignty<br/>Shared ◀━━━━━━━▶ Full"]
        OPS["Ops Complexity<br/>Low ◀━━━━━━━▶ High"]
        SVC["Service Breadth<br/>Full ◀━━━━━━━▶ Limited"]
    end

    %% Relationships
    Enablers --> Continuum
    Continuum --> Tradeoffs

    %% Styling
    classDef stageCloud fill:#0078d4,stroke:#005a9e,color:#fff
    classDef stageSovereign fill:#ffb900,stroke:#b8860b,color:#000
    classDef stageHybridNew fill:#7fba00,stroke:#498205,color:#fff
    classDef stageHybrid fill:#50e6ff,stroke:#0078d4,color:#000
    classDef stageDisconnected fill:#e74856,stroke:#a31e22,color:#fff
    classDef enabler fill:#f3f3f3,stroke:#666,color:#333
    classDef tradeoff fill:#fafafa,stroke:#999,color:#333

    class S1 stageCloud
    class S2 stageSovereign
    class S3 stageHybridNew
    class S4 stageHybrid
    class S5 stageDisconnected
    class ARC,LOCAL,SLZ,GITOPS enabler
    class CONN,SOV,OPS,SVC tradeoff
```

**Figure: The Azure Hybrid Continuum** — Workloads can move bidirectionally across five stages as requirements evolve. Azure Arc and Azure Local provide the foundation for consistent management, while Sovereign Landing Zones enforce compliance guardrails. The trade-off axes show how connectivity decreases and sovereignty increases as you move toward disconnected stages.

## References

- [Azure Architecture Center — Reference Architectures](https://learn.microsoft.com/en-us/azure/architecture/browse/)
- [Cloud Design Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/)
- [Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/)

---

> **Next:** [Cloud-Native Pattern →](01-cloud-native.md)
