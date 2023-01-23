import { isTaggedCharacter, TaggedCharacter } from './tagged-character';

export interface CharactersData {
  characters: TaggedCharacter[];
}

export type WouldBeCharactersData = { [K in keyof CharactersData]?: unknown };

export const isCharactersData = (
  obj: WouldBeCharactersData
): obj is CharactersData => {
  if (!Array.isArray(obj.characters)) {
    return false;
  }
  return obj.characters.every(isTaggedCharacter);
};
