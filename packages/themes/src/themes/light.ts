import { lightColors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing } from '../tokens/spacing';
import type { Theme } from '../tokens/types';

/**
 * Light theme
 */
export const lightTheme: Theme = {
  name: 'light',
  colors: lightColors,
  typography,
  spacing,
};
