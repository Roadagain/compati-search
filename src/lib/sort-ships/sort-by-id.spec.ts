import { Ship } from '../ship';
import { sortById } from './id';

describe('sortById', () => {
  it('ID昇順でソートされる', () => {
    const ids = [333, 22, 4444, 1];
    const ships = ids.map((id) => ({ id } as Ship));
    expect(sortById(ships)).toEqual([
      { id: 1 },
      { id: 22 },
      { id: 333 },
      { id: 4444 },
    ]);
  });
});
