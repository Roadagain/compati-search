import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CharactersSearcher } from './CharactersSearcher';

const componentMeta: ComponentMeta<typeof CharactersSearcher> = {
  title: 'Organisms/CharactersSearcher',
  component: CharactersSearcher,
  argTypes: {
    charactersData: { control: 'object' },
    sx: { control: 'object' },
  },
};
export default componentMeta;

const Template: ComponentStory<typeof CharactersSearcher> = (args) => (
  <CharactersSearcher {...args} />
);

export const Search = Template.bind({});
Search.args = {
  charactersData: {
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
    ],
    metadata: {
      character: 'テストキャラクター',
    },
  },
  sx: {},
};
