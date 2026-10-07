'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import { AlbumArtwork } from '../Artwork/AlbumArtwork';
import { ArtistLabel } from '../ArtistLabel/ArtistLabel';
import { IconButton } from '../IconButton/IconButton';
import { Slider } from '../Slider/Slider';
import { MetadataLabel } from '../MetadataLabel/MetadataLabel';
import { Timestamp } from '../Timestamp/Timestamp';
import type { MusicTrack } from '../../types';
import { AlbumArtworkSize, AlbumArtworkPlatform } from '@/types/artwork';

/**
 * MusicPlayer variants
 */
export type MusicPlayerVariant = 'default' | 'minimal' | 'compact' | 'expanded';

/**
 * MusicPlayer size variants
 */
export type MusicPlayerSize = 'sm' | 'md' | 'lg';

/**
 * MusicPlayer theme variants
 */
export type MusicPlayerTheme = 'light' | 'dark' | 'auto';

export interface MusicPlayerProps {
  /**
   * The track to play
   */
  track: MusicTrack;

  /**
   * Whether to autoplay the track
   * @default false
   */
  autoPlay?: boolean;

  /**
   * Whether to show the track info
   * @default true
   */
  showTrackInfo?: boolean;

  /**
   * Whether to show the volume control
   * @default true
   */
  showVolumeControl?: boolean;

  /**
   * Whether to show the progress bar
   * @default true
   */
  showProgress?: boolean;

  /**
   * Whether to show the playback controls
   * @default true
   */
  showControls?: boolean;

  /**
   * Whether to show the skip buttons
   * @default true
   */
  showSkipButtons?: boolean;

  /**
   * The variant of the music player
   * @default 'default'
   */
  variant?: MusicPlayerVariant;

  /**
   * The size of the music player
   * @default 'md'
   */
  size?: MusicPlayerSize;

  /**
   * The theme of the music player
   * @default 'light'
   */
  theme?: MusicPlayerTheme;

  /**
   * The platform styling for the album artwork
   * @default 'default'
   */
  platform?: AlbumArtworkPlatform;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;

  /**
   * Callback when the track ends
   */
  onEnded?: () => void;

  /**
   * Callback when the track starts playing
   */
  onPlay?: () => void;

  /**
   * Callback when the track is paused
   */
  onPause?: () => void;

  /**
   * Callback when the track is skipped forward
   */
  onNext?: () => void;

  /**
   * Callback when the track is skipped backward
   */
  onPrevious?: () => void;
}

// Styled components for the music player
const PlayerContainer = styled.div<{
  $variant: MusicPlayerVariant;
  $size: MusicPlayerSize;
  $theme: MusicPlayerTheme;
  $platform?: AlbumArtworkPlatform;
}>`
  display: flex;
  flex-direction: ${props => (props.$variant === 'compact' ? 'row' : 'column')};
  align-items: ${props => (props.$variant === 'compact' ? 'center' : 'stretch')};
  gap: ${props => (props.$size === 'sm' ? '8px' : props.$size === 'md' ? '12px' : '16px')};
  padding: ${props => (props.$size === 'sm' ? '12px' : props.$size === 'md' ? '16px' : '20px')};
  border-radius: 8px;
  background-color: ${props =>
    props.$theme === 'dark'
      ? 'var(--color-background-dark, #1f2937)'
      : 'var(--color-background-light, #ffffff)'};
  color: ${props =>
    props.$theme === 'dark'
      ? 'var(--color-text-dark, #f9fafb)'
      : 'var(--color-text-light, #111827)'};
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 100%; /* Always respect container width */
  transition: all 0.2s ease;
  overflow: hidden; /* Prevent content from extending past container */
  box-sizing: border-box; /* Include padding in width calculation */

  /* Platform-specific styling */
  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        background-color: ${props.$theme === 'dark' ? '#121212' : '#ffffff'};
        color: ${props.$theme === 'dark' ? '#ffffff' : '#000000'};
        border-radius: 4px;
        box-shadow: ${props.$theme === 'dark'
          ? '0 8px 16px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)'};

        /* Spotify compact player has specific styling */
        ${props.$variant === 'compact' &&
        css`
          padding: 8px 16px;
          background-color: ${props.$theme === 'dark' ? 'rgba(40, 40, 40, 0.8)' : '#ffffff'};
          border-radius: 4px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 16px;
        `}
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        background-color: ${props.$theme === 'dark' ? '#1c1c1e' : '#ffffff'};
        color: ${props.$theme === 'dark' ? '#ffffff' : '#000000'};
        border-radius: 12px;
        box-shadow: ${props.$theme === 'dark'
          ? '0 8px 20px rgba(0, 0, 0, 0.3)'
          : '0 4px 16px rgba(0, 0, 0, 0.08)'};

        /* Apple Music compact player has specific styling */
        ${props.$variant === 'compact' &&
        css`
          padding: 0;
          background-color: ${props.$theme === 'dark' ? 'rgba(28, 28, 30, 0.9)' : '#ffffff'};
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 0;
        `}
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        background-color: ${props.$theme === 'dark' ? '#000000' : '#ffffff'};
        color: ${props.$theme === 'dark' ? '#ffffff' : '#000000'};
        border-radius: 0;
        box-shadow: none;

        /* Tidal compact player has specific styling */
        ${props.$variant === 'compact' &&
        css`
          padding: 8px 12px;
          background-color: ${props.$theme === 'dark' ? '#000000' : '#ffffff'};
          border-radius: 0;
        `}
      `;
    }

    return null;
  }}

  /* Adjust compact variant to match the design */
  ${props =>
    props.$variant === 'compact' &&
    css`
      padding: ${props.$size === 'sm'
        ? '8px 12px'
        : props.$size === 'md'
          ? '10px 16px'
          : '12px 20px'};
      justify-content: space-between;
      flex-wrap: nowrap; /* Prevent wrapping */
    `}
    
  /* Adjust expanded variant to match the design */
  ${props =>
    props.$variant === 'expanded' &&
    css`
      /* No fixed max-width to ensure it respects container */
    `}
