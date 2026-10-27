# GHAS POC - Security Testing Demo

## Warning
This repository intentionally contains **vulnerable dependencies** and **fake secrets** to trigger GitHub Advanced Security (GHAS) alerts.
**Do not reuse any of it in real projects.**

## Purpose
Demonstrate the three GHAS categories at repository level:
- **Secret scanning** (Secret Protection)
- **Code scanning** (CodeQL)
- **Dependabot** (alerts, security updates, version updates)

Setup steps for each feature are in [GHAS_ReadMe.md](doc/GHAS_ReadMe.md).

## Project Structure
```
├── .github/
│   ├── dependabot.yml          # Version updates: github-actions, npm (/ and /javascript), bundler (/ruby)
│   ├── secret_scanning.yml     # Secret scanning exclusions (doc/**)
│   └── workflows/
│       ├── codeql.yml          # CodeQL: javascript-typescript, ruby, actions
│       ├── android.yml         # Legacy workflow (outdated actions)
│       └── greetings.yml
├── config/
│   └── demo-secrets.env        # Fake secrets for secret scanning
├── doc/                        # Docs (excluded from secret scanning)
├── javascript/                 # npm project (package.json, package-lock.json, yarn.lock)
├── ruby/                       # Bundler project (Gemfile, Gemfile.lock)
├── package.json                # Root npm project for vulnerable-demo.js (pinned vulnerable versions)
├── package-lock.json
├── vulnerable-demo.js          # Demo script (npm start)
└── doc/
    └── GHAS_ReadMe.md          # GHAS configuration guide
```

## 1. Secret Scanning

[config/demo-secrets.env](config/demo-secrets.env) contains fake credentials covering each detection category:

| Category | Samples | Required setting |
|----------|---------|------------------|
| Provider (partner) patterns | AWS key pair, Google API key, Slack webhook, Azure Storage connection string | Secret Protection |
| Non-provider (generic) patterns | Postgres / MongoDB connection strings, HTTP basic auth URL | Scan for non-provider patterns |
| Generic passwords | `ADMIN_PASSWORD` | Use AI detection (Copilot secret scanning) |
| Custom pattern | `INTERNAL_SERVICE_TOKEN` (`ghasdemo_[A-Za-z0-9]{32}`) | Custom pattern defined in repo settings |

Notes:
- If **push protection** is enabled before the first push, the push is blocked. Bypass it or enable push protection afterwards to demo blocking.
- Some fake values may not raise alerts if the provider pattern requires a valid checksum or format.
- `doc/**` is excluded via [.github/secret_scanning.yml](.github/secret_scanning.yml).

## 2. Code Scanning (CodeQL)

[.github/workflows/codeql.yml](.github/workflows/codeql.yml) runs on push / PR to `main` and weekly, analyzing:
- `javascript-typescript`
- `ruby`
- `actions` (GitHub Actions workflows, e.g. outdated/unpinned actions in `android.yml`)

Do not enable CodeQL **Default setup** at the same time; it conflicts with this advanced workflow.

## 3. Dependabot

Declared dependencies and known advisories:

| Ecosystem | Package | Locked version | Known issue |
|-----------|---------|----------------|-------------|
| npm (root) | **minimist** | 1.2.5 | CVE-2021-44906 - Critical, prototype pollution |
| npm (root) | **lodash** | 4.17.15 | CVE-2020-8203, CVE-2021-23337 - High, prototype pollution / command injection |
| npm (root) | **moment** | 2.24.0 | CVE-2022-24785, CVE-2022-31129 - High, path traversal / ReDoS |
| npm (root) | **node-forge** | 0.10.0 | Multiple CVEs (e.g. CVE-2022-24771/24772) - High, signature verification |
| npm | **hot-formula-parser** | 3.0.0 (package-lock.json) | CVE-2020-6836 - Critical, arbitrary code injection |
| npm | **lodash** | 4.17.20 | CVE-2021-23337 - High, command injection; CVE-2020-28500 - Medium, ReDoS |
| bundler | **business** | 1.0.0 | Outdated - version update PR expected |
| bundler | **uk_phone_numbers** | 0.1.0 | Outdated - version update PR expected |
| github-actions | `actions/checkout@v1`, `actions/setup-java@v1` | v1 | Outdated - version update PR expected |

Alert counts shown in GitHub are authoritative; the table above is indicative.

## Testing Locally

Build and run the demo script (from the repo root):
```bash
npm install
npm start        # runs node vulnerable-demo.js
npm audit
```

Audit the `javascript/` project:
```bash
cd javascript
npm install
npm audit
```

Do not run `npm audit fix` - it removes the vulnerable versions this demo depends on.

## Expected Results (Security tab)
1. **Secret scanning alerts** for the samples in `config/demo-secrets.env`
2. **Code scanning alerts** from CodeQL
3. **Dependabot alerts** and security update PRs for npm packages (root and `javascript/`)
4. **Dependabot version update PRs** for npm, bundler and GitHub Actions

## Legal Notice
This application is for educational and testing purposes only. The maintainers are not responsible for any misuse of the vulnerabilities demonstrated herein.