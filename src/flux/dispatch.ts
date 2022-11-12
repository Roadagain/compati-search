import { CharactersData } from '../lib/characters-data';
import { filterCharacters, SearchWords } from '../lib/filter-characters';
import { SearchTarget } from '../lib/search-target';
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
  charactersData: CharactersData
): State => {
  const { characters, metadata } = charactersData;
  const { search } = state;
  const { words, showAll } = search;
  const results = filterCharacters(
    characters,
    adjustToSearchWords(words),
    showAll
  );
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
  const { showAll, words } = search;
  const results = filterCharacters(
    characters,
    adjustToSearchWords(words),
    showAll
  );
  return {
    ...state,
    search: {
      ...search,
      target,
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
  const key = 'category' in target ? target.category : '名前';
  const words = {
    ...search.words,
    [key]: newWords,
  };
  const results = filterCharacters(
    characters,
    adjustToSearchWords(words),
    showAll
  );
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
  const { words } = search;
  const results = filterCharacters(
    characters,
    adjustToSearchWords(words),
    showAll
  );
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

// export const onClickTag = (state: State, label: string): State => {
//   const { characters, search } = state;
//   const { showAll } = search;
//   const type = SearchType.TAG;
//   const words =
//     search.target.type === SearchType.TAG ? [...search.words, label] : [label];
//   const results = filterCharacters(characters, type, words, showAll);
//   return {
//     ...state,
//     search: {
//       ...search,
//       target: { type },
//       words,
//       results,
//       page: 1,
//     },
//   };
// };

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
