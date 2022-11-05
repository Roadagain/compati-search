import { Metadata } from '../lib/metadata';
import { SearchType } from '../lib/search-target';
import { TaggedCharacter } from '../lib/tagged-character';

interface SearchState {
  type: SearchType;
  words: string[];
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
    type: SearchType.TAG,
    words: [],
    showAll: false,
    results: [],
    page: 1,
  },
};
