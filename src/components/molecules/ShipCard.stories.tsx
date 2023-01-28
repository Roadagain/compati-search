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
    tags: [
      { category: 'あいうえお', label: 'タグ1' },
      { category: 'かきくけこ', label: 'タグ2' },
    ],
    sx: {},
  },
};
export const OverflowTags: Story = {
  args: {
    name: 'なまえ',
    tags: Array.from({ length: 32 }, (_, index) => ({
      category: `カテゴリー${index + 1}`,
      label: `タグ${index + 1}`,
    })),
    sx: {},
  },
};
export const DuplicateTagLabels: Story = {
  args: {
    name: 'なまえ',
    tags: [
      { category: 'あいうえお', label: 'タグ1' },
      { category: 'かきくけこ', label: 'タグ2' },
      { category: 'さしすせそ', label: 'タグ2' },
    ],
    sx: {},
  },
};
