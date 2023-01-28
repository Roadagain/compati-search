import { sortShips } from '.';
import { sortById } from './id';
import { sortByKana } from './kana';
import { SortOrder } from './sort-order';

jest.mock('./id');
jest.mock('./kana');
describe('sortCharacters', () => {
  describe.each`
    order             | orderStr  | sortFunction
    ${SortOrder.ID}   | ${'ID'}   | ${sortById}
    ${SortOrder.KANA} | ${'かな'} | ${sortByKana}
  `('ソート順が$orderStrのとき', ({ order, sortFunction }) => {
    beforeEach(() => {
      (sortFunction as unknown as jest.Mock).mockReturnValue([]);
      sortShips([], order);
    });

    it(`${sortFunction.name}が呼ばれる`, () => {
      expect(sortFunction).toBeCalledWith([]);
    });
  });

  describe('ソート順の指定が既存のものと一致しないとき', () => {
    it('例外を投げる', () => {
      expect(() =>
        sortShips([], 'unknown' as unknown as SortOrder)
      ).toThrowError('Invalid sort order');
    });
  });
});
