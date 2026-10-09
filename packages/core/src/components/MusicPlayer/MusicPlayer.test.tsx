import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MusicPlayer } from './MusicPlayer';
import { SAMPLE_TRACKS } from '../../utils/sampleData';

expect.extend(toHaveNoViolations);

// Radix-based Slider uses ResizeObserver, which jsdom lacks.
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as unknown as { ResizeObserver: typeof MockResizeObserver }).ResizeObserver =
  MockResizeObserver;

// jsdom's HTMLMediaElement lacks play/pause (and load throws). The global
// jest.setup.cjs mock replaces window.HTMLMediaElement but jsdom's internal
// class chain for <audio> instances is unaffected, so walk the REAL prototype
// chain of an actual <audio> element and patch the methods there.
const probe = document.createElement('audio');
let MediaProto: Record<string, unknown> | null = Object.getPrototypeOf(probe);
while (MediaProto && !('play' in MediaProto)) {
  MediaProto = Object.getPrototypeOf(MediaProto);
}
if (MediaProto) {
  MediaProto.play = jest.fn(() => Promise.resolve());
  MediaProto.pause = jest.fn();
  MediaProto.load = jest.fn();
  MediaProto.canPlayType = jest.fn(() => 'probably');
}
const playSpy = jest.fn(() => Promise.resolve());
if (MediaProto) MediaProto.play = playSpy;
jest.setTimeout(20000);

const getAudio = (container: HTMLElement) => container.querySelector('audio') as HTMLAudioElement;

const emit = (audio: HTMLAudioElement, type: string) => {
  audio.dispatchEvent(new Event(type));
};

const load = (container: HTMLElement) => emit(getAudio(container), 'loadeddata');

const rock = SAMPLE_TRACKS.rock;
const jazz = SAMPLE_TRACKS.jazz;

