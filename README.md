# Scilent UI

A component and utility library for music-based applications and UIs.

[![Build](https://github.com/donovanallen/scilent-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/donovanallen/scilent-ui/actions/workflows/ci.yml)
[![Linting](https://github.com/donovanallen/scilent-ui/actions/workflows/lint.yml/badge.svg)](https://github.com/donovanallen/scilent-ui/actions/workflows/lint.yml)
[![Release](https://github.com/donovanallen/scilent-ui/actions/workflows/release.yml/badge.svg)](https://github.com/donovanallen/scilent-ui/actions/workflows/release.yml)

<!-- [![Documentation](https://img.shields.io/badge/docs-website-blue)](https://your-docs-site.com) -->
<!-- [![codecov](https://codecov.io/gh/donovanallen/scilent-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/donovanallen/scilent-ui) -->
<!-- [![npm version](https://img.shields.io/npm/v/@scilent-ui/core.svg?style=flat)](https://www.npmjs.com/package/@scilent-ui/core) -->
<!-- [![npm downloads](https://img.shields.io/npm/dm/@scilent-ui/core.svg?style=flat)](https://www.npmjs.com/package/@scilent-ui/core) -->
<!-- [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@scilent-ui/core)](https://bundlephobia.com/package/@scilent-ui/core) -->

<!-- [![dependencies Status](https://status.david-dm.org/gh/donovanallen/scilent-ui.svg)](https://david-dm.org/donovanallen/scilent-ui)
[![devDependencies Status](https://status.david-dm.org/gh/donovanallen/scilent-ui.svg?type=dev)](https://david-dm.org/donovanallen/scilent-ui?type=dev) -->

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://www.react.dev/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?logo=turborepo&logoColor=white)](https://turbo.build/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Scilent UI](#scilent-ui)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [🎵 Music-Focused Components](#-music-focused-components)
    - [🎨 Theming System](#-theming-system)
    - [🔌 Music Provider Integration](#-music-provider-integration)
    - [📱 Responsive Design](#-responsive-design)
    - [🚀 Modern Technology Stack](#-modern-technology-stack)
    - [♿ Accessibility](#-accessibility)
    - [🧩 Customizable Components](#-customizable-components)
    - [✨ Rich Interactions](#-rich-interactions)
    - [🔍 Type Safety](#-type-safety)
    - [📖 Open Source](#-open-source)
  - [Current Status](#current-status)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
    - [Using NVM (recommended)](#using-nvm-recommended)
    - [Development](#development)
    - [Component Development with Storybook](#component-development-with-storybook)
    - [Project Structure](#project-structure)
    - [Release Process](#release-process)
  - [Contributing](#contributing)
  - [License](#license)

## Features

### 🎵 Music-Focused Components

- **Available Now:**

  - AlbumArtwork component for displaying album covers
  - ArtistLabel for artist name display
  - MetadataLabel for general music metadata
  - Timestamp component for time display
  - Slider component for progress bars and volume controls
  - IconButton for common music player actions
  - Basic MusicPlayer component

- **Coming Soon:**
  - Advanced music visualizers
  - Playlist components
  - Track list components
  - More specialized music metadata displays

### 🎨 Theming System

- **Available Now:**

  - Basic theming with CSS variables
  - Component-level styling customization

- **Coming Soon:**
  - Comprehensive theming system with light and dark modes
  - Rich typography system optimized for music applications
  - Extensive iconography for music-related actions

### 🔌 Music Provider Integration

- **Planned for Future Releases:**
  - Support for major music providers (Spotify, Apple Music, Tidal, etc.)
  - Provider-specific styling and branding compliance
  - Standardized interfaces across providers

### 📱 Responsive Design

- **Available Now:**

  - Basic responsive components

- **Coming Soon:**
  - Fully responsive designs for all device sizes
  - Adaptive layouts for different screen orientations
  - Touch-optimized interactions for mobile devices

### 🚀 Modern Technology Stack

- **Available Now:**

  - Built with React and TypeScript
  - Monorepo structure using Turborepo
  - Storybook for component documentation
  - Vite for development

- **Coming Soon:**
  - AI-ready with .cursorrules boilerplate template

### ♿ Accessibility

- **Available Now:**

  - Based on Radix UI Primitives for core accessibility
  - Basic keyboard navigation support

- **Coming Soon:**
  - Full WCAG 2.1 AA compliance
  - Enhanced screen reader optimization
  - Comprehensive keyboard navigation

### 🧩 Customizable Components

- **Available Now:**

  - Component customization via props
  - Style overrides with CSS variables

- **Coming Soon:**
  - Enhanced theming API
  - More extensible component patterns

### ✨ Rich Interactions

- **Available Now:**

  - Basic animations and transitions

- **Coming Soon:**
  - Advanced interaction patterns
  - Audio-reactive components
  - Haptic feedback support

### 🔍 Type Safety

- **Available Now:**

  - TypeScript throughout the codebase
  - Type definitions for all components

- **Coming Soon:**
  - Enhanced type definitions
  - Strongly typed theme system

### 📖 Open Source

- MIT licensed for maximum flexibility
- Community contributions welcome
- Transparent development process

## Current Status

Scilent UI is currently in early development. The following components are available:

- ✅ AlbumArtwork
- ✅ ArtistLabel
- ✅ MetadataLabel
- ✅ Timestamp
- ✅ Slider
- ✅ IconButton
- ✅ Basic MusicPlayer

The following features are under development:

- 🚧 Comprehensive theming system
- 🚧 Icons package
- 🚧 Provider integrations
- 🚧 Advanced music player components

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

### Component Development with Storybook

We use [Storybook](https://storybook.js.org/) for developing and documenting components in isolation. Storybook provides a great way to visualize different states of your components and develop them interactively.

```bash
# Start Storybook
pnpm storybook

# Build Storybook for static deployment
pnpm build-storybook
```

Storybook is powered by [Vite](https://vitejs.dev/), which provides:

- Extremely fast hot module replacement (HMR)
- Native ES modules support
- Optimized build performance
- Built-in support for TypeScript, JSX, CSS, and more

Each component in the library has:

- A `.stories.tsx` file that defines various states and variants
- Auto-generated API documentation from TypeScript types and JSDoc comments

To view the Storybook documentation locally, run `pnpm storybook` and open your browser to http://localhost:6006.

### Project Structure

This is a monorepo managed with pnpm workspaces and Turborepo. The packages are organized as follows:

- `packages/core`: Core components and utilities
- `packages/icons`: Icon components (in development)
- `packages/themes`: Theme definitions and utilities (planned)

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

See the [Contributing](https://github.com/donovanallen/scilent-ui/blob/main/CONTRIBUTING.md) readme for more instructions on how to contribute to this project.

## License

MIT © [Scilent Digital](https://scilent.digital)
