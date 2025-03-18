# @scilent-ui/icons

A comprehensive icon library for Scilent UI, providing accessible icon components based on Phosphor Icons and React Icons.

## Installation

```bash
npm install @scilent-ui/icons
# or
yarn add @scilent-ui/icons
# or
pnpm add @scilent-ui/icons
```

## Features

- Accessible icon components with proper ARIA attributes
- General-purpose icons using Phosphor Icons
- Provider/brand icons using React Icons
- TypeScript support with full type definitions
- Tree-shakable exports for optimal bundle size

## Usage

### Using General Icons (Phosphor)

```tsx
import { Icon } from '@scilent-ui/icons';

// Basic usage
<Icon name="Heart" />

// With custom size and color
<Icon
  name="Heart"
  size={32}
  color="red"
/>

// With accessibility label
<Icon
  name="Heart"
  label="Like"
/>

// With different weight
<Icon
  name="Heart"
  weight="fill"
/>
```

### Using Provider Icons (Music/Brand Logos)

```tsx
import { ProviderIcon } from '@scilent-ui/icons';

// Basic usage with brand color
<ProviderIcon provider="spotify" />

// With custom size
<ProviderIcon
  provider="spotify"
  size={32}
/>

// Without brand color
<ProviderIcon
  provider="spotify"
  useBrandColor={false}
  color="currentColor"
/>

// With accessibility label
<ProviderIcon
  provider="spotify"
  label="Connect with Spotify"
/>
```

### Supported Providers

- Music: spotify, appleMusic, tidal, youtubeMusic, soundcloud, bandcamp, amazonMusic, deezer, pandora
- Tech: apple, youtube, amazon, google, facebook, twitter, instagram, github, discord

### Using the AccessibleIcon Component

If you need to wrap your own icon components with accessibility features:

```tsx
import { AccessibleIcon } from '@scilent-ui/icons';
import { CustomIcon } from './CustomIcon';

<AccessibleIcon label="Custom Icon">
  <CustomIcon />
</AccessibleIcon>;
```

### Using Icon Contexts

You can use the provided context providers to set default properties for all icons:

```tsx
import { PhosphorIconContext, ReactIconContext } from '@scilent-ui/icons';

// Set defaults for all Phosphor Icons
<PhosphorIconContext.Provider value={{ size: 24, color: 'blue', weight: 'bold' }}>
  <App />
</PhosphorIconContext.Provider>

// Set defaults for all React Icons
<ReactIconContext.Provider value={{ size: '1.5em', className: 'global-icon-class' }}>
  <App />
</ReactIconContext.Provider>
```

### Provider Utilities

The package includes utility functions for working with providers:

```tsx
import {
  getProviderIcon,
  getProviderBrandColor,
  getSupportedProviders,
  isProviderSupported,
} from '@scilent-ui/icons';

// Get the icon component for a provider
const SpotifyIcon = getProviderIcon('spotify');

// Get the brand color for a provider
const spotifyColor = getProviderBrandColor('spotify');

// Get all supported providers
const providers = getSupportedProviders();

// Check if a provider is supported
const isSupported = isProviderSupported('spotify');
```

## Internal Usage (@core)

When using the icons package within the @scilent-ui/core package, you can import it directly:

```tsx
// In a @scilent-ui/core component
import { Icon, ProviderIcon } from '@scilent-ui/icons';

export const Button = ({ icon, children }) => (
  <button>
    {icon && <Icon name={icon} size={16} />}
    {children}
  </button>
);

export const ConnectButton = ({ provider }) => (
  <button>
    <ProviderIcon provider={provider} size={16} />
    Connect with {provider}
  </button>
);
```

## License

MIT © Scilent Digital
