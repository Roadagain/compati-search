import { Ship } from '../ship';
import { sortById } from './id';
import { sortByKana } from './kana';
import { SortOrder } from './sort-order';

export * from './label';
export * from './sort-order';

export const sortCharacters = (
  characters: Ship[],
  order: SortOrder
): Ship[] => {
  switch (order) {
    case SortOrder.ID:
      return sortById(characters);
    case SortOrder.KANA:
      return sortByKana(characters);
    default:
      throw new Error('Invalid sort order');
  }
};
