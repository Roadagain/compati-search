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
      tagLabels.every((tagLabel) => {
        const isMinus = tagLabel.startsWith('-');
        const hasTag = characterTagLabels.includes(
          tagLabel.slice(isMinus ? 1 : 0)
        );
        return isMinus ? !hasTag : hasTag;
      })
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
      (showAll || showDefault) &&
      nameWords.every((word) => {
        const isMinus = word.startsWith('-');
        const hasWord = name.includes(word.slice(isMinus ? 1 : 0));
        return isMinus ? !hasWord : hasWord;
      })
    );
  });
};
