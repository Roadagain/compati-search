import { Metadata } from '../lib/metadata';
import { SearchTarget } from '../lib/search-target';
import { TaggedCharacter } from '../lib/tagged-character';

interface SearchState {
  target: SearchTarget;
  words: string[];
  showAll: boolean;
  results: TaggedCharacter[];
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
    target: SearchTarget.TAG,
    words: [],
    showAll: false,
    results: [],
  },
};
