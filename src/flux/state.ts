import { NewAutocompleteOptions } from '../lib/autocomplete';
import { NewSearchWords } from '../lib/filter-ships';
import { SearchTarget, SearchType } from '../lib/search-target';
import { NewShip, Ship } from '../lib/ship';
import { SortOrder } from '../lib/sort-ships';

export type InputedSearchWords = Record<'name' | string, string[]>;
export type AutocompleteOptions = Record<'name' | string, string[]>;

interface SearchInfoState {
  autocompleteOptions: AutocompleteOptions;
  newAutocompleteOptions: NewAutocompleteOptions;
  targets: SearchTarget[];
}

interface SearchState {
  info: SearchInfoState;
  words: InputedSearchWords;
  newWords: NewSearchWords;
  showAll: boolean;
  sortOrder: SortOrder;
  results: Ship[];
  newResults: NewShip[];
  page: number;
}

export interface State {
  isReady: boolean;
  ships: Ship[];
  newShips: NewShip[];
  search: SearchState;
}

export const initialState: State = {
  isReady: false,
  ships: [],
  newShips: [],
  search: {
    info: {
      targets: [{ type: SearchType.NAME }],
      autocompleteOptions: {},
      newAutocompleteOptions: {
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
      name: [],
    },
    newWords: {
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
    newResults: [],
    page: 1,
  },
};
