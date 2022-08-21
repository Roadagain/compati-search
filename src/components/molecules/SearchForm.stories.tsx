import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchForm } from '../../components/molecules/SearchForm';
import { SearchTarget } from '../../lib/search-target';

const componentMeta: ComponentMeta<typeof SearchForm> = {
  title: 'Molecules/SearchForm',
  component: SearchForm,
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
  target: SearchTarget.TAG,
  texts: [],
  autocompleteOptions: ['あいうえお', 'かきくけこ'],
  sx: {},
};
