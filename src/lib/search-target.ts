import { AllTagCategories } from './tag-category';

export const AllSearchTargets = [...AllTagCategories, 'names'] as const;
export type SearchTarget = (typeof AllSearchTargets)[number];

export const AllSearchTargetLabels = {
  categories: '艦種カテゴリ',
  types: '艦種',
  equipments: '装備',
  abilities: '特性',
  speeds: '速力',
  ranges: '射程',
  names: '名前',
} as const;
export type SearchTargetLabel = (typeof AllSearchTargetLabels)[SearchTarget];
