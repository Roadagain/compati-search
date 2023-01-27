import { SortOrder } from './sort-order';

export const getLabelOfSortOrder = (sortOrder: SortOrder): string => {
  switch (sortOrder) {
    case SortOrder.ID:
      return '図鑑ナンバー順';
    case SortOrder.KANA:
      return '読み順';
  }
};
