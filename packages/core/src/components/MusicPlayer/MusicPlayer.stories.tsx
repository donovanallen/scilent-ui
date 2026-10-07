import React from 'react';
import { MusicPlayer } from './MusicPlayer';
// import { Icon } from '@scilent-ui/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { SAMPLE_TRACKS, PLATFORM_TRACKS } from '../../utils/sampleData';
import Slider from '../Slider';
import AlbumArtwork from '../Artwork/AlbumArtwork';
import { MetadataLabel } from '../MetadataLabel';
import { IconButton } from '../IconButton';
import { Icon } from '@scilent/icons';

// Common container decorator for all stories
const withContainer = (Story: React.ComponentType) => (
  <div
    style={{
      // maxWidth: '600px',
      width: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof MusicPlayer> = {
  title: 'Examples/MusicPlayer',
  component: MusicPlayer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'compact', 'expanded'],
      description: 'The variant of the music player',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the music player',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'auto'],
      description: 'The theme of the music player',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
  },
  // Apply container decorator to all stories
  decorators: [withContainer],
};

export default meta;
type Story = StoryObj<typeof MusicPlayer>;

// Default story
export const Default: Story = {
  args: {
    track: SAMPLE_TRACKS.rock,
    variant: 'default',
    size: 'md',
    theme: 'light',
    style: {
      maxWidth: '100%',
    },
  },
  render: () => (
    <div
      style={{
        border: '1px solid black',
        padding: '16px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        <AlbumArtwork
          image={'https://picsum.photos/200'}
          name={SAMPLE_TRACKS.rock.title}
          size="base"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <MetadataLabel text={SAMPLE_TRACKS.rock.title} truncate={true} maxLength={30} />
          <MetadataLabel text={SAMPLE_TRACKS.rock.artist} truncate={true} maxLength={30} />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column' }}>
          <IconButton
            variant="secondary"
            size="sm"
            icon={() => <Icon name="SpeakerHigh" />}
            aria-label="Volume"
            style={{ margin: '0px', padding: '0px' }}
          />
        </div>
      </div>
      <Slider
        value={[0]}
        min={0}
        max={100}
        tickMarks={true}
        variant="minimal"
        thumbVariant="line"
        showLabels
        formatLabel={(value: number) => `${value}%`}
        tickCount={2}
        style={{ minWidth: '500px', marginBottom: '24px' }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          variant="ghost"
          size="sm"
          icon={() => <Icon name="Shuffle" />}
          aria-label="Shuffle"
        />
        <IconButton
          variant="secondary"
          size="md"
          icon={() => <Icon name="SkipBack" />}
          aria-label="Skip Back"
        />
        <IconButton
          variant="primary"
          size="lg"
          icon={() => <Icon name="Play" />}
          aria-label="Play"
        />
        <IconButton
          variant="secondary"
          size="md"
          icon={() => <Icon name="SkipForward" />}
          aria-label="Skip Forward"
        />
        <IconButton
          variant="ghost"
          size="sm"
          icon={() => <Icon name="Repeat" />}
          aria-label="Repeat"
        />
      </div>
    </div>
  ),
};

// Consolidated comparison stories
export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <div>
        <h3>Default</h3>
        <MusicPlayer track={SAMPLE_TRACKS.rock} variant="default" style={{ maxWidth: '100%' }} />
      </div>
      <div>
        <h3>Minimal</h3>
        <MusicPlayer track={SAMPLE_TRACKS.rock} variant="minimal" style={{ maxWidth: '100%' }} />
      </div>
      <div>
        <h3>Compact</h3>
        <MusicPlayer track={SAMPLE_TRACKS.rock} variant="compact" style={{ maxWidth: '100%' }} />
      </div>
      <div>
        <h3>Expanded</h3>
        <MusicPlayer track={SAMPLE_TRACKS.rock} variant="expanded" style={{ maxWidth: '100%' }} />
      </div>
    </div>
  ),
};

export const SizeAndThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <div>
        <h3>Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <MusicPlayer track={SAMPLE_TRACKS.jazz} size="sm" style={{ maxWidth: '100%' }} />
          <MusicPlayer track={SAMPLE_TRACKS.jazz} size="md" style={{ maxWidth: '100%' }} />
          <MusicPlayer track={SAMPLE_TRACKS.jazz} size="lg" style={{ maxWidth: '100%' }} />
        </div>
      </div>
      <div>
        <h3>Themes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <MusicPlayer
            track={SAMPLE_TRACKS.electronic}
            theme="light"
            style={{ maxWidth: '100%' }}
          />
          <MusicPlayer track={SAMPLE_TRACKS.electronic} theme="dark" style={{ maxWidth: '100%' }} />
        </div>
      </div>
    </div>
  ),
};

