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
    tags: ['駆逐艦', '軽巡級', '重巡級'].map((label) => ({
      label,
      category: 'categories',
    })),
    selectedTags: [],
  },
};

export const Selected: Story = {
  args: {
    category: 'abilities',
    tags: ['特性A', '特性B', '特性C'].map((label) => ({
      label,
      category: 'abilities',
    })),
    selectedTags: ['特性B', '特性C'],
  },
};

export const MinusChecked: Story = {
  args: {
    category: 'equipments',
    tags: ['装備A', '装備B', '装備C'].map((label) => ({
      label,
      category: 'equipments',
    })),
    selectedTags: ['-装備A', '装備B'],
  },
};

export const TooManyTags: Story = {
  args: {
    category: 'equipments',
    tags: Array.from({ length: 16 }, (_, index) => ({
      label: `装備${index + 1}`,
      category: 'equipments',
    })),
    selectedTags: Array.from({ length: 8 }, (_, index) => `装備${index + 1}`),
  },
};

export const SubCategorized: Story = {
  args: {
    category: 'equipments',
    tags: [
      { label: '装備A', category: 'equipments', subCategory: 'サブカテゴリA' },
      { label: '装備B', category: 'equipments', subCategory: 'サブカテゴリA' },
      { label: '装備C', category: 'equipments', subCategory: 'サブカテゴリB' },
      { label: '装備D', category: 'equipments', subCategory: 'サブカテゴリB' },
    ],
    selectedTags: ['装備A', '装備C'],
  },
};
