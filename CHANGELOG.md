# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-02-02
### Added
- Backend: Production-grade API with JWT authentication (access + refresh), role-based access control, API version header enforcement (`X-API-Version: 1`).
- Backend: Orders lifecycle and single-pharmacy enforcement, prescription review workflow, secure file upload with checksum deduplication, refresh token rotation.
- Frontend: React widget-based migration (PrescriptionUpload, CartDrawer, PharmacyCard, MedicineCard, CheckoutPage), StorageAdapter with backend mirror & client fallback.
- Offline-first: Pending prescription local queue, sync worker, and idempotent uploads via checksum.
- Tests: Unit, integration and Playwright E2E test for pharmacy → checkout flow.
- CI: GitHub Actions to run backend tests, frontend tests and Playwright E2E; API contract checks that enforce `X-API-Version`.
- Docs: OpenAPI v1 spec and staged rollout checklist.

### Changed
- No breaking changes to existing embedded widgets or StorageService contract; design preserves backward compatibility.

### Notes
- DB migrations are included; run `npm run migrate` in `backend` before upgrading the service.
- Release includes a staged rollout checklist and monitoring guidance.

---
