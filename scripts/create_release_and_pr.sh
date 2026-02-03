#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/create_release_and_pr.sh [branch-name]
BRANCH=${1:-release/v1.0.0}
BASE=${2:-main}
TAG=v1.0.0

if ! command -v git >/dev/null 2>&1; then
  echo "git is required"; exit 1
fi
if ! command -v gh >/dev/null 2>&1; then
  echo "gh (GitHub CLI) is required. Install from https://cli.github.com/"; exit 1
fi

# Ensure inside a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repo. Run these commands from your local clone."; exit 1
fi

# Create branch, commit prepared files, push
git checkout -b "$BRANCH"
# It's expected you staged desired changes already; if not, stage them
git add -A
git commit -m "chore(release): prepare v1.0.0 release notes and PR body" || echo "No changes to commit"

echo "Pushing branch $BRANCH"
git push -u origin "$BRANCH"

# Create PR
PR_URL=$(gh pr create --title "chore(release): v1.0.0 — productionize pharmacy marketplace" --body-file .github/pull_request_bodies/release_v1.0.0.md --base "$BASE" --assignee @me --label release --draft)

echo "PR created: $PR_URL"

# Tag and push tag
git tag -a "$TAG" -m "Release $TAG"
git push origin "$TAG"

# Create GitHub release (draft) using prepared notes
gh release create "$TAG" --title "v1.0.0 — Production release" --notes-file .github/release-notes/v1.0.0.md --draft

echo "Draft release $TAG created. Open the PR and request approvals, then publish the release when ready."
