import { Meta, StoryObj } from '@storybook/react';

import { ShipCard } from './ShipCard';

const meta: Meta<typeof ShipCard> = {
  title: 'Molecules/ShipCard',
  component: ShipCard,
  argTypes: {
    name: { control: 'text' },
    tags: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof ShipCard>;

export const Card: Story = {
  args: {
    name: 'なまえ',
    tags: ['タグ1', 'タグ2'],
    sx: {},
  },
};

export const OverflowTags: Story = {
  args: {
    name: 'なまえ',
    tags: Array.from({ length: 32 }, (_, index) => `タグ${index + 1}`),
    sx: {},
  },
};
