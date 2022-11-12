import { CharactersData } from '../lib/characters-data';
import { SearchTarget } from '../lib/search-target';

interface LoadCharactersData {
  type: 'load-characters-data';
  charactersData: CharactersData;
}

interface ChangeSearchTargetAction {
  type: 'change-search-target';
  target: SearchTarget;
}

interface ChangeSearchWordsAction {
  type: 'change-search-words';
  target: SearchTarget;
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

interface ShowNextPage {
  type: 'show-next-page';
}

export type Action =
  | LoadCharactersData
  | ChangeSearchTargetAction
  | ChangeSearchWordsAction
  | ChangeShowAllAction
  | ClickTag
  | ShowNextPage;
