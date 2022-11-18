import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchType } from '../../lib/search-target';
import { AutocompleteForm } from './AutocompleteForm';

const componentMeta: ComponentMeta<typeof AutocompleteForm> = {
  title: 'Molecules/AutocompleteForm',
  component: AutocompleteForm,
  argTypes: {
    target: { control: 'object' },
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
  target: { type: SearchType.TAG, category: '五十音' },
  words: [],
  autocompleteOptions: ['あいうえお', 'かきくけこ'],
  sx: {},
};

export const SearchByName = Template.bind({});
SearchByName.args = {
  target: { type: SearchType.NAME },
  words: [],
  autocompleteOptions: ['さしすせそ', 'たちつてと'],
  sx: {},
};

export const InputtedWords = Template.bind({});
InputtedWords.args = {
  target: { type: SearchType.TAG, category: '五十音' },
  words: ['あいうえお', 'なにぬねの', '-はひふへほ'],
  autocompleteOptions: ['なにぬねの', 'はひふへほ', 'まみむめも'],
  sx: {},
};
