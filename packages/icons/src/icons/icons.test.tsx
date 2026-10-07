import React from 'react';
import { render } from '@testing-library/react';
import {
  SpotifyIcon,
  AppleIcon,
  TidalIcon,
  GoogleIcon,
  FacebookIcon,
  TwitterIcon,
  GitHubIcon,
  DiscordIcon,
  TwitchIcon,
  MicrosoftIcon,
  AmazonIcon,
  CustomIcon,
} from './icons';

const cases: [string, React.ComponentType<any>, string][] = [
  ['SpotifyIcon', SpotifyIcon, '#1DB954'],
  ['AppleIcon', AppleIcon, '#000000'],
  ['TidalIcon', TidalIcon, '#00FFFF'],
  ['FacebookIcon', FacebookIcon, '#1877F2'],
  ['TwitterIcon', TwitterIcon, '#1DA1F2'],
  ['GitHubIcon', GitHubIcon, '#181717'],
  ['DiscordIcon', DiscordIcon, '#5865F2'],
  ['TwitchIcon', TwitchIcon, '#9146FF'],
  ['MicrosoftIcon', MicrosoftIcon, '#5E5E5E'],
  ['AmazonIcon', AmazonIcon, '#FF9900'],
];

describe('legacy provider icon components (icons.tsx)', () => {
  it.each(cases)('%s renders an svg with its brand color', (name, Cmp, brand) => {
    const { container } = render(<Cmp data-testid="icon" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toBeInTheDocument();
    expect(svg.getAttribute('color')).toBe(brand);
  });

  it('GoogleIcon falls back to currentColor (multicolor by default)', () => {
    const { container } = render(<GoogleIcon data-testid="icon" />);
    expect(container.querySelector('svg')).toHaveAttribute('color', 'currentColor');
  });

  it('all honor an explicit color override', () => {
    const { container } = render(<SpotifyIcon color="#abcdef" data-testid="icon" />);
    expect(container.querySelector('svg')).toHaveAttribute('color', '#abcdef');
  });

  it('all honor size', () => {
    const { container } = render(<AppleIcon size={40} data-testid="icon" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '40');
    expect(svg).toHaveAttribute('height', '40');
  });

  it('useBrandColor=false falls back to currentColor', () => {
    const { container } = render(<SpotifyIcon useBrandColor={false} data-testid="icon" />);
    expect(container.querySelector('svg')).toHaveAttribute('color', 'currentColor');
  });

  it('CustomIcon renders its placeholder circle/plus svg', () => {
    const { container } = render(<CustomIcon data-testid="icon" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toBeInTheDocument();
    expect(svg.querySelector('circle')).not.toBeNull();
    expect(svg.querySelector('path')).not.toBeNull();
  });
});
