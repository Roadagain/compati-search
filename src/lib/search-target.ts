import { Tag } from './tagged-character';

export enum SearchType {
  TAG,
  NAME,
}

interface SearchTargetName {
  type: SearchType.NAME;
}

interface SearchTargetTagCategory {
  type: SearchType.TAG;
  category: string;
}

export type SearchTarget = SearchTargetName | SearchTargetTagCategory;

export const getKeyOfSearchTarget = (target: SearchTarget) => {
  return target.type === SearchType.NAME ? 'name' : target.category;
};

export const getLabelOfSearchTarget = (target: SearchTarget) => {
  return target.type === SearchType.NAME ? '名前' : target.category;
};

export const generateSearchTargets = (tags: Tag[]): SearchTarget[] => {
  const categories = new Set<string>(tags.map(({ category }) => category));
  return [
    { type: SearchType.NAME },
    ...Array.from(categories)
      .sort()
      .map((category) => ({
        type: SearchType.TAG,
        category,
      })),
  ];
};
