import { generateAutocompleteOptions } from '../lib/autocomplete';
import { filterShips } from '../lib/filter-ships';
import { SearchTarget } from '../lib/search-target';
import { Ship } from '../lib/ship';
import { SortOrder, sortShips } from '../lib/sort-ships';
import { TagCategory } from '../lib/tag-category';
import { State } from './state';

export const onLoadShipsData = (state: State, ships: Ship[]): State => {
  const { search } = state;
  const { showAll, words } = search;
  const autocompleteOptions = generateAutocompleteOptions(ships, showAll);
  const results = filterShips(ships, words, showAll);
  return {
    ...state,
    isReady: true,
    ships,
    search: {
      ...search,
      info: {
        ...search.info,
        autocompleteOptions,
      },
      words,
      results,
      page: 1,
    },
  };
};

export const onChangeSearchWords = (
  state: State,
  target: SearchTarget,
  newWords: string[]
): State => {
  const { ships, search } = state;
  const { showAll } = search;
  const words = {
    ...search.words,
    [target]: newWords,
  };
  const results = filterShips(ships, words, showAll);
  return {
    ...state,
    search: {
      ...search,
      words,
      results,
      page: 1,
    },
  };
};

export const onChangeShowAll = (state: State, showAll: boolean): State => {
  const { ships, search } = state;
  const { words, info } = search;
  const results = filterShips(ships, words, showAll);
  const autocompleteOptions = generateAutocompleteOptions(ships, showAll);
  return {
    ...state,
    search: {
      ...search,
      info: {
        ...info,
        autocompleteOptions,
      },
      showAll,
      results,
      page: 1,
    },
  };
};

export const onChangeSortOrder = (
  state: State,
  sortOrder: SortOrder
): State => {
  const ships = sortShips(state.ships, sortOrder);
  const results = sortShips(state.search.results, sortOrder);
  return {
    ...state,
    ships,
    search: {
      ...state.search,
      sortOrder,
      results,
    },
  };
};

export const onClickTag = (
  state: State,
  category: TagCategory,
  tag: string
): State => {
  const { ships, search } = state;
  const { words, showAll } = search;
  const newWords = {
    ...words,
    [category]: [...words[category], tag],
  };
  const results = filterShips(ships, newWords, showAll);
  return {
    ...state,
    search: {
      ...search,
      words: newWords,
      results,
      page: 1,
    },
  };
};

export const onShowNextPage = (state: State): State => {
  const { search } = state;
  return {
    ...state,
    search: {
      ...search,
      page: search.page + 1,
    },
  };
};
