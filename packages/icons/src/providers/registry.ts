import React from 'react';
import { CustomIcon } from './icons';
import { ProviderRegistry, ProviderType } from './types';
import { FaSpotify, FaApple } from 'react-icons/fa';
import { SiTidal } from 'react-icons/si';
import { IconType } from 'react-icons';

// Create a wrapper for CustomIcon to match IconType interface
const CustomIconWrapper = (props: any) => {
  return React.createElement(CustomIcon, props);
};

/**
 * Registry of supported authentication providers
 */
export const providerRegistry: ProviderRegistry = {
  spotify: {
    name: 'Spotify',
    brandColor: '#1DB954',
    brandTextColor: '#FFFFFF',
    brandHoverColor: '#1AA34A',
    Icon: FaSpotify,
  },
  apple: {
    name: 'Apple',
    brandColor: '#000000',
    brandTextColor: '#FFFFFF',
    brandHoverColor: '#333333',
    Icon: FaApple,
  },
  tidal: {
    name: 'Tidal',
    brandColor: '#00FFFF',
    brandTextColor: '#000000',
    brandHoverColor: '#00CCCC',
    Icon: SiTidal,
  },
  custom: {
    name: 'Custom',
    brandColor: '#3B82F6',
    brandTextColor: '#FFFFFF',
    brandHoverColor: '#2563EB',
    Icon: CustomIconWrapper as unknown as IconType,
  },
};

/**
 * Get provider information by type
 */
export const getProviderInfo = (type: ProviderType) => {
  return providerRegistry[type];
};

/**
 * Get provider icon component by type
 */
export const getProviderIcon = (type: ProviderType) => {
  return providerRegistry[type].Icon;
};

/**
 * Get all supported provider types
 */
export const getSupportedProviders = (): ProviderType[] => {
  return Object.keys(providerRegistry) as ProviderType[];
};

/**
 * Check if a provider type is supported
 */
export const isProviderSupported = (type: string): type is ProviderType => {
  return type in providerRegistry;
};

/**
 * Get provider brand color
 */
export const getProviderBrandColor = (type: ProviderType): string => {
  return providerRegistry[type].brandColor;
};

/**
 * Get provider brand text color
 */
export const getProviderBrandTextColor = (type: ProviderType): string => {
  return providerRegistry[type].brandTextColor;
};

/**
 * Get provider brand hover color
 */
export const getProviderBrandHoverColor = (type: ProviderType): string => {
  return providerRegistry[type].brandHoverColor;
};
