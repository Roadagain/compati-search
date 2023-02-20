import { Meta, StoryObj } from '@storybook/react';

import { ShipCard } from './ShipCard';

const meta: Meta<typeof ShipCard> = {
  title: 'Molecules/ShipCard',
  component: ShipCard,
  argTypes: {
    ship: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof ShipCard>;

export const Card: Story = {
  args: {
    ship: {
      id: 1,
      name: 'なまえ',
      kana: 'なまえ',
      category: '補助艦艇',
      type: '補給艦',
      speed: '高速',
      range: '短射程',
      equipments: ['タグ1'],
      abilities: ['タグ2'],
      showDefault: true,
    },
    sx: {},
  },
};

export const OverflowTags: Story = {
  args: {
    ship: {
      id: 1,
      name: 'なまえ',
      kana: 'なまえ',
      category: '航空母艦',
      type: '正規空母',
      speed: '高速',
      range: '短射程',
      equipments: Array.from({ length: 16 }, (_, index) => `装備${index + 1}`),
      abilities: Array.from({ length: 16 }, (_, index) => `特性${index + 1}`),
      showDefault: true,
    },
    sx: {},
  },
};
