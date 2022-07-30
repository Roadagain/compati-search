import sampleCharacterData from '../sample/characters-data.json';
import { TaggedCharacter } from './tagged-character';

export const loadSampleCharactersData = (): TaggedCharacter[] => {
  return sampleCharacterData.map(({ name, tags }) => ({
    name,
    tags,
  }));
};