`;

const TrackInfoContainer = styled.div<{
  $variant: MusicPlayerVariant;
  $platform?: AlbumArtworkPlatform;
}>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  overflow: hidden; /* Ensure content doesn't overflow */

  /* Platform-specific styling */
  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        gap: 10px;
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        gap: 14px;
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        gap: 16px;
      `;
    }

    return null;
  }}

  /* Adjust for compact variant */
  ${props =>
    props.$variant === 'compact' &&
    css`
      width: auto;
      flex: 0 1 auto; /* Allow shrinking but not growing */
      min-width: 0; /* Enable text truncation */
      margin-right: 12px;
      max-width: 50%; /* Limit width to prevent pushing controls off screen */

      /* Platform-specific compact styling */
      ${props.$platform === 'spotify' &&
      css`
        margin-right: 8px;
        max-width: 60%;
      `}

      ${props.$platform === 'apple' &&
      css`
        margin-right: 10px;
        max-width: 55%;
      `}
      
      ${props.$platform === 'tidal' &&
      css`
        margin-right: 16px;
        max-width: 50%;
      `}
    `}
`;

const TrackDetails = styled.div<{
  $variant: MusicPlayerVariant;
  $platform?: AlbumArtworkPlatform;
}>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0; /* Allows text truncation to work */
  overflow: hidden; /* Ensure content doesn't overflow */

  /* Platform-specific styling */
  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        gap: 2px;
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        gap: 3px;
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        gap: 4px;
      `;
    }

    return null;
  }}

  /* Adjust for compact variant */
  ${props =>
    props.$variant === 'compact' &&
    css`
      gap: 2px;
      width: 100%;
    `}
`;

const ControlsContainer = styled.div<{
  $variant: MusicPlayerVariant;
  $platform?: AlbumArtworkPlatform;
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.$variant === 'minimal' ? 'flex-start' : 'center')};
  gap: ${props => (props.$variant === 'compact' ? '4px' : '16px')};

  /* Platform-specific styling */
  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        gap: ${props.$variant === 'compact' ? '2px' : '12px'};
        justify-content: ${props.$variant === 'compact' ? 'flex-end' : 'center'};
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        gap: ${props.$variant === 'compact' ? '6px' : '18px'};
        justify-content: center;
        flex: 0 0 auto;
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        gap: ${props.$variant === 'compact' ? '8px' : '20px'};
        justify-content: ${props.$variant === 'compact' ? 'flex-end' : 'center'};
      `;
    }

    return null;
  }}

  /* Adjust for compact variant */
  ${props =>
    props.$variant === 'compact' &&
    css`
      width: auto;
      flex: 0 0 auto;
    `}
`;

const PlaybackControlsContainer = styled.div<{
  $platform?: AlbumArtworkPlatform;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: nowrap; /* Prevent wrapping */

  /* Platform-specific styling */
  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        gap: 12px;
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        gap: 18px;
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        gap: 20px;
      `;
    }

    return null;
  }}
