import { SearchTarget, SearchType } from './search-target';

export const getLabelOfSearchTarget = (target: SearchTarget) => {
  return target.type === SearchType.NAME ? '名前' : target.category;
};
