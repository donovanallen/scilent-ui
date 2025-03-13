'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import styled, { css, keyframes } from 'styled-components';

/**
 * Slider size variants
 */
export type SliderSize = 'sm' | 'md' | 'lg';

/**
 * Slider variant styles
 */
export type SliderVariant = 'default' | 'minimal' | 'gradient' | 'custom';

/**
 * Slider orientation
 */
export type SliderOrientation = 'horizontal' | 'vertical';

/**
 * Thumb visibility options
 */
export type ThumbVisibility = 'always' | 'hover' | 'active' | 'never';

/**
 * Thumb variant styles
 */
export type ThumbVariant = 'default' | 'dot' | 'line' | 'square' | 'custom';

/**
 * Slider component props
 */
export interface SliderProps {
  /**
   * Current value of the slider
   */
  value: number[];

  /**
   * Callback when the value changes
   */
  onValueChange?: (value: number[]) => void;

  /**
   * Callback when the value change is committed (on drag end)
   */
  onValueCommit?: (value: number[]) => void;

  /**
   * Minimum value
   * @default 0
   */
  min?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Step value
   * @default 1
   */
  step?: number;

  /**
   * Size variant
   * @default 'md'
   */
  size?: SliderSize;

  /**
   * Style variant
   * @default 'default'
   */
  variant?: SliderVariant;

  /**
   * Thumb variant
   * @default 'default'
   */
  thumbVariant?: ThumbVariant;

  /**
   * Thumb visibility
   * @default 'always'
   */
  thumbVisibility?: ThumbVisibility;

  /**
   * Orientation of the slider
   * @default 'horizontal'
   */
  orientation?: SliderOrientation;

  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show the thumb tooltip
   * @default false
   */
  showTooltip?: boolean;

  /**
   * Format function for the tooltip value
   */
  formatTooltip?: (value: number) => string;

  /**
   * Whether to animate value changes
   * @default true
   */
  animate?: boolean;

  /**
   * Whether to optimize for performance
   * @default false
   */
  optimizePerformance?: boolean;

  /**
   * Whether to show tick marks
   * @default false
   */
  showTicks?: boolean;

  /**
   * Number of tick marks to show
   * @default 5
   */
  tickCount?: number;

  /**
   * Whether to show labels
   * @default false
   */
  showLabels?: boolean;

  /**
   * Format function for the labels
   */
  formatLabel?: (value: number) => string;

  /**
   * Custom colors for the slider
   */
  colors?: {
    track?: string;
    range?: string;
    thumb?: string;
    tickMarks?: string;
    disabled?: string;
  };

  /**
   * Custom class names for specific elements
   */
  classNames?: {
    root?: string;
    track?: string;
    range?: string;
    thumb?: string;
    tooltip?: string;
    tickMarks?: string;
    labels?: string;
  };

  /**
   * Additional CSS class name for the root element
   */
  className?: string;

  /**
   * Additional inline styles for the root element
   */
  style?: React.CSSProperties;

  /**
   * Inverted slider (right to left or bottom to top)
   * @default false
   */
  inverted?: boolean;

  /**
   * Buffer value for buffered content (e.g., video/audio loading)
   */
  bufferValue?: number;

  /**
   * Whether to show the buffer
   * @default false
   */
  showBuffer?: boolean;

  /**
   * Whether to use a custom thumb component
   */
  customThumb?: React.ReactNode;

  /**
   * Additional props to pass to the Radix Slider
   */
  [key: string]: any;
}

// Animation for the thumb
const pulseThumb = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb, 59, 130, 246), 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 6px rgba(var(--color-primary-rgb, 59, 130, 246), 0);
  }
  100% {
    transform: scale(1);
  }
