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
      tags.every((tag) => {
        const isMinus = tag.startsWith('-');
        const hasTag = character.tags.includes(tag.slice(isMinus ? 1 : 0));
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