`;

const ProgressContainer = styled.div<{
  $platform?: AlbumArtworkPlatform;
}>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  overflow: hidden; /* Ensure content doesn't overflow */

  /* Platform-specific styling */
  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        gap: 2px;
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        gap: 6px;
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        gap: 8px;
      `;
    }

    return null;
  }}
`;

const TimeDisplay = styled.div<{
  $platform?: AlbumArtworkPlatform;
}>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;

  /* Platform-specific styling */
  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        font-size: 11px;
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Circular, Helvetica, Arial, sans-serif';
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
        font-family: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif';
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        font-size: 10px;
        color: rgba(255, 255, 255, 0.7);
        font-family: 'Gotham, Helvetica, Arial, sans-serif';
        letter-spacing: 0.5px;
      `;
    }

    return null;
  }}
`;

const VolumeContainer = styled.div<{
  $variant: MusicPlayerVariant;
  $platform?: AlbumArtworkPlatform;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: ${props => (props.$variant === 'compact' ? '160px' : '100%')};
  margin-top: ${props => (props.$variant === 'compact' ? '0' : '12px')};
  overflow: hidden; /* Ensure content doesn't overflow */

  /* Platform-specific styling */
  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        gap: 6px;
        margin-top: ${props.$variant === 'compact' ? '0' : '8px'};
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        gap: 10px;
        margin-top: ${props.$variant === 'compact' ? '0' : '14px'};
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        gap: 12px;
        margin-top: ${props.$variant === 'compact' ? '0' : '16px'};
      `;
    }

    return null;
  }}
`;

const CompactContainer = styled.div<{
  $platform?: AlbumArtworkPlatform;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${props => (props.$platform === 'apple' ? '12px 16px' : '8px 16px')};
  gap: 16px;

  ${props =>
    props.$platform === 'apple' &&
    css`
      justify-content: space-between;
    `}
`;

const CompactProgressContainer = styled.div<{
  $platform?: AlbumArtworkPlatform;
}>`
  width: 100%;
  padding: 0;
  margin: 0;
  height: 3px;

  ${props =>
    props.$platform === 'spotify' &&
    css`
      flex: 1;
      margin: 0 16px;
      min-width: 100px;
    `}
`;

/**
 * A simple playback interface using a combination of Scilent UI components
 */
