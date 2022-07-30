import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchCondition } from '../../components/molecules/SearchCondition';
import { SearchTarget } from '../../components/molecules/SearchTargetSelect';

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
    text: { control: 'text' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchCondition> = (args) => (
  <SearchCondition {...args} />
);

export const Condition = Template.bind({});
Condition.args = {
  target: SearchTarget.TAG,
  text: 'あいうえお',
};
