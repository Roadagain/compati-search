import { Meta, StoryObj } from '@storybook/react';

import { TagBadge } from './TagBadge';

const meta: Meta<typeof TagBadge> = {
  title: 'Atoms/TagBadge',
  component: TagBadge,
  argTypes: {
    children: { control: 'text' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof TagBadge>;

export const Badge: Story = {
  args: {
    children: 'タグ',
    sx: {},
  },
};
