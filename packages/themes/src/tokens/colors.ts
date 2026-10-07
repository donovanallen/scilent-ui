import type { ColorTokens } from './types';

/**
 * Base color palette
 */
export const baseColors = {
  // Primary colors
  blue: {
    50: '#e6f1fe',
    100: '#cce3fd',
    200: '#99c7fb',
    300: '#66aaf9',
    400: '#338ef7',
    500: '#0072f5', // Primary
    600: '#005bc4',
    700: '#004493',
    800: '#002e62',
    900: '#001731',
  },

  // Secondary colors
  purple: {
    50: '#f2eafa',
    100: '#e4d4f4',
    200: '#c9a9e9',
    300: '#ae7ede',
    400: '#9353d3',
    500: '#7828c8', // Secondary
    600: '#6020a0',
    700: '#481878',
    800: '#301050',
    900: '#180828',
  },

  // Accent colors
  green: {
    50: '#e6fbf5',
    100: '#ccf7eb',
    200: '#99efd7',
    300: '#66e7c3',
    400: '#33dfaf',
    500: '#00d79b', // Accent
    600: '#00ac7c',
    700: '#00815d',
    800: '#00563e',
    900: '#002b1f',
  },

  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic colors
  success: '#17c964',
  warning: '#f5a524',
  error: '#f31260',
  info: '#0072f5',
};

/**
 * Light theme color tokens
 */
export const lightColors: ColorTokens = {
  primary: baseColors.blue[500],
  secondary: baseColors.purple[500],
  accent: baseColors.green[500],
  background: baseColors.gray[50],
  foreground: baseColors.gray[900],
  card: '#ffffff',
  cardForeground: baseColors.gray[900],
  border: baseColors.gray[200],
  input: baseColors.gray[200],
  ring: baseColors.blue[500],
  muted: baseColors.gray[100],
  mutedForeground: baseColors.gray[500],
  success: baseColors.success,
  successForeground: '#ffffff',
  warning: baseColors.warning,
  warningForeground: '#ffffff',
  error: baseColors.error,
  errorForeground: '#ffffff',
  info: baseColors.info,
  infoForeground: '#ffffff',
};

/**
 * Dark theme color tokens
 */
export const darkColors: ColorTokens = {
  primary: baseColors.blue[400],
  secondary: baseColors.purple[400],
  accent: baseColors.green[400],
  background: baseColors.gray[900],
  foreground: baseColors.gray[50],
  card: baseColors.gray[800],
  cardForeground: baseColors.gray[50],
  border: baseColors.gray[700],
  input: baseColors.gray[700],
  ring: baseColors.blue[400],
  muted: baseColors.gray[800],
  mutedForeground: baseColors.gray[400],
  success: baseColors.success,
  successForeground: '#ffffff',
  warning: baseColors.warning,
  warningForeground: '#ffffff',
  error: baseColors.error,
  errorForeground: '#ffffff',
  info: baseColors.info,
  infoForeground: '#ffffff',
};

/**
 * Vintage theme color tokens - a warm, retro-inspired theme
 */
export const vintageColors: ColorTokens = {
  primary: '#d35400', // Pumpkin orange
  secondary: '#8e44ad', // Wisteria purple
  accent: '#16a085', // Green sea
  background: '#f5f5dc', // Beige
  foreground: '#34495e', // Wet asphalt
  card: '#fdf5e6', // Old lace
  cardForeground: '#34495e', // Wet asphalt
  border: '#d0c8b0', // Tan
  input: '#d0c8b0', // Tan
  ring: '#d35400', // Pumpkin orange
  muted: '#e8e0d0', // Light tan
  mutedForeground: '#7f8c8d', // Asbestos
  success: '#27ae60', // Nephritis
  successForeground: '#ffffff',
  warning: '#f39c12', // Orange
  warningForeground: '#ffffff',
  error: '#c0392b', // Pomegranate
  errorForeground: '#ffffff',
  info: '#2980b9', // Belize hole
  infoForeground: '#ffffff',
};
