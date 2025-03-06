'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { BiAlbum } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

/**
 * AlbumArtwork size variants
 */
export type AlbumArtworkSize = 'auto' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | number;

/**
 * Platform variants for styling
 */
export type AlbumArtworkPlatform = 'default' | 'apple' | 'spotify' | 'tidal' | 'custom';

/**
 * AlbumArtwork component props
 */
export interface AlbumArtworkProps {
  /**
   * The URL of the album artwork image
   */
  image?: string | null;

  /**
   * The name of the album (used for alt text)
   */
  name: string;

  /**
   * Additional CSS class name for the root element
   */
  className?: string;

  /**
   * Object of class names for specific elements
   */
  classNames?: {
    wrapper?: string;
    image?: string;
    placeholder?: string;
    modal?: string;
    modalContent?: string;
    closeButton?: string;
  };

  /**
   * Whether to prioritize loading the image
   * @default false
   */
  priority?: boolean;

  /**
   * Sizes attribute for the image (responsive)
   * @default '(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw'
   */
  sizes?: string;

  /**
   * Size variant of the artwork
   * @default 'auto'
   */
  size?: AlbumArtworkSize;

  /**
   * Whether to apply a zoom effect on hover
   * @default false
   */
  zoom?: boolean;

  /**
   * Whether the artwork can be expanded to full size
   * @default false
   */
  expandable?: boolean;

  /**
   * Platform-specific styling
   * @default 'default'
   */
  platform?: AlbumArtworkPlatform;

  /**
   * Whether to apply a shadow effect
   * @default false
   */
  shadow?: boolean;

  /**
   * Border radius override
   */
  borderRadius?: string;

  /**
   * Custom styles for the wrapper
   */
  style?: React.CSSProperties;

  /**
   * Callback when the artwork is clicked
   */
  onClick?: () => void;

  /**
   * Custom image component to use instead of the default img element
   * Useful for frameworks with their own image components like Next.js
   */
  ImageComponent?: React.ElementType;

  /**
   * Additional props to pass to the image component
   */
  imageProps?: Record<string, any>;
}

// Size styles mapping
const sizeStyles = {
  auto: 'w-full',
  xs: '32px', // 32px
  sm: '64px', // 64px
  base: '128px', // 128px
  md: '192px', // 192px
  lg: '256px', // 256px
};

// Platform-specific styling
const platformStyles = {
  default: css`
    border-radius: var(--radius-artwork, 8px);
  `,
  // box-shadow: ${(props: { $shadow?: boolean }) => props.$shadow ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none'};
  apple: css`
    border-radius: var(--radius-artwork-apple, 6px);
  `,
  spotify: css`
    border-radius: var(--radius-artwork-spotify, 4px);
  `,
  tidal: css`
    border-radius: var(--radius-artwork-tidal, 0);
  `,
  custom: css`
    /* Custom styles are applied through props */
  `,
};

// Styled components
const ArtworkWrapper = styled.div<{
  $size: AlbumArtworkSize;
  $platform: AlbumArtworkPlatform;
  $shadow: boolean;
  $expandable: boolean;
  $borderRadius?: string;
}>`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: var(--color-artwork-bg, rgba(0, 0, 0, 0.05));

  /* Size styles */
  ${props => {
    if (typeof props.$size === 'number') {
      return css`
        width: ${props.$size}px;
        min-width: ${props.$size}px;
      `;
    }

    if (props.$size === 'auto') {
      return css`
        width: 100%;
      `;
    }

    return css`
      width: ${sizeStyles[props.$size]};
      min-width: ${sizeStyles[props.$size]};

      @media (min-width: 768px) {
        width: ${props.$size === 'base'
          ? '128px'
          : props.$size === 'md'
            ? '192px'
            : props.$size === 'lg'
              ? '256px'
              : sizeStyles[props.$size]};
      }
    `;
  }}

  /* Platform styles */
  ${props => platformStyles[props.$platform]}
  
  /* Custom border radius override */
  ${props =>
    props.$borderRadius &&
    css`
      border-radius: ${props.$borderRadius};
    `}
  
  /* Shadow effect */
  ${props =>
    props.$shadow &&
    props.$platform === 'default' &&
    css`
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    `}
  
  /* Expandable cursor */
  ${props =>
    props.$expandable &&
    css`
      cursor: pointer;
    `}
`;

