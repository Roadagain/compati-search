import { Tag, TaggedCharacter } from './tagged-character';

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

export const matchesNameWords = (name: string, words: string[]): boolean => {
  return words.every((word) => {
    const isMinus = word.startsWith('-');
    const hasWord = name.includes(word.slice(isMinus ? 1 : 0));
    return isMinus ? !hasWord : hasWord;
  });
};

export const matchesTagWords = (tags: Tag[], words: string[]): boolean => {
  return words.every((word) => {
    const isMinus = word.startsWith('-');
    const hasWord = tags.some(({ label }) => label === word);
    return isMinus ? !hasWord : hasWord;
  });
};

export interface SearchWords {
  name: string[];
  tag: string[];
}

export const filterCharacters = (
  characters: TaggedCharacter[],
  words: SearchWords,
  showAll: boolean
): TaggedCharacter[] => {
  return characters.filter(({ name, tags, showDefault }) => {
    if (!showAll && !showDefault) {
      return false;
    }
    return (
      matchesNameWords(name, words.name) && matchesTagWords(tags, words.tag)
    );
  });
};
