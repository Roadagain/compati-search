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

export const AllSearchTargets = [
  'names',
  'categories',
  'types',
  'speeds',
  'ranges',
  'equipments',
  'abilities',
] as const;
export type NewSearchTarget = typeof AllSearchTargets[number];

export const AllSearchTargetLabels = {
  names: '名前',
  categories: '艦種カテゴリ',
  types: '艦種',
  speeds: '速力',
  ranges: '射程',
  equipments: '装備',
  abilities: '特性',
} as const;
export type SearchTargetLabel = typeof AllSearchTargetLabels[NewSearchTarget];
