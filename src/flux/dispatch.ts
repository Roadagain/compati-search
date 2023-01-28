import { generateAutocompleteOptions } from '../lib/autocomplete';
import { filterShips, SearchWords } from '../lib/filter-ships';
import {
  generateSearchTargets,
  getKeyOfSearchTarget,
  SearchTarget,
} from '../lib/search-target';
import { ShipsData } from '../lib/ships-data';
import { sortCharacters, SortOrder } from '../lib/sort-characters';
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

export const onLoadCharactersData = (
  state: State,
  charactersData: ShipsData
): State => {
  const { characters } = charactersData;
  const { search } = state;
  const { showAll } = search;
  const allTags = characters.flatMap(({ tags }) => tags);
  const searchTargets = generateSearchTargets(allTags);
  const autocompleteOptions = Object.fromEntries(
    searchTargets.map((target) => {
      const key = getKeyOfSearchTarget(target);
      return [key, generateAutocompleteOptions(characters, target, showAll)];
    })
  );
  const words: InputedSearchWords = Object.fromEntries(
    searchTargets.map((target) => {
      const key = getKeyOfSearchTarget(target);
      return [key, []];
    })
  );
  const results = filterShips(characters, adjustToSearchWords(words), showAll);
  return {
    ...state,
    isReady: true,
    characters,
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
  const { characters, search } = state;
  const { showAll } = search;
  const key = getKeyOfSearchTarget(target);
  const words = {
    ...search.words,
    [key]: newWords,
  };
  const results = filterShips(characters, adjustToSearchWords(words), showAll);
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
  const { characters, search } = state;
  const { words, info } = search;
  const results = filterShips(characters, adjustToSearchWords(words), showAll);
  const searchTargets = info.targets;
  const autocompleteOptions = Object.fromEntries(
    searchTargets.map((target) => {
      const key = getKeyOfSearchTarget(target);
      return [key, generateAutocompleteOptions(characters, target, showAll)];
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
  const characters = sortCharacters(state.characters, sortOrder);
  const results = sortCharacters(state.search.results, sortOrder);
  return {
    ...state,
    characters,
    search: {
      ...state.search,
      sortOrder,
      results,
    },
  };
};

export const onClickTag = (state: State, label: string): State => {
  const { characters, search } = state;
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
  const results = filterShips(
    characters,
    adjustToSearchWords(newWords),
    showAll
  );
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
