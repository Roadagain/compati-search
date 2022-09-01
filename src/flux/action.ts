import { SearchTarget } from '../lib/search-target';
import { TaggedCharacter } from '../lib/tagged-character';

interface LoadCharacters {
  type: 'load-characters';
  characters: TaggedCharacter[];
}

interface ChangeSearchTargetAction {
  type: 'change-search-target';
  target: SearchTarget;
}

interface ChangeSearchWordsAction {
  type: 'change-search-words';
  words: string[];
}

interface ChangeShowAllAction {
  type: 'change-show-all';
  showAll: boolean;
}

interface ClickTag {
  type: 'click-tag';
  label: string;
}

export type Action =
  | LoadCharacters
  | ChangeSearchTargetAction
  | ChangeSearchWordsAction
  | ChangeShowAllAction
  | ClickTag;
