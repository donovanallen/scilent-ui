/**
 * Album artwork size variants
 */
export type AlbumArtworkSize = 'auto' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | number;

/**
 * Platform variants for styling
 */
export type AlbumArtworkPlatform = 'default' | 'apple' | 'spotify' | 'tidal' | 'custom';

/**
 * Album artwork shape variants
 */
export type AlbumArtworkShape = 'square' | 'rounded' | 'circle';

/**
 * Album artwork shadow variants
 */
export type AlbumArtworkShadow = 'none' | 'sm' | 'md' | 'lg';

/**
 * Album artwork animation variants
 */
export type AlbumArtworkAnimation = 'none' | 'zoom' | 'fade' | 'pulse';

/**
 * Album artwork theme options
 */
export interface AlbumArtworkTheme {
  /**
   * Background color for the artwork container
   */
  backgroundColor?: string;

  /**
   * Border radius for the artwork
   */
  borderRadius?: string;

  /**
   * Shadow style for the artwork
   */
  shadow?: string;

  /**
   * Border style for the artwork
   */
  border?: string;

  /**
   * Placeholder icon color
   */
  placeholderColor?: string;
}
