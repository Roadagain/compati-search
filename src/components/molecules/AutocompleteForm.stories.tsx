import { Meta, StoryObj } from '@storybook/react';

import { SearchType } from '../../lib/search-target';
import { AutocompleteForm } from './AutocompleteForm';

const meta: Meta<typeof AutocompleteForm> = {
  title: 'Molecules/AutocompleteForm',
  component: AutocompleteForm,
  argTypes: {
    target: { control: 'object' },
    words: { control: 'object' },
    autocompleteOptions: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof AutocompleteForm>;

export const SearchByTag: Story = {
  args: {
    target: { type: SearchType.TAG, category: '五十音' },
    words: [],
    autocompleteOptions: ['あいうえお', 'かきくけこ'],
    sx: {},
  },
};
export const SearchByName: Story = {
  args: {
    target: { type: SearchType.NAME },
    words: [],
    autocompleteOptions: ['さしすせそ', 'たちつてと'],
    sx: {},
  },
};
export const InputtedWords: Story = {
  args: {
    target: { type: SearchType.TAG, category: '五十音' },
    words: ['あいうえお', 'なにぬねの', '-はひふへほ'],
    autocompleteOptions: ['なにぬねの', 'はひふへほ', 'まみむめも'],
    sx: {},
  },
};
