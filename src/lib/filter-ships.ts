import { Ship, Tag } from './ship';

export const matchesNameWords = (name: string, words: string[]): boolean => {
  return words.every((word) => {
    const isMinus = word.startsWith('-');
    const actualWord = word.slice(isMinus ? 1 : 0);
    const hasWord = name.includes(actualWord);
    return isMinus ? !hasWord : hasWord;
  });
};

export const matchesTagWords = (tags: Tag[], words: string[]): boolean => {
  return words.every((word) => {
    const isMinus = word.startsWith('-');
    const actualWord = word.slice(isMinus ? 1 : 0);
    const hasWord = tags.some(({ label }) => label === actualWord);
    return isMinus ? !hasWord : hasWord;
  });
};

export interface SearchWords {
  name: string[];
  tag: string[];
}

export const filterShips = (
  ships: Ship[],
  words: SearchWords,
  showAll: boolean
): Ship[] => {
  return ships.filter(({ name, tags, showDefault }) => {
    if (!showAll && !showDefault) {
      return false;
    }
    return (
      matchesNameWords(name, words.name) && matchesTagWords(tags, words.tag)
    );
  });
};
