import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ShowAllModelsSwitch } from './ShowAllModelsSwitch';

const componentMeta: ComponentMeta<typeof ShowAllModelsSwitch> = {
  title: 'Molecules/ShowAllModelsSwitch',
  component: ShowAllModelsSwitch,
  argTypes: {
    checked: { control: 'boolean' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof ShowAllModelsSwitch> = (args) => (
  <ShowAllModelsSwitch {...args} />
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
