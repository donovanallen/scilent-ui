# Scilent UI

A component and utility library for music-based applications and UIs.

[![Build](https://github.com/donovanallen/scilent-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/donovanallen/scilent-ui/actions/workflows/ci.yml)

<!-- [![Documentation](https://img.shields.io/badge/docs-website-blue)](https://your-docs-site.com) -->
<!-- [![codecov](https://codecov.io/gh/donovanallen/scilent-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/donovanallen/scilent-ui) -->
<!-- [![npm version](https://img.shields.io/npm/v/@scilent-ui/core.svg?style=flat)](https://www.npmjs.com/package/@scilent-ui/core) -->
<!-- [![npm downloads](https://img.shields.io/npm/dm/@scilent-ui/core.svg?style=flat)](https://www.npmjs.com/package/@scilent-ui/core) -->
<!-- [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@scilent-ui/core)](https://bundlephobia.com/package/@scilent-ui/core) -->

<!-- [![dependencies Status](https://status.david-dm.org/gh/donovanallen/scilent-ui.svg)](https://david-dm.org/donovanallen/scilent-ui)
[![devDependencies Status](https://status.david-dm.org/gh/donovanallen/scilent-ui.svg?type=dev)](https://david-dm.org/donovanallen/scilent-ui?type=dev) -->

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?logo=turborepo&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md) -->

## Table of Contents

- [Scilent UI](#scilent-ui)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [🎵 Music-Focused Components](#-music-focused-components)
    - [🎨 Comprehensive Theming](#-comprehensive-theming)
    - [🔌 Music Provider Integration](#-music-provider-integration)
    - [📱 Responsive \& Adaptive](#-responsive--adaptive)
    - [🚀 Modern Technology Stack](#-modern-technology-stack)
    - [♿ Accessibility First](#-accessibility-first)
    - [🧩 Customizable \& Extensible](#-customizable--extensible)
    - [✨ Rich Interactions](#-rich-interactions)
    - [🔍 Type Safety](#-type-safety)
    - [📖 Open Source](#-open-source)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
    - [Using NVM (recommended)](#using-nvm-recommended)
    - [Development](#development)
    - [Project Structure](#project-structure)
    - [Release Process](#release-process)
  - [Contributing](#contributing)
  - [License](#license)

## Features

### 🎵 Music-Focused Components

- Presentational components specifically designed for music metadata display
- Interactive music players, visualizers, and controls
- Specialized components for playlists, albums, artists, and tracks
- Developer utilities for handling music data and playback

### 🎨 Comprehensive Theming

- Flexible theming system with light and dark modes
- Rich typography system optimized for music applications
- Extensive iconography for music-related actions and metadata
<!-- - [Color systems](https://www.w3.org/TR/css-color-4/) that follow modern standards -->

### 🔌 Music Provider Integration

- Support for all major music providers including Spotify, Apple Music, Tidal, YouTube Music, SoundCloud, and more
- Components that comply with each provider's design and branding guidelines
- TOS-compliant implementations for each platform
- Standardized interfaces across providers
<!-- TODO: add docs for provider integration guidance incl TOS links -->

### 📱 Responsive & Adaptive

- Fully responsive designs that work across all device sizes
- Adaptive layouts for different screen orientations
- Touch-optimized interactions for mobile devices
- Consistent experience across platforms

### 🚀 Modern Technology Stack

- Built with [React 19](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
<!-- TODO: add link to tsup docs -->
- Bundled with [TSUP](#) for optimal package size
<!-- TODO: add link to turborepo docs -->
- Monorepo structure using [Turborepo](#) for efficient development
<!-- TODO: Cursor Rules and link to docs -->
- BONUS: AI-ready with [.cursorrules](#) boilerplate template
  <!-- TODO: add storybook -->
  <!-- - [Storybook](https://storybook.js.org/) for interactive component exploration -->
- Latest web standards and best practices

### ♿ Accessibility First

- Based on [Radix UI Primitives](https://www.radix-ui.com/primitives) for robust accessibility
- WCAG 2.1 AA compliant components
- Keyboard navigation support
- Screen reader optimized

### 🧩 Customizable & Extensible

- Modular architecture for picking only what you need
- Highly customizable components via props and theming
- Extensible design patterns for building custom components
- Composition-based API for maximum flexibility

### ✨ Rich Interactions

- Smooth animations and transitions
- Advanced interaction patterns
- Audio-reactive components
- Haptic feedback support for compatible devices

### 🔍 Type Safety

- 100% TypeScript throughout the codebase
- Comprehensive type definitions for all components and utilities
- Strongly typed theme system
- IntelliSense support in modern IDEs

### 📖 Open Source

- [MIT licensed](https://opensource.org/licenses/MIT) for maximum flexibility
- Community-driven development
- Transparent roadmap and issue tracking
- Welcoming to contributions

## Requirements

- Node.js v23 or higher
- pnpm v10 or higher

## Getting Started

### Using NVM (recommended)

This project uses [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) to manage Node.js versions.

```bash
# Install the correct Node.js version
nvm install
nvm use

# Install dependencies
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev

# Run linting
pnpm lint

# Run tests
pnpm test

# Build all packages
pnpm build

# Run Storybook
pnpm storybook
```

### Project Structure

This is a monorepo managed with pnpm workspaces and Turborepo. The packages are organized as follows:

- `packages/core`: Core components and utilities
- `packages/icons`: Icon components
- `packages/themes`: Theme definitions and utilities

### Release Process

This project uses [Changesets](https://github.com/changesets/changesets) to manage versions and publish packages.

```bash
# Create a new changeset
pnpm changeset

# Version packages based on changesets
pnpm version-packages

# Publish packages
pnpm release
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Scilent Digital](https://scilent.digital)
