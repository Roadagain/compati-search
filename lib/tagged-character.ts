export type Tag = string;

export interface TaggedCharacter {
  name: string;
  tags: Set<Tag>;
}

export const filterCharactersByTags = (
  characters: TaggedCharacter[],
  tags: Tag[]
): TaggedCharacter[] => {
  return characters.filter((character) => {
    return tags.every((tag) => character.tags.has(tag));
  });
};

// タグによるソート
// 一致数が多い順に返す
export const sortCharactersByTags = (
  characters: TaggedCharacter[],
  tags: Tag[]
): TaggedCharacter[] => {
  const matchedTagsCounts = characters.flatMap((character) => {
    const matchedCount = tags.filter((tag) => character.tags.has(tag)).length;
    return {
      character,
      count: matchedCount,
    };
  });
  matchedTagsCounts.sort((a, b) => b.count - a.count);
  return matchedTagsCounts.map(({ character }) => character);
};
