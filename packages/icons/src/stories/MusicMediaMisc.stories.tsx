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
      { name: 'MusicNote' },
      { name: 'MusicNotes' },
      { name: 'MusicNotesPlus' },
      { name: 'MusicNotesMinus' },
      { name: 'Microphone' },
      { name: 'MicrophoneStage' },
      { name: 'Guitar' },
      { name: 'PianoKeys' },
      { name: 'Metronome' },
      { name: 'CassetteTape' },
      { name: 'Radio' },
      { name: 'Video' },
      { name: 'MonitorPlay' },
      { name: 'BookOpenText' },
      { name: 'Article' },
    ];
    return (
      <div>
        {icons.map(({ name }) => (
          <Icon size={40} name={name as keyof typeof PhosphorIcons} />
        ))}
      </div>
    );
  },
};
