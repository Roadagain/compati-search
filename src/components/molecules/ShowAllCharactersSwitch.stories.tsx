import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ShowAllCharactersSwitch } from './ShowAllCharactersSwitch';

const componentMeta: ComponentMeta<typeof ShowAllCharactersSwitch> = {
  title: 'Molecules/ShowAllCharactersSwitch',
  component: ShowAllCharactersSwitch,
  argTypes: {
    checked: { control: 'boolean' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof ShowAllCharactersSwitch> = (args) => (
  <ShowAllCharactersSwitch {...args} />
);

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
  sx: {},
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  sx: {},
};
