import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CharactersSearcher } from '../../components/organisms/CharactersSearcher';

const componentMeta: ComponentMeta<typeof CharactersSearcher> = {
  title: 'Organisms/CharactersSearcher',
  component: CharactersSearcher,
  argTypes: {
    characters: { control: 'object' }
  },
};
export default componentMeta;

const Template: ComponentStory<typeof CharactersSearcher> = (args) => (
  <CharactersSearcher {...args} />
);

export const Search = Template.bind({});
Search.args = {
  characters: [
    {
      name: 'Alpha',
      tags: new Set(['あいうえお', 'かきくけこ'])
    },
    {
      name: 'Beta',
      tags: new Set(['かきくけこ'])
    },
    {
      name: 'Gamma',
      tags: new Set(['さしすせそ'])
    }
  ]
}
