import { SearchTarget } from '../lib/search-target';
import { Ship } from '../lib/ship';
import { SortOrder } from '../lib/sort-ships';
import { TagCategory } from '../lib/tag-category';

type LoadShipsData = {
  type: 'load-ships-data';
  ships: Ship[];
};

type ChangeSearchWordsAction = {
  type: 'change-search-words';
  target: SearchTarget;
  words: string[];
};

type ChangeShowAllAction = {
  type: 'change-show-all';
  showAll: boolean;
};

type ChangeSortOrderAction = {
  type: 'change-sort-order';
  sortOrder: SortOrder;
};

type ClickTag = {
  type: 'click-tag';
  category: TagCategory;
  tag: string;
};

type ShowNextPage = {
  type: 'show-next-page';
};

export type Action =
  | LoadShipsData
  | ChangeSearchWordsAction
  | ChangeShowAllAction
  | ChangeSortOrderAction
  | ClickTag
  | ShowNextPage;
