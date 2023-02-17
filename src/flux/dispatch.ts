import { generateAutocompleteOptions } from '../lib/autocomplete';
import { filterShips, SearchWords } from '../lib/filter-ships';
import {
  generateSearchTargets,
  getKeyOfSearchTarget,
  SearchTarget,
} from '../lib/search-target';
import { NewShip } from '../lib/ship';
import { ShipsData } from '../lib/ships-data';
import { SortOrder, sortShips } from '../lib/sort-ships';
import { InputedSearchWords, State } from './state';

const adjustToSearchWords = (words: InputedSearchWords): SearchWords => {
  const tagCategories = Object.keys(words).filter((key) => key !== 'name');
  return {
    name: words.name,
    tag: Array.from(
      new Set(tagCategories.flatMap((category) => words[category]))
    ),
  };
};

export const onLoadShipsData = (
  state: State,
  shipsData: ShipsData,
  newShips: NewShip[]
): State => {
  const { ships } = shipsData;
  const { search } = state;
  const { showAll } = search;
  const allTags = ships.flatMap(({ tags }) => tags);
  const searchTargets = generateSearchTargets(allTags);
  const autocompleteOptions = Object.fromEntries(
    searchTargets.map((target) => {
      const key = getKeyOfSearchTarget(target);
      return [key, generateAutocompleteOptions(ships, target, showAll)];
    })
  );
  const words: InputedSearchWords = Object.fromEntries(
    searchTargets.map((target) => {
      const key = getKeyOfSearchTarget(target);
      return [key, []];
    })
  );
  const results = filterShips(ships, adjustToSearchWords(words), showAll);
  return {
    ...state,
    isReady: true,
    ships,
    newShips,
    search: {
      ...search,
      info: {
        ...search.info,
        targets: searchTargets,
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
  const key = getKeyOfSearchTarget(target);
  const words = {
    ...search.words,
    [key]: newWords,
  };
  const results = filterShips(ships, adjustToSearchWords(words), showAll);
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
  const results = filterShips(ships, adjustToSearchWords(words), showAll);
  const searchTargets = info.targets;
  const autocompleteOptions = Object.fromEntries(
    searchTargets.map((target) => {
      const key = getKeyOfSearchTarget(target);
      return [key, generateAutocompleteOptions(ships, target, showAll)];
    })
  );
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

export const onClickTag = (state: State, label: string): State => {
  const { ships, search } = state;
  const { words, showAll } = search;
  const { autocompleteOptions } = search.info;
  const categories = Object.entries(autocompleteOptions)
    .filter(([key, options]) => key !== 'name' && options.includes(label))
    .map(([key]) => key);
  const overrideWords = Object.fromEntries(
    categories.map((category) => {
      return [category, Array.from(new Set([...words[category], label]))];
    })
  );
  const newWords = {
    ...words,
    ...overrideWords,
  };
  const results = filterShips(ships, adjustToSearchWords(newWords), showAll);
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
