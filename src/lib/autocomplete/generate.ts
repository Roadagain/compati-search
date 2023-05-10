import { Ship } from '../ship';

export const generateNameAutocompleteOptions = (
  ships: Ship[],
  showAll: boolean
): string[] => {
  return ships
    .filter(({ showDefault }) => showAll || showDefault)
    .map(({ name }) => name);
};
