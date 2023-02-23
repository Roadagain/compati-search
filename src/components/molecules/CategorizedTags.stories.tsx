import { Meta, StoryObj } from '@storybook/react';

import { CategorizedTags } from './CategorizedTags';

const meta: Meta<typeof CategorizedTags> = {
  title: 'Molecules/CategorizedTags',
  component: CategorizedTags,
  argTypes: {
    label: { control: 'text' },
    tags: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof CategorizedTags>;

export const Categorized: Story = {
  args: {
    label: 'あいう',
    tags: ['タグ1', 'タグ2', 'タグ3'],
    sx: {},
  },
};
