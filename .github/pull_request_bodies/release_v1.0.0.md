**Title:** chore(release): v1.0.0 — productionize pharmacy marketplace

**Description**
This PR prepares and bundles the v1.0.0 release which productionizes the Pharmacy marketplace MVP. It includes backend features (auth, orders, prescriptions), frontend widget integrations (PharmacyCard, CheckoutPage), offline-first prescription uploads with checksum dedup, comprehensive tests (unit, integration, Playwright E2E) and CI jobs to validate the API contract (`X-API-Version: 1`).

**Key changes**
- Backend: JWT access + refresh, refresh token rotation, role-based middleware, orders lifecycle & business rules, prescription upload + dedup, storage endpoints, DB migrations.
- Frontend: Embeddable widgets for progressive migration (PrescriptionUpload, CartDrawer, PharmacyCard, CheckoutPage), `storageAdapter`, offline pending queue, Playwright E2E test.
- Tests & CI: Jest unit tests, Playwright E2E; GitHub Actions for backend, frontend, and E2E.
- Docs: OpenAPI spec, staged rollout checklist, release notes, changelog, PR template.

**Upgrade steps**
1. Ensure DB backup is taken.
2. Run backend migrations:
   - `cd backend && npm ci && npm run migrate`
3. Deploy backend image for canary (1% traffic) and run smoke tests (health, E2E, API header).
4. Ramp to higher percentages according to `docs/STAGED_ROLLOUT_CHECKLIST.md`.

**How to test locally**
1. Backend:
   - `cd backend && npm ci && npm run migrate && npm start`
2. Frontend:
   - `cd frontend && npm ci && npm run build && npm run preview -- --port 5173`
3. Playwright:
   - `cd frontend && npx playwright install --with-deps && npm run test:e2e`
4. Run unit & integration tests:
   - `npm test` (root/components as applicable)

**Security & compatibility**
- No breaking changes to the embedded widget contract or `StorageService` API; old consumers should continue to work.
- Run a dependency audit and address any critical findings before merging.

**Checklist**
- [ ] CI is green (backend, frontend, E2E)
- [x] Tests added/updated where needed (unit/integration/E2E)
- [x] Migrations present and reviewed (`backend/migrations/`)
- [x] OpenAPI/Docs updated (`docs/openapi_v1.yaml`)
- [x] CHANGELOG updated with v1.0.0 entry
- [x] Release notes drafted (`docs/RELEASE_NOTES_v1.0.0.md`)
- [ ] Security review / dependency audit complete
- [ ] Stakeholder approval obtained

**Rollback & mitigation**
- Revert deployment and restore DB from backup if needed. Follow `docs/STAGED_ROLLOUT_CHECKLIST.md` for escalation and rollback.
