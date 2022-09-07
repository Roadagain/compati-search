import { CharactersData } from '../lib/characters-data';
import { SearchTarget } from '../lib/search-target';
import { filterCharacters } from '../lib/tagged-character';
import { State } from './state';

export const onLoadCharactersData = (
  state: State,
  charactersData: CharactersData
): State => {
  const { characters, metadata } = charactersData;
  const { search } = state;
  const { target, words, showAll } = search;
  const results = filterCharacters(characters, target, words, showAll);
  return {
    ...state,
    isReady: true,
    characters,
    metadata,
    search: {
      ...search,
      results,
    },
  };
};

export const onChangeSearchTarget = (
  state: State,
  target: SearchTarget
): State => {
  const { characters, search } = state;
  const { showAll } = search;
  const words = search.target === target ? search.words : [];
  const results = filterCharacters(characters, target, words, showAll);
  return {
    ...state,
    search: {
      ...search,
      target,
      words,
      results,
    },
  };
};

export const onChangeSearchWords = (state: State, words: string[]): State => {
  const { characters, search } = state;
  const { target, showAll } = search;
  const results = filterCharacters(characters, target, words, showAll);
  return {
    ...state,
    search: {
      ...search,
      words,
      results,
    },
  };
};

export const onChangeShowAll = (state: State, showAll: boolean): State => {
  const { characters, search } = state;
  const { target, words } = search;
  const results = filterCharacters(characters, target, words, showAll);
  return {
    ...state,
    search: {
      ...search,
      showAll,
      results,
    },
  };
};

export const onClickTag = (state: State, label: string): State => {
  const { characters, search } = state;
  const { words: currentWords, target: currentTarget, showAll } = search;
  const target = SearchTarget.TAG;
  const words =
    currentTarget === SearchTarget.TAG ? [...currentWords, label] : [label];
  const results = filterCharacters(characters, target, words, showAll);
  return {
    ...state,
    search: {
      ...search,
      target,
      words,
      results,
    },
  };
};
