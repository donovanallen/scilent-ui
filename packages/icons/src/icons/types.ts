import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * The size of the icon
   * @default 24
   */
  size?: number;

  /**
   * The color of the icon
   * @default 'currentColor'
   */
  color?: string;

  /**
   * The stroke width of the icon
   * @default 2
   */
  strokeWidth?: number;

  /**
   * Accessible label for the icon
   */
  label?: string;

  /**
   * Whether the icon should be hidden from screen readers
   * @default false when no label is provided
   * @default true when label is provided
   */
  labelledBy?: string;
}
