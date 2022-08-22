import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CharacterCard } from './CharacterCard';

const componentMeta: ComponentMeta<typeof CharacterCard> = {
  title: 'Molecules/CharacterCard',
  component: CharacterCard,
  argTypes: {
    name: { control: 'text' },
    tagLabels: { control: 'object' },
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
  tagLabels: ['タグ1', 'タグ2'],
  sx: {},
};
