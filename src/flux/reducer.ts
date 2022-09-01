import { Reducer } from 'react';
import { SearchTarget } from '../lib/search-target';
import { filterCharacters, TaggedCharacter } from '../lib/tagged-character';
import { Action } from './action';
import { State } from './state';

const onLoadCharacters = (
  state: State,
  characters: TaggedCharacter[]
): State => {
  const { search } = state;
  const { target, words, showAll } = search;
  const results = filterCharacters(characters, target, words, showAll);
  return {
    ...state,
    characters,
    search: {
      ...search,
      results,
    },
  };
};

const onChangeSearchTarget = (state: State, target: SearchTarget): State => {
  const { characters, search } = state;
  const { showAll } = search;
  const words = [];
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

const onChangeSearchWords = (state: State, words: string[]): State => {
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

const onChangeShowAll = (state: State, showAll: boolean): State => {
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

const onClickTag = (state: State, label: string): State => {
  const { characters, search } = state;
  const { showAll } = search;
  const target = SearchTarget.TAG;
  const words = [label];
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

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'load-characters':
      return onLoadCharacters(state, action.characters);
    case 'change-search-target':
      return onChangeSearchTarget(state, action.target);
    case 'change-search-words':
      return onChangeSearchWords(state, action.words);
    case 'change-show-all':
      return onChangeShowAll(state, action.showAll);
    case 'click-tag':
      return onClickTag(state, action.label);
    default:
      throw new Error('Invalid dispatch action');
  }
};
