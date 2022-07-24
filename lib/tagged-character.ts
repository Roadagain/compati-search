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
