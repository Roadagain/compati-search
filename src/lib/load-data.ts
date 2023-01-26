import {
  CharactersData,
  isCharactersData,
  WouldBeCharactersData,
} from './characters-data';
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
  return json.map(({ id, name, kana, tags, showDefault }) => ({
    id,
    name,
    kana,
    tags,
    showDefault,
  }));
};

export const loadCharactersDataFromJson = (
  json: WouldBeCharactersData
): CharactersData => {
  if (!isCharactersData(json)) {
    throw new Error('Invalid characters data');
  }
  return {
    characters: loadCharactersFromJson(json.characters),
  };
};
