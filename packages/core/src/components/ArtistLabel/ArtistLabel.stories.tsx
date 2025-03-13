import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ArtistLabel } from './ArtistLabel';

const meta: Meta<typeof ArtistLabel> = {
  title: 'Components/ArtistLabel',
  component: ArtistLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    artists: {
      control: { type: 'object' },
      description: 'Artist name or array of artist names',
    },
    delimiter: {
      control: { type: 'text' },
      description: 'Delimiter to use when joining multiple artist names',
    },
    truncate: {
      control: { type: 'boolean' },
      description: 'Whether to truncate the text when it overflows',
    },
    truncationType: {
      control: { type: 'select', options: ['none', 'end', 'middle'] },
      description: 'Type of truncation to apply',
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum number of characters before truncation',
    },
    as: {
      control: {
        type: 'select',
        options: ['span', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      },
      description: 'HTML element to render as',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class name',
    },
    style: {
      control: { type: 'object' },
      description: 'Additional inline styles',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArtistLabel>;

// Basic example with a single artist
export const SingleArtist: Story = {
  args: {
    artists: 'Taylor Swift',
  },
};

// Example with multiple artists
export const MultipleArtists: Story = {
  args: {
    artists: ['Drake', 'Future', 'Metro Boomin'],
  },
};

// Example with custom delimiter
export const CustomDelimiter: Story = {
  args: {
    artists: ['Kendrick Lamar', 'SZA'],
    delimiter: ' & ',
  },
};

// Example with multiple artists and truncation
export const MultipleArtistsTruncated: Story = {
  args: {
    artists: ['Drake', 'Future', 'Metro Boomin', '21 Savage', 'Travis Scott'],
    truncate: true,
    truncationType: 'end',
    maxLength: 25,
  },
  decorators: [
    Story => (
      <div style={{ width: '200px', padding: '10px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    ),
  ],
};

// Example with multiple artists and middle truncation
export const MultipleArtistsMiddleTruncated: Story = {
  args: {
    artists: ['Drake', 'Future', 'Metro Boomin', '21 Savage', 'Travis Scott'],
    truncate: true,
    truncationType: 'middle',
    maxLength: 25,
  },
  decorators: [
    Story => (
      <div style={{ width: '200px', padding: '10px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    ),
  ],
};

// Example with custom styling
export const CustomStyling: Story = {
  args: {
    artists: 'Billie Eilish',
    style: {
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: '#1DB954',
      fontSize: '18px',
    },
  },
};

// Example with custom element type
export const CustomElementType: Story = {
  args: {
    artists: 'The Weeknd',
    as: 'h3',
    style: {
      margin: 0,
    },
  },
};

// Example with multiple styling options
export const ComplexStyling: Story = {
  args: {
    artists: ['Kendrick Lamar', 'SZA'],
    delimiter: ' feat. ',
    style: {
      fontWeight: 'bold',
      background: 'linear-gradient(90deg, #1DB954, #191414)',
      padding: '8px 16px',
      borderRadius: '20px',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
  },
};
