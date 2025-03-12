import React, { useRef } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { truncateText } from '../../utils/metadata';

/**
 * Props for the MetadataLabel component
 */
export interface MetadataLabelProps {
  /**
   * Text content to display
   */
  text: string;

  /**
   * Whether to truncate the text when it exceeds maxLength
   * @default true
   */
  truncate?: boolean;

  /**
   * Type of truncation to apply
   * @default "end"
   */
  truncationType?: 'none' | 'end' | 'middle';

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

  /**
   * Additional HTML attributes
   */
  [key: string]: any;
}

/**
 * MetadataLabel component for displaying text with truncation options
 *
 * @example
 * // Basic usage
 * <MetadataLabel text="Some text content" />
 *
 * @example
 * // With truncation
 * <MetadataLabel
 *   text="A very long text that will be truncated"
 *   truncate={true}
 *   truncationType="middle"
 *   maxLength={20}
 * />
 *
 * @example
 * // With custom styling
 * <MetadataLabel
 *   text="Styled text"
 *   style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#1DB954', fontSize: '18px' }}
 * />
 */
export const MetadataLabel: React.FC<MetadataLabelProps> = ({
  text,
  truncate = true,
  truncationType = 'end',
  maxLength,
  as = 'span',
  className = '',
  style = {},
  onClick,
  ...rest
}) => {
  const textRef = useRef<HTMLElement>(null);

  // Apply truncation if needed
  let displayText = text;
  let isTruncated = false;

  if (truncate && maxLength && text.length > maxLength) {
    displayText = truncateText(text, maxLength, truncationType);
    isTruncated = true;
  }

  // Combine styles
  const combinedStyles: React.CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...style,
  };

  // Create the component based on the 'as' prop
  const Component = as;

  // If truncated, wrap in tooltip to show full text
  if (isTruncated) {
    return (
      <RadixTooltip.Provider>
        <RadixTooltip.Root>
          <RadixTooltip.Trigger asChild>
            <Component
              ref={textRef as React.Ref<HTMLDivElement>}
              className={`metadata-label ${className}`}
              style={combinedStyles}
              onClick={onClick}
              data-full-text={text}
              {...rest}
            >
              {displayText}
            </Component>
          </RadixTooltip.Trigger>
          <RadixTooltip.Portal>
            <RadixTooltip.Content
              className="metadata-label-tooltip"
              sideOffset={5}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                borderRadius: '4px',
                padding: '8px 12px',
                fontSize: '14px',
                maxWidth: '300px',
                zIndex: 1000,
              }}
            >
              {text}
              <RadixTooltip.Arrow style={{ fill: 'rgba(0, 0, 0, 0.8)' }} />
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    );
  }

  // If not truncated, render normally
  return (
    <Component
      ref={textRef as React.Ref<HTMLDivElement>}
      className={`metadata-label ${className}`}
      style={combinedStyles}
      onClick={onClick}
      data-full-text={text}
      {...rest}
    >
      {displayText}
    </Component>
  );
};

export default MetadataLabel;
