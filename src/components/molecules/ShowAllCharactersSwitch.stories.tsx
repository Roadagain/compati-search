import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ShowAllCharactersSwitch } from './ShowAllCharactersSwitch';

const componentMeta: ComponentMeta<typeof ShowAllCharactersSwitch> = {
  title: 'Molecules/ShowAllCharactersSwitch',
  component: ShowAllCharactersSwitch,
  argTypes: {
    checked: { control: 'boolean' },
    character: { control: 'text' },
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
  character: 'キャラクター',
  sx: {},
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  character: 'キャラクター',
  sx: {},
};

export const Character = Template.bind({});
Character.args = {
  checked: false,
  character: 'きゃらくたあ',
  sx: {},
};
