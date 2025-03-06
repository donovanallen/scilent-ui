import type { Meta, StoryObj } from '@storybook/react';
import { AlbumArtwork } from './AlbumArtwork';

const meta: Meta<typeof AlbumArtwork> = {
  title: 'Components/AlbumArtwork',
  component: AlbumArtwork,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile component for displaying album artwork with various size options, platform-specific styling, and expandable functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'text',
      description: 'URL of the album artwork image',
    },
    name: {
      control: 'text',
      description: 'Name of the album (used for alt text)',
    },
    size: {
      control: 'select',
      options: ['auto', 'xs', 'sm', 'base', 'md', 'lg'],
      description: 'Size variant of the artwork',
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
    platform: {
      control: 'select',
      options: ['default', 'apple', 'spotify', 'tidal', 'custom'],
      description: 'Platform-specific styling',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    zoom: {
      control: 'boolean',
      description: 'Whether to apply a zoom effect on hover',
      table: {
        // defaultValue: { summary: false },
      },
    },
    expandable: {
      control: 'boolean',
      description: 'Whether the artwork can be expanded to full size',
      table: {
        // defaultValue: { summary: false },
      },
    },
    shadow: {
      control: 'boolean',
      description: 'Whether to apply a shadow effect',
      table: {
        // defaultValue: { summary: false },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Custom border radius override',
    },
    priority: {
      control: 'boolean',
      description: 'Whether to prioritize loading the image',
      table: {
        // defaultValue: { summary: false },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when the artwork is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlbumArtwork>;

// Sample album artwork URLs
const sampleAlbums = [
  {
    name: 'Random Access Memories',
    image: 'https://i.scdn.co/image/ab67616d0000b273b1f8da74f225fa1225cdface',
  },
  {
    name: 'The Dark Side of the Moon',
    image: 'https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe',
  },
  {
    name: 'Abbey Road',
    image: 'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
  },
];

/**
 * Default album artwork with standard styling.
 */
export const Default: Story = {
  args: {
    image: sampleAlbums[0].image,
    name: sampleAlbums[0].name,
    size: 'md',
  },
};

/**
 * Album artwork with no image, showing the placeholder icon.
 */
export const Placeholder: Story = {
  args: {
    image: null,
    name: 'Missing Album Artwork',
    size: 'md',
  },
};

/**
 * Album artwork with zoom effect on hover.
 */
export const WithZoom: Story = {
  args: {
    image: sampleAlbums[1].image,
    name: sampleAlbums[1].name,
    size: 'md',
    zoom: true,
  },
};

/**
 * Album artwork that can be expanded to full size when clicked.
 */
export const Expandable: Story = {
  args: {
    image: sampleAlbums[2].image,
    name: sampleAlbums[2].name,
    size: 'md',
    expandable: true,
  },
};

/**
 * Album artwork with shadow effect.
 */
export const WithShadow: Story = {
  args: {
    image: sampleAlbums[0].image,
    name: sampleAlbums[0].name,
    size: 'md',
    shadow: true,
  },
};

/**
 * Extra small album artwork (32px).
 */
export const SizeXS: Story = {
  args: {
    image: sampleAlbums[0].image,
    name: sampleAlbums[0].name,
    size: 'xs',
  },
};

/**
 * Small album artwork (64px).
 */
export const SizeSM: Story = {
  args: {
    image: sampleAlbums[0].image,
    name: sampleAlbums[0].name,
    size: 'sm',
  },
};

/**
 * Base album artwork (128px).
 */
export const SizeBase: Story = {
  args: {
    image: sampleAlbums[0].image,
    name: sampleAlbums[0].name,
    size: 'base',
  },
};

/**
 * Medium album artwork (192px).
 */
export const SizeMD: Story = {
  args: {
    image: sampleAlbums[0].image,
    name: sampleAlbums[0].name,
    size: 'md',
  },
};

/**
 * Large album artwork (256px).
 */
export const SizeLG: Story = {
  args: {
    image: sampleAlbums[0].image,
    name: sampleAlbums[0].name,
    size: 'lg',
  },
};

/**
 * Custom size album artwork (150px).
 */
export const CustomSize: Story = {
  args: {
    image: sampleAlbums[0].image,
    name: sampleAlbums[0].name,
    size: 150,
  },
};

/**
 * Album artwork with Apple Music styling.
 */
export const AppleMusicStyle: Story = {
  args: {
    image: sampleAlbums[1].image,
    name: sampleAlbums[1].name,
    size: 'md',
    platform: 'apple',
  },
};

/**
 * Album artwork with Spotify styling.
 */
export const SpotifyStyle: Story = {
  args: {
    image: sampleAlbums[1].image,
    name: sampleAlbums[1].name,
    size: 'md',
    platform: 'spotify',
  },
};

/**
 * Album artwork with Tidal styling.
 */
export const TidalStyle: Story = {
  args: {
    image: sampleAlbums[1].image,
    name: sampleAlbums[1].name,
    size: 'md',
    platform: 'tidal',
  },
};

/**
 * Album artwork with custom border radius.
 */
export const CustomBorderRadius: Story = {
  args: {
    image: sampleAlbums[2].image,
    name: sampleAlbums[2].name,
    size: 'md',
    borderRadius: '50%',
  },
};

/**
 * Album artwork with all features enabled.
 */
export const FullFeatured: Story = {
  args: {
    image: sampleAlbums[2].image,
    name: sampleAlbums[2].name,
    size: 'lg',
    zoom: true,
    expandable: true,
    shadow: true,
  },
};

/**
 * Grid of album artworks with different sizes.
 */
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <AlbumArtwork image={sampleAlbums[0].image} name={sampleAlbums[0].name} size="xs" />
      <AlbumArtwork image={sampleAlbums[0].image} name={sampleAlbums[0].name} size="sm" />
      <AlbumArtwork image={sampleAlbums[0].image} name={sampleAlbums[0].name} size="base" />
      <AlbumArtwork image={sampleAlbums[0].image} name={sampleAlbums[0].name} size="md" />
      <AlbumArtwork image={sampleAlbums[0].image} name={sampleAlbums[0].name} size="lg" />
    </div>
  ),
};

/**
 * Grid of album artworks with different platform styles.
 */
export const PlatformComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <AlbumArtwork
          image={sampleAlbums[1].image}
          name={sampleAlbums[1].name}
          size="md"
          platform="default"
        />
        <span>Default</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <AlbumArtwork
          image={sampleAlbums[1].image}
          name={sampleAlbums[1].name}
          size="md"
          platform="apple"
        />
        <span>Apple</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <AlbumArtwork
          image={sampleAlbums[1].image}
          name={sampleAlbums[1].name}
          size="md"
          platform="spotify"
        />
        <span>Spotify</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <AlbumArtwork
          image={sampleAlbums[1].image}
          name={sampleAlbums[1].name}
          size="md"
          platform="tidal"
        />
        <span>Tidal</span>
      </div>
    </div>
  ),
};
