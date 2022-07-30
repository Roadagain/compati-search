import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchInput } from '../../components/molecules/SearchInput';

const componentMeta: ComponentMeta<typeof SearchInput> = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  argTypes: {
    onSearch: {
      action: 'searched',
    },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

export const Search = Template.bind({});
