import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchTargetLabel } from './SearchTargetLabel';

const componentMeta: ComponentMeta<typeof SearchTargetLabel> = {
  title: 'Atoms/SearchTargetLabel',
  component: SearchTargetLabel,
  argTypes: {
    label: { control: 'text' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchTargetLabel> = (args) => (
  <SearchTargetLabel {...args} />
);

export const Label = Template.bind({});
Label.args = {
  label: '名前',
  sx: {},
};
