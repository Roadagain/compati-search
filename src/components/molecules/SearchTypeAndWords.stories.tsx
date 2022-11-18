import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchTypeAndWords } from './SearchTypeAndWords';

const componentMeta: ComponentMeta<typeof SearchTypeAndWords> = {
  title: 'Molecules/SearchTypeandWords',
  component: SearchTypeAndWords,
  argTypes: {
    nameWords: { control: 'object' },
    tagWords: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchTypeAndWords> = (args) => (
  <SearchTypeAndWords {...args} />
);

export const SearchByTag = Template.bind({});
SearchByTag.args = {
  nameWords: [],
  tagWords: ['ハル'],
  sx: {},
};

export const SearchByName = Template.bind({});
SearchByName.args = {
  nameWords: ['ナツ'],
  tagWords: [],
  sx: {},
};

export const SearchByBoth = Template.bind({});
SearchByBoth.args = {
  nameWords: ['ナツ'],
  tagWords: ['きせつ'],
  sx: {},
};

export const MultipleWords = Template.bind({});
MultipleWords.args = {
  nameWords: [],
  tagWords: ['アキ', 'フユ'],
  sx: {},
};

export const MinusWord = Template.bind({});
MinusWord.args = {
  nameWords: ['-梅雨'],
  tagWords: [],
  sx: {},
};
