import { CharactersData } from '../lib/characters-data';
import { filterCharacters } from '../lib/filter-characters';
import { SearchTarget, SearchType } from '../lib/search-target';
import { State } from './state';

export const onLoadCharactersData = (
  state: State,
  charactersData: CharactersData
): State => {
  const { characters, metadata } = charactersData;
  const { search } = state;
  const { target, words, showAll } = search;
  const results = filterCharacters(characters, target.type, words, showAll);
  return {
    ...state,
    isReady: true,
    characters,
    metadata,
    search: {
      ...search,
      results,
      page: 1,
    },
  };
};

export const onChangeSearchTarget = (
  state: State,
  target: SearchTarget
): State => {
  const { characters, search } = state;
  const { showAll } = search;
  const results = filterCharacters(characters, target.type, [], showAll);
  return {
    ...state,
    search: {
      ...search,
      target,
      words: [],
      results,
      page: 1,
    },
  };
};

export const onChangeSearchWords = (state: State, words: string[]): State => {
  const { characters, search } = state;
  const { target, showAll } = search;
  const results = filterCharacters(characters, target.type, words, showAll);
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
  const { target, words } = search;
  const results = filterCharacters(characters, target.type, words, showAll);
  return {
    ...state,
    search: {
      ...search,
      showAll,
      results,
      page: 1,
    },
  };
};

export const onClickTag = (state: State, label: string): State => {
  const { characters, search } = state;
  const { showAll } = search;
  const type = SearchType.TAG;
  const words =
    search.target.type === SearchType.TAG ? [...search.words, label] : [label];
  const results = filterCharacters(characters, type, words, showAll);
  return {
    ...state,
    search: {
      ...search,
      target: { type },
      words,
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
