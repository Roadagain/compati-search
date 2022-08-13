import { TaggedCharacter } from './tagged-character';
import { SearchTarget } from './search-target';

export const generateAutoCompleteOptions = (
  characters: TaggedCharacter[],
  target: SearchTarget
): string[] => {
  switch (target) {
    case SearchTarget.TAG:
      return Array.from(new Set(characters.flatMap(({ tags }) => tags)));
    case SearchTarget.NAME:
      return characters.map(({ name }) => name);
  }
};
