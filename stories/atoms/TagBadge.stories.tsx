import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TagBadge } from '../../components/atoms/TagBadge';

const componentMeta: ComponentMeta<typeof TagBadge> = {
  title: 'Atoms/TagBadge',
  component: TagBadge,
  argTypes: {
    children: { control: 'text' },
    onClick: {
      action: 'clicked',
    },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof TagBadge> = (args) => (
  <TagBadge {...args} />
);

export const Badge = Template.bind({});
Badge.args = {
  children: 'タグ',
};
