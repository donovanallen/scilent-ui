import { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../icons/Icon';
import { IconProps } from '@phosphor-icons/react';
import * as PhosphorIcons from '@phosphor-icons/react';

const meta: Meta = {
  title: 'Icons/General',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const AllGeneralIcons: Story = {
  render: () => {
    const icons = [
      { name: 'House', label: 'Home' },
      { name: 'HouseSimple', label: 'Home 2' },
      { name: 'Gear', label: 'Settings' },
      { name: 'Share', label: 'Share' },
      { name: 'Export', label: 'Export' },
      { name: 'ShareNetwork', label: 'Share 2' },
      { name: 'Info', label: 'Info' },
      { name: 'ArrowsOutSimple', label: 'Arrow Out' },
      { name: 'ArrowsInSimple', label: 'Arrow In' },
      { name: 'ArrowsOut', label: 'Arrow Out 2' },
      { name: 'ArrowsIn', label: 'Arrow In 2' },
      { name: 'X', label: 'Close' },
      { name: 'NotePencil', label: 'Edit' },
      { name: 'ArrowRight', label: 'Arrow Right' },
      { name: 'ArrowUp', label: 'Arrow Up' },
      { name: 'ArrowDown', label: 'Arrow Down' },
      { name: 'ArrowLeft', label: 'Arrow Left' },
      { name: 'CaretRight', label: 'Caret Right' },
      { name: 'CaretLeft', label: 'Caret Left' },
      { name: 'CaretUp', label: 'Caret Up' },
      { name: 'CaretDown', label: 'Caret Down' },
      { name: 'Check', label: 'Check' },
      { name: 'Checks', label: 'Checks' },
      { name: 'SealCheck', label: 'Seal Check' },
      { name: 'CheckCircle', label: 'Check Circle' },
      { name: 'User', label: 'User' },
      { name: 'Users', label: 'Users' },
      { name: 'UsersThree', label: 'User Group' },
      { name: 'UserCheck', label: 'User Check' },
      { name: 'UserCircle', label: 'User Circle' },
      { name: 'Star', label: 'Star' },
      { name: 'Sparkle', label: 'Stars' },
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
