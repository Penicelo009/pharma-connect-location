# PharmaConnect&Location — Repository

[![CI](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml)

Replace `<OWNER>/<REPO>` with your GitHub organization and repository name to activate the badge.

Notes
- CI workflow is defined at `.github/workflows/ci.yml` and runs backend & frontend tests, plus enforces `X-API-Version` header.
- After pushing the branch and creating a PR, GitHub Actions will run the workflow and the badge will display the status.

How to update badge (example)
- For repository `your-org/pharmaconnect` replace the badge URL with:

  [![CI](https://github.com/your-org/pharmaconnect/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/pharmaconnect/actions/workflows/ci.yml)

---

If you'd like, I can also add the badge to `backend/README.md` and `frontend/README.md` for direct visibility in those folders. Reply `also-backend` or `also-frontend` to apply.