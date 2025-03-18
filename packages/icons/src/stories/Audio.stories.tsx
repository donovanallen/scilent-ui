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
      { name: 'SpeakerLow' },
      { name: 'SpeakerHigh' },
      { name: 'SpeakerNone' },
      { name: 'SpeakerSlash' },
      { name: 'SpeakerX' },
      { name: 'Equalizer' },
      { name: 'Faders' },
      { name: 'StandardDefinition' },
      { name: 'HighDefinition' },
      { name: 'SpeakerHifi' },
      { name: 'Headphones' },
    ];
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1.5rem',
          padding: '2rem',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {icons.map(({ name }) => (
          <div key={name}>
            <Icon size={40} name={name as keyof typeof PhosphorIcons} />
          </div>
        ))}
      </div>
    );
  },
};
