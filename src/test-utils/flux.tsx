import React, { useReducer } from 'react';

import ships from '../../new-ships.json';
import { FluxContext } from '../flux/context';
import { reducer } from '../flux/reducer';
import { State } from '../flux/state';
import { generateNewAutocompleteOptions } from '../lib/autocomplete';
import { SortOrder } from '../lib/sort-ships';

export const initialTestState: State = {
  isReady: true,
  ships,
  search: {
    info: {
      autocompleteOptions: generateNewAutocompleteOptions(ships, false),
    },
    words: {
      names: [],
      categories: [],
      types: [],
      speeds: [],
      ranges: [],
      equipments: [],
      abilities: [],
    },
    showAll: false,
    sortOrder: SortOrder.ID,
    results: ships.filter(({ showDefault }) => showDefault),
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