export const ControlOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <div>
        <h3>Default Controls</h3>
        <MusicPlayer track={SAMPLE_TRACKS.pop} style={{ maxWidth: '100%' }} />
      </div>
      <div>
        <h3>Without Volume Control</h3>
        <MusicPlayer
          track={SAMPLE_TRACKS.pop}
          showVolumeControl={false}
          style={{ maxWidth: '100%' }}
        />
      </div>
      <div>
        <h3>Without Skip Buttons</h3>
        <MusicPlayer
          track={SAMPLE_TRACKS.jazz}
          showSkipButtons={false}
          style={{ maxWidth: '100%' }}
        />
      </div>
      <div>
        <h3>Minimal Controls</h3>
        <MusicPlayer
          track={SAMPLE_TRACKS.hiphop}
          variant="minimal"
          showVolumeControl={false}
          showSkipButtons={false}
          style={{ maxWidth: '100%' }}
        />
      </div>
    </div>
  ),
};

// Simplified platform comparison story
export const PlatformComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
      {/* Spotify Section */}
      <div
        style={{
          padding: '24px',
          background: 'linear-gradient(to bottom, #1DB954, #191414)',
          borderRadius: '8px',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            color: 'white',
            fontFamily: 'Circular, Helvetica, Arial, sans-serif',
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: '20px',
          }}
        >
          Spotify Player
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3
              style={{
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
                fontSize: '14px',
                marginTop: 0,
              }}
            >
              Compact
            </h3>
            <MusicPlayer
              track={PLATFORM_TRACKS.spotify}
              variant="compact"
              theme="dark"
              platform="spotify"
              showVolumeControl={true}
              showSkipButtons={true}
              showProgress={true}
              style={{
                backgroundColor: 'black',
                borderRadius: '4px',
                boxShadow: 'none',
                maxWidth: '100%',
              }}
            />
          </div>
          {/* 
          <div>
            <h3
              style={{
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
                fontSize: '14px',
                marginTop: 0,
              }}
            >
              Expanded
            </h3>
            <MusicPlayer
              track={PLATFORM_TRACKS.spotify}
              variant="expanded"
              theme="dark"
              platform="spotify"
              showVolumeControl={true}
              showSkipButtons={true}
              showProgress={true}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '4px',
                boxShadow: 'none',
                maxWidth: '100%',
              }}
            />
          </div> */}
        </div>
      </div>

      {/* Apple Music Section */}
      {/* <div
        style={{
          padding: '24px',
          background: 'linear-gradient(to right, #fbfbfd, #f5f5f7)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            color: '#fa586a',
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'linear-gradient(to bottom right, #fa586a, #fb8c62)',
            }}
          ></span>
          Apple Music
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3
              style={{
                color: 'rgba(0,0,0,0.6)',
                marginBottom: '8px',
                fontSize: '14px',
                marginTop: 0,
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Compact
            </h3>
            <MusicPlayer
              track={PLATFORM_TRACKS.apple}
              variant="compact"
              theme="light"
              platform="apple"
              showVolumeControl={true}
              showSkipButtons={true}
              showProgress={true}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                maxWidth: '100%',
                padding: '16px',
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            />
          </div>

          <div>
            <h3
              style={{
                color: 'rgba(0,0,0,0.6)',
                marginBottom: '8px',
                fontSize: '14px',
                marginTop: 0,
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Expanded
            </h3>
            <MusicPlayer
              track={PLATFORM_TRACKS.apple}
              variant="expanded"
              theme="light"
              platform="apple"
              showVolumeControl={true}
              showSkipButtons={true}
              showProgress={true}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                maxWidth: '100%',
                padding: '20px',
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            />
          </div>
        </div>
      </div> */}

      {/* Tidal Section */}
      {/* <div
        style={{
          padding: '24px',
          background: '#000',
          borderRadius: '0px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            color: 'white',
            fontFamily: 'Gotham, Helvetica, Arial, sans-serif',
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: '20px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          TIDAL
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3
              style={{
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
                fontSize: '14px',
                letterSpacing: '0.5px',
                marginTop: 0,
              }}
            >
              COMPACT
            </h3>
            <MusicPlayer
              track={PLATFORM_TRACKS.tidal}
              variant="compact"
              theme="dark"
              platform="tidal"
              showVolumeControl={true}
              showSkipButtons={true}
              showProgress={true}
              style={{
                backgroundColor: '#111',
                borderRadius: '0px',
                boxShadow: 'none',
                maxWidth: '100%',
              }}
            />
          </div> */}

      {/* <div>
            <h3
              style={{
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
                fontSize: '14px',
                letterSpacing: '0.5px',
                marginTop: 0,
              }}
            >
              EXPANDED
            </h3>
            <MusicPlayer
              track={PLATFORM_TRACKS.tidal}
              variant="expanded"
              theme="dark"
              platform="tidal"
              showVolumeControl={true}
              showSkipButtons={true}
              showProgress={true}
              style={{
                backgroundColor: '#111',
                borderRadius: '0px',
                boxShadow: 'none',
                maxWidth: '100%',
              }}
            />
          </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  ),
  parameters: {
    layout: 'padded',
    // Override the default container decorator for this story
    decorators: [
      (Story: React.ComponentType) => (
        <div
          style={{
            maxWidth: '800px',
            width: '100%',
            overflow: 'hidden',
            boxSizing: 'border-box',
            margin: '0 auto',
          }}
        >
          <Story />
        </div>
      ),
    ],
  },
};

// export const Default = () => <MusicPlayer />;
