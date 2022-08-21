import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchForm } from '../../components/molecules/SearchForm';
import { SearchTarget } from '../../lib/search-target';

const componentMeta: ComponentMeta<typeof SearchForm> = {
  title: 'Molecules/SearchForm',
  component: SearchForm,
  argTypes: {
    texts: { control: 'object' },
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
    autocompleteOptions: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchForm> = (args) => (
  <SearchForm {...args} />
);

export const Search = Template.bind({});
Search.args = {
  texts: [],
  target: SearchTarget.TAG,
  autocompleteOptions: ['あいうえお', 'かきくけこ'],
  sx: {},
};
