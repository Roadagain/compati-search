import { NewShip } from '../ship';
import { NewAutocompleteOptions } from './option';

const uniqueAndSortTagLabels = (tagLabels: string[]): string[] => {
  return Array.from(new Set(tagLabels)).sort();
};

export const generateNewAutocompleteOptions = (
  ships: NewShip[],
  showAll: boolean
): NewAutocompleteOptions => {
  const shipsShown = ships.filter(({ showDefault }) => showAll || showDefault);
  return {
    names: shipsShown.map(({ name }) => name),
    categories: uniqueAndSortTagLabels(
      shipsShown.map(({ category }) => category)
    ),
    types: uniqueAndSortTagLabels(shipsShown.map(({ type }) => type)),
    speeds: uniqueAndSortTagLabels(shipsShown.map(({ speed }) => speed)),
    ranges: uniqueAndSortTagLabels(shipsShown.map(({ range }) => range)),
    equipments: uniqueAndSortTagLabels(
      shipsShown.flatMap(({ equipments }) => equipments)
    ),
    abilities: uniqueAndSortTagLabels(
      shipsShown.flatMap(({ abilities }) => abilities)
    ),
  };
};
