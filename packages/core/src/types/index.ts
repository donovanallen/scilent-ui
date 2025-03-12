import * as Themes from './theme';
import * as Colors from './colors';
import * as Datetime from './datetime';
import * as Artwork from './artwork';
import * as Artist from './artist';

/**
 * Common types used throughout the library
 */

// Re-export all modules
export { Colors, Themes, Datetime, Artwork, Artist };

// Re-export specific types for easier imports
export type { TimestampVariant, TimestampSize, TimestampFormat } from './datetime';

// Direct exports
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
