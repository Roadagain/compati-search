import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchResults } from './SearchResults';
import { SearchTarget } from '../../lib/search-target';

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
