import { SVGProps } from 'react';
import { IconType } from 'react-icons';

/**
 * Supported authentication providers
 */
export type ProviderType =
  | 'spotify'
  | 'apple'
  | 'tidal'
  | 'google'
  | 'facebook'
  | 'twitter'
  | 'github'
  | 'discord'
  | 'twitch'
  | 'microsoft'
  | 'amazon'
  | 'custom';

/**
 * Provider icon properties
 */
export interface ProviderIconProps extends SVGProps<SVGSVGElement> {
  /**
   * The size of the icon
   * @default 24
   */
  size?: number;

  /**
   * The color of the icon
   * If not provided, the brand color will be used
   */
  color?: string;

  /**
   * Whether to use the brand color
   * @default true
   */
  useBrandColor?: boolean;
}

/**
 * Provider information
 */
export interface ProviderInfo {
  /**
   * The name of the provider
   */
  name: string;

  /**
   * The brand color of the provider
   */
  brandColor: string;

  /**
   * The brand text color (for contrast with brand color)
   */
  brandTextColor: string;

  /**
   * The brand hover color
   */
  brandHoverColor: string;
}

/**
 * Provider registry entry
 */
export interface ProviderRegistryEntry extends ProviderInfo {
  /**
   * The icon component for the provider
   */
  Icon: IconType;
}

/**
 * Provider registry
 */
export type ProviderRegistry = Record<ProviderType, ProviderRegistryEntry>;
