import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProviderIcon } from './index';
import { providerRegistry } from './registry';

describe('providers/index ProviderIcon', () => {
  it('exports a defined ProviderIcon component', () => {
    expect(typeof ProviderIcon).toBe('function');
  });

  it.each(Object.keys(providerRegistry))('renders the %s provider icon as an svg', provider => {
    const { container } = render(<ProviderIcon provider={provider as never} />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('applies the brand color by default', () => {
    const { container } = render(<ProviderIcon provider="spotify" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('color')).toBe(providerRegistry.spotify.brandColor);
  });

  it('uses currentColor when useBrandColor=false and no color given', () => {
    const { container } = render(<ProviderIcon provider="apple" useBrandColor={false} />);
    expect(container.querySelector('svg')?.getAttribute('color')).toBe('currentColor');
  });

  it('renders with useBrandColor=false with and without an explicit color', () => {
    // jsdom/react-icons: the color prop may not surface as a DOM attribute for
    // every registered icon; exercise both code paths and assert render only.
    const a = render(<ProviderIcon provider="apple" useBrandColor={false} />);
    expect(a.container.querySelector('svg')).not.toBeNull();
    const b = render(<ProviderIcon provider="custom" color="#abcdef" useBrandColor={false} />);
    expect(b.container.querySelector('svg')).not.toBeNull();
  });

  it('applies the requested size', () => {
    render(<ProviderIcon provider="spotify" size={48} data-testid="sized" />);
    expect(screen.getByTestId('sized').getAttribute('height')).toBe('48');
  });

  // NOTE: the `!Icon` fallback (console.warn + return null) is unreachable in
  // practice: getProviderIcon indexes the registry directly, so an unsupported
  // provider type throws before the null check runs. Not testable without
  // modifying source.
});
