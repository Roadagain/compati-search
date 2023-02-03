import { SearchTarget, SearchType } from '../search-target';
import { Ship } from '../ship';

const uniqueAndSortTagLabels = (tagLabels: string[]): string[] => {
  return Array.from(new Set(tagLabels)).sort();
};

export const generateAutocompleteOptions = (
  ships: Ship[],
  target: SearchTarget,
  showAll: boolean
): string[] => {
  const shipsShown = ships.filter(({ showDefault }) => showAll || showDefault);
  switch (target.type) {
    case SearchType.TAG:
      return uniqueAndSortTagLabels(
        shipsShown
          .flatMap(({ tags }) => tags)
          .filter(({ category }) => category === target.category)
          .map(({ label }) => label)
      );
    case SearchType.NAME:
      return shipsShown.map(({ name }) => name);
  }
};
