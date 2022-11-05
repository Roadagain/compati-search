import { Tag } from './tagged-character';

export enum SearchType {
  TAG,
  NAME,
}

interface SearchTargetSimple {
  type: SearchType;
}

interface SearchTargetTagCategory {
  type: SearchType.TAG;
  category: string;
}

export type SearchTarget = SearchTargetSimple | SearchTargetTagCategory;

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
