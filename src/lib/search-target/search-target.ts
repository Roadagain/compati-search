import { Tag } from '../ship';

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
