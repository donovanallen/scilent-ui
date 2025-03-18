# Provider Icons

A modular system for provider icons and styling.

## Features

- Standardized provider icons using [react-icons](https://react-icons.github.io)
- Provider-specific branding information (colors, etc.)
- Utilities for working with providers
- Extensible registry for adding new providers
- Leverages `IconType` from react-icons for type safety and consistency

## Usage

### Basic Usage

```tsx
import { ProviderIcon, ProviderType } from '@scilent-ui/icons';

// Use the generic ProviderIcon component
<ProviderIcon provider="spotify" size={24} />;

// Or use a specific provider icon
import { SpotifyIcon } from '@scilent-ui/icons';
<SpotifyIcon size={24} />;
```

### Getting Provider Information

```tsx
import {
  getProviderInfo,
  getProviderBrandColor,
  getProviderBrandTextColor,
  getProviderBrandHoverColor,
} from '@scilent-ui/icons';

// Get all information about a provider
const spotifyInfo = getProviderInfo('spotify');
console.log(spotifyInfo.name); // "Spotify"
console.log(spotifyInfo.brandColor); // "#1DB954"

// Get specific information
const spotifyColor = getProviderBrandColor('spotify'); // "#1DB954"
const spotifyTextColor = getProviderBrandTextColor('spotify'); // "#FFFFFF"
const spotifyHoverColor = getProviderBrandHoverColor('spotify'); // "#1AA34A"
```

### Checking Supported Providers

```tsx
import { getSupportedProviders, isProviderSupported } from '@scilent-ui/icons';

// Get all supported providers
const providers = getSupportedProviders();
// ['spotify', 'apple', 'tidal', 'google', 'facebook', 'twitter', 'github', 'discord', 'twitch', 'microsoft', 'amazon', 'custom']

// Check if a provider is supported
const isSupported = isProviderSupported('spotify'); // true
const isNotSupported = isProviderSupported('unknown'); // false
```

### Customizing Icons

```tsx
import { SpotifyIcon } from '@scilent-ui/icons';

// Use brand color (default)
<SpotifyIcon size={24} useBrandColor={true} />

// Override with custom color
<SpotifyIcon size={24} color="#FF0000" />

// Disable brand color and use current color
<SpotifyIcon size={24} useBrandColor={false} />
```

### Using IconType Directly

```tsx
import { IconType } from 'react-icons';
import { FaSpotify } from 'react-icons/fa';
import { getProviderIcon } from '@scilent-ui/icons';

// Get the raw IconType from the registry
const SpotifyIconType: IconType = getProviderIcon('spotify');

// Use it directly
<SpotifyIconType size={24} color="#1DB954" />

// Or use the react-icons component directly
<FaSpotify size={24} color="#1DB954" />
```

## Supported Providers

- `spotify` - Spotify
- `apple` - Apple
- `tidal` - Tidal
- `google` - Google
- `facebook` - Facebook
- `twitter` - Twitter
- `github` - GitHub
- `discord` - Discord
- `twitch` - Twitch
- `microsoft` - Microsoft
- `amazon` - Amazon
- `custom` - Custom (placeholder)
