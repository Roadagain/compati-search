import { Ship } from '../ship';

export const sortById = (ships: Ship[]): Ship[] => {
  return ships.slice().sort((a, b) => a.id - b.id);
};
