import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import {
  FiHeart,
  FiTrash,
  FiSave,
  FiPlus,
  FiMinus,
  FiEdit,
  FiSettings,
  FiSearch,
  FiPlay,
} from 'react-icons/fi';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'The icon to display in the button',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the button on interaction',
    },
    iconColor: {
      control: 'color',
      description: 'The color of the icon',
    },
    iconSize: {
      control: 'number',
      description: 'Custom size for the icon',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
  },
  args: {
    icon: FiPlay,
    variant: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
    animate: true,
    'aria-label': 'Heart',
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/**
 * Default IconButton with primary variant
 */
export const Default: Story = {
  args: {
    icon: FiPlay,
    'aria-label': 'Play',
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    icon: FiSave,
    isLoading: true,
    'aria-label': 'Save',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    icon: FiTrash,
    disabled: true,
    'aria-label': 'Delete',
  },
};

/**
 * Custom icon color
 */
export const CustomIconColor: Story = {
  args: {
    icon: FiHeart,
    variant: 'ghost',
    iconColor: '#e91e63',
    'aria-label': 'Like',
  },
};

/**
 * Custom icon size
 */
export const CustomIconSize: Story = {
  args: {
    icon: FiHeart,
    iconSize: 28,
    'aria-label': 'Like',
  },
};

/**
 * With custom colors
 */
export const CustomColors: Story = {
  args: {
    icon: FiHeart,
    colors: {
      background: '#e91e63',
      hover: '#d81b60',
      active: '#c2185b',
      text: '#ffffff',
    },
    'aria-label': 'Like',
  },
};

/**
 * All variants
 */
export const AllVariants: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <IconButton {...args} variant="primary" aria-label="Primary" />
      <IconButton {...args} variant="secondary" aria-label="Secondary" />
      <IconButton {...args} variant="outline" aria-label="Outline" />
      <IconButton {...args} variant="ghost" aria-label="Ghost" />
    </div>
  ),
};

/**
 * All sizes
 */
export const AllSizes: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton {...args} size="sm" aria-label="Small" />
      <IconButton {...args} size="md" aria-label="Medium" />
      <IconButton {...args} size="lg" aria-label="Large" />
    </div>
  ),
};

/**
 * Different icons
 */
export const DifferentIcons: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <IconButton {...args} icon={FiHeart} aria-label="Heart" />
      <IconButton {...args} icon={FiTrash} aria-label="Trash" />
      <IconButton {...args} icon={FiSave} aria-label="Save" />
      <IconButton {...args} icon={FiPlus} aria-label="Add" />
      <IconButton {...args} icon={FiMinus} aria-label="Remove" />
      <IconButton {...args} icon={FiEdit} aria-label="Edit" />
      <IconButton {...args} icon={FiSettings} aria-label="Settings" />
      <IconButton {...args} icon={FiSearch} aria-label="Search" />
    </div>
  ),
};

/**
 * Interactive example
 */
export const Interactive: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLiked(!isLiked);
        setIsLoading(false);
      }, 1000);
    };

    return (
      <IconButton
        icon={FiHeart}
        variant={isLiked ? 'primary' : 'outline'}
        iconColor={isLiked ? 'white' : '#e91e63'}
        colors={{
          background: '#e91e63',
          hover: '#d81b60',
          active: '#c2185b',
          text: 'white',
          border: '#e91e63',
        }}
        isLoading={isLoading}
        onClick={handleClick}
        aria-label={isLiked ? 'Unlike' : 'Like'}
      />
    );
  },
};
