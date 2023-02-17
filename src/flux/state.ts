import { SearchTarget, SearchType } from '../lib/search-target';
import { NewShip, Ship } from '../lib/ship';
import { SortOrder } from '../lib/sort-ships';

export type InputedSearchWords = Record<'name' | string, string[]>;
export type AutocompleteOptions = Record<'name' | string, string[]>;

interface SearchInfoState {
  autocompleteOptions: AutocompleteOptions;
  targets: SearchTarget[];
}

interface SearchState {
  info: SearchInfoState;
  words: InputedSearchWords;
  showAll: boolean;
  sortOrder: SortOrder;
  results: Ship[];
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
    },
    words: {
      name: [],
    },
    showAll: false,
    sortOrder: SortOrder.ID,
    results: [],
    page: 1,
  },
};
