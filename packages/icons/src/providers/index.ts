// Export types
export * from './types';

// Export icons
export * from './icons';

// Export registry and utilities
export * from './registry';

// Export a generic ProviderIcon component
import React from 'react';
import { IconType } from 'react-icons';
import { ProviderIconProps, ProviderType } from './types';
import { getProviderIcon, getProviderBrandColor } from './registry';

export interface GenericProviderIconProps extends Omit<ProviderIconProps, 'useBrandColor'> {
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
 * Generic provider icon component that renders the appropriate icon based on the provider type
 */
export const ProviderIcon: React.FC<GenericProviderIconProps> = ({
  provider,
  size = 24,
  color,
  useBrandColor = true,
  ...props
}) => {
  const Icon = getProviderIcon(provider);

  if (!Icon) {
    console.warn(`No icon found for provider: ${provider}`);
    return null; // Or return a fallback icon
  }

  const iconColor = useBrandColor
    ? color || getProviderBrandColor(provider)
    : color || 'currentColor';

  // Use createElement instead of JSX to avoid build issues
  return React.createElement(Icon, {
    size,
    color: iconColor,
    ...props,
  });
};
