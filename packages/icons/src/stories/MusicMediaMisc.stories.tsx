import { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../icons/Icon';
import { IconProps } from '@phosphor-icons/react';
import * as PhosphorIcons from '@phosphor-icons/react';

const meta: Meta = {
  title: 'Icons/Music Misc',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const AllMusicMiscIcons: Story = {
  render: () => {
    const icons = [
      { name: 'MusicNote', label: 'Music 2' },
      { name: 'MusicNotes', label: 'Music' },
      { name: 'MusicNotesPlus', label: 'Add Music' },
      { name: 'MusicNotesMinus', label: 'Remove Music' },
      { name: 'Microphone', label: 'Podcast' },
      { name: 'MicrophoneStage', label: 'Artist' },
      { name: 'Guitar', label: 'Guitar' },
      { name: 'PianoKeys', label: 'Piano' },
      { name: 'Metronome', label: 'Percussion' },
      { name: 'CassetteTape', label: 'Tape' },
      { name: 'Radio', label: 'Radio' },
      { name: 'Video', label: 'Video' },
      { name: 'MonitorPlay', label: 'Video 2' },
      { name: 'BookOpenText', label: 'Lyrics' },
      { name: 'Article', label: 'Credits' },
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
