import { Meta, StoryObj } from '@storybook/react';

import { SearchConditionSummary } from './SearchConditionSummary';

const meta: Meta<typeof SearchConditionSummary> = {
  title: 'Organisms/SearchConditionSummary',
  component: SearchConditionSummary,
  argTypes: {
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchConditionSummary>;

export const Condition: Story = {
  args: {
    sx: {},
  },
};
