import { SearchWords } from '../lib/filter-ships';
import { Ship } from '../lib/ship';
import { SortOrder } from '../lib/sort-ships';
import { Tag } from '../lib/tag';

type SearchState = {
  nameAutocompleteOptions: string[];
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
    nameAutocompleteOptions: [],
    words: {
      categories: [],
      types: [],
      equipments: [],
      abilities: [],
      speeds: [],
      ranges: [],
      countries: [],
      names: [],
    },
    showAll: false,
    sortOrder: SortOrder.ID,
    results: [],
    page: 1,
  },
};
