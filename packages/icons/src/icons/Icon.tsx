import React, { forwardRef } from 'react';
import { IconProps as BaseIconProps } from './types';
import { AccessibleIcon } from './AccessibleIcon';
import * as PhosphorIcons from '@phosphor-icons/react';

export interface IconProps extends Omit<BaseIconProps, 'name'> {
  /**
   * The name of the Phosphor icon to render
   */
  name: keyof typeof PhosphorIcons;

  /**
   * The weight of the icon
   * @default 'regular'
   */
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

/**
 * Icon component that renders a Phosphor icon with accessibility support
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    { name, size = 24, color = 'currentColor', weight = 'regular', label, labelledBy, ...props },
    forwardedRef
  ) => {
    // Get the icon component from Phosphor
    const IconComponent = PhosphorIcons[name] as React.ComponentType<any>;

    if (!IconComponent) {
      console.error(`Icon "${name}" not found in Phosphor Icons`);
      return null;
    }

    return (
      <AccessibleIcon label={label} labelledBy={labelledBy}>
        <IconComponent ref={forwardedRef} size={size} color={color} weight={weight} {...props} />
      </AccessibleIcon>
    );
  }
);

Icon.displayName = 'Icon';
