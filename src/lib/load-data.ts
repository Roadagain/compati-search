import {
  CharactersData,
  isCharactersData,
  WouldBeCharactersData,
} from './characters-data';
import { isMetadata, Metadata, WouldBeMetadata } from './metadata';
import { Tag, TaggedCharacter } from './tagged-character';

type WouldBeTaggedCharacter = { [K in keyof TaggedCharacter]?: unknown };
type WouldBeTag = { [K in keyof Tag]?: unknown };

export const isTag = (obj: WouldBeTag): obj is Tag => {
  return typeof obj.category === 'string' && typeof obj.label === 'string';
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

export const loadCharactersFromJson = (
  json: WouldBeTaggedCharacter[]
): TaggedCharacter[] => {
  // 外部データを読み込むためランタイムで型を確認する
  if (!json.every(isTaggedCharacter)) {
    throw new Error('Invalid characters');
  }
  return json.map(({ name, tags, showDefault }) => ({
    name,
    tags,
    showDefault,
  }));
};

export const loadMetadataFromJson = (json: WouldBeMetadata): Metadata => {
  if (!isMetadata(json)) {
    throw new Error('Invalid metadata');
  }
  return {
    character: json.character,
  };
};

export const loadCharactersDataFromJson = (
  json: WouldBeCharactersData
): CharactersData => {
  if (!isCharactersData(json)) {
    throw new Error('Invalid characters data');
  }
  return {
    characters: loadCharactersFromJson(json.characters),
    metadata: loadMetadataFromJson(json.metadata),
  };
};
