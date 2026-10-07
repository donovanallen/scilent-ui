import { vintageColors } from '../tokens/colors';
import { musicTypography } from '../tokens/typography';
import { spacing } from '../tokens/spacing';
import type { Theme } from '../tokens/types';

/**
 * Vintage theme - a warm, retro-inspired theme for music applications
 */
export const vintageTheme: Theme = {
  name: 'vintage',
  colors: vintageColors,
  typography: musicTypography,
  spacing,
};
