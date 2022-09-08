import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchTarget } from '../../lib/search-target';
import { AutocompleteForm } from './AutocompleteForm';

const componentMeta: ComponentMeta<typeof AutocompleteForm> = {
  title: 'Molecules/AutocompleteForm',
  component: AutocompleteForm,
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
    words: { control: 'object' },
    autocompleteOptions: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof AutocompleteForm> = (args) => (
  <AutocompleteForm {...args} />
);

export const SearchByTag = Template.bind({});
SearchByTag.args = {
  target: SearchTarget.TAG,
  words: [],
  autocompleteOptions: [
    { category: 'あ行', label: 'あいうえお' },
    { category: 'か行', label: 'かきくけこ' },
  ],
  sx: {},
};

export const SearchByName = Template.bind({});
SearchByName.args = {
  target: SearchTarget.NAME,
  words: [],
  autocompleteOptions: [{ label: 'さしすせそ' }, { label: 'たちつてと' }],
  sx: {},
};

export const InputtedWords = Template.bind({});
InputtedWords.args = {
  target: SearchTarget.TAG,
  words: ['あいうえお', 'なにぬねの', '-はひふへほ'],
  autocompleteOptions: [
    { category: 'な行', label: 'なにぬねの' },
    { category: 'は行', label: 'はひふへほ' },
    { category: 'ま行', label: 'まみむめも' },
  ],
  sx: {},
};
