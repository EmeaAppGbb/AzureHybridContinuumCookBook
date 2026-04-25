# Controls & Principles

## Introduction

The Sovereign Landing Zone enforces sovereignty through a layered set of controls and principles that build on Azure's native governance capabilities. These controls transform abstract sovereignty requirements — such as "data must remain in-country" or "cloud operators must not access workloads" — into concrete, enforceable technical mechanisms.

This chapter examines the sovereignty control objectives, explores each category of control in depth, and demonstrates how these controls work together to protect sovereign workloads across the hybrid continuum. The approach is grounded in **Zero Trust principles** and **defense-in-depth**, ensuring that no single control point is a single point of failure.

## Sovereignty Control Objectives

Before diving into specific controls, it's important to understand the **control objectives** that drive sovereign architectures:

### 1. Data Residency Control

**Objective**: Ensure that data is stored, processed, and replicated only within approved geographic boundaries.

**Why it matters**: Many regulations (GDPR, data localization laws) and organizational policies require data to remain within specific countries or regions. Violating data residency requirements can result in legal penalties, loss of certifications, or reputational damage.

**Implementation**: Azure Policy enforcement, region-scoped resource deployments, storage account replication controls.

### 2. Access Control and Operational Sovereignty

**Objective**: Ensure that only authorized personnel can access cloud infrastructure, and provide transparency and approval mechanisms for cloud operator access.

**Why it matters**: Organizations need assurance that their data and workloads are protected from unauthorized access, including by well-intentioned cloud support personnel operating under foreign legal jurisdictions.

**Implementation**: Azure AD Conditional Access, Privileged Identity Management (PIM), Customer Lockbox, audit logging.

### 3. Encryption and Confidentiality

**Objective**: Protect data at rest, in transit, and in use, ensuring that even if unauthorized access occurs, data remains unreadable.

**Why it matters**: Encryption is the last line of defense. Even if perimeter controls fail, encrypted data is useless without the decryption keys — which must remain under customer control.

**Implementation**: Customer-managed keys (CMK), Azure Key Vault Managed HSM, confidential computing (TEEs), TLS 1.3 for data in transit.

### 4. Network Isolation

**Objective**: Prevent unauthorized network access to sovereign workloads and ensure traffic flows only through inspected, controlled pathways.

**Why it matters**: Network exposure is a primary attack vector. Isolating sovereign workloads from the public internet and segmenting them from non-sovereign workloads reduces attack surface.

**Implementation**: Private endpoints, Azure Firewall, Network Security Groups (NSGs), Azure DDoS Protection.

### 5. Auditability and Transparency

**Objective**: Provide comprehensive, tamper-evident logs of all access to sovereign resources, including by cloud operators.

**Why it matters**: Audit logs are essential for compliance, incident response, and demonstrating to regulators that access controls are effective.

**Implementation**: Azure Monitor, Log Analytics, Microsoft Sentinel, Azure Activity Log, Customer Lockbox logs.

## Foundational Principle: Zero Trust

The Sovereign Landing Zone is built on **Zero Trust** principles, which assume that no entity (user, device, or network) is inherently trusted. Every access request must be verified, and access is granted based on the principle of least privilege.

### Zero Trust Pillars in the SLZ

1. **Verify explicitly**: Always authenticate and authorize based on all available data points (identity, device, location, workload).
2. **Use least privilege access**: Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA), risk-based adaptive policies.
3. **Assume breach**: Minimize blast radius and segment access. Verify end-to-end encryption and use analytics to detect threats.

These principles directly inform the controls described in the following sections.

## Azure Policy: Policy-as-Code for Sovereignty

**Azure Policy** is the enforcement mechanism for sovereignty controls in the SLZ. Policies are defined as JSON documents, assigned to management groups or subscriptions, and evaluated continuously.

### Policy Effects

Azure Policy supports multiple effects:

- **Deny**: Prevents non-compliant resource creation or modification.
- **Audit**: Logs non-compliant resources but allows creation.
- **DeployIfNotExists**: Automatically remediates non-compliance by deploying missing resources (e.g., diagnostic settings).
- **Modify**: Changes resource properties to enforce compliance (e.g., adding required tags).
- **Disabled**: Policy exists but is not enforced (useful for testing).

