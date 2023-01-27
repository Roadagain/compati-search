import { CharactersData } from '../lib/characters-data';
import { SearchTarget } from '../lib/search-target';
import { SortOrder } from '../lib/sort-characters';

interface LoadCharactersData {
  type: 'load-characters-data';
  charactersData: CharactersData;
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

interface ChangeSortOrderAction {
  type: 'change-sort-order';
  sortOrder: SortOrder;
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
  | ChangeSearchWordsAction
  | ChangeShowAllAction
  | ChangeSortOrderAction
  | ClickTag
  | ShowNextPage;
