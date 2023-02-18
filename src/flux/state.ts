import { NewAutocompleteOptions } from '../lib/autocomplete';
import { NewSearchWords } from '../lib/filter-ships';
import { NewShip } from '../lib/ship';
import { SortOrder } from '../lib/sort-ships';

export type InputedSearchWords = Record<'name' | string, string[]>;
export type AutocompleteOptions = Record<'name' | string, string[]>;

interface SearchInfoState {
  autocompleteOptions: NewAutocompleteOptions;
}

interface SearchState {
  info: SearchInfoState;
  words: NewSearchWords;
  showAll: boolean;
  sortOrder: SortOrder;
  results: NewShip[];
  page: number;
}

export interface State {
  isReady: boolean;
  ships: NewShip[];
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
