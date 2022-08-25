import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchForm } from '../../components/molecules/SearchForm';
import { SearchTarget } from '../../lib/search-target';

const componentMeta: ComponentMeta<typeof SearchForm> = {
  title: 'Molecules/SearchForm',
  component: SearchForm,
  argTypes: {
    target: {
      options: [SearchTarget.TAG, SearchTarget.NAME],
      control: {
        type: 'radio',
        labels: {
          [SearchTarget.TAG]: 'タグ',
          [SearchTarget.NAME]: '名前',
        },
      },
    },
    texts: { control: 'object' },
    autocompleteOptions: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchForm> = (args) => (
  <SearchForm {...args} />
);

export const SearchByTag = Template.bind({});
SearchByTag.args = {
  target: SearchTarget.TAG,
  texts: [],
  autocompleteOptions: [
    { category: 'あ行', label: 'あいうえお' },
    { category: 'か行', label: 'かきくけこ' },
  ],
  sx: {},
};

export const SearchByName = Template.bind({});
SearchByName.args = {
  target: SearchTarget.NAME,
  texts: [],
  autocompleteOptions: [
    { category: 'さ行', label: 'さしすせそ' },
    { category: 'た行', label: 'たちつてと' },
  ],
  sx: {},
};

export const InputtedWords = Template.bind({});
InputtedWords.args = {
  target: SearchTarget.TAG,
  texts: ['あいうえお', 'なにぬねの'],
  autocompleteOptions: [
    { category: 'な行', label: 'なにぬねの' },
    { category: 'は行', label: 'はひふへほ' },
  ],
  sx: {},
};
