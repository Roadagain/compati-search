import { generateNewAutocompleteOptions } from '../lib/autocomplete';
import { filterNewShips } from '../lib/filter-ships';
import { AllSearchTargets, NewSearchTarget } from '../lib/search-target';
import { NewShip } from '../lib/ship';
import { SortOrder, sortShips } from '../lib/sort-ships';
import { State } from './state';

export const onLoadShipsData = (state: State, ships: NewShip[]): State => {
  const { search } = state;
  const { showAll, words } = search;
  const newAutocompleteOptions = generateNewAutocompleteOptions(ships, showAll);
  const results = filterNewShips(ships, words, showAll);
  return {
    ...state,
    isReady: true,
    ships,
    search: {
      ...search,
      info: {
        ...search.info,
        autocompleteOptions: newAutocompleteOptions,
      },
      words,
      results,
      page: 1,
    },
  };
};

export const onChangeSearchWords = (
  state: State,
  target: NewSearchTarget,
  newWords: string[]
): State => {
  const { ships, search } = state;
  const { showAll } = search;
  const words = {
    ...search.words,
    [target]: newWords,
  };
  const results = filterNewShips(ships, words, showAll);
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
  const results = filterNewShips(ships, words, showAll);
  const newAutocompleteOptions = generateNewAutocompleteOptions(ships, showAll);
  return {
    ...state,
    search: {
      ...search,
      info: {
        ...info,
        autocompleteOptions: newAutocompleteOptions,
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

export const onClickTag = (state: State, label: string): State => {
  const { ships, search } = state;
  const { words, showAll } = search;
  const { autocompleteOptions } = search.info;
  const tagCategories = AllSearchTargets.filter((target) =>
    autocompleteOptions[target].includes(label)
  );
  const newWords = {
    ...words,
    ...Object.fromEntries(
      tagCategories.map((target) => {
        return [target, [...words[target], label]];
      })
    ),
  };
  const results = filterNewShips(ships, newWords, showAll);
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
