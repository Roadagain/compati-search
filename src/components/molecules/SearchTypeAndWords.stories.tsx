import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchType } from '../../lib/search-target';
import { SearchTypeAndWords } from './SearchTypeAndWords';

const componentMeta: ComponentMeta<typeof SearchTypeAndWords> = {
  title: 'Molecules/SearchTypeandWords',
  component: SearchTypeAndWords,
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
    words: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchTypeAndWords> = (args) => (
  <SearchTypeAndWords {...args} />
);

export const SearchByTag = Template.bind({});
SearchByTag.args = {
  type: SearchType.TAG,
  words: ['ハル'],
};

export const SearchByName = Template.bind({});
SearchByName.args = {
  type: SearchType.NAME,
  words: ['ナツ'],
  sx: {},
};

export const MultipleWords = Template.bind({});
MultipleWords.args = {
  type: SearchType.TAG,
  words: ['アキ', 'フユ'],
  sx: {},
};

export const MinusWord = Template.bind({});
MinusWord.args = {
  type: SearchType.TAG,
  words: ['-梅雨'],
  sx: {},
};
