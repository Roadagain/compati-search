import sampleCharacterData from '../../sample/characters-data/sample.json';
import { Tag, TaggedCharacter } from './tagged-character';

type WouldBeTaggedCharacter = { [K in keyof TaggedCharacter]?: unknown };
type WouldBeTag = { [K in keyof Tag]?: unknown };

export const isTag = (obj: WouldBeTag): obj is Tag => {
  return typeof obj.category === 'string' && typeof obj.name === 'string';
};

export const isTaggedCharacter = (
  obj: WouldBeTaggedCharacter
): obj is TaggedCharacter => {
  return (
    typeof obj.name === 'string' &&
    Array.isArray(obj.tags) &&
    obj.tags.every(isTag) &&
    typeof obj.showDefault === 'boolean'
  );
};

export const loadCharactersDataFromJson = (
  json: WouldBeTaggedCharacter[]
): TaggedCharacter[] => {
  // 外部データを読み込むためランタイムで型を確認する
  if (!json.every(isTaggedCharacter)) {
    throw new Error('Invalid characters data');
  }
  return json.map(({ name, tags, showDefault }) => ({
    name,
    tags,
    showDefault,
  }));
};

export const loadSampleCharactersData = () => {
  return loadCharactersDataFromJson(sampleCharacterData);
};
