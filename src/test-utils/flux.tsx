import React, { useReducer } from 'react';

import { characters } from '../../ships.json';
import { FluxContext } from '../flux/context';
import { reducer } from '../flux/reducer';
import { InputedSearchWords, State } from '../flux/state';
import { generateAutocompleteOptions } from '../lib/autocomplete';
import {
  generateSearchTargets,
  getKeyOfSearchTarget,
} from '../lib/search-target';

const allTags = characters.flatMap(({ tags }) => tags);
const searchTargets = generateSearchTargets(allTags);
const autocompleteOptions = Object.fromEntries(
  searchTargets.map((target) => {
    const key = getKeyOfSearchTarget(target);
    return [key, generateAutocompleteOptions(characters, target, false)];
  })
);
const words: InputedSearchWords = Object.fromEntries(
  searchTargets.map((target) => {
    const key = getKeyOfSearchTarget(target);
    return [key, []];
  })
);

export const initialTestState: State = {
  isReady: true,
  characters,
  metadata: {
    character: 'テストキャラクター',
  },
  search: {
    info: {
      autocompleteOptions,
      targets: searchTargets,
    },
    words,
    showAll: false,
    results: characters.filter(({ showDefault }) => showDefault),
    page: 2,
  },
};

interface Props {
  children: React.ReactNode;
}

export const TestFluxProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialTestState);
  return (
    <FluxContext.Provider value={{ state, dispatch }}>
      {children}
    </FluxContext.Provider>
  );
};
