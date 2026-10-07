# Phase 0 Survey — scilent-ui (Oct 7, 2026)

Read-only survey. Nothing committed, stashed, deleted, or reorganized.

## 1. Branch map (18 local, 15 remote)

All commits verified against `main` (a711c37, = dev):

| Branch                                                                                                                                               | Ahead of main | State                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------- |
| landing-page ★ current                                                                                                                               | 5             | Active work: docs/OSS plan commit 2854ab5 + landing page styling (WIP below)     |
| SCI-93-search-component                                                                                                                              | 1             | feat: init search component — the only merged-looking-but-unmerged ticket branch |
| main                                                                                                                                                 | —             | 1 behind origin/main (origin has a README.md GitHub edit, 3f2282b)               |
| dev                                                                                                                                                  | 0             | Identical to main                                                                |
| next                                                                                                                                                 | 0             | Fully merged; stale                                                              |
| npm-publish                                                                                                                                          | 0             | Fully merged; obsolete — packages already on npm                                 |
| SCI-103/104/77/88/91, HC-031825, album-artwork, album-artwork-component, artist-label, hotfix-albumArtwork-docs, hotfix-docs-links, init-example-uis | 0             | All fully merged into main; all stale (last touched Mar–Apr 2025)                |

Note: main is 1 behind origin/main (a GitHub web README edit). Trivial fast-forward available.

## 2. WIP inventory (do not touch)

**Stash "music-player-ui"** (on dev, 14 files, +3165/−191): MusicPlayer.tsx (983 lines), Card, AlbumArtwork, Slider, IconButton work, sampleData.ts. This looks like an EARLIER SNAPSHOT of the same work now sitting uncommitted in the working tree — the working tree has the MusicPlayer.tsx→MusicPlayer/ dir refactor, Card/, sampleData.ts, plus new items (packages/themes/ — @scilent-ui/themes 0.0.1 scaffold, jest.config.js, jest.setup.js, MagicCard.tsx). Recommendation for Donovan: confirm the working tree supersedes the stash, then drop the stash. Pop it only if any file differs.

**Working tree (~20 items)**: core component work (AlbumArtwork +116, Slider +214, IconButton +200, Timestamp, MusicPlayer dir refactor, new Card/, icons: Play/Pause deleted from icons pkg — possibly moved into core MusicPlayer), untracked packages/themes/, jest config, showcase MagicCard.tsx.

## 3. Tooling triage

- **commitlint: FIXED.** `pnpm install` (fresh, 19.9s) restored module resolution; `conventional-changelog-conventionalcommits` now resolves. Verified: valid messages pass, `xyz:` and empty-subject correctly fail with type-enum/subject-empty errors. Root cause: node_modules was out of sync with the lockfile (pnpm prompted "modules directories will be removed and reinstalled" — that was the tell).
- **Build: PASS.** turbo build 3/3 successful (core, icons, showcase), 14s.
- **Tests: NOMINAL PASS / actually hollow.** `jest --passWithNoTests` in both core and icons → "No tests found". Zero real tests exist. The untracked jest.config.js/jest.setup.js are the beginning of fixing this. This is the biggest quality gap before Phase 1.
- **Turbo warnings**: test tasks declare no `outputs` key — cosmetic, fix later.

## 4. npm position (CORRECTION to PLAN.md)

PLAN.md says "NOT yet on npm" — **stale**. Actual state:

- `@scilent/core@2.0.0` — published 2025-03-07, last updated 2025-03-18
- `@scilent/icons@1.1.0` — published 2025-03-18
- Maintainer: donovanallen (only). Org `scilent` exists on registry with both packages at write access.
- `@scilent-ui/themes` — NOT published (untracked local scaffold only, 0.0.1)
- Unclaimed/available: `scilent-ui` (unscoped) and the `@scilent-ui` org scope — both 404.
- Local CLI is NOT authenticated (`npm whoami` → E401) — publishing would need a fresh login/token.

## 5. Registry groundwork (design, read-only)

