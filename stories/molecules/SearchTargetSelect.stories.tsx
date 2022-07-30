import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchTarget, SearchTargetSelect } from '../../components/molecules/SearchTargetSelect';

const componentMeta: ComponentMeta<typeof SearchTargetSelect> = {
  title: 'Molecules/SearchTargetSelect',
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
    onChange: {
      action: 'changed'
    }
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchTargetSelect> = (args) => (
  <SearchTargetSelect {...args} />
);

export const Select = Template.bind({});
Select.args = {
  target: SearchTarget.TAG,
};
