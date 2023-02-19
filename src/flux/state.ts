import { AutocompleteOptions } from '../lib/autocomplete';
import { SearchWords } from '../lib/filter-ships';
import { Ship } from '../lib/ship';
import { SortOrder } from '../lib/sort-ships';

interface SearchInfoState {
  autocompleteOptions: AutocompleteOptions;
}

interface SearchState {
  info: SearchInfoState;
  words: SearchWords;
  showAll: boolean;
  sortOrder: SortOrder;
  results: Ship[];
  page: number;
}

export interface State {
  isReady: boolean;
  ships: Ship[];
  search: SearchState;
}

export const initialState: State = {
  isReady: false,
  ships: [],
  search: {
    info: {
      autocompleteOptions: {
        names: [],
        categories: [],
        types: [],
        speeds: [],
        ranges: [],
        equipments: [],
        abilities: [],
      },
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
    results: [],
    page: 1,
  },
};
