import { Ship } from '../ship';
import { sortShips } from './sort';
import { SortOrder } from './sort-order';

describe('sortShips', () => {
  describe('ID順を指定した場合', () => {
    it('ID昇順でソートされる', () => {
      const ids = [333, 22, 4444, 1];
      const ships = ids.map((id) => ({ id } as Ship));
      expect(sortShips(ships, SortOrder.ID)).toEqual([
        { id: 1 },
        { id: 22 },
        { id: 333 },
        { id: 4444 },
      ]);
    });
  });

  describe('読み順を指定した場合', () => {
    it('五十音昇順→アルファベット昇順→その他の文字でソートされる', () => {
      const kanas = [
        'かきくけこ',
        'さしすせそ',
        'Верный',
        'fghij',
        'abcde',
        'あいうえお',
      ];
      const ships = kanas.map((kana) => ({ kana } as Ship));

      expect(sortShips(ships, SortOrder.KANA)).toEqual([
        { kana: 'あいうえお' },
        { kana: 'かきくけこ' },
        { kana: 'さしすせそ' },
        { kana: 'abcde' },
        { kana: 'fghij' },
        { kana: 'Верный' },
      ]);
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
