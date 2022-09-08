import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchForm } from './SearchForm';

const componentMeta: ComponentMeta<typeof SearchForm> = {
  title: 'Organisms/SearchForm',
  component: SearchForm,
  argTypes: {
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchForm> = (args) => (
  <SearchForm {...args} />
);

export const Search = Template.bind({});
Search.args = {
  sx: {},
};
