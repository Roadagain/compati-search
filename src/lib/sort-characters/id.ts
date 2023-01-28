import { Ship } from '../ship';

export const sortById = (characters: Ship[]): Ship[] => {
  return characters.slice().sort((a, b) => a.id - b.id);
};