const ArtworkImage = styled.img<{
  $zoom: boolean;
  $platform: AlbumArtworkPlatform;
  $borderRadius?: string;
}>`
  height: 100%;
  width: 100%;
  object-fit: cover;

  /* Platform-specific border radius for the image */
  ${props => platformStyles[props.$platform as keyof typeof platformStyles]}

  /* Custom border radius override */
  ${props =>
    props.$borderRadius &&
    css`
      border-radius: ${props.$borderRadius};
    `}
  
  /* Zoom effect */
  ${props =>
    props.$zoom &&
    css`
      transition: transform 200ms ease;

      &:hover {
        transform: scale(1.05);
      }
    `}
`;

const PlaceholderIcon = styled(BiAlbum)<{
  $platform: AlbumArtworkPlatform;
}>`
  height: 50%;
  width: 50%;
  color: var(--color-artwork-placeholder, rgba(0, 0, 0, 0.3));
`;

const StyledOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 50;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  max-height: 90vh;
  z-index: 51;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const ModalImage = styled.img`
  max-height: 90vh;
  max-width: 90vw;
  object-fit: contain;
`;

const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: -40px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 150ms ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus-ring, #93c5fd);
    outline-offset: 2px;
  }
`;

/**
 * AlbumArtwork component
 *
 * Displays album artwork with various size options, platform-specific styling,
 * and expandable functionality. Follows accessibility best practices and
 * preserves the integrity of album artwork as specified in the design guidelines.
 */
export const AlbumArtwork = React.forwardRef<HTMLDivElement, AlbumArtworkProps>(
  (
    {
      image,
      name,
      className,
      classNames,
      priority = false,
      sizes,
      size = 'auto',
      zoom = false,
      expandable = false,
      platform = 'default',
      shadow = false,
      borderRadius,
      style,
      onClick,
      ImageComponent,
      imageProps = {},
      ...props
    },
    ref
  ) => {
    // Handle click event
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    // Determine which image component to use
    const ImageEl = ImageComponent || ArtworkImage;

    return (
      <Dialog.Root>
        <ArtworkWrapper
          ref={ref}
          $size={size}
          $platform={platform}
          $shadow={shadow}
          $expandable={expandable}
          $borderRadius={borderRadius}
          className={className}
          style={style}
          onClick={handleClick}
          role={expandable && image ? 'button' : undefined}
          tabIndex={expandable && image ? 0 : undefined}
          aria-label={expandable && image ? `View ${name} album artwork` : undefined}
          onKeyDown={e => {
            if (expandable && image && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleClick();
            }
          }}
          {...props}
        >
          {image ? (
            <Dialog.Trigger asChild disabled={!expandable}>
              {ImageComponent ? (
                <ImageEl
                  src={image}
                  alt={`${name} album artwork`}
                  className={classNames?.image}
                  {...imageProps}
                />
              ) : (
                <ImageEl
                  src={image}
                  alt={`${name} album artwork`}
                  $zoom={zoom}
                  $platform={platform}
                  $borderRadius={borderRadius}
                  className={classNames?.image}
                  loading={priority ? 'eager' : 'lazy'}
                  sizes={sizes}
                />
              )}
            </Dialog.Trigger>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <PlaceholderIcon
                $platform={platform}
                className={classNames?.placeholder}
                aria-hidden="true"
              />
            </div>
          )}
        </ArtworkWrapper>

        {/* Expandable modal dialog */}
        {expandable && image && (
          <Dialog.Portal>
            <StyledOverlay className={classNames?.modal} />
            <StyledContent
              className={classNames?.modalContent}
              aria-label={`${name} album artwork expanded view`}
            >
              <div className="overflow-hidden">
                <ModalImage src={image} alt={`${name} album artwork`} loading="eager" />
              </div>
              <CloseButton className={classNames?.closeButton} aria-label="Close expanded view">
                <IoMdClose size={24} />
              </CloseButton>
            </StyledContent>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    );
  }
);

AlbumArtwork.displayName = 'AlbumArtwork';

export default AlbumArtwork;
