export type Tag = string;

export interface TaggedCharacter {
  name: string;
  tags: Tag[];
}

export const filterCharactersByTags = (
  characters: TaggedCharacter[],
  tags: Tag[]
): TaggedCharacter[] => {
  return characters.filter((character) => {
    return tags.every((tag) => character.tags.includes(tag));
  });
};

export const sortCharactersByTags = (
  characters: TaggedCharacter[],
  tags: Tag[]
): TaggedCharacter[] => {
  const matchedTagsCounts = characters.flatMap((character) => {
    const matchedCount = tags.filter((tag) =>
      character.tags.includes(tag)
    ).length;
    return {
      character,
      count: matchedCount,
    };
  });
  matchedTagsCounts.sort((a, b) => b.count - a.count);
  return matchedTagsCounts.map(({ character }) => character);
};

export const filterCharactersByNameWords = (
  characters: TaggedCharacter[],
  nameWords: string[]
): TaggedCharacter[] => {
  return characters.filter(({ name }) =>
    nameWords.every((word) => name.includes(word))
  );
};
