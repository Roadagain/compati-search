import { SearchTarget, SearchType } from './search-target';

export const getKeyOfSearchTarget = (target: SearchTarget) => {
  return target.type === SearchType.NAME ? 'name' : target.category;
};
