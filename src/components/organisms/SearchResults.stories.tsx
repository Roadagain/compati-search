import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchResults } from './SearchResults';

const componentMeta: ComponentMeta<typeof SearchResults> = {
  title: 'Organisms/SearchResult',
  component: SearchResults,
  argTypes: {
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchResults> = (args) => (
  <SearchResults {...args} />
);

export const Results = Template.bind({});
Results.args = {
  sx: {},
};
