# **🚨 Demo Plan: Explaining GitHub's Secret Scanning Alerts for Partners**

---

## **1. Introduction**

The purpose of **Secret Scanning Alerts for Partners**:

- **🔍 What it does**: Automatically detects exposed secrets in public repositories and npm packages.
- **⚠️ Why it matters**: Prevents unauthorized access to services and protects both users and service providers.

---

## **🔒 Secret Scanning for Public and Private Repositories**

### **🌐 Public Repositories**

#### **Provider Patterns**:
- GitHub scans public repositories for secrets matching patterns provided by service providers (e.g., AWS, Slack, GitHub).

**📢 Notification**:
- The service provider is notified directly.
- The repository owner is also alerted via the **Secret Scanning Alerts** section.

**✅ Action**:
- The service provider validates the secret and may revoke it, issue a new one, or contact the user.
- The repository owner can take additional steps, such as **removing the secret** and **rotating it**.

#### **Non-Provider Patterns**:
- GitHub scans for generic secrets (e.g., passwords, API keys) that do not belong to a specific provider.

**📢 Notification**:
- Only the repository owner is notified.

**✅ Action**:
- The repository owner must manually handle the secret by **revoking**, **rotating**, or **securing it**.

### **🔒 Private Repositories**

#### **Provider Patterns**:
- GitHub scans private repositories for secrets matching provider patterns.

**📢 Notification**:
- Only the repository owner is notified.
- The service provider is **not notified** to maintain privacy.

**✅ Action**:
- The repository owner must handle the secret by **revoking**, **rotating**, or **securing it**.

#### **Non-Provider Patterns**:
- GitHub scans for generic secrets in private repositories.

**📢 Notification**:
- Only the repository owner is notified.

**✅ Action**:
- The repository owner must manually address the issue.

### **🔑 Key Differences Between Public and Private Repositories**
- **🌐 Public Repositories**: Both the service provider and the repository owner are notified for provider patterns.
- **🔒 Private Repositories**: Only the repository owner is notified, regardless of the pattern type, to ensure privacy.

---

## **2. Key Concepts**

Explain the workflow in simple terms:

- **🕵️ Detection**: GitHub scans public repositories for secrets using patterns provided by service providers (e.g., AWS, Slack, Stripe).
- **📢 Notification**: If a secret is detected, GitHub notifies the service provider directly.
- **✅ Validation**: The service provider validates the secret and decides whether to revoke, replace, or contact the user.
- **🔧 Fixed Configuration**: Secret scanning for partner patterns cannot be disabled or modified for public repositories.

---

## **3. Examples**

Provide relatable examples to help them understand:

### **Example 1: AWS Access Key**

- **Scenario**: A developer accidentally commits an AWS access key (`AKIA1234567890ABCDEF`) to a public repository.
- **🕵️ Detection**: GitHub’s secret scanning detects the key using AWS’s pattern (`AKIA[0-9A-Z]{16}`).
- **📢 Notification**: GitHub notifies AWS about the exposed key.
- **✅ Action**: AWS validates the key and revokes it to prevent misuse. They may issue a new key or contact the user.

### **Example 2: Slack Webhook URL**

- **Scenario**: A developer commits a Slack webhook URL (`https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`) to a public repository.
- **🕵️ Detection**: GitHub detects the webhook URL using Slack’s pattern.
- **📢 Notification**: GitHub informs Slack about the exposed webhook.
- **✅ Action**: Slack disables the webhook to prevent unauthorized messages and may notify the user.

### **Example 3: GitHub Personal Access Token**

- **Scenario**: A developer accidentally commits a GitHub personal access token (`ghp_ABC1234567890defGHIJKLMNOPQRSTuvwXYz`) to a public repository.
- **🕵️ Detection**: GitHub’s secret scanning detects the token using its pattern.
- **📢 Notification**: GitHub revokes the token to prevent unauthorized access.
- **✅ Action**: The developer is notified to generate a new token and update any integrations using the old token.

### **Example 4: JIRA API Token**

- **Scenario**: A developer commits a JIRA API token (`dXNlcm5hbWU6cGFzc3dvcmQ=`) to a public repository.
- **🕵️ Detection**: GitHub detects the token using JIRA’s defined pattern.
- **📢 Notification**: JIRA disables the token to prevent misuse.
- **✅ Action**: The developer is notified to generate a new token and secure it properly.

### **Example 5: Azure API Management (APIM) Key**

