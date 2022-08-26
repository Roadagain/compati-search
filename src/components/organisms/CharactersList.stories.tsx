import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CharactersList } from './CharactersList';

const componentMeta: ComponentMeta<typeof CharactersList> = {
  title: 'Organisms/CharactersList',
  component: CharactersList,
  argTypes: {
    characters: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof CharactersList> = (args) => (
  <CharactersList {...args} />
);

export const List = Template.bind({});
List.args = {
  characters: [
    {
      name: 'Alpha',
      tags: [
        { category: 'あ行', label: 'あいうえお' },
        { category: 'か行', label: 'かきくけこ' },
      ],
      showDefault: true,
    },
    {
      name: 'Beta',
      tags: [{ category: 'か行', label: 'かきくけこ' }],
      showDefault: true,
    },
    {
      name: 'Gamma',
      tags: [{ category: 'さ行', label: 'さしすせそ' }],
      showDefault: false,
    },
    {
      name: 'Delta',
      tags: [{ category: 'さ行', label: 'さしすせそ' }, {category:'た行', label:'たちつてと'}],
      showDefault: false,
    },
  ],
  sx: {},
};
