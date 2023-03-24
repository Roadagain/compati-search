import { Meta, StoryObj } from '@storybook/react';

import { TagCheckBox } from './TagCheckBox';

const meta: Meta<typeof TagCheckBox> = {
  title: 'Molecules/TagCheckBox',
  component: TagCheckBox,
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof TagCheckBox>;

export const Checked: Story = {
  args: {
    label: 'チェックされている',
    checked: true,
    sx: {},
  },
};

export const Unchecked: Story = {
  args: {
    label: 'チェックされていない',
    checked: false,
    sx: {},
  },
};
