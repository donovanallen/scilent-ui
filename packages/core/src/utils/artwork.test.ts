import {
  ARTWORK_SIZE_VALUES,
  ARTWORK_BORDER_RADIUS,
  ARTWORK_PLATFORM_THEMES,
  getArtworkSize,
  getArtworkTheme,
  getArtworkCSSVariables,
} from './artwork';

describe('ARTWORK constants', () => {
  it('exposes expected size values', () => {
    expect(ARTWORK_SIZE_VALUES).toEqual({ xs: 32, sm: 64, base: 128, md: 192, lg: 256 });
  });

  it('exposes border radius per platform', () => {
    expect(ARTWORK_BORDER_RADIUS).toEqual({
      default: '8px',
      apple: '6px',
      spotify: '4px',
      tidal: '0',
      custom: '0',
    });
  });

  it('exposes themes for each non-custom platform', () => {
    for (const key of ['default', 'apple', 'spotify', 'tidal']) {
      expect(ARTWORK_PLATFORM_THEMES[key as keyof typeof ARTWORK_PLATFORM_THEMES]).toHaveProperty(
        'backgroundColor'
      );
      expect(ARTWORK_PLATFORM_THEMES[key as keyof typeof ARTWORK_PLATFORM_THEMES]).toHaveProperty(
        'borderRadius'
      );
      expect(ARTWORK_PLATFORM_THEMES[key as keyof typeof ARTWORK_PLATFORM_THEMES]).toHaveProperty(
        'shadow'
      );
      expect(ARTWORK_PLATFORM_THEMES[key as keyof typeof ARTWORK_PLATFORM_THEMES]).toHaveProperty(
        'placeholderColor'
      );
    }
  });
});

describe('getArtworkSize', () => {
  it('formats numeric sizes as px', () => {
    expect(getArtworkSize(100)).toBe('100px');
    expect(getArtworkSize(0)).toBe('0px');
  });

  it('returns 100% for auto', () => {
    expect(getArtworkSize('auto')).toBe('100%');
  });

  it('maps named sizes to px values', () => {
    expect(getArtworkSize('xs')).toBe('32px');
    expect(getArtworkSize('sm')).toBe('64px');
    expect(getArtworkSize('base')).toBe('128px');
    expect(getArtworkSize('md')).toBe('192px');
    expect(getArtworkSize('lg')).toBe('256px');
  });
});

describe('getArtworkTheme', () => {
  it('returns the base theme for a known platform', () => {
    expect(getArtworkTheme('apple')).toEqual(ARTWORK_PLATFORM_THEMES.apple);
  });

  it('merges custom theme overrides over platform theme', () => {
    const theme = getArtworkTheme('spotify', { shadow: '0 0 0 red' });
    expect(theme.shadow).toBe('0 0 0 red');
    expect(theme.backgroundColor).toBe(ARTWORK_PLATFORM_THEMES.spotify.backgroundColor);
    expect(theme.borderRadius).toBe(ARTWORK_PLATFORM_THEMES.spotify.borderRadius);
    expect(theme.placeholderColor).toBe(ARTWORK_PLATFORM_THEMES.spotify.placeholderColor);
  });

  it('falls back to default-theme defaults for custom platform with customTheme', () => {
    const theme = getArtworkTheme('custom', {});
    expect(theme).toEqual({
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '8px',
      shadow: 'none',
      placeholderColor: 'rgba(0, 0, 0, 0.3)',
    });
  });

  it('spreads custom theme over defaults for custom platform', () => {
    const theme = getArtworkTheme('custom', { backgroundColor: 'red' });
    expect(theme.backgroundColor).toBe('red');
    expect(theme.borderRadius).toBe('8px');
    expect(theme.shadow).toBe('none');
  });
});

describe('getArtworkCSSVariables', () => {
  it('uses platform theme values for the default platform', () => {
    const vars = getArtworkCSSVariables('default');
    expect(vars).toEqual({
      '--color-artwork-bg': ARTWORK_PLATFORM_THEMES.default.backgroundColor,
      '--color-artwork-placeholder': ARTWORK_PLATFORM_THEMES.default.placeholderColor,
      '--radius-artwork': '8px',
      '--radius-artwork-apple': '6px',
      '--radius-artwork-spotify': '4px',
      '--radius-artwork-tidal': '0',
    });
  });

  it('uses hardcoded border radius for non-default platforms', () => {
    const vars = getArtworkCSSVariables('tidal');
    expect(vars['--radius-artwork']).toBe('0');
    const appleVars = getArtworkCSSVariables('apple');
    expect(appleVars['--radius-artwork']).toBe('6px');
  });

  it('applies theme overrides to color variables', () => {
    const vars = getArtworkCSSVariables('default', {
      backgroundColor: '#fff',
      placeholderColor: '#000',
    });
    expect(vars['--color-artwork-bg']).toBe('#fff');
    expect(vars['--color-artwork-placeholder']).toBe('#000');
  });

  it('falls back to defaults when theme values are undefined', () => {
    const vars = getArtworkCSSVariables('default', {
      backgroundColor: undefined,
      placeholderColor: undefined,
      borderRadius: undefined,
    });
    expect(vars['--color-artwork-bg']).toBe('rgba(0, 0, 0, 0.05)');
    expect(vars['--color-artwork-placeholder']).toBe('rgba(0, 0, 0, 0.3)');
    expect(vars['--radius-artwork']).toBe('8px');
  });

  it('falls back to hardcoded radius for non-default platform with undefined borderRadius', () => {
    const vars = getArtworkCSSVariables('spotify', { borderRadius: undefined });
    expect(vars['--radius-artwork']).toBe('4px');
  });

  it('accepts custom platform with a partial theme and undefined values', () => {
    const vars = getArtworkCSSVariables('custom', {
      backgroundColor: undefined,
      placeholderColor: undefined,
    });
    expect(vars['--color-artwork-bg']).toBe('rgba(0, 0, 0, 0.05)');
    expect(vars['--color-artwork-placeholder']).toBe('rgba(0, 0, 0, 0.3)');
    expect(vars['--radius-artwork']).toBe('0');
  });
});
