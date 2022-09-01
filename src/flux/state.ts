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
  search: SearchState;
}

export const initialState: State = {
  characters: [],
  search: {
    target: SearchTarget.TAG,
    words: [],
    showAll: false,
    results: [],
  },
};
