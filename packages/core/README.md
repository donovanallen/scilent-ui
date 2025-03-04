# @scilent-ui/core

Core components and utilities for music-based applications and UIs.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [@scilent-ui/core](#scilent-uicore)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Components](#components)
    - [Button](#button)
    - [MusicPlayer](#musicplayer)
  - [Types](#types)
  - [Development](#development)
  - [License](#license)

## Overview

The `@scilent-ui/core` package provides the essential building blocks for creating music-focused applications. It includes presentational and interactive components specifically designed for music metadata display and playback control.

This package is part of the [Scilent UI](https://github.com/donovanallen/scilent-ui) monorepo, a comprehensive component and utility library for music-based applications.

## Installation

```bash
# Using npm
npm install @scilent-ui/core

# Using yarn
yarn add @scilent-ui/core

# Using pnpm
pnpm add @scilent-ui/core
```

## Usage

```jsx
import { Button, MusicPlayer } from '@scilent-ui/core';

function App() {
  return (
    <div>
      <Button variant="primary">Play</Button>
      <MusicPlayer
        trackTitle="Song Title"
        artistName="Artist Name"
        albumArt="/path/to/album-art.jpg"
      />
    </div>
  );
}
```

## Components

### Button

A customizable button component with various styles and states.

```jsx
<Button variant="primary" size="medium" onClick={() => console.log('Button clicked')}>
  Click Me
</Button>
```

### MusicPlayer

A comprehensive music player component with playback controls and track information display.

```jsx
<MusicPlayer
  trackTitle="Amazing Track"
  artistName="Awesome Artist"
  albumArt="/path/to/album-art.jpg"
  onPlay={() => {
    /* Handle play */
  }}
  onPause={() => {
    /* Handle pause */
  }}
  onNext={() => {
    /* Handle next */
  }}
  onPrevious={() => {
    /* Handle previous */
  }}
/>
```

## Types

This package exports TypeScript types for all components and utilities, ensuring type safety throughout your application.

```tsx
import { ButtonProps, MusicPlayerProps } from '@scilent-ui/core';

// Use types in your components
const CustomButton: React.FC<ButtonProps> = props => {
  // Implementation
};
```

## Development

To develop this package locally:

```bash
# Navigate to the package directory
cd packages/core

# Install dependencies (from the root of the monorepo)
pnpm install

# Start the development build with watch mode
pnpm dev

# Run tests
pnpm test

# Build the package
pnpm build

# Lint the code
pnpm lint

# Type check
pnpm typecheck
```

## License

MIT © [Scilent Digital](https://scilent.digital)
