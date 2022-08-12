import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchForm } from '../../components/molecules/SearchForm';
import { SearchTarget } from '../../components/molecules/SearchTargetSelect';

const componentMeta: ComponentMeta<typeof SearchForm> = {
  title: 'Molecules/SearchForm',
  component: SearchForm,
  argTypes: {
    text: { control: 'text' },
    onChangeText: { action: 'changedText' },
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
    onChangeTarget: { action: 'changedTarget' },
    onSearch: {
      action: 'searched',
    },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchForm> = (args) => (
  <SearchForm {...args} />
);

export const Search = Template.bind({});
Search.args = {
  text: '',
  target: SearchTarget.TAG,
};
