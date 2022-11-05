import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchType } from '../../lib/search-target';
import { SearchTypeSelect } from './SearchTypeSelect';

const componentMeta: ComponentMeta<typeof SearchTypeSelect> = {
  title: 'Atoms/SearchTypeSelect',
  component: SearchTypeSelect,
  argTypes: {
    type: {
      options: [SearchType.TAG, SearchType.NAME],
      control: {
        type: 'radio',
        labels: {
          [SearchType.TAG]: 'タグ',
          [SearchType.NAME]: '名前',
        },
      },
    },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchTypeSelect> = (args) => (
  <SearchTypeSelect {...args} />
);

export const SelectTag = Template.bind({});
SelectTag.args = {
  type: SearchType.TAG,
  sx: {},
};

export const SelectName = Template.bind({});
SelectName.args = {
  type: SearchType.NAME,
  sx: {},
};
