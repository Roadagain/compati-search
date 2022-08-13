import sampleCharacterData from '../../sample/characters-data/sample.json';
import { TaggedCharacter } from './tagged-character';

type WouldBeTaggedCharacter = { [K in keyof TaggedCharacter]?: unknown };

export const isTaggedCharacter = (
  obj: WouldBeTaggedCharacter
): obj is TaggedCharacter => {
  return (
    typeof obj.name === 'string' &&
    Array.isArray(obj.tags) &&
    obj.tags.every((tag) => typeof tag === 'string')
  );
};

export const loadCharactersDataFromJson = (
  json: WouldBeTaggedCharacter[]
): TaggedCharacter[] => {
  // 外部データを読み込むためランタイムで型を確認する
  if (!json.every(isTaggedCharacter)) {
    throw new Error('Invalid characters data');
  }
  return json.map(({ name, tags }) => ({
    name,
    tags,
  }));
};

export const loadSampleCharactersData = () => {
  return loadCharactersDataFromJson(sampleCharacterData);
};
