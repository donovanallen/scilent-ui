'use client';

import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-primitive';
import styled, { css, keyframes } from 'styled-components';
import { IconType } from 'react-icons';
import { IconProps } from '@scilent/icons';

/**
 * Platform variants for styling
 */
export type IconButtonPlatform = 'default' | 'spotify' | 'apple' | 'tidal' | 'custom';

/**
 * IconButton variants
 */
export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/**
 * IconButton sizes
 */
export type IconButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the IconButton component
 */
export interface IconButtonProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.Primitive.button> {
  /**
   * The icon to display
   */
  icon: IconType | React.ComponentType<IconProps | any>;

  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: IconButtonVariant;

  /**
   * The size of the button
   * @default 'md'
   */
  size?: IconButtonSize;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to animate the button on interaction
   * @default true
   */
  animate?: boolean;

  /**
   * The color of the icon
   * @default 'currentColor'
   */
  iconColor?: string;

  /**
   * Custom size for the icon (overrides the default size based on button size)
   */
  iconSize?: number;

  /**
   * Aria label for the button (required for accessibility)
   */
  'aria-label': string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;

  /**
   * Custom colors for different states
   */
  colors?: {
    background?: string;
    hover?: string;
    active?: string;
    text?: string;
    border?: string;
  };

  /**
   * Custom class names for specific elements
   */
  classNames?: {
    icon?: string;
    loadingIndicator?: string;
  };

  /**
   * Custom loading indicator component
   */
  loadingIndicator?: React.ReactNode;

  /**
   * The platform styling to apply
   * @default 'default'
   */
  platform?: IconButtonPlatform;

  /**
   * Whether the button is in an enabled/active state (e.g. shuffle enabled, repeat enabled)
   * Only used for certain platform variants
   * @default false
   */
  isEnabled?: boolean;
}

// Animation for button press
const pressAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.97);
  }
  100% {
    transform: scale(1);
  }
`;

// Animation for loading spinner
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Default loading spinner component
const LoadingSpinner = styled.div<{ $size: IconButtonSize; $color?: string }>`
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: ${({ $color }) => $color || 'currentColor'};
  animation: ${spinAnimation} 0.8s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          width: 12px;
          height: 12px;
          border-width: 2px;
        `;
      case 'lg':
        return css`
          width: 20px;
          height: 20px;
          border-width: 2px;
        `;
      case 'md':
      default:
        return css`
          width: 16px;
          height: 16px;
          border-width: 2px;
        `;
    }
  }}
`;

// Add enabled indicator styling
const EnabledIndicator = styled.div<{
  $size: IconButtonSize;
  $platform?: IconButtonPlatform;
}>`
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #1db954;
  transition: all 0.2s ease;

  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        background-color: #1db954;
      `;
    }
    return null;
  }}
