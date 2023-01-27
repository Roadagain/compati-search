import { Meta, StoryObj } from '@storybook/react';

import { SearchResults } from './SearchResults';

const meta: Meta<typeof SearchResults> = {
  title: 'Organisms/SearchResult',
  component: SearchResults,
  argTypes: {
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchResults>;

export const Results: Story = {
  args: {
    sx: {},
  },
};
