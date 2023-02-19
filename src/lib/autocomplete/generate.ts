import { Ship } from '../ship';
import { AutocompleteOptions } from './option';

const uniqueAndSortTagLabels = (tagLabels: string[]): string[] => {
  return Array.from(new Set(tagLabels)).sort();
};

export const generateAutocompleteOptions = (
  ships: Ship[],
  showAll: boolean
): AutocompleteOptions => {
  const shipsShown = ships.filter(({ showDefault }) => showAll || showDefault);
  return {
    categories: uniqueAndSortTagLabels(
      shipsShown.map(({ category }) => category)
    ),
    types: uniqueAndSortTagLabels(shipsShown.map(({ type }) => type)),
    equipments: uniqueAndSortTagLabels(
      shipsShown.flatMap(({ equipments }) => equipments)
    ),
    abilities: uniqueAndSortTagLabels(
      shipsShown.flatMap(({ abilities }) => abilities)
    ),
    speeds: uniqueAndSortTagLabels(shipsShown.map(({ speed }) => speed)),
    ranges: uniqueAndSortTagLabels(shipsShown.map(({ range }) => range)),
    names: shipsShown.map(({ name }) => name),
  };
};