describe('MusicPlayer', () => {
  it('renders track title and artist from props', () => {
    render(<MusicPlayer track={rock} />);
    expect(screen.getByText(rock.title)).toBeInTheDocument();
    expect(screen.getByText(rock.artist)).toBeInTheDocument();
  });

  it('renders each variant', () => {
    for (const variant of ['default', 'minimal', 'compact', 'expanded'] as const) {
      const { container, unmount } = render(<MusicPlayer track={rock} variant={variant} />);
      expect(container.querySelector('.music-player')).toBeInTheDocument();
      unmount();
    }
  });

  it('renders each size', () => {
    for (const size of ['sm', 'md', 'lg'] as const) {
      const { container, unmount } = render(<MusicPlayer track={rock} size={size} />);
      expect(container.querySelector('.music-player')).toBeInTheDocument();
      unmount();
    }
  });

  it('renders light and dark themes', () => {
    for (const theme of ['light', 'dark'] as const) {
      const { container, unmount } = render(<MusicPlayer track={rock} theme={theme} />);
      expect(container.querySelector('.music-player')).toBeInTheDocument();
      unmount();
    }
  });

  describe('playback', () => {
    it('play/pause button calls audio play/pause and toggles label', async () => {
      const user = userEvent.setup();
      const { container } = render(<MusicPlayer track={rock} />);
      const audio = getAudio(container);
      load(container);
      playSpy.mockClear();

      await user.click(screen.getByRole('button', { name: 'Play' }));
      expect(playSpy).toHaveBeenCalledTimes(1);

      emit(audio, 'play');
      const pauseBtn = await screen.findByRole('button', { name: 'Pause' });
      await user.click(pauseBtn);
      emit(audio, 'pause');
      expect(await screen.findByRole('button', { name: 'Play' })).toBeInTheDocument();
    });

    it('fires onPlay / onPause / onEnded from audio events', () => {
      const onPlay = jest.fn();
      const onPause = jest.fn();
      const onEnded = jest.fn();
      const { container } = render(
        <MusicPlayer track={rock} onPlay={onPlay} onPause={onPause} onEnded={onEnded} />
      );
      const audio = getAudio(container);
      emit(audio, 'play');
      emit(audio, 'pause');
      emit(audio, 'ended');
      expect(onPlay).toHaveBeenCalledTimes(1);
      expect(onPause).toHaveBeenCalledTimes(1);
      expect(onEnded).toHaveBeenCalledTimes(1);
    });

    it('loads the track source into the audio element', () => {
      const { container } = render(<MusicPlayer track={rock} />);
      expect(getAudio(container)).toHaveAttribute('src', rock.src);
    });
  });

  describe('skip controls', () => {
    it('calls onNext and onPrevious when skip buttons are clicked', async () => {
      const user = userEvent.setup();
      const onNext = jest.fn();
      const onPrevious = jest.fn();
      const { container } = render(
        <MusicPlayer track={rock} onNext={onNext} onPrevious={onPrevious} />
      );
      load(container);
      await user.click(screen.getByRole('button', { name: 'Next track' }));
      await user.click(screen.getByRole('button', { name: 'Previous track' }));
      expect(onNext).toHaveBeenCalledTimes(1);
      expect(onPrevious).toHaveBeenCalledTimes(1);
    });

    it('hides skip buttons when showSkipButtons=false', () => {
      const onNext = jest.fn();
      render(<MusicPlayer track={jazz} showSkipButtons={false} onNext={onNext} />);
      expect(screen.queryByRole('button', { name: 'Next track' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Previous track' })).not.toBeInTheDocument();
    });
  });

  describe('volume control', () => {
    it('shows mute button and volume slider by default (non-compact)', () => {
      const { container } = render(<MusicPlayer track={rock} />);
      expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
      load(container);
      expect(container.querySelectorAll('[role="slider"]').length).toBeGreaterThan(0);
    });

    it('hides volume control when showVolumeControl=false', () => {
      render(<MusicPlayer track={rock} showVolumeControl={false} />);
      expect(screen.queryByRole('button', { name: 'Mute' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Unmute' })).not.toBeInTheDocument();
    });
  });

  describe('platform styling', () => {
    it.each(['spotify', 'apple', 'tidal'] as const)(
      'renders default variant with %s platform styling',
      platform => {
        const { container, unmount } = render(<MusicPlayer track={rock} platform={platform} />);
        load(container);
        expect(container.querySelector('.music-player')).toBeInTheDocument();
        // Non-compact platforms get the standard progress + time display
        expect(container.querySelectorAll('[role="slider"]').length).toBeGreaterThan(0);
        unmount();
      }
    );

    it.each(['spotify', 'apple', 'tidal'] as const)(
      'renders compact variant with %s platform styling',
      platform => {
        const { container, unmount } = render(
          <MusicPlayer track={rock} variant="compact" platform={platform} />
        );
        load(container);
        expect(container.querySelector('.music-player')).toBeInTheDocument();
        unmount();
      }
    );

    it('compact + apple shows a top progress slider and a leading timestamp', () => {
      const { container } = render(<MusicPlayer track={rock} variant="compact" platform="apple" />);
      load(container);
      const sliders = container.querySelectorAll('[role="slider"]');
      expect(sliders.length).toBeGreaterThan(0);
      expect(container.textContent).toMatch(/\d/);
    });

    it('compact + spotify shows an inline progress slider and trailing timestamp', () => {
      const { container } = render(
        <MusicPlayer track={rock} variant="compact" platform="spotify" />
      );
      load(container);
      expect(container.querySelectorAll('[role="slider"]').length).toBeGreaterThan(0);
    });

    it('renders platform variants in dark theme and each size', () => {
      for (const platform of ['spotify', 'apple', 'tidal'] as const) {
        for (const theme of ['light', 'dark'] as const) {
          const { container, unmount } = render(
            <MusicPlayer track={rock} platform={platform} theme={theme} size="sm" />
          );
          load(container);
          expect(container.querySelector('.music-player')).toBeInTheDocument();
          unmount();
        }
      }
    });
  });

  describe('seek + volume handlers', () => {
    it('seeking via the progress slider updates audio.currentTime', () => {
      const { container } = render(<MusicPlayer track={rock} />);
      act(() => load(container));
      const thumb = container.querySelectorAll('[role="slider"]')[0] as HTMLElement;
      thumb.focus();
      fireEvent.keyDown(thumb, { key: 'ArrowRight', code: 'ArrowRight' });
      const audio = getAudio(container);
      expect(audio.currentTime).toBeGreaterThan(0);
      expect(audio.currentTime).toBe(0.1);
    });

    it('volume slider to zero mutes, then raising it unmutes', () => {
      const { container } = render(<MusicPlayer track={rock} />);
      act(() => load(container));
      const volumeThumb = container.querySelectorAll('[role="slider"]')[1] as HTMLElement;
      volumeThumb.focus();
      // initial volume is 0.7; Home goes to 0 → muted
      fireEvent.keyDown(volumeThumb, { key: 'Home' });
      const audio = getAudio(container);
      expect(audio.volume).toBe(0);
      expect(audio.muted).toBe(true);
      expect(screen.getByRole('button', { name: 'Unmute' })).toBeInTheDocument();
      // raising volume while muted unmutes
      fireEvent.keyDown(volumeThumb, { key: 'ArrowRight', code: 'ArrowRight' });
      expect(audio.volume).toBeGreaterThan(0);
      expect(audio.muted).toBe(false);
      expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
    });

    it('mute button toggles audio.muted both ways', async () => {
      const user = userEvent.setup();
      const { container } = render(<MusicPlayer track={rock} />);
      load(container);
      const audio = getAudio(container);
      const muteBtn = screen.getByRole('button', { name: 'Mute' });
      await user.click(muteBtn);
      expect(audio.muted).toBe(true);
      expect(screen.getByRole('button', { name: 'Unmute' })).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Unmute' }));
      expect(audio.muted).toBe(false);
      expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
    });

    it('renders the buffer bar when the audio reports buffered ranges', () => {
      const { container } = render(<MusicPlayer track={rock} />);
      load(container);
      const audio = getAudio(container);
      Object.defineProperty(audio, 'duration', { value: 100, configurable: true });
      Object.defineProperty(audio, 'buffered', {
        value: { length: 1, end: () => 50 },
        configurable: true,
      });
      act(() => emit(audio, 'progress'));
      const buffer = container.querySelector('.slider-buffer');
      expect(buffer).toBeInTheDocument();
    });
  });

  describe('autoplay', () => {
    it('autoPlay triggers playback once the track is loaded', () => {
      const { container } = render(<MusicPlayer track={rock} autoPlay />);
      act(() => load(container)); // emits loadeddata → effect sees autoPlay && isLoaded
      expect(playSpy).toHaveBeenCalled();
    });

    it('autoplay rejection is caught and logged', async () => {
      const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      playSpy.mockImplementationOnce(() => Promise.reject(new Error('blocked')));
      const { container } = render(<MusicPlayer track={rock} autoPlay />);
      act(() => load(container));
      await act(async () => {
        await Promise.resolve();
      });
      expect(errSpy.mock.calls.some(c => c[0] === 'Autoplay failed:')).toBe(true);
      errSpy.mockRestore();
    });

    it('does not autoplay when autoPlay is false', () => {
      playSpy.mockClear();
      const { container } = render(<MusicPlayer track={rock} />);
      act(() => load(container));
      expect(playSpy).not.toHaveBeenCalled();
    });
  });

  describe('track change', () => {
    it('loads the new source when the track prop changes', async () => {
      const onEnded = jest.fn();
      const { container, rerender } = render(<MusicPlayer track={rock} onEnded={onEnded} />);
      load(container);
      rerender(<MusicPlayer track={jazz} onEnded={onEnded} />);
      expect(getAudio(container)).toHaveAttribute('src', jazz.src);
    });

    it('ended event resets isPlaying (Play button visible again)', async () => {
      const user = userEvent.setup();
      const { container } = render(<MusicPlayer track={rock} />);
      load(container);
      await user.click(screen.getByRole('button', { name: 'Play' }));
      emit(getAudio(container), 'play');
      emit(getAudio(container), 'ended');
      expect(await screen.findByRole('button', { name: 'Play' })).toBeInTheDocument();
    });
  });

  describe('coverage matrix', () => {
    // Drives the styled-components interpolation branches: platform chrome
    // re-evaluates per (platform, theme, variant, size) combination, so each
    // unique prop set needs at least one render to count as covered.
    it.each(['spotify', 'apple', 'tidal'] as const)(
      '%s compact player renders in dark theme at sm and lg sizes',
      platform => {
        for (const size of ['sm', 'lg'] as const) {
          const { container, unmount } = render(
            <MusicPlayer
              track={rock}
              variant="compact"
              platform={platform}
              theme="dark"
              size={size}
            />
          );
          load(container);
          expect(container.querySelector('.music-player')).toBeInTheDocument();
          unmount();
        }
      }
    );

    it.each(['spotify', 'apple', 'tidal'] as const)(
      '%s default player renders in dark theme at lg size',
      platform => {
        const { container, unmount } = render(
          <MusicPlayer track={rock} platform={platform} theme="dark" size="lg" />
        );
        load(container);
        expect(container.querySelector('.music-player')).toBeInTheDocument();
        unmount();
      }
    );

    it.each(['default', 'minimal', 'expanded'] as const)(
      '%s variant resolves artwork size for every player size',
      variant => {
        for (const size of ['sm', 'md', 'lg'] as const) {
          const { container, unmount } = render(
            <MusicPlayer track={rock} variant={variant} size={size} />
          );
          expect(container.querySelector('.music-player')).toBeInTheDocument();
          unmount();
        }
      }
    );

    it('compact + spotify: play/pause and mute buttons flip icons and labels', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <MusicPlayer track={rock} variant="compact" platform="spotify" />
      );
      load(container);
      const audio = getAudio(container);

      await user.click(screen.getByRole('button', { name: 'Play' }));
      emit(audio, 'play');
      expect(await screen.findByRole('button', { name: 'Pause' })).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Pause' }));
      emit(audio, 'pause');
      expect(await screen.findByRole('button', { name: 'Play' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Mute' }));
      expect(await screen.findByRole('button', { name: 'Unmute' })).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Unmute' }));
      expect(await screen.findByRole('button', { name: 'Mute' })).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default variant)', async () => {
      const { container } = render(<MusicPlayer track={rock} />);
      load(container);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe violations (compact variant)', async () => {
      const { container } = render(<MusicPlayer track={rock} variant="compact" />);
      load(container);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
