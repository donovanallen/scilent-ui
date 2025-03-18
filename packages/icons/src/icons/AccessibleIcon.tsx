import React, { forwardRef } from 'react';

interface AccessibleIconProps {
  /**
   * The icon component to render
   */
  children: React.ReactNode;

  /**
   * The accessible label for the icon
   */
  label?: string;

  /**
   * The ID of an element that labels the icon
   */
  labelledBy?: string;
}

/**
 * AccessibleIcon component that wraps an icon and provides accessibility attributes
 * Inspired by Radix UI's AccessibleIcon component
 */
export const AccessibleIcon = forwardRef<HTMLSpanElement, AccessibleIconProps>(
  ({ children, label, labelledBy }, forwardedRef) => {
    // If no label or labelledBy is provided, the icon is presentational
    const isPresentation = !label && !labelledBy;

    return (
      <span
        ref={forwardedRef}
        role={isPresentation ? 'presentation' : undefined}
        aria-hidden={isPresentation ? 'true' : undefined}
        aria-label={label}
        aria-labelledby={labelledBy}
        style={{ display: 'inline-flex' }}
      >
        {children}
      </span>
    );
  }
);

AccessibleIcon.displayName = 'AccessibleIcon';
