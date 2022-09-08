import React, { useReducer } from 'react';

import { characters } from '../../sample/characters-data/sample.json';
import { FluxContext } from '../flux/context';
import { reducer } from '../flux/reducer';
import { initialState, State } from '../flux/state';
import { SearchTarget } from '../lib/search-target';

export const initialTestState: State = {
  ...initialState,
  isReady: true,
  characters,
  metadata: {
    character: 'テストキャラクター',
  },
  search: {
    ...initialState.search,
    target: SearchTarget.TAG,
    words: ['あいうえお'],
    showAll: false,
    results: characters,
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