export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  track,
  autoPlay = false,
  showTrackInfo = true,
  showVolumeControl = true,
  showProgress = true,
  showControls = true,
  showSkipButtons = true,
  variant = 'default',
  size = 'md',
  theme = 'light',
  platform = 'default',
  className = '',
  style = {},
  onEnded,
  onPlay,
  onPause,
  onNext,
  onPrevious,
}) => {
  // Audio state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bufferProgress, setBufferProgress] = useState(0);

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set up event listeners
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };
    const handlePlay = () => {
      setIsPlaying(true);
      if (onPlay) onPlay();
    };
    const handlePause = () => {
      setIsPlaying(false);
      if (onPause) onPause();
    };
    const handleLoadedData = () => setIsLoaded(true);
    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        setBufferProgress((bufferedEnd / audio.duration) * 100);
      }
    };

    // Add event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('progress', handleProgress);

    // Set initial volume
    audio.volume = volume;
    audio.muted = isMuted;

    // Autoplay if enabled
    if (autoPlay && isLoaded) {
      audio.play().catch(error => console.error('Autoplay failed:', error));
    }

    // Clean up event listeners
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('progress', handleProgress);
    };
  }, [autoPlay, isLoaded, onEnded, onPause, onPlay, volume, isMuted]);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset state
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoaded(false);
    setBufferProgress(0);

    // Load new track
    audio.src = track.src;
    audio.load();
  }, [track]);

  // Playback controls
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => console.error('Play failed:', error));
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = value[0];
    setVolume(newVolume);
    audio.volume = newVolume;

    // If volume is set to 0, mute the audio
    if (newVolume === 0) {
      setIsMuted(true);
      audio.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audio.muted = false;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    audio.muted = newMutedState;
  };

  const handlePrevious = () => {
    if (onPrevious) onPrevious();
  };

  const handleNext = () => {
    if (onNext) onNext();
  };

  // Determine artwork size based on player size and variant
  const getArtworkSize = (variant: MusicPlayerVariant, size: MusicPlayerSize): AlbumArtworkSize => {
    if (variant === 'compact') {
      return size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'sm';
    } else if (variant === 'minimal') {
      return size === 'sm' ? 'sm' : size === 'md' ? 'base' : 'md';
    } else if (variant === 'expanded') {
      return size === 'sm' ? 'md' : size === 'md' ? 'lg' : 'lg';
    } else {
      return size === 'sm' ? 'base' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'auto';
    }
  };

  return (
    <PlayerContainer
      $variant={variant}
      $size={size}
      $theme={theme}
      $platform={platform}
      className={`music-player ${className}`}
      style={style}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Apple Music Progress Bar - Only show at top for Apple Music compact variant */}
      {showProgress && variant === 'compact' && platform === 'apple' && (
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          size="sm"
          variant="minimal"
          bufferValue={duration * (bufferProgress / 100)}
          showBuffer={true}
          disabled={!isLoaded}
          platform={platform}
          thumbVisibility="hover"
          style={{ margin: 0 }}
          aria-label="Track progress"
        />
      )}

      <CompactContainer $platform={platform}>
        {/* Track info section */}
        {showTrackInfo && (
          <TrackInfoContainer $variant={variant} $platform={platform}>
            <AlbumArtwork
              image={track.coverArt}
              name={track.title}
              size={getArtworkSize(variant, size)}
              shadow={variant !== 'compact'}
              platform={platform}
              style={{ flexShrink: 0 }}
            />
            <TrackDetails $variant={variant} $platform={platform}>
              <MetadataLabel
                text={track.title}
                truncate={true}
                maxLength={variant === 'compact' ? 16 : 30}
                as="h3"
                style={{
                  fontWeight: 600,
                  fontSize: size === 'sm' ? '14px' : size === 'md' ? '16px' : '18px',
                  margin: 0,
                  lineHeight: variant === 'compact' ? '1.2' : 'normal',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  ...(platform === 'spotify' && {
                    fontFamily: 'Circular, Helvetica, Arial, sans-serif',
                    fontWeight: 700,
                  }),
                  ...(platform === 'apple' && {
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 600,
                  }),
                  ...(platform === 'tidal' && {
                    fontFamily: 'Gotham, Helvetica, Arial, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                  }),
                }}
              />
              <ArtistLabel
                artists={track.artist}
                truncate={true}
                maxLength={variant === 'compact' ? 16 : 30}
                style={{
                  fontSize: size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px',
                  color: 'var(--color-text-muted, #6b7280)',
                  lineHeight: variant === 'compact' ? '1.2' : 'normal',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  ...(platform === 'spotify' && {
                    fontFamily: 'Circular, Helvetica, Arial, sans-serif',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: size === 'sm' ? '11px' : size === 'md' ? '13px' : '15px',
                  }),
                  ...(platform === 'apple' && {
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                  }),
                  ...(platform === 'tidal' && {
                    fontFamily: 'Gotham, Helvetica, Arial, sans-serif',
                    color: 'rgba(255, 255, 255, 0.7)',
                    letterSpacing: '0.3px',
                    textTransform: 'uppercase',
                    fontSize: size === 'sm' ? '10px' : size === 'md' ? '11px' : '12px',
                  }),
                }}
              />
              {track.album && variant !== 'compact' && (
                <MetadataLabel
                  text={track.album}
                  truncate={true}
                  maxLength={30}
                  style={{
                    fontSize: size === 'sm' ? '11px' : size === 'md' ? '12px' : '14px',
                    color: 'var(--color-text-muted, #6b7280)',
                    fontStyle: 'italic',
                    ...(platform === 'spotify' && {
                      fontFamily: 'Circular, Helvetica, Arial, sans-serif',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontStyle: 'normal',
                    }),
                    ...(platform === 'apple' && {
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                    }),
                    ...(platform === 'tidal' && {
                      fontFamily: 'Gotham, Helvetica, Arial, sans-serif',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontStyle: 'normal',
                      letterSpacing: '0.3px',
                    }),
                  }}
                />
              )}
            </TrackDetails>
          </TrackInfoContainer>
        )}

        {/* Spotify Progress Bar - Show inline for Spotify compact variant */}
        {showProgress && variant === 'compact' && platform === 'spotify' && (
          <CompactProgressContainer $platform={platform}>
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              size="sm"
              variant="minimal"
              bufferValue={duration * (bufferProgress / 100)}
              showBuffer={true}
              disabled={!isLoaded}
              platform={platform}
              thumbVisibility="hover"
              style={{ margin: 0 }}
              aria-label="Track progress"
            />
          </CompactProgressContainer>
        )}

        {/* Progress bar - Only show in non-compact variants or if explicitly requested */}
        {showProgress && variant !== 'compact' && (
          <ProgressContainer $platform={platform}>
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
              variant={platform === 'spotify' || platform === 'apple' ? 'minimal' : 'default'}
              bufferValue={duration * (bufferProgress / 100)}
              showBuffer={true}
              disabled={!isLoaded}
              platform={platform}
              thumbVisibility={platform === 'spotify' || platform === 'apple' ? 'hover' : 'always'}
              aria-label="Track progress"
            />
            <TimeDisplay $platform={platform}>
              <Timestamp value={currentTime} format="duration" variant="muted" size="sm" />
              <Timestamp value={duration || 0} format="duration" variant="muted" size="sm" />
            </TimeDisplay>
          </ProgressContainer>
        )}

        {/* Controls section */}
        {showControls && (
          <ControlsContainer $variant={variant} $platform={platform}>
            {variant === 'compact' ? (
              <>
                {/* For Apple Music, show timestamp before controls */}
                {platform === 'apple' && showProgress && (
                  <Timestamp
                    value={currentTime}
                    format="duration"
                    variant="muted"
                    size="sm"
                    style={{
                      marginRight: '8px',
                      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                    }}
                  />
                )}

                {showSkipButtons && (
                  <IconButton
                    icon={BiSkipPrevious}
                    aria-label="Previous track"
                    onClick={handlePrevious}
                    variant="ghost"
                    size="sm"
                    platform={platform}
                    style={{ padding: '4px' }}
                    disabled={!isLoaded}
                  />
                )}
                <IconButton
                  icon={isPlaying ? FiPause : FiPlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  onClick={togglePlayPause}
                  variant={platform === 'spotify' ? 'ghost' : 'primary'}
                  size="sm"
                  disabled={!isLoaded}
                  platform={platform}
                  style={{ padding: '4px' }}
                />
                {showSkipButtons && (
                  <IconButton
                    icon={BiSkipNext}
                    aria-label="Next track"
                    onClick={handleNext}
                    variant="ghost"
                    size="sm"
                    platform={platform}
                    style={{ padding: '4px' }}
                    disabled={!isLoaded}
                  />
                )}

                {/* For compact variant, show volume button without slider */}
                {showVolumeControl && (
                  <IconButton
                    icon={isMuted || volume === 0 ? FiVolumeX : FiVolume2}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    onClick={toggleMute}
                    variant="ghost"
                    size="sm"
                    platform={platform}
                    isEnabled={!isMuted && volume > 0}
                  />
                )}

                {/* For Spotify, show timestamp after controls */}
                {platform === 'spotify' && showProgress && (
                  <Timestamp
                    value={currentTime}
                    format="duration"
                    variant="muted"
                    size="sm"
                    style={{
                      marginLeft: '8px',
                      fontFamily: 'Circular, Helvetica, Arial, sans-serif',
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  />
                )}
              </>
            ) : (
              <PlaybackControlsContainer $platform={platform}>
                {showSkipButtons && (
                  <IconButton
                    icon={BiSkipPrevious}
                    aria-label="Previous track"
                    onClick={handlePrevious}
                    variant="ghost"
                    size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
                    platform={platform}
                  />
                )}
                <IconButton
                  icon={isPlaying ? FiPause : FiPlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  onClick={togglePlayPause}
                  variant="primary"
                  size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
                  disabled={!isLoaded}
                  platform={platform}
                />
                {showSkipButtons && (
                  <IconButton
                    icon={BiSkipNext}
                    aria-label="Next track"
                    onClick={handleNext}
                    variant="ghost"
                    size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
                    platform={platform}
                  />
                )}
              </PlaybackControlsContainer>
            )}
          </ControlsContainer>
        )}
      </CompactContainer>

      {/* Volume control - Only show in non-compact variants */}
      {showVolumeControl && variant !== 'compact' && (
        <VolumeContainer $variant={variant} $platform={platform}>
          <IconButton
            icon={isMuted || volume === 0 ? FiVolumeX : FiVolume2}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            onClick={toggleMute}
            variant="ghost"
            size={size === 'sm' ? 'sm' : 'md'}
            platform={platform}
            isEnabled={!isMuted && volume > 0}
          />
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            size="sm"
            variant={platform === 'spotify' || platform === 'apple' ? 'minimal' : 'minimal'}
            platform={platform}
            thumbVisibility={platform === 'spotify' || platform === 'apple' ? 'hover' : 'always'}
            aria-label="Volume"
          />
        </VolumeContainer>
      )}
    </PlayerContainer>
  );
};

export default MusicPlayer;
