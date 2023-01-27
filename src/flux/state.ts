import { SearchTarget, SearchType } from '../lib/search-target';
import { SortOrder } from '../lib/sort-characters';
import { TaggedCharacter } from '../lib/tagged-character';

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
  results: TaggedCharacter[];
  page: number;
}

export interface State {
  isReady: boolean;
  characters: TaggedCharacter[];
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
