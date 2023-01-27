import { Meta, StoryObj } from '@storybook/react';

import { SearchTypeAndWords } from './SearchTypeAndWords';

const meta: Meta<typeof SearchTypeAndWords> = {
  title: 'Molecules/SearchTypeandWords',
  component: SearchTypeAndWords,
  argTypes: {
    nameWords: { control: 'object' },
    tagWords: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchTypeAndWords>;

export const SearchByTag: Story = {
  args: {
    nameWords: [],
    tagWords: ['ハル'],
    sx: {},
  },
};
export const SearchByName: Story = {
  args: {
    nameWords: ['ナツ'],
    tagWords: [],
    sx: {},
  },
};
export const SearchByBoth: Story = {
  args: {
    nameWords: ['ナツ'],
    tagWords: ['きせつ'],
    sx: {},
  },
};
export const MultipleWords: Story = {
  args: {
    nameWords: [],
    tagWords: ['アキ', 'フユ'],
    sx: {},
  },
};
export const MinusWord: Story = {
  args: {
    nameWords: ['-梅雨'],
    tagWords: [],
    sx: {},
  },
};