shadcn registry structure (from ui.shadcn.com/docs/registry):

- Root `registry.json`: `$schema`, `name`, `homepage`, `items[]` (or `include` for multi-file composition).
- Each item: `name`, `type` (`registry:ui` for single-file primitives, `registry:component` for simple components, `registry:block` for multi-file compositions), `title`, `description`, `dependencies`, `registryDependencies`, `files[{path,type,target}]`, `cssVars`, `docs`, `categories`.
- Served as JSON at `https://scilent-ui.com/r/<item>.json`; CLI installs via `npx shadcn add <url>`. Build with `shadcn build`. Zod schemas exported from `shadcn/schema` for CI validation.

**Proposed layout** for the 10 core components (ArtistLabel, Auth, MetadataLabel + Artwork, Card, IconButton, MusicPlayer, Slider, Timestamp, AlbumArtwork):

- `packages/registry/` (new) — but note the WIP Card/ and MusicPlayer/ in the working tree are exactly the registry's future source material; registry scaffolding should wait for Donovan's WIP to land to avoid duplicate divergence.
- Items: single-file components → `registry:ui`; MusicPlayer (player + transport + artwork integration) → `registry:block` with registryDependencies on slider/iconbutton/artwork; icons as `registry:lib` or their own items; themes as a `registry:theme` item once packages/themes is real.
- Every item carries `dependencies` (radix etc.) and `registryDependencies` explicitly, plus `docs` and a11y notes per PLAN.md rules.
- `dependencies` versions must be pinned ranges so copy-paste installs work outside the monorepo.

## 6. Cleanup execution (Oct 7 — approved by Donovan via @personal-cto)

- main fast-forwarded to origin/main (a711c37 → 3f2282b, GitHub README edit).
- Deleted 14 local branches (all verified merged via merge-base before -d): SCI-103-slider,
  SCI-104-icon-button, SCI-77-icons-pkg, SCI-88-init-radix-styled, SCI-91-timestamp,
  HC-031825, album-artwork, album-artwork-component, artist-label, hotfix-albumArtwork-docs,
  hotfix-docs-links, init-example-uis, next, npm-publish. Same 12 on origin (verified via
  ls-remote; dev intentionally kept as trunk alias). Remaining: main, dev, landing-page,
  SCI-93-search-component (local + origin).
- PLAN.md npm facts updated (packages already published; scopes available; CLI unauthenticated).
- WIP working tree and untracked files untouched, per Donovan's "parked" decision.

## 7. Stash disposition — RESOLVED (Donovan approved option a, Oct 7)

The 3 stash-only story variants (VariantComparison, SizeAndThemeComparison, ControlOptions)
were ported from the stash's MusicPlayer.stories.tsx into the working tree's
MusicPlayer/MusicPlayer.stories.tsx (adapted to tree conventions; all props and
SAMPLE_TRACKS keys verified to exist in the current components). Verified: core build
passes, `tsc --noEmit` passes, 5 stories present (Default, VariantComparison,
SizeAndThemeComparison, ControlOptions, PlatformComparison). Stash "music-player-ui"
dropped (was ee28df8d) AFTER verification, per the keep-until-builds rule.

Final state: working tree = the same 20 parked WIP entries (stories port lives inside the
untracked MusicPlayer/ dir); stash list empty; branches = main, dev, landing-page,
SCI-93-search-component only. Nothing else changed.

Historical proposal (superseded by §6 above — items 1 done; see §7 for stash):

1. Fast-forward `main` to origin/main (README edit).
2. Land or branch the landing-page WIP (5 ahead + ~20 dirty files). The stash "music-player-ui" appears superseded by the working tree — confirm, then drop.
3. Delete the 12 fully-merged stale branches (SCI-\* x5, HC-031825, album-artwork x2, artist-label, hotfixes x2, init-example-uis, next, npm-publish) — locally and on origin, after WIP lands.
4. Update PLAN.md: npm packages already exist; themes held back as planned.
5. Phase 1 blockers before any publish: real tests for core, main auth token, changeset for themes if/when real.
