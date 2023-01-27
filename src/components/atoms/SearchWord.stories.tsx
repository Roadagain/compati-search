import { Meta, StoryObj } from '@storybook/react';

import { SearchWord } from './SearchWord';

const meta: Meta<typeof SearchWord> = {
  title: 'Atoms/SearchWord',
  component: SearchWord,
  argTypes: {
    word: { control: 'text' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchWord>;

export const PlusWord: Story = {
  args: {
    word: 'あいうえお',
    sx: {},
  },
};
export const MinusWord: Story = {
  args: {
    word: '-かきくけこ',
    sx: {},
  },
};
