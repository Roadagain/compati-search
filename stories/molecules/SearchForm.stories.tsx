import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchForm, SearchTarget } from '../../components/molecules/SearchForm';

const componentMeta: ComponentMeta<typeof SearchForm> = {
  title: 'Molecules/SearchForm',
  component: SearchForm,
  argTypes: {
    onSearch: {
      action: 'searched',
    },
    target: {
      options: [SearchTarget.TAG, SearchTarget.NAME],
      control: {
        type: 'radio',
        labels: {
          [SearchTarget.TAG]: 'タグ',
          [SearchTarget.NAME]: 'キャラクター名',
        }
      }
    }
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchForm> = (args) => (
  <SearchForm {...args} />
);

export const Search = Template.bind({});
Search.args = {
  target: SearchTarget.TAG,
}