### Example Sovereignty Policies

#### Data Residency Enforcement

Ensures all resources in a subscription are deployed only in approved regions:

```json
{
  "properties": {
    "displayName": "Allowed locations for resource creation",
    "policyType": "BuiltIn",
    "mode": "All",
    "parameters": {
      "allowedLocations": {
        "type": "Array",
        "metadata": {
          "description": "The list of allowed locations for resources.",
          "displayName": "Allowed locations",
          "strongType": "location"
        }
      }
    },
    "policyRule": {
      "if": {
        "not": {
          "field": "location",
          "in": "[parameters('allowedLocations')]"
        }
      },
      "then": {
        "effect": "deny"
      }
    }
  }
}
```

**Assignment example**: At the `Confidential Corp` management group, assign this policy with `allowedLocations: ["westeurope", "northeurope"]` to enforce EU-only data residency.

#### Customer-Managed Key Requirement

Ensures all Storage Accounts use customer-managed encryption keys:

```json
{
  "policyRule": {
    "if": {
      "allOf": [
        {"field": "type", "equals": "Microsoft.Storage/storageAccounts"},
        {"field": "Microsoft.Storage/storageAccounts/encryption.keySource", "notEquals": "Microsoft.Keyvault"}
      ]
    },
    "then": {
      "effect": "deny"
    }
  }
}
```

This policy **denies** creation of Storage Accounts that do not use customer-managed keys stored in Azure Key Vault.

#### Confidential VM Requirement

Requires that all VMs in specified regions are Confidential VMs:

```json
{
  "policyRule": {
    "if": {
      "allOf": [
        {"field": "type", "equals": "Microsoft.Compute/virtualMachines"},
        {"field": "location", "in": ["westeurope", "northeurope"]},
        {"field": "properties.securityProfile.securityType", "notEquals": "ConfidentialVM"}
      ]
    },
    "then": {
      "effect": "deny"
    }
  }
}
```

### Policy Initiatives (Policy Sets)

For complex sovereignty scenarios, multiple policies are grouped into **initiatives** (also called policy sets). An initiative might include:

- Allowed locations (data residency).
- Customer-managed key requirement.
- Private endpoint requirement for PaaS services.
- Diagnostic logging to centralized Log Analytics workspace.
- No public IP addresses allowed.

By assigning an initiative to the `Confidential Corp` management group, all subscriptions beneath it inherit the full set of sovereignty controls.

### Policy Compliance Monitoring

The **Azure Policy Compliance Dashboard** provides a real-time view of policy compliance across all subscriptions. Security teams can:

- Identify non-compliant resources.
- Drill down into specific policy violations.
- Trigger remediation tasks for policies with `DeployIfNotExists` or `Modify` effects.

## Confidential Computing: Protecting Data in Use

While encryption at rest and in transit are well-understood, **data in use** has historically been vulnerable to privileged users, hypervisors, and cloud operators. **Confidential computing** addresses this gap by leveraging hardware-based isolation.

### What is Confidential Computing?

