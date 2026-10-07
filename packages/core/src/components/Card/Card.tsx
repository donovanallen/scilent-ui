'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { AlbumArtwork, AlbumArtworkSize, AlbumArtworkPlatform } from '../Artwork/AlbumArtwork';
import { MetadataLabel } from '../MetadataLabel/MetadataLabel';
import { ArtistLabel } from '../ArtistLabel/ArtistLabel';
import type { MusicTrack } from '../../types';

/**
 * Card size variants
 */
export type CardSize = 'sm' | 'md' | 'lg';

/**
 * Card layout variants
 */
export type CardLayout = 'vertical' | 'horizontal';

/**
 * Card theme variants
 */
export type CardTheme = 'light' | 'dark' | 'auto';

/**
 * Card hover effect variants
 */
export type CardHoverEffect = 'none' | 'lift' | 'scale' | 'glow';

/**
 * Card props
 */
export interface CardProps {
  /**
   * The track or album to display
   */
  item: MusicTrack;

  /**
   * The size of the card
   * @default 'md'
   */
  size?: CardSize;

  /**
   * The layout of the card
   * @default 'vertical'
   */
  layout?: CardLayout;

  /**
   * The theme of the card
   * @default 'light'
   */
  theme?: CardTheme;

  /**
   * The hover effect to apply
   * @default 'lift'
   */
  hoverEffect?: CardHoverEffect;

  /**
   * Whether to show the album name
   * @default true
   */
  showAlbum?: boolean;

  /**
   * Whether to apply a shadow effect
   * @default true
   */
  shadow?: boolean;

  /**
   * Whether to make the artwork expandable
   * @default false
   */
  expandableArtwork?: boolean;

  /**
   * Whether to apply a zoom effect on artwork hover
   * @default false
   */
  zoomArtwork?: boolean;

  /**
   * Platform-specific styling
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
   * Click handler for the card
   */
  onClick?: () => void;

  /**
   * Whether the card is interactive (clickable)
   * @default true
   */
  interactive?: boolean;

  /**
   * Whether to show a play button overlay on hover
   * @default false
   */
  showPlayButton?: boolean;

  /**
   * Callback when the play button is clicked
   */
  onPlay?: () => void;
}

// Styled components
const CardContainer = styled.div<{
  $size: CardSize;
  $layout: CardLayout;
  $theme: CardTheme;
  $hoverEffect: CardHoverEffect;
  $shadow: boolean;
  $interactive: boolean;
  $platform?: AlbumArtworkPlatform;
}>`
  display: flex;
  flex-direction: ${props => (props.$layout === 'vertical' ? 'column' : 'row')};
  align-items: ${props => (props.$layout === 'vertical' ? 'flex-start' : 'center')};
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
  box-shadow: ${props =>
    props.$shadow
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      : 'none'};
  width: 100%;
  transition: all 0.2s ease;
  overflow: hidden;
  box-sizing: border-box;
  cursor: ${props => (props.$interactive ? 'pointer' : 'default')};
  position: relative;

  /* Platform-specific styling */
  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        background-color: ${props.$theme === 'dark' ? '#181818' : '#ffffff'};
        color: ${props.$theme === 'dark' ? '#ffffff' : '#000000'};
        border-radius: 6px;
        padding: ${props.$size === 'sm' ? '10px' : props.$size === 'md' ? '14px' : '18px'};
        box-shadow: ${props.$shadow
          ? props.$theme === 'dark'
            ? '0 8px 24px rgba(0, 0, 0, 0.5)'
            : '0 8px 24px rgba(0, 0, 0, 0.1)'
          : 'none'};
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        background-color: ${props.$theme === 'dark' ? '#1c1c1e' : '#ffffff'};
        color: ${props.$theme === 'dark' ? '#ffffff' : '#000000'};
        border-radius: 12px;
        padding: ${props.$size === 'sm' ? '12px' : props.$size === 'md' ? '16px' : '20px'};
        box-shadow: ${props.$shadow
          ? props.$theme === 'dark'
            ? '0 8px 20px rgba(0, 0, 0, 0.3)'
            : '0 8px 20px rgba(0, 0, 0, 0.08)'
          : 'none'};
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        background-color: ${props.$theme === 'dark' ? '#000000' : '#ffffff'};
        color: ${props.$theme === 'dark' ? '#ffffff' : '#000000'};
        border-radius: 0;
        padding: ${props.$size === 'sm' ? '12px' : props.$size === 'md' ? '16px' : '20px'};
        box-shadow: none;
      `;
    }

    return null;
  }}

  /* Hover effects */
  ${props => {
    if (!props.$interactive) return null;

    switch (props.$hoverEffect) {
      case 'lift':
        return css`
          &:hover {
            transform: translateY(-4px);
            box-shadow:
              0 10px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
        `;
      case 'scale':
        return css`
          &:hover {
            transform: scale(1.03);
          }
        `;
      case 'glow':
        return css`
          &:hover {
            box-shadow: 0 0 20px
              rgba(
                ${props.$platform === 'spotify'
                  ? '29, 185, 84, 0.5'
                  : props.$platform === 'apple'
                    ? '250, 88, 106, 0.5'
                    : props.$platform === 'tidal'
                      ? '255, 255, 255, 0.2'
                      : '59, 130, 246, 0.5'}
              );
          }
        `;
      default:
        return null;
    }
  }}
  
  /* Size-specific styling */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return css`
          max-width: ${props.$layout === 'vertical' ? '160px' : '100%'};
        `;
      case 'lg':
        return css`
          max-width: ${props.$layout === 'vertical' ? '240px' : '100%'};
        `;
      case 'md':
      default:
        return css`
          max-width: ${props.$layout === 'vertical' ? '200px' : '100%'};
        `;
    }
  }}
