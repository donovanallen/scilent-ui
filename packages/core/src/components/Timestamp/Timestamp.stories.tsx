import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Timestamp } from './Timestamp';
import { formatDuration, formatDurationHuman } from './utils';

const meta: Meta<typeof Timestamp> = {
  title: 'Components/Timestamp',
  component: Timestamp,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile component for displaying time-related information in various formats, ideal for music applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The value to display (number, Date, or ISO string)',
      table: {
        defaultValue: { summary: 'new Date()' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'highlight', 'contrast'],
      description: 'The visual style of the timestamp',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the timestamp',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    format: {
      control: 'select',
      options: [
        'duration',
        'relative',
        'date',
        'time',
        'datetime',
        'shortDate',
        'shortTime',
        'shortDatetime',
        'yearMonth',
        'monthDay',
        'weekday',
        'custom',
      ],
      description: 'The format to display the timestamp in',
    },
    locale: {
      control: 'text',
      description: 'The locale to use for formatting',
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate changes',
    },
    autoUpdate: {
      control: 'boolean',
      description: 'Whether to update relative times automatically',
      table: {
        defaultValue: { summary: 'true for relative format' },
      },
    },
    updateInterval: {
      control: 'number',
      description: 'Update interval in milliseconds for relative times',
      table: {
        defaultValue: { summary: '60000 (1 minute)' },
      },
    },
    customFormat: {
      control: 'object',
      description: 'Custom format options for Intl.DateTimeFormat (only used with format="custom")',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timestamp>;

/**
 * Track duration in MM:SS format
 */
export const TrackDuration: Story = {
  args: {
    value: 237, // 3:57
    format: 'duration',
  },
};

/**
 * Long duration with hours in HH:MM:SS format
 */
export const LongDuration: Story = {
  args: {
    value: 7825, // 2:10:25
    format: 'duration',
  },
};

/**
 * Relative time (e.g., "2 days ago")
 */
export const RelativeTime: Story = {
  args: {
    value: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    format: 'relative',
    autoUpdate: true,
  },
};

/**
 * Future relative time
 */
export const FutureRelativeTime: Story = {
  args: {
    value: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days in the future
    format: 'relative',
    autoUpdate: true,
  },
};

/**
 * Formatted date
 */
export const FormattedDate: Story = {
  args: {
    value: new Date(),
    format: 'date',
  },
};

/**
 * Formatted time
 */
export const FormattedTime: Story = {
  args: {
    value: new Date(),
    format: 'time',
  },
};

/**
 * Formatted date and time
 */
export const FormattedDateTime: Story = {
  args: {
    value: new Date(),
    format: 'datetime',
  },
};

/**
 * Short date format (MM/DD/YY)
 */
export const ShortDate: Story = {
  args: {
    value: new Date(),
    format: 'shortDate',
  },
};

/**
 * Month and year only
 */
export const YearMonth: Story = {
  args: {
    value: new Date(),
    format: 'yearMonth',
  },
};

/**
 * Weekday name
 */
export const Weekday: Story = {
  args: {
    value: new Date(),
    format: 'weekday',
  },
};

/**
 * Custom format using Intl.DateTimeFormat options
 */
export const CustomFormat: Story = {
  args: {
    value: new Date(),
    format: 'custom',
    customFormat: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    },
  },
};

/**
 * Small size variant
 */
export const SmallSize: Story = {
  args: {
    value: 237,
    size: 'sm',
    format: 'duration',
  },
};

/**
 * Large size variant
 */
export const LargeSize: Story = {
  args: {
    value: 237,
    size: 'lg',
    format: 'duration',
  },
};

/**
 * Muted variant for less emphasis
 */
export const MutedVariant: Story = {
  args: {
    value: 237,
    variant: 'muted',
    format: 'duration',
  },
};

/**
 * Highlight variant for emphasis
 */
export const HighlightVariant: Story = {
  args: {
    value: 237,
    variant: 'highlight',
    format: 'duration',
  },
};

/**
 * Contrast variant for use on dark backgrounds
 */
export const ContrastVariant: Story = {
  args: {
    value: 237,
    variant: 'contrast',
    format: 'duration',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Animated changes
 */
export const AnimatedChanges: Story = {
  args: {
    value: 30,
    format: 'duration',
    animate: true,
  },
  render: function Render(args) {
    const [currentTime, setCurrentTime] = useState(args.value as number);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(prev => (prev < 60 ? prev + 1 : 30));
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div>
        <p>The timestamp will animate when the value changes:</p>
        <Timestamp {...args} value={currentTime} />
      </div>
    );
  },
};

/**
 * ISO string date input
 */
export const ISOStringInput: Story = {
  args: {
    value: new Date().toISOString(),
    format: 'datetime',
  },
};

/**
 * Album release date example
 */
export const AlbumReleaseDate: Story = {
  args: {
    value: '2021-06-18T00:00:00.000Z', // Example album release date
    format: 'date',
    variant: 'muted',
    size: 'sm',
  },
};

/**
 * Current playback time example with progress
 */
export const PlaybackTime: Story = {
  render: function Render() {
    const [currentTime, setCurrentTime] = useState(127); // 2:07 into a song
    const totalDuration = 237; // 3:57 total duration

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(prev => (prev < totalDuration ? prev + 1 : 127));
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Timestamp value={currentTime} format="duration" animate={true} />
          <span style={{ color: 'var(--color-text-muted, #6b7280)' }}>/</span>
          <Timestamp value={totalDuration} format="duration" variant="muted" />
        </div>
        <div
          style={{ width: '200px', height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}
        >
          <div
            style={{
              width: `${(currentTime / totalDuration) * 100}%`,
              height: '100%',
              backgroundColor: 'var(--color-primary, #3b82f6)',
              borderRadius: '2px',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>
    );
  },
};

/**
 * Human-readable duration format
 */
export const HumanReadableDuration: Story = {
  render: function Render() {
    const durations = [45, 125, 3600, 7325];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p>Comparing different duration formats:</p>
        {durations.map((duration, index) => (
          <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '80px' }}>
              <Timestamp value={duration} format="duration" />
            </div>
            <div style={{ width: '100px' }}>{formatDuration(duration, true)}</div>
            <div style={{ color: 'var(--color-primary, #3b82f6)' }}>
              {formatDurationHuman(duration)}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Different locales example
 */
export const DifferentLocales: Story = {
  render: function Render() {
    const now = new Date();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <strong>English (US):</strong> <Timestamp value={now} format="datetime" locale="en-US" />
        </div>
        <div>
          <strong>French:</strong> <Timestamp value={now} format="datetime" locale="fr" />
        </div>
        <div>
          <strong>Japanese:</strong> <Timestamp value={now} format="datetime" locale="ja" />
        </div>
        <div>
          <strong>Arabic:</strong> <Timestamp value={now} format="datetime" locale="ar" />
        </div>
      </div>
    );
  },
};
