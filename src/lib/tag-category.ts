export const AllTagCategories = [
  'categories',
  'types',
  'equipments',
  'abilities',
  'speeds',
  'ranges',
] as const;
export type TagCategory = typeof AllTagCategories[number];
