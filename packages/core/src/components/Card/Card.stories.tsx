import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { SAMPLE_TRACKS, PLATFORM_TRACKS } from '../../utils/sampleData';

const meta: Meta<typeof Card> = {
  title: 'Examples/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the card',
      defaultValue: 'md',
    },
    layout: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation of the card',
      defaultValue: 'vertical',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark', 'auto'],
      description: 'Color theme of the card',
      defaultValue: 'light',
    },
    hoverEffect: {
      control: 'select',
      options: ['none', 'lift', 'scale', 'glow'],
      description: 'Hover effect to apply to the card',
      defaultValue: 'lift',
    },
    platform: {
      control: 'select',
      options: ['default', 'spotify', 'apple', 'tidal'],
      description: 'Platform-specific styling',
      defaultValue: 'default',
    },
    showAlbum: {
      control: 'boolean',
      description: 'Whether to show the album name',
      defaultValue: true,
    },
    shadow: {
      control: 'boolean',
      description: 'Whether to apply a shadow effect',
      defaultValue: true,
    },
    expandableArtwork: {
      control: 'boolean',
      description: 'Whether to make the artwork expandable',
      defaultValue: false,
    },
    zoomArtwork: {
      control: 'boolean',
      description: 'Whether to apply a zoom effect on artwork hover',
      defaultValue: false,
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is interactive (clickable)',
      defaultValue: true,
    },
    showPlayButton: {
      control: 'boolean',
      description: 'Whether to show a play button overlay on hover',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic example
export const Default: Story = {
  args: {
    item: SAMPLE_TRACKS.pop,
    size: 'md',
    layout: 'vertical',
    theme: 'light',
    hoverEffect: 'lift',
    showAlbum: true,
    shadow: true,
    expandableArtwork: false,
    zoomArtwork: false,
    platform: 'default',
    interactive: true,
    showPlayButton: false,
  },
};

// Size variants
export const Sizes: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <Card {...args} size="sm" item={SAMPLE_TRACKS.pop} />
      <Card {...args} size="md" item={SAMPLE_TRACKS.hiphop} />
      <Card {...args} size="lg" item={SAMPLE_TRACKS.taylor} />
    </div>
  ),
};

// Layout variants
export const Layouts: Story = {
  render: args => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '600px',
      }}
    >
      <Card {...args} layout="vertical" item={SAMPLE_TRACKS.pop} />
      <Card {...args} layout="horizontal" item={SAMPLE_TRACKS.pop} />
    </div>
  ),
};

// Theme variants
export const Themes: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{ padding: '20px', background: '#ffffff', borderRadius: '8px' }}>
        <Card {...args} theme="light" item={SAMPLE_TRACKS.pop} />
      </div>
      <div style={{ padding: '20px', background: '#1f2937', borderRadius: '8px' }}>
        <Card {...args} theme="dark" item={SAMPLE_TRACKS.hiphop} />
      </div>
    </div>
  ),
};

// Hover effects
export const HoverEffects: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Card {...args} hoverEffect="none" item={SAMPLE_TRACKS.pop} />
      <Card {...args} hoverEffect="lift" item={SAMPLE_TRACKS.hiphop} />
      <Card {...args} hoverEffect="scale" item={SAMPLE_TRACKS.taylor} />
      <Card {...args} hoverEffect="glow" item={SAMPLE_TRACKS.billie} />
    </div>
  ),
};

// Platform-specific styling
export const PlatformStyling: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Card {...args} platform="default" item={SAMPLE_TRACKS.pop} />
      <Card {...args} platform="spotify" theme="dark" item={SAMPLE_TRACKS.hiphop} />
      <Card {...args} platform="apple" item={SAMPLE_TRACKS.taylor} />
      <Card {...args} platform="tidal" theme="dark" item={SAMPLE_TRACKS.billie} />
    </div>
  ),
};

