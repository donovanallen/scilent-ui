import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { lightTheme } from './themes/light';
import { darkTheme } from './themes/dark';
import { vintageTheme } from './themes/vintage';
import { typography, musicTypography } from './tokens/typography';
import { spacing } from './tokens/spacing';
import { baseColors } from './tokens/colors';
import type { ColorTokens, Theme, ThemeContextValue, ThemeProviderProps } from './index';

// Consumer used to read theme values and mutate the theme from inside the tree.
const Consumer = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-name">{theme.name}</span>
      <span data-testid="theme-bg">{theme.colors.background}</span>
      <span data-testid="theme-font">{theme.typography.fontFamily.sans}</span>
      <span data-testid="theme-spacing-4">{theme.spacing[4]}</span>
      <button data-testid="set-dark" onClick={() => setTheme(darkTheme)}>
        set dark
      </button>
    </div>
  );
};

describe('theme token shape', () => {
  const themes: Array<[string, Theme]> = [
    ['light', lightTheme],
    ['dark', darkTheme],
    ['vintage', vintageTheme],
  ];

  it.each(themes)('%s theme has the required token keys', (_name, theme) => {
    expect(theme.name).toBe(_name);
    expect(Object.keys(theme.colors).sort()).toEqual(
      [
        'primary',
        'secondary',
        'accent',
        'background',
        'foreground',
        'card',
        'cardForeground',
        'border',
        'input',
        'ring',
        'muted',
        'mutedForeground',
        'success',
        'successForeground',
        'warning',
        'warningForeground',
        'error',
        'errorForeground',
        'info',
        'infoForeground',
      ].sort()
    );
    expect(Object.keys(theme.typography.fontFamily).sort()).toEqual(
      ['sans', 'serif', 'mono', 'display'].sort()
    );
    expect(Object.keys(theme.typography.fontSize)).toHaveLength(9);
    expect(Object.keys(theme.typography.fontWeight).sort()).toEqual(
      ['light', 'normal', 'medium', 'semibold', 'bold'].sort()
    );
    expect(Object.keys(theme.typography.lineHeight).sort()).toEqual(
      ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'].sort()
    );
    expect(Object.keys(theme.typography.letterSpacing).sort()).toEqual(
      ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'].sort()
    );
    expect(
      Object.keys(theme.spacing)
        .map(Number)
        .sort((a, b) => a - b)
    ).toEqual([0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64]);
  });

  it('light and dark themes use shared typography and spacing tokens with distinct palettes', () => {
    expect(lightTheme.typography).toBe(typography);
    expect(lightTheme.spacing).toBe(spacing);
    expect(lightTheme.colors.background).not.toBe(darkTheme.colors.background);
    expect(lightTheme.colors.primary).toBe(baseColors.blue[500]);
    expect(darkTheme.colors.primary).toBe(baseColors.blue[400]);
  });

  it('vintage theme uses the music typography and its own palette', () => {
    expect(vintageTheme.typography).toBe(musicTypography);
    expect(vintageTheme.colors.background).not.toBe(lightTheme.colors.background);
  });
});

describe('ThemeProvider', () => {
  it('defaults to the light theme and exposes token values to consumers', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-name')).toHaveTextContent('light');
    expect(screen.getByTestId('theme-bg')).toHaveTextContent(lightTheme.colors.background);
    expect(screen.getByTestId('theme-spacing-4')).toHaveTextContent(lightTheme.spacing[4]);
  });

  it.each([
    ['light', lightTheme],
    ['dark', darkTheme],
    ['vintage', vintageTheme],
  ] as Array<[string, Theme]>)('renders with initialTheme=%s', (_name, theme) => {
    render(
      <ThemeProvider initialTheme={theme}>
        <Consumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-name')).toHaveTextContent(theme.name);
    expect(screen.getByTestId('theme-bg')).toHaveTextContent(theme.colors.background);
    expect(screen.getByTestId('theme-font')).toHaveTextContent(theme.typography.fontFamily.sans);
  });

  it('setTheme swaps the active theme for consumers', () => {
    render(
      <ThemeProvider initialTheme={lightTheme}>
        <Consumer />
      </ThemeProvider>
    );
    act(() => {
      screen.getByTestId('set-dark').click();
    });
    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark');
    expect(screen.getByTestId('theme-bg')).toHaveTextContent(darkTheme.colors.background);
  });

  it('renders children', () => {
    render(
      <ThemeProvider initialTheme={vintageTheme}>
        <div data-testid="child">hello</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

// NOTE: the `context === undefined` throw in useTheme is unreachable: the
// context is created with a default value ({ theme: lightTheme, setTheme }),
// so it never evaluates to undefined even without a provider. Not testable
// without modifying source.