The [Confidential Computing Consortium](https://confidentialcomputing.io/) defines confidential computing as:

> "Protecting data in use by performing computation in a hardware-based, attested Trusted Execution Environment (TEE). These secure and isolated environments prevent unauthorized access or modification of applications and data while they are in use."

Microsoft is a founding member of the CCC and provides multiple confidential computing offerings in Azure.

### Trusted Execution Environments (TEEs)

A **TEE** is a secure area of a processor that:

- **Isolates code and data** from the operating system, hypervisor, and other workloads.
- **Encrypts memory** using keys managed by the CPU.
- **Provides attestation**: Cryptographic proof that the workload is running on genuine hardware with expected firmware.

Azure supports TEEs based on multiple CPU technologies:

#### AMD SEV-SNP (Secure Encrypted Virtualization - Secure Nested Paging)

AMD's technology encrypts entire VM memory with a key unique to that VM, protected by the CPU. The hypervisor cannot decrypt the VM's memory. **Azure DCasv5 and ECasv5 VM series** use AMD SEV-SNP.

**Use cases**:

- Lift-and-shift migration of existing VMs that handle sensitive data.
- Multi-party computation where workloads from different organizations must be isolated.
- Government workloads requiring protection from cloud operator access.

#### Intel TDX (Trust Domain Extensions)

Intel's TEE technology provides similar VM-level isolation with memory encryption and attestation. Intel TDX support is in preview on Azure.

#### Intel SGX (Software Guard Extensions)

Intel SGX provides **application-level enclaves** — isolated regions of memory where specific application code and data run protected from the OS and hypervisor. **Azure DCsv3 VM series** support SGX.

**Use cases**:

- Secure key management services.
- Multi-party machine learning (e.g., federated learning with encrypted data).
- Confidential smart contracts and blockchain applications.

### Confidential VMs in the SLZ

The SLZ encourages deployment of **Confidential VMs** for workloads in the `Confidential Corp` and `Confidential Online` management groups. Confidential VMs provide:

1. **Memory encryption**: VM memory encrypted with AMD SEV-SNP or Intel TDX.
2. **vTPM (virtual Trusted Platform Module)**: Enables BitLocker encryption tied to the VM's attested state.
3. **Secure Boot**: Ensures the VM boots with trusted firmware and OS.
4. **Attestation**: Provides cryptographic proof to relying parties that the VM is running on confidential hardware.

**Deployment example (Azure CLI)**:

```bash
az vm create \
  --resource-group rg-confidential-workloads \
  --name vm-confidential-app01 \
  --location westeurope \
  --size Standard_DC4as_v5 \
  --security-type ConfidentialVM \
  --os-disk-security-encryption-type DiskWithVMGuestState \
  --enable-secure-boot true \
  --enable-vtpm true \
  --image Ubuntu2204
```

### Confidential Containers

For containerized workloads, **Azure Kubernetes Service (AKS)** supports confidential containers, where pods run inside TEEs. This is achieved through:

- **Confidential node pools**: AKS nodes running on confidential VM SKUs.
- **Kata Containers**: Lightweight VMs that provide pod-level isolation.
- **Enclave-aware containers**: Containers that explicitly use Intel SGX enclaves.

**Use case example**: A healthcare organization runs a machine learning inference service on AKS. Patient data is processed inside confidential containers, ensuring that Kubernetes administrators and cloud operators cannot access the data, even with root access to the cluster.

### Attestation Services

**Azure Attestation** is a unified service for attesting TEEs. It provides:

- **Remote attestation**: A relying party (e.g., a client application) can verify that a workload is running in a genuine TEE with expected code and configuration.
- **Policy-based attestation**: Organizations define attestation policies that specify acceptable TEE configurations.

Attestation is critical in multi-party computation scenarios, where parties must prove to each other that they are running workloads in isolated, trustworthy environments.

## Customer-Managed Keys and Azure Key Vault

Encryption is only as strong as the protection of the encryption keys. The SLZ enforces **customer-managed keys (CMK)** for all encryption operations, ensuring that customers — not Microsoft — retain ultimate control over key lifecycle.

### Azure Key Vault Integration

**Azure Key Vault** is a cloud-based HSM (Hardware Security Module) service for managing keys, secrets, and certificates. For sovereign workloads, Key Vault provides:

- **FIPS 140-2 Level 2 validated HSMs** (standard tier).
- **FIPS 140-2 Level 3 validated HSMs** (Managed HSM tier).
- **Customer-controlled key lifecycle**: Customers can create, rotate, disable, and delete keys.
- **Audit logging**: All key operations are logged to Azure Monitor.

### Customer-Managed Keys for Azure Services

Many Azure services support CMK integration with Key Vault:

- **Azure Storage**: Encrypt blobs, files, queues, and tables with CMK.
- **Azure SQL Database**: Transparent Data Encryption (TDE) with CMK.
- **Azure Cosmos DB**: Encrypt data at rest with CMK.
- **Azure Virtual Machines**: Encrypt OS and data disks with CMK via Azure Disk Encryption (ADE).

**Policy enforcement**: As shown earlier, Azure Policy can **require** CMK for all supported services, denying creation of resources that use Microsoft-managed keys.

### Azure Key Vault Managed HSM

For organizations with the highest key protection requirements, **Azure Key Vault Managed HSM** provides:

- **Single-tenant HSMs**: Dedicated FIPS 140-2 Level 3 validated HSMs per customer.
- **Customer-controlled security domain**: The HSM is encrypted with keys that only the customer holds; Microsoft cannot access the HSM.
- **Support for BYOK (Bring Your Own Key)**: Import keys generated in on-premises HSMs.

Managed HSM is particularly suited for:

- Financial services requiring regulatory compliance (e.g., PCI DSS).
- Government agencies with classified data.
- Healthcare organizations handling HIPAA-protected health information (PHI).

### Azure Dedicated HSM

For organizations requiring complete control over HSM hardware, **Azure Dedicated HSM** provides direct access to physical HSMs (Thales Luna 7 HSMs) hosted in Azure data centers. This is the highest level of key protection available in Azure, suitable for extremely sensitive workloads.

## Customer Lockbox: Controlling Microsoft Support Access

**Customer Lockbox** for Microsoft Azure gives customers explicit approval rights over Microsoft support access to their environments. This addresses operational sovereignty concerns by ensuring that customers retain control over who accesses their workloads, even in support scenarios.

### How Customer Lockbox Works

1. **Support request initiated**: A customer or Microsoft support engineer creates a support request that requires access to customer resources.
2. **Lockbox request generated**: If access is needed, Microsoft support submits a Customer Lockbox request.
3. **Customer approves or denies**: The customer receives a notification and must explicitly approve or deny the request.
4. **Time-limited access**: If approved, the support engineer receives JIT access for a limited duration (e.g., 4 hours).
5. **Audit logging**: All access is logged in Azure Activity Log and can be monitored in Microsoft Sentinel.

### Enabling Customer Lockbox

Customer Lockbox is enabled at the Azure AD tenant level:

```powershell
# Enable Customer Lockbox
Set-AzContext -SubscriptionId "<subscription-id>"
Register-AzResourceProvider -ProviderNamespace Microsoft.CustomerLockbox
```

Once enabled, all support requests that require data access trigger Lockbox approval workflows.

### Lockbox for Sovereign Workloads

For sovereign workloads, Customer Lockbox is typically:

- **Required** via Azure Policy.
- **Configured with strict approval workflows**: For example, requiring approval from two designated personnel.
- **Monitored with alerts**: Any Lockbox request triggers an alert to security operations teams.

## Network Security Controls

Network isolation is a cornerstone of sovereignty. The SLZ enforces network controls that minimize exposure and ensure all traffic flows through inspected, controlled pathways.

### Private Endpoints

**Azure Private Endpoint** enables private connectivity to Azure PaaS services (Storage, SQL Database, Key Vault) over a private IP address within a VNet. This ensures that:

- **No public internet exposure**: PaaS services are not accessible from the public internet.
- **Traffic stays on the Microsoft backbone**: Data does not traverse the public internet, even within Azure.
- **DNS resolution via Private DNS Zones**: FQDNs resolve to private IP addresses.

**Policy enforcement**: The SLZ can enforce that all PaaS services in `Confidential Corp` and `Confidential Online` management groups use private endpoints, with public access disabled.

**Example policy (simplified)**:

```json
{
  "policyRule": {
    "if": {
      "allOf": [
        {"field": "type", "equals": "Microsoft.Storage/storageAccounts"},
        {"field": "properties.publicNetworkAccess", "equals": "Enabled"}
      ]
    },
    "then": {
      "effect": "deny"
    }
  }
}
```

### Network Security Groups (NSGs)

**NSGs** provide stateful packet filtering at the subnet and NIC level. The SLZ uses NSGs to:

- **Restrict traffic flows**: Allow only necessary ports and protocols.
- **Segment workloads**: Isolate different tiers of an application (web, app, data).
- **Deny internet access**: For workloads that should not communicate with the public internet.

**Best practice**: Combine NSGs with Azure Firewall for defense-in-depth. NSGs provide subnet-level controls, while Azure Firewall provides centralized application-level inspection.

### Azure Firewall and Application Gateway

- **Azure Firewall**: Network and application-layer firewall for centralized traffic inspection, filtering, and threat intelligence.
- **Azure Application Gateway**: Layer 7 load balancer with Web Application Firewall (WAF) for protecting internet-facing applications.

The SLZ uses these services to:

- **Inspect all north-south traffic** (internet ingress/egress).
- **Inspect east-west traffic** (between spokes and on-premises).
- **Block malicious traffic** using threat intelligence feeds.
- **Enforce application-layer policies** (e.g., block SQL injection attempts).

### Azure DDoS Protection

For internet-facing workloads in the `Confidential Online` management group, **Azure DDoS Protection Standard** provides enhanced mitigation against volumetric attacks, ensuring availability even during large-scale DDoS events.

## Identity Controls: Conditional Access and PIM

Identity is the control plane for modern cloud environments. The SLZ enforces strict identity controls based on Azure AD.

### Conditional Access

**Azure AD Conditional Access** enforces adaptive, risk-based access policies. Example policies for sovereign workloads:

- **Require MFA**: All access to resources in the `Confidential Corp` management group requires multi-factor authentication.
- **Geo-fencing**: Deny access from countries outside approved locations.
- **Device compliance**: Require that devices accessing sovereign resources are managed and compliant with security baselines.
- **Session controls**: Limit session duration, restrict download of sensitive data.

**Example policy**: Require MFA and compliant device for access to Azure portal when managing resources in the `Confidential Corp` management group.

### Privileged Identity Management (PIM)

**Azure AD Privileged Identity Management (PIM)** provides Just-In-Time (JIT) access to privileged roles. Instead of standing permissions, users request elevation to roles when needed, and access is granted for a limited duration (e.g., 2 hours).

**Benefits for sovereignty**:

- **Reduced standing privilege**: No one has permanent Owner or Contributor rights to sovereign subscriptions.
- **Approval workflows**: Elevation requests can require approval from designated personnel.
- **Audit trail**: All elevation requests and actions are logged.

**Example**: A DevOps engineer needs to deploy a VM in a `Confidential Corp` subscription. They request elevation to Contributor role via PIM, the request is approved by a security officer, and they receive access for 2 hours. After 2 hours, access is automatically revoked.

## Defense-in-Depth for Sovereign Workloads

The SLZ implements **defense-in-depth**, layering multiple security controls so that if one fails, others provide continued protection.

!!! info "DIAGRAM PLACEHOLDER: Defense-in-Depth for Sovereign Workloads"
    **Seldon diagram needed**: A layered diagram showing:
    - **Layer 1 (Physical Security)**: Azure data center physical security, FIPS 140-2 Level 3 HSMs.
    - **Layer 2 (Network Isolation)**: Private endpoints, NSGs, Azure Firewall, no public IPs.
    - **Layer 3 (Identity)**: Azure AD Conditional Access, PIM, MFA.
    - **Layer 4 (Data Protection)**: Encryption at rest (CMK), encryption in transit (TLS 1.3).
    - **Layer 5 (Confidential Computing)**: TEEs (AMD SEV-SNP, Intel TDX, SGX).
    - **Layer 6 (Application Security)**: Secure coding practices, vulnerability scanning, WAF.
    - **Layer 7 (Monitoring & Audit)**: Azure Monitor, Microsoft Sentinel, Customer Lockbox logs, attestation.

### How Defense-in-Depth Works in Practice

**Scenario**: An attacker compromises a user account.

- **Layer 1 (Identity)**: Conditional Access blocks the login because it's from an unusual location.
- **Layer 2 (Network)**: Even if the attacker bypasses Conditional Access, they cannot reach resources because they are behind private endpoints.
- **Layer 3 (Data Protection)**: If the attacker gains network access, data is encrypted with customer-managed keys they don't have.
- **Layer 4 (Confidential Computing)**: If the attacker compromises the VM, they cannot read memory because it's encrypted by the CPU.
- **Layer 5 (Monitoring)**: The unusual activity triggers alerts in Microsoft Sentinel, and the security team responds.

No single control is a silver bullet, but together they create a robust security posture.

## Monitoring, Auditing, and Compliance

Sovereignty without auditability is incomplete. The SLZ integrates comprehensive monitoring and auditing capabilities.

### Azure Monitor and Log Analytics

All sovereign resources send logs to a centralized **Log Analytics workspace** in the `Management` subscription. This includes:

- **Azure Activity Log**: All control plane operations (resource creation, deletion, modification).
- **Diagnostic logs**: Data plane operations for PaaS services (Storage, SQL, Key Vault).
- **NSG flow logs**: Network traffic flows for security analysis.
- **Azure Firewall logs**: Allowed and denied traffic at the firewall.

### Microsoft Defender for Cloud

**Microsoft Defender for Cloud** provides unified security management and threat protection across hybrid cloud workloads. For sovereign workloads, Defender for Cloud:

- **Assesses compliance**: Continuously evaluates resources against regulatory benchmarks (e.g., CIS, NIST, PCI DSS).
- **Provides recommendations**: Identifies security misconfigurations and recommends remediation.
- **Detects threats**: Uses behavioral analytics and threat intelligence to identify suspicious activity.

### Microsoft Sentinel

**Microsoft Sentinel** is a cloud-native SIEM (Security Information and Event Management) and SOAR (Security Orchestration, Automation, and Response) solution. For the SLZ, Sentinel:

- **Correlates logs**: Combines logs from Azure Monitor, Customer Lockbox, Azure AD, and other sources to detect complex attacks.
- **Automates response**: Uses playbooks (Azure Logic Apps) to automatically respond to incidents (e.g., disable a compromised account).
- **Provides investigation tools**: Enables security analysts to investigate incidents with rich context.

### Compliance Dashboards

The **Azure Compliance Dashboard** (part of Defender for Cloud) provides a real-time view of compliance with regulatory standards. Security teams can:

- **Track compliance scores**: Measure compliance against benchmarks like ISO 27001, GDPR, or custom frameworks.
- **Generate audit reports**: Export compliance reports for auditors and regulators.
- **Prioritize remediation**: Focus on high-impact security gaps first.

## Custom Policy Initiatives for Regulatory Requirements

Different industries and jurisdictions have unique regulatory requirements. The SLZ supports **custom policy initiatives** tailored to specific regulations.

### Example: EU Digital Sovereignty Initiative

A European government agency might define a custom initiative that includes:

- **Data residency**: All resources in EU regions only (westeurope, northeurope).
- **Encryption**: Customer-managed keys required for all services.
- **Access control**: Customer Lockbox required; MFA and device compliance mandatory.
- **Confidential computing**: Confidential VMs required for all compute workloads.
- **Network isolation**: Private endpoints required; no public IPs allowed.
- **Logging**: All diagnostic logs to sovereign Log Analytics workspace; retention 7 years.

This initiative is assigned to the root management group for the agency's Azure environment, ensuring all subscriptions inherit the controls.

### Example: Healthcare HIPAA Initiative

A healthcare organization might define an initiative for HIPAA compliance:

- **Data residency**: Resources in US regions only.
- **Encryption**: Customer-managed keys with Managed HSM.
- **Access control**: PIM required for all privileged roles; audit logs to Sentinel.
- **Network isolation**: Private endpoints required; all PaaS services behind VNets.
- **Backup**: Azure Backup required for all VMs and databases; backups encrypted with CMK.

## Conclusion

The controls and principles of the Sovereign Landing Zone transform abstract sovereignty requirements into concrete, enforceable mechanisms. Through the combination of Azure Policy, confidential computing, customer-managed keys, Customer Lockbox, network isolation, and comprehensive monitoring, the SLZ provides a production-ready framework for sovereignty at scale.

These controls are not static — they evolve as new threats emerge, regulations change, and Azure capabilities expand. The policy-as-code approach ensures that sovereignty controls can be updated, tested, and deployed with the same rigor as application code, enabling organizations to maintain compliance and security posture in a dynamic environment.

In the next chapter, we'll explore **data residency and sovereignty** in greater depth, examining regional compliance, cross-border data transfer considerations, and how to architect multi-region sovereign workloads.

## References

- [SLZ Controls and Principles](https://learn.microsoft.com/en-gb/azure/azure-sovereign-clouds/public/overview-controls-principles)
- [Azure Confidential Computing](https://learn.microsoft.com/en-us/azure/confidential-computing/overview)
- [Azure Policy Overview](https://learn.microsoft.com/en-us/azure/governance/policy/overview)
- [Zero Trust Security](https://learn.microsoft.com/en-us/security/zero-trust/)
- [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview)

---

> **Next:** [Data Residency & Sovereignty →](04-data-residency.md)
