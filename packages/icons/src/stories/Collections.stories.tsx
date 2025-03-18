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
      { name: 'DownloadSimple', label: 'Download' },
      { name: 'UploadSimple', label: 'Upload' },

      { name: 'SortAscending', label: 'Sort Ascending' },
      { name: 'SortDescending', label: 'Sort Descending' },
      { name: 'FunnelSimple', label: 'Filter' },
      { name: 'FunnelSimpleX', label: 'Remove Filter' },

      { name: 'SquaresFour', label: 'Grid' },
      { name: 'Rows', label: 'Rows' },
      { name: 'Slideshow', label: 'Carousel' },

      { name: 'Books', label: 'Library' },
      { name: 'BookmarkSimple', label: 'Bookmark' },
      { name: 'FileAudio', label: 'Audio File' },

      { name: 'MusicNotesPlus', label: 'Add Music' },
      { name: 'MusicNotesMinus', label: 'Remove Music' },
      { name: 'Plus', label: 'Add' },
      { name: 'Minus', label: 'Remove' },

      { name: 'List', label: 'List' },
      { name: 'ListPlus', label: 'Add to List' },
      { name: 'Playlist', label: 'Playlist' },
      { name: 'Tag', label: 'Tag/Label' },
      { name: 'ListStar', label: 'New List' },
      { name: 'MagnifyingGlass', label: 'Search' },

      { name: 'Queue', label: 'Queue' },
      { name: 'ClockCounterClockwise', label: 'History' },
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
