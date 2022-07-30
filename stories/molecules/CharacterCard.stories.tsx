import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CharacterCard } from '../../components/molecules/CharacterCard';

const componentMeta: ComponentMeta<typeof CharacterCard> = {
  title: 'Molecules/CharacterCard',
  component: CharacterCard,
  argTypes: {
    name: { control: 'text' },
    tags: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof CharacterCard> = (args) => (
  <CharacterCard {...args} />
);

export const Card = Template.bind({});
Card.args = {
  name: 'なまえ',
  tags: new Set(['タグ1', 'タグ2'])
};
