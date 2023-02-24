import { Meta, StoryObj } from '@storybook/react';

import { AllTagCategories } from '../../lib/tag-category';
import { TagBadge } from './TagBadge';

const meta: Meta<typeof TagBadge> = {
  title: 'Atoms/TagBadge',
  component: TagBadge,
  argTypes: {
    category: { control: 'select', options: AllTagCategories },
    tag: { control: 'text' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof TagBadge>;

export const Badge: Story = {
  args: {
    category: 'categories',
    tag: 'タグ',
    sx: {},
  },
};
