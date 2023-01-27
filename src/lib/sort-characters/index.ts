import { TaggedCharacter } from '../tagged-character';
import { sortById } from './id';
import { sortByKana } from './kana';
import { SortOrder } from './sort-order';

export { getLabelOfSortOrder } from './label';
export { SortOrder } from './sort-order';

export const sortCharacters = (
  characters: TaggedCharacter[],
  order: SortOrder
): TaggedCharacter[] => {
  switch (order) {
    case SortOrder.ID:
      return sortById(characters);
    case SortOrder.KANA:
      return sortByKana(characters);
    default:
      throw new Error('Invalid sort order');
  }
};
