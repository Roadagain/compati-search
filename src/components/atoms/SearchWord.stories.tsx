import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchWord } from './SearchWord';

const componentMeta: ComponentMeta<typeof SearchWord> = {
  title: 'Atoms/SearchWord',
  component: SearchWord,
  argTypes: {
    word: { control: 'text' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchWord> = (args) => (
  <SearchWord {...args} />
);

export const PlusWord = Template.bind({});
PlusWord.args = {
  word: 'あいうえお',
  sx: {},
};

export const MinusWord = Template.bind({});
MinusWord.args = {
  word: '-かきくけこ',
  sx: {},
};
