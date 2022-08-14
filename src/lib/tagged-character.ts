export type Tag = string;

export interface TaggedCharacter {
  name: string;
  tags: Tag[];
  showDefault: boolean;
}

export const filterCharactersByTags = (
  characters: TaggedCharacter[],
  tags: Tag[],
  showAll: boolean
): TaggedCharacter[] => {
  return characters.filter((character) => {
    return (
      (showAll || character.showDefault) &&
      tags.every((tag) => character.tags.includes(tag))
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
