import { Ship } from '../ship';
import { sortById } from './id';
import { sortByKana } from './kana';
import { SortOrder } from './sort-order';

export * from './label';
export * from './sort-order';

export const sortShips = (ships: Ship[], order: SortOrder): Ship[] => {
  switch (order) {
    case SortOrder.ID:
      return sortById(ships);
    case SortOrder.KANA:
      return sortByKana(ships);
    default:
      throw new Error('Invalid sort order');
  }
};
