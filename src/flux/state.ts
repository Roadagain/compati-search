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
  characters: TaggedCharacter[];
  metadata: Metadata;
  search: SearchState;
}

export const initialState: State = {
  characters: [],
  metadata: {
    character: 'キャラクター',
  },
  search: {
    target: SearchTarget.TAG,
    words: [],
    showAll: false,
    results: [],
  },
};
