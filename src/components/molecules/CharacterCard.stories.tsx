import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CharacterCard } from './CharacterCard';

const componentMeta: ComponentMeta<typeof CharacterCard> = {
  title: 'Molecules/CharacterCard',
  component: CharacterCard,
  argTypes: {
    name: { control: 'text' },
    tags: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof CharacterCard> = (args) => (
  <CharacterCard {...args} />
);

export const Card = Template.bind({});
Card.args = {
  name: 'なまえ',
  tags: [
    { category: 'カテゴリー1', label: 'タグ1' },
    { category: 'カテゴリー2', label: 'タグ2' },
  ],
  sx: {},
};

export const OverflowTags = Template.bind({});
OverflowTags.args = {
  name: 'なまえ',
  tags: Array.from({ length: 32 }, (_, index) => ({
    category: `カテゴリー${index}`,
    label: `タグ${index + 1}`,
  })),
  sx: {},
};
