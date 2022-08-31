import { isTaggedCharacter } from './load-data';
import { isMetadata, Metadata } from './metadata';
import { TaggedCharacter } from './tagged-character';

export interface CharactersData {
  characters: TaggedCharacter[];
  metadata: Metadata;
}

export type WouldBeCharactersData = { [K in keyof CharactersData]?: unknown };

export const isCharactersData = (
  obj: WouldBeCharactersData
): obj is CharactersData => {
  if (!Array.isArray(obj.characters) || typeof obj.metadata === 'undefined') {
    return false;
  }
  return obj.characters.every(isTaggedCharacter) && isMetadata(obj.metadata);
};
