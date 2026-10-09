# Registry architecture review — Phase 1.5

Scope: `packages/registry` (index `registry.json` + per-item `r/<slug>.json`,
generator `scripts/generate-registry.mjs`), as of Oct 2026, 8 published items.
Reviewer: @scilent-ui (Phase 1.5 critical pass). Status: findings only — nothing
here was changed without a separate go.

## What the current structure gets right

- Single source of truth: everything is generated from `packages/core/src` by
  one script, with the transitive import closure collected automatically. No
  hand-maintained file lists to drift.
- Per-item JSON inlines full file content (shadcn `registry-item` schema), so
  `npx shadcn add` works with zero server-side logic — a static file host is
  enough. That fits the "build deploy-ready, no deploy yet" posture.
- `registryDependencies` on the music-player block correctly chains the six
  component items it composes, so one install pulls a working tree.

## Findings

### 1. Naming is fine; keep kebab-case slugs, reconsider titles later

Slugs (`music-player`, `album-artwork`, …) and `title`s (PascalCase component
names) are consistent and generated. No action now. One wrinkle: `Artwork/`
directory vs `album-artwork` slug works because slugs are derived from
component names, not paths — but if a component is ever renamed in code, the
slug changes and breaks the published URL. Recommendation: pin slugs in an
explicit map inside the generator (slug = stable API), rather than deriving
them forever.

### 2. Block entries inline duplicate content — acceptable, but know the cost

`music-player.json` inlines 16 files including the full source of every
component it also lists under `registryDependencies`. That's deliberate
(shadcn does the same for blocks) but the file is already ~100 KB of JSON and
will grow with every dependency. Alternatives considered:

- Content-less block + pure `registryDependencies`: cleaner, but a single-file
  consumer fetching only the block JSON gets an install that requires N
  network fetches against `scilent-ui.dev` (domain TBD) — more failure modes
  at the point we can't yet control hosting.
- Keep inlining. Recommended for now; revisit if blocks exceed ~1 MB.

### 3. `registryDependencies` hardcodes absolute URLs

Entries point at `https://scilent-ui.dev/r/<slug>.json`. The shadcn schema
also supports bare item names (`"metadata-label"`) which resolve relative to
the registry URL the user invoked. Bare names are more portable across
mirrors/self-hosting and survive a domain change without regeneration.
Recommendation: switch to bare names at the next regeneration.

### 4. Dependency pins in the generator will silently drift

`EXTERNAL_DEPS` hardcodes `styled-components@^6.1.15`, `react-icons@^5.4.0`,
etc. while core's own package.json says `react-icons@^5.5.0`. A consumer
installing the registry gets 5.4 while the npm package ships 5.5 — the exact
split-version friction class we just fixed for @types/react (see
`packages/icons/src/react19.ts`). Recommendation: read versions from
`packages/core/package.json` at generation time instead of duplicating them.

### 5. Themes as `registry:theme` — right long-term shape, not yet

`packages/themes` currently ships ThemeProvider + light/dark/vintage themes +
token modules. Mapping each theme to a `registry:theme` item that installs a
CSS-variables file is the correct long-term model: themes are exactly the
"copy it and own it" artifact class the registry exists for, and it matches
shadcn's theme-item semantics.

Not yet, because:

- The tokens are TypeScript objects consumed via ThemeProvider, not CSS custom
  properties — a registry theme item that "just works" copied into an arbitrary
  app needs the CSS-variable layer first.
- Theming is Donovan-flagged as a later design pass (PLAN decision 2); shipping
  theme entries now would freeze token names before that pass.

Recommendation: hold themes out of the registry until tokens are emitted as
CSS variables (Phase 2 design pass); then generate one `registry:theme` item
per theme, each with zero JS dependencies.

### 6. Coverage gaps between core and the registry

`packages/core/src/components` has `Auth` and an `Artwork` barrel; the registry
exposes 8 items and `Auth` is not among them. If Auth is intentionally internal
(pre-release API), fine — but the generator currently generates from whatever
exists, and the item set is curated by hand somewhere in between. Make the
curated list explicit (a `PUBLISH` set in the generator) so an accidentally
added component doesn't auto-publish an unreviewed entry, and so the intentional
exclusions are recorded in code.

### 7. Target path convention is good

`target: components/scilent/<slug>/<File>.tsx` with utils under
`lib/scilent/` namespaces everything a user copies under one tree — easy to
delete, easy to grep for updates. Keep.

## Decision summary (recommended, pending Donovan's go where public-facing)

1. Keep generator-driven inlining blocks; revisit size at ~1 MB.
2. Switch `registryDependencies` to bare names.
3. Derive `EXTERNAL_DEPS` versions from core's package.json.
4. Pin slugs explicitly in the generator.
5. Themes enter the registry as `registry:theme` items only after the CSS-variable
   token layer exists (Phase 2).
6. Make the published-item set an explicit, curated list in the generator.
