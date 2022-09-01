import { SearchTarget } from './search-target';

export interface Tag {
  category: string;
  label: string;
}

export interface TaggedCharacter {
  name: string;
  tags: Tag[];
  showDefault: boolean;
}

export const filterCharactersByTagLabels = (
  characters: TaggedCharacter[],
  tagLabels: string[],
  showAll: boolean
): TaggedCharacter[] => {
  return characters.filter((character) => {
    const characterTagLabels = character.tags.map(({ label }) => label);
    return (
      (showAll || character.showDefault) &&
      tagLabels.every((tagLabel) => characterTagLabels.includes(tagLabel))
    );
  });
};

export const filterCharactersByNameWords = (
  characters: TaggedCharacter[],
  nameWords: string[],
  showAll: boolean
): TaggedCharacter[] => {
  return characters.filter(({ name, showDefault }) => {
    return (
      (showAll || showDefault) && nameWords.every((word) => name.includes(word))
    );
  });
};

export const filterCharacters = (
  characters: TaggedCharacter[],
  target: SearchTarget,
  words: string[],
  showAll: boolean
): TaggedCharacter[] => {
  switch (target) {
    case SearchTarget.TAG:
      return filterCharactersByTagLabels(characters, words, showAll);
    case SearchTarget.NAME:
      return filterCharactersByNameWords(characters, words, showAll);
  }
};
