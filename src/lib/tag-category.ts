export const AllTagCategories = [
  'categories',
  'types',
  'equipments',
  'abilities',
  'speeds',
  'ranges',
  'countries',
] as const;
export type TagCategory = (typeof AllTagCategories)[number];