- **Scenario**: A developer accidentally commits an Azure APIM subscription key (`Ocp-Apim-Subscription-Key=1234567890abcdef1234567890abcdef`) to a public repository.
- **🕵️ Detection**: GitHub’s secret scanning detects the key using Azure’s defined pattern.
- **📢 Notification**: GitHub informs Azure about the exposed key.
- **✅ Action**: Azure revokes the subscription key to prevent unauthorized access and notifies the developer to generate a new key and update their applications.

### **Example 6: Azure Storage Account Key**

- **Scenario**: A developer accidentally commits an Azure Storage Account key (`DefaultEndpointsProtocol=https;AccountName=example;AccountKey=abcd1234efgh5678ijkl91011mnop12qrstuv34wxyz5678abcd91011efgh1234;EndpointSuffix=core.windows.net`) to a public repository.
- **🕵️ Detection**: GitHub’s secret scanning detects the key using Azure’s defined pattern.
- **📢 Notification**: GitHub informs Azure about the exposed key.
- **✅ Action**: Azure revokes the storage account key to prevent unauthorized access and notifies the developer to regenerate the key and update their configurations.

### **Example 7: Figma Personal Access Token**

- **Scenario**: A developer accidentally commits a Figma personal access token (`figd_1234567890abcdef1234567890abcdef12345678`) to a public repository.
- **🕵️ Detection**: GitHub’s secret scanning detects the token using Figma’s defined pattern.
- **📢 Notification**: GitHub informs Figma about the exposed token.
- **✅ Action**: Figma revokes the token to prevent unauthorized access and notifies the developer to generate a new token and update their integrations.

### **Example 8: MongoDB Connection String**

- **Scenario**: A developer accidentally commits a MongoDB connection string (`mongodb+srv://username:password@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`) to a public repository.
- **🕵️ Detection**: GitHub’s secret scanning detects the connection string using MongoDB’s defined pattern.
- **📢 Notification**: GitHub informs MongoDB about the exposed connection string.
- **✅ Action**: MongoDB disables the connection string to prevent unauthorized access and notifies the developer to generate a new connection string and update their application configurations.

### **Example 9: NuGet API Key**

- **Scenario**: A developer accidentally commits a NuGet API key (`nuget_1234567890abcdef1234567890abcdef`) to a public repository.
- **🕵️ Detection**: GitHub’s secret scanning detects the API key using NuGet’s defined pattern.
- **📢 Notification**: GitHub informs NuGet about the exposed API key.
- **✅ Action**: NuGet revokes the API key to prevent unauthorized access and notifies the developer to generate a new key and update their project configurations.

---

## **4. Live Demo Steps**

Walk them through a simulated scenario:

### **Step 1: Create a Public Repository**

Create a new public repository on GitHub (e.g., `demo-secret-scanning`).

### **Step 2: Commit a Sample Secret**

Add a file with a sample secret (e.g., AWS access key):

```bash
echo "AWS_ACCESS_KEY=AKIA1234567890ABCDEF" > secrets.env
git add secrets.env
git commit -m "Add test AWS key"
git push
```

### **Step 3: Wait for Detection**

- Explain that GitHub will automatically scan the repository for secrets.
- Show them where secret scanning alerts appear (**Security → Secret Scanning**).

### **Step 4: Explain Partner Notification**

- Emphasize that GitHub notifies the service provider (e.g., AWS) directly, not the repository owner.
- Discuss how the provider validates and acts on the secret.

---

## **5. Key Takeaways**

Summarize the benefits:

- **🔐 Proactive Security**: Detects secrets before they can be exploited.
- **✅ Provider Validation**: Ensures exposed secrets are handled by the service provider.
- **🔧 Fixed Configuration**: Public repositories always have partner patterns enabled for secret scanning.

---

## **6. Q&A**

Encourage questions:

- **❓ Q**: What happens if a secret is detected in a private repository?  
  **💡 A**: Alerts are sent to the repository owner, not the provider.

- **❓ Q**: Can we disable secret scanning for public repositories?  
  **💡 A**: No, partner patterns are always enabled for public repositories.

---

## **7. Closing Example**

End with a relatable analogy:

> “GitHub Secret Scanning is like an airport security scanner for your code — always-on, pattern-aware, and impossible to bypass, ensuring no sensitive keys board your repository unnoticed.”

Think of your repository as an airport terminal, and your code commits as passengers carrying luggage (the code). GitHub Secret Scanning is like the airport’s security X-ray system — scanning every piece of luggage for dangerous or sensitive items.