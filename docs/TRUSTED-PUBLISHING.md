# npm Trusted Publishing — scilent-ui Runbook

Status: configured on the repo side (this runbook), awaiting Donovan's npmjs.com
trusted-publisher entries for both packages. No long-lived npm secret exists or is
needed anywhere in the pipeline after this migration.

## What trusted publishing is

When the Release workflow runs, npm (>= 11.5.1) mints a **short-lived OIDC token**
from GitHub Actions' `id-token` and presents it to registry.npmjs.org. npm checks
the token's claims — repository, workflow filename, environment — against the
**trusted publisher** you configured on npmjs.com. If they match, the publish is
authorized for that one run. There is no long-lived token to rotate, leak, or scope;
the "token hygiene" problem disappears entirely.

## Prerequisites (repo side — DONE)

- `.github/workflows/release.yml` (the exact filename npm will trust — renaming it
  breaks publishes):
  - `permissions: id-token: write` + `contents: write` + `pull-requests: write`
  - npm upgraded to latest (>= 11.5.1) via `npm install -g npm@latest` before publish
  - publish path contains **no** token secrets (NODE_AUTH_TOKEN/NPM_TOKEN removed)
  - `NPM_CONFIG_PROVENANCE: true` — provenance statements ride along
  - `workflow_dispatch` added so releases can be re-run manually
- Repo secret `NODE_AUTH_TOKEN` may be deleted from repo Settings → Secrets (the
  granular token itself can also be revoked on npmjs.com — keep the npmjs account
  itself, obviously).
- Changesets flow unchanged: version PRs accumulate on main; merging a version PR
  publishes on the next Release run. npm validates the publisher config per run.

## Donovan's npmjs.com steps (exact click-path, ~2 min per package)

For **both** `@scilent/core` and `@scilent/icons`:

1. Open the package page:
   - https://www.npmjs.com/package/@scilent/core
   - https://www.npmjs.com/package/@scilent/icons
2. Click **Package Settings** (tab on the package page, requires owner login).
3. Scroll to **Publishing access**.
4. Under **Trusted publishers**, click **Add trusted publisher**.
5. Enter exactly these values:

| Field                  | Value                           |
| ---------------------- | ------------------------------- |
| Repository owner       | `donovanallen`                  |
| Repository name        | `scilent-ui`                    |
| Workflow filename      | `.github/workflows/release.yml` |
| Environment (optional) | leave **empty** (see below)     |

6. Save. Repeat for the other package.

### Environment note (recommendation: none for now)

Our workflow defines no GitHub `environment:` — leave the npmjs Environment field
empty to match. If we later add an environment (e.g. `release` with required
reviewers as an extra gate), come back and add that same name here on both
packages. Adding an environment is a recommended hardening follow-up, not required
for the first publish.

## How to test (after Donovan's npmjs entries)

The versions are already bumped on main (core 2.1.0, icons 1.1.1) and unpublishable
packages were already filtered by changesets, so one empty commit re-runs Release:

```bash
git checkout main && git pull
git commit --allow-empty -m "ci: trigger release publish (trusted publishing)"
git push origin main
```

Then: repo → **Actions** → **Release** run on main. Watch for
`npm notice publish Signed provenance statement` in the "Create Release PR or
Publish to npm" step. Verify after with:

```bash
npm view @scilent/core version   # expect 2.1.0
npm view @scilent/icons version  # expect 1.1.1
```

And check the provenance flag on the package pages (shows "Published with
provenance" / a linked sigstore transparency-log entry).

## Rollback

If trusted publishing fails for a reason that can't be fixed quickly:

1. Regenerate a granular npm token scoped to `@scilent/core` + `@scilent/icons`
   (read and write).
2. Repo Settings → Secrets and variables → Actions → add/update `NODE_AUTH_TOKEN`.
3. Re-add to the changesets env in `.github/workflows/release.yml`:
   `NODE_AUTH_TOKEN: ${{ secrets.NODE_AUTH_TOKEN }}` and `NPM_TOKEN: ${{ secrets.NODE_AUTH_TOKEN }}`
   (changesets' publish reads NPM_TOKEN).
4. Remove the `npm install -g npm@latest` step only if it's the problem (it isn't
   required for token publishing).

## First-publish discipline (standing rule)

The first real npm publish is public-facing: it waited for Donovan's explicit go
(the PR #20 merge was that go). Subsequent version-PR merges publish automatically
per the changesets flow — Donovan can watch the Releases tab / Actions for cadence.
