import React, { forwardRef } from 'react';
import { IconType } from 'react-icons';
import { IconProps } from './types';
import { AccessibleIcon } from './AccessibleIcon';
import * as Fa from 'react-icons/fa';
import * as Fa6 from 'react-icons/fa6';
import * as Si from 'react-icons/si';

// Define supported music/brand providers
export type ProviderType =
  | 'spotify'
  | 'apple'
  | 'appleMusic'
  | 'tidal'
  | 'youtube'
  | 'youtubeMusic'
  | 'soundcloud'
  | 'bandcamp'
  | 'amazon'
  | 'amazonMusic'
  //   | 'deezer'
  | 'pandora'
  | 'google'
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'github'
  | 'discord';

// Map provider types to their respective icons
const providerIconMap: Record<ProviderType, IconType> = {
  spotify: Si.SiSpotify,
  apple: Fa.FaApple,
  appleMusic: Si.SiApplemusic,
  tidal: Si.SiTidal,
  youtube: Fa.FaYoutube,
  youtubeMusic: Si.SiYoutubemusic,
  soundcloud: Fa.FaSoundcloud,
  bandcamp: Si.SiBandcamp,
  amazon: Fa.FaAmazon,
  amazonMusic: Si.SiAmazonmusic,
  //   deezer: Si.SiDeezer,
  pandora: Si.SiPandora,
  google: Fa.FaGoogle,
  facebook: Fa.FaFacebook,
  twitter: Fa6.FaXTwitter,
  instagram: Fa.FaInstagram,
  github: Fa.FaGithub,
  discord: Fa.FaDiscord,
};

// Map provider types to their brand colors
const providerColorMap: Record<ProviderType, string> = {
  spotify: '#1DB954',
  apple: '#A2AAAD',
  appleMusic: '#FA243C',
  tidal: '#000000',
  youtube: '#FF0000',
  youtubeMusic: '#FF0000',
  soundcloud: '#FF3300',
  bandcamp: '#629aa9',
  amazon: '#FF9900',
  amazonMusic: '#00A8E1',
  //   deezer: '#00C7F2',
  pandora: '#3668FF',
  google: '#4285F4',
  facebook: '#1877F2',
  twitter: '#000000',
  instagram: '#E4405F',
  github: '#181717',
  discord: '#5865F2',
};

export interface ProviderIconProps extends Omit<IconProps, 'strokeWidth'> {
  /**
   * The provider type
   */
  provider: ProviderType;

  /**
   * Whether to use the brand color
   * @default true
   */
  useBrandColor?: boolean;
}

/**
 * ProviderIcon component that renders a music/brand provider logo with accessibility support
 */
export const ProviderIcon = forwardRef<SVGSVGElement, ProviderIconProps>(
  (
    { provider, size = 24, color, useBrandColor = true, label, labelledBy, ...props },
    forwardedRef
  ) => {
    const Icon = providerIconMap[provider];

    if (!Icon) {
      console.error(`Provider "${provider}" not supported`);
      return null;
    }

    // Use brand color if requested and no color is provided
    const iconColor =
      useBrandColor && !color ? providerColorMap[provider] : color || 'currentColor';

    return (
      <AccessibleIcon label={label || `${provider} logo`} labelledBy={labelledBy}>
        <Icon
          //   ref={forwardedRef}
          size={size}
          color={iconColor}
          {...props}
        />
      </AccessibleIcon>
    );
  }
);

ProviderIcon.displayName = 'ProviderIcon';

// Helper functions
export const getProviderIcon = (provider: ProviderType): IconType => providerIconMap[provider];
export const getProviderBrandColor = (provider: ProviderType): string => providerColorMap[provider];
export const getSupportedProviders = (): ProviderType[] =>
  Object.keys(providerIconMap) as ProviderType[];
export const isProviderSupported = (provider: string): provider is ProviderType =>
  Object.keys(providerIconMap).includes(provider);
