import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchType } from '../../lib/search-target';
import { SimpleSearchForm } from './SimpleSearchForm';

const componentMeta: ComponentMeta<typeof SimpleSearchForm> = {
  title: 'Molecules/SimpleSearchForm',
  component: SimpleSearchForm,
  argTypes: {
    target: { control: 'object' },
    autocompleteOptions: { control: 'object' },
    words: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SimpleSearchForm> = (args) => (
  <SimpleSearchForm {...args} />
);

export const SearchByName = Template.bind({});
SearchByName.args = {
  target: { type: SearchType.NAME },
  autocompleteOptions: ['あいうえお', 'かきくけこ', 'さしすせそ'],
  words: [],
  sx: {},
};

export const SearchByTagCategory = Template.bind({});
SearchByTagCategory.args = {
  target: { type: SearchType.TAG, category: '頭文字' },
  autocompleteOptions: ['ABCDE', 'FGHIJ', 'KLMNO'],
  words: [],
  sx: {},
};

export const InputtedWords = Template.bind({});
InputtedWords.args = {
  target: { type: SearchType.TAG, category: '頭文字' },
  autocompleteOptions: ['ABCDE', 'FGHIJ', 'KLMNO'],
  words: ['ABCDE'],
  sx: {},
};
