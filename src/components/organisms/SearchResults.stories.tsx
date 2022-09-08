import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchTarget } from '../../lib/search-target';
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
  target: SearchTarget.TAG,
  words: [],
  showAll: false,
  sx: {},
};
