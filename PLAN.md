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
- AudioUI by Cutoff (cutoff.dev, github.com/cutoff/audio-ui): closest direct peer —
  React audio/MIDI library (Knob, Slider, CycleButton, Keys, film-strip/bitmap controls,
  low-level primitives), framework-agnostic core + React wrapper, dev-preview. \*\*GPL-3.0
  - commercial dual license: patterns/docs ideas only, zero code reuse.\*\* Borrow for
    Phase 2 docs: llms.txt + `.md`-per-page LLM-consumable docs, one-file CDN sandbox demo
    template, Discord/GitHub-Discussions community setup. Their core/react split, event
    value model, CSS-var theming, and two-tier "primitives + opinionated components" API
    are prior art for our hybrid distribution and Slider/transport roadmap. Details in
    INSPO.md (2026-10-06 entry).
- Licensing positioning: they monetize via GPL/commercial dual licensing; scilent-ui
  stays MIT with paid pro blocks/templates + theme packs as the paid tier — a more
  OSS-friendly wedge. (Note for Phase 4 messaging; Donovan's call to publicize.)
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

- **Branch topology (post-cutover, Oct 8)**: `main` = trunk and the npm-publish trunk
  (changesets action publishes on version-PR merge to main). `dev` retained as the
  integration mirror of main. `landing-page` retired from active use — it served the
  WIP-landing + Phase 1 push (PR #18 merged it into dev, then main was fast-forwarded
  to the same content). `phase1-tests` deleted (fully merged via PR #19). New work
  branches off `main` directly.

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
