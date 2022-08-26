import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchTargetSelect } from './SearchTargetSelect';
import { SearchTarget } from '../../lib/search-target';

const componentMeta: ComponentMeta<typeof SearchTargetSelect> = {
  title: 'Atoms/SearchTargetSelect',
  component: SearchTargetSelect,
  argTypes: {
    target: {
      options: [SearchTarget.TAG, SearchTarget.NAME],
      control: {
        type: 'radio',
        labels: {
          [SearchTarget.TAG]: 'タグ',
          [SearchTarget.NAME]: '名前',
        },
      },
    },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchTargetSelect> = (args) => (
  <SearchTargetSelect {...args} />
);

export const SelectTag = Template.bind({});
SelectTag.args = {
  target: SearchTarget.TAG,
  sx: {},
};

export const SelectName = Template.bind({});
SelectName.args = {
  target: SearchTarget.NAME,
  sx: {},
};
