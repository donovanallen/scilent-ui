# scilent-ui OSS push — plan

Owner: new @scilent-ui agent (TBD name) · Sponsor: Donovan · Supervisor: @personal-cto
Created Oct 2026 · Paced alongside batch 3 + Scilent roadmap

## Decisions (Donovan-approved)

1. **Hybrid distribution**: npm packages (`@scilent/core` 2.0.0, `@scilent/icons` 1.1.0,
   `@scilent-ui/themes` 0.0.1) PLUS a shadcn-style copy-paste registry as the primary
   distribution (`npx shadcn add "https://scilent-ui.com/r/<component>"`).
2. **Brand**: keep "scilent" branding; aesthetics refresh is a later design pass.
3. **Pace**: alongside other work — no deadline pressure; agents do the bulk.

## Inspiration / market

- audio-ui.xyz (audio/ui): shadcn-based, copy-paste registry, live interactive demos,
  theme customizer, 193 stars — validates niche + playbook.
- Niche: music/audio UI components (players, artwork, metadata, sliders, transport).
- Monetization (later): free core; paid pro blocks/templates + premium theme packs; sponsorships.

## Current state (audited Oct 2026)

- Monorepo: pnpm + Turborepo; packages/core (10 music-specific components), icons, themes
  (barely started); apps/docs, examples, showcase; Storybook playground. MIT. Changesets-era
  hygiene (husky, commitlint). npm: `@scilent/core@2.0.0` and `@scilent/icons@1.1.0` are
  ALREADY published (Mar 2025, under the `scilent` org, maintainer donovanallen) — Phase 1
  updates existing packages rather than first-publishing. `@scilent-ui` org scope and
  unscoped `scilent-ui` name are still available/404. `@scilent-ui/themes` is unpublished
  (local scaffold only). Note: npm CLI on this machine is unauthenticated (whoami → 401);
  publishing needs a fresh login/token. GitHub: donovanallen/scilent-ui.
- Branch situation: working tree on `landing-page` with ~13 files uncommitted (AlbumArtwork
  work, +803/−258); stash "music-player-ui" on dev; ~25 stale branches (SCI-\* tickets,
  hotfixes, album-artwork forks). docs app appears early-stage.

## Phases

- **Phase 0 (setup — now)**: agent created; repo hygiene (WIP stashed/branched, branch
  map, main = trunk); npm org check; CI baseline; this plan lives in-repo.
- **Phase 1**: registry infrastructure (shadcn-style /r/\* JSON registry) + npm publish
  (core + icons; themes held back until real) + docs overhaul (live playground embeds).
- **Phase 2**: site design pass — audio/ui-caliber landing, interactive demos, theme
  customizer direction.
- **Phase 3**: dedicated automation agent: triage, changesets release flow, stale-issue
  gardening, dep monitoring.
- **Phase 4**: publicize — Show HN, X, r/reactjs, Figma community file; then pro
  blocks/templates if traction.

## Rules

- Donovan's go for: anything public-facing (npm publish, site launch, announcements).
- Agents never force-push or rewrite history on main.
- Every component ships with: a11y notes, tests, live demo, registry entry.
