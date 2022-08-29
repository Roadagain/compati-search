import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CategorizedTags } from './CategorizedTags';

const componentMeta: ComponentMeta<typeof CategorizedTags> = {
  title: 'Molecules/CategorizedTags',
  component: CategorizedTags,
  argTypes: {
    category: { control: 'text' },
    tags: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof CategorizedTags> = (args) => (
  <CategorizedTags {...args} />
);

export const Categorized = Template.bind({});
Categorized.args = {
  category: 'ニゴリエース',
  tags: [
    { category: 'ニゴリエース', label: 'カブトムシ' },
    { category: 'ニゴリエース', label: 'クワガタムシ' },
    { category: 'ニゴリエース', label: 'カマキリ' },
    { category: 'ニゴリエース', label: 'クモ' },
  ],
  sx: {},
};
