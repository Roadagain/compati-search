import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CharacterName } from '../../components/atoms/CharacterName';

const componentMeta: ComponentMeta<typeof CharacterName> = {
  title: 'Atoms/CharacterName',
  component: CharacterName,
  argTypes: {
    children: { control: 'text' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof CharacterName> = (args) => (
  <CharacterName {...args} />
);

export const Name = Template.bind({});
Name.args = {
  children: 'なまえ',
};
