import { Meta, StoryObj } from '@storybook/react';

import { SortOrder } from '../../lib/sort-characters';
import { SortOrderSelector } from './SortOrderSelector';

const meta: Meta<typeof SortOrderSelector> = {
  title: 'Molecules/SortOrderSelector',
  component: SortOrderSelector,
  argTypes: {
    value: {
      options: Object.keys(SortOrder).filter((key) => isNaN(Number(key))),
      mapping: SortOrder,
      control: 'radio',
    },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof SortOrderSelector>;

export const Selector: Story = {
  args: {
    value: SortOrder.ID,
    sx: {},
  },
};
