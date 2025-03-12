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
    text: 'This is a basic metadata label',
  },
};

// Example with end truncation
export const TruncateEnd: Story = {
  args: {
    text: 'A very long text that will be truncated at the end',
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
    text: 'A very long text that will be truncated in the middle',
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
    text: 'Styled metadata',
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
    text: 'Heading Element',
    as: 'h3',
    style: {
      margin: 0,
    },
  },
};

// Example with click handler
export const Clickable: Story = {
  args: {
    text: 'Click me!',
    style: {
      cursor: 'pointer',
      color: '#1DB954',
      textDecoration: 'underline',
    },
  },
};

// Example with complex styling
export const ComplexStyling: Story = {
  args: {
    text: 'Complex styled metadata',
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
