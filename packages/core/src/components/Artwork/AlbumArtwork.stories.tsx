import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AlbumArtwork } from './AlbumArtwork';
import { ALBUM_ARTWORK } from '../../utils/sampleData';

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
    image: ALBUM_ARTWORK.pop,
    name: 'Album Name',
    size: 'base',
    platform: 'default',
    shadow: false,
    zoom: false,
    expandable: false,
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

// Size variants
export const Sizes: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>xs</p>
        <AlbumArtwork {...args} size="xs" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>sm</p>
        <AlbumArtwork {...args} size="sm" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>base</p>
        <AlbumArtwork {...args} size="base" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>md</p>
        <AlbumArtwork {...args} size="md" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>lg</p>
        <AlbumArtwork {...args} size="lg" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>custom (100px)</p>
        <AlbumArtwork {...args} size={100} />
      </div>
    </div>
  ),
  args: {
    image: ALBUM_ARTWORK.rock,
    name: 'Album Name',
  },
};

// Platform variants
export const Platforms: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Default</p>
        <AlbumArtwork {...args} platform="default" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Spotify</p>
        <AlbumArtwork {...args} platform="spotify" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Apple Music</p>
        <AlbumArtwork {...args} platform="apple" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Tidal</p>
        <AlbumArtwork {...args} platform="tidal" />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Custom</p>
        <AlbumArtwork {...args} platform="custom" borderRadius="16px" />
      </div>
    </div>
  ),
  args: {
    image: ALBUM_ARTWORK.electronic,
    name: 'Album Name',
    size: 'base',
  },
};

// Interactive features
export const InteractiveFeatures: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>With Shadow</p>
        <AlbumArtwork {...args} shadow={true} />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>With Zoom</p>
        <AlbumArtwork {...args} zoom={true} />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Expandable</p>
        <AlbumArtwork {...args} expandable={true} />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>With Click Handler</p>
        <AlbumArtwork {...args} onClick={() => alert('Artwork clicked!')} />
      </div>
    </div>
  ),
  args: {
    image: ALBUM_ARTWORK.jazz,
    name: 'Album Name',
    size: 'base',
  },
};

// Error handling
export const ErrorHandling: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Valid Image</p>
        <AlbumArtwork {...args} image={ALBUM_ARTWORK.pop} />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Missing Image (null)</p>
        <AlbumArtwork {...args} image={null} />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Broken Image</p>
        <AlbumArtwork {...args} image={ALBUM_ARTWORK.broken} />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>With Fallback</p>
        <AlbumArtwork
          {...args}
          image={ALBUM_ARTWORK.broken}
          fallbackImage={ALBUM_ARTWORK.placeholder1}
        />
      </div>
    </div>
  ),
  args: {
    name: 'Album Name',
    size: 'base',
  },
};

// Platform-specific placeholders
export const PlatformPlaceholders: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Default</p>
        <AlbumArtwork {...args} platform="default" image={null} />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Spotify</p>
        <AlbumArtwork {...args} platform="spotify" image={null} />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Apple Music</p>
        <AlbumArtwork {...args} platform="apple" image={null} />
      </div>
      <div>
        <p style={{ textAlign: 'center', marginBottom: '8px' }}>Tidal</p>
        <AlbumArtwork {...args} platform="tidal" image={null} />
      </div>
    </div>
  ),
  args: {
    name: 'Album Name',
    size: 'base',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};
