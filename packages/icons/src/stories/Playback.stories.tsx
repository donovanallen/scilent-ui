import { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../icons/Icon';
import * as PhosphorIcons from '@phosphor-icons/react';

const meta: Meta = {
  title: 'Icons/Playback',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const AllPlaybackIcons: Story = {
  render: () => {
    const icons = [
      { name: 'PlayPause' },
      { name: 'Play' },
      { name: 'Pause' },
      { name: 'Stop' },
      { name: 'SkipBack' },
      { name: 'Rewind' },
      { name: 'FastForward' },
      { name: 'SkipForward' },
      { name: 'Shuffle' },
      { name: 'ShuffleAngular' },
      { name: 'ShuffleSimple' },
      { name: 'Repeat' },
      { name: 'RepeatOnce' },
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
          <div
            key={name}
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
            }}
          >
            <Icon size={40} name={name as keyof typeof PhosphorIcons} />
            <div
              style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                fontWeight: 500,
              }}
            >
              {name}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
