import React from 'react';
import {
  FaSpotify,
  FaApple,
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaDiscord,
  FaTwitch,
  FaMicrosoft,
  FaAmazon,
} from 'react-icons/fa';
import { SiTidal } from 'react-icons/si';
import { ProviderIconProps } from '../providers/types';

/**
 * Spotify provider icon
 */
export const SpotifyIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const iconColor = useBrandColor ? color || '#1DB954' : color || 'currentColor';
  return <FaSpotify size={size} color={iconColor} {...props} />;
};

/**
 * Apple provider icon
 */
export const AppleIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const iconColor = useBrandColor ? color || '#000000' : color || 'currentColor';
  return <FaApple size={size} color={iconColor} {...props} />;
};

/**
 * Tidal provider icon
 */
export const TidalIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const iconColor = useBrandColor ? color || '#00FFFF' : color || 'currentColor';
  return <SiTidal size={size} color={iconColor} {...props} />;
};

/**
 * Google provider icon
 */
export const GoogleIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = false, // Google icon is multicolor by default
  ...props
}) => {
  return <FaGoogle size={size} color={color || 'currentColor'} {...props} />;
};

/**
 * Facebook provider icon
 */
export const FacebookIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const iconColor = useBrandColor ? color || '#1877F2' : color || 'currentColor';
  return <FaFacebook size={size} color={iconColor} {...props} />;
};

/**
 * Twitter provider icon
 */
export const TwitterIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const iconColor = useBrandColor ? color || '#1DA1F2' : color || 'currentColor';
  return <FaTwitter size={size} color={iconColor} {...props} />;
};

/**
 * GitHub provider icon
 */
export const GitHubIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const iconColor = useBrandColor ? color || '#181717' : color || 'currentColor';
  return <FaGithub size={size} color={iconColor} {...props} />;
};

/**
 * Discord provider icon
 */
export const DiscordIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const iconColor = useBrandColor ? color || '#5865F2' : color || 'currentColor';
  return <FaDiscord size={size} color={iconColor} {...props} />;
};

/**
 * Twitch provider icon
 */
export const TwitchIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const iconColor = useBrandColor ? color || '#9146FF' : color || 'currentColor';
  return <FaTwitch size={size} color={iconColor} {...props} />;
};

/**
 * Microsoft provider icon
 */
export const MicrosoftIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const iconColor = useBrandColor ? color || '#5E5E5E' : color || 'currentColor';
  return <FaMicrosoft size={size} color={iconColor} {...props} />;
};

/**
 * Amazon provider icon
 */
export const AmazonIcon: React.FC<ProviderIconProps> = ({
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const iconColor = useBrandColor ? color || '#FF9900' : color || 'currentColor';
  return <FaAmazon size={size} color={iconColor} {...props} />;
};

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
