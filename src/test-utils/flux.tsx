import React, { useReducer } from 'react';

import { characters } from '../../characters-data/ships.json';
import { FluxContext } from '../flux/context';
import { reducer } from '../flux/reducer';
import { State } from '../flux/state';
import { SearchType } from '../lib/search-target';

export const initialTestState: State = {
  isReady: true,
  characters,
  metadata: {
    character: 'テストキャラクター',
  },
  search: {
    target: { type: SearchType.TAG },
    words: ['あいうえお'],
    showAll: false,
    results: characters,
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
