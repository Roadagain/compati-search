export const AllSearchTargets = [
  'names',
  'categories',
  'types',
  'speeds',
  'ranges',
  'equipments',
  'abilities',
] as const;
export type SearchTarget = typeof AllSearchTargets[number];

export const AllSearchTargetLabels = {
  names: '名前',
  categories: '艦種カテゴリ',
  types: '艦種',
  speeds: '速力',
  ranges: '射程',
  equipments: '装備',
  abilities: '特性',
} as const;
export type SearchTargetLabel = typeof AllSearchTargetLabels[SearchTarget];
