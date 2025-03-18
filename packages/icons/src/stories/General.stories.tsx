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
      { name: 'House' },
      { name: 'HouseSimple' },
      { name: 'Gear' },
      { name: 'Share' },
      { name: 'Export' },
      { name: 'ShareNetwork' },
      { name: 'Info' },
      { name: 'ArrowsOutSimple' },
      { name: 'ArrowsInSimple' },
      { name: 'ArrowsOut' },
      { name: 'ArrowsIn' },
      { name: 'Resize' },
      { name: 'X' },
      { name: 'NotePencil' },
      { name: 'PencilSimple' },
      { name: 'PencilSimpleLine' },
      { name: 'ArrowRight' },
      { name: 'ArrowUp' },
      { name: 'ArrowDown' },
      { name: 'ArrowLeft' },
      { name: 'CaretRight' },
      { name: 'CaretLeft' },
      { name: 'CaretUp' },
      { name: 'CaretDown' },
      { name: 'Check' },
      { name: 'Checks' },
      { name: 'SealCheck' },
      { name: 'CheckCircle' },
      { name: 'User' },
      { name: 'Users' },
      { name: 'UsersThree' },
      { name: 'UsersCheck' },
      { name: 'UsersCircle' },
      { name: 'Star' },
      { name: 'Sparkle' },
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
