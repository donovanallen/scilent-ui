import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MetadataLabel } from './MetadataLabel';

const meta: Meta<typeof MetadataLabel> = {
  title: 'Components/MetadataLabel',
  component: MetadataLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'Text content to display',
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
type Story = StoryObj<typeof MetadataLabel>;

// Basic example
export const Basic: Story = {
  args: {
    text: 'Thriller',
  },
};

// Example with end truncation
export const TruncateEnd: Story = {
  args: {
    text: 'The Dark Side of the Moon (2023 Remastered Edition)',
    truncate: true,
    truncationType: 'end',
    maxLength: 30,
  },
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

// Example with middle truncation
export const TruncateMiddle: Story = {
  args: {
    text: "Sgt. Pepper's Lonely Hearts Club Band (50th Anniversary Edition)",
    truncate: true,
    truncationType: 'middle',
    maxLength: 30,
  },
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

// Example with custom styling
export const CustomStyling: Story = {
  args: {
    text: 'Abbey Road',
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
    text: 'Album of the Year',
    as: 'h3',
    style: {
      margin: 0,
    },
  },
};

// Example with complex styling
export const ComplexStyling: Story = {
  args: {
    text: 'Grammy Award Winner',
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
