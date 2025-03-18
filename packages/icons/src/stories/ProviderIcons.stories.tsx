import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as ProviderIcons from '../providers';
import { ProviderType } from '../providers/types';
import { getSupportedProviders } from '../providers';

const meta: Meta = {
  title: 'Icons/Providers',
  component: ProviderIcons.SpotifyIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Grid layout for all provider icons
export const AllProviderIcons: Story = {
  render: () => {
    const providers = getSupportedProviders();

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1.5rem',
          padding: '2rem',
          maxWidth: '100%',
          margin: '0 auto',
        }}
      >
        {providers.map(provider => (
          <div
            key={provider}
            style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e4e4e7',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
              // ':hover': {
              //   transform: 'translateY(-2px)',
              //   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              // }
            }}
          >
            <ProviderIcons.ProviderIcon provider={provider} size={40} />
            <div
              style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                fontWeight: 500,
              }}
            >
              {provider}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// Individual provider icon with controls
export const SpotifyIcon: Story = {
  render: args => <ProviderIcons.SpotifyIcon {...args} />,
  args: {
    size: 24,
    color: '#1DB954',
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 64, step: 4 },
    },
    color: {
      control: 'color',
    },
  },
};