`;

// Animation for value changes
const rangeChange = keyframes`
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
`;

// Tooltip animation
const tooltipFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const StyledSliderRoot = styled(RadixSlider.Root)<{
  $size: SliderSize;
  $variant: SliderVariant;
  $orientation: SliderOrientation;
  $disabled: boolean;
  $colors: SliderProps['colors'];
  $thumbVisibility: ThumbVisibility;
}>`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;

  /* Orientation styles */
  ${props =>
    props.$orientation === 'horizontal'
      ? css`
          height: ${props.$size === 'sm' ? '24px' : props.$size === 'md' ? '32px' : '40px'};
        `
      : css`
          flex-direction: column;
          width: ${props.$size === 'sm' ? '24px' : props.$size === 'md' ? '32px' : '40px'};
          height: 100%;
          min-height: 100px;
        `}

  /* Disabled state */
  ${props =>
    props.$disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
    
  /* Thumb visibility */
  ${props =>
    props.$thumbVisibility === 'hover' &&
    css`
      &:not(:hover) [data-thumb] {
        opacity: 0;
      }

      &:hover [data-thumb] {
        opacity: 1;
      }
    `}
    
  ${props =>
    props.$thumbVisibility === 'active' &&
    css`
      [data-thumb] {
        opacity: 0;
      }

      &:active [data-thumb],
      &:focus-within [data-thumb] {
        opacity: 1;
      }
    `}
    
  ${props =>
    props.$thumbVisibility === 'never' &&
    css`
      [data-thumb] {
        opacity: 0;
      }
    `}
`;

const StyledSliderTrack = styled(RadixSlider.Track)<{
  $size: SliderSize;
  $variant: SliderVariant;
  $orientation: SliderOrientation;
  $colors: SliderProps['colors'];
}>`
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  background-color: ${props =>
    props.$colors?.track || 'var(--color-slider-track, rgba(0, 0, 0, 0.1))'};

  /* Size variants */
  ${props =>
    props.$orientation === 'horizontal'
      ? css`
          height: ${props.$size === 'sm' ? '4px' : props.$size === 'md' ? '6px' : '8px'};
        `
      : css`
          width: ${props.$size === 'sm' ? '4px' : props.$size === 'md' ? '6px' : '8px'};
        `}

  /* Style variants */
  ${props =>
    props.$variant === 'minimal' &&
    css`
      background-color: ${props.$colors?.track ||
      'var(--color-slider-track-minimal, rgba(0, 0, 0, 0.05))'};
      height: ${props.$orientation === 'horizontal' ? '2px' : 'auto'};
      width: ${props.$orientation === 'vertical' ? '2px' : 'auto'};
    `}
`;

const StyledSliderBuffer = styled.div<{
  $size: SliderSize;
  $orientation: SliderOrientation;
  $bufferPercentage: number;
}>`
  position: absolute;
  border-radius: 9999px;
  background-color: var(--color-slider-buffer, rgba(0, 0, 0, 0.15));

  ${props =>
    props.$orientation === 'horizontal'
      ? css`
          height: 100%;
          width: ${props.$bufferPercentage}%;
          left: 0;
          top: 0;
        `
      : css`
          width: 100%;
          height: ${props.$bufferPercentage}%;
          bottom: 0;
          left: 0;
        `}
`;

const StyledSliderRange = styled(RadixSlider.Range)<{
  $size: SliderSize;
  $variant: SliderVariant;
  $orientation: SliderOrientation;
  $animate: boolean;
  $colors: SliderProps['colors'];
}>`
  position: absolute;
  border-radius: 9999px;
  height: 100%;
  background-color: ${props =>
    props.$colors?.range || 'var(--color-slider-range, var(--color-primary, #3b82f6))'};

  /* Animation */
  ${props =>
    props.$animate &&
    css`
      transition:
        width 100ms ease-out,
        height 100ms ease-out;

      &.slider-range-changed {
        animation: ${rangeChange} 300ms ease-out;
      }
    `}

  /* Style variants */
  ${props =>
    props.$variant === 'gradient' &&
    css`
      background: ${props.$colors?.range ||
      'linear-gradient(90deg, var(--color-slider-gradient-start, #3b82f6), var(--color-slider-gradient-end, #8b5cf6))'};
    `}
    
  ${props =>
    props.$variant === 'minimal' &&
    css`
      height: ${props.$orientation === 'horizontal' ? '2px' : '100%'};
      width: ${props.$orientation === 'vertical' ? '2px' : '100%'};
    `}
`;

const StyledSliderThumb = styled(RadixSlider.Thumb)<{
  $size: SliderSize;
  $variant: SliderVariant;
  $thumbVariant: ThumbVariant;
  $animate: boolean;
  $colors: SliderProps['colors'];
  $active: boolean;
}>`
  display: block;
  cursor: pointer;
  transition: ${props =>
    props.$animate
      ? 'transform 100ms ease, box-shadow 100ms ease, opacity 150ms ease'
      : 'opacity 150ms ease'};

  /* Default thumb styles */
  ${props =>
    props.$thumbVariant === 'default' &&
    css`
      width: ${props.$size === 'sm' ? '12px' : props.$size === 'md' ? '16px' : '20px'};
      height: ${props.$size === 'sm' ? '12px' : props.$size === 'md' ? '16px' : '20px'};
      background-color: ${props.$colors?.thumb || 'var(--color-slider-thumb, white)'};
      box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.1),
        0 1px 2px rgba(0, 0, 0, 0.06);
      border-radius: 50%;
      border: 2px solid
        ${props.$colors?.thumb || 'var(--color-slider-range, var(--color-primary, #3b82f6))'};

      ${props.$variant === 'minimal' &&
      css`
        width: ${props.$size === 'sm' ? '10px' : props.$size === 'md' ? '12px' : '16px'};
        height: ${props.$size === 'sm' ? '10px' : props.$size === 'md' ? '12px' : '16px'};
        border-width: 1px;
      `}
    `}

  /* Dot thumb variant */
  ${props =>
    props.$thumbVariant === 'dot' &&
    css`
      width: ${props.$size === 'sm' ? '8px' : props.$size === 'md' ? '10px' : '12px'};
      height: ${props.$size === 'sm' ? '8px' : props.$size === 'md' ? '10px' : '12px'};
      background-color: ${props.$colors?.thumb ||
      'var(--color-slider-range, var(--color-primary, #3b82f6))'};
      border-radius: 50%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    `}
  
  /* Line thumb variant */
  ${props =>
    props.$thumbVariant === 'line' &&
    css`
      width: ${props.$size === 'sm' ? '2px' : props.$size === 'md' ? '3px' : '4px'};
      height: ${props.$size === 'sm' ? '12px' : props.$size === 'md' ? '16px' : '20px'};
      background-color: ${props.$colors?.thumb ||
      'var(--color-slider-range, var(--color-primary, #3b82f6))'};
      border-radius: 1px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    `}
  
  /* Square thumb variant */
  ${props =>
    props.$thumbVariant === 'square' &&
    css`
      width: ${props.$size === 'sm' ? '10px' : props.$size === 'md' ? '12px' : '16px'};
      height: ${props.$size === 'sm' ? '10px' : props.$size === 'md' ? '12px' : '16px'};
      background-color: ${props.$colors?.thumb || 'var(--color-slider-thumb, white)'};
      border: 2px solid
        ${props.$colors?.thumb || 'var(--color-slider-range, var(--color-primary, #3b82f6))'};
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `}
  
  /* Animation */
  ${props =>
    props.$animate &&
    css`
      &:active {
        transform: scale(1.1);
      }

      ${props.$active &&
      css`
        animation: ${pulseThumb} 1s ease-in-out;
      `}
    `}
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-focus-ring, rgba(59, 130, 246, 0.5));
  }
