import { getLabelOfSortOrder } from './label';
import { SortOrder } from './sort-order';

describe('getLabelOfSortOrder', () => {
  describe('ソート順がIDのとき', () => {
    it('「図鑑ナンバー順」が返る', () => {
      expect(getLabelOfSortOrder(SortOrder.ID)).toBe('図鑑ナンバー順');
    });
  });

  describe('ソート順がKANAのとき', () => {
    it('「読み順」が返る', () => {
      expect(getLabelOfSortOrder(SortOrder.KANA)).toBe('読み順');
    });
  });
});
