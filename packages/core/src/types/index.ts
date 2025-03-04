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

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

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
