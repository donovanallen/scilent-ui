import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AlbumArtwork } from './AlbumArtwork';

expect.extend(toHaveNoViolations);

const IMG = 'https://example.com/album.jpg';
const FALLBACK = 'https://example.com/fallback.jpg';

describe('AlbumArtwork', () => {
  it('renders the image with the album name as alt text', () => {
    render(<AlbumArtwork image={IMG} name="After Hours" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', IMG);
    expect(img).toHaveAttribute('alt', 'After Hours album artwork');
  });

  it('shows a placeholder when no image is provided', () => {
    render(<AlbumArtwork image={null} name="No Cover" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('shows a placeholder when image is undefined', () => {
    render(<AlbumArtwork name="No Cover" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('swaps to the fallback image when the primary image fails', () => {
    render(<AlbumArtwork image={IMG} fallbackImage={FALLBACK} name="Broken" />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', FALLBACK);
  });

  it('falls back to the placeholder when the fallback also fails', () => {
    render(<AlbumArtwork image={IMG} fallbackImage={FALLBACK} name="Double Broken" />);
    const img = screen.getByRole('img');
    fireEvent.error(img); // primary fails → fallback
    fireEvent.error(screen.getByRole('img')); // fallback fails → placeholder
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('fires onClick when clicked', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<AlbumArtwork image={IMG} name="Clickable" onClick={onClick} />);
    await user.click(screen.getByRole('img'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('exposes button semantics when expandable with an image', () => {
    render(<AlbumArtwork image={IMG} name="Expand Me" expandable />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-label', 'View Expand Me album artwork');
    expect(btn).toHaveAttribute('tabindex', '0');
  });

  it('does not expose button semantics when not expandable or when placeholder shows', () => {
    const { unmount } = render(<AlbumArtwork image={IMG} name="Static" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    unmount();
    render(<AlbumArtwork image={null} name="Static" expandable />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('activates via keyboard (Enter/Space) when expandable', () => {
    const onClick = jest.fn();
    render(<AlbumArtwork image={IMG} name="Keyboard" expandable onClick={onClick} />);
    const btn = screen.getByRole('button');
    fireEvent.keyDown(btn, { key: 'Enter' });
    fireEvent.keyDown(btn, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('supports a custom ImageComponent', () => {
    const CustomImg = (props: any) => <img data-testid="custom-img" {...props} />;
    render(
      <AlbumArtwork
        image={IMG}
        name="Custom"
        ImageComponent={CustomImg}
        imageProps={{ 'data-foo': 'bar' }}
      />
    );
    const img = screen.getByTestId('custom-img');
    expect(img).toHaveAttribute('src', IMG);
    expect(img).toHaveAttribute('data-foo', 'bar');
  });

  it('applies loading priority as eager vs lazy', () => {
    const { unmount } = render(<AlbumArtwork image={IMG} name="Eager" priority />);
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager');
    unmount();
    render(<AlbumArtwork image={IMG} name="Lazy" />);
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy');
  });

  it('renders all size variants', () => {
    for (const size of ['xs', 'sm', 'base', 'md', 'lg', 200] as const) {
      const { unmount } = render(
        <AlbumArtwork image={IMG} name={`S-${size}`} size={size as any} />
      );
      expect(screen.getByRole('img')).toBeInTheDocument();
      unmount();
    }
  });

  it('has no axe violations for the default image variant', async () => {
    const { container, unmount } = render(<AlbumArtwork image={IMG} name="A11y" />);
    expect(await axe(container)).toHaveNoViolations();
    unmount();
  });

  it('has no axe violations for the placeholder variant', async () => {
    const { container, unmount } = render(<AlbumArtwork image={null} name="A11y Placeholder" />);
    expect(await axe(container)).toHaveNoViolations();
    unmount();
  });

  it('has no axe violations for the expandable variant', async () => {
    const { container, unmount } = render(
      <AlbumArtwork image={IMG} name="A11y Expand" expandable />
    );
    expect(await axe(container)).toHaveNoViolations();
    unmount();
  });

  it('has no axe violations per platform variant', async () => {
    for (const platform of ['default', 'apple', 'spotify', 'tidal', 'custom'] as const) {
      const { container, unmount } = render(
        <AlbumArtwork image={IMG} name={`P-${platform}`} platform={platform} />
      );
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});
