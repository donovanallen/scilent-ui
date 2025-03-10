# Search Component

A highly configurable search component that supports various states, animations, and styling options. The Search component is designed to be extensible and can be used for searching across different content types.

## Features

- **Configurable Appearance**: Multiple sizes, variants, and styling options
- **Expandable Search**: Can expand on focus and collapse on blur
- **Filter Support**: Built-in support for filtering by content type
- **State Management**: Handles loading, error, and empty states
- **Animations**: Smooth transitions and animations for a polished user experience
- **Accessibility**: Keyboard navigation and screen reader support
- **Responsive Design**: Adapts to different screen sizes
- **Platform Theming**: Can be styled to match Apple Music, Spotify, or Tidal design languages

## Usage

```tsx
import { Search } from '@scilent-ui/core';

// Basic usage
<Search
  placeholder="Search for music..."
  onSearch={(query, filterType) => {
    // Handle search
  }}
/>

// With custom filter types
<Search
  placeholder="Search for music..."
  filterTypes={['artists', 'albums', 'tracks', 'playlists']}
  onSearch={(query, filterType) => {
    // Handle search
  }}
/>

// Expandable search
<Search
  placeholder="Search..."
  expandOnFocus={true}
  collapseOnBlurIfEmpty={true}
  onSearch={(query, filterType) => {
    // Handle search
  }}
/>

// With custom search function
<Search
  placeholder="Search..."
  onCustomSearch={async (query, filterType) => {
    // Perform async search and return results
    const results = await fetchSearchResults(query, filterType);
    return results;
  }}
/>
```

## Props

| Prop                    | Type                                                                        | Default                           | Description                                             |
| ----------------------- | --------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------- |
| `size`                  | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`                            | The size of the search component                        |
| `variant`               | `'default' \| 'minimal' \| 'pill'`                                          | `'default'`                       | The variant of the search component                     |
| `placeholder`           | `string`                                                                    | `'Search...'`                     | Placeholder text for the search input                   |
| `autoFocus`             | `boolean`                                                                   | `false`                           | Whether the search input should be auto-focused         |
| `isLoading`             | `boolean`                                                                   | `false`                           | Whether the search is in a loading state                |
| `hasError`              | `boolean`                                                                   | `false`                           | Whether the search has encountered an error             |
| `errorMessage`          | `string`                                                                    | `undefined`                       | Error message to display when hasError is true          |
| `filterTypes`           | `SearchFilterType[]`                                                        | `['artists', 'albums', 'tracks']` | Available filter types for the search                   |
| `activeFilterType`      | `SearchFilterType`                                                          | `undefined`                       | Currently active filter type                            |
| `onFilterChange`        | `(filterType: SearchFilterType) => void`                                    | `undefined`                       | Callback when the filter type changes                   |
| `onQueryChange`         | `(query: string) => void`                                                   | `undefined`                       | Callback when the search query changes                  |
| `onSearch`              | `(query: string, filterType?: SearchFilterType) => void`                    | `undefined`                       | Callback when the search is submitted                   |
| `onCustomSearch`        | `(query: string, filterType?: SearchFilterType) => Promise<SearchResult[]>` | `undefined`                       | Callback to handle custom search logic                  |
| `results`               | `SearchResult[]`                                                            | `[]`                              | Search results to display                               |
| `onResultSelect`        | `(result: SearchResult) => void`                                            | `undefined`                       | Callback when a result is selected                      |
| `showSearchIcon`        | `boolean`                                                                   | `true`                            | Whether to show the search icon                         |
| `showClearButton`       | `boolean`                                                                   | `true`                            | Whether to show the clear button                        |
| `expandOnFocus`         | `boolean`                                                                   | `false`                           | Whether to expand the search input on focus             |
| `collapseOnBlurIfEmpty` | `boolean`                                                                   | `false`                           | Whether to collapse the search input on blur when empty |
| `showFilterButtons`     | `boolean`                                                                   | `true`                            | Whether to show filter buttons                          |
| `animate`               | `boolean`                                                                   | `true`                            | Whether to animate the search component                 |
| `className`             | `string`                                                                    | `undefined`                       | Custom class name                                       |
| `style`                 | `React.CSSProperties`                                                       | `undefined`                       | Custom styles                                           |

## Types

```tsx
export type SearchSize = 'sm' | 'md' | 'lg';
export type SearchVariant = 'default' | 'minimal' | 'pill';
export type SearchFilterType = 'artists' | 'albums' | 'tracks' | string;

export interface SearchResult {
  id: string;
  type: SearchFilterType;
  title: string;
  subtitle?: string;
  imageUrl?: string;
}
```

## Styling

The Search component uses CSS variables for theming. You can override these variables to customize the appearance:

```tsx
<Search
  style={
    {
      '--color-primary': '#1DB954',
      '--color-primary-light': '#1ed760',
      '--color-primary-dark': '#1aa34a',
      '--color-background': '#282828',
      '--color-text': '#ffffff',
      '--color-text-muted': '#b3b3b3',
      '--color-border': '#333',
    } as React.CSSProperties
  }
/>
```

## Accessibility

The Search component follows accessibility best practices:

- Proper ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Appropriate color contrast
- Touch target sizes that meet WCAG guidelines

## Examples

### Basic Search

```tsx
<Search
  placeholder="Search for artists, albums, or tracks..."
  onSearch={(query, filterType) => {
    // Handle search
  }}
/>
```

### Expandable Search

```tsx
<Search
  placeholder="Search..."
  expandOnFocus={true}
  collapseOnBlurIfEmpty={true}
  onSearch={(query, filterType) => {
    // Handle search
  }}
/>
```

### Platform-Specific Styling

```tsx
// Apple Music style
<Search
  placeholder="Search Apple Music..."
  variant="pill"
  style={{
    '--color-primary': '#ff2d55',
    '--color-primary-light': '#ffb3c0',
    '--color-primary-dark': '#d30f45',
  } as React.CSSProperties}
/>

// Spotify style
<Search
  placeholder="Search Spotify..."
  variant="default"
  style={{
    '--color-primary': '#1DB954',
    '--color-primary-light': '#1ed760',
    '--color-primary-dark': '#1aa34a',
    '--color-background': '#282828',
    '--color-text': '#ffffff',
    '--color-text-muted': '#b3b3b3',
    '--color-border': '#333',
  } as React.CSSProperties}
/>

// Tidal style
<Search
  placeholder="Search TIDAL..."
  variant="minimal"
  style={{
    '--color-primary': '#00ffff',
    '--color-primary-light': '#33ffff',
    '--color-primary-dark': '#00cccc',
    '--color-background': '#000',
    '--color-text': '#ffffff',
    '--color-text-muted': '#999',
    '--color-border': '#333',
  } as React.CSSProperties}
/>
```

## Performance Considerations

- The component uses React's `useRef` and `useState` hooks for efficient state management
- Animations can be disabled for performance-sensitive applications
- Results are rendered conditionally to minimize DOM operations
- Event handlers are debounced where appropriate to prevent excessive re-renders
