# AlbumArtwork Component

The `AlbumArtwork` component is designed to display album artwork with various customization options while adhering to the Scilent UI [Design Guidelines](#https://github.com/donovanallen/scilent-ui/blob/main/DESIGN.md).

## Features

- Displays album artwork with proper aspect ratio preservation
- Supports multiple size variants
- Platform-specific styling (Apple Music, Spotify, Tidal)
- Expandable view for full-size artwork
- Accessibility-focused with proper ARIA attributes
- Customizable with themes and styling options
- Responsive design with proper image loading
- Framework-agnostic with support for custom image components

## Installation

```bash
npm install @scilent-ui/core
```

## Usage

### Basic Usage

```tsx
import { AlbumArtwork } from '@scilent-ui/core';

function MyComponent() {
  return <AlbumArtwork image="https://example.com/album-cover.jpg" name="Album Name" size="md" />;
}
```

### With Platform-Specific Styling

```tsx
import { AlbumArtwork } from '@scilent-ui/core';

function MyComponent() {
  return (
    <div>
      <h3>Apple Music Style</h3>
      <AlbumArtwork
        image="https://example.com/album-cover.jpg"
        name="Album Name"
        platform="apple"
        shadow
        size="md"
      />

      <h3>Spotify Style</h3>
      <AlbumArtwork
        image="https://example.com/album-cover.jpg"
        name="Album Name"
        platform="spotify"
        size="md"
      />

      <h3>Tidal Style</h3>
      <AlbumArtwork
        image="https://example.com/album-cover.jpg"
        name="Album Name"
        platform="tidal"
        size="md"
      />
    </div>
  );
}
```

### Expandable Artwork

```tsx
import { AlbumArtwork } from '@scilent-ui/core';

function MyComponent() {
  return (
    <AlbumArtwork
      image="https://example.com/album-cover.jpg"
      name="Album Name"
      size="md"
      expandable
      zoom
    />
  );
}
```

### Custom Styling

```tsx
import { AlbumArtwork } from '@scilent-ui/core';

function MyComponent() {
  return (
    <AlbumArtwork
      image="https://example.com/album-cover.jpg"
      name="Album Name"
      size="md"
      platform="custom"
      borderRadius="12px"
      shadow
      style={{ border: '1px solid #eaeaea' }}
    />
  );
}
```

### Using with Next.js Image Component

```tsx
import { AlbumArtwork } from '@scilent-ui/core';
import Image from 'next/image';

function MyComponent() {
  return (
    <AlbumArtwork
      image="https://example.com/album-cover.jpg"
      name="Album Name"
      size="md"
      ImageComponent={Image}
      imageProps={{
        fill: true,
        sizes: '(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw',
        quality: 90,
        priority: true,
      }}
    />
  );
}
```

## Props

| Prop             | Type                                                         | Default     | Description                                                      |
| ---------------- | ------------------------------------------------------------ | ----------- | ---------------------------------------------------------------- |
| `image`          | `string \| null`                                             | `undefined` | URL of the album artwork image                                   |
| `name`           | `string`                                                     | -           | Name of the album (used for alt text)                            |
| `className`      | `string`                                                     | `undefined` | Additional CSS class for the root element                        |
| `classNames`     | `object`                                                     | `undefined` | Object of class names for specific elements                      |
| `priority`       | `boolean`                                                    | `false`     | Whether to prioritize loading the image                          |
| `sizes`          | `string`                                                     | `undefined` | Sizes attribute for responsive images                            |
| `size`           | `'auto' \| 'xs' \| 'sm' \| 'base' \| 'md' \| 'lg' \| number` | `'auto'`    | Size variant of the artwork                                      |
| `zoom`           | `boolean`                                                    | `false`     | Whether to apply a zoom effect on hover                          |
| `expandable`     | `boolean`                                                    | `false`     | Whether the artwork can be expanded to full size                 |
| `platform`       | `'default' \| 'apple' \| 'spotify' \| 'tidal' \| 'custom'`   | `'default'` | Platform-specific styling                                        |
| `shadow`         | `boolean`                                                    | `false`     | Whether to apply a shadow effect                                 |
| `borderRadius`   | `string`                                                     | `undefined` | Border radius override                                           |
| `style`          | `React.CSSProperties`                                        | `undefined` | Custom styles for the wrapper                                    |
| `onClick`        | `() => void`                                                 | `undefined` | Callback when the artwork is clicked                             |
| `ImageComponent` | `React.ElementType`                                          | `undefined` | Custom image component to use instead of the default img element |
| `imageProps`     | `object`                                                     | `{}`        | Additional props to pass to the image component                  |

## Accessibility

The `AlbumArtwork` component follows accessibility best practices:

- Proper alt text for images
- Keyboard navigation support
- ARIA attributes for interactive elements
- Focus management for the expandable modal
- Screen reader announcements

## Design Guidelines

This component adheres to the Scilent UI design guidelines for album artwork:

- Never crops, filters, or modifies album artwork
- Displays at highest available resolution
- Maintains original aspect ratio
- Optional subtle shadows to help artwork stand out against backgrounds
- Platform-specific styling options
