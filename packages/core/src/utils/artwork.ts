import { AlbumArtworkPlatform, AlbumArtworkSize, AlbumArtworkTheme } from '../types/artwork';

/**
 * Default size values in pixels for each size variant
 */
export const ARTWORK_SIZE_VALUES: Record<Exclude<AlbumArtworkSize, number | 'auto'>, number> = {
  xs: 32,
  sm: 64,
  base: 128,
  md: 192,
  lg: 256,
};

/**
 * Default border radius values for each platform
 */
export const ARTWORK_BORDER_RADIUS: Record<AlbumArtworkPlatform, string> = {
  default: '8px',
  apple: '6px',
  spotify: '4px',
  tidal: '0',
  custom: '0', // Custom will be overridden by props
};

/**
 * Default theme values for each platform
 */
export const ARTWORK_PLATFORM_THEMES: Record<
  Exclude<AlbumArtworkPlatform, 'custom'>,
  AlbumArtworkTheme
> = {
  default: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    shadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    placeholderColor: 'rgba(0, 0, 0, 0.3)',
  },
  apple: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: '6px',
    shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    placeholderColor: 'rgba(0, 0, 0, 0.2)',
  },
  spotify: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    shadow: 'none',
    placeholderColor: 'rgba(0, 0, 0, 0.4)',
  },
  tidal: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: '0',
    shadow: 'none',
    placeholderColor: 'rgba(0, 0, 0, 0.5)',
  },
};

/**
 * Get the CSS size value for an artwork size
 * @param size The size variant or number
 * @returns The CSS size value
 */
export function getArtworkSize(size: AlbumArtworkSize): string {
  if (typeof size === 'number') {
    return `${size}px`;
  }

  if (size === 'auto') {
    return '100%';
  }

  return `${ARTWORK_SIZE_VALUES[size]}px`;
}

/**
 * Get the theme values for a specific platform
 * @param platform The platform variant
 * @param customTheme Optional custom theme values
 * @returns The theme values
 */
export function getArtworkTheme(
  platform: AlbumArtworkPlatform,
  customTheme?: Partial<AlbumArtworkTheme>
): AlbumArtworkTheme {
  if (platform === 'custom' && customTheme) {
    return {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '8px',
      shadow: 'none',
      placeholderColor: 'rgba(0, 0, 0, 0.3)',
      ...customTheme,
    };
  }

  const baseTheme = ARTWORK_PLATFORM_THEMES[platform as Exclude<AlbumArtworkPlatform, 'custom'>];

  return {
    ...baseTheme,
    ...customTheme,
  };
}

/**
 * Generate CSS variables for album artwork based on platform and theme
 * @param platform The platform variant
 * @param theme Optional custom theme values
 * @returns CSS variables object
 */
export function getArtworkCSSVariables(
  platform: AlbumArtworkPlatform,
  theme?: Partial<AlbumArtworkTheme>
): Record<string, string> {
  const artworkTheme = getArtworkTheme(platform, theme);

  return {
    '--color-artwork-bg': artworkTheme.backgroundColor || 'rgba(0, 0, 0, 0.05)',
    '--color-artwork-placeholder': artworkTheme.placeholderColor || 'rgba(0, 0, 0, 0.3)',
    '--radius-artwork':
      platform === 'default' ? artworkTheme.borderRadius || '8px' : ARTWORK_BORDER_RADIUS[platform],
    '--radius-artwork-apple': '6px',
    '--radius-artwork-spotify': '4px',
    '--radius-artwork-tidal': '0',
  };
}
