import { getLabelOfSearchTarget } from './label';
import { SearchType } from './search-target';

describe('getLabelOfSearchTarget', () => {
  describe('検索対象が名前のとき', () => {
    it('「名前」が返る', () => {
      expect(getLabelOfSearchTarget({ type: SearchType.NAME })).toBe('名前');
    });
  });
  describe('検索対象がタグカテゴリのとき', () => {
    it('カテゴリ名が返る', () => {
      expect(
        getLabelOfSearchTarget({ type: SearchType.TAG, category: 'category' })
      ).toBe('category');
    });
  });
});
