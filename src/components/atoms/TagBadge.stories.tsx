import { ComponentMeta,ComponentStory } from '@storybook/react';
import React from 'react';

import { TagBadge } from './TagBadge';

const componentMeta: ComponentMeta<typeof TagBadge> = {
  title: 'Atoms/TagBadge',
  component: TagBadge,
  argTypes: {
    children: { control: 'text' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof TagBadge> = (args) => (
  <TagBadge {...args} />
);

export const Badge = Template.bind({});
Badge.args = {
  children: 'タグ',
  sx: {},
};
