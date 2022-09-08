import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchTarget } from '../../lib/search-target';
import { SearchTargetAndWords } from './SearchTargetAndWords';

const componentMeta: ComponentMeta<typeof SearchTargetAndWords> = {
  title: 'Molecules/SearchTargetandWords',
  component: SearchTargetAndWords,
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
    words: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchTargetAndWords> = (args) => (
  <SearchTargetAndWords {...args} />
);

export const SearchByTag = Template.bind({});
SearchByTag.args = {
  target: SearchTarget.TAG,
  words: ['ハル'],
};

export const SearchByName = Template.bind({});
SearchByName.args = {
  target: SearchTarget.NAME,
  words: ['ナツ'],
  sx: {},
};

export const MultipleWords = Template.bind({});
MultipleWords.args = {
  target: SearchTarget.TAG,
  words: ['アキ', 'フユ'],
  sx: {},
};

export const MinusWord = Template.bind({});
MinusWord.args = {
  target: SearchTarget.TAG,
  words: ['-梅雨'],
  sx: {},
};
