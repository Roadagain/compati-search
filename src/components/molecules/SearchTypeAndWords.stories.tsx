import { Meta, StoryObj } from '@storybook/react';

import { SearchTypeAndWords } from './SearchTypeAndWords';

const meta: Meta<typeof SearchTypeAndWords> = {
  title: 'Molecules/SearchTypeandWords',
  component: SearchTypeAndWords,
  argTypes: {
    tagWords: { control: 'object' },
    nameWords: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchTypeAndWords>;

export const SearchByTag: Story = {
  args: {
    tagWords: ['ハル'],
    nameWords: [],
    sx: {},
  },
};
export const SearchByName: Story = {
  args: {
    tagWords: [],
    nameWords: ['ナツ'],
    sx: {},
  },
};
export const SearchByBoth: Story = {
  args: {
    tagWords: ['きせつ'],
    nameWords: ['ナツ'],
    sx: {},
  },
};
export const MultipleWords: Story = {
  args: {
    tagWords: ['アキ', 'フユ'],
    nameWords: [],
    sx: {},
  },
};
export const MinusWord: Story = {
  args: {
    tagWords: [],
    nameWords: ['-梅雨'],
    sx: {},
  },
};