`;

const StyledTooltip = styled.div<{
  $position: number;
  $orientation: SliderOrientation;
}>`
  position: absolute;
  background-color: var(--color-tooltip-bg, rgba(0, 0, 0, 0.8));
  color: var(--color-tooltip-text, white);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  pointer-events: none;
  white-space: nowrap;
  z-index: 10;
  animation: ${tooltipFade} 150ms ease-out;
  transform-origin: center bottom;

  ${props =>
    props.$orientation === 'horizontal'
      ? css`
          bottom: 28px;
          left: ${props.$position}%;
          transform: translateX(-50%);

          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: var(--color-tooltip-bg, rgba(0, 0, 0, 0.8)) transparent transparent
              transparent;
          }
        `
      : css`
          left: 28px;
          bottom: ${props.$position}%;
          transform: translateY(50%);

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: -5px;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent var(--color-tooltip-bg, rgba(0, 0, 0, 0.8)) transparent
              transparent;
          }
        `}
`;

const TickMarksContainer = styled.div<{
  $orientation: SliderOrientation;
}>`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${props =>
    props.$orientation === 'horizontal'
      ? css`
          bottom: -16px;
        `
      : css`
          flex-direction: column;
          height: 100%;
          right: -16px;
          top: 0;
        `}
`;

const TickMark = styled.div<{
  $size: SliderSize;
  $active: boolean;
  $colors: SliderProps['colors'];
}>`
  width: ${props => (props.$size === 'sm' ? '2px' : props.$size === 'md' ? '2px' : '3px')};
  height: ${props => (props.$size === 'sm' ? '6px' : props.$size === 'md' ? '8px' : '10px')};
  background-color: ${props =>
    props.$active
      ? props.$colors?.range || 'var(--color-slider-range, var(--color-primary, #3b82f6))'
      : props.$colors?.tickMarks || 'var(--color-slider-tick, rgba(0, 0, 0, 0.2))'};
  border-radius: 1px;
