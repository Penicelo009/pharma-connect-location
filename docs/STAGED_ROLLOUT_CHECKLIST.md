# Staged Rollout Checklist 🚀

Purpose: Provide a safe, observable procedure to release v1.0.0 with minimal risk and the ability to quickly rollback.

## Pre-release ✅
- [ ] CI green for backend, frontend, and E2E jobs
- [ ] All unit & integration tests passing locally and on CI
- [ ] Playwright E2E tests passing against preview build
- [ ] OpenAPI spec reviewed and committed: `docs/openapi_v1.yaml`
- [ ] DB migrations reviewed and smoke-tested on staging (backup available)
- [ ] Security scan / dependency audit passed (no critical findings)
- [ ] Log retention / monitoring (APM) configured for release window
- [ ] Release notes and changelog prepared and reviewed
- [ ] Stakeholder approval obtained (product, security, infra)

## Release window preparations 🕒
- Schedule a low-traffic window for the initial canary
- Ensure a recent DB backup/snapshot is available and tested
- Ensure ability to rollback deploys and DB migrations (if any are destructive)
- Ensure feature flags (or routing) exist to toggle new behavior if needed

## Deployment Plan (Canary → Gradual Rollout)
1. Deploy to Staging
   - Run migrations against a staging DB
   - Run smoke tests (health, API-version header test, E2E)
   - Validate storage fallback behavior and prescription uploads

2. Canary (1% production traffic, 30–60 minutes)
   - Deploy a canary instance with v1.0.0
   - Monitor: error rate, 95/99th latency, prescription upload success rate, order creation rate
   - Run targeted functional smoke tests (API and UI flows)
   - If stable, ramp to 5%

3. Ramp (5% → 25% → 50%)
   - Wait 1–2h at each stage and monitor metrics
   - If regression detected, stop and roll back to prior release

4. Full rollout (100%)
   - After stable ramp, deploy to all instances
   - Run full regression smoke tests, API contract checks

## Monitoring & Success Criteria 📊
- Request error rate (4xx/5xx) does not increase > 0.5% absolute/20% relative (whichever is higher)
- Latency (P95) not degraded by > 25% relative to baseline
- Prescription upload dedup rate low or unchanged; dedup IDs match server records
- Orders created successfully (no rejected-by-policy spikes)
- No new SEV1/SEV2 incidents in 1 hour after each ramp

## Rollback Plan ⛔
- Immediately reverse deployment orchestration to the previous release image
- If DB migration is non-reversible and causes issues, restore DB from pre-release backup snapshot
- Reopen canary at smaller percentage after fix and additional test validations

## Post-release 📣
- Document any follow-up tickets (performance, UX, monitoring gaps)
- Announce release to stakeholders with downtime/impact notes (if any)
- Update `CHANGELOG.md` and release metadata on GitHub
- Schedule a post-mortem if incidents occurred

## Owners & Approvals
- Release owner: @product-owner (or person responsible)
- Approvers required: Product, Security, Infrastructure
- On-call for rollback: Backend lead, DevOps

---
_Last updated: 2026-02-02_