`;

const ContentContainer = styled.div<{
  $layout: CardLayout;
  $size: CardSize;
}>`
  display: flex;
  flex-direction: column;
  gap: ${props => (props.$size === 'sm' ? '4px' : props.$size === 'md' ? '6px' : '8px')};
  width: ${props => (props.$layout === 'vertical' ? '100%' : 'auto')};
  flex: ${props => (props.$layout === 'horizontal' ? '1' : 'none')};
  overflow: hidden;
`;

const PlayButtonOverlay = styled.div<{
  $platform?: AlbumArtworkPlatform;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: inherit;

  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        &::after {
          content: '';
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #1db954;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E");
          background-size: 50%;
          background-position: center;
          background-repeat: no-repeat;
        }
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        &::after {
          content: '';
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, #fa586a, #fb8c62);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E");
          background-size: 50%;
          background-position: center;
          background-repeat: no-repeat;
        }
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        &::after {
          content: '';
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #ffffff;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E");
          background-size: 50%;
          background-position: center;
          background-repeat: no-repeat;
        }
      `;
    }

    return css`
      &::after {
        content: '';
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--color-primary, #3b82f6);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E");
        background-size: 50%;
        background-position: center;
        background-repeat: no-repeat;
      }
    `;
  }}

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

/**
 * Card component for displaying music tracks or albums
 *
 * @example
 * // Basic usage
 * <Card item={track} />
 *
 * @example
 * // With platform-specific styling
 * <Card
 *   item={track}
 *   platform="spotify"
 *   theme="dark"
 *   hoverEffect="lift"
 *   showPlayButton
 *   onPlay={() => playTrack(track.id)}
 * />
 *
 * @example
 * // Horizontal layout
 * <Card
 *   item={track}
 *   layout="horizontal"
 *   size="lg"
 *   showAlbum={false}
 * />
 */
export const Card: React.FC<CardProps> = ({
  item,
  size = 'md',
  layout = 'vertical',
  theme = 'light',
  hoverEffect = 'lift',
  showAlbum = true,
  shadow = true,
  expandableArtwork = false,
  zoomArtwork = false,
  platform = 'default',
  className = '',
  style = {},
  onClick,
  interactive = true,
  showPlayButton = false,
  onPlay,
}) => {
  // Determine artwork size based on card size and layout
  const getArtworkSize = (): AlbumArtworkSize => {
    if (layout === 'horizontal') {
      return size === 'sm' ? 'sm' : size === 'md' ? 'base' : 'md';
    } else {
      return 'auto'; // Full width for vertical layout
    }
  };

  // Handle click events
  const handleClick = (e: React.MouseEvent) => {
    if (interactive && onClick) {
      onClick();
    }
  };

  // Handle play button click
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (onPlay) {
      onPlay();
    }
  };

  return (
    <CardContainer
      $size={size}
      $layout={layout}
      $theme={theme}
      $hoverEffect={hoverEffect}
      $shadow={shadow}
      $interactive={interactive}
      $platform={platform}
      className={`music-card ${className}`}
      style={style}
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={e => {
        if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <AlbumArtwork
        image={item.coverArt}
        name={item.title}
        size={getArtworkSize()}
        shadow={false} // We're already applying shadow to the card
        platform={platform}
        expandable={expandableArtwork}
        zoom={zoomArtwork}
        style={layout === 'vertical' ? { width: '100%' } : undefined}
      />

      <ContentContainer $layout={layout} $size={size}>
        <MetadataLabel
          text={item.title}
          truncate={true}
          maxLength={size === 'sm' ? 20 : size === 'md' ? 25 : 30}
          as="h3"
          style={{
            fontWeight: 600,
            fontSize: size === 'sm' ? '14px' : size === 'md' ? '16px' : '18px',
            margin: 0,
            lineHeight: 1.2,
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
          artists={item.artist}
          truncate={true}
          maxLength={size === 'sm' ? 20 : size === 'md' ? 25 : 30}
          style={{
            fontSize: size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px',
            color: 'var(--color-text-muted, #6b7280)',
            lineHeight: 1.2,
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

        {showAlbum && item.album && (
          <MetadataLabel
            text={item.album}
            truncate={true}
            maxLength={size === 'sm' ? 20 : size === 'md' ? 25 : 30}
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
      </ContentContainer>

      {showPlayButton && interactive && (
        <PlayButtonOverlay
          $platform={platform}
          onClick={handlePlayClick}
          role="button"
          aria-label={`Play ${item.title}`}
        />
      )}
    </CardContainer>
  );
};

export default Card;
