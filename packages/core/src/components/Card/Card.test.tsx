import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Card } from './Card';
import { SAMPLE_TRACKS } from '../../utils/sampleData';

expect.extend(toHaveNoViolations);

const pop = SAMPLE_TRACKS.pop;

describe('Card', () => {
  it('renders track title, artist and album', () => {
    render(<Card item={pop} />);
    expect(screen.getByText('Blinding Lights')).toBeInTheDocument();
    expect(screen.getByText('The Weeknd')).toBeInTheDocument();
    expect(screen.getByText('After Hours')).toBeInTheDocument();
  });

  it('renders the artwork image with the track title as alt text', () => {
    render(<Card item={pop} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', pop.coverArt);
    expect(img).toHaveAttribute('alt', 'Blinding Lights album artwork');
  });

  it('hides the album name when showAlbum is false', () => {
    render(<Card item={pop} showAlbum={false} />);
    expect(screen.queryByText('After Hours')).not.toBeInTheDocument();
  });

  it('exposes button semantics when interactive (default)', () => {
    render(<Card item={pop} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not expose button semantics when interactive is false', () => {
    render(<Card item={pop} interactive={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Card item={pop} onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when non-interactive', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Card item={pop} onClick={onClick} interactive={false} />);
    await user.click(screen.getByText('Blinding Lights'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('calls onClick on Enter and Space keydown when interactive', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Card item={pop} onClick={onClick} />);
    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('applies custom className and style', () => {
    render(<Card item={pop} className="my-card" style={{ marginTop: 8 }} />);
    const card = screen.getByRole('button');
    expect(card.className).toContain('my-card');
    expect(card.style.marginTop).toBe('8px');
  });

  it('shows a play button overlay when showPlayButton is set', () => {
    render(<Card item={pop} showPlayButton />);
    expect(screen.getByRole('button', { name: 'Play Blinding Lights' })).toBeInTheDocument();
  });

  it('play button calls onPlay and not the card onClick (stopPropagation)', async () => {
    const onClick = jest.fn();
    const onPlay = jest.fn();
    const user = userEvent.setup();
    render(<Card item={pop} showPlayButton onPlay={onPlay} onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Play Blinding Lights' }));
    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not show the play overlay when interactive is false', () => {
    render(<Card item={pop} showPlayButton interactive={false} />);
    expect(screen.queryByRole('button', { name: 'Play Blinding Lights' })).not.toBeInTheDocument();
  });

  it('renders horizontal layout variants without crashing', () => {
    render(<Card item={SAMPLE_TRACKS.rock} layout="horizontal" size="lg" />);
    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
  });

  it('renders platform styling variants without crashing', () => {
    render(<Card item={SAMPLE_TRACKS.hiphop} platform="spotify" theme="dark" />);
    expect(screen.getByText('N95')).toBeInTheDocument();
  });

  it('renders a track without album data gracefully', () => {
    const track = {
      ...SAMPLE_TRACKS.jazz,
      album: undefined,
    } as unknown as typeof SAMPLE_TRACKS.jazz;
    render(<Card item={track} />);
    expect(screen.getByText('Take Five')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Card item={pop} showPlayButton />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders every platform/theme/size combination without crashing', () => {
    for (const platform of ['default', 'spotify', 'apple', 'tidal'] as const) {
      for (const theme of ['light', 'dark'] as const) {
        for (const size of ['sm', 'md', 'lg'] as const) {
          const { unmount } = render(
            <Card item={pop} platform={platform} theme={theme} size={size} shadow={false} />
          );
          expect(screen.getByText(pop.title)).toBeInTheDocument();
          unmount();
        }
      }
    }
  });

  it('renders every hover effect with every platform', () => {
    for (const hoverEffect of ['none', 'lift', 'scale', 'glow'] as const) {
      for (const platform of ['default', 'spotify', 'apple', 'tidal'] as const) {
        const { unmount } = render(
          <Card item={pop} hoverEffect={hoverEffect} platform={platform} />
        );
        expect(screen.getByText(pop.title)).toBeInTheDocument();
        unmount();
      }
    }
  });

  it('renders horizontal layout at every size', () => {
    for (const size of ['sm', 'md', 'lg'] as const) {
      const { unmount } = render(<Card item={pop} layout="horizontal" size={size} />);
      expect(screen.getByText(pop.title)).toBeInTheDocument();
      unmount();
    }
  });

  it('ignores keydown keys other than Enter and Space', () => {
    const onClick = jest.fn();
    render(<Card item={pop} onClick={onClick} />);
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Escape' });
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when interactive without an onClick handler', () => {
    render(<Card item={pop} />);
    expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow();
  });

  it('supports expandable and zoom artwork flags', () => {
    render(<Card item={pop} expandableArtwork zoomArtwork layout="horizontal" />);
    expect(screen.getByText(pop.title)).toBeInTheDocument();
  });
});
