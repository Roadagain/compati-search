import { ShipsData } from '../lib/ships-data';
import { SearchTarget } from '../lib/search-target';
import { SortOrder } from '../lib/sort-ships';

interface LoadCharactersData {
  type: 'load-characters-data';
  charactersData: ShipsData;
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
