import { SearchTarget } from '../lib/search-target';
import { Ship } from '../lib/ship';
import { SortOrder } from '../lib/sort-ships';

interface LoadShipsData {
  type: 'load-ships-data';
  ships: Ship[];
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
  | LoadShipsData
  | ChangeSearchWordsAction
  | ChangeShowAllAction
  | ChangeSortOrderAction
  | ClickTag
  | ShowNextPage;
