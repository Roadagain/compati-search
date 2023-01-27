import { Meta, StoryObj } from '@storybook/react';

import { SearchTargetLabel } from './SearchTargetLabel';

const meta: Meta<typeof SearchTargetLabel> = {
  title: 'Atoms/SearchTargetLabel',
  component: SearchTargetLabel,
  argTypes: {
    label: { control: 'text' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchTargetLabel>;

export const Label: Story = {
  args: {
    label: '名前',
    sx: {},
  },
};
