import { Meta, StoryObj } from '@storybook/react';

import { FullSearchForm } from './FullSearchForm';

const meta: Meta<typeof FullSearchForm> = {
  title: 'Organisms/FullSearchForm',
  component: FullSearchForm,
  argTypes: {
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof FullSearchForm>;

export const Search: Story = {
  args: {
    sx: {},
  },
};
