import { Meta, StoryObj } from '@storybook/react';

import { ShowAllModelsSwitch } from './ShowAllModelsSwitch';

const meta: Meta<typeof ShowAllModelsSwitch> = {
  title: 'Molecules/ShowAllModelsSwitch',
  component: ShowAllModelsSwitch,
  argTypes: {
    checked: { control: 'boolean' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof ShowAllModelsSwitch>;

export const Unchecked: Story = {
  args: {
    checked: false,
    sx: {},
  },
};
export const Checked: Story = {
  args: {
    checked: true,
    sx: {},
  },
};
