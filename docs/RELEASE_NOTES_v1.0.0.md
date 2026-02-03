# Release Notes — v1.0.0 (2026-02-02)

Summary:
- This release productionizes the Pharmacy marketplace MVP with secure authentication, order and prescription workflows, storage abstraction, and offline-first support.

Key Features:
- JWT-based auth + refresh rotation; role-based endpoints for admin review.
- Orders: single-pharmacy enforcement, subscription checks, transactional creation, lifecycle statuses (pending, approved, rejected, completed).
- Prescriptions: secure upload (multer), checksum deduplication, review workflow, offline sync and pending queue.
- Frontend: Embeddable React widgets (non-breaking), `PharmacyCard` and `CheckoutPage` integrated for migration.
- Tests: Playwright E2E for pharmacy selection → checkout flow; CI job added.

DB & Migration Notes:
- Migration files located in `backend/migrations/` (001..005). Migrations are additive and non-destructive; still, take backups before applying in production.
- Ensure `TEST_DATABASE_URL` / `DATABASE_URL` environment variables are correctly set in CI/production.

API Contract:
- All API endpoints return `X-API-Version: 1` header; CI will fail if missing.
- OpenAPI spec available at `docs/openapi_v1.yaml`.

Operational Considerations:
- StorageService: current implementation supports local storage and has an abstraction to add S3/Azure later. Ensure S3 credentials and bucket are configured before switching drivers.
- Monitoring: Set alerts on `5xx rate`, `P95 latency`, and `prescription upload error rate` during rollout.

Rollback & Recovery:
- If deployment causes regressions, revert to the previous image and, if migrations were destructive, restore DB from pre-release snapshot.

Contact & Support:
- Release owner: your on-call/maintainer (add GitHub usernames here)

---
