/**
 * Timestamp utility functions for use throughout the application
 */

/**
 * Format a duration in seconds to MM:SS or HH:MM:SS format
 *
 * @param seconds - Duration in seconds
 * @param showHours - Whether to always show hours (even if 0)
 * @returns Formatted duration string
 */
export const formatDuration = (seconds: number, showHours = false): string => {
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
 *
 * @param date - Date to format
 * @param locale - Locale to use for formatting
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date, locale = 'en'): string => {
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
 * Calculate total duration of tracks in seconds
 *
 * @param trackDurations - Array of track durations in seconds
 * @returns Total duration in seconds
 */
export const calculateTotalDuration = (trackDurations: number[]): number => {
  return trackDurations.reduce((total, duration) => total + duration, 0);
};

/**
 * Format a date using Intl.DateTimeFormat with common music-related presets
 *
 * @param date - Date to format
 * @param format - Format preset to use
 * @param locale - Locale to use for formatting
 * @param customOptions - Custom Intl.DateTimeFormat options (for 'custom' format)
 * @returns Formatted date string
 */
export const formatDateTime = (
  date: Date,
  format:
    | 'date'
    | 'time'
    | 'datetime'
    | 'shortDate'
    | 'shortTime'
    | 'shortDatetime'
    | 'yearMonth'
    | 'monthDay'
    | 'weekday'
    | 'custom' = 'datetime',
  locale = 'en',
  customOptions?: Intl.DateTimeFormatOptions
): string => {
  if (format === 'custom' && customOptions) {
    return new Intl.DateTimeFormat(locale, customOptions).format(date);
  }

  const options: Record<string, Intl.DateTimeFormatOptions> = {
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
  };

  return new Intl.DateTimeFormat(locale, options[format] || options.datetime).format(date);
};

/**
 * Convert milliseconds to seconds
 *
 * @param ms - Time in milliseconds
 * @returns Time in seconds
 */
export const msToSeconds = (ms: number): number => {
  return Math.floor(ms / 1000);
};

/**
 * Convert seconds to milliseconds
 *
 * @param seconds - Time in seconds
 * @returns Time in milliseconds
 */
export const secondsToMs = (seconds: number): number => {
  return seconds * 1000;
};

/**
 * Format a duration in a human-readable way (e.g., "2h 15m" or "45m 30s")
 *
 * @param seconds - Duration in seconds
 * @returns Human-readable duration string
 */
export const formatDurationHuman = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0s';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  let result = '';

  if (hours > 0) {
    result += `${hours}h `;
  }

  if (minutes > 0 || hours > 0) {
    result += `${minutes}m `;
  }

  if (secs > 0 || (hours === 0 && minutes === 0)) {
    result += `${secs}s`;
  }

  return result.trim();
};
