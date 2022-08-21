export interface Tag {
  category: string;
  name: string;
}

export interface TaggedCharacter {
  name: string;
  tags: Tag[];
  showDefault: boolean;
}

export const filterCharactersByTagNames = (
  characters: TaggedCharacter[],
  tagNames: string[],
  showAll: boolean
): TaggedCharacter[] => {
  return characters.filter((character) => {
    const characterTagNames = character.tags.map(({ name }) => name);
    return (
      (showAll || character.showDefault) &&
      tagNames.every((tagName) => characterTagNames.includes(tagName))
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
