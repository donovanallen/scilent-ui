import React from 'react';
import { render } from '@testing-library/react';
import {
  providerRegistry,
  getProviderInfo,
  getProviderIcon,
  getSupportedProviders,
  isProviderSupported,
  getProviderBrandColor,
} from './registry';

describe('provider registry', () => {
  it('contains spotify, apple, tidal and custom entries', () => {
    expect(Object.keys(providerRegistry).sort()).toEqual(['apple', 'custom', 'spotify', 'tidal']);
  });

  it.each(Object.entries(providerRegistry))(
    '%s entry has an Icon component that renders an svg',
    (type, entry) => {
      expect(typeof entry.Icon).toBe('function');
      const { container } = render(<entry.Icon data-testid="icon" />);
      expect(container.querySelector('svg')).not.toBeNull();
    }
  );

  it.each(Object.entries(providerRegistry))(
    '%s entry carries complete brand info',
    (type, entry) => {
      expect(entry.name).toBeTruthy();
      expect(entry.brandColor).toMatch(/^#/);
      expect(entry.brandTextColor).toMatch(/^#/);
      expect(entry.brandHoverColor).toMatch(/^#/);
    }
  );

  it('getProviderInfo returns the registry entry', () => {
    expect(getProviderInfo('spotify')).toBe(providerRegistry.spotify);
  });

  it('getProviderIcon returns the icon component', () => {
    expect(getProviderIcon('apple')).toBe(providerRegistry.apple.Icon);
  });

  it('getSupportedProviders lists all keys', () => {
    expect(getSupportedProviders()).toEqual(['spotify', 'apple', 'tidal', 'custom']);
  });

  it('isProviderSupported accepts known keys and rejects unknown', () => {
    expect(isProviderSupported('tidal')).toBe(true);
    expect(isProviderSupported('deezer')).toBe(false);
  });

  it('getProviderBrandColor returns brand color', () => {
    expect(getProviderBrandColor('custom')).toBe('#3B82F6');
  });
});
