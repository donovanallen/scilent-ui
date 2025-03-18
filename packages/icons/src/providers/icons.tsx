import React from 'react';
import { IconType } from 'react-icons';
import { FaSpotify, FaApple } from 'react-icons/fa';
import { SiTidal } from 'react-icons/si';
import { ProviderIconProps } from './types';

/**
 * Create a provider icon component with brand color support
 */
export const createProviderIcon = (Icon: IconType, defaultBrandColor: string) => {
  const ProviderIcon: React.FC<ProviderIconProps> = ({
    size = 24,
    color,
    useBrandColor = true,
    ...props
  }) => {
    const iconColor = useBrandColor ? color || defaultBrandColor : color || 'currentColor';
    return <Icon size={size} color={iconColor} {...props} />;
  };

  return ProviderIcon;
};

/**
 * Spotify provider icon
 */
export const SpotifyIcon = createProviderIcon(FaSpotify, '#1DB954');

/**
 * Apple provider icon
 */
export const AppleIcon = createProviderIcon(FaApple, '#000000');

/**
 * Tidal provider icon
 */
export const TidalIcon = createProviderIcon(SiTidal, '#00FFFF');

/**
 * Custom provider icon (placeholder)
 */
export const CustomIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
};
