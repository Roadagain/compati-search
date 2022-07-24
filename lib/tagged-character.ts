export type Tag = string;

export interface TaggedCharacter {
  name: string;
  tags: Set<Tag>;
}

export const searchCharactersByTag = (
  characters: TaggedCharacter[],
  tag: Tag
): TaggedCharacter[] => {
  return characters.filter((character) => {
    return character.tags.has(tag);
  });
};

// 複数タグ検索
// 一致数が多い順に返す
export const searchCharactersByMultipleTags = (
  characters: TaggedCharacter[],
  tags: Tag[]
): TaggedCharacter[] => {
  const matchedTagsCounts = characters.flatMap((character) => {
    const matchedCount = tags.filter((tag) => character.tags.has(tag)).length;
    return matchedCount > 0
      ? {
          character,
          count: matchedCount,
        }
      : [];
  });
  matchedTagsCounts.sort((a, b) => b.count - a.count);
  return matchedTagsCounts.map(({ character }) => character);
};
