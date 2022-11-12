import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchConditionSummary } from './SearchConditionSummary';

const componentMeta: ComponentMeta<typeof SearchConditionSummary> = {
  title: 'Organisms/SearchConditionSummary',
  component: SearchConditionSummary,
  argTypes: {
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchConditionSummary> = (args) => (
  <SearchConditionSummary {...args} />
);

export const Condition = Template.bind({});
Condition.args = {
  sx: {},
};
