import React, { useReducer } from 'react';

import ships from '../../ships.json';
import tags from '../../tags.json';
import { FluxContext } from '../flux/context';
import { reducer } from '../flux/reducer';
import { State } from '../flux/state';
import { generateAutocompleteOptions } from '../lib/autocomplete';
import { SortOrder } from '../lib/sort-ships';

export const initialTestState: State = {
  isReady: true,
  ships,
  tags,
  search: {
    info: {
      autocompleteOptions: generateAutocompleteOptions(ships, false),
    },
    words: {
      categories: [],
      types: [],
      equipments: [],
      abilities: [],
      speeds: [],
      ranges: [],
      names: [],
    },
    showAll: false,
    sortOrder: SortOrder.ID,
    results: ships.filter(({ showDefault }) => showDefault),
    page: 2,
  },
};

type Props = {
  children: React.ReactNode;
};

export const TestFluxProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialTestState);
  return (
    <FluxContext.Provider value={{ state, dispatch }}>
      {children}
    </FluxContext.Provider>
  );
};
