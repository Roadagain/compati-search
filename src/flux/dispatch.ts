import {
  generateAutocompleteOptions,
  generateNewAutocompleteOptions,
} from '../lib/autocomplete';
import { filterNewShips, filterShips, SearchWords } from '../lib/filter-ships';
import {
  generateSearchTargets,
  getKeyOfSearchTarget,
  NewSearchTarget,
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
  const { showAll, newWords } = search;
  const allTags = ships.flatMap(({ tags }) => tags);
  const searchTargets = generateSearchTargets(allTags);
  const autocompleteOptions = Object.fromEntries(
    searchTargets.map((target) => {
      const key = getKeyOfSearchTarget(target);
      return [key, generateAutocompleteOptions(ships, target, showAll)];
    })
  );
  const newAutocompleteOptions = generateNewAutocompleteOptions(
    newShips,
    showAll
  );
  const words: InputedSearchWords = Object.fromEntries(
    searchTargets.map((target) => {
      const key = getKeyOfSearchTarget(target);
      return [key, []];
    })
  );
  const results = filterShips(ships, adjustToSearchWords(words), showAll);
  const newResults = filterNewShips(newShips, newWords, showAll);
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
        newAutocompleteOptions,
      },
      words,
      results,
      newResults,
      page: 1,
    },
  };
};

export const onChangeSearchWords = (
  state: State,
  target: SearchTarget,
  newWords: string[],
  newTarget: NewSearchTarget
): State => {
  const { ships, newShips, search } = state;
  const { showAll } = search;
  const key = getKeyOfSearchTarget(target);
  const words = {
    ...search.words,
    [key]: newWords,
  };
  const results = filterShips(ships, adjustToSearchWords(words), showAll);
  const newNewWords = {
    ...search.newWords,
    [newTarget]: newWords,
  };
  const newResults = filterNewShips(newShips, newNewWords, showAll);
  return {
    ...state,
    search: {
      ...search,
      words,
      newWords: newNewWords,
      results,
      newResults,
      page: 1,
    },
  };
};

export const onChangeShowAll = (state: State, showAll: boolean): State => {
  const { ships, newShips, search } = state;
  const { words, newWords, info } = search;
  const results = filterShips(ships, adjustToSearchWords(words), showAll);
  const newResults = filterNewShips(newShips, newWords, showAll);
  const searchTargets = info.targets;
  const autocompleteOptions = Object.fromEntries(
    searchTargets.map((target) => {
      const key = getKeyOfSearchTarget(target);
      return [key, generateAutocompleteOptions(ships, target, showAll)];
    })
  );
  const newAutocompleteOptions = generateNewAutocompleteOptions(
    newShips,
    showAll
  );
  return {
    ...state,
    search: {
      ...search,
      info: {
        ...info,
        autocompleteOptions,
        newAutocompleteOptions,
      },
      showAll,
      results,
      newResults,
      page: 1,
    },
  };
};

export const onChangeSortOrder = (
  state: State,
  sortOrder: SortOrder
): State => {
  const ships = sortShips(state.ships, sortOrder);
  const newShips = sortShips(state.newShips, sortOrder);
  const results = sortShips(state.search.results, sortOrder);
  const newResults = sortShips(state.search.newResults, sortOrder);
  return {
    ...state,
    ships,
    newShips,
    search: {
      ...state.search,
      sortOrder,
      results,
      newResults,
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
