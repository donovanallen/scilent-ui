import React from 'react';
import { IconProps } from './types';

/**
 * Pause icon for music playback
 */
export const PauseIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="6" y="4" width="4" height="16" fill={color} />
      <rect x="14" y="4" width="4" height="16" fill={color} />
    </svg>
  );
};
