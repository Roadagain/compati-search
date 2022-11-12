import { Metadata } from '../lib/metadata';
import { SearchTarget, SearchType } from '../lib/search-target';
import { TaggedCharacter } from '../lib/tagged-character';

export type InputedSearchWords = Record<'name' | string, string[]>;

interface SearchState {
  target: SearchTarget;
  words: InputedSearchWords;
  showAll: boolean;
  results: TaggedCharacter[];
  page: number;
}

export interface State {
  isReady: boolean;
  characters: TaggedCharacter[];
  metadata: Metadata;
  search: SearchState;
}

export const initialState: State = {
  isReady: false,
  characters: [],
  metadata: {
    character: '',
  },
  search: {
    target: { type: SearchType.NAME },
    words: {
      name: [],
    },
    showAll: false,
    results: [],
    page: 1,
  },
};
