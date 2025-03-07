/**
 * Common types used throughout the library
 */

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverArt?: string;
  duration: number; // in seconds
  src: string;
}

// Button types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Timestamp types
export type TimestampVariant = 'default' | 'muted' | 'highlight' | 'contrast';
export type TimestampSize = 'sm' | 'md' | 'lg';
export type TimestampFormat =
  | 'duration' // MM:SS or HH:MM:SS format for track lengths
  | 'relative' // "2 days ago", "in 3 hours", etc.
  | 'date' // "Mar 15, 2023"
  | 'time' // "3:45 PM"
  | 'datetime' // "Mar 15, 2023, 3:45 PM"
  | 'shortDate' // "03/15/23"
  | 'shortTime' // "15:45"
  | 'shortDatetime' // "03/15 15:45"
  | 'yearMonth' // "March 2023"
  | 'monthDay' // "March 15"
  | 'weekday' // "Tuesday"
  | 'custom'; // Custom format using Intl.DateTimeFormat options

// ToggleGroup types
// export type ToggleGroupType = 'single' | 'multiple';
// export type ToggleGroupSize = 'sm' | 'md' | 'lg';
// export type ToggleGroupVariant = 'default' | 'outline' | 'ghost';

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
  error: string;
  success: string;
}

// CSS Variables interface for theming
export interface CSSVariables {
  // Base colors
  '--color-primary': string;
  '--color-primary-light': string;
  '--color-primary-dark': string;
  '--color-secondary': string;
  '--color-secondary-light': string;
  '--color-secondary-dark': string;
  '--color-text': string;
  '--color-background': string;
  '--color-background-hover': string;
  '--color-border': string;
  '--color-border-focus': string;
  '--color-focus-ring': string;

  // Component-specific colors
  '--color-switch-bg': string;
  '--color-scrollbar-bg': string;
  '--color-scrollbar-bg-hover': string;
  '--color-scrollbar-thumb': string;
  '--color-scrollbar-thumb-hover': string;
  '--color-scrollbar-thumb-active': string;
  '--color-scrollbar-corner': string;
  '--color-toggle-group-bg': string;
  '--color-toggle-group-border': string;
  '--color-toggle-group-separator': string;
  '--color-toggle-on-bg': string;
  '--color-toggle-on-text': string;
  '--color-toggle-hover-bg': string;

  // Album artwork specific variables
  '--color-artwork-bg': string;
  '--color-artwork-placeholder': string;
  '--radius-artwork': string;
  '--radius-artwork-apple': string;
  '--radius-artwork-spotify': string;
  '--radius-artwork-tidal': string;
}