// Spotify style
export const SpotifyStyle: Story = {
  args: {
    item: PLATFORM_TRACKS.spotify,
    platform: 'spotify',
    theme: 'dark',
    hoverEffect: 'lift',
    showPlayButton: true,
    shadow: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Apple Music style
export const AppleMusicStyle: Story = {
  args: {
    item: PLATFORM_TRACKS.apple,
    platform: 'apple',
    theme: 'light',
    hoverEffect: 'scale',
    showPlayButton: true,
    shadow: true,
  },
};

// Tidal style
export const TidalStyle: Story = {
  args: {
    item: PLATFORM_TRACKS.tidal,
    platform: 'tidal',
    theme: 'dark',
    hoverEffect: 'none',
    showPlayButton: true,
    shadow: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Interactive features
export const InteractiveFeatures: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        <h3 style={{ marginBottom: '10px' }}>With Play Button</h3>
        <Card
          {...args}
          item={SAMPLE_TRACKS.pop}
          showPlayButton={true}
          onPlay={() => alert('Play clicked!')}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Expandable Artwork</h3>
        <Card {...args} item={SAMPLE_TRACKS.hiphop} expandableArtwork={true} />
      </div>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Zoom Artwork</h3>
        <Card {...args} item={SAMPLE_TRACKS.taylor} zoomArtwork={true} />
      </div>
    </div>
  ),
};

// Grid layout example
export const GridLayout: Story = {
  render: args => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <Card {...args} item={SAMPLE_TRACKS.pop} platform="spotify" theme="dark" />
      <Card {...args} item={SAMPLE_TRACKS.hiphop} platform="spotify" theme="dark" />
      <Card {...args} item={SAMPLE_TRACKS.taylor} platform="spotify" theme="dark" />
      <Card {...args} item={SAMPLE_TRACKS.billie} platform="spotify" theme="dark" />
      <Card {...args} item={SAMPLE_TRACKS.rock} platform="spotify" theme="dark" />
      <Card {...args} item={SAMPLE_TRACKS.jazz} platform="spotify" theme="dark" />
      <Card {...args} item={SAMPLE_TRACKS.electronic} platform="spotify" theme="dark" />
      <Card {...args} item={SAMPLE_TRACKS.classical} platform="spotify" theme="dark" />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};

// Horizontal scrolling list
export const HorizontalScroll: Story = {
  render: args => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        padding: '20px',
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <Card {...args} item={SAMPLE_TRACKS.pop} size="sm" platform="apple" />
      <Card {...args} item={SAMPLE_TRACKS.hiphop} size="sm" platform="apple" />
      <Card {...args} item={SAMPLE_TRACKS.taylor} size="sm" platform="apple" />
      <Card {...args} item={SAMPLE_TRACKS.billie} size="sm" platform="apple" />
      <Card {...args} item={SAMPLE_TRACKS.rock} size="sm" platform="apple" />
      <Card {...args} item={SAMPLE_TRACKS.jazz} size="sm" platform="apple" />
    </div>
  ),
};

// Platform comparison
export const PlatformComparison: Story = {
  render: args => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <div>
        <h2 style={{ marginBottom: '20px' }}>Spotify</h2>
        <div
          style={{
            padding: '20px',
            background: '#121212',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
            <Card
              {...args}
              item={SAMPLE_TRACKS.pop}
              platform="spotify"
              theme="dark"
              showPlayButton={true}
              size="sm"
            />
            <Card
              {...args}
              item={SAMPLE_TRACKS.hiphop}
              platform="spotify"
              theme="dark"
              showPlayButton={true}
              size="sm"
            />
            <Card
              {...args}
              item={SAMPLE_TRACKS.taylor}
              platform="spotify"
              theme="dark"
              showPlayButton={true}
              size="sm"
            />
            <Card
              {...args}
              item={SAMPLE_TRACKS.billie}
              platform="spotify"
              theme="dark"
              showPlayButton={true}
              size="sm"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: '20px' }}>Apple Music</h2>
        <div
          style={{
            padding: '20px',
            background: '#f5f5f7',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
            <Card
              {...args}
              item={SAMPLE_TRACKS.pop}
              platform="apple"
              theme="light"
              showPlayButton={true}
              size="sm"
            />
            <Card
              {...args}
              item={SAMPLE_TRACKS.hiphop}
              platform="apple"
              theme="light"
              showPlayButton={true}
              size="sm"
            />
            <Card
              {...args}
              item={SAMPLE_TRACKS.taylor}
              platform="apple"
              theme="light"
              showPlayButton={true}
              size="sm"
            />
            <Card
              {...args}
              item={SAMPLE_TRACKS.billie}
              platform="apple"
              theme="light"
              showPlayButton={true}
              size="sm"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: '20px' }}>Tidal</h2>
        <div
          style={{
            padding: '20px',
            background: '#000000',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
            <Card
              {...args}
              item={SAMPLE_TRACKS.pop}
              platform="tidal"
              theme="dark"
              showPlayButton={true}
              size="sm"
            />
            <Card
              {...args}
              item={SAMPLE_TRACKS.hiphop}
              platform="tidal"
              theme="dark"
              showPlayButton={true}
              size="sm"
            />
            <Card
              {...args}
              item={SAMPLE_TRACKS.taylor}
              platform="tidal"
              theme="dark"
              showPlayButton={true}
              size="sm"
            />
            <Card
              {...args}
              item={SAMPLE_TRACKS.billie}
              platform="tidal"
              theme="dark"
              showPlayButton={true}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Horizontal layout with different sizes
export const HorizontalLayouts: Story = {
  render: args => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <Card
        {...args}
        layout="horizontal"
        size="sm"
        item={SAMPLE_TRACKS.pop}
        platform="spotify"
        theme="dark"
      />
      <Card
        {...args}
        layout="horizontal"
        size="md"
        item={SAMPLE_TRACKS.hiphop}
        platform="spotify"
        theme="dark"
      />
      <Card
        {...args}
        layout="horizontal"
        size="lg"
        item={SAMPLE_TRACKS.taylor}
        platform="spotify"
        theme="dark"
      />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
