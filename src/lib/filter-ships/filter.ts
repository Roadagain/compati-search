import { NewShip, Ship, Tag } from '../ship';
import { NewSearchWords, SearchWords } from './search-words';

const matchesNameWords = (name: string, words: string[]): boolean => {
  return words.every((word) => {
    const isMinus = word.startsWith('-');
    const actualWord = word.slice(isMinus ? 1 : 0);
    const hasWord = name.includes(actualWord);
    return isMinus ? !hasWord : hasWord;
  });
};

const matchesTagWords = (tags: Tag[], words: string[]): boolean => {
  return words.every((word) => {
    const isMinus = word.startsWith('-');
    const actualWord = word.slice(isMinus ? 1 : 0);
    const hasWord = tags.some(({ label }) => label === actualWord);
    return isMinus ? !hasWord : hasWord;
  });
};

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

const matchesSomeTag = (tags: string[], word: string): boolean => {
  const isMinus = word.startsWith('-');
  const actualWord = word.slice(isMinus ? 1 : 0);
  const hasWord = tags.includes(actualWord);
  return isMinus ? !hasWord : hasWord;
};

const matchesAllWords = (tags: string[], words: string[]): boolean => {
  return words.every((word) => matchesSomeTag(tags, word));
};

const matchesShipCategories = (
  shipCategory: string,
  words: string[]
): boolean => {
  return matchesAllWords([shipCategory], words);
};

const matchesShipTypes = (shipType: string, words: string[]): boolean => {
  return matchesAllWords([shipType], words);
};

const matchesShipSpeeds = (shipSpeed: string, words: string[]): boolean => {
  return matchesAllWords([shipSpeed], words);
};

const matchesShipRanges = (shipRange: string, words: string[]): boolean => {
  return matchesAllWords([shipRange], words);
};

const matchesShipAbilities = (
  shipAbilities: string[],
  words: string[]
): boolean => {
  return matchesAllWords(shipAbilities, words);
};

const matchesEquipmentTypes = (
  equipmentTypes: string[],
  words: string[]
): boolean => {
  return matchesAllWords(equipmentTypes, words);
};

const matchesSearchWords = (ship: NewShip, words: NewSearchWords): boolean => {
  return (
    matchesNameWords(ship.name, words.names) &&
    matchesShipCategories(ship.category, words.categories) &&
    matchesShipTypes(ship.type, words.types) &&
    matchesShipSpeeds(ship.speed, words.speeds) &&
    matchesShipRanges(ship.range, words.ranges) &&
    matchesEquipmentTypes(ship.equipments, words.equipments) &&
    matchesShipAbilities(ship.abilities, words.abilities)
  );
};

export const filterNewShips = (
  ships: NewShip[],
  words: NewSearchWords,
  showAll: boolean
): NewShip[] => {
  return ships.filter((ship) => {
    if (!showAll && !ship.showDefault) {
      return false;
    }
    return matchesSearchWords(ship, words);
  });
};