`;

// Styled button component
const StyledButton = styled(Primitive.Primitive.button)<{
  $variant: IconButtonVariant;
  $size: IconButtonSize;
  $isLoading: boolean;
  $disabled: boolean;
  $animate: boolean;
  $colors?: IconButtonProps['colors'];
  $platform?: IconButtonPlatform;
  $isEnabled?: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  overflow: hidden;

  /* Size styles */
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          width: 32px;
          height: 32px;
          min-width: 32px;
          min-height: 32px;
        `;
      case 'lg':
        return css`
          width: 48px;
          height: 48px;
          min-width: 48px;
          min-height: 48px;
        `;
      case 'md':
      default:
        return css`
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
        `;
    }
  }}

  /* Platform-specific styles */
  ${props => {
    if (props.$platform === 'spotify') {
      return css`
        position: relative;
        background-color: transparent;
        color: ${props.$disabled
          ? 'rgba(255, 255, 255, 0.3)'
          : props.$isEnabled
            ? '#1db954'
            : 'rgba(255, 255, 255, 0.7)'};
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
          color: ${props.$isEnabled ? '#1ed760' : '#ffffff'};
          transform: scale(1.05);
        }

        &:active:not(:disabled) {
          transform: scale(0.95);
        }

        ${props.$variant === 'ghost' &&
        css`
          &:hover:not(:disabled) {
            background-color: transparent;
          }
        `}

        ${props.$variant === 'primary' &&
        css`
          background-color: #1db954;
          color: #000000;

          &:hover:not(:disabled) {
            background-color: #1ed760;
            transform: scale(1.05);
          }

          &:active:not(:disabled) {
            background-color: #1aa34a;
          }
        `}
      `;
    }

    if (props.$platform === 'apple') {
      return css`
        /* Apple Music uses a clean design with red accents */
        background-color: ${props.$variant === 'ghost' ? 'transparent' : '#ffffff'};
        color: ${props.$variant === 'primary' ? '#ffffff' : '#fa586a'};

        &:hover:not(:disabled) {
          background-color: ${props.$variant === 'ghost' ? 'rgba(0, 0, 0, 0.05)' : '#f8f8f8'};
        }

        &:active:not(:disabled) {
          background-color: ${props.$variant === 'ghost' ? 'rgba(0, 0, 0, 0.1)' : '#f0f0f0'};
        }

        /* Apple's primary action button (play/pause) */
        ${props.$variant === 'primary' &&
        css`
          background-color: #fa586a;
          background-image: linear-gradient(to bottom right, #fa586a, #fb8c62);

          &:hover:not(:disabled) {
            background-color: #ff6b7e;
            background-image: linear-gradient(to bottom right, #ff6b7e, #fc9d73);
          }

          &:active:not(:disabled) {
            background-color: #e54d5f;
            background-image: linear-gradient(to bottom right, #e54d5f, #ea8057);
          }
        `}
      `;
    }

    if (props.$platform === 'tidal') {
      return css`
        /* Tidal uses a minimalist black and white design */
        background-color: ${props.$variant === 'ghost' ? 'transparent' : '#ffffff'};
        color: ${props.$variant === 'primary' ? '#ffffff' : '#ffffff'};
        border-radius: ${props.$variant === 'primary' ? '50%' : '0'};

        &:hover:not(:disabled) {
          background-color: ${props.$variant === 'ghost' ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0'};
        }

        &:active:not(:disabled) {
          background-color: ${props.$variant === 'ghost' ? 'rgba(255, 255, 255, 0.15)' : '#e0e0e0'};
        }

        /* Tidal's primary action button (play/pause) */
        ${props.$variant === 'primary' &&
        css`
          background-color: #ffffff;
          color: #000000;

          &:hover:not(:disabled) {
            background-color: #f0f0f0;
          }

          &:active:not(:disabled) {
            background-color: #e0e0e0;
          }
        `}
      `;
    }

    return null; // Return to default styling for other platforms
  }}

  /* Variant styles - only applied when platform is default or custom */
  ${({ $variant, $colors, $platform }) => {
    // Skip default variant styling if a specific platform is selected
    if ($platform && $platform !== 'default' && $platform !== 'custom') {
      return null;
    }

    const customBg = $colors?.background;
    const customHover = $colors?.hover;
    const customActive = $colors?.active;
    const customText = $colors?.text;
    const customBorder = $colors?.border;

    switch ($variant) {
      case 'secondary':
        return css`
          background-color: ${customBg || 'var(--color-secondary, #6c757d)'};
          color: ${customText || 'white'};

          &:hover:not(:disabled) {
            background-color: ${customHover || 'var(--color-secondary-hover, #5a6268)'};
          }

          &:active:not(:disabled) {
            background-color: ${customActive || 'var(--color-secondary-active, #545b62)'};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${customText || 'var(--color-primary, #3b82f6)'};
          border: 1px solid ${customBorder || 'var(--color-primary, #3b82f6)'};

          &:hover:not(:disabled) {
            background-color: ${customHover || 'rgba(59, 130, 246, 0.1)'};
          }

          &:active:not(:disabled) {
            background-color: ${customActive || 'rgba(59, 130, 246, 0.2)'};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${customText || 'var(--color-primary, #3b82f6)'};

          &:hover:not(:disabled) {
            background-color: ${customHover || 'rgba(59, 130, 246, 0.1)'};
          }

          &:active:not(:disabled) {
            background-color: ${customActive || 'rgba(59, 130, 246, 0.2)'};
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: ${customBg || 'var(--color-primary, #3b82f6)'};
          color: ${customText || 'white'};

          &:hover:not(:disabled) {
            background-color: ${customHover || 'var(--color-primary-hover, #2563eb)'};
          }

          &:active:not(:disabled) {
            background-color: ${customActive || 'var(--color-primary-active, #1d4ed8)'};
          }
        `;
    }
  }}

  /* Animation styles */
  ${({ $animate, $platform }) => {
    // Spotify has its own animation style
    if ($platform === 'spotify') {
      return css`
        transition: all 0.1s ease;
        &:active:not(:disabled) {
          transform: scale(0.95);
        }
      `;
    }

    return (
      $animate &&
      css`
        &:active:not(:disabled) {
          animation: ${pressAnimation} 0.2s ease;
        }
      `
    );
  }}

  /* Disabled styles */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Focus styles */
  &:focus-visible {
    box-shadow: 0 0 0 2px var(--color-focus-ring, rgba(59, 130, 246, 0.5));
  }

  /* Loading styles */
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      cursor: wait;

      & > * {
        opacity: 0;
      }
    `}
`;

/**
 * IconButton component
 *
 * A button that displays an icon with various states and variants.
 *
 * @example
 * // Basic usage with react-icons
 * import { FiHeart } from 'react-icons/fi';
 *
 * <IconButton
 *   icon={FiHeart}
 *   aria-label="Like"
 *   onClick={() => console.log('Liked!')}
 * />
 *
 * @example
 * // With different variant and size
 * import { FiTrash } from 'react-icons/fi';
 *
 * <IconButton
 *   icon={FiTrash}
 *   variant="outline"
 *   size="lg"
 *   aria-label="Delete item"
 * />
 *
 * @example
 * // Loading state
 * import { FiSave } from 'react-icons/fi';
 *
 * <IconButton
 *   icon={FiSave}
 *   isLoading={isSaving}
 *   aria-label="Save changes"
 * />
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: IconComponent,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      animate = true,
      iconColor,
      iconSize,
      className = '',
      style = {},
      colors = {},
      classNames = {},
      loadingIndicator,
      platform = 'default',
      isEnabled = false,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Determine icon size based on button size
    const getIconSize = () => {
      if (iconSize) return iconSize;

      switch (size) {
        case 'sm':
          return 16;
        case 'lg':
          return 24;
        case 'md':
        default:
          return 20;
      }
    };

    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $isLoading={isLoading}
        $disabled={disabled}
        $animate={animate}
        $colors={colors}
        $platform={platform}
        $isEnabled={isEnabled}
        className={`icon-button ${className}`}
        style={style}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        {...props}
      >
        <IconComponent
          size={getIconSize()}
          color={iconColor}
          className={classNames.icon}
          style={{ transition: 'opacity 0.2s ease' }}
        />
        {isLoading &&
          (loadingIndicator || (
            <LoadingSpinner
              $size={size}
              $color={iconColor}
              className={classNames.loadingIndicator}
            />
          ))}
        {platform === 'spotify' && isEnabled && variant === 'ghost' && (
          <EnabledIndicator $size={size} $platform={platform} />
        )}
      </StyledButton>
    );
  }
);

IconButton.displayName = 'IconButton';
