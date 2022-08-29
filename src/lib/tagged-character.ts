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

export interface CategoryGroupedTag {
  category: string;
  tags: Tag[];
}

export const groupTagsByCategory = (tags: Tag[]): CategoryGroupedTag[] => {
  const categories = Array.from(new Set(tags.map(({ category }) => category)));
  return categories.map((category) => ({
    category,
    tags: tags.filter((tag) => tag.category === category),
  }));
};
