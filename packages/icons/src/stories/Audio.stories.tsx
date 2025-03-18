import { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../icons/Icon';
import * as PhosphorIcons from '@phosphor-icons/react';

const meta: Meta = {
  title: 'Icons/Audio',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const AllAudioIcons: Story = {
  render: () => {
    const icons = [
      {
        name: 'SpeakerLow',
        label: 'Volume Low',
      },
      {
        name: 'SpeakerHigh',
        label: 'Volume High',
      },
      {
        name: 'SpeakerNone',
        label: 'Volume Mute',
      },
      {
        name: 'SpeakerSlash',
        label: 'Volume Mute 2',
      },
      {
        name: 'SpeakerX',
        label: 'Volume Off',
      },
      {
        name: 'Equalizer',
        label: 'Equalizer',
      },
      {
        name: 'Faders',
        label: 'Faders',
      },
      {
        name: 'StandardDefinition',
        label: 'SD',
      },
      {
        name: 'HighDefinition',
        label: 'HD',
      },
      {
        name: 'SpeakerHifi',
        label: 'Speaker',
      },
      {
        name: 'Headphones',
        label: 'Headphones',
      },
    ];
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
        {icons.map(({ name, label }) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            key={name}
          >
            <Icon size={40} name={name as keyof typeof PhosphorIcons} />
            <p>{label}</p>
          </div>
        ))}
      </div>
    );
  },
};
