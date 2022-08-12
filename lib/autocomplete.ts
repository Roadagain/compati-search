import { SearchTarget } from '../components/molecules/SearchTargetSelect';
import { TaggedCharacter } from './tagged-character';

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
