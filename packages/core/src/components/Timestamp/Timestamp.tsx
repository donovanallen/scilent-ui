import React, { useState, useEffect, useRef } from 'react';
import * as Primitive from '@radix-ui/react-primitive';
import styled, { css, keyframes } from 'styled-components';
import type { TimestampVariant, TimestampSize, TimestampFormat } from '../../types';
import { formatDuration, formatRelativeTime, formatDateTime } from './utils';

export interface TimestampProps {
  /**
   * The value to display, can be:
   * - number (seconds for duration, milliseconds for date)
   * - Date object
   * - ISO string
   */
  value: number | Date | string;

  /**
   * The variant of the timestamp
   * @default 'default'
   */
  variant?: TimestampVariant;

  /**
   * The size of the timestamp
   * @default 'md'
   */
  size?: TimestampSize;

  /**
   * The format to display the timestamp in
   * @default 'duration' for numbers, 'relative' for dates
   */
  format?: TimestampFormat;

  /**
   * Custom format string for date/time (follows Intl.DateTimeFormat options)
   * Only used when format is 'custom'
   */
  customFormat?: Intl.DateTimeFormatOptions;

  /**
   * Custom locale for formatting
   * @default system locale
   */
  locale?: string;

  /**
   * Whether to animate changes
   * @default false
   */
  animate?: boolean;

  /**
   * Whether to update relative times automatically
   * @default true for relative format
   */
  autoUpdate?: boolean;

  /**
   * Update interval in milliseconds for relative times
   * @default 60000 (1 minute)
   */
  updateInterval?: number;

  /**
   * Additional CSS class name
   */
  className?: string;
}

// Animation for smooth transitions
const fadeChange = keyframes`
  0% {
    opacity: 0.5;
    transform: translateY(2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Define the styled timestamp component
const StyledTimestamp = styled(Primitive.Primitive.span)<{
  $variant: TimestampVariant;
  $size: TimestampSize;
  $animate: boolean;
}>`
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono, monospace);
  transition: color 150ms ease;

  ${props =>
    props.$animate &&
    css`
      &.timestamp-changed {
        animation: ${fadeChange} 300ms ease-out;
      }
    `}

  /* Size variants */
  ${props =>
    props.$size === 'sm' &&
    css`
      font-size: 12px;
    `}

  ${props =>
    props.$size === 'md' &&
    css`
      font-size: 14px;
    `}

  ${props =>
    props.$size === 'lg' &&
    css`
      font-size: 16px;
    `}

  /* Style variants */
  ${props =>
    props.$variant === 'default' &&
    css`
      color: var(--color-text, #111827);
    `}

  ${props =>
    props.$variant === 'muted' &&
    css`
      color: var(--color-text-muted, #6b7280);
    `}

  ${props =>
    props.$variant === 'highlight' &&
    css`
      color: var(--color-primary, #3b82f6);
      font-weight: 500;
    `}

  ${props =>
    props.$variant === 'contrast' &&
    css`
      color: var(--color-text-contrast, #ffffff);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    `}
`;

/**
 * Timestamp component for displaying various time-related information
 *
 * Supports durations, relative times, and formatted dates/times
 */
export const Timestamp = React.forwardRef<HTMLSpanElement, TimestampProps>(
  (
    {
      value,
      variant = 'default',
      size = 'md',
      format,
      customFormat,
      locale = navigator.language,
      animate = false,
      autoUpdate = true,
      updateInterval = 60000, // 1 minute
      className = '',
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState<string>('');
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const prevValueRef = useRef<string>('');

    // Determine the default format based on the value type
    const determineFormat = (): TimestampFormat => {
      if (format) return format;

      if (typeof value === 'number') {
        return 'duration';
      } else {
        return 'relative';
      }
    };

    const actualFormat = determineFormat();

    // Format the value based on its type and the specified format
    const formatValue = () => {
      try {
        // Handle number values (assumed to be seconds for duration)
        if (typeof value === 'number') {
          if (actualFormat === 'duration') {
            return formatDuration(value, value >= 3600);
          } else {
            // Treat number as timestamp in milliseconds
            const date = new Date(value);
            return formatDateTime(date, actualFormat, locale, customFormat);
          }
        }

        // Handle Date objects
        if (value instanceof Date) {
          if (actualFormat === 'relative') {
            return formatRelativeTime(value, locale);
          } else {
            return formatDateTime(value, actualFormat, locale, customFormat);
          }
        }

        // Handle string values (assumed to be ISO date strings)
        if (typeof value === 'string') {
          const date = new Date(value);
          if (isNaN(date.getTime())) {
            return value; // If not a valid date, just return the string
          }

          if (actualFormat === 'relative') {
            return formatRelativeTime(date, locale);
          } else {
            return formatDateTime(date, actualFormat, locale, customFormat);
          }
        }

        return String(value);
      } catch (error) {
        console.error('Error formatting timestamp:', error);
        return String(value);
      }
    };

    // Update the displayed value
    useEffect(() => {
      const newValue = formatValue();
      setDisplayValue(newValue);

      // Check if the value has changed for animation
      if (animate && prevValueRef.current && prevValueRef.current !== newValue) {
        setIsChanged(true);
        const timer = setTimeout(() => setIsChanged(false), 300);
        return () => clearTimeout(timer);
      }

      prevValueRef.current = newValue;
    }, [value, actualFormat, locale, customFormat]);

    // Set up auto-updating for relative times
    useEffect(() => {
      if (autoUpdate && actualFormat === 'relative' && updateInterval > 0) {
        const intervalId = setInterval(() => {
          setDisplayValue(formatValue());
        }, updateInterval);

        return () => clearInterval(intervalId);
      }
    }, [value, actualFormat, autoUpdate, updateInterval]);

    return (
      <StyledTimestamp
        ref={ref}
        as="span"
        $variant={variant}
        $size={size}
        $animate={animate}
        className={`timestamp ${isChanged ? 'timestamp-changed' : ''} ${className}`}
        {...props}
      >
        {displayValue}
      </StyledTimestamp>
    );
  }
);

Timestamp.displayName = 'Timestamp';
