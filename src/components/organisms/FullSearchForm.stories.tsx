import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { FullSearchForm } from './FullSearchForm';

const componentMeta: ComponentMeta<typeof FullSearchForm> = {
  title: 'Organisms/FullSearchForm',
  component: FullSearchForm,
  argTypes: {
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof FullSearchForm> = (args) => (
  <FullSearchForm {...args} />
);

export const Search = Template.bind({});
Search.args = {
  sx: {},
};
