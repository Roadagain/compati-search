import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchCondition } from '../../components/molecules/SearchCondition';
import { SearchTarget } from '../../lib/search-target';

const componentMeta: ComponentMeta<typeof SearchCondition> = {
  title: 'Molecules/SearchCondition',
  component: SearchCondition,
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
    texts: { control: 'object' },
    showAll: { control: 'boolean' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchCondition> = (args) => (
  <SearchCondition {...args} />
);

export const SearchByTag = Template.bind({});
SearchByTag.args = {
  target: SearchTarget.TAG,
  texts: ['あいうえお'],
  showAll: false,
  sx: {},
};

export const SearchByName = Template.bind({});
SearchByName.args = {
  target: SearchTarget.NAME,
  texts: ['かきくけこ'],
  showAll: false,
  sx: {},
};

export const ShowAll = Template.bind({});
ShowAll.args = {
  target: SearchTarget.TAG,
  texts: ['さしすせそ'],
  showAll: true,
  sx: {},
};

export const NotSearched = Template.bind({});
NotSearched.args = {
  target: SearchTarget.TAG,
  texts: [],
  showAll: false,
  sx: {},
};
