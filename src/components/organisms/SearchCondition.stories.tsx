import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchCondition } from './SearchCondition';

const componentMeta: ComponentMeta<typeof SearchCondition> = {
  title: 'Organisms/SearchCondition',
  component: SearchCondition,
  argTypes: {
    character: { control: 'text' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchCondition> = (args) => (
  <SearchCondition {...args} />
);

export const Condition = Template.bind({});
Condition.args = {
  character: 'キャラクター',
  sx: {},
};
