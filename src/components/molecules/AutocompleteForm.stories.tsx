import { Meta, StoryObj } from '@storybook/react';

import { AllSearchTargets } from '../../lib/search-target';
import { AutocompleteForm } from './AutocompleteForm';

const meta: Meta<typeof AutocompleteForm> = {
  title: 'Molecules/AutocompleteForm',
  component: AutocompleteForm,
  argTypes: {
    target: { control: 'select', options: AllSearchTargets },
    words: { control: 'object' },
    autocompleteOptions: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof AutocompleteForm>;

export const SearchByTag: Story = {
  args: {
    target: 'categories',
    words: [],
    autocompleteOptions: ['あいうえお', 'かきくけこ'],
    sx: {},
  },
};
export const SearchByName: Story = {
  args: {
    target: 'names',
    words: [],
    autocompleteOptions: ['さしすせそ', 'たちつてと'],
    sx: {},
  },
};
export const InputtedWords: Story = {
  args: {
    target: 'abilities',
    words: ['あいうえお', 'なにぬねの', '-はひふへほ'],
    autocompleteOptions: ['なにぬねの', 'はひふへほ', 'まみむめも'],
    sx: {},
  },
};
