import { MetadataLabelProps } from '../components/MetadataLabel';

/**
 * Truncation options for text elements
 */
export type TruncationType = 'none' | 'end' | 'middle';

/**
 * Artist label configuration
 */
export interface ArtistLabelProps extends Omit<MetadataLabelProps, 'text'> {
  /**
   * Artist name or array of artist names
   */
  artists: string | string[];

  /**
   * Delimiter to use when joining multiple artist names
   * @default ", "
   */
  delimiter?: string;

  /**
   * Whether to truncate the text when it overflows
   * @default true
   */
  truncate?: boolean;

  /**
   * Type of truncation to apply
   * @default "end"
   */
  truncationType?: TruncationType;

  /**
   * Maximum number of characters before truncation
   * @default undefined (no truncation unless specified)
   */
  maxLength?: number;

  /**
   * HTML element to render as
   * @default "span"
   */
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Additional inline styles
   * Use this for all styling needs (fontWeight, fontStyle, color, fontSize, etc.)
   */
  style?: React.CSSProperties;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
