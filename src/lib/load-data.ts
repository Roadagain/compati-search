import {
  CharactersData,
  isCharactersData,
  WouldBeCharactersData,
} from './characters-data';
import { isMetadata, Metadata, WouldBeMetadata } from './metadata';
import {
  isTaggedCharacter,
  TaggedCharacter,
  WouldBeTaggedCharacter,
} from './tagged-character';

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
