import React from 'react';
import * as Primitive from '@radix-ui/react-primitive';
import styled, { css } from 'styled-components';
import type { ButtonVariant, ButtonSize } from '../types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * The size of the button
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * The content of the button
   */
  children: React.ReactNode;
}

// Define the styled button component
const StyledButton = styled(Primitive.Primitive.button)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $isLoading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 500;
  transition: all 150ms ease;
  cursor: pointer;
  outline: none;
  border: none;
  position: relative;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Size variants */
  ${props =>
    props.$size === 'sm' &&
    css`
      height: 32px;
      padding: 0 12px;
      font-size: 14px;
    `}

  ${props =>
    props.$size === 'md' &&
    css`
      height: 40px;
      padding: 0 16px;
      font-size: 16px;
    `}

  ${props =>
    props.$size === 'lg' &&
    css`
      height: 48px;
      padding: 0 24px;
      font-size: 18px;
    `}

  /* Style variants */
  ${props =>
    props.$variant === 'primary' &&
    css`
      background-color: var(--color-primary, #3b82f6);
      color: white;

      &:hover:not(:disabled) {
        background-color: var(--color-primary-dark, #2563eb);
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px var(--color-primary-light, #93c5fd);
      }
    `}

  ${props =>
    props.$variant === 'secondary' &&
    css`
      background-color: var(--color-secondary, #6b7280);
      color: white;

      &:hover:not(:disabled) {
        background-color: var(--color-secondary-dark, #4b5563);
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px var(--color-secondary-light, #d1d5db);
      }
    `}

  ${props =>
    props.$variant === 'outline' &&
    css`
      background-color: transparent;
      border: 1px solid var(--color-border, #d1d5db);
      color: var(--color-text, #111827);

      &:hover:not(:disabled) {
        background-color: var(--color-background-hover, #f3f4f6);
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px var(--color-border-focus, #93c5fd);
      }
    `}

  ${props =>
    props.$variant === 'ghost' &&
    css`
      background-color: transparent;
      color: var(--color-text, #111827);

      &:hover:not(:disabled) {
        background-color: var(--color-background-hover, #f3f4f6);
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px var(--color-border-focus, #93c5fd);
      }
    `}
`;

// Loading spinner component
const LoadingSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

/**
 * Button component built on Radix UI Primitive
 *
 * A fundamental component for triggering actions, with multiple variants and sizes.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $isLoading={isLoading}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
