import React, { useState, useEffect, useRef } from 'react';
import * as Primitive from '@radix-ui/react-primitive';
import styled, { css, keyframes } from 'styled-components';
import type { TimestampVariant, TimestampSize, TimestampFormat } from '../../types';

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
 * Format a duration in seconds to MM:SS or HH:MM:SS format
 */
const formatDuration = (seconds: number, showHours = false): string => {
  if (isNaN(seconds) || seconds < 0) return '00:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (showHours || hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format a date to a relative time string (e.g., "2 days ago")
 */
const formatRelativeTime = (date: Date, locale = 'en'): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffDay / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffSec < 60) {
    return rtf.format(-diffSec, 'second');
  } else if (diffMin < 60) {
    return rtf.format(-diffMin, 'minute');
  } else if (diffHour < 24) {
    return rtf.format(-diffHour, 'hour');
  } else if (diffDay < 30) {
    return rtf.format(-diffDay, 'day');
  } else if (diffMonth < 12) {
    return rtf.format(-diffMonth, 'month');
  } else {
    return rtf.format(-diffYear, 'year');
  }
};

/**
 * Format a date using Intl.DateTimeFormat with various presets
 */
const formatDateTime = (
  date: Date,
  format: TimestampFormat = 'datetime',
  locale = 'en',
  customOptions?: Intl.DateTimeFormatOptions
): string => {
  if (format === 'custom' && customOptions) {
    return new Intl.DateTimeFormat(locale, customOptions).format(date);
  }

  const options: Record<TimestampFormat, Intl.DateTimeFormatOptions> = {
    date: { year: 'numeric', month: 'short', day: 'numeric' },
    time: { hour: 'numeric', minute: 'numeric' },
    datetime: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    },
    shortDate: { month: 'numeric', day: 'numeric', year: '2-digit' },
    shortTime: { hour: 'numeric', minute: 'numeric' },
    shortDatetime: { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
    yearMonth: { year: 'numeric', month: 'long' },
    monthDay: { month: 'long', day: 'numeric' },
    weekday: { weekday: 'long' },
    relative: { year: 'numeric', month: 'short', day: 'numeric' }, // Fallback for relative
    duration: { hour: 'numeric', minute: 'numeric', second: 'numeric' }, // Fallback for duration
    custom: { year: 'numeric', month: 'short', day: 'numeric' }, // Fallback for custom
  };

  return new Intl.DateTimeFormat(locale, options[format] || options.datetime).format(date);
};

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
            return formatDateTime(new Date(value), actualFormat, locale, customFormat);
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
