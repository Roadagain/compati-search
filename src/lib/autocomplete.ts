import { Tag, TaggedCharacter } from './tagged-character';
import { SearchTarget } from './search-target';

export const generateAutocompleteOptions = (
  characters: TaggedCharacter[],
  target: SearchTarget,
  showAll: boolean
): Tag[] | string[] => {
  const charactersShown = characters.filter(
    ({ showDefault }) => showAll || showDefault
  );
  switch (target) {
    case SearchTarget.TAG:
      return Array.from(new Set(charactersShown.flatMap(({ tags }) => tags)));
    case SearchTarget.NAME:
      return charactersShown.map(({ name }) => name);
  }
};
