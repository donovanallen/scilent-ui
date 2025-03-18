import { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../icons/Icon';
import { IconProps } from '@phosphor-icons/react';
import * as PhosphorIcons from '@phosphor-icons/react';

const meta: Meta = {
  title: 'Icons/Collections',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const AllCollectionsIcons: Story = {
  render: () => {
    const icons = [
      { name: 'ListPlus' },
      { name: 'MusicNotesPlus' },
      { name: 'MusicNotesMinus' },
      { name: 'Plus' },
      { name: 'Minus' },
      { name: 'DownloadSimple' },
      { name: 'UploadSimple' },
      { name: 'SortAscending' },
      { name: 'SortDescending' },
      { name: 'FunnelSimple' },
      { name: 'FunnelSimpleX' },
      { name: 'SquaresFour' },
      { name: 'Rows' },
      { name: 'List' },
      { name: 'Slideshow' },
      { name: 'Books' },
      { name: 'BookmarkSimple' },
      { name: 'FileAudio' },

      { name: 'Playlist' },
      { name: 'Tag' },
      { name: 'ListStar' },
      { name: 'MagnifyingGlass' },

      { name: 'Queue' },
      { name: 'ClockCounterClockwise' },
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
