# scilent-ui

React components for building music and audio apps — players, artwork, metadata displays, and transport controls.

scilent-ui exists because generic component libraries stop at buttons and inputs; the hard parts of a music product's UI — scrubbing, buffering bars, truncating artist names, platform-styled players — are left to you. This library handles those parts, ships them with accessibility checks and tests, and gives you two ways to consume them.

[![Build](https://github.com/donovanallen/scilent-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/donovanallen/scilent-ui/actions/workflows/ci.yml)
[![Linting](https://github.com/donovanallen/scilent-ui/actions/workflows/lint.yml/badge.svg)](https://github.com/donovanallen/scilent-ui/actions/workflows/lint.yml)
[![Release](https://github.com/donovanallen/scilent-ui/actions/workflows/release.yml/badge.svg)](https://github.com/donovanallen/scilent-ui/actions/workflows/release.yml)
[![npm version](https://img.shields.io/npm/v/@scilent/core.svg?style=flat)](https://www.npmjs.com/package/@scilent/core)
[![npm downloads](https://img.shields.io/npm/dw/@scilent/core?label=downloads%20per%20week)](https://www.npmjs.com/package/@scilent/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)

## Two ways in

**1. Install from npm** — versioned packages, standard dependency management:

```bash
npm i @scilent/core
```

**2. Copy the source** (shadcn-style registry) — the code lands in your repo and you own it:

```bash
npx shadcn add "https://scilent-ui.dev/r/music-player.json"
```

Copy-paste-own is the primary distribution: components are plain source files with no hidden runtime beyond `styled-components` and Radix primitives, so you can restyle, fork, or strip them without fighting an abstraction.

## Components

Every component ships with tests (including `jest-axe` accessibility checks), Storybook stories, and a registry entry.

| Component     | What it does                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MusicPlayer   | Complete playback surface — transport, progress, volume, track metadata; default / minimal / compact / expanded variants; Spotify, Apple Music, and Tidal styling presets |
| AlbumArtwork  | Cover art with fallbacks, size tokens (xs–lg), optional expand-to-full-size modal                                                                                         |
| ArtistLabel   | Artist name display with multi-artist joining and predictable truncation                                                                                                  |
| MetadataLabel | General-purpose metadata text (album, year, genre…)                                                                                                                       |
| Timestamp     | Duration/clock formatting for progress counters and track lengths                                                                                                         |
| Slider        | Scrubber/fader built on Radix — progress, volume, any bounded continuous input, with buffer-bar support                                                                   |
| IconButton    | Accessible icon button for play/pause, skip, mute, and the like                                                                                                           |
| Card          | Plain surface container for grouping content                                                                                                                              |

On the roadmap: playlists and track lists, music visualizers, a CSS-variable theming layer, provider integrations (Spotify, Apple Music, Tidal).

## Requirements

- Node.js v23 or higher
- pnpm v10 or higher

## Getting Started

```bash
nvm install && nvm use
pnpm install
```

### Development

```bash
pnpm dev              # development servers
pnpm test             # jest suite (coverage thresholds enforced in jest.config.mjs)
pnpm lint             # eslint
pnpm build            # build all packages
pnpm storybook        # Storybook dev server (localhost:6006)
pnpm build-storybook  # static Storybook build (CI runs this too)
```

### Project Structure

Monorepo managed with pnpm workspaces and Turborepo:

- `packages/core` — the components (`@scilent/core`)
- `packages/icons` — icon primitives and compatibility helpers (`@scilent/icons`)
- `packages/themes` — theme scaffolding (pre-release)
- `packages/registry` — generated shadcn-style registry (`registry.json` + `r/<slug>.json`)
- `apps/docs` — docs site source

### Releases

Versions are managed with [Changesets](https://github.com/changesets/changesets); the release workflow publishes to npm on version-PR merge to `main`.

```bash
pnpm changeset        # record a change
pnpm version-packages # apply versions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit with conventional commits (`git commit -m 'feat: add some amazing feature'`)
4. Push and open a Pull Request

New components must include tests, `jest-axe` checks, stories, and a registry entry. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT © [Scilent Digital](https://scilent.digital)
