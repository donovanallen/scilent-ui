import { render } from '@testing-library/react';
import * as icons from '../index';

it('AccessibleIcon / Icon / ProviderIcon render as React components', () => {
  const { container } = render(
    <>
      <icons.AccessibleIcon>x</icons.AccessibleIcon>
      <icons.Icon name="Play" />
      <icons.ProviderIcon provider="spotify" />
    </>
  );
  expect(container.querySelectorAll('span').length).toBeGreaterThanOrEqual(2);
  expect(container.querySelectorAll('svg').length).toBe(2);
});

describe('icons package public exports', () => {
  const documented = [
    'AccessibleIcon',
    'Icon',
    'ProviderIcon',
    'PhosphorIconContext',
    'ReactIconContext',
  ];

  it.each(documented)('exports %s', name => {
    expect(icons).toHaveProperty(name);
    expect(icons[name as keyof typeof icons]).toBeDefined();
  });

  it('AccessibleIcon / Icon / ProviderIcon are React components', () => {
    // forwardRef components are objects ($$typeof) rather than plain functions
    for (const name of ['AccessibleIcon', 'Icon', 'ProviderIcon'] as const) {
      expect(icons[name]).toHaveProperty('$$typeof');
    }
  });

  it('exposes React contexts (objects with a Provider)', () => {
    expect(icons.PhosphorIconContext).toHaveProperty('Provider');
    expect(icons.ReactIconContext).toHaveProperty('Provider');
  });
});