`;

const LabelsContainer = styled.div<{
  $orientation: SliderOrientation;
}>`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${props =>
    props.$orientation === 'horizontal'
      ? css`
          bottom: -32px;
        `
      : css`
          flex-direction: column;
          height: 100%;
          right: -40px;
          top: 0;
          justify-content: space-between;
        `}
`;

const Label = styled.div<{
  $active: boolean;
}>`
  font-size: 12px;
  color: ${props =>
    props.$active ? 'var(--color-text, #111827)' : 'var(--color-text-muted, #6b7280)'};

  ${props =>
    props.$active &&
    css`
      font-weight: 500;
    `}
`;

/**
 * Slider component
 *
 * A customizable slider component built on top of Radix UI Slider primitive.
 * Optimized for performance, responsiveness, and extensibility.
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      size = 'md',
      variant = 'default',
      thumbVariant = 'default',
      thumbVisibility = 'always',
      orientation = 'horizontal',
      disabled = false,
      showTooltip = false,
      formatTooltip,
      animate = true,
      optimizePerformance = false,
      showTicks = false,
      tickCount = 5,
      showLabels = false,
      formatLabel,
      colors = {},
      classNames = {},
      className = '',
      style,
      inverted = false,
      bufferValue,
      showBuffer = false,
      customThumb,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState<number[]>(value);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(null);
    const rangeRef = useRef<HTMLDivElement>(null);
    const isRangeChangedRef = useRef<boolean>(false);
    const prevValueRef = useRef<number[]>(value);
    const requestRef = useRef<number | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    // Calculate buffer percentage
    const bufferPercentage =
      bufferValue !== undefined ? ((bufferValue - min) / (max - min)) * 100 : 0;

    // Handle value changes with optional animation
    useEffect(() => {
      if (JSON.stringify(value) !== JSON.stringify(prevValueRef.current)) {
        if (animate && rangeRef.current) {
          isRangeChangedRef.current = true;
          rangeRef.current.classList.add('slider-range-changed');

          const timer = setTimeout(() => {
            if (rangeRef.current) {
              rangeRef.current.classList.remove('slider-range-changed');
            }
            isRangeChangedRef.current = false;
          }, 300);

          return () => clearTimeout(timer);
        }

        prevValueRef.current = value;
      }

      setLocalValue(value);
    }, [value, animate]);

    // Performance optimization for frequent updates
    const handleValueChange = useCallback(
      (newValue: number[]) => {
        setLocalValue(newValue);

        if (optimizePerformance) {
          if (requestRef.current !== null) {
            cancelAnimationFrame(requestRef.current);
          }

          requestRef.current = requestAnimationFrame(() => {
            onValueChange?.(newValue);
            requestRef.current = null;
          });
        } else {
          onValueChange?.(newValue);
        }
      },
      [onValueChange, optimizePerformance]
    );

    // Clean up any pending animation frames
    useEffect(() => {
      return () => {
        if (requestRef.current !== null) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }, []);

    // Generate tick marks
    const renderTickMarks = () => {
      const ticks = [];
      const totalTicks = tickCount;

      for (let i = 0; i < totalTicks; i++) {
        const tickValue = min + ((max - min) / (totalTicks - 1)) * i;
        const isActive =
          localValue[0] >= tickValue ||
          (localValue.length > 1 && tickValue <= localValue[1] && tickValue >= localValue[0]);

        ticks.push(
          <TickMark
            key={`tick-${i}`}
            $size={size}
            $active={isActive}
            $colors={colors}
            className={`slider-tick ${isActive ? 'slider-tick-active' : ''} ${classNames.tickMarks || ''}`}
          />
        );
      }

      return (
        <TickMarksContainer $orientation={orientation} className="slider-ticks">
          {ticks}
        </TickMarksContainer>
      );
    };

    // Generate labels
    const renderLabels = () => {
      const labels = [];
      const totalLabels = tickCount;

      for (let i = 0; i < totalLabels; i++) {
        const labelValue = min + ((max - min) / (totalLabels - 1)) * i;
        const isActive =
          localValue[0] >= labelValue ||
          (localValue.length > 1 && labelValue <= localValue[1] && labelValue >= localValue[0]);

        const formattedLabel = formatLabel ? formatLabel(labelValue) : labelValue.toString();

        labels.push(
          <Label
            key={`label-${i}`}
            $active={isActive}
            className={`slider-label ${isActive ? 'slider-label-active' : ''} ${classNames.labels || ''}`}
          >
            {formattedLabel}
          </Label>
        );
      }

      return (
        <LabelsContainer $orientation={orientation} className="slider-labels">
          {labels}
        </LabelsContainer>
      );
    };

    // Calculate tooltip position
    const getTooltipPosition = () => {
      if (activeThumbIndex === null || localValue.length === 0) return 0;

      const thumbValue = localValue[activeThumbIndex];
      return ((thumbValue - min) / (max - min)) * 100;
    };

    // Format tooltip value
    const getTooltipValue = () => {
      if (activeThumbIndex === null || localValue.length === 0) return '';

      const thumbValue = localValue[activeThumbIndex];
      return formatTooltip ? formatTooltip(thumbValue) : thumbValue.toString();
    };

    return (
      <StyledSliderRoot
        ref={ref}
        value={localValue}
        min={min}
        max={max}
        step={step}
        orientation={orientation}
        disabled={disabled}
        dir={inverted ? 'rtl' : 'ltr'}
        onValueChange={handleValueChange}
        onValueCommit={onValueCommit}
        $size={size}
        $variant={variant}
        $orientation={orientation}
        $disabled={disabled}
        $colors={colors}
        $thumbVisibility={thumbVisibility}
        className={`slider ${className} ${classNames.root || ''}`}
        style={style}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...props}
      >
        <StyledSliderTrack
          $size={size}
          $variant={variant}
          $orientation={orientation}
          $colors={colors}
          className={`slider-track ${classNames.track || ''}`}
        >
          {showBuffer && bufferValue !== undefined && (
            <StyledSliderBuffer
              $size={size}
              $orientation={orientation}
              $bufferPercentage={bufferPercentage}
              className="slider-buffer"
            />
          )}
          <StyledSliderRange
            ref={rangeRef}
            $size={size}
            $variant={variant}
            $orientation={orientation}
            $animate={animate}
            $colors={colors}
            className={`slider-range ${classNames.range || ''}`}
          />
        </StyledSliderTrack>

        {localValue.map((_, i) => (
          <StyledSliderThumb
            key={i}
            $size={size}
            $variant={variant}
            $thumbVariant={thumbVariant}
            $animate={animate}
            $colors={colors}
            $active={activeThumbIndex === i}
            className={`slider-thumb ${classNames.thumb || ''}`}
            data-thumb="true"
            onFocus={() => setActiveThumbIndex(i)}
            onBlur={() => setActiveThumbIndex(null)}
            onPointerDown={() => setActiveThumbIndex(i)}
            onPointerUp={() => !isDragging && setActiveThumbIndex(null)}
          >
            {customThumb}
          </StyledSliderThumb>
        ))}

        {showTooltip && isDragging && activeThumbIndex !== null && (
          <StyledTooltip
            ref={tooltipRef}
            $position={getTooltipPosition()}
            $orientation={orientation}
            className={`slider-tooltip ${classNames.tooltip || ''}`}
          >
            {getTooltipValue()}
          </StyledTooltip>
        )}

        {showTicks && renderTickMarks()}
        {showLabels && renderLabels()}
      </StyledSliderRoot>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
