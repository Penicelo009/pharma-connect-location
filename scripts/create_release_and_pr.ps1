param(
  [string]$Branch = 'release/v1.0.0',
  [string]$Base = 'main'
)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Write-Error 'git is required'; exit 1 }
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { Write-Error 'gh (GitHub CLI) is required'; exit 1 }

if (-not (git rev-parse --is-inside-work-tree 2>$null)) { Write-Error 'Not a git repo. Run these commands from your local clone.'; exit 1 }

git checkout -b $Branch
try { git add -A; git commit -m 'chore(release): prepare v1.0.0 release notes and PR body' } catch { Write-Host 'No changes to commit' }

git push -u origin $Branch

$pr = gh pr create --title 'chore(release): v1.0.0 — productionize pharmacy marketplace' --body-file .github\pull_request_bodies\release_v1.0.0.md --base $Base --assignee @me --label release --draft
Write-Host "PR created: $pr"

git tag -a v1.0.0 -m 'Release v1.0.0'
git push origin v1.0.0

gh release create v1.0.0 --title 'v1.0.0 — Production release' --notes-file .github\release-notes\v1.0.0.md --draft
Write-Host 'Draft release v1.0.0 created. Open the PR and request approvals, then publish the release when ready.'
