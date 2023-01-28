import { SearchTarget, SearchType } from '../lib/search-target';
import { Ship } from '../lib/ship';
import { SortOrder } from '../lib/sort-characters';

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
  characters: Ship[];
  search: SearchState;
}

export const initialState: State = {
  isReady: false,
  characters: [],
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
