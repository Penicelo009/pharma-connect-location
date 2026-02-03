# PharmaConnect Backend (skeleton)

This folder contains a minimal Node.js + Express backend skeleton with:
- Clean architecture folders (controllers → services → repositories)
- Key-value `kv_store` for StorageService compatibility
- SQL migrations for core tables (Postgres)
- Simple endpoints to mirror `StorageService`: GET/POST/DELETE `/api/storage/:namespace/:key`

Quick start:
1. Copy `.env.example` to `.env` and edit `DATABASE_URL`.
2. Install dependencies: `npm install`.
3. Run migrations: `npm run migrate`.
4. Start server: `npm run dev`.

Running E2E tests locally

These E2E tests require a real PostgreSQL database. You can run one locally with Docker:

1) Start a Postgres container (example):

   docker run --name pharmadb_test -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=pharmadb_test -p 5432:5432 -d postgres:15

2) Set env var for tests (optionally in your shell):

   export TEST_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pharmadb_test

3) Install dependencies and run tests:

   cd backend
   npm install
   npm test

What the tests do:
- Run migrations against `TEST_DATABASE_URL` (so they won't touch your dev DB)
- Run HTTP flows hitting the running app (in-memory via supertest)
- Tests include: upload → lookup → persisted, duplicate concurrent uploads, and guest order link verification

Notes:
- The tests create and remove files under `uploads/prescriptions/` during execution (cleaned up automatically).
- If you'd prefer to use a different Postgres port or credentials, set `TEST_DATABASE_URL` accordingly.

Prescription uploads
- POST /api/prescriptions (multipart/form-data: file=<file>, orderId=<orderId?>, notes=<notes?>, checksum=<sha256>) → 201 { id, status, order_id } or 200 if already exists
  - Supports guest and authenticated uploads; include `checksum` to enable dedup checks
- GET /api/prescriptions/:id → metadata (access controlled: owner/admin/pharmacy)
- GET /api/prescriptions/lookup?checksum=<sha256> → 200 { id, status, order_id } or 404
- POST /api/prescriptions/:id/review { status: approved|rejected, notes? } → admin or pharmacy only

Example upload (curl):
curl -X POST http://localhost:8080/api/prescriptions -F "file=@./myRx.pdf" -F "orderId=123" -F "notes=Uploaded by patient" 

Notes:
- Files are temporarily stored using `multer` and persisted to `uploads/prescriptions/` in the backend project folder.
- `FILE_STORAGE_DRIVER` env var allows swapping to S3-compatible driver later.
- Max upload size is controlled via `MAX_UPLOAD_SIZE` env var (bytes).

Notes:
- This is intentionally minimal and non-breaking. It does not change frontend files.
- `StorageService` will keep running in the frontend; the backend `storage` endpoints provide server-side mirror/fallback and a migration path.

API Versioning
- The application now sets `X-API-Version` header for all responses via `src/middleware/apiVersion.js`. Set `API_VERSION` in the environment to control the value (default: `1`).
- To mark deprecation set `API_DEPRECATION=true` and optionally `API_SUNSET=<ISO date>` to advertise planned sunset date.

[![CI](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml)

Replace `<OWNER>/<REPO>` with your repository path to activate the badge.

Authentication (JWT)
- POST /api/auth/register { email, password, name? }  → 201 user created
- POST /api/auth/login { email, password } → { accessToken, refreshToken, expiresIn }
- POST /api/auth/refresh { refreshToken } → rotates and returns new tokens
- POST /api/auth/logout { refreshToken? } → revoke refresh token (optional)

User endpoints:
- GET /api/users/me  (requires Authorization: Bearer <accessToken>)

Example curl flows:

1) Register
curl -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"secret123","name":"Alice"}'

2) Login
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"secret123"}'

3) Use accessToken
curl -H "Authorization: Bearer <accessToken>" http://localhost:8080/api/users/me

4) Refresh
curl -X POST http://localhost:8080/api/auth/refresh -H "Content-Type: application/json" -d '{"refreshToken":"<refreshToken>"}'

Notes:
- Authentication is optional for existing storage endpoints and guest users remain supported.
- Refresh tokens are persisted to `refresh_tokens` table and rotated on use.
