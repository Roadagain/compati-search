import { Meta, StoryObj } from '@storybook/react';

import { AllTagCategories } from '../../lib/tag-category';
import { TagSelector } from './TagSelector';

const meta: Meta<typeof TagSelector> = {
  title: 'Molecules/TagSelector',
  component: TagSelector,
  argTypes: {
    category: { control: 'select', options: AllTagCategories },
    tags: { control: 'object' },
    selectedTags: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof TagSelector>;

export const Selector: Story = {
  args: {
    category: 'categories',
    tags: ['駆逐艦', '軽巡級', '重巡級'],
    selectedTags: [],
  },
};

export const Selected: Story = {
  args: {
    category: 'abilities',
    tags: ['特性A', '特性B', '特性C'],
    selectedTags: ['特性B', '特性C'],
  },
};

export const MinusChecked: Story = {
  args: {
    category: 'equipments',
    tags: ['装備A', '装備B', '装備C'],
    selectedTags: ['-装備A', '装備B'],
  },
};

export const TooManyTags: Story = {
  args: {
    category: 'equipments',
    tags: Array.from({ length: 16 }, (_, index) => `装備${index + 1}`),
    selectedTags: Array.from({ length: 8 }, (_, index) => `装備${index + 1}`),
  },
};
