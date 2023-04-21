import { Meta, StoryObj } from '@storybook/react';

import { LabelledSwitch } from './LabeledSwitch';

const meta: Meta<typeof LabelledSwitch> = {
  title: 'Molecules/LabeledSwitch',
  component: LabelledSwitch,
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    color: { control: 'radio', options: ['primary', 'error'] },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof LabelledSwitch>;

export const Unchecked: Story = {
  args: {
    label: 'OFF',
    checked: false,
    sx: {},
  },
};

export const Checked: Story = {
  args: {
    label: 'ON',
    checked: true,
    sx: {},
  },
};

export const Error: Story = {
  args: {
    label: 'Error',
    checked: true,
    color: 'error',
    sx: {},
  },
};
