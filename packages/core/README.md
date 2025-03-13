# @scilent-ui/core

Core components and utilities for music-based applications and UIs.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [@scilent-ui/core](#scilent-uicore)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Components](#components)
    - [AlbumArtwork](#albumartwork)
    - [ArtistLabel](#artistlabel)
    - [MetadataLabel](#metadatalabel)
    - [Timestamp](#timestamp)
    - [Slider](#slider)
    - [IconButton](#iconbutton)
    - [MusicPlayer](#musicplayer)
  - [Documentation](#documentation)
  - [Types](#types)
  - [Development](#development)
    - [Local Development with Storybook](#local-development-with-storybook)
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
import { AlbumArtwork, IconButton, MusicPlayer } from '@scilent-ui/core';
import { FiPlay } from 'react-icons/fi';

function App() {
  return (
    <div>
      <AlbumArtwork image="/path/to/album-art.jpg" name="Album Name" size="md" />
      <IconButton icon={FiPlay} aria-label="Play" />
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

### AlbumArtwork

A component for displaying album artwork with various size options.

```jsx
<AlbumArtwork image="https://example.com/album-cover.jpg" name="Album Name" size="md" />
```

### ArtistLabel

A component for displaying artist names with customizable styling.

```jsx
<ArtistLabel name="Artist Name" style={{ fontWeight: 'bold' }} />
```

### MetadataLabel

A versatile component for displaying music metadata with truncation options.

```jsx
<MetadataLabel
  text="Very long track title that might need truncation"
  truncate={true}
  maxLength={20}
/>
```

### Timestamp

A component for displaying time-related information in various formats.

```jsx
<Timestamp
  value={180} // 3 minutes in seconds
  format="duration"
/>
```

### Slider

A customizable slider component for progress bars and volume controls.

```jsx
<Slider value={[50]} min={0} max={100} step={1} onValueChange={value => console.log(value)} />
```

### IconButton

A button component that displays an icon with various states and variants.

```jsx
import { FiHeart } from 'react-icons/fi';

<IconButton
  icon={FiHeart}
  variant="primary"
  size="md"
  aria-label="Like"
  onClick={() => console.log('Liked!')}
/>;
```

### MusicPlayer

A basic music player component with playback controls and track information display.

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
/>
```

## Documentation

Documentation for all components is available in Storybook. To view the documentation locally:

```bash
# From the root of the monorepo
pnpm storybook

# Or from this package directory
pnpm storybook
```

This will start a local Storybook server at http://localhost:6006 where you can explore all components, their variants, and usage guidelines.

Each component has:

- Interactive examples
- Prop documentation
- Usage guidelines
- Code snippets

## Types

This package exports TypeScript types for all components and utilities, ensuring type safety throughout your application.

```tsx
import {
  AlbumArtworkProps,
  IconButtonProps,
  MusicPlayerProps,
  ArtistLabelProps,
  MetadataLabelProps,
  TimestampProps,
  SliderProps,
} from '@scilent-ui/core';

// Use types in your components
const CustomButton: React.FC<IconButtonProps> = props => {
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

### Local Development with Storybook

We use Storybook with Vite for component development. Vite provides an extremely fast development experience with instant hot module replacement (HMR).

```bash
# Start Storybook
pnpm storybook

# Build Storybook for static deployment
pnpm build-storybook
```

To create a new component story:

1. Create your component in `src/components/ComponentName/ComponentName.tsx`
2. Add a story file at `src/components/ComponentName/ComponentName.stories.tsx`
3. Export your component in `src/components/index.ts`

Example story file structure:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  // Add parameters, argTypes, etc.
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // Component props
  },
};

// Add more stories for different states/variants
```

## License

MIT © [Scilent Digital](https://scilent.digital)
