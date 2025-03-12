// CSS Variables interface for theming
export interface CSSVariables {
  // Base colors
  '--color-primary': string;
  '--color-primary-light': string;
  '--color-primary-dark': string;
  '--color-secondary': string;
  '--color-secondary-light': string;
  '--color-secondary-dark': string;
  '--color-text': string;
  '--color-background': string;
  '--color-background-hover': string;
  '--color-border': string;
  '--color-border-focus': string;
  '--color-focus-ring': string;

  // Component-specific colors
  '--color-switch-bg': string;
  '--color-scrollbar-bg': string;
  '--color-scrollbar-bg-hover': string;
  '--color-scrollbar-thumb': string;
  '--color-scrollbar-thumb-hover': string;
  '--color-scrollbar-thumb-active': string;
  '--color-scrollbar-corner': string;
  '--color-toggle-group-bg': string;
  '--color-toggle-group-border': string;
  '--color-toggle-group-separator': string;
  '--color-toggle-on-bg': string;
  '--color-toggle-on-text': string;
  '--color-toggle-hover-bg': string;

  // Album artwork specific variables
  '--color-artwork-bg': string;
  '--color-artwork-placeholder': string;
  '--radius-artwork': string;
  '--radius-artwork-apple': string;
  '--radius-artwork-spotify': string;
  '--radius-artwork-tidal': string;
}
