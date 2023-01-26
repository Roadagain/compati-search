import { TaggedCharacter } from './tagged-character';

export enum SortOrder {
  ID,
  KANA,
}

export const compareKana = (a: string, b: string): number => {
  const isAAlphabet = !!a.match(/^[a-zA-Z]/);
  const isBAlphabet = !!b.match(/^[a-zA-Z]/);

  if ((isAAlphabet && isBAlphabet) || (!isAAlphabet && !isBAlphabet)) {
    return a.localeCompare(b);
  }
  if (isAAlphabet) {
    return 1;
  }
  return -1;
};

export const sortByKana = (
  characters: TaggedCharacter[]
): TaggedCharacter[] => {
  return characters.slice().sort((a, b) => compareKana(a.kana, b.kana));
};

export const sortById = (characters: TaggedCharacter[]): TaggedCharacter[] => {
  return characters.slice().sort((a, b) => a.id - b.id);
};
