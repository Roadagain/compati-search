import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchType } from '../../lib/search-target';
import { SearchTargetSelect } from './SearchTargetSelect';

const componentMeta: ComponentMeta<typeof SearchTargetSelect> = {
  title: 'Molecules/SearchTargetSelect',
  component: SearchTargetSelect,
  argTypes: {
    value: {
      control: 'object',
    },
    targets: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchTargetSelect> = (args) => (
  <SearchTargetSelect {...args} />
);

export const TargetSelect = Template.bind({});
TargetSelect.args = {
  value: { type: SearchType.NAME },
  targets: [
    { type: SearchType.NAME },
    { type: SearchType.TAG, category: '艦種カテゴリ' },
    { type: SearchType.TAG, category: '速力' },
    { type: SearchType.TAG, category: '装備' },
  ],
};
