import { TaggedCharacter } from '../tagged-character';

export const sortById = (characters: TaggedCharacter[]): TaggedCharacter[] => {
  return characters.slice().sort((a, b) => a.id - b.id);
};
