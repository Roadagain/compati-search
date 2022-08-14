import { TaggedCharacter } from './tagged-character';
import { SearchTarget } from './search-target';

export const generateAutoCompleteOptions = (
  characters: TaggedCharacter[],
  target: SearchTarget,
  showAll: boolean
): string[] => {
  switch (target) {
    case SearchTarget.TAG:
      return Array.from(
        new Set(
          characters.flatMap(({ tags, showDefault }) =>
            showAll || showDefault ? tags : []
          )
        )
      );
    case SearchTarget.NAME:
      return characters.flatMap(({ name, showDefault }) =>
        showAll || showDefault ? name : []
      );
  }
};
