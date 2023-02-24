import { Meta, StoryObj } from '@storybook/react';

import { AllTagCategories } from '../../lib/tag-category';
import { CategorizedTags } from './CategorizedTags';

const meta: Meta<typeof CategorizedTags> = {
  title: 'Molecules/CategorizedTags',
  component: CategorizedTags,
  argTypes: {
    category: { control: 'select', options: AllTagCategories },
    tags: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof CategorizedTags>;

export const Categorized: Story = {
  args: {
    category: 'equipments',
    tags: ['タグ1', 'タグ2', 'タグ3'],
    sx: {},
  },
};
