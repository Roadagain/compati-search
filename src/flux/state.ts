import { AutocompleteOptions } from '../lib/autocomplete';
import { SearchWords } from '../lib/filter-ships';
import { Ship } from '../lib/ship';
import { SortOrder } from '../lib/sort-ships';
import { Tag } from '../lib/tag';

type SearchInfoState = {
  autocompleteOptions: AutocompleteOptions;
};

type SearchState = {
  info: SearchInfoState;
  words: SearchWords;
  showAll: boolean;
  sortOrder: SortOrder;
  results: Ship[];
  page: number;
};

export type State = {
  isReady: boolean;
  ships: Ship[];
  tags: Tag[];
  search: SearchState;
};

export const initialState: State = {
  isReady: false,
  ships: [],
  tags: [],
  search: {
    info: {
      autocompleteOptions: {
        categories: [],
        types: [],
        equipments: [],
        abilities: [],
        speeds: [],
        ranges: [],
        names: [],
      },
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
    results: [],
    page: 1,
  },
};
